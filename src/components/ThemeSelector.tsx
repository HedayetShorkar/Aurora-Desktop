import React from "react";
import { useStore } from "../hooks/useStore";

interface ThemeSelectorProps {
  currentTheme: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme }) => {
  const themes = [
    { name: "Light", color: "#f5f5f7" },
    { name: "Dark", color: "#1c1c1e" },
    { name: "Glass", color: "rgba(255,255,255,0.8)" },
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="theme-selector">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "0.5rem",
          borderRadius: "8px",
          border: "none",
          background: "rgba(255,255,255,0.3)",
          cursor: "pointer",
        }}
      >
        🎨 {currentTheme}
      </button>
      
      {isOpen && (
        <div 
          className="theme-dropdown"
          style={{
            position: "absolute" as const,
            top: "100%",
            left: 0,
            marginTop: "8px",
            padding: "8px",
            borderRadius: "8px",
            background: "#ffffff",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            minWidth: "120px"
          }}
        >
          {themes.map((theme) => (
            <button 
              key={theme.name}
              onClick={() => console.log(`Switched to ${theme.name}`)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "none",
                background: theme.color,
                cursor: "pointer",
                textAlign: "left",
                color: theme.name === "Glass" ? "#1c1c1e" : "#ffffff",
              }}
            >
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
