const plugin = require("@synopsisapp/symbiosis-ui/plugin");
const defaultTheme = require("./tailwindTheme.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new plugin.SymbiosisUIWebpackPlugin({
        iconsDir: "./assets/icons",
        publicDir: "./public",
        tailwindTheme: defaultTheme,
      })
    );

    return config;
  },
};

module.exports = nextConfig;
