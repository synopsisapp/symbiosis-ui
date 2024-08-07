import type { StorybookConfig } from "@storybook/react-vite";
import { symbiosisUIPlugin } from "@synopsisapp/symbiosis-ui/plugin";
import { join, dirname } from "path";
import { defaultTheme } from "../tailwindTheme";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  // viteFinal: (config) => {
  //   config.plugins?.push(symbiosisUIPlugin({
  //     assetsDir: './assets/icons',
  //     tailwindTheme: defaultTheme,
  //     publicDir: './public',
  //   }))

  //   return config;
  // },
  staticDirs: [
    '../public'
  ]
};
export default config;
