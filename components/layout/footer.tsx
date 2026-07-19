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
                <a href={author.href} className="hover:underline">
                    {author.name}
                </a>
            </span>

            {version && (
                <Tooltip>
                    <TooltipTrigger render={<span>v{version}</span>} />
                    <TooltipContent>❤️</TooltipContent>
                </Tooltip>
            )}

            <a href={payment} className="hover:underline ml-auto">
                ☕️ Buy me a coffee
            </a>
        </div>
    );
}
