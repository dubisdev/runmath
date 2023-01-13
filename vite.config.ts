import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
