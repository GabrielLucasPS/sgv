// app/api/deleteUser/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/dbConnection";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
    const { data, id } = await request.json();
    console.log(data, id);
    if (data && id) {
        console.log("entrou");

        try {
            await pool.query(
                `
                UPDATE historicovacina
                SET dataUltimaVacina = $1
                WHERE id = $2;`,
                [data, id]
            );
            revalidatePath;
            return NextResponse.json({
                success: true,
                message: "Data Editada.",
            });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ success: false, status: 501 });
        }
    } else {
        return NextResponse.json({ success: false, status: 502 });
    }
}
