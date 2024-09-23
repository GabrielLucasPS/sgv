"use client";
import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useRouter } from "next/navigation";
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
import { Input } from "../ui/input";

import "./login.css";

const FormSchema = z.object({
    email: z.string().min(1, "").email(""),
    senha: z.string().min(1, "").min(6, ""),
});

export default function LoginForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            senha: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: values.email,
                senha: values.senha,
            }),
        });

        const result = await response.json();
        console.log("--------------------- /n", result);
        if (result.success) {
            form.reset();

            window.location.href = "/usuarios";
        } else {
            toast({
                title: "Erro",
                description: result.message,
                variant: "destructive",
            });
        }
    };

    const { toast } = useToast();

    return (
        <Form {...form}>
            <form className="loginForm" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Email</FormLabel>
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
                            <FormLabel className="text-lg">Senha</FormLabel>
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

                <Button type="submit" className="bg-[#1055DA] w-full">
                    Entrar
                </Button>
            </form>
        </Form>
    );
}
