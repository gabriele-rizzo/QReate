import { BackgroundPicker } from "../style/components/background-picker";
import { FinderStyler } from "./components/finder-styler";
import { MarginSlider } from "./components/margin-slider";
import { ModulesStyler } from "./components/modules-styler";

export default function StyleCodeSettingsSection() {
    return (
        <>
            <MarginSlider />

            <div className="mt-2">
                <BackgroundPicker />
            </div>

            <ModulesStyler />

            <FinderStyler />
        </>
    );
}
