export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    dataCriacao: Date;
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
