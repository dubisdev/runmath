import { disable, enable, isEnabled } from "tauri-plugin-autostart-api";

export const configureRunOnStart = async (runOnStart: boolean) => {
    if (runOnStart) {
        if (await isEnabled()) return;
        await enable();
    } else {
        if (!(await isEnabled())) return;
        await disable();
    }
}
