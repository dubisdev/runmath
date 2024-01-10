import { useEffect } from "react";
import { useSettingsStore } from "@state/settings";

export const useBakgroundColor = () => {
    const backgroundColor = useSettingsStore(s => s.backgroundColor);

    useEffect(() => {
        document.body.style.setProperty("--bg-color", backgroundColor);
    }, [backgroundColor])

}
