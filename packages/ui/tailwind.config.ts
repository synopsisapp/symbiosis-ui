import type { Config } from "tailwindcss";
import { shadcnPreset } from "./src/tailwind/shadcn-preset";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [shadcnPreset],
};

export default config;
