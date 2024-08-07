import type { Config } from "tailwindcss";
import { defaultTheme } from "./tailwindTheme";

const config: Config = {
  content: ["./src/stories/*.stories.tsx"],
  theme: {
    extend: defaultTheme,
  },
  plugins: [],
}

export default config;
