import React from "react";
import { useStore } from "../hooks/useStore";

const VisualEditor: React.FC = () => {
  const { widgets, isEditMode, setEditMode } = useStore();

  return (
    <div style={{ position: "fixed" as const, inset: 0, pointerEvents: "none" }}>
      {/* Selection overlay */}
      <div 
        className="selection-overlay"
        style={{
          position: "fixed",
          background: "transparent",
          cursor: "crosshair",
        }}
      />

      {/* Widget selection highlights */}
      {widgets.map((widget, index) => (
        <div
          key={`selection-${index}`}
          className="selection-handle"
          style={{
            position: "absolute",
            left: widget.position.x,
            top: widget.position.y,
            width: widget.size.width,
            height: widget.size.height,
            border: "2px dashed #007AFF",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Edit controls */}
      <div className="edit-controls" style={{ 
        position: "fixed",
        right: "1rem",
        bottom: isEditMode ? "2rem" : null,
        top: isEditMode ? "1rem" : null,
        display: isEditMode ? "flex" : "none",
        flexDirection: "column" as const,
        gap: "0.5rem",
      }}>
        <button 
          onClick={() => {}}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            background: "#e6f4ea",
            color: "#047857",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          + Add Widget
        </button>

        <button 
          onClick={() => setEditMode(false)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            background: "#fef3c7",
            color: "#92400e",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Done Editing
        </button>
      </div>

      {/* Alignment guides */}
      {isEditMode && (
        <>
          <div 
            className="guide-horizontal"
            style={{ position: "fixed", top: 0, left: 0, right: 0, height: "1px", background: "rgba(0,122,255,0.3)" }}
          />
          <div 
            className="guide-vertical"
            style={{ position: "fixed", top: 0, bottom: 0, left: 0, width: "1px", background: "rgba(0,122,255,0.3)" }}
          />
        </>
      )}
    </div>
  );
};

export default VisualEditor;
