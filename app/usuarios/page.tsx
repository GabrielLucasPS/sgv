"use server";
import "./usuarios.css";
import { createUser, getUsers } from "../actions";
import { format } from "date-fns";
import CreateUserForm from "../../components/criarUsuario/createUserForm"; // Importar o componente do cliente
import { Login } from "../types";

import { TabelaUsuarios } from "@/components/tabelaUsuarios/tabelaUsuairos";

export default async function Usuarios() {
    const users = await getUsers();

    return (
        <main className="usuarios_page">
            <h1 className="sectionTitle">Usuarios</h1>

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
