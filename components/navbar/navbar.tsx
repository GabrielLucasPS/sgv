"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./navbar.css";

type Props = {
    logado?: boolean;
    path?: string;
};

const Navbar = async ({ logado, path }: Props) => {
    const pathname = usePathname();

    if (pathname != "login") {
        return (
            <nav className="navbarContainer">
                <div>
                    <Link
                        href="/"
                        className={
                            pathname == "/"
                                ? "menuBtn ativo homeIcon "
                                : "menuBtn  homeIcon"
                        }
                    >
                        <div className="img"></div>
                    </Link>

                    <Link href="/" className="menuBtn  registrosIcon">
                        <div className="img"></div>
                    </Link>

                    <Link href="/" className="menuBtn  animaisIcon">
                        <div className="img"></div>
                    </Link>

                    <Link
                        href="/usuarios"
                        className={
                            pathname == "/usuarios"
                                ? "menuBtn  usuariosIcon ativo "
                                : "menuBtn  usuariosIcon"
                        }
                    >
                        <div className="img"></div>
                    </Link>
                </div>
                <div>
                    <Link href="/" className="menuBtn logoutIcon">
                        <div className="img"></div>
                    </Link>
                </div>
            </nav>
        );
    } else {
        return <div className="hidden"></div>;
    }
};

export default Navbar;
