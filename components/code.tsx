"use client";

import { useCodeConfigStore } from "@/stores/code-config/provider";
import { useEncodedValue } from "@/stores/code-config/use-encoded-value";
import { useQrSize } from "@/stores/code-config/use-qr-size";
import { ReactQRCode, type ImageSettings } from "@lglab/react-qr-code";
import { useMemo } from "react";

export function Code() {
    const { style, data, image } = useCodeConfigStore((s) => s);
    const value = useEncodedValue();
    const size = useQrSize();

    const is = useMemo<ImageSettings | undefined>(() => {
        if (typeof image === "undefined" || !image || !image.file) return undefined;

        const src = URL.createObjectURL(image.file);

        return { src, ...image };
    }, [image]);

    // A non-empty value that fits no version (1–40) makes the encoder throw
    // "Data too long" mid-render and crash the page. useQrSize returns null in
    // exactly that case, so we render a fallback instead of the QR.
    if (value.length > 0 && size === null) {
        return (
            <div className="flex size-full items-center justify-center rounded-2xl border border-dashed p-6 text-center text-muted-foreground text-sm">
                Too much data to fit in a QR code. Shorten the content or lower the error correction level.
            </div>
        );
    }

    return (
        <ReactQRCode
            value={value || " "}
            svgProps={{ className: "size-full" }}
            marginSize={style.margin}
            level={data.ec}
            minVersion={data.min}
            imageSettings={is}
            background={style.background.type === "transparent" ? undefined : style.background.color}
            dataModulesSettings={style.modules}
            finderPatternOuterSettings={style.finder.outer}
            finderPatternInnerSettings={style.finder.inner}
        />
    );
}
