# TASK-009 — Panel de edición (Pages CMS)

## Objetivo
Que el desarrollador cambie precios, servicios, fotos y horario desde el celular, sin tocar código, cuando el cliente lo pida.

## Contexto
ADR-0003 aceptada: Pages CMS, **lo usa el desarrollador** (no el cliente). Depende de TASK-001 (colecciones) y de que el proyecto de Cloudflare Pages publique al hacer push a `main` (TASK-008; mientras tanto, probar sobre una rama de vista previa).

## Requisitos
**Incluye**
- `.pages.yml` en la raíz con:
  - `media`: `src/assets/galeria` (entrada y salida coherentes con las rutas que espera `image()` de Astro).
  - `servicios`: lista con `grupo` (selección él/ella), `nombre`, `precio` (número, obligatorio), `precioDesde`, `duracionMin`, `descripcion`, `destacado`, `orden`.
  - `galeria`: lista con `imagen` (subida), `alt` (obligatorio), `categoria`, `par`.
  - `negocio`: solo `horario` y `mensajeWhatsapp` (el resto no se edita desde el panel).
- Los campos y nombres del panel coinciden con los esquemas Zod de `src/content.config.ts`; un dato que el esquema rechace no puede guardarse desde el panel, y si llega a guardarse, el build falla con un mensaje claro y la web publicada sigue en la versión anterior.
- Nota de uso en `docs/DEPLOYMENT.md`: entrar, cambiar un precio, subir una foto, deshacer un cambio desde el historial de GitHub.

**No incluye:** acceso del cliente, edición de textos de diseño o de secciones.

## Archivos afectados
`.pages.yml`, `docs/DEPLOYMENT.md`.

## Restricciones
- Sin servicios de pago ni dependencias nuevas en el proyecto.
- Fotos subidas sin datos de ubicación (EXIF GPS): documentar cómo quitarlos antes de subir, o comprobar que Astro no los publica.

## Criterios de aceptación
1. Desde un celular, cambiar el precio de un servicio en el panel lo muestra en la vista previa publicada en menos de 5 minutos.
2. Subir una foto de 4 MB la publica optimizada (≤ 200 KB) con su `alt`.
3. Un precio vacío no se puede guardar.
4. Revertir el último cambio desde GitHub restaura la web anterior.

## Pruebas requeridas
Los 4 criterios ejecutados en una rama de vista previa, con fecha y capturas; comprobación de que la imagen publicada no conserva el GPS.

## Documentación a actualizar
`docs/DEPLOYMENT.md`, `CLAUDE.md` (estado).

## Resultados reales y pendientes
_(Codex y desarrollador)_
