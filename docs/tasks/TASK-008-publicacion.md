# TASK-008 — Publicación, dominio y Google

## Objetivo
Publicar la web en `vektrahairstudio.com` (o el dominio que compre el cliente) con HTTPS y dejarla registrada en los buscadores.

## Contexto
Depende de TASK-001 a 007 y de que el cliente compre el dominio con su correo (ADR-0002). La mayor parte la hace **el desarrollador humano** en paneles web; Codex solo prepara archivos.

## Requisitos
**Incluye (Codex)**
- `public/_headers` de Cloudflare Pages: caché larga para `/_astro/*`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, CSP que permita solo lo que la web usa.
- `public/_redirects`: `www` → dominio principal (o al revés, según se decida).
- `docs/DEPLOYMENT.md`: pasos exactos usados.

**Incluye (desarrollador humano)**
- Proyecto de Cloudflare Pages conectado al repositorio (`main` = producción; ramas = vista previa), Node 22, comando `npm run build`, carpeta `dist`.
- Dominio en Cloudflare, HTTPS activo y redirección `www`.
- Cloudflare Web Analytics.
- Google Search Console y Bing Webmaster Tools: verificar el dominio y enviar el sitemap.
- Enlace de la web en el Perfil de Empresa de Google, TikTok, Instagram y Facebook.

**No incluye:** verificación del Perfil de Google (la hace Google).

## Restricciones
- Cuentas a nombre del cliente; el desarrollador como miembro. Sin secretos en el repositorio.

## Criterios de aceptación
1. `https://vektrahairstudio.com` carga con HTTPS válido; `http://` y `www` redirigen.
2. securityheaders.com da A o más.
3. El sitemap figura como «correcto» en Search Console.
4. Criterios 1–8 de `docs/REQUIREMENTS.md` revisados y anotados.

## Pruebas requeridas
Comprobación de los criterios con fecha y capturas; `curl -I` de las redirecciones anotado.

## Documentación a actualizar
`docs/DEPLOYMENT.md`, `README.md` (URL publicada), `CLAUDE.md` (estado).

## Resultados reales y pendientes
_(Codex y desarrollador)_
