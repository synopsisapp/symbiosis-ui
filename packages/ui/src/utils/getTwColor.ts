import colors from "tailwindcss/colors";

export function getTwColor(color: string): string {
  if (color.startsWith("bg-") || color.startsWith("text-")) {
    const [_prefix, colorName, shade] = color.split("-");

    if (colorName in colors) {
      const colorSet = colors[colorName as keyof typeof colors];
      if (typeof colorSet === "string") {
        return colorSet;
      }
      if (typeof colorSet === "object" && shade in colorSet) {
        return colorSet[shade as keyof typeof colorSet];
      }
    }
  }

  return color;
}
