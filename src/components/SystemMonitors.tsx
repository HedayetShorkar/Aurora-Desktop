import React from "react";
import { invoke } from "@tauri-apps/api/core";

interface DiskInfo {
  name: string;
  total_bytes: number;
  available_bytes: number;
}

interface Metrics {
  cpu_percent: number;
  memory_used_bytes: number;
  memory_total_bytes: number;
  disks: DiskInfo[];
  download_bytes_per_sec: number;
  upload_bytes_per_sec: number;
  uptime_seconds: number;
}

type MonitorState = {
  data: Metrics | null;
  error: boolean;
};

let current: MonitorState = {
  data: null,
  error: false
};

const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;
let fetching = false;

const getSnapshot = () => current;

async function refresh() {
  if (fetching) return;
  fetching = true;

  try {
    const data = await invoke<Metrics>(
      "get_system_metrics"
    );
    current = { data, error: false };
  } catch {
    current = { data: null, error: true };
  } finally {
    fetching = false;
    listeners.forEach(fn => fn());
  }
}

function subscribe(fn: () => void) {
  listeners.add(fn);

  if (!timer) {
    void refresh();
    timer = setInterval(() => {
      void refresh();
    }, 2000);
  }

  return () => {
    listeners.delete(fn);

    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

function useMetrics() {
  return React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot
  );
}

function formatBytes(value: number) {
  if (!Number.isFinite(value)) return "N/A";

  const units = ["B", "KB", "MB", "GB", "TB"];
  let number = Math.max(0, value);
  let index = 0;

  while (number >= 1024 && index < units.length - 1) {
    number /= 1024;
    index++;
  }

  return `${number.toFixed(index ? 1 : 0)} ${units[index]}`;
}

function formatPercent(value: number) {
  return `${Math.min(100, Math.max(0, value)).toFixed(1)}%`;
}

function Meter({ value }: { value: number }) {
  return (
    <div style={{
      height: 8,
      marginTop: 10,
      borderRadius: 8,
      background: "rgba(128,128,128,.25)",
      overflow: "hidden"
    }}>
      <div style={{
        width: formatPercent(value),
        height: "100%",
        borderRadius: 8,
        background: "#6366f1"
      }} />
    </div>
  );
}

function Loading({ error }: { error: boolean }) {
  return (
    <p style={{ opacity: .7 }}>
      {error
        ? "Live monitoring unavailable"
        : "Loading live data..."}
    </p>
  );
}

export const SystemMonitor: React.FC<{
  type: string;
  theme?: any;
}> = ({ type }) => {
  const { data, error } = useMetrics();
  const kind = type.toUpperCase();

  if (kind === "GPU") {
    return (
      <div className="system-monitor">
        <strong>GPU</strong>
        <Loading error={true} />
        <small>GPU backend not connected yet</small>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="system-monitor">
        <strong>{kind}</strong>
        <Loading error={error} />
      </div>
    );
  }

  if (kind === "CPU") {
    return (
      <div className="system-monitor">
        <strong>CPU Usage</strong>
        <div style={{ fontSize: 28, marginTop: 10 }}>
          {formatPercent(data.cpu_percent)}
        </div>
        <Meter value={data.cpu_percent} />
      </div>
    );
  }

  if (kind === "RAM") {
    const usage = data.memory_total_bytes
      ? data.memory_used_bytes /
        data.memory_total_bytes * 100
      : 0;

    return (
      <div className="system-monitor">
        <strong>RAM Usage</strong>
        <div style={{ fontSize: 28, marginTop: 10 }}>
          {formatPercent(usage)}
        </div>
        <small>
          {formatBytes(data.memory_used_bytes)}
          {" / "}
          {formatBytes(data.memory_total_bytes)}
        </small>
        <Meter value={usage} />
      </div>
    );
  }

  return <div>Unknown monitor: {type}</div>;
};

export const StorageWidget: React.FC = () => {
  const { data, error } = useMetrics();

  return (
    <div className="storage-widget">
      <strong>Storage</strong>
      {!data ? <Loading error={error} /> :
        data.disks.length === 0
          ? <p>No disks detected</p>
          : data.disks.map((disk, index) => {
              const used = disk.total_bytes -
                disk.available_bytes;

              const usage = disk.total_bytes
                ? used / disk.total_bytes * 100
                : 0;

              return (
                <div key={`${disk.name}-${index}`}
                  style={{ marginTop: 12 }}>
                  <div>{disk.name}</div>
                  <small>
                    {formatBytes(used)} used /{" "}
                    {formatBytes(disk.total_bytes)}
                  </small>
                  <Meter value={usage} />
                </div>
              );
            })
      }
    </div>
  );
};

export const NetworkWidget: React.FC = () => {
  const { data, error } = useMetrics();

  return (
    <div className="network-widget">
      <strong>Network Activity</strong>
      {!data ? <Loading error={error} /> : (
        <div style={{ marginTop: 12, lineHeight: 2 }}>
          <div>
            Download:{" "}
            {formatBytes(data.download_bytes_per_sec)}/s
          </div>
          <div>
            Upload:{" "}
            {formatBytes(data.upload_bytes_per_sec)}/s
          </div>
          <small style={{ opacity: .7 }}>
            Combined network interfaces
          </small>
        </div>
      )}
    </div>
  );
};

export const UptimeWidget: React.FC = () => {
  const { data, error } = useMetrics();

  if (!data) {
    return (
      <div className="uptime-widget">
        <strong>Windows Uptime</strong>
        <Loading error={error} />
      </div>
    );
  }

  const seconds = data.uptime_seconds;
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return (
    <div className="uptime-widget">
      <strong>Windows Uptime</strong>
      <div style={{ fontSize: 24, marginTop: 12 }}>
        {days}d {hours}h {minutes}m
      </div>
    </div>
  );
};

export default SystemMonitor;
