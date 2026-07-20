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
    const background = useCodeConfigStore((s) => s.style.background);
    const set = useCodeConfigStore((s) => s.set);

    return (
        <Labeled label="Background" className="flex flex-row gap-2">
            <SegmentedPicker
                value={background.type}
                data={Object.keys(BACKGROUND_TYPES) as BackgroundType[]}
                label={(type) => BACKGROUND_TYPES[type]}
                onChange={(type) =>
                    set((s) => ({ style: { ...s.style, background: { ...s.style.background, type } } }))
                }
            />

            {background.type !== "transparent" && (
                <ColorPicker
                    value={background.color}
                    onChange={(color) =>
                        set((s) => ({ style: { ...s.style, background: { ...s.style.background, color } } }))
                    }
                />
            )}
        </Labeled>
    );
}
