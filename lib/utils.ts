import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Animal, HistoricoVacina, Vacina } from "./types/dbTypes";
import { json } from "stream/consumers";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function createEmptyAnimal(): Animal {
    return {
        id: 0,
        especie: "",
        brinco: "",
        peso: 0,
        datanascimento: new Date(),
        datadesmame: new Date(),
        dataregistro: new Date(),
    };
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

export async function getHistoricosPorVacina(vacinaId: number) {
    const vazio: HistoricoVacina[] = [];
    try {
        const response = await fetch(
            `/api/getHistoricosPorVacina?vacinaId=${vacinaId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();

        if (data.success) {
            const Historico: HistoricoVacina[] = data.Historico;

            return Historico;
        } else {
            return vazio;
        }
    } catch (err) {
        console.error("Erro:", err);

        return vazio;
    }
}

export async function getAnimalPorHistorico(historicoid: number) {
    const vazio = createEmptyAnimal();
    try {
        const response = await fetch(
            `/api/getAnimalPorHistorico?historicoId=${historicoid}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();
        console.log("Resposta da API:", data);
        if (data.success == true) {
            const animal: Animal = data.animal;
            return animal;
        } else {
            return vazio;
        }
    } catch (err) {
        console.error("Erro:", err);
        return vazio;
    }
}

export async function getVacinasHistorico() {
    const vazio: Vacina[] = [];
    try {
        const response = await fetch("/api/getAllVacinas", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.success) {
            const Vacinas: Vacina[] = data.Vacinas;

            return Vacinas;
        } else {
            return vazio;
        }
    } catch (err) {
        console.error("Erro:", err);

        return vazio;
    }
}

export async function atualizarDataHistorico(dataVacina: Date, id: number) {
    try {
        const response = await fetch("/api/editHistoricoVacina", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: dataVacina,
                id: id,
            }),
        });
        const data = await response.json();

        if (data.success) {
            console.error("Alterou:", data.message);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error("Erro:", err);
        return false;
    }
}

export async function getAllHistoricos() {
    const vazio: HistoricoVacina[] = [];
    try {
        const response = await fetch("/api/getAllHistoricos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        if (data.success) {
            return data.eventos;
        } else {
            return data.eventos;
        }
    } catch (err) {
        console.error("Erro:", err);
        return vazio;
    }
}
