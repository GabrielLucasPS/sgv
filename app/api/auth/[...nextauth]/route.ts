import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { pool } from "@/lib/dbConnection";
import { Usuario } from "@/lib/types/dbTypes";
import { toast } from "@/hooks/use-toast";

console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);

const handler = nextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                senha: {},
            },
            async authorize(credentials, req) {
                let email = credentials?.email;
                let senha = credentials?.senha;
                console.log(email, senha);

                const resposta = await pool.query<Usuario>(
                    `SELECT id, nome, email, senha FROM usuario WHERE email = LOWER($1)`,
                    [email]
                );

                const usuarioParaLogin = resposta.rows[0];
                console.log("resposta: ", usuarioParaLogin);

                const ValidarSenha = await compare(
                    senha || "",
                    usuarioParaLogin.senha
                );

                console.log({ ValidarSenha });

                if (ValidarSenha) {
                    return {
                        id: usuarioParaLogin.id,
                        email: usuarioParaLogin.email,
                    };
                } else {
                    console.log("login errado");
                    return null;
                }
            },
        }),
    ],
});

export { handler as GET, handler as POST };
