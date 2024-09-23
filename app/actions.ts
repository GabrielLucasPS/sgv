"use server";
import { redirect } from "next/navigation";
import { Usuario, Login } from "./types";
import { pool } from "./utils/dbConnection";

import { md5 } from "js-md5";

// Adicionar novo Usuário

export async function createUser(data: FormData) {
    let nome = data.get("nome")?.toString().trim() as string;
    let email = data.get("email")?.toString().trim() as string;
    let senha = data.get("senha")?.toString() as string;
    const isoTimestamp = new Date().toISOString();
    // Dados foram preenchidos?
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

                return {
                    success: true,
                    message: "Usuário adicionado.",
                };
            } else {
                return {
                    success: false,
                    message: "Email já existe",
                };
            }
        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: "Erro ao criar usuário",
            };
        }
    } else {
        return {
            success: false,
            message: "Dados incompletos",
        };
    }
}

// Pegar todos os usuários do banco de dados
export async function getUsers(): Promise<Login[]> {
    try {
        // Aqui usamos Usuario como o tipo genérico correto
        const Users = await pool.query<Login>(`SELECT * FROM usuario`);

        const usuarios: Login[] = Users.rows.map((row) => ({
            id: row.id,
            nome: row.nome,
            email: row.email,
            data_criacao: new Date(row.data_criacao),
        }));

        return usuarios;
    } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        throw err;
    }
}
