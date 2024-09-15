"use client";
import { useState } from "react";

interface Props {
    handleCreateUser: (data: FormData) => Promise<void>;
}

export default function CreateUserForm({ handleCreateUser }: Props) {
    // Estados para controlar os campos
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Criar um FormData manualmente com os estados
        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("email", email);
        formData.append("senha", senha);

        await handleCreateUser(formData);

        // Resetar os campos após a criação do usuário
        setNome("");
        setEmail("");
        setSenha(""); // Resetando o campo de senha
    }

    return (
        <form onSubmit={onSubmit} className="space-y-5 mb-10">
            <input
                type="text"
                name="nome"
                id="newNome"
                placeholder="Nome do usuario"
                className="shadow-md mr-4 rounded-md shadow-black h-10 p-3"
                value={nome} // Vinculando o estado
                onChange={(e) => setNome(e.target.value)} // Atualizando o estado
            />

            <input
                type="text"
                name="email"
                id="newEmail"
                placeholder="Email"
                className="shadow-md mr-4 rounded-md shadow-black h-10 p-3"
                value={email} // Vinculando o estado
                onChange={(e) => setEmail(e.target.value)} // Atualizando o estado
            />

            <input
                type="text"
                name="senha"
                id="newSenha"
                placeholder="Senha"
                className="shadow-md mr-4 rounded-md shadow-black h-10 p-3"
                value={senha} // Vinculando o estado
                onChange={(e) => setSenha(e.target.value)} // Atualizando o estado
            />

            <button
                type="submit"
                className="font-bold text-white bg-[#1055DA] p-3 rounded-md"
            >
                Criar Usuário
            </button>
        </form>
    );
}
