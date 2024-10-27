"use client";
import { format, subHours } from "date-fns";
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
    const [animalList, setAnimais] = useState<Animal[]>([]); // Estado para armazenar os usuários
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
    const [error, setError] = useState<string | null>(null); // Estado para erros

    const [Especie, setEspecie] = useState<string>("");
    const [Brinco, setBrinco] = useState<string>("");
    const [Peso, setPeso] = useState<number>(0);

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
                setAnimais(data.Animais); // Atualiza o estado com os usuários recebidos
            } else {
                setError("Nenhum usuário encontrado.");
            }
        } catch (err) {
            setError("Erro ao buscar usuários.");
        } finally {
            setLoading(false); // Finaliza o estado de carregamento
        }
    };

    // Usando useEffect para buscar os usuários quando o componente for montado
    useEffect(() => {
        fetchAnimais();
    }, []);

    const handleDelete = async (id: number) => {
        console.log("ID: ", id);
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
                // Atualiza a lista de usuários
                setAnimais((prevAnimais) =>
                    prevAnimais.filter((animal) => animal.id !== id)
                );

                toast({
                    title: result.message,
                    duration: 5000,
                    variant: "success",
                });
            } else {
                console.error("Erro ao deletar usuário:", result.message);
                toast({
                    title: "Erro",
                    description: result.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
        }
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
                setAnimais((prevAnimais) =>
                    prevAnimais.map((animal) =>
                        animal.id === id ? { ...animal} : animal
                    )
                );

                setEspecie("");
                setBrinco("");
                setPeso(0);

                toast({
                    title: result.message,
                    duration: 2000,
                    variant: "success",
                });
            } else {
                console.error("Erro ao editar usuário:", result.message);
                toast({
                    title: "Erro",
                    description: result.message,
                    variant: "destructive",
                    duration: 1000,
                });
            }
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
        }
    };

    const Editar = (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead>Espécie</TableHead>
                        <TableHead>Brinco</TableHead>
                        <TableHead>Peso</TableHead>
                       

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {animalList.map((item, key) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">
                                {item.id}
                            </TableCell>
                            <TableCell>{item.especie}</TableCell>
                            <TableCell>{item.brinco}</TableCell>
                            <TableCell>{item.peso}</TableCell>
                            
                           
                            <TableCell className="text-right">
                                {/*---------------------EDITAR---------------------------*/}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="editIcon mr-2"></Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Editar Animal - {item.especie} - {item.brinco} 
                                            </DialogTitle>
                                            <DialogDescription></DialogDescription>
                                        </DialogHeader>
                                        <div>
                                            <Label>Especie</Label>
                                            <Input
                                                type="text"
                                                placeholder=""
                                                value={Especie}
                                                onChange={(e) =>
                                                    setEspecie(e.target.value)
                                                }
                                                className="mb-3"
                                            />

                                            <Label>Brinco</Label>
                                            <Input
                                                type="text"
                                                placeholder=""
                                                value={Brinco}
                                                onChange={(e) =>
                                                    setBrinco(e.target.value)
                                                }
                                                className="mb-3"
                                            />

                                              <Label>Peso</Label>
                                            <Input
                                                type="number"
                                                placeholder=""
                                                value={Peso}
                                                onChange={(e) =>
                                                    setPeso(parseInt(e.target.value))
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
                                                    }}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    className="bg-[#1055DA] hover:bg-bg-[#1055DA] hover:opacity-90"
                                                    onClick={() =>
                                                        handleEdit(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    Salvar
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                {/*------------------------------------------------*/}

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
