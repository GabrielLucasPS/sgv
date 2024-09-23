import { pool } from "../../utils/dbConnection";
import { Usuario, Login } from "@/app/types";
import { NextResponse } from "next/server";
import * as z from "zod";
import { subHours } from "date-fns";
import { md5 } from "js-md5";

import { login } from "@/lib";

// defina um schema para validar um input

const FormSchema = z.object({
    email: z.string().min(1, "").email(""),
    senha: z.string().min(1, "").min(6, ""),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, senha } = FormSchema.parse(body);

        const isoTimestamp = subHours(new Date().toISOString(), 0);

        console.log(body);

        if (senha && email) {
            const senhaHash = md5(senha);

            const usuarioExistente = await pool.query<Login>(
                `SELECT id, nome, email FROM usuario WHERE email = LOWER($1) AND senha = $2`,
                [email, senhaHash]
            );

            console.log("Usuario existente: ", usuarioExistente);

            if (usuarioExistente.rows.length != 0) {
                const hash = md5(email + Date.now());

                const query = `UPDATE usuario SET hash = $1 WHERE email = LOWER($2);`;
                await pool.query(query, [hash, email]);

                const user: Login = usuarioExistente.rows[0];

                await login(user);

                return NextResponse.json(
                    {
                        success: true,
                        message: "Logando.",
                        newhHash: hash,
                    },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Usuario nao encontrado",
                    },
                    { status: 402 }
                );
            }
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Dados incompletos",
                },
                { status: 402 }
            );
        }
    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Erro ao processar a requisição.",
            },
            { status: 500 }
        );
    }
}
