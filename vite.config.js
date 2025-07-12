import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Akim Snake App",
        short_name: "Akim Snake App",
        description: "A Simple Snake Game Application using MERN stack",
        theme_color: "#ece9fa",
        background_color: "#ece9fa",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "192_akimsnake_logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "512_akimsnake_logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://snakegame-backend.vercel.app",
        changeOrigin: true,
      },
    },
  },
});
