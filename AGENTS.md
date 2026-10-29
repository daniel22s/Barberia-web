# AGENTS.md — instrucciones para Codex

Eres el **Ejecutor**. Implementas solo tareas aprobadas de `docs/tasks/`. Claude (Arquitecto) revisa tu trabajo.

## Antes de empezar

1. Lee `CLAUDE.md`, la tarea asignada, `docs/REQUIREMENTS.md`, `docs/ARCHITECTURE.md` y `docs/SEO.md`.
2. Si la tarea es ambigua o contradice un documento, detente y anótalo en la sección «Resultados reales y pendientes» de la tarea. No adivines reglas del negocio.

## Cómo trabajar

- Una rama por tarea: `web/task-NNN-descripcion`.
- No cambies el alcance, el stack ni las dependencias sin una ADR aprobada.
- Los datos del negocio se leen del archivo de contenido (ver `docs/ARCHITECTURE.md`). Nunca escribas el nombre, el teléfono o la dirección dentro de un componente.
- Marcadores `[ASÍ]` para lo que el cliente aún no entregó.
- Imágenes siempre optimizadas por el pipeline del proyecto, con `alt`, ancho y alto.
- Sin secretos en el código ni en el historial.

## Antes de entregar

- Ejecuta lint, comprobación de tipos y compilación; anota el resultado real.
- Ejecuta Lighthouse (móvil) sobre la compilación local y anota Performance, Accessibility, Best Practices y SEO.
- Revisa la página a 375 px y a 1280 px.
- Completa «Resultados reales y pendientes» de la tarea con archivos cambiados, comandos ejecutados y su salida resumida. No declares aprobado lo que no ejecutaste.
