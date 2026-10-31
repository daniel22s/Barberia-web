# Maqueta visual (copia para Codex)

Copia estática de la maqueta aprobada, para que Codex y cualquier desarrollador la vean sin acceso a Claude. El original editable está en https://claude.ai/artifact/Hndx8FYZznfbKXcbiQXPWp (privado). Exportada el 2026-10-30.

**Es referencia de diseño, no código de producción.** Los estilos están en línea para mostrar el aspecto; en la web real se usan componentes de Astro, los tokens de `src/styles/tema.css` y los datos de `src/content/`. Textos, precios y fotos son **de ejemplo** o están entre `[CORCHETES]`.

## Diseño elegido (2026-10-31): paleta `vektra`, negro y dorado

El cliente eligió **negro y dorado**, los colores de su logo. Usa estas como referencia principal: `capturas/computadora-vektra.png`, `capturas/celular-vektra.png`, `capturas/animaciones-vektra.png` (y sus `.html`). El logo de la maqueta es una **recreación provisional** con la fuente Syncopate 700; se reemplaza por el archivo original cuando llegue (P-23). Las demás paletas quedan solo como historial.

## Capturas (`capturas/`)

| Archivo | Qué muestra |
|---|---|
| `computadora-arena.png` | Página completa a 1440 px, paleta arena (predeterminada en TASK-001) |
| `celular-arena.png` | Página completa a 390 px, paleta arena |
| `celular-botella.png`, `celular-moka.png`, `celular-lima.png` | La misma página con las otras paletas en evaluación (P-20). **Moka es clara.** |
| `animaciones-arena.png` | Pantalla de animaciones (estado final; el movimiento se ve abriendo el HTML) |

## Páginas HTML

`computadora-<paleta>.html`, `celular-<paleta>.html` (paletas `arena`, `botella`, `moka`, `lima`) y `animaciones-arena.html`. Se abren directo en el navegador; las fuentes se cargan desde Google Fonts. En `animaciones-arena.html` se ven en movimiento el video en bucle, la aparición suave, la franja, la inclinación 3D ligera y el botón que late.

## Valores de las paletas

| Token | **vektra (elegida)** | arena | botella | moka (clara) | lima |
|---|---|---|---|---|---|
| fondo | `#0B0B0B` | `#111111` | `#12261F` | `#EFE7DB` | `#0D0D0D` |
| superficie | `#161514` | `#1B1A18` | `#183129` | `#F8F3EC` | `#171717` |
| línea | `#2A2826` | `#2E2B27` | `#254238` | `#DDD1C1` | `#2C2C2C` |
| texto | `#F5F1E8` | `#F2EBDD` | `#F2EBDD` | `#2B211C` | `#F4EFE6` |
| suave | `#D6D0C4` | `#D6CBB9` | `#D2D9CF` | `#4A3A32` | `#CFC8BD` |
| apagado | `#A39D92` | `#A9A091` | `#A3B3A9` | `#6B5A4E` | `#A8A29A` |
| acento | `#C9A23A` | `#C8A27A` | `#C9A45C` | `#8A5A44` | `#A8DD35` |
| sobre acento | `#0B0B0B` | `#111111` | `#111111` | `#FBF7F1` | `#111111` |

Tipografía: titulares **Anton** (mayúsculas), texto **Manrope** 400/600/700/800.
