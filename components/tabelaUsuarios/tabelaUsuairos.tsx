"use client";
import { getUsers } from "@/app/actions";
import { Login } from "@/app/types";
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

interface Props {
    users: Login[];
}

export async function TabelaUsuarios({ users }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]"></TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">
                        Data de Criação
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((item, key) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{key}</TableCell>
                        <TableCell>{item.nome}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell className="text-right">
                            {format(
                                new Date(item.data_criacao),
                                "dd-MM-yyyy HH:mm"
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
