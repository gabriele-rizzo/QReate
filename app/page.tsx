import { HomeLanding } from "@/components/landing";
import { GeneratorShell } from "@/components/layout/generator-shell";

export default function RootPage() {
    return (
        <GeneratorShell>
            <HomeLanding />
        </GeneratorShell>
    );
}
