# TASK-012 — Servicios confirmados y fotos de referencia

## Aprobación y alcance
Solicitud directa del dueño en el chat del 2026-11-26: los nueve servicios y precios enviados por el cliente, agrupados por categoría; sin duración y con una foto de referencia por servicio. Esta aprobación sustituye la duración y los grupos por género de TASK-003. Sin cambios de stack ni dependencias.

## Criterios
Nueve tarjetas con precios confirmados y WhatsApp correcto; tres categorías; sin duraciones inventadas; imágenes de referencia identificadas, alt y dimensiones, optimizadas por Astro. Panel alineado con el contenido.

## Resultados reales y pendientes
En ejecución. Pendiente revisión del Arquitecto, sin merge ni publicación.

### Implementación
- Rama `web/task-012-servicios-reales`, creada desde la rama actual TASK-011; incorpora ese trabajo previo pendiente de revisión. Sin merge, push ni publicación.
- Archivos: `servicios.json` (nueve servicios y precios confirmados; sin duración ni descripciones inventadas), `content.config.ts`, `Servicios.astro`, `TarjetaServicio.astro`, `ComoReservar.astro`, `.pages.yml`. Categorías: cortes y experiencias, textura y color, cuidado facial. Ningún servicio se declara «El más pedido» sin confirmación.
- Nueve fotos generadas por ImageGen, marcadas «Imagen de referencia», con alt, dimensiones, lazy loading, AVIF/WebP responsivos y fallback WebP. Copias en `src/assets/galeria/servicio-*.webp`; procedencia en `docs/diseno/resultados/task-012/imagenes.md`. No son trabajos del negocio ni se agregan a su galería.
- Documentos alineados: REQUIREMENTS, ARCHITECTURE, DEPLOYMENT, QUESTIONS y CLAUDE. Logo original perdido; sigue el logotipo de texto.

### Verificación real (2026-11-26)
- Node 22.23.4. `npm run check`: tipos 0 errores/advertencias/hints, lint limpio, build correcto y 44/44 pruebas existentes.
- `npm run format:check` y `git diff --check`: correctos.
- Preparación de imágenes: primer intento de conversión falló por ruta antigua de Sharp, corregida a su módulo instalado. Primera compilación falló por imagen todavía ausente; después se detectó fallback PNG de 315959 bytes. Se estableció fallback WebP y la compilación final cumple el límite de 200000 bytes por imagen. Sin nuevas dependencias.
- `python3 -m http.server 4337 --bind 127.0.0.1 --directory dist`; `/tmp/barberia-012-qa.mjs` con Playwright y Chromium instalado: 375/1280 px, nueve tarjetas y fotos cargadas, nueve leyendas, sin duración, sin desbordes ni errores JS, WhatsApp correcto para cada servicio. Se corrigió la ruta del ejecutable de Chromium del entorno antes de ejecutar la prueba satisfactoria. Capturas completas revisadas visualmente y guardadas junto a `navegador-local.json`.
- Lighthouse CLI móvil sobre compilación local: Performance 100, Accessibility 100, Best Practices 100, SEO 100. Resumen guardado en `resumen-lighthouse-mobile.json`.

### Pendientes
Revisión del Arquitecto, integración y publicación. No se probó en Android físico ni el panel conectado. Permanecen horario real, dominio, redes, fotos reales de trabajos/portada y preguntas frecuentes pendientes. Las referencias generadas no sustituyen estos contenidos.

## Continuación aprobada — horario, redes y video (2026-11-26)
El dueño entrega horario real, tres redes, reconfirma WhatsApp y propone el video del inicio. Se continúa la misma actualización de contenido en la rama actual, conservando el trabajo previo.

### Cambios
- `src/content/negocio.json`: Lun–Sáb 10:00–21:00; Dom 11:00–18:00 (Lima). Eliminado el marcador `horarioNota`; el horario real también alimenta JSON-LD. WhatsApp ya coincidía. Redes confirmadas; Instagram sin parámetro de compartición y TikTok con HTTPS. El identificador de Facebook se conserva.
- Video original proporcionado: https://www.tiktok.com/@vektra.hairstudio/video/7701151190154743047 . Descargado con yt-dlp del perfil indicado, formato H.264/AAC 576×1024, 1798423 bytes, duración medida en navegador 37.95 s. Archivo local `src/assets/portada.mp4`, inferior al máximo existente de 2 MB, sin servicio externo ni iframe.
- `src/assets/portada.webp`: fotograma del propio video extraído con ffmpegthumbnailer y convertido mediante Sharp, 14632 bytes. `portadaAlt` describe la imagen real; procedencia guardada en `videoPortadaUrl` y enlace a TikTok en portada. `src/content.config.ts` valida la nueva URL opcional.
- `Portada.astro`: controles nativos, reproducción al pulsar, `preload="none"`, sin autoplay. Conserva el formato vertical dentro del marco, sin recorte; con movimiento reducido queda la imagen estática. Se omite la escultura decorativa sobre el video. No depende del script de autoplay de TASK-007.
- `docs/QUESTIONS.md`, `docs/SEO.md` y `CLAUDE.md`: horario confirmado y redes recibidas. Siguen faltando fotos de galería, dominio y las demás respuestas indicadas en QUESTIONS.

### Comandos y comprobaciones
- La herramienta web no pudo abrir TikTok; yt-dlp sí obtuvo la publicación y el formato compatible. Se conserva el original remoto; solo se descargó el video pedido. ffmpegthumbnailer avisó que una búsqueda temporal falló y usó el primer fotograma, revisado visualmente.
- `npm run check` con Node 22.23.4: tipos, lint, build y 44 pruebas correctos. `npm run format:check` y `git diff --check`: correctos.
- `/tmp/barberia-012-followup-qa.mjs` con Chromium: a 375 y 1280 px, horario de lunes y domingo exacto, tres redes, sin desbordes ni errores JS; cero peticiones MP4 antes de interacción. Reproducción iniciada mediante clic en control nativo en ambos anchos; con movimiento reducido el video no se muestra.
- Se detectó durante la revisión visual que la imagen vertical alargaba la portada en escritorio y se corrigieron las dimensiones CSS del marco antes de la entrega.
- Capturas, datos estructurados y pruebas de navegador en `docs/diseno/resultados/task-012/horario-redes-video/`.

### Límites
Sin Android físico, publicación ni merge. El video contiene texto incrustado; TikTok no entregó una pista de subtítulos independiente y no se declara validada su transcripción completa. El horario y redes dejan de ser pendientes; las fotografías de trabajos para la galería siguen pendientes.
- `src/scripts/aparecer.ts`: el video manual se pausa al activar movimiento reducido, sin iniciar reproducción automática. Una prueba intermedia detectó conflicto de especificidad CSS en esa preferencia; corregido con `.medio video` dentro de la media query. La comprobación final incluye el cambio de preferencia durante reproducción.

Lighthouse móvil final con video manual: performance 100, accessibility 100, best-practices 100, seo 100. LCP 1.2 s. Total size was 276 KiB. Resumen guardado junto a las nuevas capturas.
