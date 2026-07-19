"use client";

import { useCodeConfigStore } from "@/stores/code-config/provider";
import { Code } from "../code";
import { CodeStats } from "../stats";

export function CodeWrapper() {
    const type = useCodeConfigStore((s) => s.style.background.type);

    return (
        <div
            data-inverted={type === "transparent"}
            className="group data-[inverted='true']:bg-card-foreground bg-sidebar h-full flex items-center justify-center"
        >
            <div className="flex flex-col w-3/4 items-center gap-4">
                <div className="w-full max-w-3xs md:max-w-full aspect-square">
                    <Code />
                </div>

                <CodeStats />
            </div>
        </div>
    );
}
