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

const FormSchema = z.object({
    especie: z.string().min(1, "").max(100),
    brinco: z.number().min(1, ""),
    peso: z.number().min(1, "").max(10000),
    dataNascimento: z.any(),
    dataDesmame: z.any(),
});
export default function CreateUserForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            especie: "",
            brinco: 0,
            peso: 0,
            dataNascimento: new Date(),
            dataDesmame: new Date(),
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch("/api/createAnimal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                especie: values.especie,
                brinco: values.brinco,
                peso: values.peso,
                dataNascimento: values.dataNascimento,
                dataDesmame: values.dataDesmame,
            }),
        });

        const result = await response.json();
        console.log("--------------------- /n", result);
        if (result.success) {
            toast({
                title: "Sucesso!",
                description: result.message,
                duration: 5000,
                variant: "success",
            });
            form.reset();
        } else {
            toast({
                title: "Erro",
                description: result.message,
                variant: "destructive",
            });
        }
    };

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { toast } = useToast();

    return (
        <Form {...form}>
            <form
                className="mb-10 flex items-end justify-start gap-2"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="especie"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Especie</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Nome da especie"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="brinco"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brinco</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Numero Brinco"
                                    {...field}
                                    onChange={(event) =>
                                        field.onChange(
                                            parseInt(event.target.value)
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="peso"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Peso</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Peso"
                                    {...field}
                                    onChange={(event) =>
                                        field.onChange(
                                            parseFloat(event.target.value)
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dataNascimento"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data Nascimento</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    placeholder="Data Nascimento"
                                    {...field}
                                    value={
                                        field.value instanceof Date
                                            ? field.value
                                                  .toISOString()
                                                  .split("T")[0]
                                            : field.value
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dataDesmame"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data Desmame</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    placeholder="Data Desmame"
                                    {...field}
                                    value={
                                        field.value instanceof Date
                                            ? field.value
                                                  .toISOString()
                                                  .split("T")[0]
                                            : field.value
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-[#1055DA] ">
                    Criar Animal
                </Button>
            </form>
        </Form>
    );
}
