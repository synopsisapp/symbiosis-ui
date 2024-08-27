// packages/ui/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SymbiosisUI",
      formats: ["es", "umd"],
      fileName: (format) => `symbiosis-ui.${format}.js`,
    },
    rollupOptions: {
      external: [
        "@biomejs/biome",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-slot",
        "@radix-ui/react-tooltip",
        "@tailwindcss/typography",
        "@types/fs-extra",
        "@types/node",
        "@types/react",
        "@types/react-dom",
        "@vitejs/plugin-react",
        "assert",
        "autoprefixer",
        "class-variance-authority",
        "clsx",
        "constants",
        "lucide-react",
        "postcss",
        "react",
        "react-dom",
        "stream",
        "tailwindcss",
        "tailwindcss-animate",
        "tsx",
        "typescript",
        "vite",
        "vite-plugin-dts",
        "zod",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "symbiosis-ui.css";
          }

          return assetInfo.name ?? "assets/[name].[ext]";
        },
      },
    },
    cssCodeSplit: false,
  },
});
