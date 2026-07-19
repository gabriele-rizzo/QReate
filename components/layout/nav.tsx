import Link from "next/link";
import { Logo } from "../logo";
import { Button } from "../ui/button";

interface NavProps {
    actions: React.ReactNode;
}

export function Nav({ actions }: NavProps) {
    return (
        <div className="shrink-0 h-14 flex flex-row items-center px-4 justify-between">
            <Button nativeButton={false} variant="ghost" className="-ml-2" render={<Link href="/" />}>
                <Logo className="size-4 fill-foreground" />
            </Button>

            <div className="flex flex-row gap-2">{actions}</div>
        </div>
    );
}
