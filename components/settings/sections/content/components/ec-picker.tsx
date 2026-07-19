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
    const ec = useCodeConfigStore((s) => s.data.ec);
    const set = useCodeConfigStore((s) => s.set);

    return (
        <Labeled label="Error Correction" description={`Recovery capacity: ~${EC_RECOVERY_CAPACITY[ec]}%`}>
            <SegmentedPicker
                value={ec}
                data={Object.keys(EC_LEVELS) as ErrorCorrectionLevel[]}
                label={(ec) => EC_LEVELS[ec]}
                onChange={(ec) => set((s) => ({ data: { ...s.data, ec } }))}
            />
        </Labeled>
    );
}
