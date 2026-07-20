/**
 * Serialises the shareable part of the code config into a compact, URL-safe
 * string and back. Only the fields that differ from the defaults are encoded
 * (a diff), so a freshly-tweaked code produces a short URL and untouched
 * options never bloat it. The uploaded `image` is intentionally excluded — a
 * local File can't live in a URL.
 *
 * The payload is prefixed with a one-char format marker:
 *   "0" — raw base64url of the diff JSON (synchronous, no dependencies)
 *   "1" — deflate-raw compressed then base64url (needs the async Compression
 *         Streams API; only used when it actually makes the URL shorter)
 *
 * Small configs (the common case) stay on the synchronous raw path so a shared
 * link hydrates before paint with no flash. Only large payloads — long free
 * text, raw bytes, big vCards — pay for compression, and only when it wins.
 *
 * The same `?c=` param drives both features that read this module:
 *   - refresh persistence (the URL is kept in sync on every change)
 *   - the share button (which only has to copy the current URL)
 */

import { defaultInitState } from "@/stores/code-config";

/** The parts of the store that travel in the URL (everything but the image). */
type ShareableConfig = Pick<CodeConfigStore, "data" | "style">;

/** Result of reading the URL: a config we already have, or one still inflating. */
type DecodeResult = { kind: "sync"; config: ShareableConfig } | { kind: "async"; config: Promise<ShareableConfig | null> };

const PARAM = "c";
const RAW = "0";
const ZIP = "1";

/**
 * Below this many chars, compression's fixed overhead rarely wins and the link
 * is already short — so we skip it and stay fully synchronous. Above it (long
 * text / raw bytes), we attempt compression and keep it only if it's shorter.
 */
const COMPRESS_THRESHOLD = 512;

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Recursively keep only the keys where `current` differs from `base`. */
function diff(current: Record<string, unknown>, base: Record<string, unknown>): Record<string, unknown> {
    const out: Record<string, unknown> = {};

    for (const key of Object.keys(current)) {
        const c = current[key];
        const b = base[key];

        if (isPlainObject(c) && isPlainObject(b)) {
            const nested = diff(c, b);
            if (Object.keys(nested).length > 0) out[key] = nested;
        } else if (c !== b) {
            out[key] = c;
        }
    }

    return out;
}

/** Deep-merge a decoded diff back onto a (cloned) base config. */
function merge(base: unknown, patch: unknown): unknown {
    if (!isPlainObject(base) || !isPlainObject(patch)) return patch;

    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(patch)) {
        out[key] = merge(base[key], patch[key]);
    }
    return out;
}

/**
 * The baseline the URL diff is computed against. Each page's store carries the
 * state it was created with (`initial`), so a type landing page whose store
 * starts at e.g. `type: "wifi"` produces an empty diff — and a clean URL —
 * until the user actually changes something. Both encode and decode on a given
 * path use the same baseline, so links stay self-consistent.
 */
function shareableBase(state?: SyncedState): ShareableConfig {
    const base = state?.initial ?? defaultInitState;
    return { data: base.data, style: base.style };
}

/** The store state plus the baseline it was created from. */
type SyncedState = CodeConfigStore & { initial: CodeConfigStore };

/** The minimal diff of a store vs its baseline as a JSON string, or "". */
function diffJson(state: SyncedState): string {
    const current = { data: state.data, style: state.style };
    const changed = diff(current, shareableBase(state) as unknown as Record<string, unknown>);

    if (Object.keys(changed).length === 0) return "";
    return JSON.stringify(changed);
}

/** Merge a decoded diff JSON string onto the baseline, or `null` when invalid. */
function jsonToConfig(json: string, base: ShareableConfig): ShareableConfig | null {
    try {
        const patch = JSON.parse(json);
        if (!isPlainObject(patch)) return null;
        return merge(structuredClone(base), patch) as ShareableConfig;
    } catch {
        return null;
    }
}

function bytesToBase64Url(bytes: Uint8Array): string {
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(input: string): Uint8Array {
    const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(base64);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

const textToBase64Url = (text: string) => bytesToBase64Url(new TextEncoder().encode(text));
const base64UrlToText = (input: string) => new TextDecoder().decode(base64UrlToBytes(input));

async function deflate(text: string): Promise<Uint8Array> {
    const stream = new Blob([new TextEncoder().encode(text)]).stream().pipeThrough(new CompressionStream("deflate-raw"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function inflate(bytes: Uint8Array): Promise<string> {
    const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return new Response(stream).text();
}

/** Synchronous encode: `""` when at the baseline, otherwise the raw (`"0"`) form. */
function encodeRaw(state: SyncedState): string {
    const json = diffJson(state);
    return json ? RAW + textToBase64Url(json) : "";
}

/**
 * Attempt the compressed (`"1"`) form. Returns it only when it's actually
 * shorter than `raw`; returns `null` otherwise (small payload, no win, or the
 * Compression Streams API being unavailable).
 */
async function encodeCompressed(state: SyncedState, raw: string): Promise<string | null> {
    if (raw.length <= COMPRESS_THRESHOLD || typeof CompressionStream === "undefined") return null;

    const json = diffJson(state);
    if (!json) return null;

    try {
        const zipped = ZIP + bytesToBase64Url(await deflate(json));
        return zipped.length < raw.length ? zipped : null;
    } catch {
        return null;
    }
}

function decode(encoded: string, base: ShareableConfig): DecodeResult | null {
    const marker = encoded[0];

    if (marker === ZIP) {
        const config = inflate(base64UrlToBytes(encoded.slice(1)))
            .then((json) => jsonToConfig(json, base))
            .catch(() => null);
        return { kind: "async", config };
    }

    // "0" is the current raw marker; anything else is treated as a legacy
    // markerless payload so older links keep working.
    const payload = marker === RAW ? encoded.slice(1) : encoded;
    try {
        const config = jsonToConfig(base64UrlToText(payload), base);
        return config ? { kind: "sync", config } : null;
    } catch {
        return null;
    }
}

function getParam(): string | null {
    return new URLSearchParams(window.location.search).get(PARAM);
}

function setParam(value: string): void {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(PARAM, value);
    else url.searchParams.delete(PARAM);
    window.history.replaceState(window.history.state, "", url);
}

/** Read the shareable config from the current URL, if present and valid. */
export function readConfigFromUrl(state: SyncedState): DecodeResult | null {
    if (typeof window === "undefined") return null;

    const encoded = getParam();
    return encoded ? decode(encoded, shareableBase(state)) : null;
}

/**
 * Reflect the current config into the URL via `replaceState` (no history
 * entries, no navigation). The raw form is written synchronously so the URL is
 * always immediately valid; large payloads are then upgraded to the shorter
 * compressed form asynchronously, guarded against races with newer edits.
 */
export function writeConfigToUrl(state: SyncedState): void {
    if (typeof window === "undefined") return;

    const raw = encodeRaw(state);
    setParam(raw);

    if (!raw || raw.length <= COMPRESS_THRESHOLD) return;

    encodeCompressed(state, raw).then((zipped) => {
        // Only apply if the URL still reflects the raw form we started from —
        // otherwise a newer edit already wrote (and will compress) its own state.
        if (zipped && getParam() === raw) setParam(zipped);
    });
}
