"use client";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Animal, Vacina, HistoricoVacina } from "@/lib/types/dbTypes";
import { Session } from "next-auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import "./tabelaHistoricos.css";
import { getAnimalComHistorico, getAnimalHistorico } from "@/lib/utils";

interface Props {
    session: Session | null;
}

export function TabelaHistoricos() {
    const [animais, setAnimais] = useState<Animal[]>([]);
    const [historicos, setHistoricos] = useState<HistoricoVacina[]>([]);

    const getAnimais = async () => {
        const Animais = getAnimalComHistorico();
        setAnimais(await Animais);
    };

    useEffect(() => {
        getAnimais();
    }, []);

    return (
        <div className="historicosContainer">
            {animais.map((item) => (
                <div>{item.brinco}</div>
            ))}
        </div>
    );
}
