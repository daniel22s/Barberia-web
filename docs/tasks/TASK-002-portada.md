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
