/**
 * Turns the structured, per-type content from the store into the raw string
 * that gets encoded into the QR code (mailto:, WIFI:, vCard, VEVENT, ...).
 *
 * Every encoder is tolerant of empty fields so the preview stays valid while
 * the user is still typing.
 */

function withProtocol(url: string) {
    const trimmed = url.trim();
    if (!trimmed) return "";
    return /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

// Escapes the characters that are special inside WIFI: / MECARD-style payloads.
function escapeWifi(value: string) {
    return value.replace(/([\\;,:"])/g, "\\$1");
}

// datetime-local gives "2026-07-19T14:30" — iCalendar wants "20260719T143000".
function toICalDate(value: string) {
    if (!value) return "";
    return `${value.replace(/[-:]/g, "")}00`;
}

function query(params: Record<string, string>) {
    const entries = Object.entries(params).filter(([, v]) => v.trim() !== "");
    if (entries.length === 0) return "";
    const search = new URLSearchParams(entries).toString();
    return `?${search}`;
}

const encoders: { [K in CodeType]: (content: CodeContentMap[K]) => string } = {
    text: ({ text }) => text,
    data: ({ data }) => data,

    url: ({ url }) => withProtocol(url),

    phone: ({ phone }) => (phone.trim() ? `tel:${phone.trim()}` : ""),

    sms: ({ phone, message }) => {
        if (!phone.trim()) return "";
        return message.trim() ? `SMSTO:${phone.trim()}:${message}` : `SMSTO:${phone.trim()}`;
    },

    email: ({ to, subject, body }) => {
        if (!to.trim()) return "";
        return `mailto:${to.trim()}${query({ subject, body })}`;
    },

    geolocation: ({ latitude, longitude }) => {
        if (!latitude.trim() || !longitude.trim()) return "";
        return `geo:${latitude.trim()},${longitude.trim()}`;
    },

    crypto: ({ coin, address, amount }) => {
        if (!address.trim()) return "";
        return `${coin}:${address.trim()}${query({ amount })}`;
    },

    wifi: ({ ssid, password, encryption, hidden }) => {
        if (!ssid.trim()) return "";
        const parts = [`T:${encryption}`, `S:${escapeWifi(ssid)}`];
        if (encryption !== "nopass") parts.push(`P:${escapeWifi(password)}`);
        if (hidden) parts.push("H:true");
        return `WIFI:${parts.join(";")};;`;
    },

    contact: ({ firstName, lastName, organization, title, phone, email, url }) => {
        const lines = ["BEGIN:VCARD", "VERSION:3.0"];
        lines.push(`N:${lastName};${firstName}`);
        lines.push(`FN:${`${firstName} ${lastName}`.trim()}`);
        if (organization.trim()) lines.push(`ORG:${organization}`);
        if (title.trim()) lines.push(`TITLE:${title}`);
        if (phone.trim()) lines.push(`TEL:${phone.trim()}`);
        if (email.trim()) lines.push(`EMAIL:${email.trim()}`);
        if (url.trim()) lines.push(`URL:${withProtocol(url)}`);
        lines.push("END:VCARD");
        return lines.join("\n");
    },

    calendar: ({ title, location, start, end, description }) => {
        const lines = ["BEGIN:VEVENT"];
        if (title.trim()) lines.push(`SUMMARY:${title}`);
        if (location.trim()) lines.push(`LOCATION:${location}`);
        if (start.trim()) lines.push(`DTSTART:${toICalDate(start)}`);
        if (end.trim()) lines.push(`DTEND:${toICalDate(end)}`);
        if (description.trim()) lines.push(`DESCRIPTION:${description}`);
        lines.push("END:VEVENT");
        return lines.join("\n");
    },
};

export function encodeCodeValue<K extends CodeType>(type: K, content: CodeContentMap[K]): string {
    return encoders[type](content);
}
