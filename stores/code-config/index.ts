import { createStore } from "zustand";

export const defaultCodeContent: CodeContent = {
    text: { text: "" },
    url: { url: "" },
    email: { to: "", subject: "", body: "" },
    phone: { phone: "" },
    sms: { phone: "", message: "" },
    wifi: { ssid: "", password: "", encryption: "WPA", hidden: false },
    contact: { firstName: "", lastName: "", organization: "", title: "", phone: "", email: "", url: "" },
    calendar: { title: "", location: "", start: "", end: "", description: "" },
    geolocation: { latitude: "", longitude: "" },
    crypto: { coin: "bitcoin", address: "", amount: "" },
    data: { data: "" },
};

export const defaultInitState: CodeConfigStore = {
    data: {
        ec: "M",
        min: 1,
        type: "url",
        content: defaultCodeContent,
    },
    style: {
        margin: 1,
        modules: { style: "square", size: 1, lineWidth: 0.5 },
        finder: { inner: { style: "square" }, outer: { style: "square" } },
        background: { type: "filled", color: "#ffffff" },
    },
};

export function createCodeConfigStore(initState: CodeConfigStore = defaultInitState) {
    return createStore<StoreWithActions<CodeConfigStore>>()((set) => ({
        ...initState,
        initial: initState,
        set,
        // `set` merges at the top level, so `image` must be cleared explicitly —
        // otherwise an uploaded image survives a reset. Its object URL is
        // revoked here so no reset path can leak the blob.
        reset: () =>
            set((s) => {
                if (s.image) URL.revokeObjectURL(s.image.src);
                return { ...initState, image: undefined };
            }),
    }));
}
