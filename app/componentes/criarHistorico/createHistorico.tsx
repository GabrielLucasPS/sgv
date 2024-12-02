"use client";
import { useEffect, useState } from "react";
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
	FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Check, ChevronsUpDown } from "lucide-react";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Animal, Vacina } from "@/lib/types/dbTypes";

export const FormSchema = z.object({
	dataVacinacao: z.any(),
	dosagem: z.number().min(1, "Forneça a dosagem"),
	observacao: z.string().max(250).optional(),
});

type selectList = {
	value: number;
	label: string;
};

export default function CreateHistoricoForm() {
	const { toast } = useToast();

	// -- SELEÇÃO DE ANIMAL
	const [animalBrinco, setAnimalBrinco] = useState("");
	const [animalId, setAnimalId] = useState<number | undefined>();
	const [animalList, setAnimalList] = useState<selectList[]>([]);
	// ABRIR SELEÇÃO DE ANIMAL
	const [open, setOpen] = useState(false);

	// -- SELEÇÃO DE VACINA
	const [vacinaNome, setVacinaNome] = useState("");
	const [vacinaId, setVacinaId] = useState<number | undefined>();
	const [vacinaList, setVacinaList] = useState<selectList[]>([]);
	// ABRIR SELEÇÃO DE VACINA
	const [openVacina, setOpenVacina] = useState(false);

	async function fetchAnimais() {
		try {
			const response = await fetch("/api/getAllAnimais", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (data.success) {
				const animais: Animal[] = data.Animais;

				const formattedAnimalList: selectList[] = animais.map(
					(animal) => ({
						value: animal.id,
						label: animal.brinco,
					})
				);

				setAnimalList(formattedAnimalList);
			} else {
			}
		} catch (err) {
			console.error("Erro:", err);
			const vazio: selectList[] = [];
			setAnimalList(vazio);
		}
	}

	async function fetchVacinas() {
		try {
			const response = await fetch("/api/getAllVacinas", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			if (data.success) {
				const vacina: Vacina[] = data.Vacinas;

				const formattedAnimalList: selectList[] = vacina.map(
					(vacina) => ({
						value: vacina.id,
						label: vacina.nome,
					})
				);

				setVacinaList(formattedAnimalList);
			} else {
			}
		} catch (err) {
			console.error("Erro:", err);
			const vazio: selectList[] = [];
			setVacinaList(vazio);
		}
	}

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			dataVacinacao: new Date(),
			dosagem: undefined,
			observacao: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		console.log("Entrou");
		const response = await fetch("/api/createHistorico", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				animalId: animalId,
				vacinaId: vacinaId,
				dataVacinacao: values.dataVacinacao,
				dosagem: values.dosagem,
				observacao: values.observacao,
			}),
		});

		const result = await response.json();
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

	useEffect(() => {
		fetchAnimais();
		fetchVacinas();
	}, []);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mb-10 flex items-end justify-start gap-2"
			>
				<FormItem className="flex flex-col">
					<FormLabel>Brinco do Animal</FormLabel>
					<FormControl>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={open}
									className="w-[200px] justify-between"
								>
									{animalBrinco
										? animalList.find(
												(animal) =>
													animal.label ===
													animalBrinco
										  )?.label
										: "Selecione Animal"}
									<ChevronsUpDown className="opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-[200px] p-0">
								<Command>
									<CommandInput
										placeholder="Procurar Animal"
										className="h-9"
									/>
									<CommandList>
										<CommandEmpty>
											Nenhum animal encontrado.
										</CommandEmpty>
										<CommandGroup>
											{animalList.map((animal) => (
												<CommandItem
													key={animal.label}
													value={animal.label}
													onSelect={(
														currentValue
													) => {
														setAnimalBrinco(
															currentValue ===
																animalBrinco
																? ""
																: currentValue
														);
														const animal =
															animalList.find(
																(item) =>
																	item.label ===
																	currentValue
															);

														setAnimalId(
															animal?.value
														);
														setOpen(false);
													}}
												>
													{animal.label}
													<Check
														className={cn(
															"ml-auto",
															animalBrinco ===
																animal.label
																? "opacity-100"
																: "opacity-0"
														)}
													/>
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage />
				</FormItem>

				<FormItem className="flex flex-col">
					<FormLabel>Nome da Vacina</FormLabel>
					<FormControl>
						<Popover open={openVacina} onOpenChange={setOpenVacina}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={openVacina}
									className="w-[200px] justify-between"
								>
									{vacinaNome
										? vacinaList.find(
												(vacina) =>
													vacina.label === vacinaNome
										  )?.label
										: "Selecione Vacina"}
									<ChevronsUpDown className="opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-[200px] p-0">
								<Command>
									<CommandInput
										placeholder="Procurar Vacina"
										className="h-9"
									/>
									<CommandList>
										<CommandEmpty>
											Nenhuma vacina encontrado.
										</CommandEmpty>
										<CommandGroup>
											{vacinaList.map((vacina) => (
												<CommandItem
													key={vacina.label}
													value={vacina.label}
													onSelect={(
														currentValue
													) => {
														setVacinaNome(
															currentValue ===
																vacinaNome
																? ""
																: currentValue
														);
														const vacina =
															vacinaList.find(
																(item) =>
																	item.label ===
																	currentValue
															);

														setVacinaId(
															vacina?.value
														);
														setOpenVacina(false);
													}}
												>
													{vacina.label}
													<Check
														className={cn(
															"ml-auto",
															vacinaNome ===
																vacina.label
																? "opacity-100"
																: "opacity-0"
														)}
													/>
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage />
				</FormItem>

				{/* Campo para Data de Vacinação */}
				<FormField
					control={form.control}
					name="dataVacinacao"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Data de Vacinação</FormLabel>
							<FormControl>
								<Input
									type="date"
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

				{/* Campo para Dosagem */}
				<FormField
					control={form.control}
					name="dosagem"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dosagem (ml)</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Dosagem"
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

				{/* Campo para Observação */}
				<FormField
					control={form.control}
					name="observacao"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Observação</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="Observação"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="bg-[#1055DA]">
					Adicionar
				</Button>
			</form>
		</Form>
	);
}
