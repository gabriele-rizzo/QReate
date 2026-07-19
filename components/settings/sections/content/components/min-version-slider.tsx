"use client";

import { Labeled } from "@/components/labeled";
import { Slider } from "@/components/ui/slider";
import { useCodeConfigStore } from "@/stores/code-config/provider";

export function MinVersionSlider() {
    const { set, ...store } = useCodeConfigStore((s) => s);

    return (
        <Labeled label="Min Version" secondary={store.data.min.toString()}>
            <Slider
                min={1}
                max={40}
                value={store.data.min}
                step={1}
                onValueChange={(min) =>
                    set({ ...store, data: { ...store.data, min: typeof min === "number" ? min : min[0] } })
                }
            />
        </Labeled>
    );
}
