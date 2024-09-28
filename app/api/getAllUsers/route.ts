// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import { User, Usuario } from "@/lib/types/dbTypes";
import { useEffect, useState } from "react";

export async function GET(request: Request) {
    try {
        const Users = await pool.query<Usuario>(`SELECT * FROM usuario`);

        const usuarios: User[] = Users.rows.map((row: Usuario) => ({
            id: row.id,
            nome: row.nome,
            email: row.email,
            data_criacao: new Date(row.data_criacao),
        }));

        return NextResponse.json({
            success: true,
            message: "usuarios encontrados.",
            Users: usuarios,
        });
    } catch (err) {
        const vazio: User[] = [];
        return NextResponse.json({
            success: false,
            message: "usuarios encontrados.",
            Users: vazio,
        });
    }
}
