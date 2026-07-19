import type { ErrorCorrectionLevel } from "@lglab/react-qr-code";

/**
 * Exact QR "version" → NxN dimension computation, ported from the qrcodegen
 * encoder bundled inside @lglab/react-qr-code. It reproduces the library's own
 * version selection — whole-string mode classification (numeric / alphanumeric
 * / byte), the version-banded character-count indicators, and the per-version
 * data capacity — so the size returned here matches what the component renders,
 * without encoding the full matrix or reading the DOM.
 *
 * The two ECC constant tables are spec data (ISO/IEC 18004), copied verbatim
 * from the library bundle; they are frozen by the QR standard.
 */

const EC_ORDINAL: Record<ErrorCorrectionLevel, number> = { L: 0, M: 1, Q: 2, H: 3 };

// [ecOrdinal][version] — index 0 of each row is padding so a version (1–40)
// indexes directly.
const ECC_CODEWORDS_PER_BLOCK: readonly (readonly number[])[] = [
    [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
];

const NUM_ERROR_CORRECTION_BLOCKS: readonly (readonly number[])[] = [
    [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
    [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
    [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81],
];

const NUMERIC = /^[0-9]*$/;
const ALPHANUMERIC = /^[0-9A-Z $%*+./:-]*$/; // qrcodegen alphanumeric charset (uppercase only)

type Mode = "numeric" | "alphanumeric" | "byte";

const COUNT_INDICATOR_BITS: Record<Mode, [number, number, number]> = {
    numeric: [10, 12, 14],
    alphanumeric: [9, 11, 13],
    byte: [8, 16, 16],
};

// Width of the character-count indicator for a mode at a given version.
function countIndicatorBits(version: number, mode: Mode): number {
    const band = Math.floor((version + 7) / 17); // 0: v1–9, 1: v10–26, 2: v27–40
    return COUNT_INDICATOR_BITS[mode][band];
}

// Total data+EC module bits for a version (qrcodegen getNumRawDataModules).
function rawDataModules(version: number): number {
    let n = (16 * version + 128) * version + 64;
    if (version >= 2) {
        const align = Math.floor(version / 7) + 2;
        n -= (25 * align - 10) * align - 55;
        if (version >= 7) n -= 36;
    }
    return n;
}

// Usable data-payload capacity, in bits, for a version + EC level.
function capacityBits(version: number, ec: ErrorCorrectionLevel): number {
    const o = EC_ORDINAL[ec];
    const dataCodewords =
        Math.floor(rawDataModules(version) / 8) -
        ECC_CODEWORDS_PER_BLOCK[o][version] * NUM_ERROR_CORRECTION_BLOCKS[o][version];
    return dataCodewords * 8;
}

// Bits required to encode `value` at a given version, choosing the mode exactly
// as the library does (whole-string classification, no optimal segmentation).
function requiredBits(value: string, version: number): number {
    let mode: Mode;
    let numChars: number;
    let dataBits: number;

    if (NUMERIC.test(value)) {
        mode = "numeric";
        numChars = value.length;
        const rem = numChars % 3;
        dataBits = Math.floor(numChars / 3) * 10 + (rem === 0 ? 0 : rem === 1 ? 4 : 7);
    } else if (ALPHANUMERIC.test(value)) {
        mode = "alphanumeric";
        numChars = value.length;
        dataBits = Math.floor(numChars / 2) * 11 + (numChars % 2) * 6;
    } else {
        mode = "byte";
        numChars = new TextEncoder().encode(value).length; // UTF-8 byte count, not .length
        dataBits = numChars * 8;
    }

    const ccbits = countIndicatorBits(version, mode);
    if (numChars >= 1 << ccbits) return Number.POSITIVE_INFINITY; // count indicator overflows here
    return 4 + ccbits + dataBits;
}

/**
 * Modules-per-side of the QR the library would render for this payload, or
 * `null` when the value is empty or too large to fit in any version (1–40).
 * Note: size depends on `ec` and `minVersion`, not the value alone.
 */
export function getQrSize(value: string, ec: ErrorCorrectionLevel, minVersion: number): number | null {
    if (value.length === 0) return null;

    const from = Math.min(Math.max(Math.floor(minVersion), 1), 40);
    for (let version = from; version <= 40; version++) {
        if (requiredBits(value, version) <= capacityBits(version, ec)) {
            return 4 * version + 17;
        }
    }
    return null; // does not fit even at version 40
}
