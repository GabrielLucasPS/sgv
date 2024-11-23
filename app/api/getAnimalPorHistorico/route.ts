import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import { Animal } from "@/lib/types/dbTypes";
import { useEffect, useState } from "react";
import { createEmptyAnimal } from "@/lib/utils";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const historicoId = searchParams.get("historicoId");
    console.log("------------------------", historicoId);

    const vazio = createEmptyAnimal();

    if (historicoId) {
        try {
            const animal = await pool.query<Animal>(
                `
                    SELECT 
                        a.* 
                    FROM 
                        historicovacina hv
                    JOIN 
                        animal a 
                    ON 
                        hv.animal_id = a.id
                    WHERE 
                        hv.id = $1`,
                [historicoId]
            );

            if (animal.rowCount === 0) {
                return NextResponse.json({
                    success: false,
                    message:
                        "Animal não encontrado para o histórico fornecido.",
                    animal: vazio,
                });
            }

            return NextResponse.json({
                success: true,
                message: "Animal encontrados.",
                animal: animal.rows[0],
            });
        } catch (err) {
            return NextResponse.json({
                success: false,
                message: "Erro ao procurar animal.",
                animal: vazio,
            });
        }
    } else {
        return NextResponse.json({
            success: false,
            message: "Erro ao procurar animal.",
            animal: vazio,
        });
    }
}
