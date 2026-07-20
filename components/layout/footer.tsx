import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface FooterProps {
    author: {
        name: string;
        href: string;
    };
    payment: string;
    version?: string;
}

export function Footer({ author, payment, version }: FooterProps) {
    const year = new Date().getFullYear();

    return (
        <div className="shrink-0 font-mono text-xs h-8 flex flex-row items-center px-4 gap-4 *:opacity-50 *:hover:opacity-100 *:transition-opacity">
            <span>
                &copy;{year}&nbsp;
                <a href={author.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {author.name}
                </a>
            </span>

            {version && (
                <Tooltip>
                    <TooltipTrigger render={<span className="hidden sm:inline">v{version}</span>} />
                    <TooltipContent>❤️</TooltipContent>
                </Tooltip>
            )}

            <a href={payment} target="_blank" rel="noopener noreferrer" className="hover:underline ml-auto">
                ☕️<span className="sr-only sm:not-sr-only">&nbsp;Buy me a coffee</span>
            </a>
        </div>
    );
}
