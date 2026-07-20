"use client";

import { useCode } from "@/hooks/use-code";
import { useEncodedValue } from "@/hooks/use-encoded-value";
import { useQrSize } from "@/hooks/use-qr-size";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import { ReactQRCode, type ImageSettings } from "@lglab/react-qr-code";

export function Code() {
    const { style, data, image } = useCodeConfigStore((s) => s);

    const value = useEncodedValue();
    const size = useQrSize();
    const code = useCode();

    // `image.src` is an object URL owned by the store (created on upload,
    // revoked on replace/remove/reset), so rendering stays pure.
    const is: ImageSettings | undefined = image
        ? { src: image.src, width: image.width, height: image.height, excavate: image.excavate, opacity: image.opacity }
        : undefined;

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
            ref={code}
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
