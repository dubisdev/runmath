#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri_plugin_autostart::MacosLauncher;
use tauri::Manager;

#[derive(Clone, serde::Serialize)]
struct Payload {
  args: Vec<String>,
  cwd: String,
}

fn main() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec![""])))
    .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
      app.emit_all("single-instance", Payload { args: argv, cwd }).unwrap();
    }))
    .menu(if cfg!(target_os = "macos") {
      tauri::Menu::os_default(&context.package_info().name)
    } else {
      tauri::Menu::default()
    })
    .run(context)
    .expect("error while running tauri application");
}
