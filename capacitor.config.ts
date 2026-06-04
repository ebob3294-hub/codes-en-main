import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.ayoubsadkouni.codesprotectioncivile",
  appName: "Codes Protection Civile",
  // Points to the static SPA output produced by `bun run build:mobile`.
  webDir: "dist-mobile",
  android: {
    allowMixedContent: false,
  },
};

export default config;
