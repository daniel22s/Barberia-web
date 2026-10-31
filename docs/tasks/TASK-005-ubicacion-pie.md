# TASK-005 — Ubicación, horario, llamado final, pie y 404

## Objetivo
Completar la página: dónde está, cuándo atiende, el llamado final a escribir y el pie.

## Contexto
Depende de TASK-001. Referencia: secciones «Te esperamos», «Tu nuevo look te espera» y pie de la maqueta.

## Requisitos
**Incluye**
- `Ubicacion.astro`: dirección y referencia, horario por día desde `horario` (el día de hoy resaltado en hora de Lima; los días cerrados se marcan como «Cerrado»), botones «Cómo llegar» (`mapsUrl`) y «Escribir por WhatsApp».
- Mapa: **imagen estática** con enlace a Google Maps (no un `iframe` que cargue al abrir la página). Opcional: al tocar «Ver mapa», cargar el `iframe` de Google Maps.
- `LlamadoFinal.astro`: «Tu nuevo look te espera» + botón de WhatsApp.
- `Pie.astro` (**ya existe** desde TASK-010 con el logo: ampliarlo, no crear otro): nombre, redes (solo las que existan en `negocio`), distrito y año actual.
- `src/pages/404.astro` con enlace al inicio, mismo diseño.
- `src/lib/horario.ts`: función pura que devuelve el horario agrupado («Lun – Vie 10:00 – 20:00») y el día actual en `America/Lima`, con pruebas.

**No incluye:** formulario de contacto (no se guardan datos personales).

## Archivos afectados
`src/components/Ubicacion.astro`, `LlamadoFinal.astro`, `Pie.astro`, `src/pages/404.astro`, `src/lib/horario.ts`, `src/lib/horario.test.ts`, `public/mapa.webp` (generado o captura con licencia adecuada), `src/pages/index.astro`.

## Restricciones
- Ningún recurso de terceros (mapas, fuentes, scripts) se carga sin una acción del usuario.

## Criterios de aceptación
1. Cambiar el horario en `negocio.json` cambia la sección y el resumen de la portada.
2. La página no hace ninguna petición a Google al abrirse.
3. La 404 se muestra en una ruta inexistente de la vista previa.

## Pruebas requeridas
`npm run check`; Vitest de `horario.ts` (días agrupados, domingo cerrado, día actual con fecha simulada en UTC vs Lima).

## Documentación a actualizar
Ninguna.

## Resultados reales y pendientes
_(Codex)_
