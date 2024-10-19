import { Pool } from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "sgv",
    password: "1q2w3e4r5T",
    port: 5432,
});

export default async function dbConnect() {
    await pool.connect((err, client, release) => {
        if (err) {
            return console.err("Erro na conexão", err.stack);
        }

        client.query("SELECT NOW()", (err, result) => {
            release();
            if (err) {
                console.error("Erro na execução da query", err.stack);
            }
            console.log("Conectado ao banco de dados.", result.rows);
        });
    });
}
