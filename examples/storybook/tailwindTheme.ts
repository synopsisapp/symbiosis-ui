import type { Config } from "tailwindcss";

export const defaultTheme: Partial<Config["theme"]> = {
  colors: {
    mainColors: {
      ["light-400"]: "#E0F2F1",
      ["light-300"]: "#B2DFDB",
      ["light-200"]: "#80CBC4",
      ["light-100"]: "#4DB6AC",
      base: "#26A69A",
      ["dark-100"]: "#009688",
      ["dark-200"]: "#00897B",
      ["dark-300"]: "#00796B",
      ["dark-400"]: "#00695C",
      ["dark-500"]: "#004D40",
    },
  },
};

// rgb(0, 150, 136)
