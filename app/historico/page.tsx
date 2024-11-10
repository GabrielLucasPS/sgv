"use server";
import "./historico.css";

import { getServerSession } from "next-auth";
import CreateHistorico from "../componentes/criarHistorico/createHistorico";
import { TabelaHistoricos } from "../componentes/tabelaHistoricos/tabelaHistoricos";
export default async function Usuarios() {
    const session = await getServerSession();
    return (
        <main className="historicos_page">
            <h1 className="sectionTitle"></h1>

            <div className="criarHistoricoContainer">
                <h3 className="font-bold text-2xl mb-2">Adicionar Histórico</h3>
                <CreateHistorico />
            </div>

            <div className="TabelaHistoricoContainer">
                <h3 className="historicoTitle font-bold text-2xl mb-2">
                    Históricos
                </h3>
                <TabelaHistoricos />
            </div>
        </main>
    );
}
