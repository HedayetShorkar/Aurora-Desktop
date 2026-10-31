import React from "react";
import { AppShortcuts, MediaControls, BatteryWidget, TextWidget, ImageWidget } from "./ExtraWidgets";

const WidgetGrid: React.FC = () => {
  return (
    <div 
      className="widget-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "2rem",
        padding: "2rem",
        maxWidth: "1920px",
        margin: "0 auto",
      }}
    >
      {/* Clock widgets */}
      <div className="widget-container" style={{ width: 200, height: 30 }}>
        <DigitalClock />
      </div>
      <div className="widget-container" style={{ width: 200, height: 50 }}>
        <AnalogClock />
      </div>

      {/* Calendar */}
      <div className="widget-container" style={{ width: 200, height: 180 }}>
        <CalendarWidget />
      </div>

      {/* Weather */}
      <div className="widget-container" style={{ width: 200, height: 60 }}>
        <WeatherWidget />
      </div>

      {/* System monitors */}
      <div className="widget-container" style={{ width: 150, height: 40 }}>
        <SystemMonitor type="CPU" theme={null} />
      </div>
      <div className="widget-container" style={{ width: 150, height: 40 }}>
        <SystemMonitor type="RAM" theme={null} />
      </div>
      <div className="widget-container" style={{ width: 150, height: 40 }}>
        <SystemMonitor type="GPU" theme={null} />
      </div>

      {/* Storage */}
      <div className="widget-container" style={{ width: 200, height: 50 }}>
        <StorageWidget />
      </div>

      {/* Network */}
      <div className="widget-container" style={{ width: 200, height: 50 }}>
        <NetworkWidget />
      </div>

      {/* Uptime */}
      <div className="widget-container" style={{ width: 150, height: 40 }}>
        <UptimeWidget />
      </div>

      {/* Notes */}
      <div className="widget-container" style={{ width: 300, height: 200 }}>
        <NotesEditor />
      </div>

      {/* Todo List */}
      <div className="widget-container" style={{ width: 300, height: 200 }}>
        <TodoList />
      </div>

      {/* App Shortcuts */}
      <div className="widget-container" style={{ width: 240, height: 160 }}>
        <AppShortcuts />
      </div>

      {/* Media Controls */}
      <div className="widget-container" style={{ width: 200, height: 150 }}>
        <MediaControls />
      </div>

      {/* Battery */}
      <div className="widget-container" style={{ width: 180, height: 60 }}>
        <BatteryWidget />
      </div>

      {/* Text Widget */}
      <div className="widget-container" style={{ width: 240, height: 150 }}>
        <TextWidget />
      </div>

      {/* Image Widget */}
      <div className="widget-container" style={{ width: 240, height: 150 }}>
        <ImageWidget />
      </div>
    </div>
  );
};

export default WidgetGrid;
