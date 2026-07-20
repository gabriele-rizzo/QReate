import { buildOgImage, OG_SIZE } from "@/lib/og";

export const alt = "QReate — Free QR Code Generator";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return buildOgImage("Free QR Code Generator", "Custom colors, shapes and logos — no signup, runs in your browser.");
}
