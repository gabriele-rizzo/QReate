"use client";

import { useCodeConfigStore } from "@/stores/code-config/provider";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";

export function ResetButton() {
    const reset = useCodeConfigStore((s) => s.reset);

    return (
        <Button
            size="lg"
            className="fixed sm:absolute bottom-12 sm:bottom-4 left-4 z-10 shadow hover:bg-[color-mix(in_oklch,var(--primary),var(--foreground)_8%)]"
            onClick={reset}
        >
            <ArrowCounterClockwiseIcon />
            Reset
        </Button>
    );
}
