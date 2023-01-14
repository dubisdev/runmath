import { settings } from "./configureSettingsStorage";

// get the color on startup
const newColor = await settings.get("background");
document.body.style.setProperty("--bg-color", newColor);

window.addEventListener("settings-changed", async () => {
  const newColor = await settings.get("background");
  document.body.style.setProperty("--bg-color", newColor);
});
