"use client";

import { Labeled } from "@/components/labeled";
import { SegmentedPicker } from "@/components/pickers/segmented-picker";
import { useCodeConfigStore } from "@/stores/code-config/provider";
import type { ErrorCorrectionLevel } from "@lglab/react-qr-code";

const EC_LEVELS: Record<ErrorCorrectionLevel, string> = {
    L: "Low",
    M: "Medium",
    Q: "Quartile",
    H: "High",
};

const EC_RECOVERY_CAPACITY: Record<ErrorCorrectionLevel, number> = {
    L: 7,
    M: 15,
    Q: 25,
    H: 30,
};

export function ErrorCorrectionPicker() {
    const { set, ...store } = useCodeConfigStore((s) => s);

    return (
        <Labeled label="Error Correction" description={`Recovery capacity: ~${EC_RECOVERY_CAPACITY[store.data.ec]}%`}>
            <SegmentedPicker
                value={store.data.ec}
                data={Object.keys(EC_LEVELS) as ErrorCorrectionLevel[]}
                label={(ec) => EC_LEVELS[ec]}
                onChange={(ec) => set({ ...store, data: { ...store.data, ec } })}
            />
        </Labeled>
    );
}
