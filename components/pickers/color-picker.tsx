"use client";

import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ColorPickerProps {
    label?: string;
    value?: string;
    onChange: (color: string) => void;
}

export function ColorPicker({ label = "Color", value = "#000000", onChange }: ColorPickerProps) {
    return (
        <Popover>
            <PopoverTrigger
                render={
                    <button className="cursor-pointer gap-4 w-fit! justify-between flex-row flex h-8 rounded-2xl border border-transparent bg-input/50 px-2.5 py-1 text-base transition-[color,box-shadow] duration-200 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40">
                        <span className="font-medium">{label}</span>

                        <div className="flex flex-row gap-2">
                            <span className="w-18 text-end text-muted-foreground font-medium">
                                {value.toUpperCase()}
                            </span>
                            <div
                                className="h-full aspect-square rounded-full -mr-1"
                                style={{ backgroundColor: value }}
                            />
                        </div>
                    </button>
                }
            />

            <PopoverContent className="w-fit!">
                <HexColorPicker color={value} onChange={(color) => onChange(color)} />
            </PopoverContent>
        </Popover>
    );
}
