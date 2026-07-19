import { cn } from "@/lib/utils";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";

interface OptionsPickerProps<T extends string> {
    value: T;
    data: T[];
    label: (value: T) => string;
    onChange: (value: T) => void;
    className?: string;
}

export function OptionsPicker<T extends string>({ value, data, className, label, onChange }: OptionsPickerProps<T>) {
    return (
        <NativeSelect
            value={value}
            className={cn("w-fit", className)}
            onChange={(event) => onChange(event.target.value as T)}
        >
            {data.map((value) => (
                <NativeSelectOption key={value} value={value}>
                    {label(value)}
                </NativeSelectOption>
            ))}
        </NativeSelect>
    );
}
