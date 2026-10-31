// Tauri v2 application entry point
use serde::Serialize;

#[derive(Serialize)]
struct AppState {
    version: String,
}

#[tauri::command]
fn get_app_state() -> AppState {
    AppState {
        version: env!("CARGO_PKG_VERSION").to_string(),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_app_state])
        .run(tauri::generate_context!())
        .expect("error while running Aurora Desktop");
}
