import React from "react";

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  return (
    <div className="settings-overlay" onClick={onClose} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", zIndex: 100 }}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()} style={{ position: "fixed", right: "2rem", top: "2rem", width: "360px", maxHeight: "80vh", overflowY: "auto", background: "#ffffff", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
        <div style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb" }}>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "600" }}>Settings</h2>
        </div>
        <div style={{ padding: "1rem" }}>
          <section style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#6b7280", marginBottom: "0.5rem" }}>Appearance</h3>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Theme Color</label>
              <select style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
                <option>Aurora Light</option>
                <option>Aurora Dark</option>
                <option>Frosted Glass</option>
              </select>
            </div>
          </section>
        </div>
        <div style={{ padding: "1rem", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "0.5rem 1.5rem", borderRadius: "8px", border: "none", background: "#007AFF", color: "#ffffff", fontWeight: "500", cursor: "pointer" }}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
