import LoginForm from "@/components/loginForm/loginForm";
import Image from "next/image";
import { getSession } from "@/lib";
import Router from "next/navigation";
import { JWTInterface } from "./types";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { decrypt } from "@/lib";
export default async function Home() {
    const cookieStore = cookies();
    const userSession = cookieStore.get("session"); // Pega o cookie de sessão
    if (userSession) {
        console.log("vvvvvvvvvvvvvvvv sessao: ", decrypt(userSession?.value));
    }
    return (
        <main className="LoginPage">
            <div className="loginLeft">
                <h1>COLOCAR ALGO LEGAL AQUI:</h1>
                <h2></h2>
                <div>
                    <button className="btn "></button>
                </div>
            </div>
            <div className="loginRight">
                <div className="loginContainer">
                    <Image
                        src="/logoBg.png"
                        alt="imagem next"
                        width="120"
                        height="120"
                        className="logo"
                    />
                    <div className="loginFormContainer">
                        <LoginForm></LoginForm>
                    </div>
                </div>
            </div>
        </main>
    );
}
