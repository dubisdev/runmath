import { settings } from "./settingsStorage";

// get the color on startup
document.body.style.setProperty("--bg-color", settings.get("background"));
