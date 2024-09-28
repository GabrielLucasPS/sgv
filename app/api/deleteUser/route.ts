// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";

export async function POST(request: Request) {
    const { id } = await request.json(); // Supondo que o id será enviado no corpo da requisição

    try {
        await pool.query(`DELETE FROM usuario WHERE id = $1`, [id]);

        return NextResponse.json({
            success: true,
            message: "Usuário deletado.",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Erro ao deletar usuário." },
            { status: 500 }
        );
    }
}
