import React from "react";
import { useStore } from "../hooks/useStore";

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const theme = useStore(s => s.theme);
  const setTheme = useStore(s => s.setTheme);
  const dark = theme.name === "Aurora Dark";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.35)",
        zIndex: 1000
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "absolute",
          top: 32,
          right: 32,
          width: 360,
          maxWidth: "calc(100vw - 40px)",
          padding: 24,
          borderRadius: 20,
          background: theme.colors.widgetBackground,
          color: theme.colors.widgetForeground,
          backdropFilter: "blur(35px)",
          WebkitBackdropFilter: "blur(35px)",
          border: "1px solid rgba(128,128,128,.25)",
          boxShadow: "0 16px 50px rgba(0,0,0,.25)"
        }}
      >
        <h2 style={{ marginTop: 0 }}>Settings</h2>
        <label htmlFor="aurora-theme">
          Appearance
        </label>
        <select
          id="aurora-theme"
          value={theme.name}
          onChange={e => setTheme(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            marginTop: 12,
            padding: 12,
            borderRadius: 10,
            border: "1px solid rgba(128,128,128,.3)",
            background: dark ? "#29292e" : "#ffffff",
            color: dark ? "#ffffff" : "#172033"
          }}
        >
          <option value="Aurora Light">Light</option>
          <option value="Aurora Dark">Dark</option>
          <option value="Frosted Glass">Frosted Glass</option>
        </select>

        <button
          onClick={onClose}
          style={{
            marginTop: 24,
            padding: "10px 24px",
            borderRadius: 10,
            border: "none",
            background: theme.colors.accent,
            color: "#ffffff",
            cursor: "pointer"
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;
