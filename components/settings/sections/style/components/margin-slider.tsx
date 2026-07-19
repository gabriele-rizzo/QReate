"use client";

import { Labeled } from "@/components/labeled";
import { Slider } from "@/components/ui/slider";
import { useCodeConfigStore } from "@/stores/code-config/provider";

export function MarginSlider() {
    const margin = useCodeConfigStore((s) => s.style.margin);
    const set = useCodeConfigStore((s) => s.set);

    return (
        <Labeled label="Margin" secondary={margin.toString()}>
            <Slider
                min={1}
                max={10}
                value={margin}
                step={1}
                onValueChange={(margin) =>
                    set((s) => ({
                        style: { ...s.style, margin: typeof margin === "number" ? margin : margin[0] },
                    }))
                }
            />
        </Labeled>
    );
}
