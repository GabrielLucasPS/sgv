import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Navbar from "./componentes/navbar/navbar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "SGV - Unipam",
    description: "Sistema de gestão de vacinas para gado.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
    return (
        <html lang="pt-Br">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="flex min-h-screen max-h-screen overflow-hidden">
                    {!!session && <Navbar></Navbar>}
                    {!session && <></>}

                    {children}
                </div>

                <Toaster />
            </body>
        </html>
    );
}
