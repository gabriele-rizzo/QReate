import { ThemeProvider } from "@/components/layout/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CodeConfigStoreProvider } from "@/stores/code-config/provider";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";

import { CodeProvider } from "@/hooks/use-code";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontSerif = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

const description =
    "Free QR code generator with live preview. Create QR codes for URLs, Wi-Fi, vCards, events and more — style every module, embed a logo, and share or download as SVG, PNG or JPEG.";

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: "QReate — QR Code Generator",
    description,
    applicationName: "QReate",
    keywords: ["qr code", "qr code generator", "free", "custom qr code", "wifi qr code", "vcard qr code", "svg"],
    authors: [{ name: "Gabriele Rizzo", url: "https://x.com/gabrielerizzoo" }],
    openGraph: {
        title: "QReate — QR Code Generator",
        description,
        siteName: "QReate",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "QReate — QR Code Generator",
        description,
        creator: "@gabrielerizzoo",
    },
};

export const viewport: Viewport = {
    // Matches manifest.json's theme/background pair, per color scheme.
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#e6e2db" },
        { media: "(prefers-color-scheme: dark)", color: "#1e1e1e" },
    ],
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
            <head>
                <meta name="apple-mobile-web-app-title" content="QReate" />
            </head>

            <body className={`${inter.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}>
                <CodeConfigStoreProvider>
                    <ThemeProvider>
                        <TooltipProvider>
                            <CodeProvider>{children}</CodeProvider>
                        </TooltipProvider>
                    </ThemeProvider>
                </CodeConfigStoreProvider>
            </body>
        </html>
    );
}
