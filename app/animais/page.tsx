"use server";
import "./animais.css";
import CreateAnimals from "../componentes/criarAnimais/createAnimals";

import { getServerSession } from "next-auth";
import { TabelaAnimais } from "../componentes/tabelaAnimais/tabelaAnimais";
export default async function Usuarios() {
    const session = await getServerSession();
    return (
        <main className="usuarios_page">
            <h1 className="sectionTitle"></h1>

            <div>
                <h3 className="font-bold text-2xl mb-2">Adicionar Animal</h3>
                <CreateAnimals />
            </div>

            <div>
                <h3 className="font-bold text-2xl mb-2">Animais</h3>
                <TabelaAnimais session={session} />
            </div>
        </main>
    );
}
