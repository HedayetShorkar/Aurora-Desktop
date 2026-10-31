import React from "react";

export const SystemMonitor: React.FC<{
  type: string; theme?: any
}> = ({ type }) => (
  <div className="system-monitor">
    <div style={{ fontSize: 22 }}>{"\u2699\uFE0F"} {type}</div>
    <div style={{ opacity: .6, marginTop: 12 }}>
      Live monitoring not connected
    </div>
  </div>
);

export const StorageWidget: React.FC = () => (
  <div className="storage-widget">
    <strong>{"\uD83D\uDCBE"} Storage</strong>
    <p style={{ opacity: .6 }}>Disk information unavailable</p>
  </div>
);

export const NetworkWidget: React.FC = () => (
  <div className="network-widget">
    <strong>{"\uD83C\uDF10"} Network</strong>
    <p style={{ opacity: .6 }}>Live network speed unavailable</p>
  </div>
);

export const UptimeWidget: React.FC = () => {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const started = Date.now();
    const id = setInterval(() => {
      setSeconds(Math.floor((Date.now() - started) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <div className="uptime-widget">
      <strong>{"\u23F1\uFE0F"} App Session</strong>
      <div style={{ fontSize: 24, marginTop: 12 }}>
        {hours}h {minutes}m {secs}s
      </div>
    </div>
  );
};

export default SystemMonitor;
