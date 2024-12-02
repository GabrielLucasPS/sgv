import { pool } from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import * as z from "zod";

import { subHours } from "date-fns";
import { revalidatePath } from "next/cache";
import { Vacina } from "@/lib/types/dbTypes";

// defina um schema para validar um input

// export const FormSchema = z.object({
// 	nome: z.string().max(100),
// 	descricao: z.string().max(250).optional(),
// 	intervalodose: z.number(),
// 	fabricante: z.string().max(100),
// });

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { nome, intervalodose, fabricante, descricao } = body;

		const isoTimestamp = subHours(new Date().toISOString(), 0);

		console.log(body);

		if (nome && intervalodose && fabricante && descricao) {
			try {
				const vacinaExistente = await pool.query<Vacina>(
					`SELECT id,nome FROM vacina WHERE nome = $1`,
					[nome]
				);

				// Vacina exsite?
				if (vacinaExistente.rows.length === 0) {
					await pool.query(
						`INSERT INTO vacina (nome, intervalodose, fabricante, descricao,dataRegistro)
                         VALUES ($1, $2, $3, $4, $5)
                         RETURNING *`,
						[
							nome.toLowerCase(),
							intervalodose,
							fabricante,
							descricao,
							isoTimestamp,
						]
					);
					console.log("Criou");
					revalidatePath("/vacinas");
					return NextResponse.json(
						{
							success: true,
							message: "Vacina adicionado.",
						},
						{ status: 201 }
					);
				} else {
					return NextResponse.json(
						{
							success: false,
							message: "Vacina ja Existe",
						},
						{ status: 402 }
					);
				}
			} catch (err) {
				console.error(err);

				return NextResponse.json(
					{
						success: false,
						message: "Erro ao criar Vacina",
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
