import { existsSync, statSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { verificarImagenes } from "./scripts/verificar-imagenes.mjs";
import { generarRecursosSEO } from "./scripts/recursos-seo.mjs";
import { urlSitio } from "./src/lib/seo.ts";

const negocio = JSON.parse(
  readFileSync(new URL("./src/content/negocio.json", import.meta.url), "utf8"),
);
const site = urlSitio(negocio.dominio, process.env.SITE_URL);

const video = new URL("./src/assets/portada.mp4", import.meta.url);
if (existsSync(video) && statSync(video).size > 2_000_000)
  throw new Error("portada.mp4 supera 2 MB");

export default defineConfig({
  site,
  output: "static",
  integrations: [
    ...(site
      ? [sitemap({ filter: (page) => new URL(page).pathname === "/" })]
      : []),
    {
      name: "recursos-seo",
      hooks: {
        "astro:config:setup": async ({ config }) => {
          await generarRecursosSEO(fileURLToPath(config.root));
          if (!site)
            console.warn(
              "[SEO] Dominio pendiente: configura negocio.dominio o SITE_URL para canonical y sitemap.",
            );
        },
        "astro:build:done": async ({ dir }) => {
          const robots = `User-agent: *\nAllow: /\n${site ? `\nSitemap: ${new URL("sitemap-index.xml", site).href}\n` : "\n# [DOMINIO PENDIENTE: sitemap sin configurar]\n"}`;
          await writeFile(new URL("robots.txt", dir), robots);
        },
      },
    },
    {
      name: "presupuesto-imagenes",
      hooks: {
        "astro:build:done": async ({ dir }) => {
          await verificarImagenes(fileURLToPath(dir));
        },
      },
    },
  ],
  vite: { plugins: [tailwindcss()] },
});
