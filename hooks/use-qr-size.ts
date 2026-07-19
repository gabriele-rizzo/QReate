"use client";

import { getQrSize } from "@/lib/qr-size";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import { useMemo } from "react";
import { useEncodedValue } from "./use-encoded-value";

/**
 * Single source of truth for the rendered QR dimension (modules per side).
 * Returns null when the value is empty or too large to fit any version (1–40) —
 * the latter is exactly the case where the encoder would otherwise throw
 * "Data too long" mid-render, so callers use this to guard against that.
 */
export function useQrSize() {
    const value = useEncodedValue();
    const ec = useCodeConfigStore((s) => s.data.ec);
    const min = useCodeConfigStore((s) => s.data.min);

    return useMemo(() => getQrSize(value, ec, min), [value, ec, min]);
}
