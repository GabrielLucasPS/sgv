export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    hash?: string;
    data_criacao: Date;
}

export interface Login {
    id: number;
    nome: string;
    email: string;
    hash?: string;
    data_criacao: Date;
}

export class LoginInicial implements Login {
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
    dataNascimento: Date; // Opcional, se não for obrigatório
    peso: number; // Opcional, exemplo: 15.75
    dataDesmame: Date; // Opcional, pode ser null
    dataRegistro: Date;
}

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
