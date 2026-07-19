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
        <div className="shrink-0 h-8 flex flex-row items-center px-4 justify-between *:opacity-50 *:hover:opacity-100 *:transition-opacity">
            <span className="font-mono text-xs">
                &copy;{year}&nbsp;
                <a href={author.href} className="hover:underline">
                    {author.name}
                </a>
                {version && <span>&nbsp;·&nbsp;v{version}</span>}
            </span>

            <a href={payment} className="text-xs font-mono hover:underline">
                ☕️ Buy me a coffee
            </a>
        </div>
    );
}
