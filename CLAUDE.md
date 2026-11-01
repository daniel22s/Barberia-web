# CLAUDE.md — Barbería Web

## Antes de empezar cualquier tarea

1. Lee este archivo, `docs/REQUIREMENTS.md`, `docs/QUESTIONS.md` y las ADR de `docs/DECISIONS/`.
2. Distingue **confirmado**, **suposición**, **propuesta** y **pendiente**. Si falta un dato del cliente, usa un marcador `[ASÍ]` y regístralo como pregunta; no lo inventes.

## Roles

- **Dueño y desarrollador humano:** aprueba alcance, decisiones, presupuesto y entregas; habla con el cliente.
- **Claude — Arquitecto / Tech Lead:** requisitos, arquitectura, ADR, tareas para Codex, revisión de diffs, SEO técnico, accesibilidad y rendimiento.
- **Codex — Ejecutor:** implementa las tareas aprobadas de `docs/tasks/` siguiendo `AGENTS.md`.
- Codex funciona **en local** (extensión de VS Code, desde 2026-10-31): el humano lo ejecuta en un worktree propio por tarea (`../barberia-task-NNN`, ver `docs/TOOLS.md`) y Claude revisa la rama en local. Claude y Codex **no trabajan a la vez en la misma carpeta**; la carpeta principal queda en `main`.

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
- Rama `docs/base-documental`: primera rama del repositorio (estaba vacío). **`main` creada desde ella el 2026-10-29** con aprobación del dueño; desde ahora las ramas de trabajo (`web/task-NNN-…`) salen de `main`.
- 2026-10-29: respuestas del cliente. Negocio **Vektra «Hair Studio»**, Mi Perú, dominio `.com` (`vektrahairstudio.com` estaba libre). **Opción A**. Quiere **editar precios y fotos** → ADR-0003 (Pages CMS, propuesta; +6 h, precio por decidir). Tiene logo y muchas fotos; **sin Perfil de Google** (crearlo ya). No le gustan del todo los colores: la maqueta tiene ahora 5 combinaciones (lima por defecto, tal como lo dejó el dueño en el editor). **Plazo comunicado: 7 días** (plan en `ROADMAP.md`). Falta aprobar ADR-0001 y ADR-0003 para empezar a programar.
- 2026-10-29: atiende a **hombres y mujeres**. Maqueta: servicios «Para él / Para ella», 3 paletas unisex nuevas (arena, botella, moka), comparación de 6 paletas y pantalla «Así se mueve la web». La computadora conserva el amarillo que dejó el dueño en el editor.
- 2026-10-29: **ADR-0001 y ADR-0003 aceptadas.** El panel (Pages CMS) lo usa el desarrollador; el cliente pide los cambios. **Precio cerrado: S/ 1,400.** TASK-001 a TASK-009 redactadas en `docs/tasks/`: **se puede programar**. Paleta por defecto en TASK-001: arena (cambia en una línea cuando el cliente elija, P-20).
- 2026-10-31: TASK-002 y TASK-003 aceptadas y en `main`. Logo visto (captura): **VÉKTRA / HAIR STUDIO** blanco sobre negro. **P-20: negro y dorado** (paleta `vektra`, acento `#C9A23A`); maqueta de Claude y copia en `docs/diseno/maqueta/` actualizadas. **TASK-010** (marca) redactada. Faltan logo original, fotos originales con permiso y horario real (P-23 a P-25).
- 2026-10-31: **TASK-010, TASK-004 y TASK-005 aceptadas y en `main`** (en TASK-005, el Arquitecto movió el mapa a `src/assets`). **P-18 respondida:** Av. Ayacucho, Mz. A10, Lote 20, 3.er piso, Mi Perú, Callao (en `negocio.json`). Falta el enlace de Google Maps (P-26): sin él, «Cómo llegar» y el mapa siguen como marcador. Siguen: TASK-009 → 006/007 → 008. Push: el remoto HTTPS no tiene credenciales en esta máquina; usar SSH (`git@github.com:daniel22s/Barberia-web.git`).
- 2026-10-31: **TASK-009 aceptada en local** (`.pages.yml` y guía en `DEPLOYMENT.md`). Decisión del Arquitecto: **precio mínimo S/ 1** en el panel y en Zod, porque Pages CMS 2.1.8 convierte un precio vacío en 0. Criterios 1, 2 y 4 (celular, foto de 4 MB publicada, reversión) **pendientes hasta conectar Pages CMS y Cloudflare (TASK-008)**.
- 2026-10-31: Flujo simplificado: Codex trabaja en la carpeta principal, en una rama por tarea y una tarea a la vez (sin worktrees); Claude revisa la rama en local. **TASK-006 (SEO) aceptada en local**: Lighthouse 100/100/100/100, schema.org sin errores. Antes de publicar faltan el **teléfono real** (el JSON-LD publicaría `51900000000`), el **dominio** (canonical, sitemap y tarjeta de WhatsApp) y la prueba de Google con la URL pública. Sigue: TASK-007.
