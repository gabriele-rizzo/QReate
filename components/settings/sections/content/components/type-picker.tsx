"use client";

import { OptionsPicker } from "@/components/pickers/options-picker";
import { useCodeConfigStore } from "@/stores/code-config/provider";

const CODE_TYPES: Record<CodeType, string> = {
    text: "Plain Text",
    url: "URL",
    wifi: "Wi-Fi",
    phone: "Phone",
    email: "Email",
    calendar: "Calendar Event",
    geolocation: "Geolocation",
    contact: "Contact (vCard)",
    sms: "SMS",
    crypto: "Cryptocurrency",
    data: "Raw Bytes",
};

export default function TypePicker() {
    const type = useCodeConfigStore((s) => s.data.type);
    const set = useCodeConfigStore((s) => s.set);

    return (
        <OptionsPicker
            value={type}
            onChange={(type) => set((s) => ({ data: { ...s.data, type } }))}
            data={Object.keys(CODE_TYPES) as CodeType[]}
            label={(type) => CODE_TYPES[type]}
        />
    );
}
