import { fileURLToPath, URL } from "url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [react()],
  preview: {
    host: true,
    port: 3000,
  },
  server: {
    host: true,
    port: 3000,
  },
});
