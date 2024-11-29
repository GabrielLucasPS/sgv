import { pool } from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import * as z from "zod";

import { startOfDay, subHours } from "date-fns";
import { revalidatePath } from "next/cache";
import { Animal, Vacina } from "@/lib/types/dbTypes";

export const FormSchema = z.object({
    animalId: z.number(),
    vacinaId: z.number(),
    dataVacinacao: z.any(),
    dosagem: z.number(),
    observacao: z.string().max(250).optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { animalId, vacinaId, dataVacinacao, dosagem, observacao } =
            FormSchema.parse(body);

        if (animalId && vacinaId && dataVacinacao && dosagem) {
            const isoTimestamp = subHours(new Date().toISOString(), 0);
            let intervalodose = 0;
            let inicioDataVacinaca = startOfDay(dataVacinacao);
            const animalExistente = await pool.query(
                `SELECT id, brinco FROM animal WHERE id = $1 LIMIT 1`,
                [animalId]
            );

            if (animalExistente.rows.length > 0) {
            } else {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Animal não encontrada",
                    },
                    { status: 400 }
                );
            }

            const vacinaExistente = await pool.query(
                `SELECT id, intervalodose FROM vacina WHERE id = $1 LIMIT 1`,
                [vacinaId]
            );

            if (vacinaExistente.rows.length > 0) {
                intervalodose = vacinaExistente.rows[0].intervalodose;
            } else {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Vacina não encontrada.",
                    },
                    { status: 400 }
                );
            }

            const historicoExistente = await pool.query(
                `SELECT animal_id, vacina_id FROM historicovacina WHERE animal_id = $1 AND vacina_id = $2 LIMIT 1`,
                [animalId, vacinaId]
            );

            if (historicoExistente.rows.length > 0) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Historico já existe.",
                    },
                    { status: 400 }
                );
            }

            var newInicioDataVacinaca = startOfDay(inicioDataVacinaca);
            await pool.query(
                `INSERT INTO historicovacina(animal_id, vacina_id, data_vacinacao, dosagem, intervalo_proxima_dose, observacao,dataultimavacina)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING *`,
                [
                    animalId,
                    vacinaId,
                    newInicioDataVacinaca,
                    dosagem,
                    intervalodose,
                    observacao,
                    newInicioDataVacinaca,
                ]
            );
            console.log("Historico adicionado.");

            return NextResponse.json(
                {
                    success: true,
                    message: "Historico adicionado.",
                },
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Não foi possivel adicionar historico.",
                },
                { status: 400 }
            );
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                message: "Erro ao processar a requisição.",
            },
            { status: 500 }
        );
    }
}
// INSERT INTO public.historicovacina(
// 	id, animal_id, vacina_id, data_vacinacao, dosagem, intervalo_proxima_dose, status, observacao, responsavel_id)
// 	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
