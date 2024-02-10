import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },
  server: {
    host: true,
    // port: 5173,
    // proxy: {
    //   "/api": {
    //     target: "http://api:4000/",
    //     changeOrigin: true,
    //   },
    // },
  },
});
