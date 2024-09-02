import type { Config } from "tailwindcss";
import { shadcnPreset } from "./src/tailwind/shadcn-preset";
import defaultTheme from "./src/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [shadcnPreset],
  theme: defaultTheme,
};

export default config;
