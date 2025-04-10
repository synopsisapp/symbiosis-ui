import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
// packages/ui/vite.config.ts
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

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
        "@tanstack/react-table",
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
        "recharts",
        "date-fns",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          return assetInfo.name ?? "assets/[name].[ext]";
        },
      },
    },
    cssCodeSplit: false,
  },
});
