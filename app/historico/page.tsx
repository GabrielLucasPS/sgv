"use server";
import "./historico.css";

import { getServerSession } from "next-auth";
import CreateHistorico from "../componentes/criarHistorico/createHistorico";
export default async function Usuarios() {
    const session = await getServerSession();
    return (
        <main className="usuarios_page">
            <h1 className="sectionTitle"></h1>

            <div>
                <h3 className="font-bold text-2xl mb-2">Adicionar Histórico</h3>
                <CreateHistorico />
            </div>

            <div>
                <h3 className="font-bold text-2xl mb-2">Históricos</h3>
            </div>
        </main>
    );
}
