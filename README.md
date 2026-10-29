# Barbería Web

Página web de catálogo de **Vektra Hair Studio** (Mi Perú, Callao): servicios y precios, trabajos, reseñas, ubicación, horario y botón de WhatsApp. Diseño moderno, pensada primero para el celular y para aparecer en las búsquedas locales de Google.

**Estado:** base técnica de TASK-001 implementada para revisión. Stack aprobado en [ADR-0001](docs/DECISIONS/ADR-0001-stack.md). Las secciones se construyen en las tareas siguientes.

**Maqueta visual:** https://claude.ai/artifact/Hndx8FYZznfbKXcbiQXPWp (privada; se comparte desde su menú _Share_).

## Documentos

| Documento                                    | Para qué sirve                                           |
| -------------------------------------------- | -------------------------------------------------------- |
| [CLAUDE.md](CLAUDE.md)                       | Reglas del proyecto y estado para retomar el trabajo     |
| [AGENTS.md](AGENTS.md)                       | Instrucciones para Codex (ejecutor)                      |
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | Alcance: qué incluye y qué no, criterios de aceptación   |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack propuesto, estructura y presupuesto de rendimiento |
| [docs/SEO.md](docs/SEO.md)                   | Cómo aparecer en Google (y qué no se puede prometer)     |
| [docs/CONTENT.md](docs/CONTENT.md)           | Lista del contenido que entrega el cliente               |
| [docs/COSTS.md](docs/COSTS.md)               | Precio del desarrollo y gastos de funcionamiento         |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)     | Publicación, dominio y entrega de cuentas                |
| [docs/ROADMAP.md](docs/ROADMAP.md)           | Etapas, entregables y pruebas                            |
| [docs/QUESTIONS.md](docs/QUESTIONS.md)       | Preguntas pendientes para el cliente                     |
| [docs/TOOLS.md](docs/TOOLS.md)               | Herramientas, cuentas y skills recomendados              |
| [docs/DECISIONS/](docs/DECISIONS/)           | Decisiones de arquitectura (ADR)                         |
| [docs/tasks/](docs/tasks/)                   | Tareas para Codex, una por archivo                       |

## Relación con el sistema de reservas (SaaS)

Esta web es un proyecto aparte y más pequeño. Si más adelante se contrata el sistema de reservas, el botón «Reservar» pasa de WhatsApp al sistema y esta web se conserva.

## Desarrollo local

Requiere Node **22.23.4** (`.nvmrc`) y npm. Desde la raíz del repositorio:

```sh
nvm install
nvm use
npm ci
npm run dev
```

`npm run check` ejecuta tipos (`astro check`), lint y compilación estática.
`npm test` ejecuta Vitest. `npm run build` genera `dist/` y `npm run preview`
sirve esa compilación. `npm run format:check` comprueba el formato con Prettier.
Astro 7 inicia preview en segundo plano: `npm run preview -- stop` lo detiene.
En entornos restringidos se puede definir `ASTRO_TELEMETRY_DISABLED=1`.

El contenido reside en `src/content/*.json`, con validación en
`src/content.config.ts`. Las listas usan identificadores `id` estables;
`negocio.json` es un objeto único y se consulta con el ID `principal`.
Las reseñas permanecen vacías hasta disponer de testimonios reales autorizados.
La galería contiene solo una imagen SVG sintética, fuera de la página por ahora.

Los marcadores `[ASÍ]`, el teléfono de prueba, las coordenadas `0, 0`,
los precios `0` y las duraciones `1` son datos sintéticos; **no publicar**
sin reemplazarlos. El horario vacío significa pendiente, no cerrado.
No se ha contrastado el contenido con la maqueta privada.

Los tokens están en `src/styles/tema.css`. Cambiar `arena` por `botella` o `moka`
en su import de paleta cambia todos los tokens de color. Anton y Manrope se sirven
localmente con `font-display: swap`. La portada queda vacía deliberadamente,
como pide TASK-001; todavía no representa el diseño final ni permite medir
Lighthouse con contenido visible.
