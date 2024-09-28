import Image from "next/image";
import LoginForm from "../componentes/loginForm/loginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await getServerSession();

    if (session) {
        redirect("/usuarios");
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
