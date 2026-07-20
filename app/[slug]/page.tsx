import { TypeLanding } from "@/components/landing";
import { GeneratorShell } from "@/components/layout/generator-shell";
import { QR_TYPE_PAGES, QR_TYPE_PAGE_BY_SLUG } from "@/lib/qr-pages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface TypePageProps {
    params: Promise<{ slug: string }>;
}

// Only the known type-landing slugs exist; everything else 404s at build time.
export const dynamicParams = false;

export function generateStaticParams() {
    return QR_TYPE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: TypePageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = QR_TYPE_PAGE_BY_SLUG.get(slug);
    if (!page) return {};

    return {
        title: page.title,
        description: page.description,
        alternates: { canonical: `/${page.slug}` },
        openGraph: {
            title: page.title,
            description: page.description,
            siteName: "QReate",
            type: "website",
            url: `/${page.slug}`,
        },
        twitter: {
            card: "summary_large_image",
            title: page.title,
            description: page.description,
        },
    };
}

export default async function TypePage({ params }: TypePageProps) {
    const { slug } = await params;
    const page = QR_TYPE_PAGE_BY_SLUG.get(slug);
    if (!page) notFound();

    return (
        <GeneratorShell initialType={page.type}>
            <TypeLanding page={page} />
        </GeneratorShell>
    );
}
