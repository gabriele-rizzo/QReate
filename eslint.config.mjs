import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
    {
        // Vendored primitives (shadcn/diceui) use imperative external-store and
        // DOM patterns the React Compiler bails on; it falls back to plain
        // React there, which is fine — don't fail lint over vendored code.
        files: ["components/ui/**"],
        rules: {
            "react-hooks/immutability": "off",
            "react-hooks/preserve-manual-memoization": "off",
        },
    },
]);
