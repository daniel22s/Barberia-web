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
Implementación local de Codex, **2026-10-31, hora de Lima**. Pendientes de
aceptación externa y contenido indicados al final; no se declaran aprobados.

### Flujo y archivos cambiados

- En la carpeta principal `Barberia-web`, sin crear worktrees. `git status`
  estaba limpio en `main`; fetch de `main` por SSH y comparación con `origin/main`
  dieron **0 commits de diferencia en ambos sentidos**, base `2f153ec`.
  `git switch -c web/task-006-seo main`: código 0. Se mantiene esa rama al entregar.
- `src/layouts/Base.astro`: título unisex/local desde contenido, descripción
  ≤ 155 caracteres con distrito y provincia, canonical sin query, theme-color,
  iconos, Open Graph/Twitter e imagen 1200×630. HairSalon solo en inicio; FAQPage
  solo cuando hay preguntas confirmadas. JSON serializado escapando `<`, `>`,
  `&`, U+2028/U+2029 para impedir cerrar el script desde texto del CMS.
- `src/lib/jsonld.ts`, `jsonld.test.ts`, `seo.ts` y `horario.ts`: generadores
  puros; expansión diaria compartida con el horario visible; agrupación semanal,
  domingo cerrado con 00:00/00:00; precios PEN y `minPrice` para precios «desde»,
  sin afirmar un máximo en ese caso; redes HTTP(S) deduplicadas y marcadores
  omitidos. Sin `aggregateRating` por falta de datos verificables. Las horas se
  omiten mientras exista `horarioNota`; no se afirma el horario provisional.
- `Faq.astro`, `index.astro`, `faq.json`: sección con controles nativos `details`
  y las mismas preguntas del JSON-LD. Archivo vacío hasta recibir preguntas reales;
  se eliminó la única entrada que era un marcador. Una FAQ vacía no genera sección.
- `Portada.astro`, `Galeria.astro`, `content.config.ts`: descripción real mediante
  `negocio.portadaAlt` al entregar una portada; si falta, error de compilación.
  Distrito añadido a portada y primera foto de galería, sin duplicarlo ni
  extender marcadores provisionales. Resto de alt del contenido conservados.
- `404.astro`: título propio, `noindex, follow`, sin canonical ni datos de negocio.
- `astro.config.mjs`, `scripts/recursos-seo.mjs`, `.gitignore`, `public/robots.txt`:
  `site` desde `negocio.dominio` o `SITE_URL`; sitemap solo con origen válido y sin
  404; robots de salida con la URL absoluta del sitemap. Los marcadores no se
  convierten en dominios inventados. Social e iconos se generan al compilar y al
  iniciar dev con Sharp, ya instalado por el pipeline de Astro. Composición con
  portada y logo disponibles o marca textual provisional; `src/assets/og.*`
  permite un diseño de reemplazo. Archivos generados de `public/` ignorados por Git.
- `package.json` y lockfile: única dependencia nueva directa,
  **`@astrojs/sitemap` 3.7.4**, más sus dependencias transitivas.
- `docs/SEO.md` y `docs/diseno/resultados/task-006/`: configuración, casillas de
  implementación, pendientes y evidencias reales. No se cambió `negocio.json`.

### Comandos y pruebas reales

Entorno: `source ~/.nvm/nvm.sh; nvm use 22.23.4`, **Node 22.23.4 / npm 10.9.9**.

- `npm install @astrojs/sitemap --cache /tmp/barberia-npm-cache --no-audit --no-fund`:
  código 0; seis paquetes añadidos, sin actualizar otras versiones del lockfile.
- `npm run check`: **código 0**, Astro 0 errores/advertencias/hints de tipos,
  ESLint limpio, build correcto, **44/44 pruebas en cinco archivos**. También
  pasó con `SITE_URL=http://127.0.0.1:4336`. Sin dominio, el build avisa que canonical
  y sitemap siguen pendientes. Los avisos de colecciones FAQ/reseñas vacías no
  impiden el build; no equivalen a errores de tipos.
- `npm run format:check`: **código 0**; se comprobó además
  `npx --no-install prettier --check scripts/recursos-seo.mjs`, código 0.
- Doce pruebas nuevas en Vitest: horarios/rangos/domingo, horario sin confirmar,
  dirección/geo/teléfono, precios fijos y «desde», redes vacías y protocolos no
  HTTP(S), ausencia de calificaciones inventadas, FAQ vacía/real, serialización
  contra cierre de script, longitud de descripción, dominio y alt sin repetición.
- `node /tmp/barberia-task006-qa/fixtures.mjs`: código 0. Con FAQ sintética y
  horario temporalmente confirmado, HTML y JSON-LD coinciden; canonical, OG
  absoluta, robots y sitemap usan `SITE_URL` y no incluyen 404. Imagen social
  1200×630; `src/assets/og.png` sustituye la composición. Fixtures retiradas y
  contenido restaurado en `finally`. Las URLs `.example` usadas en esa prueba
  no son dominios del negocio y no se guardaron en contenido.
- `node /tmp/barberia-task006-qa/brand-fixtures.mjs`: código 0. En una carpeta
  temporal externa al repo, se compone una portada PNG con un logo SVG; se
  verifican regiones de ambas capas, OG 1200×630, favicon 32 y apple icon 180.
- `npm run preview -- --host 127.0.0.1 --port 4336` y
  `node /tmp/barberia-task006-qa/browser.mjs`: código 0, **375 y 1280 px**.
  Capturas revisadas, sin desborde ni errores JS ni peticiones externas. Título,
  un h1, canonical sin query, OG/Twitter, ausencia de FAQ ficticia, JSON-LD e iconos
  verificados. Recursos SEO HTTP 200 y 404 propia con noindex, sin JSON-LD de negocio.
- Lighthouse **13.6.0**, móvil con throttling simulado, compilación local final:
  **Performance 100 / Accessibility 100 / Best Practices 100 / SEO 100**.
  LCP **≈ 905 ms**, transferencia inicial **≈ 92 KB** con contenido provisional.
  Comando: `CHROME_PATH=<Chromium local> node /tmp/barberia-task005-qa/node_modules/lighthouse/cli/index.js
  http://127.0.0.1:4336 --chrome-flags='--headless --no-sandbox --disable-dev-shm-usage'
  --only-categories=performance,accessibility,best-practices,seo --output=json`.
  Herramienta externa al proyecto; resumen guardado con fecha UTC equivalente a
  2026-10-31 en Lima.
- **schema.org**, `https://validator.schema.org/`, modo código, 2026-10-31:
  **HairSalon + FAQPage: 0 errores / 0 advertencias, dos elementos**; HTTP 200.
  Se envió únicamente JSON-LD autorizado: HairSalon generado con contenido local
  y URL local, más FAQ sintética para verificar el tipo opcional. No se envió el
  HTML completo. La revisión automática rechazó inicialmente esa carga completa;
  el dueño autorizó después de forma explícita solo JSON-LD a schema.org/Google.
  Resultado y captura guardados. Esa FAQ no queda publicada ni en `faq.json`.
- **Google Rich Results Test**, `https://search.google.com/test/rich-results`,
  modo código, 2026-10-31: se envió el JSON-LD autorizado; el servicio devolvió
  **«Something went wrong / Log in and try again»**. **No aprobado**. Captura y
  resultado guardados; no se inició sesión ni se intentó eludir controles.
- `git diff --check`: código 0. No se hicieron push, merge ni cambios de vuelta a main.

### Resultados pendientes y límites

1. **Dominio y URL pública:** el dueño confirmó «Todavía no; dejarlo pendiente de
   configurar». La implementación está probada con `SITE_URL` local; el build
   normal omite canonical/sitemap y URLs absolutas del JSON-LD hasta recibir el
   dominio. No se publica una URL inventada. Pregunta pendiente: ¿cuál será el
   dominio confirmado para la publicación de TASK-008?
2. **Google sobre la vista previa:** no ejecutado por URL, porque no hay despliegue;
   prueba de código intentada con el error real indicado. Repetir con la URL pública
   y sesión del desarrollador cuando corresponda. schema.org por código sí pasó;
   repetir con contenido real y URL final tras TASK-008.
3. **FAQ en Google:** su [documentación oficial de cambios](https://developers.google.com/search/updates)
   indica que los resultados enriquecidos FAQ fueron retirados en 2026. El criterio
   antiguo de TASK-006 no permite prometer FAQ enriquecidas. `FAQPage` sigue válido
   en schema.org, implementado y probado, pero no se declara aprobado como resultado
   enriquecido de Google. Revisión del criterio por el Arquitecto pendiente.
4. **WhatsApp:** no se compartió ninguna vista previa ni se enviaron mensajes.
   Metadatos e imagen local verificados; comprobar la tarjeta real al publicar.
5. **Contenido definitivo:** faltan fotos y logo originales, alt reales de esas
   fotos, preguntas/respuestas reales y horario confirmado (P-23/P-24/P-25).
   Confirmar teléfono y precios provisionales antes de publicar. Sin calificación
   verificable, no se añade `aggregateRating`. Repetir rendimiento con las imágenes
   definitivas. El logo textual y la imagen social actuales son provisionales.

La rama queda para revisión local del Arquitecto; implementación y pruebas locales
realizadas, aceptación publicada pendiente de los puntos anteriores.

## Revisión del Arquitecto (2026-10-31)

**Aceptada en local**, sin correcciones de código. Los criterios que necesitan una URL pública se cierran en TASK-008.

Verificaciones ejecutadas por Claude con Node 22.23.4: `npm ci` (418 paquetes; el lockfile solo añade `@astrojs/sitemap` y sus dependencias), `astro check` 0 errores / 0 advertencias / 0 hints, lint limpio, build de 2 páginas, **44/44** pruebas, Prettier limpio. HTML compilado: título «Barbería y peluquería unisex en Mi Perú, Callao | Véktra Hair Studio», descripción de 95 caracteres, `HairSalon` con dirección, coordenadas reales y precios en PEN, sin horario (sigue `horarioNota`) y sin `aggregateRating`. Imagen social `og.jpg` revisada: logotipo, distrito y descripción legibles. Revisión del código: JSON-LD serializado de forma segura, marcadores omitidos, FAQ vacía no se muestra, 404 con `noindex`.

**Decisión sobre el criterio 1:** Google ya no muestra FAQ como resultado enriquecido (informe de Codex). Basta con que `FAQPage` sea válido en schema.org; en la prueba de Google solo se exige `HairSalon`.

Estado de los criterios:
1. Prueba de Google: **pendiente** con la URL pública (en modo código pidió iniciar sesión).
2. schema.org: **aprobado** (0 errores, 0 advertencias, 2026-10-31, por Codex); repetir con el contenido real.
3. Tarjeta de WhatsApp: **pendiente** con la URL pública.
4. Lighthouse SEO 100 en móvil: **aprobado** en local (100/100/100/100, por Codex; no repetido aquí).

**Bloqueos antes de publicar (TASK-008):**
- **Teléfono:** `negocio.whatsapp` es el número de ejemplo `51900000000`, y el JSON-LD lo publica como `telephone`. No publicar hasta tener el número real (también lo usan los botones de WhatsApp).
- **Dominio (P-14):** sin dominio no hay canonical, sitemap ni URLs absolutas de `og:image`, que WhatsApp necesita para mostrar la tarjeta.
- **Fuentes de `og.jpg`:** se dibuja con la fuente `sans-serif` del sistema. Comprobar en la vista previa de Cloudflare que el texto se ve bien, o subir un diseño propio en `src/assets/og.png`.

Observaciones (no bloquean):
- `streetAddress` no incluye «3.er piso» (`referencia`); se puede añadir si se quiere más precisión.
- El `alt` de la primera foto de la galería y el de la portada añaden «· Mi Perú»; revisar que suene natural con las fotos reales.
