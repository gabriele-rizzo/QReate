"use client";

import { writeConfigToUrl } from "@/lib/share-state";
import { useCodeConfigStoreApi } from "@/stores/code-config/provider";
import { CheckIcon, ShareNetworkIcon } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ShareButton() {
    const [copied, setCopied] = useState(false);
    const store = useCodeConfigStoreApi();

    const onClick = useCallback(async () => {
        // The URL mirrors the config, but the mirror is debounced — flush the
        // latest state synchronously so the copied link is never stale.
        writeConfigToUrl(store.getState());

        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    }, [store]);

    useEffect(() => {
        if (!copied) return;

        const timeout = setTimeout(() => setCopied(false), 1500);
        return () => clearTimeout(timeout);
    }, [copied]);

    return (
        <Tooltip>
            <TooltipTrigger
                render={
                    <Button
                        variant={copied ? "secondary" : "outline"}
                        aria-label={copied ? "Link copied" : "Copy share link"}
                        onClick={onClick}
                    >
                        {copied ? <CheckIcon /> : <ShareNetworkIcon />}
                    </Button>
                }
            />

            <TooltipContent>
                <p>{copied ? "Link copied!" : "Copy share link"}</p>
            </TooltipContent>
        </Tooltip>
    );
}
