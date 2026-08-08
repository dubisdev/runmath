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
        main: resolve(import.meta.dirname, "index.html"),
        settings: resolve(import.meta.dirname, "settings.html"),
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: resolve(import.meta.dirname, "src", "components"),
      },
      { find: "@utils", replacement: resolve(import.meta.dirname, "src", "utils") },
      { find: "@state", replacement: resolve(import.meta.dirname, "src", "state") },
    ],
  },
  server: {
    port: 3000,
  },
});
