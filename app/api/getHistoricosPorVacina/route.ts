// app/api/getHistoricosPorVacina/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import { Animal, HistoricoVacina } from "@/lib/types/dbTypes";
import { useEffect, useState } from "react";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const vacinaId = searchParams.get("vacinaId");

    if (!vacinaId) {
        return NextResponse.json({
            success: false,
            message: "ID da vacina não fornecido.",
            Historico: [],
        });
    }
    try {
        const Historico = await pool.query<HistoricoVacina>(
            `SELECT 
                * 
            FROM 
                historicovacina 
            WHERE 
                vacina_id = $1`,
            [vacinaId]
        );

        return NextResponse.json({
            success: true,
            message: "HistoricoVacina encontrados.",
            Historico: Historico.rows,
        });
    } catch (err) {
        const vazio: HistoricoVacina[] = [];
        return NextResponse.json({
            success: false,
            message: "HistoricoVacina encontrados.",
            Historico: vazio,
        });
    }
}
