import { Config } from "tailwindcss";

export const defaultTheme: Partial<Config["theme"]> = {
  colors: {
    mainColors: {
      ["light-400"]: "#F8BBE9",
      ["light-300"]: "#F48FB1",
      ["light-200"]: "#F06292",
      ["light-100"]: "#EC407A",
      base: "#E91E63",
      ["dark-100"]: "#D81B60",
      ["dark-200"]: "#C2185B",
      ["dark-300"]: "#AD1457",
      ["dark-400"]: "#880E4F",
      ["dark-500"]: "#6A1B9A",
    },
  },
};
