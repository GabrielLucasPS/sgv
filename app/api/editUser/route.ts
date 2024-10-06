// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import { hash } from "bcrypt";

export async function POST(request: Request) {
    const { id, Nome, Senha, nomeAtual } = await request.json(); // Supondo que o id será enviado no corpo da requisição
    let query = "UPDATE usuario SET";
    let values = [];
    let queryParts = [];
    let counter = 1;

    console.log(`
        id: ${id},
        nome: ${Nome},
        nome Atual: ${Nome}
        `);

    if (Nome) {
        queryParts.push(` nome = $${counter++}`);
        values.push(Nome);
    } else {
        queryParts.push(` nome = $${counter++}`);
        values.push(nomeAtual);
    }

    if (Senha && Senha.length >= 6) {
        const senhaHash = await hash(Senha, 10);
        queryParts.push(` senha = $${counter++}`);
        values.push(senhaHash);
    }

    try {
        if (queryParts.length === 0) {
            throw new Error("Nada a ser atualizado");
        }

        query += queryParts.join(",");
        query += ` WHERE id = $${counter}`;
        values.push(id);

        await pool.query(query, values);

        return NextResponse.json({
            success: true,
            message: "Usuário Editado.",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Erro ao deletar usuário." },
            { status: 500 }
        );
    }
}
