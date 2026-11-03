# TASK-011 — Animaciones y profundidad visual

## Objetivo
Mejorar la personalidad visual con portada por capas, tarjetas con perspectiva y apariciones escalonadas.

## Aprobación
El dueño aprobó la propuesta en la conversación del 2026-11-02 («/agents si»).

## Requisitos y restricciones
- CSS y JavaScript mínimo; sin nuevas dependencias ni WebGL.
- Tarjetas con perspectiva que responde al ratón y acabado dorado.
- Portada con profundidad y entradas suaves; galería conserva las apariciones.
- Retirar «Pausar franja»: movimiento inicial menor de cinco segundos y luego estático.
- Respetar reducción de movimiento, navegación por teclado y contenido sin JS.
- Mantener los presupuestos y datos de negocio existentes.

## Criterios y pruebas
Lint, tipos, build, pruebas existentes; revisión a 375 y 1280 px, sin JS y con reducción de movimiento; Lighthouse móvil ×3.

## Resultados reales y pendientes
Implementada el 2026-11-02 en `web/task-011-animaciones-profundidad`. Pendiente de revisión del Arquitecto. Sin publicación ni merge.

### Archivos cambiados
- `Portada.astro`: marco decorativo en capas, degradado y sello con profundidad.
- `TarjetaServicio.astro`: superficies con degradado dorado, brillo al interactuar y separación del pie.
- `animaciones.css`: entradas escalonadas y animación de perspectiva en portada; se libera el transform al terminar la entrada para permitir interacción 3D.
- `aparecer.ts`: perspectiva de las tarjetas según posición del ratón, solo con puntero fino y movimiento permitido; reinicio al salir o cambiar preferencias.
- `Franja.astro`: retirado control de pausa; animación finita de 4,5 segundos, sin repetición, estática con movimiento reducido.
- TASK-007 conserva la solicitud inicial como historial; esta tarea contiene su aprobación. Evidencias en `docs/diseno/resultados/task-011/`.

### Comandos y resultados
- Rama creada con `git switch -c web/task-011-animaciones-profundidad`; requirió permiso porque `.git` es de solo lectura en el sandbox.
- Node 22.23.4. `npm run check`: código 0 tras la corrección final; tipos con 0 errores/advertencias/hints, lint limpio, build de dos páginas, 44/44 pruebas.
- `npm run format:check` y `git diff --check`: código 0.
- Servidor: `python3 -m http.server 4337 --bind 127.0.0.1 --directory dist`; apertura de puerto autorizada fuera del sandbox.
- `node /tmp/barberia-011-qa.mjs`: código 0 con Chromium instalado y autorizado fuera del sandbox. A 375 y 1280 px, sin desborde, sin errores JS, sin elementos de aparición ocultos tras recorrer la página. Franja terminada tras cinco segundos, texto «Pausar franja» ausente. Matriz 3D comprobada al mover el ratón sobre tarjeta. Al cambiar a movimiento reducido, cero animaciones activas. Sin JS, contenido visible.
- Capturas 375 y 1280 guardadas y revisadas visualmente; estructura y textos legibles, sin solapamientos. Corrección final de perspectiva verificada con nuevas capturas.
- Lighthouse 13.6.0 móvil sobre build final, tres ejecuciones consecutivas mediante `npm exec --yes --package=lighthouse -- lighthouse` con Chromium headless: ver puntuaciones y métricas en `resumen-lighthouse-mobile.json`. Mediana Performance/Accessibility/Best Practices/SEO: **100/100/100/100**. JavaScript comprimido: **1745 bytes**, inferior a 30 KB. Transferencia medida inferior a 500 KB.

### Pendientes y límites
- Sin Android físico disponible: no se declara probado en dispositivo real.
- Fotos, logo original y video siguen pendientes; no se inventaron ni sustituyeron por imágenes ajenas. Repetir rendimiento con archivos definitivos.
- Permanecen los avisos previos de dominio pendiente y colecciones FAQ/reseñas vacías.
- Sin nuevas dependencias de aplicación, cambios del stack o datos del negocio.


### Corrección solicitada por el dueño (2026-11-02)
El dueño indica que la franja se detuvo y los efectos eran demasiado discretos.
Autoriza continuar el ajuste visual: se reemplaza la franja finita por movimiento
continuo y un control de icono compacto, sin el texto «Pausar franja». Se incorpora
un poste decorativo con volumen, órbita, bandas móviles y flotación 3D visible en
celular y escritorio. Tarjetas con capas en profundidad y entrada táctil más
marcada. Sin nuevas dependencias ni WebGL. Las mediciones anteriores corresponden
a la versión previa; se repiten las verificaciones tras esta corrección.


Verificación de la corrección:
- `npm run check`: código 0, tipos 0 errores/advertencias/hints, lint y build
  correctos, 44/44 pruebas. `npm run format:check` y `git diff --check`: código 0.
- `node /tmp/barberia-011-qa.mjs`: código 0 en Chromium. A 375 y 1280 px,
  franja en ejecución tras cinco segundos, escultura con matriz distinta al
  comparar dos instantes, pausa global funcional (0 animaciones activas), reducción
  de movimiento con 0 animaciones, contenido visible sin JS y sin errores JS.
- Se detectó y corrigió desborde de las capas 3D con contención en portada y
  perspectiva explícita en capas de tarjetas. Sin desbordes en la verificación final.
- Nuevas capturas de 375 y 1280 px guardadas y revisadas: poste visible, sin
  solapamientos de texto; el elemento es decorativo y queda oculto a lectores.
- Lighthouse móvil 13.6.0 repetido ×3 sobre esta versión: **100/100/100/100**
  en las tres ejecuciones. El JSON de resumen y capturas ahora corresponden a la
  corrección; sustituyen las evidencias previas de franja finita.
- Continúan los límites de contenido pendiente y falta de Android físico.
