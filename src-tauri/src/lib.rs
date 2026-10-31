// Tauri v2 API commands
use tauri::State;
use serde::Serialize;

#[derive(Serialize)]
struct AppState {
    version: String,
}

#[tauri::command]
fn get_app_state(_app: tauri::AppHandle) -> AppState {
    AppState {
        version: env!("CARGO_PKG_VERSION").to_string(),
    }
}
