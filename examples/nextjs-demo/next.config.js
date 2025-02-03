
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: async (config) => {
    const { SymbiosisUIWebpackPlugin } = await import("@synopsisapp/symbiosis-ui/plugin");
    config.plugins.push(
      new SymbiosisUIWebpackPlugin({
        iconsDir: "./assets/icons",
        publicDir: "./public",
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
