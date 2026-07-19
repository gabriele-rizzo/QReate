"use client";

import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";

export function DownloadButton() {
    return (
        <Button variant="default">
            <DownloadSimpleIcon />
            Download
        </Button>
    );
}
