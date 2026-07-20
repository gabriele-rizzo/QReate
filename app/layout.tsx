import { ThemeProvider } from "@/components/layout/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";

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
    "Create custom QR codes with logos, colors and unique shapes, free, no signup, no expiry. Wi-Fi, vCard, URL and more. Everything runs in your browser.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: "Free QR Code Generator: Custom Designs & Logo | QReate",
    description,
    applicationName: "QReate",
    alternates: { canonical: "/" },
    keywords: [
        "qr code generator",
        "free qr code generator",
        "custom qr code",
        "qr code with logo",
        "wifi qr code",
        "vcard qr code",
        "svg qr code",
    ],
    authors: [{ name: "Gabriele Rizzo", url: "https://x.com/gabrielerizzoo" }],
    openGraph: {
        title: "Free QR Code Generator: Custom Designs & Logo | QReate",
        description,
        siteName: "QReate",
        type: "website",
        url: "/",
    },
    twitter: {
        card: "summary_large_image",
        title: "Free QR Code Generator: Custom Designs & Logo | QReate",
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
                <Analytics />

                <ThemeProvider>
                    <TooltipProvider>{children}</TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
