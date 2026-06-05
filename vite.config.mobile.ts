// Pure offline SPA build for Capacitor (Android/iOS).
// Run: `bun run build:mobile` → outputs `dist-mobile/` with everything bundled
// into a single JS file + inlined assets so the WebView loads from file:// with
// zero network requests.
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
    // Disable auto code-splitting: we want ONE bundle for instant nav.
    tanstackRouter({ target: "react", autoCodeSplitting: false }),
    react(),
    tailwindcss(),
  ],
  define: {
    // Strip dev-only branches from React / libraries.
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist-mobile",
    emptyOutDir: true,
    sourcemap: false,
    target: "es2020",
    cssCodeSplit: false,
    // Inline ALL assets (images, fonts, json) as base64 so nothing is fetched at runtime.
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    modulePreload: { polyfill: false },
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Force a single JS chunk → no dynamic imports, no waterfalls in WebView.
        inlineDynamicImports: true,
        manualChunks: undefined,
        entryFileNames: "assets/app.js",
        chunkFileNames: "assets/app.js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
