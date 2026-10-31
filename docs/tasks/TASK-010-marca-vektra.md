# TASK-010 — Marca Véktra: paleta negro y dorado y logo provisional

## Objetivo
Aplicar a la web la marca elegida por el cliente: paleta **negro y dorado** y el logotipo **VÉKTRA / HAIR STUDIO**.

## Contexto
P-20 resuelta (2026-10-31): negro y dorado, los colores de su logo y su portada de WhatsApp. Referencia: `docs/diseno/maqueta/capturas/celular-vektra.png` y `computadora-vektra.png`, valores en `docs/diseno/maqueta/README.md`. El archivo original del logo aún no llega (P-23).

## Requisitos
**Incluye**
- `src/styles/paletas/vektra.css` con: fondo `#0B0B0B`, superficie `#161514`, línea `#2A2826`, texto `#F5F1E8`, suave `#D6D0C4`, apagado `#A39D92`, acento `#C9A23A`, sobre-acento `#0B0B0B`, `color-scheme: dark`. Activarla en `tema.css` (las demás paletas quedan como alternativas comentadas).
- `src/components/Logo.astro`: si existe `src/assets/logo.svg` o `logo.png`, lo muestra con `alt` = nombre del negocio; si no, el logotipo de texto «VÉKTRA» (Syncopate 700, espaciado) con «HAIR STUDIO» pequeño y espaciado debajo, centrado, como en la maqueta. Usarlo en la cabecera y en el pie.
- Fuente Syncopate 700 servida localmente (`@fontsource/syncopate`, solo latin 700). Es la única dependencia nueva permitida.
- `negocio.json`: `nombre` = «Véktra Hair Studio» (con tilde; P-17 por confirmar, pero así figura en su logo).
- Contraste ≥ 4.5:1 de texto, suave y apagado sobre fondo y superficie, y de sobre-acento sobre acento; anotar los valores calculados.

**No incluye:** cambiar el diseño de las secciones.

## Archivos afectados
`src/styles/paletas/vektra.css`, `src/styles/tema.css`, `src/components/Logo.astro`, `src/components/Cabecera.astro`, `src/content/negocio.json`, `src/layouts/Base.astro` (fuente), `package.json` y `package-lock.json`.

## Restricciones
- El nombre del negocio dentro del logo de texto sale de `negocio.json` (en mayúsculas por CSS no; el texto «VÉKTRA» y «HAIR STUDIO» se derivan del nombre o se definen en el contenido, nunca escritos sueltos en otros componentes).

## Criterios de aceptación
1. La página se ve en negro y dorado como `celular-vektra.png` a 390 px y `computadora-vektra.png` a 1280 px.
2. Al poner un `src/assets/logo.png` de prueba, la cabecera lo muestra sin tocar código; al quitarlo, vuelve el logotipo de texto.
3. `npm run check` limpio.

## Pruebas requeridas
`npm run check`; capturas a 390 y 1280 px; prueba del criterio 2 con una imagen sintética (no el logo real) anotada.

## Documentación a actualizar
`docs/ARCHITECTURE.md` (paleta activa y dependencia nueva).

## Resultados reales y pendientes
_(Codex)_
