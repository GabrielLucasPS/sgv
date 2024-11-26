import { getHistoricosPorVacina } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { HistoricoVacina } from "@/lib/types/dbTypes";
import "./listaVacina.css";
import { addDays, format } from "date-fns";
import { useDraggable } from "react-use-draggable-scroll";
import AnimalDoHistorico from "../animalDoHistorico/animalDoHistorico";

type Vacina = {
    id: number;
    nome: string;
    descricao?: string;
    intervalodose: number;
    fabricante: string;
    dataregistro?: Date;
};

interface Props {
    vacina: Vacina;
}

const ListaVacinasComHistoricos: React.FC<Props> = ({ vacina }) => {
    const ref =
        useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true,
    });

    const [historicosPorVacina, setHistoricosPorVacina] = useState<
        HistoricoVacina[]
    >([]);

    const getHistoricos = async () => {
        const newHistoricos = getHistoricosPorVacina(vacina.id);
        setHistoricosPorVacina(await newHistoricos);
    };

    useEffect(() => {
        getHistoricos();
    }, []);

    return (
        <div>
            <div key={vacina.id} className="VacinasContainer">
                <div className="vacinaContainer">
                    <h2>
                        <strong className="text-[1.2vw] ">{vacina.nome}</strong>
                    </h2>
                    <p>{vacina.descricao || "Sem descrição disponível"}</p>
                    <p>
                        <strong>Fabricante:</strong> {vacina.fabricante}
                    </p>
                    <h3>Históricos:</h3>
                </div>

                <div className="historicosListContainer " ref={ref} {...events}>
                    {historicosPorVacina.length ? (
                        historicosPorVacina.map((historico) => (
                            <div
                                className="historicoContainer cursor-pointer hover:scale-105 lg:hover:scale-[1.01] transition duration-200"
                                key={historico.id}
                            >
                                <div className="historicoTitle">
                                    <div>
                                        <AnimalDoHistorico
                                            historico={historico}
                                        />
                                    </div>
                                    <div>
                                        <div
                                            className={
                                                historico.status === "pendente"
                                                    ? "historicoStatus status-pendente "
                                                    : historico.status ===
                                                      "atrasada"
                                                    ? "historicoStatus status-atrasada "
                                                    : "historicoStatus status-realizada"
                                            }
                                        ></div>
                                    </div>
                                </div>
                                <div className="historicoContent">
                                    <div className="contentText">
                                        <span>Dosagem:</span>
                                        <span>{historico.dosagem} ml</span>
                                    </div>

                                    <div className="contentText">
                                        <span>Proxíma dose:</span>
                                        <span>
                                            {format(
                                                addDays(
                                                    new Date(
                                                        historico.data_vacinacao
                                                    ),
                                                    historico.intervalo_proxima_dose
                                                        ? historico.intervalo_proxima_dose
                                                        : 0
                                                ),
                                                "dd-MM-yyyy"
                                            )}
                                        </span>
                                    </div>

                                    <div className="contentText">
                                        <span>Intervalo entre doses:</span>
                                        <span>
                                            {historico.intervalo_proxima_dose}{" "}
                                            Dias
                                        </span>
                                    </div>

                                    <div className="observacaoContent">
                                        Observação: {historico.observacao}
                                    </div>
                                </div>
                                {/* <p>
                                    <strong>Data:</strong>{" "}
                                    {format(
                                        new Date(historico.data_vacinacao),
                                        "dd-MM-yyyy"
                                    )}
                                </p>
                                <p>
                                    <strong>Dosagem:</strong>{" "}
                                    {historico.dosagem}
                                </p>
                                <p>
                                    <strong>Status:</strong> {historico.status}
                                </p>
                                {historico.observacao && (
                                    <p>
                                        <strong>Observação:</strong>{" "}
                                        {historico.observacao}
                                    </p>
                                )}
                                <br /> */}
                            </div>
                        ))
                    ) : (
                        <p>Sem históricos para esta vacina.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListaVacinasComHistoricos;
