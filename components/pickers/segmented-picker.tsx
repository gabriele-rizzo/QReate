import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface SegmentedPickerProps<T extends string> {
    value: T;
    data: readonly T[];
    label: (value: T) => string;
    onChange: (value: T) => void;
}

export function SegmentedPicker<T extends string>({ value, data, label, onChange }: SegmentedPickerProps<T>) {
    return (
        <Tabs value={value} onValueChange={onChange}>
            <TabsList>
                {data.map((value) => (
                    <TabsTrigger key={value} value={value}>
                        {label(value)}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
