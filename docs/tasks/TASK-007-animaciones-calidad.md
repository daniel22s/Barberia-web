# TASK-007 — Animaciones, accesibilidad y rendimiento

## Objetivo

Dar el movimiento de la pantalla «Así se mueve la web» de la maqueta sin perder velocidad ni accesibilidad.

## Contexto

Depende de TASK-002 a 005. Sin 3D completo (WebGL) por decisión de arquitectura: solo efectos ligeros en CSS.

## Requisitos

**Incluye**

- Aparición suave al entrar en pantalla (titulares, tarjetas, fotos) con `IntersectionObserver` y clases CSS; el contenido es visible si JavaScript no carga.
- Inclinación 3D ligera en tarjetas de servicio al pasar el mouse o tocar (CSS `perspective`/`transform`; en móvil, solo una vez al aparecer).
- Transiciones de botones y enlaces.
- `prefers-reduced-motion: reduce` desactiva todo movimiento (incluidos franja, latido y video: se muestra el `poster`).
- Revisión de accesibilidad: foco visible, orden de tabulación, contraste en la paleta elegida, `alt`, etiquetas, `lang`.
- Presupuesto de `docs/ARCHITECTURE.md`: JS ≤ 30 KB, portada ≤ 500 KB, LCP < 2,5 s.
- De la revisión de TASK-002/003: menú móvil usable sin JavaScript (por ejemplo, `<details>` o el menú visible por defecto que el script oculta) y nombre del servicio en negrita como en la maqueta.

**No incluye:** librerías de animación (GSAP, Motion, Three.js, Spline).

## Archivos afectados

`src/scripts/aparecer.ts`, `src/styles/animaciones.css`, componentes de TASK-002 a 005 (solo clases).

## Restricciones

- Animar solo `transform` y `opacity`. Nada de saltos de diseño (CLS < 0,1).

## Criterios de aceptación

1. Lighthouse móvil (vista previa, modo incógnito): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100.
2. Con «reducir movimiento», nada se mueve.
3. Sin JavaScript, todo el contenido se ve.

## Pruebas requeridas

`npm run check`; Lighthouse móvil ×3 (anotar la mediana); prueba manual de los criterios 2 y 3; prueba en un Android real si está disponible (anotar modelo).

## Documentación a actualizar

`docs/ARCHITECTURE.md` si cambia el presupuesto.

## Resultados reales y pendientes

Implementación local de Codex, **2026-10-31, hora de Lima**. Rama
`web/task-007-animaciones-calidad`, creada desde `main` (`b65afbe`), con el
árbol inicialmente limpio. Pendiente de revisión del Arquitecto.

### Archivos y comportamiento

- `src/scripts/aparecer.ts` y `src/styles/animaciones.css`: apariciones con
  `IntersectionObserver`, una sola vez por elemento; el HTML permanece visible
  sin JavaScript o sin soporte del observador. Solo se animan `transform` y
  `opacity`. Inclinación de tarjetas al pasar el mouse con puntero fino; en
  pantallas táctiles, una sola inclinación al entrar. Transiciones de enlaces y
  botones; el elemento enfocado no espera la animación para ser visible.
- `Servicios.astro`, `ComoReservar.astro`, `Galeria.astro`, `AntesDespues.astro`,
  `Resenas.astro`, `Ubicacion.astro`, `LlamadoFinal.astro` y `Portada.astro`:
  clases de aparición en titulares y fotos. `TarjetaServicio.astro`: clases de
  aparición/inclinación y nombres con Manrope 800.
- `Cabecera.astro`: menú móvil nativo `details`/`summary`, usable con teclado,
  pantalla táctil y sin JavaScript. El script solo añade cierre al elegir un
  enlace y con Escape, devolviendo el foco al control. El menú de escritorio y
  el móvil comparten el marcado generado; CSS oculta la variante que no toca.
  Se descartó durante QA una primera mejora que colapsaba el menú al cargar JS:
  una medición detectó CLS 0,378. El menú nativo evita ese cambio de altura.
- `Franja.astro`: control nativo «Pausar franja», también funciona sin JS.
  `Portada.astro`: poster por el pipeline de Astro, controles de pausa del video
  y fuente activada solo con JS y movimiento permitido. Al reducir movimiento
  se pausa y oculta el video, dejando la imagen estática. Sin JS tampoco reproduce.
- `Base.astro`, `index.astro` y `404.astro`: importación de estilos/script y
  enlace «Saltar al contenido» con destino enfocable. Reglas globales de foco
  para enlaces, botones, summary y controles; la reducción de movimiento anula
  animaciones y transiciones, incluida franja y latido, desde la primera carga
  y al cambiar la preferencia durante la visita.
- Evidencias en `docs/diseno/resultados/task-007/`. No se cambiaron contenido
  del negocio, dependencias, lockfile ni presupuesto de arquitectura.

### Comandos y pruebas reales

Entorno: Node **22.23.4**, npm **10.9.9**, activados añadiendo
`~/.nvm/versions/node/v22.23.4/bin` a `PATH`. Herramientas de auditoría ya
instaladas fuera del proyecto; no se instalaron dependencias nuevas.

- `git switch -c web/task-007-animaciones-calidad main`: código 0. El sandbox
  inicial tenía `.git` de solo lectura; la ejecución autorizada creó la rama.
- `npm run check`: código 0 sobre la versión final. Astro: **0 errores,
  0 advertencias y 0 hints** de tipos; ESLint limpio; build de dos páginas;
  Vitest **44/44 pruebas** en cinco archivos. Los avisos sobre dominio pendiente
  y colecciones FAQ/reseñas vacías son los ya existentes.
- `npm run format:check`: código 0, formato correcto.
- `python3 -m http.server 4337 --bind 127.0.0.1 --directory dist`: servidor de
  la compilación local, HTTP 200. Se utilizó Chromium headless en contextos
  nuevos con Playwright para las comprobaciones de navegador.
- `node /tmp/barberia-task007-qa/browser.mjs`: **375 y 1280 px**, contenido
  visible sin JS, menú nativo usable sin JS, enlace de salto, Escape/foco en
  móvil, aparición sin repetición al volver a la sección e inclinación con
  mouse/táctil. Reducción de movimiento inicial y dinámica sin animaciones en
  ejecución ni inclinación al pasar el mouse. Franja pausable incluso sin JS.
  Sin desbordes, errores JS ni peticiones a terceros; `lang="es-PE"`, todas las
  imágenes con alt y dimensiones. También se desactivó `IntersectionObserver`:
  el contenido siguió visible. Capturas con/sin JS guardadas y revisadas.
- `node /tmp/barberia-task007-qa/video.mjs`: código 0. MP4 sintético temporal
  de 64×64, 1,2 s, compilado con `Portada.astro`: reproducción normal, pausa
  manual mediante API del navegador, pausa/ocultación al reducir movimiento y
  reanudación al permitirlo. Con reducción inicial o sin JS: imagen visible y
  video pausado/oculto. Se repitió con un MP4 de ruido mayor de 4 KB para evitar
  el embebido de Vite: petición MP4 y reproducción efectiva en modo normal,
  **cero peticiones MP4** con reducción inicial o sin JS. Poster del pipeline
  comprobado. Fixture retirada y build normal restaurado
  en `finally`; no se añadió un video sintético al repositorio.
- Contraste de los tokens de texto sobre fondo/superficie y negro sobre dorado:
  **mínimo 6,77:1**, superior a 4,5:1. Datos en `contraste.json`.
- `node /tmp/barberia-task007-qa/lighthouse.mjs`: código 0. Lighthouse **13.6.0**,
  móvil con throttling simulado y perfil nuevo de Chromium por ejecución,
  **tres mediciones consecutivas sobre la compilación final**:

  | Ejecución   | Performance | Accessibility | Best Practices | SEO     | LCP          | CLS       |
  | ----------- | ----------- | ------------- | -------------- | ------- | ------------ | --------- |
  | 1           | 100         | 100           | 100            | 100     | 1.204 ms     | 0,020     |
  | 2           | 100         | 100           | 100            | 100     | 1.203 ms     | 0,020     |
  | 3           | 100         | 100           | 100            | 100     | 1.204 ms     | 0,020     |
  | **Mediana** | **100**     | **100**       | **100**        | **100** | **1.204 ms** | **0,020** |

  Transferencia total registrada: **131.470 bytes (128,4 KiB)**, inferior al
  presupuesto inicial de 500 KB. TBT 0 ms en las tres. JavaScript total gzip
  **1.503 bytes**, sumando todos los scripts ejecutables inline del HTML
  compilado (Astro no emitió archivos JS externos); JSON-LD excluido por ser
  datos. Presupuesto de 30 KB cumplido sin cambiarlo. Resumen con fechas UTC
  equivalentes al 2026-10-31 en Lima, puntuaciones y métricas en
  `resumen-lighthouse-mobile.json`; informes completos en
  `/tmp/barberia-task007-qa/lighthouse-details-{1,2,3}.json`.

- `git diff --check`: código 0.

### Límites y pendientes

- **Android real:** no disponible en esta sesión; no se declara probada la web
  en un teléfono físico. La emulación táctil de Chromium no sustituye esa prueba.
- La revisión visual se hizo sobre capturas y las interacciones se comprobaron
  con Playwright. Queda para el Arquitecto la revisión manual interactiva de los
  criterios 2 y 3 en su navegador.
- Repetir rendimiento al recibir fotos/video definitivos. Los resultados actuales
  usan imágenes provisionales; no garantizan el peso de archivos aún no entregados.
- Siguen los pendientes de contenido y publicación de TASK-006/008 (teléfono,
  dominio, logo/fotos originales y horario confirmado). No se publicaron cambios
  ni se hizo push o merge a `main`.

## Revisión del Arquitecto (2026-10-31)

**Aceptada en local** con tres correcciones del Arquitecto:

1. **Foco invisible en los botones dorados (WCAG 2.4.7).** La regla global de
   `animaciones.css` usaba `outline: currentColor`; en «Reservar por WhatsApp»
   el contorno salía negro (`#0b0b0b`) a 4 px del botón, sobre el fondo negro.
   Ahora usa `var(--color-acento)`, como `tema.css`; la casilla «Pausar franja»
   (sobre dorado) usa `--color-sobre-acento`. Comprobado con teclado: todos los
   contornos contrastan con su fondo.
2. **Parpadeo al aparecer.** El elemento estaba visible al 12 % y saltaba a
   opacidad 0 al empezar la animación. Ahora el script añade `con-aparicion` a
   `<html>` (solo con JS e `IntersectionObserver`) y el CSS oculta los
   elementos aún no vistos, salvo si tienen el foco. Sin JS, todo sigue visible.
3. **Portada excluida de la ocultación.** Ocultar el titular hasta cargar JS subía
   el LCP a 1,8 s; la portada ya está en pantalla y conserva el comportamiento
   original.

Pruebas del Arquitecto sobre la compilación final: `npm run check` (0 errores,
44/44), `format:check`, Lighthouse 13.6 móvil ×3: **100/100/100/100** en las
tres, LCP 1.203 ms, CLS 0,020, TBT 0, 129 KB. Navegador (Chromium): sin JS
ningún `.aparecer` oculto; con «reducir movimiento» 0 animaciones (también al
cambiar la preferencia durante la visita); tras recorrer la página, 0 de 17
elementos ocultos; menú móvil `details` se abre y se cierra al elegir enlace.

**Pendiente:** prueba en Android real; repetir Lighthouse con fotos y video
definitivos (hoy no hay `portada.mp4`; el video solo se probó con un archivo
sintético). Menor, sin bloquear: la cabecera repite el `nav` (escritorio y
móvil); el oculto está en `display: none` y no llega a lectores de pantalla.
