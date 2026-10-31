import React from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useStore } from "./hooks/useStore";
import {
  SystemMonitor,
  NetworkWidget,
  UptimeWidget
} from "./components/SystemMonitors";

const Overlay: React.FC = () => {
  const theme = useStore(s => s.theme);
  const [editing, setEditing] = React.useState(false);

  const hide = async () => {
    await getCurrentWindow().hide();
  };

  return (
    <div
      className="aurora-overlay"
      data-theme={
        theme.name === "Aurora Dark" ? "dark" :
        theme.name === "Frosted Glass" ? "glass" : "light"
      }
      style={{
        color: theme.colors.widgetForeground,
        fontFamily: theme.typography.fontFamily,
        background: theme.colors.widgetBackground,
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(150,150,150,.3)",
        borderRadius: 20,
        padding: 16,
        boxSizing: "border-box",
        minHeight: "100%"
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }}>
        <strong>Aurora Widgets</strong>

        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => setEditing(!editing)}
            title="Toggle edit mode"
          >
            {editing ? "Lock" : "Edit"}
          </button>
          <button onClick={hide} title="Hide overlay">
            Hide
          </button>
        </div>
      </div>

      {editing && (
        <p style={{ fontSize: 12, opacity: .8 }}>
          Widget editing controls will be added in
          the next stage. Use the Control Center
          from the system tray.
        </p>
      )}

      <div className="aurora-overlay-grid">
        <section><SystemMonitor type="CPU" /></section>
        <section><SystemMonitor type="RAM" /></section>
        <section><NetworkWidget /></section>
        <section><UptimeWidget /></section>
      </div>
    </div>
  );
};

export default Overlay;
