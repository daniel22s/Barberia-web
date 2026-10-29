# ADR-0003 — Panel para editar precios y fotos

- **Estado:** aceptada por el dueño (2026-10-29), con un cambio: **el panel lo usa el desarrollador**. El cliente pide los cambios y el desarrollador los hace desde el panel, sin tocar código.
- **Fecha:** 2026-10-29

## Contexto

El cliente quiere cambiar él mismo los precios y las fotos (P-10). La web es estática (ADR-0001) y no tiene base de datos. Necesitamos edición sencilla desde el celular, sin costo mensual y sin perder rendimiento ni SEO.

## Decisión

**Pages CMS** (open source y gratuito): un panel web que edita los archivos de contenido del repositorio.

- Se entra con la cuenta de GitHub del desarrollador (después, de quien mantenga la web) y solo se ve lo que se configure: **servicios (nombre, precio, duración, descripción)**, **galería de fotos** y, si se quiere, **horario**.
- Al guardar, el cambio queda en el repositorio y Cloudflare Pages vuelve a publicar la web en 1–2 minutos.
- Las fotos se suben a `src/assets/galeria/` y Astro las optimiza al compilar (AVIF/WebP en varios tamaños). Se puede subir la foto tal como sale del celular.
- Validaciones en el esquema: precio numérico, campos obligatorios y texto alternativo de cada foto.

## Alternativas

| Opción | Por qué no (por ahora) |
|---|---|
| Decap CMS | Necesita un pequeño servidor OAuth propio en Cloudflare: más piezas que mantener |
| Keystatic | Integración muy buena con Astro, pero la configuración con GitHub es más larga; buena segunda opción |
| Sanity / Contentful | Servicio externo con su propia cuenta y límites; más de lo que se necesita |
| WordPress | Hosting de pago, mantenimiento y menor rendimiento |
| Panel propio con Supabase | Es construir parte del sistema SaaS; fuera de alcance |

## Consecuencias

- Costo mensual S/ 0. El cliente no necesita cuenta de GitHub (P-21 ya no aplica).
- Suma unas 5 h: configuración, esquema, prueba en celular y una nota de uso en `DEPLOYMENT.md`.
- Riesgo: que suba fotos muy pesadas o muchas. Mitigación: mantener la galería en 15–30 fotos y Astro limita el peso publicado.
- Riesgo: que borre un servicio por error. Mitigación: GitHub guarda el historial y cualquier cambio se puede revertir.
