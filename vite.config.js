import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Served from https://vaisartmann-beep.github.io/fitbar/ on GitHub Pages,
  // so assets must resolve under the /fitbar/ sub-path in production.
  base: "/fitbar/",
  plugins: [react()],
});
