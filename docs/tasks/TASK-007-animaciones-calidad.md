# TASK-007 — Animaciones, accesibilidad y rendimiento

## Objetivo
Dar el movimiento de la pantalla «Así se mueve la web» de la maqueta sin perder velocidad ni accesibilidad.

## Contexto
Depende de TASK-002 a 005. Sin 3D completo (WebGL) por decisión de arquitectura: solo efectos ligeros en CSS.

## Requisitos
**Incluye**
- Aparición suave al entrar en pantalla (titulares, tarjetas, fotos) con `IntersectionObserver` y clases CSS; el contenido es visible si JavaScript no carga.
- Inclinación 3D ligera en tarjetas de servicio al pasar el mouse o tocar (CSS `perspective`/`transform`; en móvil, solo una vez al aparecer).
- Transiciones de botones y enlaces.
- `prefers-reduced-motion: reduce` desactiva todo movimiento (incluidos franja, latido y video: se muestra el `poster`).
- Revisión de accesibilidad: foco visible, orden de tabulación, contraste en la paleta elegida, `alt`, etiquetas, `lang`.
- Presupuesto de `docs/ARCHITECTURE.md`: JS ≤ 30 KB, portada ≤ 500 KB, LCP < 2,5 s.

**No incluye:** librerías de animación (GSAP, Motion, Three.js, Spline).

## Archivos afectados
`src/scripts/aparecer.ts`, `src/styles/animaciones.css`, componentes de TASK-002 a 005 (solo clases).

## Restricciones
- Animar solo `transform` y `opacity`. Nada de saltos de diseño (CLS < 0,1).

## Criterios de aceptación
1. Lighthouse móvil (vista previa, modo incógnito): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100.
2. Con «reducir movimiento», nada se mueve.
3. Sin JavaScript, todo el contenido se ve.

## Pruebas requeridas
`npm run check`; Lighthouse móvil ×3 (anotar la mediana); prueba manual de los criterios 2 y 3; prueba en un Android real si está disponible (anotar modelo).

## Documentación a actualizar
`docs/ARCHITECTURE.md` si cambia el presupuesto.

## Resultados reales y pendientes
_(Codex)_
