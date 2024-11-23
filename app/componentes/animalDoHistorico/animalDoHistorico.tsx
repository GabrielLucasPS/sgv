import {
    createEmptyAnimal,
    getAnimalPorHistorico,
    getHistoricosPorVacina,
} from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Animal, HistoricoVacina } from "@/lib/types/dbTypes";

interface Props {
    historico: HistoricoVacina;
}

const AnimalDoHistorico: React.FC<Props> = ({ historico }) => {
    let emptyAnimal = createEmptyAnimal();
    const [animal, setAnimal] = useState<Animal>(emptyAnimal);

    const getHistoricos = async () => {
        const newAnimal = await getAnimalPorHistorico(historico.id);
        console.log("Animal retornado:", newAnimal);
        setAnimal(newAnimal);
    };

    useEffect(() => {
        getHistoricos();
    }, []);

    console.log("Animal no estado:", animal);

    return (
        <span>
            Animal {animal?.especie} - {animal?.brinco || "não encontrado"}
        </span>
    );
};

export default AnimalDoHistorico;
