"use client";

import { Labeled } from "@/components/labeled";
import { Slider } from "@/components/ui/slider";
import { useCodeConfigStore } from "@/stores/code-config/provider";

export function MinVersionSlider() {
    const min = useCodeConfigStore((s) => s.data.min);
    const set = useCodeConfigStore((s) => s.set);

    return (
        <Labeled label="Min Version" secondary={min.toString()}>
            <Slider
                aria-label="Min Version"
                min={1}
                max={40}
                value={min}
                step={1}
                onValueChange={(min) =>
                    set((s) => ({ data: { ...s.data, min: typeof min === "number" ? min : min[0] } }))
                }
            />
        </Labeled>
    );
}
