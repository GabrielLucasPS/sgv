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
import { User } from "@/lib/types/dbTypes";
import { Session } from "next-auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface Props {
    session: Session | null;
}

export function TabelaAnimais({ session }: Props) {
    const [userList, setUsers] = useState<User[]>([]); // Estado para armazenar os usuários
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
    const [error, setError] = useState<string | null>(null); // Estado para erros

    const [Nome, setNome] = useState<string>("");
    const [Senha, setSenha] = useState<string>("");
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/getAllUsers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                setUsers(data.Users); // Atualiza o estado com os usuários recebidos
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
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        console.log("ID: ", id);
        try {
            const response = await fetch("/api/deleteUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const result = await response.json();

            if (result.success) {
                // Atualiza a lista de usuários
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== id)
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

    const handleEdit = async (id: number, nomeAtual: string) => {
        if (Senha.trim() != "" && confirmarSenha != Senha) {
            setSenha("");
            setConfirmarSenha("");
            toast({
                title: "Senhas incorretas",
                duration: 2000,
                variant: "destructive",
            });
            return;
        }

        try {
            const response = await fetch("/api/editUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, Nome, Senha, nomeAtual }),
            });

            const result = await response.json();

            if (result.success) {
                // Atualiza a lista de usuários
                let nomeLista: string = Nome ? Nome : nomeAtual;
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === id ? { ...user, nome: nomeLista } : user
                    )
                );

                setNome("");
                setSenha("");
                setConfirmarSenha("");

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
                        <TableHead>Usuário</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Data de Criação</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userList.map((item, key) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">
                                {item.id}
                            </TableCell>
                            <TableCell>{item.nome}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                {format(
                                    new Date(item.data_criacao),
                                    "dd-MM-yyyy HH:mm"
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                {/*---------------------EDITAR---------------------------*/}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="editIcon mr-2"></Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Editar Usuário - {item.nome}
                                            </DialogTitle>
                                            <DialogDescription></DialogDescription>
                                        </DialogHeader>
                                        <div>
                                            <Label>Nome</Label>
                                            <Input
                                                type="text"
                                                placeholder=""
                                                value={Nome}
                                                onChange={(e) =>
                                                    setNome(e.target.value)
                                                }
                                                className="mb-3"
                                            />

                                            <Label>Nova Senha</Label>
                                            <Input
                                                type="password"
                                                placeholder=""
                                                value={Senha}
                                                onChange={(e) =>
                                                    setSenha(e.target.value)
                                                }
                                                className="mb-3"
                                            />

                                            <Label>Confirmar Senha</Label>
                                            <Input
                                                type="password"
                                                placeholder=""
                                                value={confirmarSenha}
                                                onChange={(e) =>
                                                    setConfirmarSenha(
                                                        e.target.value
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
                                                        setSenha("");
                                                        setConfirmarSenha("");
                                                    }}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    className="bg-[#1055DA] hover:bg-bg-[#1055DA] hover:opacity-90"
                                                    onClick={() =>
                                                        handleEdit(
                                                            item.id,
                                                            item.nome
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
