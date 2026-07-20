"use client";

import { useCode } from "@/hooks/use-code";
import { copy } from "@/utils/copy";
import { wait } from "@/utils/wait";
import { CircleNotchIcon, ClipboardIcon, CopyIcon, WarningIcon } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

type CopyState = "success" | "error" | "processing";

// Memoization is handled by the React Compiler — no manual useMemo/useCallback.
const STATES: Record<CopyState | "idle", { label: string; icon: React.ReactNode; variant: "outline" | "secondary" | "destructive" }> = {
    idle: { label: "Copy", icon: <CopyIcon />, variant: "outline" },
    processing: { label: "Copying", icon: <CircleNotchIcon className="animate-spin" />, variant: "outline" },
    success: { label: "Copied!", icon: <ClipboardIcon />, variant: "secondary" },
    error: { label: "Failed!", icon: <WarningIcon />, variant: "destructive" },
};

export function CopyButton() {
    const [state, setState] = useState<CopyState | null>(null);
    const code = useCode();

    const onClick = async () => {
        if (!code.current || !code.current.svg) return;

        setState("processing");

        await wait(copy(code.current.svg), 750)
            .then(() => setState("success"))
            .catch(() => setState("error"));
    };

    useEffect(() => {
        if (!state) return;

        const timeout = setTimeout(() => setState(null), 1500);
        return () => clearTimeout(timeout);
    }, [state]);

    const { label, icon, variant } = STATES[state ?? "idle"];

    return (
        <Button variant={variant} disabled={state === "processing"} onClick={onClick}>
            {icon}
            <span className="sr-only sm:not-sr-only">{label}</span>
        </Button>
    );
}
