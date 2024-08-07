import type { Config as TailwindConfig } from "tailwindcss";

export type SymbiosisUIPluginOptions = {
  tailwindTheme?: Partial<TailwindConfig["theme"]>;
  tailwindContent?: string[];
  iconsDir?: string;
  publicDir?: string;
};
