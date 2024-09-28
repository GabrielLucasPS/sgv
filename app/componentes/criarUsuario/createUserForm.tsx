"use client";
import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
    nome: z.string().min(1, "").max(100),
    email: z.string().min(1, "").email(""),
    senha: z.string().min(1, "").min(6, ""),
    confirmarSenha: z.string().min(1, "").min(6, ""),
});

export default function CreateUserForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nome: "",
            email: "",
            senha: "",
            confirmarSenha: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        console.log("Form values:", values);
        if (values.senha != values.confirmarSenha) {
            form.setValue("senha", "");
            form.setValue("confirmarSenha", "");
            toast({
                title: "Erro",
                description: "Confirmação de senha incorreta.",
                variant: "destructive",
            });
        } else {
            const response = await fetch("/api/auth/registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: values.nome,
                    email: values.email,
                    senha: values.senha,
                }),
            });
            form.reset();
            const result = await response.json();
            if (result.success) {
                toast({
                    title: "Sucesso!",
                    description: result.message,
                    duration: 5000,
                    variant: "success",
                });
            } else {
                toast({
                    title: "Erro",
                    description: result.message,
                    variant: "destructive",
                });
            }
        }
    };

    const [confirmarSenha, setConfirmarSenha] = useState("");

    const { toast } = useToast();

    return (
        <Form {...form}>
            <form
                className="mb-10 flex items-end justify-start gap-2"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Nome do usuário"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="senha"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha (mínimo 6)</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Senha"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmarSenha"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmar Senha</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Digite Novamente"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-[#1055DA] ">
                    Criar Usuário
                </Button>
            </form>
        </Form>
    );
}
