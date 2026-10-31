export type WidgetType = 
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

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  properties: Record<string, any>;
}
