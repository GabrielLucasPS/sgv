import { pool } from "../../utils/dbConnection";
import { Usuario, Login } from "@/app/types";
import { NextResponse } from "next/server";
import * as z from "zod";
import { md5 } from "js-md5";

import { subHours } from "date-fns";
import { revalidatePath } from "next/cache";

// defina um schema para validar um input

const UserSchema = z.object({
    nome: z.string().min(1, "usuario [e] required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    senha: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nome, email, senha } = UserSchema.parse(body);

        const isoTimestamp = subHours(new Date().toISOString(), 0);

        console.log(body);

        if (senha && nome && email) {
            try {
                const senhaHash = md5(senha);

                const usuarioExistente = await pool.query<Login>(
                    `SELECT id, nome, email FROM usuario WHERE email = LOWER($1)`,
                    [email]
                );

                // Usuário exsite?
                if (usuarioExistente.rows.length === 0) {
                    await pool.query(
                        `INSERT INTO usuario (nome, email, senha, data_criacao)
                         VALUES ($1, LOWER($2), $3, $4)
                         RETURNING *`,
                        [nome, email, senhaHash, isoTimestamp]
                    );
                    console.log("Criou");
                    revalidatePath("/usuarios");
                    return NextResponse.json(
                        {
                            success: true,
                            message: "Usuário adicionado.",
                        },
                        { status: 201 }
                    );
                } else {
                    return NextResponse.json(
                        {
                            success: false,
                            message: "Email já existe",
                        },
                        { status: 402 }
                    );
                }
            } catch (err) {
                console.error(err);

                return NextResponse.json(
                    {
                        success: false,
                        message: "Erro ao criar usuário",
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

// import { NextResponse } from "next/server";
// import { createUser } from "../../actions"; // Ajuste o caminho conforme necessário

// export async function POST(request: Request) {
//     try {
//         const formData = await request.formData();
//         const result = await createUser(formData);

//         console.log("Route: ", result);
//         return NextResponse.json({
//             success: result.success,
//             message: result.message,
//             status: 201,
//         });
//     } catch (error) {
//         console.error("Erro ao processar a requisição:", error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 message: "Erro ao processar a requisição.",
//             },
//             { status: 500 }
//         );
//     }
// }
