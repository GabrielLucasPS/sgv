// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import {Animal} from "@/lib/types/dbTypes";
import { useEffect, useState } from "react";

export async function GET(request: Request) {
    try {
        const Animal = await pool.query<Animal>(`SELECT * FROM Animal`);
        

        return NextResponse.json({
            success: true,
            message: "Animal encontrados.",
            Animais: Animal.rows,
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