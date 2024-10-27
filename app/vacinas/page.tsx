"use server";
import "./vacinas.css";

import { getServerSession } from "next-auth";
import CreateVacina from "../componentes/criarVacina/createVacina";
import { TabelaVacinas } from "../componentes/tabelaVacinas/tabelaVacinas";
export default async function Usuarios() {
    const session = await getServerSession();
    return (
        <main className="usuarios_page">
            <h1 className="sectionTitle"></h1>

            <div>
                <h3 className="font-bold text-2xl mb-2">Adicionar Vacina</h3>
                <CreateVacina />
            </div>

            <div>
                <h3 className="font-bold text-2xl mb-2">Vacinas</h3>
                <TabelaVacinas session={session} />
            </div>
        </main>
    );
}
