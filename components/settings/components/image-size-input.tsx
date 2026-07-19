"use client";

import { Labeled } from "@/components/labeled";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import type { ImageSettings } from "@lglab/react-qr-code";
import { useCallback } from "react";

export function ImageSizeInput() {
    const { set, ...store } = useCodeConfigStore((s) => s);

    const onChange = useCallback(
        (value: string, key: keyof Pick<ImageSettings, "width" | "height">) => {
            if (typeof store.image === "undefined") return;

            try {
                const data = parseInt(value);
                set({ ...store, image: { ...store.image, [key]: data } });
            } catch {
                return;
            }
        },
        [set, store],
    );

    return (
        <Labeled label="Size">
            <div className="flex flex-row gap-2">
                <InputGroup>
                    <InputGroupAddon>
                        <InputGroupText>WIDTH:</InputGroupText>
                    </InputGroupAddon>

                    <InputGroupInput
                        placeholder="0"
                        type="number"
                        min={10}
                        value={Number.isNaN(store.image?.width) ? 0 : store.image?.width}
                        onChange={(e) => onChange(e.target.value, "width")}
                    />
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon>
                        <InputGroupText>HEIGHT:</InputGroupText>
                    </InputGroupAddon>

                    <InputGroupInput
                        placeholder="0"
                        type="number"
                        min={10}
                        value={Number.isNaN(store.image?.height) ? 0 : store.image?.height}
                        onChange={(e) => onChange(e.target.value, "height")}
                    />
                </InputGroup>
            </div>
        </Labeled>
    );
}
