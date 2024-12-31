import type { Config } from "tailwindcss";
import { shadcnPreset } from "./src/tailwind/shadcn-preset";
import defaultTheme from "./src/defaultTheme";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [shadcnPreset],
  theme: defaultTheme,
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("light-scheme", "body.light-scheme &");
      addVariant("dark-scheme", "body.dark-scheme &");
    }),
  ],
};

export default config;
