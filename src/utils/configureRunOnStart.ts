import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";

export const configureRunOnStart = async (runOnStart: boolean) => {
    if (runOnStart) {
        if (await isEnabled()) return;
        await enable();
    } else {
        if (!(await isEnabled())) return;
        await disable();
    }
}
