# ADR-0001 — Stack de la web

- **Estado:** aceptada por el dueño (2026-10-29)
- **Fecha:** 2026-10-29

## Contexto

Web de catálogo de una barbería. Debe ser moderna, cargar rápido en celulares y posicionarse en búsquedas locales. Sin base de datos ni login. Mantenible por un desarrollador independiente y entregable al cliente.

## Decisión

Astro con salida estática, Tailwind CSS, JavaScript mínimo para animaciones, Cloudflare Pages como hosting y un archivo de contenido (`src/content/`) como única fuente de los datos del negocio.

## Alternativas descartadas

- **React + Vite (SPA):** peor indexación y vista previa al compartir; envía más JavaScript del necesario.
- **Next.js:** capacidades de servidor que no se necesitan, y el despliegue completo empuja a Vercel, cuyo plan gratuito no permite uso comercial.
- **WordPress / constructores (Wix, Webflow):** costo mensual, plugins, más lentos o dependientes de la plataforma. Se reconsideran solo si el cliente exige editar la web solo (P-10).

## Consecuencias

- Hosting gratis y muy rápido; buen punto de partida para el SEO.
- Cada cambio de precio o de foto lo hace el desarrollador (se cobra por cambio).
- Si se contrata el sistema de reservas, la web se conserva y solo cambia el destino del botón «Reservar».
