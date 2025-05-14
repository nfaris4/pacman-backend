import { defineConfig } from "vite";

export default defineConfig({
  base: "/pacman-backend/",
  build: {
    outDir: "dist",
  },
  server: {
    port: 5173,
  },
});
