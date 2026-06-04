// Static SPA build for Capacitor (Android/iOS).
// Run: `bun run build:mobile` → outputs `dist-mobile/index.html` (no server).
// Then: `npx cap sync` to copy into the native project.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  // Relative base so the WebView can load assets from file:// or capacitor://
  base: "./",
  plugins: [
    tsconfigPaths(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: "dist-mobile",
    emptyOutDir: true,
    sourcemap: false,
    target: "es2020",
  },
});
