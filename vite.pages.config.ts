import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const pagesBasePath = process.env.PAGES_BASE_PATH;

export default defineConfig({
  base: pagesBasePath ? `${pagesBasePath.replace(/\/$/, "")}/` : "/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});
