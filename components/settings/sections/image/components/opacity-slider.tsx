"use client";

import { Labeled } from "@/components/labeled";
import { Slider } from "@/components/ui/slider";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import { useCallback } from "react";

export function OpacitySlider() {
    const { set, ...store } = useCodeConfigStore((s) => s);

    const onChange = useCallback(
        (opacity: number | readonly number[]) => {
            if (typeof store.image === "undefined") return;
            if (typeof opacity !== "number") opacity = opacity[0];

            set({ ...store, image: { ...store.image, opacity } });
        },
        [store, set],
    );

    return (
        <Labeled label="Opacity" secondary={store.image?.opacity.toString() ?? "0.0"}>
            <Slider min={0} max={1} value={store.image?.opacity} step={0.01} onValueChange={onChange} />
        </Labeled>
    );
}
