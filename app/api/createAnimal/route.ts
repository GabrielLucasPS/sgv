import { pool } from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import * as z from "zod";

import { subHours } from "date-fns";
import { revalidatePath } from "next/cache";
import { Animal } from "@/lib/types/dbTypes";

// defina um schema para validar um input

const FormSchema = z.object({
    especie: z.string().min(1, "").max(100),
    brinco: z.string().min(1, ""),
    peso: z.number().min(1, "").max(10000),
    dataNascimento: z.string(),
    dataDesmame: z.string(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { especie, brinco, peso, dataNascimento, dataDesmame } =
            FormSchema.parse(body);

        const isoTimestamp = subHours(new Date().toISOString(), 0);

        console.log(body);

        if (especie && brinco && peso && dataNascimento && dataDesmame) {
            try {
                const animalExistente = await pool.query<Animal>(
                    `SELECT id,brinco FROM animal WHERE brinco = $1`,
                    [brinco]
                );

                // animal exsite?
                if (animalExistente.rows.length === 0) {
                    await pool.query(
                        `INSERT INTO animal (especie, brinco, peso, dataNascimento,dataDesmame,dataRegistro)
                         VALUES ($1, $2, $3, $4, $5, $6)
                         RETURNING *`,
                        [
                            especie,
                            brinco,
                            peso,
                            dataNascimento,
                            dataDesmame,
                            isoTimestamp,
                        ]
                    );
                    console.log("Criou");
                    revalidatePath("/animais");
                    return NextResponse.json(
                        {
                            success: true,
                            message: "Animal adicionado.",
                        },
                        { status: 201 }
                    );
                } else {
                    return NextResponse.json(
                        {
                            success: false,
                            message: "Animal ja Existe",
                        },
                        { status: 402 }
                    );
                }
            } catch (err) {
                console.error(err);

                return NextResponse.json(
                    {
                        success: false,
                        message: "Erro ao criar Animal",
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
