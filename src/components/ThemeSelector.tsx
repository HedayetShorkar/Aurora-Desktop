import React from "react";
import { useStore } from "../hooks/useStore";

interface ThemeSelectorProps {
  currentTheme: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = () => {
  const theme = useStore(s => s.theme);
  const setTheme = useStore(s => s.setTheme);
  const [open, setOpen] = React.useState(false);

  const choices = [
    { name: "Aurora Light", label: "Light", icon: "☀" },
    { name: "Aurora Dark", label: "Dark", icon: "☾" },
    { name: "Frosted Glass", label: "Glass", icon: "◇" },
  ];

  return (
    <div className="theme-selector" style={{
      position: "relative", zIndex: 200
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid rgba(128,128,128,.25)",
          background: theme.colors.widgetBackground,
          color: theme.colors.widgetForeground,
          cursor: "pointer"
        }}
      >
        ◈ {theme.name} ▾
      </button>

      {open && (
        <div style={{
          position: "absolute",
          right: 0,
          top: "calc(100% + 8px)",
          width: 170,
          padding: 8,
          borderRadius: 14,
          background: theme.colors.widgetBackground,
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(128,128,128,.3)",
          boxShadow: "0 12px 30px rgba(0,0,0,.2)"
        }}>
          {choices.map(item => (
            <button
              key={item.name}
              onClick={() => {
                setTheme(item.name);
                setOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                padding: 12,
                marginBottom: 4,
                textAlign: "left",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                background: theme.name === item.name
                  ? theme.colors.accent
                  : "transparent",
                color: theme.name === item.name
                  ? "#fff"
                  : theme.colors.widgetForeground
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
