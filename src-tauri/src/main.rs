#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::string::String;

use tauri::{AppHandle, Manager};

use tauri::menu::{MenuBuilder, MenuId, MenuItemBuilder};

use tauri_plugin_autostart::MacosLauncher;

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

fn main() {
    // let tray = create_tray_menu();
    let context = tauri::generate_context!();

    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_cli::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec!["--start-hidden"]),
        ))
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            app.emit("single-instance", Payload { args: argv, cwd })
                .unwrap();
        }))
        // .on_system_tray_event(|app, event| match event {
        //     SystemTrayEvent::LeftClick { .. } => toggle_window(app),
        //     SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
        //         "quit" => std::process::exit(0),
        //         "toggle" => toggle_window(app),
        //         "settings" => open_settings_window(app),
        //         _ => {}
        //     },
        //     _ => {}
        // })
        .run(context)
        .expect("error while running tauri application");
}

fn configure_tray_menu(app: &AppHandle) {
    let quit_id = MenuId::new("quit");
    let toggle_id = MenuId::new("toggle");
    let settings_id = MenuId::new("settings");

    let quit = MenuItemBuilder::new("Quit".to_string())
        .id(quit_id)
        .build(app)
        .unwrap();
    let toggle = MenuItemBuilder::new("Toggle".to_string())
        .id(toggle_id)
        .build(app)
        .unwrap();
    let settings = MenuItemBuilder::new("Settings".to_string())
        .id(settings_id)
        .build(app)
        .unwrap();

    let tray_menu = MenuBuilder::new(app)
        .items(&[&settings, &toggle, &quit])
        .build()
        .unwrap();

    let tray_icon = app.tray_by_id("main").unwrap();

    tray_icon.set_menu(Some(tray_menu)).unwrap();

    tray_icon.on_menu_event(|app, event| match event.id {
        quit_id => std::process::exit(0),
        toggle_id => toggle_window(app),
        settings_id => open_settings_window(app),
        _ => {}
    });
}

fn toggle_window(app: &AppHandle) {
    let window = app.get_webview_window("main").unwrap();
    if window.is_visible().unwrap() {
        window.hide().unwrap();
        return;
    } else {
        window.show().unwrap();
        return;
    }
}

fn open_settings_window(app: &AppHandle) {
    app.emit_to("main", "open-settings", ()).unwrap();
}
