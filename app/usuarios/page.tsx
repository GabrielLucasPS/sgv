"use server";
import CreateUserForm from "../componentes/criarUsuario/createUserForm";
import "./usuarios.css";

import { getServerSession } from "next-auth";
import { TabelaUsuarios } from "../componentes/tabelaUsuarios/tabelaUsuairos";

export default async function Usuarios() {
    const session = await getServerSession();
    return (
        <main className="usuarios_page">
            <div className="adicionarUsuarios">
                <h2 className="font-bold text-2xl mb-2">Adicionar Usuario</h2>
                <CreateUserForm />
            </div>

            <div className="tabelaUsuariosContainer">
                <h2 className="font-bold text-2xl mb-2">Usuarios</h2>
                <TabelaUsuarios session={session} />
            </div>
        </main>
    );
}
