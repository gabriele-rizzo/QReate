"use client";

import { CheckIcon, ShareNetworkIcon } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ShareButton() {
    const [copied, setCopied] = useState(false);

    const onClick = useCallback(async () => {
        // The URL is kept in sync with the config, so it already encodes the
        // current settings — sharing is just copying it.
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    }, []);

    useEffect(() => {
        if (!copied) return;

        const timeout = setTimeout(() => setCopied(false), 1500);
        return () => clearTimeout(timeout);
    }, [copied]);

    return (
        <Tooltip>
            <TooltipTrigger
                render={
                    <Button variant={copied ? "secondary" : "outline"} onClick={onClick}>
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
