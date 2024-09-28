import { pool } from "@/lib/dbConnection";
import { User, Usuario } from "@/lib/types/dbTypes";

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
