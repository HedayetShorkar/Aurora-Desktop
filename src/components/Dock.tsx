import React from "react";
import { useStore } from "../hooks/useStore";

interface AppItem {
  icon: string;
  label: string;
}

const Dock: React.FC<{ position: "left" | "right" | "bottom" }> = ({ position }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  
  const apps: AppItem[] = [
    { icon: "📁", label: "Files" },
    { icon: "🌐", label: "Browser" },
    { icon: "📧", label: "Mail" },
    { icon: "💬", label: "Messages" },
    { icon: "⚙️", label: "Settings" },
    { icon: "📝", label: "Notes" },
  ];

  const getDockStyle = () => {
    switch(position) {
      case "left": return { left: 0, bottom: "2rem", top: "auto", right: "auto" };
      case "right": return { right: 0, bottom: "2rem", top: "auto", left: "auto" };
      case "bottom": return { bottom: "1rem", left: "50%", transform: "translateX(-50%)", top: "auto", right: "auto" };
    }
  };

  const getIconStyle = (index: number) => ({
    width: hoveredIndex !== null && hoveredIndex === index ? "64px" : "48px",
    height: hoveredIndex !== null && hoveredIndex === index ? "64px" : "48px",
    transform: `scale(${hoveredIndex !== null && hoveredIndex === index ? 1.25 : 1})`,
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  });

  return (
    <div 
      className="dock"
      style={{
        position: "fixed",
        ...getDockStyle(),
        display: "flex",
        gap: "8px",
        padding: "8px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        borderRadius: position === "bottom" ? "24px" : "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {apps.map((app, index) => (
        <div
          key={app.label}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            position: "relative" as const,
          }}
        >
          <div style={getIconStyle(index)}>
            <span>{app.icon}</span>
          </div>
          
          {/* Tooltip */}
          <div 
            className="dock-tooltip"
            style={{
              visibility: hoveredIndex === index ? "visible" : "hidden",
              position: "absolute",
              bottom: position === "bottom" ? "-60px" : "100%",
              left: `${index * (48 + 8)}px`,
              padding: "4px 8px",
              background: "#1c1c1e",
              borderRadius: "6px",
              fontSize: "0.75rem",
              whiteSpace: "nowrap",
            }}
          >
            {app.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dock;
