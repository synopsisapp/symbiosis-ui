import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { symbiosisUIPlugin } from "@synopsisapp/symbiosis-ui/plugin";


export default defineConfig({
  plugins: [
    react(),
    symbiosisUIPlugin({
      iconsDir: "./assets/icons",
      publicDir: "./public",
    }),
  ],
});
