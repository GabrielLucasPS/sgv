import { Pool } from "pg";

export const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT_NUMBER,
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
