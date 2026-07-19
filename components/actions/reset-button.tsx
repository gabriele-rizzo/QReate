"use client";

import { useCodeConfigStore } from "@/stores/code-config/provider";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";

export function ResetButton() {
    const reset = useCodeConfigStore((s) => s.reset);

    return (
        <Button size="lg" className="absolute bottom-4 left-4 shadow" onClick={reset}>
            <ArrowCounterClockwiseIcon />
            Reset
        </Button>
    );
}
