import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// A static CSP so every page can stay statically prerendered (a per-request
// nonce would force dynamic rendering). Script/style need 'unsafe-inline'
// because the App Router streams its RSC payload via inline scripts and there
// is no nonce; the remaining directives still block clickjacking, base-tag
// and object/embed injection, and lock down where the page may connect.
// In development the CSP is relaxed for Fast Refresh (eval) and HMR (websocket).
const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self' https://va.vercel-scripts.com${isDev ? " ws: http:" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
    { key: "Content-Security-Policy", value: csp },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

export default {
    reactCompiler: true,
    devIndicators: false,
    reactStrictMode: process.env.NODE_ENV === "development",
    async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
    },
} satisfies NextConfig;
