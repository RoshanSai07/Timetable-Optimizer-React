import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
