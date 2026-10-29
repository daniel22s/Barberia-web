# TASK-004 — Cómo reservar, galería y reseñas

## Objetivo
Mostrar los 3 pasos para reservar, los trabajos (fotos de él, de ella y del local) y las reseñas reales.

## Contexto
Depende de TASK-001. Referencia: secciones «Reserva en 3 pasos», «Resultados reales» y «Lo que dicen» de la maqueta, y «Antes y después» de la pantalla de animaciones.

## Requisitos
**Incluye**
- `ComoReservar.astro`: 3 pasos fijos (elige servicio, escríbenos por WhatsApp, llega y luce).
- `Galeria.astro`: fotos de `galeria.json` con `<Picture>` de Astro (AVIF + WebP, `srcset` para 360–1280 px), `loading="lazy"` y `alt` del contenido. Mosaico como la maqueta; tarjeta final «Más en TikTok» con enlace a `redes.tiktok`.
- Filtro opcional Todos / Él / Ella con botones (JavaScript mínimo, `aria-pressed`). Si no hay fotos de una categoría, su botón no aparece.
- `AntesDespues.astro`: comparación con un `<input type="range">` accesible (con etiqueta) sobre dos fotos marcadas en el contenido; si no hay par antes/después, no se muestra. Para esto, agregar a `galeria` el campo opcional `par` (`antes` | `despues`) con un identificador.
- `Resenas.astro`: hasta 3 reseñas de `resenas.json`. **Si está vacío, la sección no se muestra** (nunca reseñas inventadas). Enlace «Ver reseñas en Google» solo si existe la URL en `negocio`.

**No incluye:** carga de reseñas automática desde Google (API de pago), lightbox con librería.

## Archivos afectados
`src/components/ComoReservar.astro`, `Galeria.astro`, `AntesDespues.astro`, `Resenas.astro`, `src/content.config.ts` (campo `par` y URL de reseñas), `src/pages/index.astro`.

## Restricciones
- JavaScript total de esta tarea < 3 KB. Ninguna imagen publicada pesa más de 200 KB.

## Criterios de aceptación
1. Con 20 fotos de 4 MB del celular, la página publicada no pasa de 500 KB al cargar (sin desplazarse).
2. Con `resenas.json` vacío, no aparece la sección ni su título.
3. El comparador se controla con las flechas del teclado.

## Pruebas requeridas
`npm run check`; prueba del criterio 1 con fotos sintéticas grandes (generadas, no reales) y medición en DevTools → Network, anotada.

## Documentación a actualizar
`docs/CONTENT.md` si cambian las indicaciones de fotos.

## Resultados reales y pendientes
_(Codex)_
