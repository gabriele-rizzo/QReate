interface LogoProps extends React.ComponentProps<"svg"> {
    variant?: "icon" | "default";
}

export function Logo({ variant = "default", ...props }: LogoProps) {
    return (
        <div className="flex flex-row gap-2 items-center">
            <svg {...props} viewBox="0 0 684 684" xmlns="http://www.w3.org/2000/svg">
                <path d="M547.2 0C555.371 0 559.457 -2.70223e-05 562.908 0.186523C628.166 3.71362 680.286 55.8344 683.813 121.092C684 124.543 684 128.629 684 136.8V342C684 530.881 530.881 684 342 684C153.119 684 0 530.881 0 342C0 153.119 153.119 0 342 0H547.2ZM342 113.555C215.833 113.555 113.555 215.833 113.555 342C113.555 468.167 215.833 570.445 342 570.445C468.167 570.445 570.445 468.167 570.445 342V170.666C570.445 139.124 544.876 113.555 513.334 113.555H342Z" />
                <path d="M227.777 342C227.777 278.917 278.917 227.777 342 227.777H427.667C443.438 227.777 456.223 240.562 456.223 256.333V342C456.223 405.083 405.083 456.223 342 456.223C278.917 456.223 227.777 405.083 227.777 342Z" />
            </svg>

            {variant !== "icon" && (
                <span className="text-lg font-mono">
                    <span className="font-semibold">QR</span>
                    <span className="text-muted-foreground">eate</span>
                </span>
            )}
        </div>
    );
}
