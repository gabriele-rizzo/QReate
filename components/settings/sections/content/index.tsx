import { Labeled } from "@/components/labeled";
import { ErrorCorrectionPicker } from "./components/ec-picker";
import { MinVersionSlider } from "./components/min-version-slider";
import TypePicker from "./components/type-picker";
import { ValueFields } from "./components/value-fields";

export default function ContentCodeSettingsSection() {
    return (
        <>
            <Labeled label="Type">
                <TypePicker />
            </Labeled>

            <ValueFields />

            <ErrorCorrectionPicker />
            <MinVersionSlider />
        </>
    );
}
