import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
    //  host: '0.0.0.0',
      https: false
    },
    build: {
      minify: false,
    },
  };
});
