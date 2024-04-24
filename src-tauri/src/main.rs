#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::tray::ClickType;
use tauri::{App, AppHandle, Manager};

use tauri::menu::{MenuBuilder, MenuItemBuilder};

use tauri_plugin_autostart::MacosLauncher;

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
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
        .setup(|app| {
            configure_tray_menu(&app)?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn configure_tray_menu(app: &App) -> Result<(), tauri::Error> {
    let quit = MenuItemBuilder::new("Quit".to_string())
        .id("quit")
        .build(app)?;
    let toggle = MenuItemBuilder::new("Toggle".to_string())
        .id("toggle")
        .build(app)?;
    let settings = MenuItemBuilder::new("Settings".to_string())
        .id("settings")
        .build(app)?;

    let tray_menu = MenuBuilder::new(app)
        .items(&[&settings, &toggle, &quit])
        .build()?;

    let tray_icon = app.tray_by_id("main").unwrap();

    tray_icon.set_menu(Some(tray_menu))?;

    tray_icon.on_menu_event(|app, event| match event.id.as_ref() {
        "quit" => std::process::exit(0),
        "toggle" => toggle_window(app),
        "settings" => open_settings_window(app),
        _ => {}
    });

    tray_icon.on_tray_icon_event(|tray, event| {
        if event.click_type == ClickType::Left {
            let app = tray.app_handle();
            toggle_window(app);
        }
    });

    Ok(())
}

fn toggle_window(app: &AppHandle) {
    let window = app.get_webview_window("main").unwrap();
    if window.is_visible().unwrap() {
        window.hide().unwrap();
        return;
    } else {
        window.show().unwrap();
        window.set_focus().unwrap();
        return;
    }
}

fn open_settings_window(app: &AppHandle) {
    app.emit_to("main", "open-settings", ()).unwrap();
}
