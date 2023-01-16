import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        settings: resolve(__dirname, "settings.html"),
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: resolve(__dirname, "src", "components"),
      },
      { find: "@utils", replacement: resolve(__dirname, "src", "utils") },
      { find: "@state", replacement: resolve(__dirname, "src", "state") },
    ],
  },
  server: {
    port: 3000,
  },
});
