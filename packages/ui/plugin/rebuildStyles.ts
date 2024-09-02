import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";
import tailwindcss, { type Config } from "tailwindcss";
import autoprefixer from "autoprefixer";
import { fileURLToPath } from "node:url";
import defaultConfig from "../tailwind.config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function rebuildStyles({
  userTheme,
  userContent,
  outputDir,
}: {
  userTheme: Partial<Config["theme"]>;
  userContent?: string[];
  outputDir: string;
}) {
  const resolvedOutputDir = path.join(outputDir, "symbiosis-assets");
  const inputFile = path.resolve(__dirname, "../../src/tailwind.css");
  const outputFile = path.resolve(resolvedOutputDir, "symbiosis-ui.css");

  const contentFiles = [
    path.resolve(__dirname, "../../src/**/*.{js,ts,jsx,tsx}"),
  ];

  try {
    const input = await fs.readFile(inputFile, "utf8");

    const result = await postcss([
      tailwindcss({
        ...defaultConfig,
        content: [...contentFiles, ...(userContent ?? [])],
        theme: {
          extend: {
            ...userTheme,
          },
        },
      }),
      autoprefixer,
    ]).process(input, { from: inputFile, to: outputFile });

    await fs.writeFile(outputFile, result.css);
  } catch (error) {
    console.error("Error rebuilding styles:", error);
  }
}
