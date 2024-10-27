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
import { Animal, Vacina } from "@/lib/types/dbTypes";
import { Session } from "next-auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    session: Session | null;
}

export function TabelaVacinas({ session }: Props) {
    const [vacinas, setVacinas] = useState<Vacina[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string | undefined>("");
    const [fabricante, setFabricante] = useState<string>("");
    const [intervalo, setIntervalo] = useState<number>(0);
    const [editingVacina, setEditingVacina] = useState<Vacina | null>(null); // Armazena a vacina que está sendo editado

    const fetchVacinas = async () => {
        try {
            const response = await fetch("/api/getAllVacinas", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                setVacinas(data.Vacinas);
            } else {
                setError("Nenhuma vacina encontrada.");
            }
        } catch (err) {
            setError("Erro ao buscar vacinas.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVacinas();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch("/api/deleteVacina", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const result = await response.json();

            if (result.success) {
                // Atualiza a lista de animais
                setVacinas((prevVacinas) =>
                    prevVacinas.filter((vacina) => vacina.id !== id)
                );

                toast({
                    title: result.message,
                    duration: 5000,
                    variant: "success",
                });
            } else {
                console.error("Erro ao deletar vacina:", result.message);
                toast({
                    title: "Erro",
                    description: result.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Erro ao deletar animal:", error);
        }
    };

    const handleEditOpen = (vacina: Vacina) => {
        setNome(vacina.nome);
        setFabricante(vacina.fabricante);
        setDescricao(vacina.descricao);
        setIntervalo(vacina.intervalodose);
        setEditingVacina(vacina); // Armazena a vacina que está sendo editado
    };

    const handleEdit = async (id: number) => {
        try {
            const response = await fetch("/api/editVacina", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    nome,
                    descricao,
                    fabricante,
                    intervalo,
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Recarrega a lista de vacinas após a edição
                fetchVacinas();

                setNome("");
                setFabricante("");
                setDescricao("");
                setIntervalo(0);
                setEditingVacina(null); // Limpa a vacina em edição

                toast({
                    title: result.message,
                    duration: 2000,
                    variant: "success",
                });
            } else {
                console.error("Erro ao editar vacina:", result.message);
                toast({
                    title: "Erro",
                    description: result.message,
                    variant: "destructive",
                    duration: 1000,
                });
            }
        } catch (error) {
            console.error("Erro ao editar vacina:", error);
        }
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Fabricante</TableHead>
                        <TableHead>Intervalo da Dose</TableHead>
                        <TableHead>Data Registro</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vacinas.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">
                                {item.id}
                            </TableCell>
                            <TableCell>{item.nome}</TableCell>
                            <TableCell className="max-w-[300px]">
                                {item.descricao}
                            </TableCell>
                            <TableCell>{item.fabricante}</TableCell>
                            <TableCell>{item.intervalodose}</TableCell>

                            <TableCell>
                                {item.dataregistro != undefined
                                    ? format(
                                          new Date(item.dataregistro),
                                          "dd-MM-yyyy HH:mm"
                                      )
                                    : ""}
                            </TableCell>

                            <TableCell className="text-right min-w-[100px]">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="editIcon mr-2"
                                            onClick={() => handleEditOpen(item)}
                                        ></Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Editar Vacina - {item.nome}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div>
                                            <Label>Nome</Label>
                                            <Input
                                                type="text"
                                                value={nome}
                                                onChange={(e) =>
                                                    setNome(e.target.value)
                                                }
                                                className="mb-3"
                                            />

                                            <Label>Descrição</Label>
                                            <Input
                                                type="text"
                                                value={descricao}
                                                onChange={(e) =>
                                                    setDescricao(e.target.value)
                                                }
                                                className="mb-3"
                                            />

                                            <Label>Fabricante</Label>
                                            <Input
                                                type="text"
                                                value={fabricante}
                                                onChange={(e) =>
                                                    setFabricante(
                                                        e.target.value
                                                    )
                                                }
                                                className="mb-3"
                                            />

                                            <Label>Intervalo da Dose</Label>
                                            <Input
                                                type="number"
                                                value={intervalo}
                                                onChange={(e) =>
                                                    setIntervalo(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                className="mb-3"
                                            />
                                        </div>
                                        <DialogFooter>
                                            <DialogClose>
                                                <Button
                                                    variant="destructive"
                                                    className="mr-3"
                                                    onClick={() => {
                                                        setNome("");
                                                        setFabricante("");
                                                        setDescricao("");
                                                        setIntervalo(0);
                                                        setEditingVacina(null);
                                                    }}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    className="bg-[#1055DA] hover:bg-bg-[#1055DA] hover:opacity-90"
                                                    onClick={() => {
                                                        handleEdit(item.id);
                                                    }}
                                                >
                                                    Salvar
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Button
                                    onClick={() => handleDelete(item.id)} // Passa o id aqui
                                    className="deleteIcon"
                                ></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
