# Roadmap

| Etapa | Objetivo | Entregables | Depende de | Aceptación y pruebas |
|---|---|---|---|---|
| **W0. Acuerdo** | Cerrar alcance y precio | Respuestas de `QUESTIONS.md`, opción A o B de `COSTS.md`, ADR-0001 aprobada, 50 % inicial | Cliente | Alcance aprobado por escrito |
| **W1. Contenido y diseño** | Diseño final con datos reales | Maqueta actualizada con logo, colores, fotos y servicios reales | Contenido de `CONTENT.md` | El cliente aprueba la maqueta (ronda 1) |
| **W2. Construcción** | Web funcionando en vista previa | TASK-001 a TASK-005 | W1 | Lint y compilación sin errores; revisión a 375 y 1280 px |
| **W3. SEO y calidad** | Lista técnica de `SEO.md` | TASK-006 y TASK-007 | W2 | Lighthouse móvil ≥ 90/95/95/95; resultados enriquecidos sin errores |
| **W4. Publicación** | Dominio propio y Google | TASK-008, Search Console, guía del perfil de Google | Dominio del cliente | Criterios 1–8 de `REQUIREMENTS.md`; ronda 2 de cambios; 50 % final |

Duración estimada: **2–3 semanas** de trabajo, más lo que tarde el cliente en entregar el contenido (suele ser lo que más retrasa).

## Tareas previstas para Codex (sin crear todavía)

| ID | Objetivo |
|---|---|
| TASK-001 | Proyecto Astro + Tailwind, lint, archivo de contenido y tokens de diseño |
| TASK-002 | Cabecera, portada, franja y botón flotante de WhatsApp |
| TASK-003 | Servicios y precios con enlaces de WhatsApp desde el contenido |
| TASK-004 | Galería optimizada, reseñas y cómo reservar |
| TASK-005 | Ubicación, horario, mapa, llamado final, pie y 404 |
| TASK-006 | SEO técnico: meta, Open Graph, `HairSalon`, FAQ, sitemap, robots |
| TASK-007 | Animaciones, accesibilidad y presupuesto de rendimiento |
| TASK-008 | Publicación en Cloudflare Pages y dominio |

Cada tarea tendrá su archivo en `docs/tasks/` con objetivo, contexto, requisitos, restricciones, criterios, pruebas y resultados.

## Futuro (no incluido)

- Sistema de reservas y panel (SaaS): ver la vista previa en la maqueta.
- Versión en inglés.
- Panel para editar precios y fotos sin ayuda.
- Publicidad pagada local.
