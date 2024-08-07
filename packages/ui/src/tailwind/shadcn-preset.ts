import tailwindTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

import { shadcnPlugin } from "./shadcn-plugin";

export const shadcnPreset: Config = {
  darkMode: ["class"],
  content: [],
  plugins: [tailwindAnimate, shadcnPlugin, tailwindTypography],
};
