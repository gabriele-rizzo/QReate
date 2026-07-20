"use client";

import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { readConfigFromUrl, writeConfigToUrl } from "@/lib/share-state";
import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createCodeConfigStore } from "./index";

export type CodeConfigStoreApi = ReturnType<typeof createCodeConfigStore>;

const CodeConfigStoreContext = createContext<CodeConfigStoreApi | undefined>(undefined);

export function useCodeConfigStore<T>(selector: (store: StoreWithActions<CodeConfigStore>) => T): T {
    const codeConfigStoreContext = useContext(CodeConfigStoreContext);

    if (!codeConfigStoreContext) throw new Error(`useCounterStore must be used within CounterStoreProvider`);
    return useStore(codeConfigStoreContext, selector);
}

export function CodeConfigStoreProvider({ children }: React.PropsWithChildren) {
    const [store] = useState(() => createCodeConfigStore());

    // Hydrate from the URL, then keep the URL in sync with every change (so a
    // refresh restores the state and the share button only has to copy the URL).
    //
    // The raw path applies before paint (no flash); a compressed link inflates
    // asynchronously with a brief flash of defaults, which is why the URL sync
    // only starts *after* hydration — otherwise the first write would clobber
    // the encoded param with the still-default state.
    useIsomorphicLayoutEffect(() => {
        let cancelled = false;
        let unsubscribe = () => {};

        const startSyncing = () => {
            if (cancelled) return;
            writeConfigToUrl(store.getState());
            unsubscribe = store.subscribe(writeConfigToUrl);
        };

        const result = readConfigFromUrl();

        if (!result) {
            startSyncing();
        } else if (result.kind === "sync") {
            store.getState().set(result.config);
            startSyncing();
        } else {
            result.config.then((config) => {
                if (cancelled) return;
                if (config) store.getState().set(config);
                startSyncing();
            });
        }

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, [store]);

    return <CodeConfigStoreContext.Provider value={store}>{children}</CodeConfigStoreContext.Provider>;
}
