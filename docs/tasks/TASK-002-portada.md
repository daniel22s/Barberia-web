# TASK-002 — Cabecera, portada, franja y botón flotante

## Objetivo

Construir la parte de arriba de la página como en la maqueta: lo primero que ve un cliente desde el celular.

## Contexto

Depende de TASK-001. Referencia visual: `docs/diseno/maqueta/capturas/celular-arena.png` y `computadora-arena.png`. Público unisex.

## Requisitos

**Incluye**

- `Cabecera.astro`: logo (archivo en `src/assets/logo.*`, o el nombre en tipografía si aún no llega), nombre, menú con anclas (Servicios, Trabajos, Ubicación) y botón «Reservar por WhatsApp». En móvil, menú desplegable accesible (botón con `aria-expanded`, cierre con Escape).
- `Portada.astro`: etiqueta «Hair studio unisex en {distrito}, {provincia}», `<h1>` grande, párrafo, botón WhatsApp y botón «Ver servicios y precios», datos rápidos (días y hora de apertura desde `horario`; calificación solo si existe en `negocio`), medio principal:
  - foto (`<Image>` de Astro, `loading="eager"`, `fetchpriority="high"`), o
  - video corto `muted autoplay loop playsinline` con `poster`, si existe `src/assets/portada.mp4` (máximo 2 MB).
- `Franja.astro`: lista de estilos en movimiento continuo (CSS), legible y en pausa con `prefers-reduced-motion`.
- `BotonWhatsApp.astro`: botón flotante fijo en móvil, 64 px, con `aria-label`, latido suave (CSS) que se apaga con `prefers-reduced-motion`.
- Todos los enlaces de WhatsApp con `enlaceWhatsApp()`.
- Pendientes de la revisión de TASK-001: cargar Manrope 600/700/800; cada paleta declara su `color-scheme` y `moka` pasa a ser **clara** como en la maqueta (fondo `#EFE7DB`, texto `#2B211C`, acento `#8A5A44`, sobre-acento `#FBF7F1`; contraste ≥ 4.5:1); `npm run check` también ejecuta `npm test`.
- Datos de ejemplo sintéticos para ver el diseño: los servicios de la maqueta (Para él: corte clásico S/ 20 · 30 min, fade S/ 25 · 40 min destacado, corte + barba S/ 35 · 60 min, perfilado de barba S/ 15 · 25 min, diseño S/ 10 · 15 min, corte niño S/ 15 · 30 min; Para ella: corte dama S/ 35 · 45 min, brushing S/ 30 · 40 min, color o mechas desde S/ 90 · 120 min) y un horario de ejemplo Lun–Sáb 10:00–20:00, Dom cerrado. Siguen siendo de ejemplo hasta que lleguen los reales (P-22).

**No incluye:** animaciones de aparición al hacer scroll (TASK-007).

## Archivos afectados

`src/components/Cabecera.astro`, `Portada.astro`, `Franja.astro`, `BotonWhatsApp.astro`, `src/pages/index.astro`.

## Restricciones

- Sin librerías nuevas. JavaScript solo para el menú móvil (< 2 KB).
- Controles ≥ 48 px de alto en móvil. Contraste ≥ 4.5:1 en las tres paletas recomendadas.

## Criterios de aceptación

1. Se ve como la maqueta a 360, 390, 768 y 1280 px, sin desborde horizontal.
2. El botón de WhatsApp abre el número y mensaje de `negocio.json`.
3. Con «reducir movimiento» activado, nada se mueve.
4. El menú móvil se usa solo con teclado.

## Pruebas requeridas

`npm run check`; capturas a 390 y 1280 px adjuntas en el PR; prueba manual de teclado y de «reducir movimiento» (DevTools → Rendering) anotada.

## Documentación a actualizar

Ninguna, salvo desvíos de la maqueta (anotarlos aquí).

## Resultados reales y pendientes

Implementado desde `origin/main` (0125f35), sin nuevas dependencias.

- Componentes de cabecera, portada, franja y botón flotante; contenido de ejemplo,
  Manrope 600/700/800, paletas de la maqueta y `check` con Vitest.
- `npm run check`: tipos 0 errores/advertencias/hints, lint, build y 7 tests pasan.
- Chromium: 360, 375, 390, 768 y 1280 px sin desborde; teclado abre menú,
  Tab llega al primer enlace y Escape cierra y devuelve foco. Emulación de
  movimiento reducido: cero animaciones en ejecución.
- Capturas revisadas: [390 px](../diseno/resultados/task-002/390.png),
  [1280 px](../diseno/resultados/task-002/1280.png).
- Lighthouse móvil: Performance 100, Accessibility 100, Best Practices 96,
  SEO 100. Informe de esta ejecución: `/tmp/lh002.json`.
- Contrastes calculados WCAG: mínimo 7.31 arena, 7.24 botella, 5.36 moka
  entre texto/suave/apagado y fondo, texto/superficie, sobre-acento/acento.
- Menú: script de origen inferior a 2 KB. Sin librerías adicionales.

Pendientes/desvíos: logo y foto reales pendientes; se usa nombre y SVG sintético
optimizado con Image. Vídeo opcional soportado con límite de 2 MB en configuración,
pero no probado con material real. Provincia y teléfono siguen pendientes.
No se inventa calificación ni se muestra si falta. Franja horizontal sin inclinación;
no se incluye etiqueta de atención con cita porque P-03 sigue pendiente.
Las anclas Servicios/Trabajos/Ubicación esperan sus tareas respectivas.
El horario y los nueve servicios son ejemplos autorizados, no datos reales.

## Revisión del Arquitecto (2026-10-30)

**Aceptada.** Reproducido por Claude con Node 22.23.4 sobre la integración de TASK-002 + TASK-003 (rama `web/integracion-002-003`; el único conflicto fue `src/pages/index.astro`): `npm run check` 0 errores / 0 advertencias / lint limpio / build OK, **23/23** pruebas, Prettier limpio. Navegador a 390 y 1280 px: sin desborde horizontal, un solo `<h1>`, 12 enlaces de WhatsApp, ningún control < 44 px. Menú móvil: abre con el botón, `aria-expanded` cambia, Escape lo cierra y devuelve el foco. Pendientes de TASK-001 resueltos (Manrope 600–800, `color-scheme` por paleta, moka clara, tests en `check`). Coincide con la maqueta.

Observaciones (no bloquean):
1. Falta usar `src/assets/logo.*` cuando exista (hoy solo el nombre). Se hace al llegar el logo.
2. Sin JavaScript, el menú móvil no se puede abrir → TASK-007 (criterio «sin JavaScript todo se ve»).
3. El botón flotante usa el color de acento en lugar del verde de WhatsApp de la maqueta. Aceptado: combina con la marca.
4. La franja repite los nombres de todos los servicios; con la lista real conviene revisarla (puede quedar larga).
