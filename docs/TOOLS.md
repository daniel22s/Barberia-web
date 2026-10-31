# Herramientas recomendadas

## En tu computadora (obligatorio)

| Herramienta | Para qué |
|---|---|
| **Node.js 22 LTS** (instalado con `nvm`) | Ejecutar Astro y las pruebas |
| **Git** | Control de versiones |
| **VS Code** | Editor. Extensiones: *Astro*, *Tailwind CSS IntelliSense*, *Prettier*, *ESLint* |
| **Claude Code** | Arquitecto y revisión |
| **Codex CLI** | Ejecutor de las tareas |
| **Google Chrome** | DevTools, Lighthouse y vista de celular |

## Cuentas (a nombre del cliente salvo GitHub)

GitHub (ya existe `daniel22s/barberia-web`), Cloudflare, Google Business Profile, Google Search Console, Bing Webmaster Tools.

## Herramientas gratuitas en línea

- **PageSpeed Insights:** rendimiento real en móvil.
- **Prueba de resultados enriquecidos de Google:** valida los datos estructurados.
- **Squoosh:** comprimir una foto suelta (Astro optimiza las del proyecto solo).
- **Google Fonts:** tipografías.

## Skills y plugins de Claude

| Plugin | Origen | Recomendación |
|---|---|---|
| **frontend-design** | Anthropic (oficial) | **Instalar.** Guía de diseño de interfaces; ayuda a que la web no se vea genérica. |
| **Design** (design-critique, accessibility-review, ux-copy) | Anthropic (oficial) | **Útil.** Revisar la maqueta, la accesibilidad y los textos de los botones. |
| **rampstack-seo** | Comunidad | Opcional: auditoría SEO técnica y de contenido. No es de Anthropic: revísalo antes de instalarlo. |
| HarborRank SEO | Comunidad, servicio de pago | No por ahora: requiere suscripción. |

## No hace falta

Supabase, Docker, bases de datos, Figma (la maqueta ya está en un lienzo de Claude) ni librerías de animación pesadas.

## Trabajo local en VS Code (Claude Code + Codex)

1. Instalar Git, VS Code y Node **22.23.4** con nvm (`nvm install 22.23.4` y `nvm use 22.23.4`; en Windows, nvm-windows).
2. Clonar: en VS Code, `Ctrl+Shift+P` → «Git: Clone» → `https://github.com/daniel22s/Barberia-web.git`.
3. En la terminal de VS Code: `npm ci` y luego `npm run dev` → abrir `http://localhost:4321`.
4. Extensiones: **Claude Code** (Anthropic), **Codex** (OpenAI), Astro, Tailwind CSS IntelliSense, Prettier, ESLint.
5. Claude Code lee `CLAUDE.md` y Codex lee `AGENTS.md` al abrir la carpeta.
6. **No trabajar los dos a la vez en la misma carpeta.** Codex usa una carpeta propia por tarea con `git worktree`:
   `git worktree add ../barberia-task-005 -b web/task-005-ubicacion-pie main`
   y al terminar (después de fusionar): `git worktree remove ../barberia-task-005`.
7. Antes de subir una rama: `npm run check` y `npm run format:check` deben pasar.
