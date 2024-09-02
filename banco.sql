CREATE TABLE animal (
    id SERIAL PRIMARY KEY,
    especie VARCHAR(50) NOT NULL,
    brinco VARCHAR(50) NOT NULL,
    data_nascimento DATE,
    peso DECIMAL(5, 2), -- Exemplo: 15.75 kg
    data_desmame DATE,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);