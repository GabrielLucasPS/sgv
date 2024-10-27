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
import { Animal } from "@/lib/types/dbTypes";
import { Session } from "next-auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    session: Session | null;
}

export function TabelaAnimais({ session }: Props) {
    const [animalList, setAnimais] = useState<Animal[]>([]); // Estado para armazenar os animais
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
    const [error, setError] = useState<string | null>(null); // Estado para erros

    const [Especie, setEspecie] = useState<string>("");
    const [Brinco, setBrinco] = useState<string>("");
    const [Peso, setPeso] = useState<number>(0);
    const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null); // Armazena o animal que está sendo editado

    const fetchAnimais = async () => {
        try {
            const response = await fetch("/api/getAllAnimais", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                setAnimais(data.Animais); // Atualiza o estado com os animais recebidos
            } else {
                setError("Nenhum animal encontrado.");
            }
        } catch (err) {
            setError("Erro ao buscar animais.");
        } finally {
            setLoading(false); // Finaliza o estado de carregamento
        }
    };

    // Usando useEffect para buscar os animais quando o componente for montado
    useEffect(() => {
        fetchAnimais();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch("/api/deleteAnimal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const result = await response.json();

            if (result.success) {
                // Atualiza a lista de animais
                setAnimais((prevAnimais) =>
                    prevAnimais.filter((animal) => animal.id !== id)
                );

                toast({
                    title: result.message,
                    duration: 5000,
                    variant: "success",
                });
            } else {
                console.error("Erro ao deletar animal:", result.message);
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

    const handleEditOpen = (animal: Animal) => {
        setEspecie(animal.especie);
        setBrinco(animal.brinco);
        setPeso(animal.peso);
        setEditingAnimal(animal); // Armazena o animal que está sendo editado
    };

    const handleEdit = async (id: number) => {
        try {
            const response = await fetch("/api/editAnimal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, Especie, Brinco, Peso }),
            });

            const result = await response.json();

            if (result.success) {
                // Recarrega a lista de animais após a edição
                fetchAnimais();

                setEspecie("");
                setBrinco("");
                setPeso(0);
                setEditingAnimal(null); // Limpa o animal em edição

                toast({
                    title: result.message,
                    duration: 2000,
                    variant: "success",
                });
            } else {
                console.error("Erro ao editar animal:", result.message);
                toast({
                    title: "Erro",
                    description: result.message,
                    variant: "destructive",
                    duration: 1000,
                });
            }
        } catch (error) {
            console.error("Erro ao editar animal:", error);
        }
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead>Espécie</TableHead>
                        <TableHead>Brinco</TableHead>
                        <TableHead>Peso</TableHead>
                        <TableHead>Data Desmame</TableHead>
                        <TableHead>Data Nascimento</TableHead>
                        <TableHead>Data Registro</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {animalList.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">
                                {item.id}
                            </TableCell>
                            <TableCell>{item.especie}</TableCell>
                            <TableCell>{item.brinco}</TableCell>
                            <TableCell>{item.peso}</TableCell>
                            <TableCell>
                                {format(
                                    new Date(item.datadesmame),
                                    "dd-MM-yyyy"
                                )}
                            </TableCell>
                            <TableCell>
                                {format(
                                    new Date(item.datanascimento),
                                    "dd-MM-yyyy"
                                )}
                            </TableCell>
                            <TableCell>
                                {format(
                                    new Date(item.dataregistro),
                                    "dd-MM-yyyy HH:mm"
                                )}
                            </TableCell>

                            <TableCell className="text-right">
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
                                                Editar Animal - {item.especie} -{" "}
                                                {item.brinco}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div>
                                            <Label>Especie</Label>
                                            <Input
                                                type="text"
                                                value={Especie}
                                                onChange={(e) =>
                                                    setEspecie(e.target.value)
                                                }
                                                className="mb-3"
                                            />

                                            <Label>Brinco</Label>
                                            <Input
                                                type="text"
                                                value={Brinco}
                                                onChange={(e) =>
                                                    setBrinco(e.target.value)
                                                }
                                                className="mb-3"
                                            />

                                            <Label>Peso</Label>
                                            <Input
                                                type="number"
                                                value={Peso}
                                                onChange={(e) =>
                                                    setPeso(
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
                                                        setEspecie("");
                                                        setBrinco("");
                                                        setPeso(0);
                                                        setEditingAnimal(null);
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
