import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** A QR finder pattern (the corner squares) as a decorative motif. */
function Finder({ size }: { size: number }) {
    return (
        <div
            style={{
                display: "flex",
                width: size,
                height: size,
                border: `${size / 7}px solid #e6e2db`,
                borderRadius: size / 5,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: (size * 3) / 7,
                    height: (size * 3) / 7,
                    background: "#e6e2db",
                    borderRadius: size / 12,
                }}
            />
        </div>
    );
}

/**
 * Shared Open Graph image design: dark canvas, QReate wordmark, page-specific
 * title, and a finder-pattern motif so the card reads as "QR" at a glance.
 * Rendered at build time by app/**\/opengraph-image.tsx.
 */
export function buildOgImage(title: string, subtitle: string) {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    background: "#1e1e1e",
                    color: "#e6e2db",
                    padding: 80,
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
                    <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
                        QR<span style={{ color: "#8a867e" }}>eate</span>
                    </div>

                    <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginTop: 28 }}>
                        {title}
                    </div>

                    <div style={{ display: "flex", fontSize: 30, color: "#8a867e", marginTop: 24, lineHeight: 1.35 }}>
                        {subtitle}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                    <Finder size={150} />
                    <Finder size={150} />
                </div>
            </div>
        ),
        OG_SIZE,
    );
}
