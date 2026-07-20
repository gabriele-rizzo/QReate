"use client";

import { useCode } from "@/hooks/use-code";
import type { DownloadFileFormat } from "@lglab/react-qr-code";
import { CaretDownIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { useCallback } from "react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const SIZES: Record<string, number> = {
    Small: 512,
    Medium: 1024,
    Large: 2048,
    XL: 4096,
} as const;

export function DownloadButton() {
    const code = useCode();

    const download = useCallback((format: DownloadFileFormat, size?: number) => {
        if (!code.current) return;

        const details = format === "svg" ? "svg" : `${format}_${size}x${size}`;

        code.current.download({ format, size, name: `qrcode_${details}` });
    }, []);

    const SizeOptions = useCallback(
        ({ format }: { format: DownloadFileFormat }) => (
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {Object.entries(SIZES).map(([label, size]) => (
                        <DropdownMenuItem key={label.toLowerCase()} onClick={() => download(format, size)}>
                            {label}
                            <DropdownMenuShortcut>{size}</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        ),
        [download],
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="default">
                        <DownloadSimpleIcon />
                        <span className="hidden sm:inline">Download</span>
                        <CaretDownIcon size={10} className="opacity-50" />
                    </Button>
                }
            />

            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>JPEG</DropdownMenuSubTrigger>
                        <SizeOptions format="jpeg" />
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>PNG</DropdownMenuSubTrigger>
                        <SizeOptions format="png" />
                    </DropdownMenuSub>

                    <DropdownMenuItem onClick={() => download("svg")}>
                        Scalable
                        <DropdownMenuShortcut>SVG</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
