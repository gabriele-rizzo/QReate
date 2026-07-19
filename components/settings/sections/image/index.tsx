"use client";

import { useCodeConfigStore } from "@/stores/code-config/provider";
import { ExcavateSwitch } from "./components/excavate-switch";
import { ImagePicker } from "./components/image-picker";
import { ImageSizeInput } from "./components/image-size-input";
import { OpacitySlider } from "./components/opacity-slider";

export default function ImageCodeSettingsSection() {
    const hasImage = useCodeConfigStore((s) => s.image !== undefined);

    return (
        <>
            <ImagePicker />

            {hasImage && (
                <>
                    <ImageSizeInput />
                    <ExcavateSwitch />
                    <OpacitySlider />
                </>
            )}
        </>
    );
}
