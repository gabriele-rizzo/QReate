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
    const { set, ...store } = useCodeConfigStore((s) => s);
    const { changeable } = MODULES_STYLES_OPTIONS[store.style.modules.style];

    return (
        <div className="flex flex-col gap-4">
            <Labeled label="Data Modules" secondary="Style" className="flex flex-row gap-2">
                <OptionsPicker
                    value={store.style.modules.style}
                    className="w-40"
                    data={Object.keys(MODULES_STYLES_OPTIONS) as CodeDataModulesStyle[]}
                    label={(style) => MODULES_STYLES_OPTIONS[style].label}
                    onChange={(style) =>
                        set({
                            ...store,
                            style: {
                                ...store.style,
                                modules: { ...store.style.modules, style },
                            },
                        })
                    }
                />

                <ColorPicker
                    value={store.style.modules.color}
                    onChange={(color) =>
                        set({
                            ...store,
                            style: {
                                ...store.style,
                                modules: { ...store.style.modules, color },
                            },
                        })
                    }
                />
            </Labeled>

            {changeable !== null && (
                <Labeled
                    label={changeable === "size" ? "Size" : "Line Width"}
                    secondary={store.style.modules[changeable].toString()}
                >
                    <Slider
                        min={0.75}
                        max={1}
                        value={store.style.modules[changeable]}
                        step={0.01}
                        className="mt-3.5"
                        onValueChange={(value) =>
                            set({
                                ...store,
                                style: {
                                    ...store.style,
                                    modules: {
                                        ...store.style.modules,
                                        [changeable]: typeof value === "number" ? value : value[0],
                                    },
                                },
                            })
                        }
                    />
                </Labeled>
            )}
        </div>
    );
}
