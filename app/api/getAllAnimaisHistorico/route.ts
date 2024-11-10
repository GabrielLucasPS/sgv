// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import { Animal } from "@/lib/types/dbTypes";
import { useEffect, useState } from "react";

export async function GET(request: Request) {
    try {
        const Animais = await pool.query<Animal>(`SELECT Animal.*
FROM public.animal AS Animal
JOIN public.historicoVacina hv ON Animal.id = hv.animal_id;`);
        return NextResponse.json({
            success: true,
            message: "Animal encontrados.",
            Animais: Animais.rows,
        });
    } catch (err) {
        const vazio: Animal[] = [];
        return NextResponse.json({
            success: false,
            message: "Animal encontrados.",
            Animais: vazio,
        });
    }
}
