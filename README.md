# Barbería Web

Página web de catálogo de **Vektra Hair Studio** (Mi Perú, Callao): servicios y precios, trabajos, reseñas, ubicación, horario y botón de WhatsApp. Diseño moderno, pensada primero para el celular y para aparecer en las búsquedas locales de Google.

**Estado:** planificación. Todavía no hay código. El stack es una propuesta pendiente de aprobación ([ADR-0001](docs/DECISIONS/ADR-0001-stack.md)).

**Maqueta visual:** https://claude.ai/artifact/Hndx8FYZznfbKXcbiQXPWp (privada; se comparte desde su menú *Share*).

## Documentos

| Documento | Para qué sirve |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Reglas del proyecto y estado para retomar el trabajo |
| [AGENTS.md](AGENTS.md) | Instrucciones para Codex (ejecutor) |
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | Alcance: qué incluye y qué no, criterios de aceptación |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack propuesto, estructura y presupuesto de rendimiento |
| [docs/SEO.md](docs/SEO.md) | Cómo aparecer en Google (y qué no se puede prometer) |
| [docs/CONTENT.md](docs/CONTENT.md) | Lista del contenido que entrega el cliente |
| [docs/COSTS.md](docs/COSTS.md) | Precio del desarrollo y gastos de funcionamiento |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Publicación, dominio y entrega de cuentas |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Etapas, entregables y pruebas |
| [docs/QUESTIONS.md](docs/QUESTIONS.md) | Preguntas pendientes para el cliente |
| [docs/TOOLS.md](docs/TOOLS.md) | Herramientas, cuentas y skills recomendados |
| [docs/DECISIONS/](docs/DECISIONS/) | Decisiones de arquitectura (ADR) |
| [docs/tasks/](docs/tasks/) | Tareas para Codex, una por archivo |

## Relación con el sistema de reservas (SaaS)

Esta web es un proyecto aparte y más pequeño. Si más adelante se contrata el sistema de reservas, el botón «Reservar» pasa de WhatsApp al sistema y esta web se conserva.
