import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:path";

const pagesBasePath = process.env.PAGES_BASE_PATH;

export default defineConfig({
  base: pagesBasePath ? `${pagesBasePath.replace(/\/$/, "")}/` : "/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), "index.html"),
        present: resolve(process.cwd(), "present.html"),
        annexure: resolve(process.cwd(), "scenario-annexure.html"),
      },
    },
  },
});
