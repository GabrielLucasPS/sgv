import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputWithLabel({
    label,
    id,
    value,
    onChange,
    ...props // Recebe todos os outros atributos como placeholder, type, etc.
}: {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any; // Permite passar outros atributos (ex: placeholder, type)
}) {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={id}>{label}</Label>

            <Input
                id={id}
                value={value}
                onChange={onChange}
                {...props} // Espalha todas as outras props (ex: placeholder, type, className)
            />
        </div>
    );
}
