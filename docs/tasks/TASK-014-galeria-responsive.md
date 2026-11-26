# TASK-014 — Corregir galería móvil y escritorio

## Aprobación
El dueño reporta que las tarjetas se ven mal y aporta capturas (2026-11-26). Corrección del trabajo publicado, con commit e integración en main según autorización vigente.

## Alcance
Galería compacta, alturas acotadas, encuadres útiles, dos columnas en escritorio y una en móvil. Evitar tarjeta vacía gigante para TikTok; conservar enlaces originales y pipeline Astro, sin dependencias nuevas.

## Resultados reales y pendientes
En verificación. Se detectó que la altura intrínseca del img prevalecía sobre el aspect-ratio del picture. Se sustituye por un marco de altura explícita y el img posicionado dentro; object-fit cover y foco superior. Se elige otro fotograma del mismo TikTok, con vista de cabello y rostro en vez del acercamiento de la máquina. Más en TikTok pasa a un enlace al pie.

## Verificación
Node 22.23.4. `npm run check`: tipos sin errores/advertencias/hints, lint y build correctos, 44/44 pruebas. `npm run format:check` y `git diff --check` correctos. Chromium sobre Wrangler local (4338), a 375 y 1280 px: marcos de 320 y 360 px, tarjetas menores de 440 px, dos columnas alineadas en escritorio, enlaces de 48 px, sin desbordes ni errores JS. Capturas revisadas visualmente; se ajustó el encuadre tras la primera revisión para conservar el cabello y centrar el conjunto. Evidencia en `docs/diseno/resultados/task-014/`. Lighthouse móvil: {'performance': 100, 'accessibility': 100, 'best-practices': 100, 'seo': 100}. No se probó Android físico.
