import { getVersion } from "@tauri-apps/api/app";
import { requestPermission, isPermissionGranted, sendNotification } from "@tauri-apps/plugin-notification";

export const RELEASE_URL = "https://github.com/dubisdev/RunMath/releases/latest";
export const API_RELEASE_URL = "https://api.github.com/repos/dubisdev/RunMath/releases/latest";

export const checkForUpdates = async () => {
    if (navigator.onLine === false) return;

    const latestVersion = await getLatestVersion();
    const currerntVersion = await getVersion();

    const semverLatestVersion = latestVersion.replace("v", "");
    const semverCurrentVersion = currerntVersion.replace("v", "");

    if (semverLatestVersion === semverCurrentVersion) return;

    await notifyUpdateAvailable(latestVersion);
}

const getLatestVersion = async () => {
    const res = await fetch(API_RELEASE_URL).then((r) => r.json())
    return res.tag_name;
}

const notifyUpdateAvailable = async (newVersion: string) => {
    if (!await isPermissionGranted()) {
        const response = await requestPermission();
        if (response !== "granted") return;
    }

    sendNotification({
        title: `RunMath ${newVersion} is available!`,
        body: `Use Alt+U to open the download page.`
    })
}
