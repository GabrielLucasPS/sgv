import { pool } from "@/lib/dbConnection";
import { User, Usuario } from "@/lib/types/dbTypes";
import { hash } from "bcrypt";

export async function getUsers(): Promise<User[]> {
    try {
        // Aqui usamos Usuario como o tipo genérico correto
        const Users = await pool.query<User>(`SELECT * FROM usuario`);

        const usuarios: User[] = Users.rows.map((row: Usuario) => ({
            id: row.id,
            nome: row.nome,
            email: row.email,
            data_criacao: new Date(row.data_criacao),
        }));

        return usuarios;
    } catch (err) {
        const vazio: User[] = [];
        return vazio;
    }
}

export async function primeiraEntrada() {
    try {
        const usuarios = await pool.query<User[]>(
            `SELECT nome,email FROM usuario`
        );
        console.log(usuarios.rows);

        if (usuarios.rows.length === 0) {
            const senhaHash = await hash("123456", 10);

            await pool.query(
                `INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)`,
                ["admin", "teste@svg.com", senhaHash]
            );

            console.log("Usuário admin criado com sucesso.");
        } else {
            console.log("Já existem usuários no banco.");
        }
    } catch (error) {
        console.error("Erro ao verificar ou criar usuário:", error);
    }
}
