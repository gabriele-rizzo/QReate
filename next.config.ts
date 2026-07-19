import type { NextConfig } from "next";

export default {
    reactCompiler: true,
    devIndicators: false,
    reactStrictMode: process.env.NODE_ENV === "development",
} satisfies NextConfig;
