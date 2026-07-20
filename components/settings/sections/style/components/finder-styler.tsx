"use client";

import { Labeled } from "@/components/labeled";
import { ColorPicker } from "@/components/pickers/color-picker";
import { OptionsPicker } from "@/components/pickers/options-picker";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import type { FinderPatternInnerStyle, FinderPatternOuterStyle } from "@lglab/react-qr-code";

const SHARED_STYLES: Record<FinderPatternOuterStyle, string> = {
    square: "Square",
    "pinched-square": "Pinched Square",
    "rounded-sm": "Rounded (S)",
    rounded: "Rounded (M)",
    "rounded-lg": "Rounded (L)",
    circle: "Circle",
    "inpoint-sm": "Inpoint (S)",
    inpoint: "Inpoint (M)",
    "inpoint-lg": "Inpoint (L)",
    "outpoint-sm": "Outpoint (S)",
    outpoint: "Outpoint (M)",
    "outpoint-lg": "Outpoint (L)",
    "leaf-sm": "Leaf (S)",
    leaf: "Leaf (M)",
    "leaf-lg": "Leaf (L)",
};

const OUTER_STYLES: Record<FinderPatternOuterStyle, string> = SHARED_STYLES;

const INNER_STYLES: Record<FinderPatternInnerStyle, string> = {
    ...SHARED_STYLES,
    diamond: "Diamond",
    star: "Star",
    heart: "Heart",
    hashtag: "Hashtag",
    microchip: "Microchip",
};

export function FinderStyler() {
    const finder = useCodeConfigStore((s) => s.style.finder);
    const set = useCodeConfigStore((s) => s.set);

    return (
        <div className="flex flex-col gap-4">
            <Labeled label="Finder" secondary="Outer" className="flex flex-row gap-2">
                <OptionsPicker
                    aria-label="Finder outer style"
                    value={finder.outer.style}
                    className="w-40"
                    data={Object.keys(OUTER_STYLES) as FinderPatternOuterStyle[]}
                    label={(style) => OUTER_STYLES[style]}
                    onChange={(style) =>
                        set((s) => ({
                            style: { ...s.style, finder: { ...s.style.finder, outer: { ...s.style.finder.outer, style } } },
                        }))
                    }
                />

                <ColorPicker
                    value={finder.outer.color}
                    onChange={(color) =>
                        set((s) => ({
                            style: { ...s.style, finder: { ...s.style.finder, outer: { ...s.style.finder.outer, color } } },
                        }))
                    }
                />
            </Labeled>

            <Labeled label="Finder" secondary="Inner" className="flex flex-row gap-2">
                <OptionsPicker
                    aria-label="Finder inner style"
                    value={finder.inner.style}
                    className="w-40"
                    data={Object.keys(INNER_STYLES) as FinderPatternInnerStyle[]}
                    label={(style) => INNER_STYLES[style]}
                    onChange={(style) =>
                        set((s) => ({
                            style: { ...s.style, finder: { ...s.style.finder, inner: { ...s.style.finder.inner, style } } },
                        }))
                    }
                />

                <ColorPicker
                    value={finder.inner.color}
                    onChange={(color) =>
                        set((s) => ({
                            style: { ...s.style, finder: { ...s.style.finder, inner: { ...s.style.finder.inner, color } } },
                        }))
                    }
                />
            </Labeled>
        </div>
    );
}
