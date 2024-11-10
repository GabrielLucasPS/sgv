import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Animal, HistoricoVacina } from "./types/dbTypes";
import { json } from "stream/consumers";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function getHistoricosAnimal(animalId: number) {
    let a = animalId;
    try {
        const response = await fetch("/api/getAllAnimais", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.success) {
            const animais: Animal[] = data.Animais;

            const formattedAnimalList = animais.map((animal) => ({
                value: animal.id,
                label: animal.brinco,
            }));
        } else {
        }
    } catch (err) {
        console.error("Erro:", err);
        const vazio: [] = [];
    }
}

export async function getAnimalComHistorico() {
    const vazio: Animal[] = [];
    try {
        const response = await fetch("/api/getAllAnimaisHistorico", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.success) {
            const animais: Animal[] = data.Animais;

            return animais;
        } else {
            return vazio;
        }
    } catch (err) {
        console.error("Erro:", err);

        return vazio;
    }
}

export async function getAnimalHistorico(animalId: number) {
    const vazio: HistoricoVacina[] = [];
    try {
        const response = await fetch("/api/getAnimalHistorico", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: animalId,
            }),
        });

        const data = await response.json();

        if (data.success) {
            const historicos: HistoricoVacina[] = data.historicos;

            return historicos;
        } else {
            return vazio;
        }
    } catch (err) {
        console.error("Erro:", err);
        return vazio;
    }
}
