import "./usuarios.css";
import { pool } from "../utils/dbConnection";
import dbConnect from "../utils/dbConnection";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createUser, getUsers } from "../actions";
import { Usuario } from "../types";

export default async function Usuairos() {
    //CREATE
    const users = await getUsers();

    return (
        <main>
            <h1>Usuarios</h1>
            <div>
                <h3>adicionar Usuario</h3>
                <form action={createUser} className="space-y-5">
                    <input
                        type="text"
                        name="nome"
                        id="newNome"
                        placeholder="Nome do usuario"
                        className="shadow-lg rounded-md shadow-black h-10 p-3"
                    />

                    <input
                        type="text"
                        name="email"
                        id="newEmail"
                        placeholder="Email"
                        className="shadow-lg rounded-md shadow-black h-10 p-3"
                    />

                    <input
                        type="text"
                        name="senha"
                        id="newSenha"
                        placeholder="Senha"
                        className="shadow-lg rounded-md shadow-black h-10 p-3"
                    />

                    <button
                        type="submit"
                        className="font-bold text-white bg-red-600 p-3 rounded-md"
                    >
                        Criar
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
                                    <div>{element.nome}</div>
                                    <div>{element.email}</div>
                                    <div>{element.dataCriacao.toString()}</div>
                                    <div>
                                        ---------------------------------------
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
