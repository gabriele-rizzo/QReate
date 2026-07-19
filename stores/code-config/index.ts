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
    return createStore<StoreWithSetAction<CodeConfigStore>>()((set) => ({ ...initState, set }));
}
