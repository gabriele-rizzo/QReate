"use client";

import { useEncodedValue } from "@/hooks/use-encoded-value";
import { useQrSize } from "@/hooks/use-qr-size";
import { useCodeConfigStore } from "@/stores/code-config/provider";

const Separator = () => <pre>•</pre>;

export function CodeStats() {
    const { ec } = useCodeConfigStore(({ data }) => data);
    const value = useEncodedValue();
    const size = useQrSize();

    return (
        <div className="dark:group-data-[inverted='true']:invert flex flex-row gap-2 md:gap-4 opacity-75 text-sm *:even:text-muted-foreground *:even:opacity-50">
            <pre>{size ? `${size}x${size}` : "—"}</pre>

            <Separator />

            <pre>EC {ec}</pre>

            <Separator />

            <pre>{value ? `${value.length} chars` : "—"}</pre>
        </div>
    );
}
