# TASK-013 — Cierre de contenido y detalles

## Aprobación y alcance
El dueño entrega dos publicaciones reales (TikTok e Instagram), imagen de ubicación y nuevo enlace de Maps el 2026-11-26, y solicita terminar los detalles. Se autorizan completar la galería, mapa, mensaje de WhatsApp y preguntas frecuentes con datos confirmados. Publicación en la rama; integración/publicación final autorizadas por la solicitud de terminar la web y la autorización de publicación vigente. Sin compras ni nuevas dependencias.

## Resultados reales y pendientes
En ejecución. Dominio propio, acceso al perfil de Google, Search Console y prueba física/panel conectado dependen de cuentas y acciones externas; no se declaran hechos sin ejecutar.

### Implementación y fuentes
- Dos miniaturas locales reales, con enlaces a las publicaciones originales, sustituyen el SVG de ejemplo: TikTok 7700298045476408584 (fotograma a 20 s del video autorizado) e Instagram DfPyn3nMhx5 (miniatura observada y exportada mediante navegador). yt-dlp no pudo extraer Instagram y el navegador no pudo reproducirlo, pero mostró publicación y miniatura pública; no se utilizó una imagen de perfil ni se inventó una toma del trabajo. No se descargan reproductores de terceros al abrir la web.
- Imagen adjunta del dueño convertida a WebP para ubicación; nuevo Maps resuelve a la misma ficha y coordenadas confirmadas. Alt y dimensiones reales. WhatsApp general reemplazado por un saludo para coordinar cita.
- FAQ: reserva por WhatsApp y diagnóstico para ondulación/alisado, sin inventar atención sin cita ni reseñas. Canonical y sitemap configurados para el enlace actual de Workers mientras no haya dominio propio.
- Panel: corregidas las categorías de galería a el/ella/local (un reemplazo previo había copiado las de servicios). Campos opcionales para publicación original.
- Cabeceras de seguridad, caché de assets, CSP con firmas SHA-256 de scripts inline generadas tras compilar; sin ampliar permisos de ejecución. 404 propia configurada en Workers. `scripts/prepublicar.mjs` bloquea marcadores y datos de ejemplo antes del build. Excluida caché local `.wrangler` de Git y lint. Sin nuevas dependencias de aplicación.

### Verificación real
- Node 22.23.4, `npm run check`: tipos 0 errores/advertencias/hints, lint limpio, build correcto y 44/44 pruebas. `npm run format:check` y `git diff --check` correctos.
- Prueba negativa de prepublicar con archivo temporal: marcador rechazado, archivo retirado en finally. Contenido final compila.
- Chromium a 375 y 1280 px: dos miniaturas cargadas, enlaces originales exactos, sin marcadores visibles, mensaje WhatsApp válido, dos FAQ, Maps correcto, sin desbordes ni errores JS. Cero solicitudes externas al recorrer la página.
- Lighthouse móvil local: Performance 100 / Accessibility 100 / Best Practices 100 / SEO 100. Evidencias en `docs/diseno/resultados/task-013/`.
- Wrangler dev local puerto 4338: cabeceras presentes y ruta inexistente devuelve 404 personalizada. Primera prueba CSP bloqueó scripts inline; corregida con hashes generados. QA repetida con cabeceras reales: sin errores CSP. Lint detectó caché generada de Wrangler; exclusión específica añadida y comprobación repetida satisfactoria.

### Pendientes externos y límites
El dueño confirma que no tiene dominio propio. Search Console, Bing, gestión de Google Business, prueba del CMS conectado y Android físico siguen sin ejecutarse; requieren cuentas/dispositivo o acciones externas. Las reseñas siguen vacías y ocultas. No se declara atención sin cita ni se compra un dominio. No se promete posicionamiento en Google.

### Publicación y comprobación final
- A petición explícita del dueño, commit `d6e0bdf` integrado mediante fast-forward y subido a main. Cloudflare completó con éxito la compilación 7e3f3615-db36-4d9d-833c-1c75439a9f13.
- URL pública https://barberia-web.cruzdani543.workers.dev/ : HTTP 200, ambas publicaciones reales, Maps nuevo y WhatsApp sin marcador. Sitemap HTTP 200; ruta inexistente HTTP 404 personalizada.
- Chromium sobre URL pública, 375/1280: dos fotos cargadas, sin desbordes ni marcadores, FAQ y enlaces correctos, sin solicitudes externas ni errores CSP. Se ajustó el script de QA para recorrer y esperar cada imagen lazy (la primera medición se adelantó a su carga). Evidencia `navegador-publico.json`.
- El dueño confirma dominio propio pendiente y solicita opciones/precios: consulta RDAP de Verisign, `vektrahairstudio.com` y `vektrahair.com` sin registro; `vektrastudio.com` registrado. Cloudflare publica tarifa estándar .com USD 11.17 por registro y renovación anual al 2026-11-26 (https://pricing.registrar.cloudflare.com/?q=com). Disponibilidad y precio se confirman al comprar; no se efectuó compra.
