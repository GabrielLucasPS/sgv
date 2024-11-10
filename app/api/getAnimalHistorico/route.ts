// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import { Animal } from "@/lib/types/dbTypes";
import { useEffect, useState } from "react";

export async function GET(request: Request) {
    const { id } = await request.json();
    const vazio: [] = [];
    if (id) {
        try {
            const historicos = await pool.query(
                pool.query(`SELECT *
                FROM historicoVacina
                WHERE animal_id = $1 LIMIT 1`),
                [id]
            );

            console.log("aqui", historicos.row[0]);
            return NextResponse.json({
                success: true,
                message: "Animal encontrados.",
                historicos: historicos.row[0],
            });
        } catch (err) {
            return NextResponse.json({
                success: false,
                message: "Erro ao procurar animal.",
                historicos: vazio,
            });
        }
    } else {
        return NextResponse.json({
            success: false,
            message: "Erro ao procurar animal.",
            historicos: vazio,
        });
    }
}
// Todos os historicos de 1 animal
// `SELECT *
//      FROM historicoVacina
//      WHERE animal_id = $1`,
