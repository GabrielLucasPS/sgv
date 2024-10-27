// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import { Vacina } from "@/lib/types/dbTypes";

export async function GET(request: Request) {
    try {
        const Vacinas = await pool.query<Vacina>(
            `SELECT * FROM vacina ORDER BY dataregistro DESC`
        );
        return NextResponse.json({
            success: true,
            message: "Vacinas encontradas.",
            Vacinas: Vacinas.rows,
        });
    } catch (err) {
        const vazio: Vacina[] = [];
        return NextResponse.json({
            success: false,
            message: "Vacinas encontrados.",
            Vacinas: vazio,
        });
    }
}
