import Image from "next/image";

export default function Home() {
    return (
        <main className="absolute  left-[40%] top-[30%] ">
            <h1 className="text-[5vw]">Home</h1>
            <Image src="/next.svg" alt="imagem next" height="500" width="500" />
        </main>
    );
}
