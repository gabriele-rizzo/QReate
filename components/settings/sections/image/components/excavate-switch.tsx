"use client";

import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import { useCallback } from "react";

export function ExcavateSwitch() {
    const { set, ...store } = useCodeConfigStore((s) => s);

    const onChange = useCallback(
        (excavate: boolean) => {
            if (typeof store.image === "undefined") return;

            set({ ...store, image: { ...store.image, excavate } });
        },
        [set, store],
    );

    return (
        <Field orientation="horizontal">
            <FieldContent>
                <div className="flex flex-row gap-2">
                    <FieldLabel htmlFor="excavate">Excavate</FieldLabel>
                    <Switch id="excavate" checked={store.image?.excavate} onCheckedChange={onChange} />
                </div>

                <FieldDescription>Remove the modules around the embedded image.</FieldDescription>
            </FieldContent>
        </Field>
    );
}
