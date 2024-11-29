import { atualizarDataHistorico, getHistoricosPorVacina } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { HistoricoVacina } from "@/lib/types/dbTypes";
import "./listaVacina.css";
import { addDays, format, set } from "date-fns";
import { useDraggable } from "react-use-draggable-scroll";
import AnimalDoHistorico from "../animalDoHistorico/animalDoHistorico";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
    const { toast } = useToast();
    const ref =
        useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true,
    });

    let novaDataInicial = new Date();
    const [novaData, setNovaData] = useState<Date>(novaDataInicial);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setNovaData(new Date(selectedDate));
    };

    const handleNovaData = async (data: Date, id: number) => {
        const sucesso = await atualizarDataHistorico(data, id);
        if (sucesso == true) {
        } else {
            console.error("Falha na atualização.");
        }
    };

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
                    <p className="mb-2 overflow-auto max-h-[50%]">
                        <strong>Descrição:</strong>
                        {vacina.descricao || "Sem descrição disponível"}
                    </p>
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
                                    <div className="flex items-center">
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button className="editIcon"></Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Selecione a data que foi
                                                        vacinado
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="flex flex-col items-center justify-start gap-2">
                                                        <Label
                                                            htmlFor="name"
                                                            className="text-left w-full "
                                                        >
                                                            Data da vacinação
                                                        </Label>
                                                        <input
                                                            id="date"
                                                            className="w-full text-[1vw] inputNovaDataVacinacao rounded-md"
                                                            type="date"
                                                            onChange={
                                                                handleDateChange
                                                            }
                                                            value={
                                                                novaData
                                                                    .toISOString()
                                                                    .split(
                                                                        "T"
                                                                    )[0]
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button
                                                        onClick={() =>
                                                            handleNovaData(
                                                                novaData,
                                                                historico.id
                                                            )
                                                        }
                                                        className="btn"
                                                    >
                                                        Salvar
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <div
                                            className={
                                                addDays(
                                                    new Date(
                                                        historico.dataultimavacina
                                                    ),
                                                    historico.intervalo_proxima_dose
                                                        ? historico.intervalo_proxima_dose
                                                        : 0
                                                ) >= new Date()
                                                    ? "historicoStatus status-realizada ml-4"
                                                    : "historicoStatus status-atrasada ml-4"
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
                                                        historico.dataultimavacina
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
