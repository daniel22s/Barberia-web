# TASK-006 — SEO técnico

## Objetivo
Cumplir la parte técnica de `docs/SEO.md` para que Google entienda qué es, dónde está y qué ofrece Vektra Hair Studio.

## Contexto
Depende de TASK-002 a 005. Unisex: apuntar a «barbería», «peluquería» y «salón de belleza» en Mi Perú, Callao.

## Requisitos
**Incluye**
- En `Base.astro`, desde el contenido: `<title>` «Barbería y peluquería unisex en {distrito}, {provincia} | {nombre}», meta descripción (≤ 155 caracteres), URL canónica, `theme-color`, favicon e íconos.
- Open Graph y Twitter Card con imagen de 1200×630 generada al compilar desde la foto de portada y el logo (o un archivo en `src/assets/og.*`).
- JSON-LD `HairSalon`: `name`, `url`, `telephone`, `address` (`PostalAddress`, `addressCountry: PE`), `geo`, `openingHoursSpecification`, `priceRange`, `image`, `sameAs` (redes) y `hasOfferCatalog` con los servicios y precios. `aggregateRating` **solo** si los datos son reales y verificables.
- `Faq.astro` + JSON-LD `FAQPage` desde `faq.json` (si está vacío, no se muestra).
- `@astrojs/sitemap` y `public/robots.txt` con la URL del sitemap.
- `alt` de las fotos revisados: describen el trabajo e incluyen el nombre o el distrito sin repetirlo en exceso.
- Un solo `<h1>`; jerarquía de títulos correcta.

**No incluye:** alta en Search Console y Bing (TASK-008), redacción de blog.

## Archivos afectados
`src/layouts/Base.astro`, `src/components/Faq.astro`, `src/lib/jsonld.ts` (+ pruebas), `astro.config.mjs`, `public/robots.txt`, `src/content/faq.json`.

## Restricciones
- `@astrojs/sitemap` es la única dependencia nueva permitida.
- Nada de texto oculto ni relleno de palabras clave.

## Criterios de aceptación
1. La prueba de resultados enriquecidos de Google (sobre la vista previa) valida `HairSalon` y `FAQPage` sin errores.
2. El validador de schema.org no muestra errores.
3. Al compartir la vista previa por WhatsApp se ven el logo, el nombre y la descripción.
4. Lighthouse SEO = 100 en móvil.

## Pruebas requeridas
`npm run check`; Vitest de `jsonld.ts` (horarios, precios, redes vacías omitidas); resultados de las herramientas de los criterios 1, 2 y 4 anotados con fecha.

## Documentación a actualizar
`docs/SEO.md`: marcar lo hecho.

## Resultados reales y pendientes
_(Codex)_
