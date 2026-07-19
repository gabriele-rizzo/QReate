"use client";

import { ShareNetworkIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ShareButton() {
    return (
        <Tooltip>
            <TooltipTrigger
                render={
                    <Button variant="outline">
                        <ShareNetworkIcon />
                    </Button>
                }
            />

            <TooltipContent>
                <p>Share</p>
            </TooltipContent>
        </Tooltip>
    );
}
