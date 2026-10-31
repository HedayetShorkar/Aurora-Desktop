import React from "react";

const SystemMonitor: React.FC<{ type: string; theme: any }> = ({ type, theme }) => {
  const getIcon = (type) => {
    switch(type) {
      case "CPU": return "⚡";
      case "RAM": return "💾";
      case "GPU": return "🎮";
      case "STORAGE": return "💿";
      default: return type;
    }
  };

  return (
    <div className="system-monitor">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "1.25rem" }}>{getIcon(type)}</span>
        <span>{type}</span>
      </div>
      
      {/* Mock progress bar - in production would use actual system metrics */}
      <div 
        className="progress-bar"
        style={{
          height: "8px",
          marginTop: "0.5rem",
          borderRadius: "4px",
          background: `linear-gradient(90deg, ${theme.colors.accent} 0%, ${theme.colors.accent}80 100%)`,
        }}
      />
    </div>
  );
};

const StorageWidget: React.FC = () => {
  return (
    <div className="storage-widget">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>💿</span>
        <span>Storage</span>
      </div>
      
      {/* Mock storage usage */}
      <div style={{ 
        marginTop: "0.75rem", 
        fontSize: "0.875rem", 
        opacity: 0.7 
      }}>
        🟦 Free space available
      </div>
    </div>
  );
};

const NetworkWidget: React.FC = () => {
  return (
    <div className="network-widget">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>🌐</span>
        <span>Network</span>
      </div>
      
      {/* Mock network speed */}
      <div style={{ 
        marginTop: "0.75rem", 
        fontSize: "0.875rem", 
        opacity: 0.7 
      }}>
        {`🟢 Up: ${Math.floor(Math.random() * 100)} Mbps`}
      </div>
    </div>
  );
};

const UptimeWidget: React.FC = () => {
  const [uptime, setUpTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => setUpTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const duration = Math.floor((new Date().getTime() - uptime.getTime()) / 1000);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  
  return (
    <div className="uptime-widget">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>🕐</span>
        <span>Uptime</span>
      </div>
      
      <div style={{ 
        marginTop: "0.75rem", 
        fontSize: "1rem", 
        fontWeight: "500" 
      }}>
        {days}d+
      </div>
    </div>
  );
};

export default SystemMonitor;
