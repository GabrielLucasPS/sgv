import Image from "next/image";
import LoginForm from "../componentes/loginForm/loginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { primeiraEntrada } from "../actions";

export default async function Login() {
    const session = await getServerSession();
    primeiraEntrada();
    if (session) {
        redirect("/usuarios");
    }

    return (
        <main className="LoginPage">
            <div className="loginLeft"></div>
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
