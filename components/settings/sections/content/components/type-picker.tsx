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
    const { set, ...store } = useCodeConfigStore((s) => s);

    return (
        <OptionsPicker
            value={store.data.type}
            onChange={(type) => set({ ...store, data: { ...store.data, type } })}
            data={Object.keys(CODE_TYPES) as CodeType[]}
            label={(type) => CODE_TYPES[type]}
        />
    );
}
