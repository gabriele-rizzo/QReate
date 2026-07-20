"use client";

import { useCode } from "@/hooks/use-code";
import type { DownloadOptions } from "@lglab/react-qr-code";
import { CaretDownIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { useCallback } from "react";
import { Button } from "../ui/button";

export function DownloadButton() {
    const code = useCode();

    const onClick = useCallback(() => {
        if (!code.current) return;

        const options: DownloadOptions = { format: "png", size: 1024, name: "qrcode" };

        code.current.download(options);
    }, []);

    return (
        <Button variant="default" onClick={onClick}>
            <DownloadSimpleIcon />
            <span className="hidden sm:inline">Download</span>
            <CaretDownIcon size={10} className="opacity-50" />
        </Button>
    );
}
