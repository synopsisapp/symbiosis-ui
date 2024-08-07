import type { Config } from "tailwindcss";
import { defaultTheme } from "./tailwindTheme";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: defaultTheme,
  },
  plugins: [],
} satisfies Config;

