"use client";

import { Labeled } from "@/components/labeled";
import { Slider } from "@/components/ui/slider";
import { useCodeConfigStore } from "@/stores/code-config/provider";

export function MarginSlider() {
    const { set, ...store } = useCodeConfigStore((s) => s);

    return (
        <Labeled label="Margin" secondary={store.style.margin.toString()}>
            <Slider
                min={1}
                max={10}
                value={store.style.margin}
                step={1}
                onValueChange={(margin) =>
                    set({
                        ...store,
                        style: { ...store.style, margin: typeof margin === "number" ? margin : margin[0] },
                    })
                }
            />
        </Labeled>
    );
}
