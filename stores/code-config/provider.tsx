"use client";

import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createCodeConfigStore } from "./index";

export type CodeConfigStoreApi = ReturnType<typeof createCodeConfigStore>;

const CodeConfigStoreContext = createContext<CodeConfigStoreApi | undefined>(undefined);

export function useCodeConfigStore<T>(selector: (store: StoreWithSetAction<CodeConfigStore>) => T): T {
    const codeConfigStoreContext = useContext(CodeConfigStoreContext);

    if (!codeConfigStoreContext) throw new Error(`useCounterStore must be used within CounterStoreProvider`);
    return useStore(codeConfigStoreContext, selector);
}

export function CodeConfigStoreProvider({ children }: React.PropsWithChildren) {
    const [store] = useState(() => createCodeConfigStore());

    return <CodeConfigStoreContext.Provider value={store}>{children}</CodeConfigStoreContext.Provider>;
}
