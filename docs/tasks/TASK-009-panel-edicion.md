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
**Preparación local, no aceptada todavía.** Codex, 2026-10-31 (hora de Lima).
El dueño indicó que aún no hay Pages CMS/Cloudflare conectados y pidió preparar
y validar localmente. No se publicó ni se modificó `main`.

### Base y archivos

- `git rebase main` en el worktree `../barberia-task-009`, rama
  `web/task-009-panel-edicion`: código 0, sin conflictos; base actual `4476402`.
- `.pages.yml`: servicios y galería como archivos JSON de lista raíz; incluye
  `id` para conservar los identificadores que requiere `file()` de Astro, también
  al crear entradas. Campos obligatorios, selecciones con los valores de Zod,
  mínimos numéricos y patrones de texto/horas. Precio admite cero y decimales;
  duración y orden usan `step: 1`. `par` es opcional con sus dos hijos obligatorios
  cuando se completa. No se cambia ningún esquema ni dato del negocio.
- Medios: `input: src/assets/galeria`, `output: ../assets/galeria`. Se comprobó
  ida y vuelta con la función real de imágenes de Pages CMS y la resolución de
  Astro. `settings.content.merge: true` preserva todas las claves de negocio
  fuera de `horario` y `mensajeWhatsapp`, los únicos campos de ese formulario.
- `docs/DEPLOYMENT.md`: acceso, selección de rama, edición, subida/alt/pares,
  eliminación de GPS antes de subir, validaciones y restauración desde GitHub.
- `CLAUDE.md`: estado y límites de esta preparación. Evidencias de la página
  local en `docs/diseno/resultados/task-009/`; no son capturas del panel CMS.

### Validaciones ejecutadas

Node **22.23.4**, npm **10.9.9**; herramientas externas instaladas solo en `/tmp`.
No se añadieron dependencias al proyecto ni se cambiaron `package.json`/lockfile.

- `npm ci --offline --cache /home/cyber-jose/.npm --logs-dir /tmp/barberia-npm-logs --no-audit --no-fund`:
  código 0, 412 paquetes. La instalación externa de utilidades de prueba requirió
  red después de no encontrar `date-fns` en la caché; no afecta al lockfile.
- `node /tmp/barberia-task009-qa/validate-cms.mjs`: código 0. YAML válido frente
  al `ConfigSchema` oficial y normalizado por el código real de Pages CMS
  **2.1.8**, commit `6f4e860a35d934406580287e7042e5e111e207a1`, consultado desde
  su repositorio oficial. Se ejecutaron sus validadores de campos, funciones de
  imagen y el merge usado al guardar. Contenido actual válido; precio ausente o
  negativo y textos con solo espacios rechazados; cero y decimales admitidos;
  par vacío admitido y par a medias rechazado; datos no editables preservados,
  incluyendo las coordenadas reales; horario sustituido sin fusionar índices.
  **Detectó la conversión de precio vacío a cero que se detalla más abajo.**
- `node /tmp/barberia-task009-qa/build-fixtures.mjs`: código 0 en la ejecución
  final, con procesos de build autorizados fuera del sandbox. Una imagen sintética
  JPEG de **5076913 bytes (≥ 4 MB)**, 2400×3200, con GPS confirmado mediante el
  puntero IFD GPS del EXIF, genera **8 variantes AVIF/WebP**, máximo **15263 bytes**.
  Ninguna conserva EXIF, XMP o IPTC; por tanto no contienen el GPS del original.
  El HTML refleja el precio temporal `S/ 31.50` y el alt de la foto.
- Pruebas negativas de build: precio `""` en el JSON, alt con solo espacios,
  horario abierto sin apertura/cierre y duración `10.5` generan código distinto
  de cero y señalan el campo inválido. Una primera imagen sintética de ruido
  extremo produjo una variante de **678324 bytes** y el hook rechazó el build
  por superar 200000 bytes, como corresponde. No todas las imágenes grandes se
  garantizan por debajo del límite: reducirlas si el presupuesto las rechaza.
  Los JSON originales se restauraron en `finally` y se eliminó la foto de prueba.
- `npm run check` tras restaurar el contenido: **código 0**. Astro: 0 errores,
  advertencias e hints de tipos; ESLint limpio; build de dos páginas;
  **32/32 pruebas** en cuatro archivos. Persiste el aviso previo del build de
  colección `resenas` vacía, independiente de esta configuración.
- `npm run format:check` y `npx --no-install prettier --check .pages.yml`:
  **código 0**. El segundo comprueba el YAML, que no forma parte del script actual.
- `npm run preview -- --host 127.0.0.1 --port 4329` y
  `node /tmp/barberia-task009-qa/browser.mjs`: **código 0**, Chromium a **375 y
  1280 px**, capturas revisadas, sin desbordamiento, errores JavaScript ni
  peticiones externas; la fixture ya no está en la compilación. Es la página
  Astro con el contenido original, no una prueba del panel de Pages CMS.
- Lighthouse **13.6.0**, móvil y throttling simulado sobre `127.0.0.1:4329`:
  **Performance 100 / Accessibility 100 / Best Practices 96 / SEO 100**.
  Comando: `node /tmp/barberia-task005-qa/node_modules/lighthouse/cli/index.js
  http://127.0.0.1:4329 --chrome-flags='--headless --no-sandbox --disable-dev-shm-usage'
  --only-categories=performance,accessibility,best-practices,seo --output=json`.
  El 96 corresponde al 404 de `/favicon.ico`, previo a esta tarea. Resumen y
  evidencias locales guardados en `docs/diseno/resultados/task-009/`.
- `git diff --check`: código 0. Ningún cambio final en `src/`.

### Límite del precio vacío — criterio 3 sin aprobar

El [validador oficial de number](https://github.com/pagescms/pagescms/blob/6f4e860a35d934406580287e7042e5e111e207a1/fields/core/number/index.tsx)
usa una unión cuya segunda rama contiene `z.coerce.number()`. Con `required: true`
y `min: 0`, el valor `""` termina aceptado como **0**, pese al rechazo de la primera
rama. Reproducido con su función `schema` y su generador de formularios/esquemas.
El build rechaza `precio: ""` directo, pero acepta el cero ya transformado; no
puede recuperar la intención del usuario. No se declara protegido ese caso.

Pendiente verificar una corrección en la instancia real o recibir una decisión
del Arquitecto. No se sube el precio mínimo a 1, no se cambia el tipo numérico por
texto y no se instala un CMS propio: cambiarían las reglas o el alcance aprobado.
La configuración normal de número obligatorio queda preparada mientras se
resuelve esta limitación. `step: 1` tampoco es una garantía de integridad del
servidor CMS: Zod sigue rechazando enteros inválidos durante el build.

### Aceptación publicada pendiente

1. Cambio de precio desde celular y publicación < 5 minutos: **no ejecutado**,
   falta integración CMS/hosting y URL de vista previa.
2. Subida desde el panel de una foto de 4 MB, alt y variantes ≤ 200 KB:
   **pendiente en hosting**. Optimización y ausencia de GPS comprobadas localmente
   con una imagen sintética de tamaño superior al requerido.
3. Impedir guardar precio vacío: **no aprobado**, limitación reproducida arriba.
4. Reversión desde el historial de GitHub y restauración publicada: **no ejecutada**.
   Restaurar fixtures locales no equivale a esa prueba.

No se registran capturas de un panel inexistente ni tiempos de despliegue
estimados como si fueran mediciones. Además de las fuentes de `DEPLOYMENT.md`,
se consultaron las guías de
[listas JSON](https://pagescms.org/docs/configuration/content/list/),
[media](https://pagescms.org/docs/configuration/media/) y
[preservación de claves con merge](https://pagescms.org/docs/configuration/settings/).

## Revisión del Arquitecto (2026-10-31)

**Aceptada en local**, con una corrección del Arquitecto. Los criterios 1, 2 y 4 se ejecutan cuando Pages CMS y Cloudflare estén conectados (TASK-008); hasta entonces no se declaran aprobados.

**Decisión: precio mínimo S/ 1** (resuelve el criterio 3). Ningún servicio real cuesta S/ 0, y el validador de Pages CMS 2.1.8 convierte un precio vacío en 0. Cambios:
1. `.pages.yml`: `precio` con `min: 1`.
2. `src/content.config.ts`: `precio: z.number().min(1, "El precio mínimo es S/ 1.")`, para que panel y esquema coincidan.
3. `docs/DEPLOYMENT.md`: la guía dice «mínimo S/ 1» y el límite queda documentado como resuelto.

Verificaciones ejecutadas por Claude con Node 22.23.4:
- Validador real de Pages CMS (`6f4e860`, script de Codex con la configuración nueva): precio `""`, `0`, `0.5` y `"0"` **rechazados**; `15` y `20.5` aceptados.
- Build con un servicio a precio 0: **falla** con `precio: El precio mínimo es S/ 1.`; JSON restaurado después.
- `npm run check`: `astro check` 0 errores / 0 advertencias / 0 hints, lint limpio, build de 2 páginas, **32/32** pruebas. `format:check` limpio; `.pages.yml` pasa Prettier. `git diff --check` limpio.
- Revisión de `.pages.yml`: campos y opciones coinciden con Zod; el formulario de negocio solo edita `horario` y `mensajeWhatsapp`, y `merge: true` conserva el resto (dirección, Maps, coordenadas). Sin secretos ni dependencias nuevas.

Se aceptan por el informe de Codex (no repetidos): optimización de la foto sintética de 5 MB (máximo 15 263 bytes, sin EXIF/GPS), pruebas negativas del build, navegador y Lighthouse.

Pendiente en el hosting (TASK-008): criterio 1 (precio desde el celular, menos de 5 minutos), criterio 2 (foto de 4 MB subida desde el panel) y criterio 4 (reversión desde GitHub), con fecha, rama y capturas.
