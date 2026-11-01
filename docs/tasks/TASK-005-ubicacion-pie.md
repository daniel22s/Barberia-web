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
Implementado por Codex el 2026-10-31 en el worktree `barberia-task-005`, rama
`web/task-005-ubicacion-pie`, desde `d249da8`. Sin cambios de dependencias.

### Archivos y comportamiento

- `src/components/Ubicacion.astro`: dirección y referencia desde contenido,
  horario diario, «Cerrado», WhatsApp y enlaces de Maps cuando `mapsUrl` es HTTP(S).
  Mientras siga pendiente, muestra el marcador sin generar un enlace inválido.
  Resalta «Hoy» en hora de Lima al abrir y al recuperar la pestaña; lo actualiza
  cada 30 segundos, sin depender del día de compilación. Sin JavaScript el horario
  completo sigue disponible, sin un resaltado que pudiera quedar desactualizado.
- `src/lib/horario.ts` y `horario.test.ts`: funciones puras con fecha explícita,
  expansión del formato existente `Lun–Sáb`, orden y agrupación de días
  consecutivos con iguales horas. Rechaza días desconocidos, duplicados y rangos
  invertidos. Cinco pruebas nuevas, incluidos domingo cerrado y medianoche Lima.
- `src/components/Portada.astro`: usa el mismo resumen agrupado del contenido.
- `src/components/LlamadoFinal.astro` e `index.astro`: llamado final y nuevas
  secciones con el tema negro/dorado existente.
- `src/components/Pie.astro`: amplía el pie existente y conserva `Logo.astro`;
  nombre, distrito, año de Lima y solo redes con URL HTTP(S), sin marcadores.
  El año se actualiza también en el navegador al abrir o recuperar la pestaña.
- `src/content.config.ts`, `negocio.json` y `Galeria.astro`: redes individuales
  opcionales, compatibilidad de TikTok ausente y `horarioNota` opcional.
  Se agrega `[HORARIO REAL PENDIENTE DE CONFIRMAR]` porque P-24 sigue pendiente;
  no se cambian las horas de ejemplo existentes.
- `src/pages/404.astro`: misma marca y colores, un h1 y enlace al inicio.
- `src/assets/mapa-provisional.svg` y `public/mapa.webp`: ilustración original
  CC0 de una cuadrícula y un pin, sin inventar calles ni coordenadas. WebP de
  5608 bytes generado con Sharp disponible en el árbol instalado; `Image` de Astro
  lo optimiza nuevamente al compilar (5548 bytes), con alt, dimensiones y carga
  diferida. Marcado explícitamente como mapa pendiente. No se implementa el
  iframe opcional ni se incorporan imágenes de terceros.
- `docs/diseno/resultados/task-005/`: capturas de inicio y 404 en ambos anchos,
  y resumen de la auditoría móvil final.

### Comandos y resultados reales

Entorno de validación: Node **22.23.4**, npm **10.9.9**. Se seleccionó el binario
de `.nvm` porque el shell abría con Node 20.

- `npm ci --offline --cache /home/cyber-jose/.npm --logs-dir /tmp/barberia-npm-logs --no-audit --no-fund`:
  código 0, 412 paquetes instalados. El intento inicial con caché vacía y red
  restringida se interrumpió; la caché local permitió instalar el lockfile.
- `npx --no-install prettier --write src` y formato puntual tras ajustes: OK.
- `npm run check`: **código 0**, Astro sin errores, advertencias ni hints de tipos;
  ESLint limpio; build de dos páginas y mapa optimizado; **32/32 pruebas** en
  cuatro archivos. El build conserva el aviso previo de colección `resenas`
  vacía. El primer check detectó que TikTok podía estar ausente tras hacer las
  redes opcionales; corregido con `?? ""` en Galeria.
- `npm run format:check`: **código 0**, todos los archivos comprobados formateados.
  Se corrigió también el ajuste de formato detectado tras quitar un aria-label.
- `npm run preview -- --host 127.0.0.1 --port 4321`: compilación local servida.
  Vista previa y Chromium ejecutados con permisos de red/proceso del entorno.
- Playwright externo, `/tmp/barberia-task005-qa/browser.mjs`: **código 0**.
  A **375 y 1280 px**: sin desbordamiento horizontal ni errores JavaScript,
  **cero peticiones externas**, sin iframe, y redes pendientes omitidas.
  Con reloj simulado en `2026-11-02T04:59:50Z` y navegador en `Asia/Tokyo`,
  resalta domingo en Lima y cambia a lunes al avanzar 30 segundos.
  `/ruta-inexistente-task-005` devuelve **HTTP 404**, muestra el diseño propio
  y «Volver al inicio» navega a `/`. Capturas revisadas visualmente; las de la
  portada conservan el lunes de la simulación.
- Playwright externo, `/tmp/barberia-task005-qa/content.mjs`: **código 0**.
  Modificación temporal de `negocio.json`, build y navegador: `Lun–Vie`
  09:30–18:30 se refleja en portada y ubicación, sábado cerrado, solo Instagram
  configurado aparece, y ambos enlaces Maps conservan la URL del contenido.
  Incluso con Maps válido se observan **cero peticiones externas** al abrir y
  desplazar. El script restaura el contenido original en `finally` y ejecuta
  nuevamente `check` y `format:check`; las fixtures no están versionadas.
- Lighthouse **13.6.0**, móvil con throttling simulado sobre la compilación local:
  **Performance 100 / Accessibility 100 / Best Practices 96 / SEO 100**.
  Ejecutado con `node /tmp/barberia-task005-qa/node_modules/lighthouse/cli/index.js
  http://127.0.0.1:4321 --chrome-flags='--headless --no-sandbox --disable-dev-shm-usage'
  --only-categories=performance,accessibility,best-practices,seo --output=json`.
  Herramienta instalada solo en `/tmp`, fuera de las dependencias del proyecto.
  Auditoría repetida tras corregir el nombre accesible del logo del pie;
  `label-content-name-mismatch` queda aprobado. El 96 corresponde a la petición
  automática de `/favicon.ico` sin archivo (404), previa a esta tarea.
- `git diff --check`: código 0.

### Pendientes del contenido y límites

P-18 y P-24 siguen pendientes: dirección/referencia exactas, enlace Maps y horario
real. También faltan las URLs de redes y la imagen cartográfica real con licencia
adecuada. Reemplazar el WebP provisional al recibir esos datos y quitar la nota
de horario al confirmarlo. No se inventaron estos datos ni se sustituyeron los
marcadores de WhatsApp u otros contenidos pendientes de tareas anteriores.
La imagen provisional no pretende representar la geografía del local.

Favicon y demás trabajo SEO de TASK-006/TASK-007 quedan fuera de este alcance.
La aceptación comercial y la revisión del Arquitecto siguen pendientes; las
mediciones anteriores corresponden al contenido provisional de esta rama.

## Revisión del Arquitecto (2026-10-31)

**Aceptada**, con una corrección del Arquitecto en la misma rama:
1. `public/mapa.webp` → `src/assets/mapa.webp`. Se importaba desde `public/`, así que la compilación publicaba una copia sin usar en `dist/mapa.webp` además de la optimizada por `Image`. Ahora solo sale `_astro/mapa.*.webp`.

Verificaciones ejecutadas por Claude con Node 22.23.4 (antes y después de la corrección): `npm ci` (412 paquetes), `astro check` 0 errores / 0 advertencias / 0 hints, lint limpio, build de 2 páginas, **32/32** pruebas, Prettier limpio. **Criterio 2:** el HTML compilado no tiene `iframe` ni recursos externos; los únicos enlaces externos son de `wa.me`, y solo se abren cuando la persona los toca. **Criterio 1:** cubierto por las pruebas de `horario.ts`; la portada y la ubicación usan la misma función `obtenerHorario`. La prueba con navegador que hizo Codex se aceptó por su informe y las capturas (375 px revisada: coincide con la maqueta). La 404 y Lighthouse no se repitieron aquí; Lighthouse se mide en TASK-007.

Observaciones (no bloquean):
- El `alt` del mapa y su `figcaption` repiten el mismo marcador; al recibir el mapa real (P-26), el `alt` debe describir la ubicación y el `figcaption` puede quitarse.
- Dirección real (P-18) cargada en `negocio.json` durante la revisión: Av. Ayacucho, Mz. A10, Lote 20; referencia «3.er piso»; Mi Perú, Callao.
- Falta `favicon.ico`: lo resuelve TASK-006.
- El aviso de colección `resenas` vacía sigue apareciendo hasta que haya reseñas reales con permiso.
