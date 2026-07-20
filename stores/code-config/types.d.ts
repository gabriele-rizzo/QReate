import type {
    DataModulesStyle,
    ErrorCorrectionLevel,
    FinderPatternInnerStyle,
    FinderPatternOuterStyle,
} from "@lglab/react-qr-code";

declare global {
    type BackgroundType = "filled" | "transparent";

    type CodeType =
        | "text"
        | "url"
        | "email"
        | "phone"
        | "sms"
        | "wifi"
        | "contact"
        | "calendar"
        | "geolocation"
        | "crypto"
        | "data";

    type CodeDataModulesStyle = Exclude<DataModulesStyle, "square-sm">;

    type WifiEncryption = "WPA" | "WEP" | "nopass";
    type CryptoCoin = "bitcoin" | "ethereum" | "litecoin";

    type CodeContentMap = {
        text: { text: string };
        url: { url: string };
        email: { to: string; subject: string; body: string };
        phone: { phone: string };
        sms: { phone: string; message: string };
        wifi: { ssid: string; password: string; encryption: WifiEncryption; hidden: boolean };
        contact: {
            firstName: string;
            lastName: string;
            organization: string;
            title: string;
            phone: string;
            email: string;
            url: string;
        };
        calendar: { title: string; location: string; start: string; end: string; description: string };
        geolocation: { latitude: string; longitude: string };
        crypto: { coin: CryptoCoin; address: string; amount: string };
        data: { data: string };
    };

    type CodeContent = { [K in CodeType]: CodeContentMap[K] };

    type CodeConfigStore = {
        data: {
            type: CodeType;
            ec: ErrorCorrectionLevel;
            min: number;
            content: CodeContent;
        };
        style: {
            margin: number;
            background: { type: BackgroundType; color?: string };
            modules: {
                style: CodeDataModulesStyle;
                color?: string;
                size: number;
                lineWidth: number;
            };
            finder: {
                outer: {
                    style: FinderPatternOuterStyle;
                    color?: string;
                };
                inner: {
                    style: FinderPatternInnerStyle;
                    color?: string;
                };
            };
        };
        image?: {
            file: File;
            /** Object URL for `file` — created on upload, revoked on replace/remove/reset. */
            src: string;
            width: number;
            height: number;
            excavate: boolean;
            opacity: number;
        };
    };
}
