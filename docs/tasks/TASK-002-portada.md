# TASK-002 — Cabecera, portada, franja y botón flotante

## Objetivo
Construir la parte de arriba de la página como en la maqueta: lo primero que ve un cliente desde el celular.

## Contexto
Depende de TASK-001. Referencia visual: artboards «Tu web · celular» y «Tu web · computadora» de la maqueta. Público unisex.

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
_(Codex)_
