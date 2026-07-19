"use client";

import { encodeCodeValue } from "@/lib/encode-code-value";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import { useMemo } from "react";

/**
 * Single source of truth for the QR payload derived from the active code type
 * and its content. The code preview and the stats bar both read from here so
 * the encoded value can never drift between them, and it only recomputes when
 * the type or content actually changes (not on style/image edits).
 */
export function useEncodedValue() {
    const type = useCodeConfigStore((s) => s.data.type);
    const content = useCodeConfigStore((s) => s.data.content);

    return useMemo(() => encodeCodeValue(type, content[type]), [type, content]);
}
