import { Config } from "tailwindcss";

export const defaultTheme: Partial<Config["theme"]> = {
  colors: {
    mainColors: {
      ["light-400"]: "#E6FFF0",
      ["light-300"]: "#B3FFD1",
      ["light-200"]: "#44FF88",
      ["light-100"]: "#22FF52",
      base: "#00FF0A",         
      ["dark-100"]: "#0BD435", 
      ["dark-200"]: "#13AC2E", 
      ["dark-300"]: "#178730", 
      ["dark-400"]: "#196638", 
      ["dark-500"]: "#174724",
    },
  }
}

// rgb(0 255 10)
