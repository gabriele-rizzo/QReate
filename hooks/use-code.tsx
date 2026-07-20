"use client";

import type { ReactQRCodeRef } from "@lglab/react-qr-code";
import { createContext, useContext, useRef } from "react";

const CodeContext = createContext<React.RefObject<ReactQRCodeRef | null>>({ current: null });

export function useCode() {
    const value = useContext(CodeContext);

    if (!value) throw new Error("useCode must be used within CodeProvider");
    return value;
}

export function CodeProvider({ children }: React.PropsWithChildren) {
    const ref = useRef<ReactQRCodeRef>(null);

    return <CodeContext.Provider value={ref}>{children}</CodeContext.Provider>;
}
