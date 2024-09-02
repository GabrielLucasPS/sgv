import "./usuarios.css";
import { pool } from "../utils/dbConnection";
import dbConnect from "../utils/dbConnection";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createUser, getUsers } from "../actions";
import { Usuario } from "../types";
import { format } from "date-fns";

export default async function Usuairos() {
    //Buscar usuarios
    let users = await getUsers();

    return (
        <main className="usuarios_page">
            <h1 className="sectionTitle">Usuarios</h1>
            <div>
                <h3>adicionar Usuario</h3>
                <form action={createUser} className="space-y-5 mb-10">
                    <input
                        type="text"
                        name="nome"
                        id="newNome"
                        placeholder="Nome do usuario"
                        className="shadow-md mr-4  rounded-md shadow-black h-10 p-3"
                    />

                    <input
                        type="text"
                        name="email"
                        id="newEmail"
                        placeholder="Email"
                        className="shadow-md mr-4 rounded-md shadow-black h-10 p-3"
                    />

                    <input
                        type="text"
                        name="senha"
                        id="newSenha"
                        placeholder="Senha"
                        className="shadow-md mr-4 rounded-md shadow-black h-10 p-3"
                    />

                    <button
                        type="submit"
                        className="font-bold text-white bg-[#1055DA]  p-3 rounded-md"
                    >
                        Criar Usuário
                    </button>
                </form>
            </div>

            <div>
                <h3>Usuarios</h3>
                <div>
                    <ul>
                        {users.map((element, key) => {
                            return (
                                <li key={key}>
                                    <div>Login: {element.nome}</div>
                                    <div>Email: {element.email}</div>
                                    <div>Senha: {element.senha}</div>
                                    <div>
                                        Data de Criação:
                                        {format(
                                            element.data_criacao,
                                            "dd-MM-yyyy HH:mm"
                                        )}
                                    </div>
                                    <div>
                                        --------------------------------------
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </main>
    );
}
