"use server";
import "./usuarios.css";
import { getUsers } from "../actions";
import CreateUserForm from "../../components/criarUsuario/createUserForm"; // Importar o componente do cliente
import { JWTInterface, Login } from "../types";

import { TabelaUsuarios } from "@/components/tabelaUsuarios/tabelaUsuairos";
import { getSession, logout } from "@/lib";
import { redirect } from "next/navigation";

export default async function Usuarios() {
    const session: JWTInterface = await getSession();
    if (!session) {
        redirect("/"); // Trate a ausência de sessão
    }
    console.log("---------------------------", session);
    const users = await getUsers();

    return (
        <main className="usuarios_page">
            <h1 className="sectionTitle">
                Usuario: {session.user.nome} - {session.user.email}
            </h1>

            <div>
                <h3>Adicionar Usuario</h3>
                <CreateUserForm />
            </div>

            <div>
                <h3>Usuarios</h3>

                <TabelaUsuarios users={users} />
            </div>
        </main>
    );
}
