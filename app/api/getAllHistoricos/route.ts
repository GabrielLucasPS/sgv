// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import { HistoricoVacina } from "@/lib/types/dbTypes";

export async function GET(request: Request) {
    console.log("entrou");

    try {
        const historicos = await pool.query<HistoricoVacina>(`
            SELECT 
                historicovacina.id,
                historicovacina.animal_id,
                historicovacina.vacina_id,
                historicovacina.dataultimavacina,
                v.nome AS vacinanome
            FROM 
                historicovacina
                JOIN vacina AS v ON historicovacina.vacina_id = v.id
        `);

        const eventos = historicos.rows.map((row: any) => {
            console.log("Linha do evento:", row);
            return {
                title: row.vacinanome,
                date: row.dataultimavacina.toISOString().split("T")[0],
            };
        });

        console.log("Eventos formatados:", eventos);

        return NextResponse.json({
            success: true,
            message: "",
            eventos: eventos,
        });
    } catch (err) {
        console.error("Erro:", err);
        return NextResponse.json({
            success: false,
            message: "Erro ao obter os dados",
            eventos: [],
        });
    }
}
