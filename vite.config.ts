
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Aurora Desktop - Vite Configuration
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    strictPort: true,

    watch: {
      ignored: [
        "**/src-tauri/target/**",
        "**/node_modules/**",
        "**/.git/**",
      ],
    },
  },

  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
