"use server";
import { redirect } from "next/navigation";
import { Usuario } from "./types";
import { pool } from "./utils/dbConnection";
import dbConnect from "./utils/dbConnection";
import { DatabaseError } from "pg";
import { md5 } from "js-md5";

// Adicionar novo Usuário
export async function createUser(data: FormData) {
    "use server";
    let nome = data.get("nome")?.valueOf();
    let email = data.get("email")?.valueOf();
    let senha = data.get("senha")?.valueOf();
    const isoTimestamp = new Date().toISOString();

    console.log("1:", nome, email, senha);

    if (senha && nome && email != undefined) {
        try {
            const senhaHash = md5(senha.toString());
            const newUser = await pool.query(
                `INSERT INTO usuario (nome, email, senha, data_criacao)
                         VALUES ($1, $2, $3, $4)
                         RETURNING *`,
                [nome, email, senhaHash, isoTimestamp]
            );
            console.log("2: Usuario criado");
            console.log(newUser.rows[0]);
            redirect("/");
        } catch (err) {
            console.log(err);
            let erro = err as DatabaseError;
            if (erro.detail?.includes("existe")) {
            }
        }
    }
}

// Pegar todos os usuários do banco de dados
export async function getUsers(): Promise<Usuario[]> {
    try {
        // Aqui usamos Usuario como o tipo genérico correto
        const Users = await pool.query<Usuario>(`SELECT * FROM usuario`);

        const usuarios: Usuario[] = Users.rows.map((row) => ({
            id: row.id,
            nome: row.nome,
            email: row.email,
            senha: row.senha,
            data_criacao: new Date(row.data_criacao),
        }));

        return usuarios;
    } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        throw err;
    }
}

// export async function getUsers() {
//     try {
//         const Users = await pool.query<Usuario[]>(`SELECT * FROM usuario`);

//         // const usuarios: Usuario[] = Users.rows.map((row) => ({
//         //     id: row.id,
//         //     nome: row.nome,
//         //     email: row.email,
//         //     senha: row.senha,
//         //     dataCriacao: row.data_criacao,
//         // }));
//         return Users.rows;
//     } catch (err) {
//         console.error("Erro ao buscar usuários:", err);
//         throw err;
//     }
// }
