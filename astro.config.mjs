import { existsSync, statSync } from "node:fs";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const video = new URL("./src/assets/portada.mp4", import.meta.url);
if (existsSync(video) && statSync(video).size > 2_000_000)
  throw new Error("portada.mp4 supera 2 MB");

export default defineConfig({
  output: "static",
  vite: { plugins: [tailwindcss()] },
});
