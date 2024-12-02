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

export const FormSchema = z.object({
	nome: z.string().max(100),
	descricao: z.string().max(250).optional(),
	intervalodose: z.number(),
	fabricante: z.string().max(100),
});

export default function CreateVacinaForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			nome: "",
			descricao: "",
			intervalodose: undefined,
			fabricante: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		const response = await fetch("/api/createVacina", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nome: values.nome,
				descricao: values.descricao,
				intervalodose: values.intervalodose,
				fabricante: values.fabricante,
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
			window.location.reload();
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
									placeholder="Nome da Vacina"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="intervalodose"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Intervalo da Dose</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Intervalo"
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
					name="fabricante"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fabricante</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="fabricante"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="descricao"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="Descrição"
									{...field}
									className="w-96 "
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="bg-[#1055DA] ">
					Adicionar
				</Button>
			</form>
		</Form>
	);
}
