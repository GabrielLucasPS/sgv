// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import { hash } from "bcrypt";

export async function POST(request: Request) {
    const { id, Especie, Brinco, Peso } = await request.json(); // Supondo que o id será enviado no corpo da requisição
    let query = "UPDATE animal SET";
    let values = [];
    let queryParts = [];
    let counter = 1;

    console.log(`
        id: ${id},
        Especie: ${Especie},
        Brinco: ${Brinco},
        Peso: ${Peso}
        `);

    if (Especie) {
        queryParts.push(` especie = $${counter++}`);
        values.push(Especie);
    }

    if (Brinco) {
        queryParts.push(` brinco = $${counter++}`);
        values.push(Brinco);
    }

    if (Peso) {
        queryParts.push(` peso = $${counter++}`);
        values.push(Peso);
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
            message: "Animal Editado.",
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Erro ao editar animal." },
            { status: 500 }
        );
    }
}
