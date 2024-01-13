import type { FormatOptions } from "mathjs"
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { share } from "shared-zustand";
import { configureRunOnStart } from "@utils/configureRunOnStart";

export type CalculationOptions = {
    useBigNumbers: boolean;
    notation: FormatOptions["notation"];
}

type RunmathSettings = CalculationOptions & {
    backgroundColor: string;
    runOnWindowsStart: boolean;

}

const defaultSettings: Readonly<RunmathSettings> = Object.freeze({
    backgroundColor: "#a3c8ff",
    runOnWindowsStart: false,
    useBigNumbers: false,
    notation: undefined
})

type SettingsState = RunmathSettings & {
    setBackgrounColor: (color: RunmathSettings["backgroundColor"]) => void;
    setRunOnWindowsStart: (runOnWindowsStart: RunmathSettings["runOnWindowsStart"]) => void;
    setUseBigNumbers: (useBigNumbers: RunmathSettings["useBigNumbers"]) => void;
    setNotation: (notation: RunmathSettings["notation"]) => void;
    reset: () => void;
}

const useSettingsStore = create<SettingsState>()(
    // use suscription to sync tabs (calculator & settings)
    subscribeWithSelector(
        // use persist to save settings in localStorage
        persist(
            (set) => ({
                ...defaultSettings,
                setBackgrounColor: (backgroundColor) => set({ backgroundColor }),

                setRunOnWindowsStart: (runOnWindowsStart) => {
                    configureRunOnStart(runOnWindowsStart);
                    set({ runOnWindowsStart })
                },

                setUseBigNumbers: (useBigNumbers) => set({ useBigNumbers }),

                setNotation: (notation) => set({ notation }),

                reset: () => {
                    configureRunOnStart(defaultSettings.runOnWindowsStart);
                    set(defaultSettings)
                }
            }),

            { name: "runmath-settings" }
        )
    )
);

if ("BroadcastChannel" in globalThis) {
    for (const key in defaultSettings) {
        share(key, useSettingsStore);
    }
}

export { useSettingsStore }
