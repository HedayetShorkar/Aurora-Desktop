import { useState } from "react";
import WidgetGrid from "./components/WidgetGrid";
import Dock from "./components/Dock";
import ThemeSelector from "./components/ThemeSelector";
import SettingsPanel from "./components/SettingsPanel";
import VisualEditor from "./components/VisualEditor";
import { useStore } from "./hooks/useStore";

function App() {
  const { widgets, theme, dockPosition, isEditMode, setEditMode } = useStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="aurora-app" style={{ 
      background: `linear-gradient(135deg, ${theme.colors.background.start} 0%, ${theme.colors.background.end} 100%)`,
      minHeight: "100vh",
    }}>
      {/* Top bar */}
      <header className="app-header">
        <div className="header-left">
          <h1 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Aurora Desktop</h1>
        </div>
        <div className="header-center">
          <button 
            onClick={() => setEditMode(!isEditMode)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: isEditMode ? "#e6f4ea" : "#e5e7eb",
              color: isEditMode ? "#047857" : "#374151",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            {isEditMode ? "Exit Edit Mode" : "Enable Edit Mode"}
          </button>
        </div>
        <div className="header-right">
          <ThemeSelector currentTheme={theme.name} />
          <button 
            onClick={() => setIsSettingsOpen(true)}
            style={{
              padding: "0.5rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "rgba(255,255,255,0.3)",
              cursor: "pointer",
            }}
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        <WidgetGrid theme={theme} isEditMode={isEditMode} />
      </main>

      {/* Dock - position at bottom */}
      <Dock position={dockPosition} />

      {/* Settings panel */}
      {isSettingsOpen && (
        <SettingsPanel 
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Visual Editor overlay when in edit mode */}
      {isEditMode && (
        <VisualEditor />
      )}
    </div>
  );
}

export default App;
