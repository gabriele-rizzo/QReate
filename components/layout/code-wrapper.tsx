"use client";

import { useCodeConfigStore } from "@/stores/code-config/provider";
import { Code } from "../code";
import { CodeStats } from "../stats";

export function CodeWrapper() {
    const type = useCodeConfigStore((s) => s.style.background.type);

    return (
        <div
            data-inverted={type === "transparent"}
            className="group dark:data-[inverted='true']:bg-card-foreground bg-sidebar flex items-center justify-center py-10 sm:py-0 sm:h-full"
        >
            <div className="flex flex-col w-3/4 items-center gap-4">
                <div className="not-group-data-[inverted='true']:shadow w-full max-w-3xs sm:max-w-full aspect-square">
                    <Code />
                </div>

                <CodeStats />
            </div>
        </div>
    );
}
