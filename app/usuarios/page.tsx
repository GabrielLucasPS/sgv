"use server";
import "./usuarios.css";
import { createUser, getUsers } from "../actions";
import { format } from "date-fns";
import CreateUserForm from "../components/criarUsuario/createUserForm"; // Importar o componente do cliente
import { Login } from "../types";

export default async function Usuarios() {
    const users = await getUsers();

    async function handleCreateUser(data: FormData) {
        "use server";
        await createUser(data); // Lógica do lado do servidor
    }

    return (
        <main className="usuarios_page">
            <h1 className="sectionTitle">Usuarios</h1>

            <div>
                <h3>Adicionar Usuario</h3>
                <CreateUserForm handleCreateUser={handleCreateUser} />
            </div>

            <div>
                <h3>Usuarios</h3>
                <div>
                    <ul>
                        {users.map((element, key) => (
                            <li key={key}>
                                <div>Login: {element.nome}</div>
                                <div>Email: {element.email}</div>
                                <div>Senha: {element.senha}</div>
                                <div>
                                    Data de Criação:{" "}
                                    {format(
                                        new Date(element.data_criacao),
                                        "dd-MM-yyyy HH:mm"
                                    )}
                                </div>
                                <div>
                                    --------------------------------------
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
