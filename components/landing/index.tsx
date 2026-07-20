import { QR_TYPE_PAGES, type QrTypePage } from "@/lib/qr-pages";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

/*
 * Landing content rendered below the generator. Pure server components, no
 * client JS, so this is fast, fully crawlable text: the page's h1, feature
 * copy, how-to steps, FAQs (with matching JSON-LD) and internal links between
 * the per-type landing pages.
 */

export interface Faq {
    question: string;
    answer: string;
}

export const HOME_FAQS: Faq[] = [
    {
        question: "Is QReate really free?",
        answer: "Yes, every feature is free: unlimited QR codes, full styling, logo embedding and high-resolution downloads. No account, no watermark, no paid tier.",
    },
    {
        question: "Do the QR codes expire?",
        answer: "No. QReate generates static QR codes: your content is encoded directly in the pattern, with no redirect service in between. The code works forever, with unlimited scans.",
    },
    {
        question: "Is my data private?",
        answer: "Yes. Codes are generated entirely in your browser, the text, passwords or contact details you enter are never uploaded to any server.",
    },
    {
        question: "Do my QR codes track scans?",
        answer: "No. Because the content is encoded directly with no redirects, there is nothing to track, by design. If you need scan analytics, a static code is the wrong tool; what you get instead is privacy and permanence.",
    },
    {
        question: "Can I add my logo to a QR code?",
        answer: "Yes, upload an image, size and position it, adjust its opacity, and optionally excavate the modules behind it so it stays legible. Use a higher error correction level to keep the code reliably scannable.",
    },
    {
        question: "Which file formats can I download?",
        answer: "SVG for infinitely sharp print, plus PNG and JPEG at 512, 1024, 2048 or 4096 pixels for screens and documents.",
    },
    {
        question: "What is error correction?",
        answer: "QR codes embed redundancy so they scan even when partially damaged or covered. The four levels, L, M, Q, H, recover roughly 7%, 15%, 25% and 30% of the code. Higher levels make denser codes; use Q or H when embedding a logo.",
    },
    {
        question: "How much data fits in a QR code?",
        answer: "Up to about 2,900 characters at the lowest error correction level. Shorter content produces a coarser, faster-scanning code, so keep it brief when you can.",
    },
];

const FEATURES: { title: string; body: string }[] = [
    {
        title: "Free, no signup",
        body: "Unlimited codes with every feature included. No account, no watermark, no trial that runs out.",
    },
    {
        title: "Private by design",
        body: "Everything runs in your browser. Wi-Fi passwords, contacts, links, nothing you type is ever uploaded.",
    },
    {
        title: "Never expires",
        body: "Static codes encode your content directly, no redirect servers, no link rot, no scan limits. Print once, works forever.",
    },
    {
        title: "Deep customization",
        body: "Twelve module shapes, custom finder patterns, any color, transparent backgrounds. Make a code that looks like your brand.",
    },
    {
        title: "Logo embedding",
        body: "Drop your logo into the center, tune its size and opacity, and excavate the modules behind it for clean contrast.",
    },
    {
        title: "Print-ready export",
        body: "Vector SVG for razor-sharp print at any size, or PNG/JPEG up to 4096 px for screens, decks and documents.",
    },
];

function JsonLd({ data }: { data: object }) {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function faqJsonLd(faqs: Faq[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };
}

function Section({ id, title, children }: React.PropsWithChildren<{ id: string; title: string }>) {
    return (
        <section id={id} className="mx-auto w-full max-w-5xl px-6 py-14">
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <div className="mt-6">{children}</div>
        </section>
    );
}

function Hero({ h1, intro }: { h1: string; intro: string }) {
    return (
        <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-6">
            <h1 className="text-4xl font-semibold tracking-tight text-balance">{h1}</h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground text-pretty">{intro}</p>
        </section>
    );
}

function FeatureGrid() {
    return (
        <Section id="features" title={`Why ${SITE_NAME}?`}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map((feature) => (
                    <div key={feature.title} className="rounded-2xl border p-5">
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{feature.body}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}

function Steps({ title, steps }: { title: string; steps: readonly string[] }) {
    return (
        <Section id="how-it-works" title={title}>
            <ol className="grid gap-4 sm:grid-cols-3">
                {steps.map((step, index) => (
                    <li key={step} className="rounded-2xl border p-5">
                        <span className="font-mono text-sm text-muted-foreground">{index + 1}</span>
                        <p className="mt-2 text-sm">{step}</p>
                    </li>
                ))}
            </ol>
        </Section>
    );
}

function TypeGrid({ current }: { current?: QrTypePage }) {
    const pages = QR_TYPE_PAGES.filter((page) => page.slug !== current?.slug);

    return (
        <Section id="types" title={current ? "More QR code types" : "One generator, every QR code type"}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pages.map((page) => (
                    <Link
                        key={page.slug}
                        href={`/${page.slug}`}
                        className="rounded-2xl border p-5 transition-colors hover:bg-muted/50"
                    >
                        <h3 className="font-medium">{page.h1}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{page.description}</p>
                    </Link>
                ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
                The generator also encodes cryptocurrency addresses and raw byte payloads. To use them,{" "}
                {current ? (
                    <Link href="/" className="underline underline-offset-3 hover:text-foreground">
                        open the full QR code generator
                    </Link>
                ) : (
                    "pick the type at the top of the page"
                )}
                .
            </p>
        </Section>
    );
}

function FaqSection({ faqs }: { faqs: Faq[] }) {
    return (
        <Section id="faq" title="Frequently asked questions">
            <div className="flex flex-col">
                {faqs.map((faq) => (
                    <details key={faq.question} className="group border-b py-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                            {faq.question}
                            <span aria-hidden className="text-muted-foreground transition-transform group-open:rotate-45">
                                +
                            </span>
                        </summary>
                        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{faq.answer}</p>
                    </details>
                ))}
            </div>
        </Section>
    );
}

/** Landing content for the homepage. */
export function HomeLanding() {
    return (
        <>
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    name: SITE_NAME,
                    url: SITE_URL,
                    applicationCategory: "UtilitiesApplication",
                    operatingSystem: "Any",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                    description:
                        "Free QR code generator with custom colors, shapes and logos. Runs entirely in the browser, no signup, codes never expire.",
                    featureList: FEATURES.map((feature) => feature.title),
                    author: { "@type": "Person", name: "Gabriele Rizzo", url: "https://x.com/gabrielerizzoo" },
                }}
            />
            <JsonLd data={faqJsonLd(HOME_FAQS)} />

            <Separator orientation="horizontal" />
            <Hero
                h1="Free QR Code Generator"
                intro="Create custom QR codes in seconds, pick from eleven content types, style every module, embed your logo, and export print-ready files. No signup, no watermark, no expiry. Everything runs in your browser, so what you encode stays on your device."
            />
            <FeatureGrid />
            <TypeGrid />
            <Steps
                title="How to create a QR code"
                steps={[
                    "Pick a content type, link, Wi-Fi, contact, event and more, and fill in the details.",
                    "Style it: colors, module shapes, finder patterns, background, or your logo.",
                    "Download as SVG, PNG or JPEG, or copy a share link that preserves your design.",
                ]}
            />
            <FaqSection faqs={HOME_FAQS} />
        </>
    );
}

/** Landing content for a per-type page. */
export function TypeLanding({ page }: { page: QrTypePage }) {
    return (
        <>
            <JsonLd data={faqJsonLd(page.faqs)} />
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
                        { "@type": "ListItem", position: 2, name: page.h1, item: `${SITE_URL}/${page.slug}` },
                    ],
                }}
            />

            <Separator orientation="horizontal" />
            <Hero h1={page.h1} intro={page.intro} />
            <Steps title={`How to make a ${page.name} QR code`} steps={page.steps} />
            <FaqSection faqs={page.faqs} />
            <FeatureGrid />
            <TypeGrid current={page} />
        </>
    );
}
