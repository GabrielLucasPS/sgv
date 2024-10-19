"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "./navbar.css";
import { signOut } from "next-auth/react";

const Navbar = () => {
    const pathname = usePathname();

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

                <Link
                    href="/animais"
                    className={
                        pathname == "/animais"
                            ? "menuBtn  animaisIcon ativo "
                            : "menuBtn  animaisIcon"
                    }
                >
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
                <div onClick={() => signOut()} className="menuBtn logoutIcon">
                    <div className="img"></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
