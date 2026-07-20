import { QR_TYPE_PAGES } from "@/lib/qr-pages";
import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${SITE_URL}/`,
            changeFrequency: "weekly",
            priority: 1,
        },
        ...QR_TYPE_PAGES.map((page) => ({
            url: `${SITE_URL}/${page.slug}`,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ];
}
