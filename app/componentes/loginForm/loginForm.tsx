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
import { Input } from "@/components/ui/input";
import "./login.css";
import { signIn } from "next-auth/react";

// Schema de validação do Zod
const FormSchema = z.object({
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export default function LoginForm() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            senha: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const res = await signIn("credentials", {
            email: values.email,
            senha: values.senha,
            redirect: false,
        });

        if (!res?.error) {
            router.push("/");
            router.refresh();
        }

        console.log("res Login: ", res);
    };

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
