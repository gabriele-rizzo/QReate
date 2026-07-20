"use client";

import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { readConfigFromUrl, writeConfigToUrl } from "@/lib/share-state";
import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createCodeConfigStore, defaultInitState } from "./index";

export type CodeConfigStoreApi = ReturnType<typeof createCodeConfigStore>;

const CodeConfigStoreContext = createContext<CodeConfigStoreApi | undefined>(undefined);

export function useCodeConfigStore<T>(selector: (store: StoreWithActions<CodeConfigStore>) => T): T {
    return useStore(useCodeConfigStoreApi(), selector);
}

/** The raw store API — for imperative reads that shouldn't subscribe to updates. */
export function useCodeConfigStoreApi(): CodeConfigStoreApi {
    const codeConfigStoreContext = useContext(CodeConfigStoreContext);

    if (!codeConfigStoreContext) throw new Error(`useCodeConfigStore must be used within CodeConfigStoreProvider`);
    return codeConfigStoreContext;
}

interface CodeConfigStoreProviderProps extends React.PropsWithChildren {
    /**
     * Preselected code type for this page (used by the per-type landing pages,
     * e.g. /wifi-qr-code). It becomes part of the store's baseline, so the URL
     * stays clean until the user changes something.
     */
    initialType?: CodeType;
}

export function CodeConfigStoreProvider({ initialType, children }: CodeConfigStoreProviderProps) {
    const [store] = useState(() =>
        createCodeConfigStore(
            initialType ? { ...defaultInitState, data: { ...defaultInitState.data, type: initialType } } : undefined,
        ),
    );

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
        let timeout: ReturnType<typeof setTimeout> | undefined;

        const startSyncing = () => {
            if (cancelled) return;
            writeConfigToUrl(store.getState());

            // Debounced: typing and slider drags fire per event, and browsers
            // (Safari especially) rate-limit history.replaceState.
            unsubscribe = store.subscribe((state) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => writeConfigToUrl(state), 200);
            });
        };

        const result = readConfigFromUrl(store.getState());

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
            clearTimeout(timeout);
            unsubscribe();
        };
    }, [store]);

    return <CodeConfigStoreContext.Provider value={store}>{children}</CodeConfigStoreContext.Provider>;
}
