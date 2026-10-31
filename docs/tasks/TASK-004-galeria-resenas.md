# TASK-004 — Cómo reservar, galería y reseñas

## Objetivo
Mostrar los 3 pasos para reservar, los trabajos (fotos de él, de ella y del local) y las reseñas reales.

## Contexto
Depende de TASK-001. Referencia: secciones «Reserva en 3 pasos», «Resultados reales» y «Lo que dicen» de la maqueta, y «Antes y después» de la pantalla de animaciones.

## Requisitos
**Incluye**
- `ComoReservar.astro`: 3 pasos fijos (elige servicio, escríbenos por WhatsApp, llega y luce).
- `Galeria.astro`: fotos de `galeria.json` con `<Picture>` de Astro (AVIF + WebP, `srcset` para 360–1280 px), `loading="lazy"` y `alt` del contenido. Mosaico como la maqueta; tarjeta final «Más en TikTok» con enlace a `redes.tiktok`.
- Filtro opcional Todos / Él / Ella con botones (JavaScript mínimo, `aria-pressed`). Si no hay fotos de una categoría, su botón no aparece.
- `AntesDespues.astro`: comparación con un `<input type="range">` accesible (con etiqueta) sobre dos fotos marcadas en el contenido; si no hay par antes/después, no se muestra. Para esto, agregar a `galeria` el campo opcional `par` (`antes` | `despues`) con un identificador.
- `Resenas.astro`: hasta 3 reseñas de `resenas.json`. **Si está vacío, la sección no se muestra** (nunca reseñas inventadas). Enlace «Ver reseñas en Google» solo si existe la URL en `negocio`.

**No incluye:** carga de reseñas automática desde Google (API de pago), lightbox con librería.

## Archivos afectados
`src/components/ComoReservar.astro`, `Galeria.astro`, `AntesDespues.astro`, `Resenas.astro`, `src/content.config.ts` (campo `par` y URL de reseñas), `src/pages/index.astro`.

## Restricciones
- JavaScript total de esta tarea < 3 KB. Ninguna imagen publicada pesa más de 200 KB.

## Criterios de aceptación
1. Con 20 fotos de 4 MB del celular, la página publicada no pasa de 500 KB al cargar (sin desplazarse).
2. Con `resenas.json` vacío, no aparece la sección ni su título.
3. El comparador se controla con las flechas del teclado.

## Pruebas requeridas
`npm run check`; prueba del criterio 1 con fotos sintéticas grandes (generadas, no reales) y medición en DevTools → Network, anotada.

## Documentación a actualizar
`docs/CONTENT.md` si cambian las indicaciones de fotos.

## Resultados reales y pendientes
Implementación: Codex, 2026-10-31 (America/Lima).

### Base y entrega

Rama `web/task-004-galeria-resenas` creada desde el `main` remoto actualizado,
commit `64c933db635b0350a25351e6e55d3c106805c4cf`. El directorio local previo no
contenía `.git`; el intento de clonación falló al conectar con el proxy 8080.
Por eso no se pudo ejecutar literalmente `git pull`: se recuperó la instantánea
exacta de ese commit mediante el conector GitHub, y el commit y la actualización
de la rama remota se realizan por el mismo conector. No se mezclaron los cambios
locales anteriores de TASK-010 ni se modificó `main`.

### Archivos cambiados

- `src/components/ComoReservar.astro`: tres pasos, enlace a servicios, una columna móvil y tres en computadora.
- `src/components/Galeria.astro`: mosaico responsive de la colección, Picture AVIF/WebP, anchos 360/640/960/1280 sin ampliar originales, alt, dimensiones y lazy loading; tarjeta TikTok desde negocio. El enlace aún pendiente se muestra como marcador sin href inválido. Se omite el filtro opcional para no añadir JavaScript.
- `src/components/AntesDespues.astro`: pares completos, recorte con range nativo etiquetado y foco visible, descripción accesible del valor; no genera sección sin pares.
- `src/components/Resenas.astro`: máximo tres reseñas del contenido; no genera sección ni título con colección vacía. Enlace Google solo con resenasUrl definida.
- `src/lib/galeria.ts`: agrupa pares por identificador, ignora incompletos y rechaza duplicados del mismo lado para evitar comparaciones incorrectas.
- `src/content.config.ts`: par opcional `{ id, tipo: "antes" | "despues" }` y resenasUrl HTTP(S) opcional.
- `src/pages/index.astro`: integra las cuatro secciones después de Servicios.
- `astro.config.mjs` y `scripts/verificar-imagenes.mjs`: comprobación posterior al build; rechaza cualquier imagen publicada que supere 200000 bytes, incluidas variantes optimizadas y archivos public. No añade dependencias.
- `scripts/comprobar-task004.mjs`: verificaciones ejecutables con Node para pares, presupuesto de imágenes y el script real del comparador con controles simulados.
- `docs/CONTENT.md`: formato de fotos, pares, enlaces y presupuesto.

No se añadieron fotos de personas ni reseñas ficticias. La colección de reseñas
continúa vacía; la galería conserva el ejemplo sintético de la base.

### Comandos y resultados reales

- `git clone https://github.com/daniel22s/Barberia-web.git /workspace/barberia-task004`: código 128, fallo al conectar con proxy 8080.
- `node --version`: v24.19.0; el proyecto requiere 22.23.4. Verificación con la versión requerida pendiente.
- `npm ci --cache /tmp/task004-npm-cache --fetch-retries=0 --fetch-timeout=5000`: código 1, EPERM al conectar con el proxy del registro npm; no se pudieron instalar dependencias. También informa EBADENGINE por la versión de Node.
- `npm run check`: código 127, astro no encontrado. No se ejecutó el chequeo de tipos ni las fases siguientes.
- `npm run lint`: código 127, eslint no encontrado.
- `npm run build`: código 127, astro no encontrado.
- `node scripts/comprobar-task004.mjs`: código 0. Pares vacíos, fotos sin par, incompletos, orden invertido y duplicados: OK. Presupuesto: acepta 200000 y rechaza 200001 bytes recursivamente: OK. Script real del comparador: extremos 0/100, valor accesible e independencia de dos instancias: OK. Fuente del script: 462 bytes; esto no es una medición del bundle compilado.

### Pendientes de aceptación (no aprobados)

- Repetir npm ci y npm run check con Node 22.23.4 y conexión al registro.
- Compilación real de Picture, inspección de srcset y medición del JS emitido (<3 KB).
- Generar 20 fotos sintéticas de 4 MB y medir la carga inicial sin desplazamiento en DevTools Network (<500 KB). Esta prueba no se ejecutó: no hay compilación local. Lazy loading y el límite individual no demuestran por sí solos ese presupuesto inicial.
- Verificar el DOM compilado con resenas.json vacío y con más de tres entradas sintéticas; se implementó la condición, pero no se pudo probar el renderizado de Astro.
- Probar flechas, Home/End y lector de pantalla sobre el range en navegador. La prueba con controles simulados no sustituye esta revisión.
- Revisión y capturas a 375, 390 y 1280 px: no ejecutadas.
- Lighthouse móvil sobre build local: no ejecutado; Performance, Accessibility, Best Practices y SEO sin medición.

La implementación queda para revisión; la aceptación completa de TASK-004 está
pendiente de estas pruebas. No se declaran aprobadas verificaciones bloqueadas.


## Revisión del Arquitecto (2026-10-31)

**Aceptada con correcciones del Arquitecto** en la misma rama (Codex no pudo compilar por falta de acceso a npm):

1. **El build fallaba** (`exit 1`): la galería pasaba la imagen de ejemplo SVG por `<Picture>` con AVIF/WebP (`UnsupportedImageFormat`). Ahora un SVG se publica tal cual con `<Image>`; las fotos reales siguen con AVIF/WebP.
2. **La galería no respetaba el orden del archivo**: `getCollection` ordena por `id` (1, 10, 11… 2). Se añadió `ordenarComoArchivo()` en `src/lib/galeria.ts`, usado en la galería y el comparador, para seguir el orden de `galeria.json` (el que edita el panel). Pruebas Vitest nuevas en `src/lib/galeria.test.ts`.
3. Prettier: 7 archivos sin formato; formateados.

Verificaciones de Claude con Node 22.23.4: `npm ci`, `npm run check` 0 errores / 0 advertencias / lint limpio / build OK, **27/27** pruebas, Prettier limpio. Con **20 fotos sintéticas JPEG de 3000×4000 (≈6,6 MB c/u)** y un par antes/después (no versionadas): build OK en ~65 s; la variante publicada más pesada pesa 188 KB (< 200 KB); **carga inicial a 390 px sin desplazar: 133 KB** (< 500 KB) con 1 imagen; tras recorrer la página, 473 KB y 9 imágenes (carga diferida funcionando); JS emitido como archivo: 0 bytes (el script del comparador va en línea). Comparador: flechas y `End` llevan a 100 y `aria-valuetext` se actualiza. Sin desborde a 390 y 1280 px. Con `resenas.json` vacío no aparece la sección. Lighthouse se mide en TASK-007.

Observaciones (no bloquean):
- `scripts/comprobar-task004.mjs` usa `stripTypeScriptTypes` (experimental en Node 22) y no corre en `npm run check`; las pruebas útiles ya están en Vitest. Puede eliminarse en TASK-007.
- Las fotos del par antes/después también aparecen en la galería (decisión de Codex, aceptada).
- Filtro Todos/Él/Ella no implementado (era opcional).
