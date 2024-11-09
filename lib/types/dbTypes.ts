export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    hash?: string;
    data_criacao: Date;
}

export interface User {
    id: number;
    nome: string;
    email: string;
    hash?: string;
    data_criacao: Date;
}

export class LoginInicial implements User {
    id: number;
    nome: string;
    email: string;
    hash?: string;
    data_criacao: Date;

    // Construtor vazio
    constructor() {
        this.id = 0; // ou algum valor padrão
        this.nome = "";
        this.email = "";
        this.data_criacao = new Date(); // ou outro valor padrão
        this.hash = undefined; // ou pode ser omitido
    }
}

export interface Animal {
    id: number;
    especie: string;
    brinco: string;
    peso: number; // Opcional, exemplo: 15.75
    datanascimento: Date; // Opcional, se não for obrigatório
    datadesmame: Date; // Opcional, pode ser null
    dataregistro: Date;
}

export type Vacina = {
    id: number;
    nome: string;
    descricao?: string;
    intervalodose: number;
    fabricante: string;
    dataregistro?: Date;
};

type HistoricoVacina = {
    id: number;
    animalId: number;
    vacinaId: number;
    dataVacinacao: Date;
    dosagem: number;
    intervaloProximaDose?: string; // usando string para o intervalo (ex: "30 days")
    status: "pendente" | "realizada" | "atrasada";
    observacao?: string;
    reacaoAdversa?: string;
    responsavelId?: number;
};

export interface JWTInterface {
    user: {
        id: number;
        nome: string;
        email: string;
    };
    expires: string;
    iat: number;
    exp: number;
}
