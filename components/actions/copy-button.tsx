"use client";

import { CopyIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";

export function CopyButton() {
    return (
        <Button variant="outline">
            <CopyIcon />
            Copy
        </Button>
    );
}
