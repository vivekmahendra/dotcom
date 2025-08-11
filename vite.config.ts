import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  plugins: [
    tailwindcss(), 
    mdx({
      jsxImportSource: "react",
      providerImportSource: "@mdx-js/react",
    }),
    reactRouter(), 
    tsconfigPaths()
  ],
});
