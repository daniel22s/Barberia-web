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
_(Codex)_
