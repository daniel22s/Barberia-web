# TASK-015 — Paleta microcemento

## Aprobación y alcance
El dueño elige «color microcemento» el 2026-11-27 tras comparar propuestas. Aplicar la paleta gris cálido/grafito/salvia y el redondeado de botón de 16 px seleccionado. Se conserva estructura, contenido, tipografías, imágenes y funcionamiento; no es una reimplementación completa de la maqueta. Commit a main y publicación según autorización vigente.

## Resultados reales y pendientes
En ejecución. Paleta clara con acento salvia oscurecido para conservar contraste. Recursos SEO e iconos pasan a leer la paleta activa; no quedan fijados al dorado anterior. Sin nuevas dependencias.

## Verificación real — 2026-11-27
- `npm run check` (Node 22.23.4): tipos 0 errores/advertencias/hints, lint limpio, build correcto y 44/44 pruebas. `npm run format:check` y `git diff --check`: correctos.
- Arranque de Wrangler dev local (4338). El primer intento de navegador/Lighthouse falló porque el servidor anterior ya no estaba activo; se inició y se repitió satisfactoriamente.
- Chromium a 375 y 1280: fondo rgb(223,220,214), color-scheme light, botones de 16 px, nueve servicios y dos trabajos, imágenes cargadas, sin desbordes ni errores JS. Capturas de inicio y página completa revisadas visualmente en docs/diseno/resultados/task-015/.
- Lighthouse móvil sobre la compilación local: Performance 100 / Accessibility 100 / Best Practices 100 / SEO 100. Auditoría de contraste correcta. Sin Android físico.
- Archivos: nueva paleta, tema, radios de Cabecera/Portada/Ubicacion/LlamadoFinal, sombra más ligera en TarjetaServicio, generador de recursos SEO y documentación. No se alteran datos comerciales ni dependencias.
