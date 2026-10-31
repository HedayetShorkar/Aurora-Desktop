import React from "react";

const AppShortcuts: React.FC = () => {
  const shortcuts = [
    { icon: "📁", name: "File Explorer" },
    { icon: "🌐", name: "Browser" },
    { icon: "🎵", name: "Music" },
    { icon: "🖼️", name: "Photos" },
  ];

  return (
    <div className="shortcuts-grid">
      {shortcuts.map((shortcut, index) => (
        <div 
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0.75rem",
            border: "1px solid rgba(0,0,0,0.05)",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{shortcut.icon}</div>
          <span style={{ fontSize: "0.75rem" }}>{shortcut.name}</span>
        </div>
      ))}
    </div>
  );
};

const MediaControls: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="media-controls">
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎵</div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            background: "#f3f4f6",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
      </div>
    </div>
  );
};

const BatteryWidget: React.FC = () => {
  const [battery, setBattery] = React.useState(100);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setBattery(prev => Math.max(0, prev - Math.random() * 2));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="battery-widget">
      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔋</div>
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "0.5rem" 
      }}>
        <svg width="80" height="30" viewBox="0 0 80 30">
          <rect x="2" y="2" width="74" height="26" rx="3" fill="#e5e7eb"/>
          {battery > 20 && (
            <rect x="2" y="2" width={74 * (battery / 100)} height="26" rx="2" fill="#059669"/>
          )}
          {battery <= 20 && (
            <rect x="2" y="2" width={74 * (battery / 100)} height="26" rx="2" fill="#dc2626"/>
          )}
        </svg>
        <span style={{ fontSize: "0.875rem" }}>{Math.round(battery)}%</span>
      </div>
    </div>
  );
};

const TextWidget: React.FC = () => {
  const [text, setText] = React.useState("");

  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type something here..."
      style={{
        flex: 1,
        resize: "none",
        border: "none",
        outline: "none",
        fontFamily: 'Segoe UI',
        fontSize: "0.875rem"
      }}
    />
  );
};

const ImageWidget: React.FC = () => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#9ca3af",
      fontSize: "0.875rem"
    }}>
      🖼️ Image Widget
    </div>
  );
};

export { 
  AppShortcuts, 
  MediaControls, 
  BatteryWidget, 
  TextWidget,
  ImageWidget
};
