
import { invoke, isTauri } from "@tauri-apps/api/core";

/**
 * Initialize optional Tauri plugins.
 * Plugins must be registered in the Rust backend.
 */
export async function setupPlugins() {
  if (!isTauri()) {
    console.log("Aurora Desktop: Browser preview mode");
    return null;
  }

  console.log("Aurora Desktop: Tauri environment detected");
  return null;
}

/**
 * Initialize Aurora Desktop.
 */
export async function setupTauri() {
  if (!isTauri()) {
    console.log("Aurora Desktop running in browser preview");
    return;
  }

  try {
    console.log("Aurora Desktop initialized successfully");
  } catch (error) {
    console.error("Aurora Desktop initialization failed:", error);
  }
}

export const isDev = import.meta.env.DEV;
