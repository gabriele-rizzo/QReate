import type { Icon } from "@phosphor-icons/react";
import { BracketsCurlyIcon, ImageSquareIcon, PaletteIcon } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
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

const INITIAL_FOCUSED_SECTION: keyof typeof CODE_CONFIG_SECTIONS = "content";

export function Settings() {
    return (
        <Accordion defaultValue={[INITIAL_FOCUSED_SECTION]}>
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
