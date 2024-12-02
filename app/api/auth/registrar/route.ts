import * as z from "zod";
import { pool } from "@/lib/dbConnection";
import { subHours } from "date-fns";
import { User } from "@/lib/types/dbTypes";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

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

		const senhaHash = await hash(senha, 10);

		const usuarioExistente = await pool.query<User>(
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
				{ status: 409 }
			);
		}
	} catch (e) {
		console.log({ e });
	}
}
