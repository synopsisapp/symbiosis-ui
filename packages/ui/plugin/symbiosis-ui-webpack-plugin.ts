import { generateIcons } from "./generateIcons";
import { rebuildStyles } from "./rebuildStyles";
import type { SymbiosisUIPluginOptions } from "./types";

export class SymbiosisUIWebpackPlugin {
  private options: Required<SymbiosisUIPluginOptions>;
  private lastOptionsHash = "";
  private assetsGenerated = false;

  constructor(options: SymbiosisUIPluginOptions = {}) {
    this.options = {
      tailwindTheme: {},
      tailwindContent: [],
      iconsDir: "assets/icons",
      publicDir: "public",
      ...options,
    };
    this.updateOptionsHash();
  }

  private updateOptionsHash() {
    this.lastOptionsHash = this.hashOptions(this.options);
  }

  private hashOptions(options: Required<SymbiosisUIPluginOptions>): string {
    return JSON.stringify(options).split("").sort().join("");
  }

  // biome-ignore lint: any is used here on purpose
  async apply(compiler: any) {
    const webpack = await import("webpack").catch(() => null);

    if (!webpack?.default) {
      console.warn(
        "Webpack is not installed. SymbiosisUIWebpackPlugin will not be applied."
      );
      return;
    }

    compiler.hooks.thisCompilation.tap(
      "SymbiosisUIWebpackPlugin",
      // biome-ignore lint: any is used here on purpose
      (compilation: any) => {
        compilation.hooks.processAssets.tapPromise(
          {
            name: "SymbiosisUIWebpackPlugin",
            stage: webpack.default.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
          },
          async () => {
            try {
              await this.generateAssetsIfNeeded();
            } catch (error) {
              console.error("Symbiosis UI Webpack Plugin: Error - ", error);
            }
          }
        );
      }
    );
  }

  private async generateAssetsIfNeeded() {
    const currentOptionsHash = this.hashOptions(this.options);
    if (this.assetsGenerated && currentOptionsHash === this.lastOptionsHash) {
      return;
    }

    console.log("Symbiosis UI Webpack Plugin: Generating assets");
    const { iconsDir, publicDir, tailwindTheme, tailwindContent } =
      this.options;

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

      this.assetsGenerated = true;
      this.lastOptionsHash = currentOptionsHash;
      console.log("Symbiosis UI Webpack Plugin: Assets generated successfully");
    } catch (error) {
      console.error(
        "Symbiosis UI Webpack Plugin: Error generating assets - ",
        error
      );
      throw error;
    }
  }
}
