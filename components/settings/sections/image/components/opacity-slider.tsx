"use client";

import { Labeled } from "@/components/labeled";
import { Slider } from "@/components/ui/slider";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import { useCallback } from "react";

export function OpacitySlider() {
    const opacity = useCodeConfigStore((s) => s.image?.opacity);
    const set = useCodeConfigStore((s) => s.set);

    const onChange = useCallback(
        (value: number | readonly number[]) => {
            const opacity = typeof value === "number" ? value : value[0];
            set((s) => (s.image ? { image: { ...s.image, opacity } } : {}));
        },
        [set],
    );

    return (
        <Labeled label="Opacity" secondary={opacity?.toString() ?? "0.0"}>
            <Slider min={0} max={1} value={opacity} step={0.01} onValueChange={onChange} />
        </Labeled>
    );
}
