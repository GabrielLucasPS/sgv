import Image from "next/image";
import { Calendario } from "./componentes/calendario/Calendario";

export default async function Home() {
	return (
		<div className="homeContainer">
			<Calendario />
		</div>
	);
}
