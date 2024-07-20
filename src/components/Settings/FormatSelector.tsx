import { useSettingsStore } from "@state/settings";
import { FormatOptions } from "mathjs"
import { ChangeEventHandler } from "react";
import styles from "./index.module.css";

const AVAILABLE_NOTATIONS = ["fixed", "exponential", "engineering", undefined] satisfies FormatOptions["notation"][];

export const FormatSelector = () => {
    const notation = useSettingsStore(s => s.notation);
    const setNotation = useSettingsStore(s => s.setNotation);

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const newValue = e.target.value as typeof AVAILABLE_NOTATIONS[number];
        setNotation(newValue || "auto");
    }

    return (
        <div style={{ padding: "0.5rem" }}>
            <select
                name="notation"
                onChange={handleChange}
                className={styles.selectFormatOptions}
                value={notation || "auto"}
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
