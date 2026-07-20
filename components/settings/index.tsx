"use client";

import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import type { Icon } from "@phosphor-icons/react";
import { BracketsCurlyIcon, ImageSquareIcon, PaletteIcon } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface CodeConfigSection {
    label: string;
    icon: Icon;
    component: React.ComponentType;
}

const CODE_CONFIG_SECTIONS = {
    content: { label: "Content", icon: BracketsCurlyIcon, component: dynamic(() => import("./sections/content")) },
    style: { label: "Style", icon: PaletteIcon, component: dynamic(() => import("./sections/style")) },
    image: { label: "Image", icon: ImageSquareIcon, component: dynamic(() => import("./sections/image")) },
} satisfies Record<string, CodeConfigSection>;

type SectionId = keyof typeof CODE_CONFIG_SECTIONS;

const INITIAL_FOCUSED_SECTION: SectionId = "content";
const STORAGE_KEY = "qreate:open-sections";

function isSectionId(value: unknown): value is SectionId {
    return typeof value === "string" && value in CODE_CONFIG_SECTIONS;
}

export function Settings() {
    // Start from the default so server and first client render agree; the saved
    // value is applied before paint by the layout effect below.
    const [openSections, setOpenSections] = useState<SectionId[]>([INITIAL_FOCUSED_SECTION]);

    useIsomorphicLayoutEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;

            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) setOpenSections(parsed.filter(isSectionId));
        } catch {
            // Ignore corrupt/unavailable storage and keep the default.
        }
    }, []);

    const onValueChange = (value: unknown[]) => {
        const next = value.filter(isSectionId);
        setOpenSections(next);

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
            // Persisting the open sections is best-effort.
        }
    };

    return (
        <Accordion value={openSections} onValueChange={onValueChange}>
            {Object.entries(CODE_CONFIG_SECTIONS).map(([id, item]) => (
                <AccordionItem key={id} value={id}>
                    <AccordionTrigger>
                        <item.icon size={20} />
                        {item.label}
                    </AccordionTrigger>

                    <AccordionContent>
                        <div className="flex flex-col gap-4">
                            <item.component />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
