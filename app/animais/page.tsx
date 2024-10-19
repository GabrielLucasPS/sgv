"use server";
import "./usuarios.css";
import { getUsers } from "../actions";
import CreateAnimals from "../../components/criarAnimais/createAnimals"; // Importar o componente do cliente
import { JWTInterface, Login } from "../types";

import { TabelaUsuarios } from "@/components/tabelaUsuarios/tabelaUsuairos";
import { getSession, logout } from "@/lib";
import { redirect } from "next/navigation";

export default async function Usuarios() {
    

    return (
        <main className="usuarios_page">
            <h1 className="sectionTitle">
              
            </h1>

            <div>
                <h3>Adicionar Usuario</h3>
                <CreateAnimals/>
            </div>

            <div>
                <h3>Usuarios</h3>

                
            </div>
        </main>
    );
}
