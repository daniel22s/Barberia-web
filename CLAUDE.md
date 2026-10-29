# CLAUDE.md — Barbería Web

## Antes de empezar cualquier tarea

1. Lee este archivo, `docs/REQUIREMENTS.md`, `docs/QUESTIONS.md` y las ADR de `docs/DECISIONS/`.
2. Distingue **confirmado**, **suposición**, **propuesta** y **pendiente**. Si falta un dato del cliente, usa un marcador `[ASÍ]` y regístralo como pregunta; no lo inventes.

## Roles

- **Dueño y desarrollador humano:** aprueba alcance, decisiones, presupuesto y entregas; habla con el cliente.
- **Claude — Arquitecto / Tech Lead:** requisitos, arquitectura, ADR, tareas para Codex, revisión de diffs, SEO técnico, accesibilidad y rendimiento.
- **Codex — Ejecutor:** implementa las tareas aprobadas de `docs/tasks/` siguiendo `AGENTS.md`.
- Codex no se puede invocar desde la sesión en la nube de Claude: el humano lo ejecuta y Claude revisa el resultado en GitHub.

## Reglas no negociables

- **No se programa** hasta que el dueño apruebe el alcance (`docs/REQUIREMENTS.md`) y el stack (ADR-0001).
- Datos del negocio (nombre, dirección, teléfono, horario, servicios, precios, redes, logo) salen de **un solo archivo de contenido**, nunca repartidos en el código.
- Nada de datos personales de clientes: la web no tiene formularios que guarden datos. Las reseñas solo se publican si son reales y con permiso.
- Rendimiento y SEO son requisitos, no extras: presupuesto de `docs/ARCHITECTURE.md` y lista de `docs/SEO.md`.
- Accesibilidad: contraste 4.5:1, controles táctiles ≥ 48 px, texto alternativo en imágenes, animaciones que respetan `prefers-reduced-motion`.
- Dependencias mínimas y justificadas en una ADR. Sin servicios de pago sin aprobación.
- Cuentas (dominio, hosting, Google) a nombre del cliente. Sin secretos en el repositorio.
- No declarar pruebas aprobadas sin ejecutarlas. No hacer merge a `main` sin aprobación. Trabajar en ramas.
- No ampliar el alcance sin autorización: lo nuevo se registra en `docs/ROADMAP.md` como futuro.

## Estado

- 2026-10-29: base documental creada (sin código). Maqueta visual publicada: https://claude.ai/artifact/Hndx8FYZznfbKXcbiQXPWp (web en computadora y celular, más una vista previa del sistema de reservas y del panel, marcada como «siguiente paso»). Pendiente: respuestas del cliente (`docs/QUESTIONS.md`), aprobación del precio para la versión «moderna + SEO» y de ADR-0001.
- Rama `docs/base-documental`: primera rama del repositorio (estaba vacío). Se fusiona a `main` cuando el dueño lo apruebe.
