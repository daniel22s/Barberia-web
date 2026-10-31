import { existsSync, statSync } from "node:fs";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { verificarImagenes } from "./scripts/verificar-imagenes.mjs";

const video = new URL("./src/assets/portada.mp4", import.meta.url);
if (existsSync(video) && statSync(video).size > 2_000_000)
  throw new Error("portada.mp4 supera 2 MB");

export default defineConfig({
  output: "static",
  integrations: [{
    name: "presupuesto-imagenes",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        await verificarImagenes(fileURLToPath(dir));
      },
    },
  }],
  vite: { plugins: [tailwindcss()] },
});
