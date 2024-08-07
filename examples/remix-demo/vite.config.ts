import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { symbiosisUIPlugin } from "@synopsisapp/symbiosis-ui/plugin";
import { defaultTheme } from "./tailwindTheme";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    symbiosisUIPlugin({
      tailwindTheme: defaultTheme,
      tailwindContent: [],
      iconsDir: "./assets/icons",
      publicDir: "./public",
    })
  ],
});
