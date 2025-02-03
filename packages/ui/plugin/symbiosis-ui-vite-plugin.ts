import type { Plugin } from "vite";
import { generateIcons } from "./generateIcons";
import type { SymbiosisUIPluginOptions } from "./types";

export function symbiosisUIPlugin({
  iconsDir = "assets/icons",
  publicDir = "public",
  verboseLogs = false,
}: SymbiosisUIPluginOptions = {}): Plugin {
  return {
    name: "symbiosis-ui-plugin",
    async configResolved() {
      console.log("Symbiosis UI Plugin: Config resolved");

      if (iconsDir) {
        console.log("Assets directory set to:", iconsDir);
      }
    },
    buildStart: async () => {
      try {
        await generateIcons({
          inputDir: iconsDir,
          outputDir: publicDir,
          verboseLogs,
        });
      } catch (error) {
        console.error("Error during build start:", error);
      }
    },
  };
}
