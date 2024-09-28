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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { User } from "@/lib/types/dbTypes";
import { Session } from "next-auth";
interface Props {
    session: Session | null;
}

export function TabelaUsuarios({ session }: Props) {
    const [userList, setUsers] = useState<User[]>([]); // Estado para armazenar os usuários
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
    const [error, setError] = useState<string | null>(null); // Estado para erros
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
                    title: "Sucesso!",
                    description: result.message,
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

    return (
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
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                            {format(
                                new Date(item.data_criacao),
                                "dd-MM-yyyy HH:mm"
                            )}
                        </TableCell>
                        <TableCell className="text-right">
                            <Button
                                onClick={() => handleDelete(item.id)} // Passa o id aqui
                                className="deleteIcon"
                            ></Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
