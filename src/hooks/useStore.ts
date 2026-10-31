import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WidgetConfig {
  id: string;
  type: WidgetType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  properties: Record<string, any>;
}

type WidgetType = 
  | "clock" 
  | "analog-clock" 
  | "calendar" 
  | "weather" 
  | "cpu" 
  | "gpu" 
  | "ram" 
  | "storage" 
  | "network" 
  | "uptime" 
  | "notes" 
  | "todo" 
  | "shortcuts" 
  | "media" 
  | "battery" 
  | "text" 
  | "image";

interface ThemeConfig {
  name: string;
  colors: {
    background: { start: string; end: string };
    accent: string;
    widgetBackground: string;
    widgetForeground: string;
    dockBackground: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
  };
  effects: {
    blur: boolean;
    blurAmount: number;
    shadow: boolean;
  };
}

interface AppState {
  widgets: WidgetConfig[];
  theme: ThemeConfig;
  selectedTheme: string;
  dockPosition: DockPosition;
  isEditMode: boolean;
  layouts: Layout[];
  activeLayout: string | null;
  
  // Actions
  addWidget: (type: WidgetType, position: { x: number; y: number }) => void;
  removeWidget: (id: string) => void;
  updateWidgetProperties: (id: string, properties: Partial<Record<string, any>>) => void;
  setEditMode: (isEditMode: boolean) => void;
  saveLayout: (name: string) => void;
  loadLayout: (name: string) => void;
  
  themes: ThemeConfig[];
}

const defaultWidgets: WidgetConfig[] = [
  { id: "clock-1", type: "clock", position: { x: 50, y: 50 }, size: { width: 200, height: 30 }, properties: {} },
  { id: "cpu-1", type: "cpu", position: { x: 270, y: 50 }, size: { width: 150, height: 40 }, properties: {} },
  { id: "ram-1", type: "ram", position: { x: 430, y: 50 }, size: { width: 150, height: 40 }, properties: {} },
  { id: "weather-1", type: "weather", position: { x: 590, y: 50 }, size: { width: 200, height: 60 }, properties: {} },
  { id: "notes-1", type: "notes", position: { x: 800, y: 50 }, size: { width: 300, height: 400 }, properties: { content: "" } },
];

const defaultThemes: ThemeConfig[] = [
  {
    name: "Aurora Light",
    colors: {
      background: { start: "#f5f5f7", end: "#ffffff" },
      accent: "#007AFF",
      widgetBackground: "rgba(255,255,255,0.8)",
      widgetForeground: "#1d1d1f",
      dockBackground: "rgba(255,255,255,0.85)",
    },
    typography: { fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI", fontSize: 14 },
    effects: { blur: true, blurAmount: 20, shadow: true },
  },
  {
    name: "Aurora Dark",
    colors: {
      background: { start: "#1c1c1e", end: "#2d2d2f" },
      accent: "#0A84FF",
      widgetBackground: "rgba(36,36,38,0.8)",
      widgetForeground: "#ffffff",
      dockBackground: "rgba(36,36,38,0.9)",
    },
    typography: { fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI", fontSize: 14 },
    effects: { blur: true, blurAmount: 20, shadow: false },
  },
];

interface Layout {
  name: string;
  widgets: WidgetConfig[];
}

type DockPosition = "left" | "right" | "bottom";

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      widgets: defaultWidgets,
      theme: defaultThemes[0],
      selectedTheme: "Aurora Light",
      dockPosition: "bottom",
      isEditMode: false,
      layouts: [],
      activeLayout: null,
      themes: defaultThemes,

      addWidget: (type, position) => {
        const newWidget: WidgetConfig = {
          id: `widget-${Date.now()}`,
          type,
          position,
          size: { width: 200, height: 50 },
          properties: {},
        };
        set((state) => ({
          widgets: [...state.widgets, newWidget],
        }));
      },

      removeWidget: (id) => {
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
        }));
      },

      updateWidgetProperties: (id, properties) => {
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, properties: { ...w.properties, ...properties } } : w
          ),
        }));
      },

      setEditMode: (isEditMode) =>
        set((state) => ({ isEditMode })),

      saveLayout: (name) => {
        const { widgets, theme, dockPosition, layouts } = get();
        const newLayout: Layout = { name, widgets };
        set((state) => ({
          layouts: [...state.layouts, newLayout],
        }));
      },

      loadLayout: (name) => {
        const layout = get().layouts.find((l) => l.name === name);
        if (!layout) return;
        set((state) => ({
          widgets: layout.widgets,
          layouts: state.layouts.map((l) => 
            l.name === name ? { ...l, widgets: state.widgets } : l
          ),
        }));
      },

    }),
    {
      name: "aurora-storage",
      partialize: (state) => ({
        widgets: state.widgets,
        theme: state.theme,
        dockPosition: state.dockPosition,
        layouts: state.layouts,
        activeLayout: state.activeLayout,
      }),
    }
  )
);

