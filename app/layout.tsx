import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Sistema de Gestão de Vacinas",
    description: "Sistema criado para gerenciar vacinas",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body className={inter.className}>
                <div className="flex min-h-screen overflow-hidden ">
                    <Navbar></Navbar>
                    {children}
                </div>
                <Toaster />
            </body>
        </html>
    );
}
