// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";

export async function POST(request: Request) {
    const { id } = await request.json();

    try {
        await pool.query(`DELETE FROM vacina WHERE id = $1`, [id]);

        return NextResponse.json({
            success: true,
            message: "Vacina Deletada.",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Erro ao deletar vacina." },
            { status: 500 }
        );
    }
}
