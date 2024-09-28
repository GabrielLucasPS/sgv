"use server";
import CreateUserForm from "../componentes/criarUsuario/createUserForm";
import "./usuarios.css";

import { getServerSession } from "next-auth";
import { TabelaUsuarios } from "../componentes/tabelaUsuarios/tabelaUsuairos";

export default async function Usuarios() {
    const session = await getServerSession();
    return (
        <main className="usuarios_page">
            <h1 className="sectionTitle">Usuario:</h1>

            <div>
                <h3>Adicionar Usuario</h3>
                <CreateUserForm />
            </div>

            <div>
                <h3>Usuarios</h3>
                <TabelaUsuarios session={session} />
            </div>
        </main>
    );
}
