"use client";

import { Labeled } from "@/components/labeled";
import { ColorPicker } from "@/components/pickers/color-picker";
import { OptionsPicker } from "@/components/pickers/options-picker";
import { Slider } from "@/components/ui/slider";
import { useCodeConfigStore } from "@/stores/code-config/provider";

type DataModulesStyleOptions = { label: string; changeable: "size" | "lineWidth" | null };

const MODULES_STYLES_OPTIONS: Record<CodeDataModulesStyle, DataModulesStyleOptions> = {
    square: { label: "Square", changeable: "size" },
    rounded: { label: "Rounded", changeable: "lineWidth" },
    circle: { label: "Circle", changeable: "size" },
    heart: { label: "Heart", changeable: "size" },
    star: { label: "Star", changeable: "size" },
    diamond: { label: "Diamond", changeable: "size" },
    "pinched-square": { label: "Pinched Square", changeable: "size" },
    hashtag: { label: "Hashtag", changeable: "size" },
    leaf: { label: "Leaf", changeable: null },
    "circuit-board": { label: "Circuit Board", changeable: "lineWidth" },
    "horizontal-line": { label: "Horizontal Line", changeable: "lineWidth" },
    "vertical-line": { label: "Vertical Line", changeable: "lineWidth" },
};

export function ModulesStyler() {
    const modules = useCodeConfigStore((s) => s.style.modules);
    const set = useCodeConfigStore((s) => s.set);
    const { changeable } = MODULES_STYLES_OPTIONS[modules.style];

    return (
        <div className="flex flex-col gap-4">
            <Labeled label="Data Modules" secondary="Style" className="flex flex-row gap-2">
                <OptionsPicker
                    aria-label="Data module style"
                    value={modules.style}
                    className="w-40"
                    data={Object.keys(MODULES_STYLES_OPTIONS) as CodeDataModulesStyle[]}
                    label={(style) => MODULES_STYLES_OPTIONS[style].label}
                    onChange={(style) =>
                        set((s) => ({
                            style: { ...s.style, modules: { ...s.style.modules, style } },
                        }))
                    }
                />

                <ColorPicker
                    value={modules.color}
                    onChange={(color) =>
                        set((s) => ({
                            style: { ...s.style, modules: { ...s.style.modules, color } },
                        }))
                    }
                />
            </Labeled>

            {changeable !== null && (
                <Labeled
                    label={changeable === "size" ? "Size" : "Line Width"}
                    secondary={modules[changeable].toString()}
                >
                    <Slider
                        aria-label={changeable === "size" ? "Size" : "Line Width"}
                        min={changeable === "size" ? 0.75 : 0.25}
                        max={1}
                        value={modules[changeable]}
                        step={0.01}
                        className="mt-3.5"
                        onValueChange={(value) =>
                            set((s) => ({
                                style: {
                                    ...s.style,
                                    modules: {
                                        ...s.style.modules,
                                        [changeable]: typeof value === "number" ? value : value[0],
                                    },
                                },
                            }))
                        }
                    />
                </Labeled>
            )}
        </div>
    );
}
