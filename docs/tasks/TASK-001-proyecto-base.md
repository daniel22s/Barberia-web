# TASK-001 — Proyecto base, contenido y tema

## Objetivo

Crear el proyecto Astro + Tailwind con el archivo de contenido único y los tokens de diseño, listo para construir las secciones.

## Contexto

ADR-0001 (stack) y ADR-0003 (panel de edición) aceptadas. Diseño de referencia: maqueta https://claude.ai/artifact/Hndx8FYZznfbKXcbiQXPWp. Datos reales pendientes: se usan marcadores `[ASÍ]`.

## Requisitos

**Incluye**

- Astro (última estable, salida estática) con TypeScript estricto, Tailwind CSS v4 (`@tailwindcss/vite`), ESLint + Prettier (con los plugins de Astro y Tailwind). Node 22 en `engines` y `.nvmrc`.
- Scripts: `dev`, `build`, `preview`, `lint`, `check` (`astro check` + lint + build).
- **Colecciones de contenido** con esquemas Zod (`src/content.config.ts`):
  - `negocio` (`src/content/negocio.json`): nombre, eslogan, descripción, distrito, provincia, dirección, referencia, `coordenadas {lat,lng}`, `mapsUrl`, `whatsapp` (solo dígitos con código 51), `mensajeWhatsapp`, `horario` (lista de días con apertura y cierre o cerrado), `redes {tiktok, instagram, facebook}`, `dominio`, `calificacion` (opcional, solo si es real).
  - `servicios` (`src/content/servicios.json`): `grupo` (`el` | `ella`), `nombre`, `precio` (número), `precioDesde` (booleano), `duracionMin`, `descripcion`, `destacado`, `orden`.
  - `galeria` (`src/content/galeria.json`): `imagen` (con `image()`, archivos en `src/assets/galeria/`), `alt` (obligatorio), `categoria` (`el` | `ella` | `local`).
  - `resenas` (`src/content/resenas.json`): `texto`, `autor` (nombre e inicial), `estrellas`. Puede estar vacía.
  - `faq` (`src/content/faq.json`): `pregunta`, `respuesta`.
- Datos de ejemplo **sintéticos** en esos archivos (con marcadores), iguales a los de la maqueta.
- `src/styles/tema.css`: tokens como variables CSS en `@theme` (fondo, superficie, línea, texto, suave, apagado, acento, sobre-acento) con la paleta **arena** como predeterminada y las paletas `botella` y `moka` comentadas, para cambiar en una línea cuando el cliente elija (P-20).
- Fuentes Anton y Manrope servidas localmente (paquetes `@fontsource`), `font-display: swap`.
- `src/lib/whatsapp.ts`: función pura `enlaceWhatsApp(numero, mensaje)` que arma `https://wa.me/<numero>?text=<codificado>`, con pruebas unitarias (Vitest).
- `src/layouts/Base.astro` mínimo con `<html lang="es-PE">`, título y descripción desde `negocio`.

**No incluye:** secciones de la página (TASK-002 a 005), SEO completo (TASK-006), panel (TASK-009).

## Archivos afectados

`package.json`, `astro.config.mjs`, `tsconfig.json`, `.nvmrc`, `eslint.config.js`, `.prettierrc`, `src/content.config.ts`, `src/content/*.json`, `src/styles/tema.css`, `src/lib/whatsapp.ts`, `src/lib/whatsapp.test.ts`, `src/layouts/Base.astro`, `src/pages/index.astro` (vacía con el layout).

## Restricciones

- Dependencias solo: astro, @astrojs/check, tailwindcss, @tailwindcss/vite, @fontsource/anton, @fontsource/manrope, eslint (+ plugins de Astro/TS), prettier (+ plugins), vitest. Cualquier otra requiere ADR.
- Ningún dato del negocio fuera de `src/content/`.

## Criterios de aceptación

1. `npm run check` pasa sin errores ni advertencias.
2. Un JSON de contenido inválido (precio como texto, foto sin `alt`) hace fallar el build con un mensaje claro.
3. Cambiar la paleta en `tema.css` cambia los colores de toda la página.

## Pruebas requeridas

`npm run check`, `npx vitest run` (casos: número con espacios, mensaje con tildes y `&`, número vacío → error). Prueba manual del criterio 2 anotada.

## Documentación a actualizar

`README.md` (cómo instalar y ejecutar), `docs/ARCHITECTURE.md` (versiones reales).

## Resultados reales y pendientes

Implementación técnica terminada para revisión en `web/task-001-proyecto-base`.

- Archivos: configuración de Astro estático, TypeScript estricto, Node 22,
  ESLint y Prettier; `package.json` y lockfile; cinco colecciones y JSON;
  imagen SVG sintética en assets; layout e índice vacío; tema y tres paletas;
  helper y pruebas de WhatsApp; README y versiones en ARCHITECTURE.
- `npm ci --no-audit --no-fund`: 411 paquetes instalados desde el lockfile.
- `npm run check`: aprobado; `astro check` con 0 errores, 0 advertencias,
  0 hints; ESLint sin advertencias; build estático de una página.
- `npm run format:check` y `git diff --check`: aprobados.
- `npx vitest run`: 1 archivo y 7 pruebas aprobadas (espacios, tildes y `&`,
  vacío y otros números inválidos).
- Criterio 2, prueba manual con archivos temporariamente modificados:
  precio `"gratis"` → build exit 1, `precio: Expected type "number", received "string"`;
  galería sin `alt` → build exit 1, `alt: Required`.
  Se restauraron ambos JSON y el build volvió a pasar.
- `npm run dev -- --host 0.0.0.0 --port 4322` y
  `npm run preview -- --host 0.0.0.0 --port 4321`: arranque verificado;
  HTTP 200, idioma `es-PE`, título y descripción desde contenido.
- Chromium a 375 y 1280 px: revisión de capturas y DOM sin desbordamiento;
  página vacía según alcance. Cambio de una línea del import de paleta,
  build y navegador: arena `rgb(23, 21, 19)`, botella `rgb(16, 28, 24)`,
  moka `rgb(32, 23, 19)`. Se restauró arena y se recompiló.
- Lighthouse móvil sobre preview de producción, con Chromium headless:
  ejecutado, exit 1 `NO_FCP` (no hay contenido visible). Performance,
  Accessibility, Best Practices y SEO: **sin puntuación válida**.
  Informe completo conservado en `/tmp/lighthouse-base.json` de este entorno.
  Volver a medir cuando se implemente contenido visible; no se añadieron
  secciones ni texto de relleno para forzar una puntuación.
- Fuentes locales: Anton y Manrope, variantes Latin 400 con `font-display: swap`.

Pendientes para revisión:

- La maqueta es privada; no se pudo verificar que los ejemplos coincidan con
  ella. El usuario volvió a compartir la especificación de TASK-001, sin sus
  datos. Se dejaron marcadores explícitos, dos servicios sintéticos, una imagen
  sintética y cero reseñas; este punto no se declara aprobado.
- Sustituir datos sintéticos antes de publicar: teléfono, coordenadas, precios,
  duraciones y todos los marcadores. Horario pendiente como lista vacía.
- Lighthouse y revisión visual del diseño completo corresponden a las secciones
  posteriores; la base vacía no valida el diseño ni el SEO final.
