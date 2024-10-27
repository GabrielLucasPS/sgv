// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import { hash } from "bcrypt";

export async function POST(request: Request) {
    const { id, nome, descricao, fabricante, intervalo } = await request.json();
    let query = "UPDATE vacina SET";
    let values = [];
    let queryParts = [];
    let counter = 1;

    console.log(`
        id: ${id},
        Nome: ${nome},
        descricao: ${descricao},
        fabricante: ${fabricante},
        intervalo: ${intervalo}
        `);

    if (nome) {
        queryParts.push(` nome = $${counter++}`);
        values.push(nome);
    }

    if (descricao) {
        queryParts.push(` descricao = $${counter++}`);
        values.push(descricao);
    }

    if (intervalo) {
        queryParts.push(` intervalodose = $${counter++}`);
        values.push(intervalo);
    }

    if (fabricante) {
        queryParts.push(` fabricante = $${counter++}`);
        values.push(fabricante);
    }

    try {
        if (queryParts.length === 0) {
            throw new Error("Nada a ser atualizado");
        }

        query += queryParts.join(",");
        query += ` WHERE id = $${counter}`;
        values.push(id);
        console.log(query);
        await pool.query(query, values);

        return NextResponse.json({
            success: true,
            message: "vacina Editada.",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Erro ao editar vacina." },
            { status: 500 }
        );
    }
}
