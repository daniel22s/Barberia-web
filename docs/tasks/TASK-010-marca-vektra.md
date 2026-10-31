# TASK-010 — Marca Véktra: paleta negro y dorado y logo provisional

## Objetivo
Aplicar a la web la marca elegida por el cliente: paleta **negro y dorado** y el logotipo **VÉKTRA / HAIR STUDIO**.

## Contexto
P-20 resuelta (2026-10-31): negro y dorado, los colores de su logo y su portada de WhatsApp. Referencia: `docs/diseno/maqueta/capturas/celular-vektra.png` y `computadora-vektra.png`, valores en `docs/diseno/maqueta/README.md`. El archivo original del logo aún no llega (P-23).

## Requisitos
**Incluye**
- `src/styles/paletas/vektra.css` con: fondo `#0B0B0B`, superficie `#161514`, línea `#2A2826`, texto `#F5F1E8`, suave `#D6D0C4`, apagado `#A39D92`, acento `#C9A23A`, sobre-acento `#0B0B0B`, `color-scheme: dark`. Activarla en `tema.css` (las demás paletas quedan como alternativas comentadas).
- `src/components/Logo.astro`: si existe `src/assets/logo.svg` o `logo.png`, lo muestra con `alt` = nombre del negocio; si no, el logotipo de texto «VÉKTRA» (Syncopate 700, espaciado) con «HAIR STUDIO» pequeño y espaciado debajo, centrado, como en la maqueta. Usarlo en la cabecera y en el pie.
- Fuente Syncopate 700 servida localmente (`@fontsource/syncopate`, solo latin 700). Es la única dependencia nueva permitida.
- `negocio.json`: `nombre` = «Véktra Hair Studio» (con tilde; P-17 por confirmar, pero así figura en su logo).
- Contraste ≥ 4.5:1 de texto, suave y apagado sobre fondo y superficie, y de sobre-acento sobre acento; anotar los valores calculados.

**No incluye:** cambiar el diseño de las secciones.

## Archivos afectados
`src/styles/paletas/vektra.css`, `src/styles/tema.css`, `src/components/Logo.astro`, `src/components/Cabecera.astro`, `src/content/negocio.json`, `src/layouts/Base.astro` (fuente), `package.json` y `package-lock.json`.

## Restricciones
- Los textos del logotipo («VÉKTRA» y «HAIR STUDIO») se definen en `negocio.json` (por ejemplo, `logoTexto` y `logoSubtexto`), nunca escritos dentro de los componentes.

## Criterios de aceptación
1. La página se ve en negro y dorado como `celular-vektra.png` a 390 px y `computadora-vektra.png` a 1280 px.
2. Al poner un `src/assets/logo.png` de prueba, la cabecera lo muestra sin tocar código; al quitarlo, vuelve el logotipo de texto.
3. `npm run check` limpio.

## Pruebas requeridas
`npm run check`; capturas a 390 y 1280 px; prueba del criterio 2 con una imagen sintética (no el logo real) anotada.

## Documentación a actualizar
`docs/ARCHITECTURE.md` (paleta activa y dependencia nueva).

## Resultados reales y pendientes
Implementación: Codex, 2026-10-31, rama `web/task-010-marca-vektra`.

### Archivos cambiados

- `src/styles/paletas/vektra.css` y `src/styles/tema.css`: paleta activa negro y dorado; alternativas comentadas.
- `src/components/Logo.astro`: detección al compilar de `src/assets/logo.svg` o `logo.png` (prioridad SVG), pipeline Image con alt y dimensiones; alternativa de texto desde contenido.
- `src/components/Cabecera.astro`: logo compartido, sin cambios al menú.
- `src/components/Pie.astro` y `src/pages/index.astro`: pie mínimo con el mismo logo. No existía un pie en esta base; redes y demás contenido siguen en TASK-005.
- `src/content/negocio.json` y `src/content.config.ts`: nombre con tilde y campos `logoTexto` / `logoSubtexto` validados.
- `src/layouts/Base.astro`, `package.json`, `package-lock.json`: Syncopate 5.3.0, únicamente latin 700 en la página.
- `docs/ARCHITECTURE.md`: paleta y tercera familia autorizada expresamente por TASK-010.

### Contrastes calculados

Fórmula WCAG de luminancia relativa sRGB, calculada con Python, sin redondear antes de comparar. Todos ≥ 4.5:1.

| Primer plano | Fondo | Relación |
|---|---|---|
| texto | fondo | 17.46:1 |
| texto | superficie | 16.18:1 |
| suave | fondo | 12.82:1 |
| suave | superficie | 11.88:1 |
| apagado | fondo | 7.31:1 |
| apagado | superficie | 6.77:1 |
| sobre-acento | acento | 8.17:1 |

### Comandos y resultados reales

- `git clone`: falló al conectar con el proxy del entorno. Se recuperaron los archivos mediante el conector GitHub y se publican los cambios por ese mismo conector.
- `node --version`: `v24.19.0`; el proyecto requiere Node 22.23.4. Pendiente validación con la versión requerida.
- `npm view @fontsource/syncopate version dist --fetch-retries=0 --fetch-timeout=5000`: falló con `EPERM` al conectar con el proxy. Versión 5.3.0 y licencia Apache-2.0 corroboradas en el repositorio oficial `fontsource/font-files`, `fonts/google/syncopate/package.json`.
- `npm ci --cache /tmp/vektra-npm-cache --fetch-retries=0 --fetch-timeout=5000`: instalación bloqueada por acceso al proxy; no se instalaron las herramientas del proyecto.
- `npm run check`: código 127, `astro: not found`; no se ejecutó la comprobación de tipos.
- `npm run lint`: código 127, `eslint: not found`.
- `npm run build`: código 127, `astro: not found`.
- Python: JSON de contenido válido, coincidencia de dependencias de package.json con la raíz del lock y versión fija de Syncopate: aprobado. Textos del logo ausentes del componente: aprobado. Contrastes: aprobado.

### Pendientes (no aprobados)

- Ejecutar `npm ci` y `npm run check` con Node 22.23.4 y acceso al registro npm. La entrada nueva del lock está fijada a la URL de npm 5.3.0 sin inventar un hash de integridad; regenerar y comprobar con npm cuando haya red.
- Capturas y revisión visual a 390 y 1280 px (además de 375 px exigido por AGENTS.md): no ejecutadas al no poder compilar.
- Prueba del criterio 2 con PNG sintético y comprobación de retorno al texto al quitarlo: no ejecutada. No se incorporó ninguna imagen de prueba al código.
- Lighthouse móvil: no ejecutado; Performance, Accessibility, Best Practices y SEO sin medición.
- Logo original P-23 y confirmación de escritura P-17 siguen pendientes del cliente.

No se declara completada la aceptación de TASK-010 hasta ejecutar estas verificaciones.

