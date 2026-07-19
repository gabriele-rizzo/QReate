"use client";

import { Labeled } from "@/components/labeled";
import { ColorPicker } from "@/components/pickers/color-picker";
import { SegmentedPicker } from "@/components/pickers/segmented-picker";
import { useCodeConfigStore } from "@/stores/code-config/provider";

const BACKGROUND_TYPES: Record<BackgroundType, string> = {
    filled: "Filled",
    transparent: "Transparent",
};

export function BackgroundPicker() {
    const { set, ...store } = useCodeConfigStore((s) => s);

    return (
        <Labeled label="Background" className="flex flex-row gap-2">
            <SegmentedPicker
                value={store.style.background.type}
                data={Object.keys(BACKGROUND_TYPES) as BackgroundType[]}
                label={(type) => BACKGROUND_TYPES[type]}
                onChange={(type) =>
                    set({ ...store, style: { ...store.style, background: { ...store.style.background, type } } })
                }
            />

            <ColorPicker
                value={store.style.background.color}
                onChange={(color) =>
                    set({ ...store, style: { ...store.style, background: { ...store.style.background, color } } })
                }
            />
        </Labeled>
    );
}
