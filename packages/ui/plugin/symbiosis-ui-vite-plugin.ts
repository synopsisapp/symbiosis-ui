import type { Plugin } from "vite";
import { generateIcons } from "./generateIcons";
import { rebuildStyles } from "./rebuildStyles";
import type { SymbiosisUIPluginOptions } from "./types";

export function symbiosisUIPlugin({
  tailwindTheme,
  tailwindContent,
  iconsDir = "assets/icons",
  publicDir = "public",
}: SymbiosisUIPluginOptions = {}): Plugin {
  return {
    name: "symbiosis-ui-plugin",
    async configResolved() {
      console.log("Symbiosis UI Plugin: Config resolved");

      if (tailwindTheme) {
        console.log("Custom Tailwind theme provided");
      }

      if (iconsDir) {
        console.log("Assets directory set to:", iconsDir);
      }
    },
    buildStart: async () => {
      try {
        await generateIcons({
          inputDir: iconsDir,
          outputDir: publicDir,
        });
        await rebuildStyles({
          userTheme: tailwindTheme,
          userContent: tailwindContent,
          outputDir: publicDir,
        });
      } catch (error) {
        console.error("Error during build start:", error);
      }
    },
  };
}
