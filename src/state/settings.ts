import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { share } from "shared-zustand";
import { configureRunOnStart } from "@utils/configureRunOnStart";
import { useCalculatorStore } from "./calculator";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { CalculatorSettings } from "../app/calculator/domain/CalculatorSettings";

type RunmathSettings = CalculatorSettings & {
    backgroundColor: string;
    runOnWindowsStart: boolean;
    hideOnEnter: boolean;
}

const defaultSettings: Readonly<RunmathSettings> = Object.freeze({
    backgroundColor: "#a3c8ff",
    runOnWindowsStart: false,
    useBigNumbers: false,
    notation: "auto",
    hideOnEnter: false
})

type SettingsState = RunmathSettings & {
    setBackgrounColor: (color: RunmathSettings["backgroundColor"]) => void;
    setRunOnWindowsStart: (runOnWindowsStart: RunmathSettings["runOnWindowsStart"]) => void;
    setUseBigNumbers: (useBigNumbers: RunmathSettings["useBigNumbers"]) => void;
    setNotation: (notation: RunmathSettings["notation"]) => void;
    setHideOnEnter: (hideOnEnter: RunmathSettings["hideOnEnter"]) => void;
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

                setHideOnEnter: (hideOnEnter) => set({ hideOnEnter }),

                reset: () => {
                    configureRunOnStart(defaultSettings.runOnWindowsStart);
                    set(defaultSettings)
                }
            }),

            {
                name: "runmath-settings",
                version: 1,
                migrate(persistedState, version) {
                    if (version === 1) {
                        (persistedState as RunmathSettings).hideOnEnter = false;

                        return persistedState;
                    }
                },
            }
        )
    )
);

if ("BroadcastChannel" in globalThis) {
    for (const key in defaultSettings) {
        share(key as keyof RunmathSettings, useSettingsStore);
    }
}

// Force re-render to calculate when notation or useBigNumbers changes
if (getCurrentWindow().label === "main") {
    useSettingsStore.subscribe(
        async (newState, prevState) => {
            const isNewNotation = newState.notation !== prevState.notation;
            const iseDifferentBigNumbers = newState.useBigNumbers !== prevState.useBigNumbers;

            if (isNewNotation || iseDifferentBigNumbers) {
                const currentInput = useCalculatorStore.getState().input;

                useCalculatorStore.setState({ input: "" })
                await new Promise((resolve) => setTimeout(resolve, 10));
                useCalculatorStore.setState({ input: currentInput + "" });
            }
        }
    )
}


export { useSettingsStore }
