import { useSettingsStore } from "@state/settings";
import { FormatOptions } from "mathjs"
import { ChangeEventHandler } from "react";
import styles from "./index.module.css";

const AVAILABLE_NOTATIONS: FormatOptions["notation"][] = ["fixed", "exponential", "engineering", undefined];

export const FormatSelector = () => {
    const notation = useSettingsStore(s => s.notation);
    const setNotation = useSettingsStore(s => s.setNotation);

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const newValue = e.target.value as FormatOptions["notation"];
        setNotation(newValue);
    }

    return (
        <div style={{ padding: "0.5rem" }}>
            <select
                name="notation"
                onChange={handleChange}
                className={styles.selectFormatOptions}
                defaultValue={notation || "auto"}
            >
                {
                    AVAILABLE_NOTATIONS.map((notationOption) => {
                        let capitalized = "Auto"
                        if (notationOption) {
                            capitalized = notationOption.charAt(0).toUpperCase() + notationOption.slice(1);
                        }
                        return <option key={capitalized} value={notationOption || "auto"}>
                            {capitalized}
                        </option>
                    })

                }
            </select>
        </div>
    );
}
