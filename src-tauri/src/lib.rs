use serde::Serialize;
use std::sync::Mutex;
use std::time::Instant;
use sysinfo::{Disks, Networks, System};

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

struct MonitorState {
    system: System,
    disks: Disks,
    networks: Networks,
    last_sample: Instant,
}

impl MonitorState {
    fn new() -> Self {
        Self {
            system: System::new_all(),
            disks: Disks::new_with_refreshed_list(),
            networks: Networks::new_with_refreshed_list(),
            last_sample: Instant::now(),
        }
    }
}

#[derive(Serialize)]
struct DiskInfo {
    name: String,
    total_bytes: u64,
    available_bytes: u64,
}

#[derive(Serialize)]
struct MonitorSnapshot {
    cpu_percent: f32,
    memory_used_bytes: u64,
    memory_total_bytes: u64,
    disks: Vec<DiskInfo>,
    download_bytes_per_sec: f64,
    upload_bytes_per_sec: f64,
    uptime_seconds: u64,
}

#[tauri::command]
fn get_system_metrics(
    state: tauri::State<'_, Mutex<MonitorState>>,
) -> Result<MonitorSnapshot, String> {
    let mut monitor = state.lock()
        .map_err(|_| "Monitor lock failed".to_string())?;

    let elapsed = monitor.last_sample.elapsed()
        .as_secs_f64()
        .max(0.001);

    monitor.system.refresh_cpu_usage();
    monitor.system.refresh_memory();
    monitor.disks.refresh();
    monitor.networks.refresh();

    let cpu_percent =
        monitor.system.global_cpu_info().cpu_usage();

    let memory_used_bytes =
        monitor.system.used_memory();

    let memory_total_bytes =
        monitor.system.total_memory();

    let disks = monitor.disks.iter().map(|disk| {
        DiskInfo {
            name: disk.mount_point()
                .to_string_lossy()
                .to_string(),
            total_bytes: disk.total_space(),
            available_bytes: disk.available_space(),
        }
    }).collect();

    let download_bytes: u64 = monitor.networks.iter()
        .map(|(_, net)| net.received())
        .sum();

    let upload_bytes: u64 = monitor.networks.iter()
        .map(|(_, net)| net.transmitted())
        .sum();

    monitor.last_sample = Instant::now();

    Ok(MonitorSnapshot {
        cpu_percent,
        memory_used_bytes,
        memory_total_bytes,
        disks,
        download_bytes_per_sec:
            download_bytes as f64 / elapsed,
        upload_bytes_per_sec:
            upload_bytes as f64 / elapsed,
        uptime_seconds: System::uptime(),
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(Mutex::new(MonitorState::new()))
        .invoke_handler(tauri::generate_handler![
            get_app_state,
            get_system_metrics
        ])
        .run(tauri::generate_context!())
        .expect("error while running Aurora Desktop");
}
