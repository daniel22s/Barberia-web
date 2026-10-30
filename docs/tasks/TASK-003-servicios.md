# TASK-003 — Servicios y precios

## Objetivo

Mostrar los servicios «Para él» y «Para ella» desde `servicios.json`, cada uno con un enlace a WhatsApp con el servicio ya escrito.

## Contexto

Depende de TASK-001. Referencia: sección «Elige tu estilo» de la maqueta. Los precios los cambia el desarrollador con el panel (TASK-009), así que todo sale del contenido.

## Requisitos

**Incluye**

- `Servicios.astro`: título, dos grupos (`el`, `ella`) en el orden de `orden`; un grupo sin servicios no se muestra.
- `TarjetaServicio.astro`: nombre, precio con formato `S/ 25` (o `desde S/ 90` si `precioDesde`), duración legible («40 min», «2 h»), descripción y enlace «Pedir este →».
- Tarjeta `destacado`: estilo resaltado con la etiqueta «El más pedido» (como en la maqueta). Si hay más de un destacado, se resaltan todos y el build muestra una advertencia.
- Mensaje de WhatsApp por servicio: «Hola, vi su web y quiero reservar: {nombre}».
- `src/lib/formato.ts`: `formatearPrecio` y `formatearDuracion`, puras, con pruebas.

**No incluye:** reservas, carrito ni pagos.

## Archivos afectados

`src/components/Servicios.astro`, `TarjetaServicio.astro`, `src/lib/formato.ts`, `src/lib/formato.test.ts`, `src/pages/index.astro`.

## Restricciones

- Sin JavaScript en el cliente para esta sección.
- Precios como número en el contenido; nunca escritos en el componente.

## Criterios de aceptación

1. Cambiar un precio en `servicios.json` cambia la web sin tocar código.
2. Cuadrícula de 1 columna en móvil, 2 en tableta y 3 en escritorio.
3. Cada «Pedir este» abre WhatsApp con el nombre correcto del servicio.

## Pruebas requeridas

`npm run check`; Vitest de `formato.ts` (25 → «S/ 25», 12.5 → «S/ 12.50», 90 desde → «desde S/ 90», 40 → «40 min», 120 → «2 h», 90 → «1 h 30 min»).

## Documentación a actualizar

Ninguna.

## Resultados reales y pendientes

Implementado en rama independiente desde `origin/main` (0125f35).

- Componentes Servicios y TarjetaServicio; utilidades puras de formato y pruebas;
  integración aislada de la sección en el índice. Sin nuevas dependencias.
- `npm run check`: tipos 0 errores/advertencias/hints, lint y build pasan.
  `npm test`: 23 pruebas pasan (7 de WhatsApp y 16 de formato).
- Chromium a 375, 390, 768 y 1280 px: sin desborde; columnas 1/1/2/3;
  enlaces WhatsApp con número y mensaje exactos por servicio; HTML sin scripts.
- Datos temporales (restaurados): seis servicios, dos destacados, precios decimales
  y orden inverso. Build muestra la advertencia por múltiples destacados y ambos
  se resaltan. `12.5` produce `S/ 12.50` sin cambiar componentes; orden comprobado.
  Otro build con un solo grupo confirma que el grupo vacío se omite.
- Capturas revisadas: [390 px](../diseno/resultados/task-003/390.png),
  [1280 px](../diseno/resultados/task-003/1280.png).
- Lighthouse móvil: Performance 100, Accessibility 100, Best Practices 96,
  SEO 100. El 404 de `favicon.ico` explica Best Practices; favicon corresponde
  al SEO posterior. Informe de esta ejecución: `/tmp/lh003.json`.

Integración pendiente: esta rama conserva los dos servicios sintéticos y las
paletas de main. Los nueve ejemplos y ajustes de paleta están en TASK-002;
no se copiaron para mantener ambas ramas nacidas de main. Al integrar ambas,
el índice debe conservar cabecera/portada/franja, añadir Servicios dentro de main
tras Franja y mantener BotonWhatsApp. Se espera conflicto del índice al fusionarlas.
Los datos reales siguen pendientes (P-22); no publicar los marcadores.

## Revisión del Arquitecto (2026-10-30)

**Aceptada.** Reproducido por Claude con Node 22.23.4 sobre la integración de TASK-002 + TASK-003 (rama `web/integracion-002-003`; el único conflicto fue `src/pages/index.astro`): `npm run check` 0 errores / 0 advertencias / lint limpio / build OK, **23/23** pruebas, Prettier limpio. Navegador a 390 y 1280 px: sin desborde horizontal, un solo `<h1>`, 12 enlaces de WhatsApp, ningún control < 44 px. Precio, duración y enlace por servicio salen de `servicios.json`; «desde S/ 90» y «2 h» correctos; grupos vacíos no se muestran.

Observación (no bloquea): el nombre del servicio se ve en peso normal; en la maqueta va en negrita (800) → ajustar en TASK-007.
