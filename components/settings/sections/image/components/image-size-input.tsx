"use client";

import { Labeled } from "@/components/labeled";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import type { ImageSettings } from "@lglab/react-qr-code";
import { useCallback } from "react";

export function ImageSizeInput() {
    const image = useCodeConfigStore((s) => s.image);
    const set = useCodeConfigStore((s) => s.set);

    const onChange = useCallback(
        (value: string, key: keyof Pick<ImageSettings, "width" | "height">) => {
            // An empty/invalid field parses to NaN — store 0 instead so the QR
            // settings and the URL-encoded state always hold real numbers.
            const parsed = parseInt(value);
            set((s) => (s.image ? { image: { ...s.image, [key]: Number.isNaN(parsed) ? 0 : parsed } } : {}));
        },
        [set],
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
                        value={Number.isNaN(image?.width) ? 0 : image?.width}
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
                        value={Number.isNaN(image?.height) ? 0 : image?.height}
                        onChange={(e) => onChange(e.target.value, "height")}
                    />
                </InputGroup>
            </div>
        </Labeled>
    );
}
