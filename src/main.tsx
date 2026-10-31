import "./aurora.css";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import Overlay from "./Overlay";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { isTauri } from "@tauri-apps/api/core";
import { setupPlugins, setupTauri } from "./init";

// Initialize Tauri and plugins
setupPlugins();

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      {isTauri() && getCurrentWindow().label === "overlay" ? <Overlay /> : <App />}
    </React.StrictMode>
  );
}

// Export for Tauri integration
export { setupTauri };


