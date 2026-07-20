"use client";

import { useCode } from "@/hooks/use-code";
import { copy } from "@/utils/copy";
import { wait } from "@/utils/wait";
import { CircleNotchIcon, ClipboardIcon, CopyIcon, WarningIcon } from "@phosphor-icons/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

type CopyState = "success" | "error" | "processing";

export function CopyButton() {
    const [state, setState] = useState<CopyState | null>(null);
    const code = useCode();

    const onClick = useCallback(async () => {
        if (!code.current || !code.current.svg) return;

        setState("processing");

        await wait(copy(code.current.svg), 750)
            .then(() => setState("success"))
            .catch(() => setState("error"));
    }, []);

    useEffect(() => {
        if (!state) return;

        const timeout = setTimeout(() => setState(null), 1500);
        return () => clearTimeout(timeout);
    }, [state]);

    const [label, icon] = useMemo<[string, React.ReactNode]>(() => {
        switch (state) {
            case "error":
                return ["Failed!", <WarningIcon />];
            case "success":
                return ["Copied!", <ClipboardIcon />];
            case "processing":
                return ["Copying", <CircleNotchIcon className="animate-spin" />];

            default:
                return ["Copy", <CopyIcon />];
        }
    }, [state]);

    const variant = useMemo(() => {
        if (state === "error") return "destructive";
        else if (state === "success") return "secondary";

        return "outline";
    }, [state]);

    return (
        <Button variant={variant} disabled={state === "processing"} onClick={onClick}>
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </Button>
    );
}
