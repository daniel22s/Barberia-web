# SEO: cómo aparecer en Google

## Lo que no se puede prometer

Nadie puede garantizar el primer puesto en Google. No se promete al cliente una posición: se promete hacer bien todo lo que depende de nosotros y medir el resultado en Google Search Console.

## Cómo busca la gente una barbería

Busca «barbería cerca de mí» o «barbería en [distrito]» desde el celular. Google muestra primero el **mapa con 3 negocios** (el paquete local) y luego las webs. Ese mapa depende sobre todo de:

1. **Perfil de Empresa de Google** (Google Business Profile) completo y verificado. Es lo que **más pesa**, y es gratis.
2. **Reseñas:** cantidad, nota y que sean recientes.
3. **Cercanía** de quien busca (no se controla).
4. **La web:** confirma a Google qué ofrece el negocio y dónde está.

La web sola no basta: **web + perfil de Google + reseñas** es lo que funciona.

## Parte técnica (incluida en el desarrollo)

- [x] Título de la página desde el contenido: «Barbería y peluquería unisex en {distrito}, {provincia} | {nombre}».
- [x] Meta descripción con servicios, distrito y llamado a la acción, limitada a 155 caracteres.
- [x] Un solo `<h1>`; títulos de sección ordenados; 404 con título propio y `noindex`.
- [x] HTML estático y rápido en la compilación local: Lighthouse móvil 100 en Performance y SEO (TASK-006; repetir con fotos definitivas).
- [x] Generador JSON-LD `HairSalon` probado: dirección PE, coordenadas, teléfono, precios PEN, catálogo y redes HTTP(S). Horas solo al quitar la nota de confirmación pendiente; `aggregateRating` omitido sin datos verificables.
- [ ] Preguntas frecuentes reales («¿atienden sin cita?», «¿cuánto cuesta un fade?») con datos `FAQPage`; también ayudan en buscadores con IA.
- [ ] Texto alternativo descriptivo en fotos: «Fade bajo con diseño – [Nombre], [Distrito]».
- [x] Integración `@astrojs/sitemap`, `robots.txt` y URL canónica implementados y probados con una URL local; activación en producción pendiente del dominio confirmado.
- [x] Etiquetas Open Graph/Twitter y generación al compilar de imagen 1200×630 e iconos; compartir en WhatsApp sobre una URL publicada sigue pendiente.
- [ ] Alta en Google Search Console y Bing Webmaster Tools; envío del sitemap.

### TASK-006: configuración y contenido pendiente

El dominio sigue como `[DOMINIO]`, confirmado pendiente por el dueño el 2026-10-31.
Al recibirlo, escribirlo en `src/content/negocio.json` (nombre de host o URL HTTP(S)
sin ruta). Una vista previa puede usar `SITE_URL=https://... npm run build` sin
cambiar ese archivo. La misma base se aplica a canonical, OG, JSON-LD y sitemap.
Sin base confirmada se omiten canonical/sitemap y las URLs absolutas del JSON-LD;
el build informa el pendiente. `public/robots.txt` es la base: el build escribe
en `dist/robots.txt` la URL absoluta de `sitemap-index.xml` cuando exista la base.
La 404 no se incluye en el sitemap.

`faq.json` queda vacío hasta recibir respuestas reales. `Faq.astro` y `FAQPage`
usan el mismo filtro de texto confirmado y no muestran marcadores ni secciones
vacías. El generador y la sección se probaron con una pregunta sintética temporal,
retirada de la rama. Google [retiró la función de resultados enriquecidos de FAQ
en 2026](https://developers.google.com/search/updates); que `FAQPage` sea válido en
schema.org no implica que Google lo muestre. El criterio antiguo de TASK-006 se
registra con esa limitación, sin prometer un resultado enriquecido FAQ.

El horario de ejemplo no se afirma en JSON-LD mientras exista `horarioNota`.
Las URLs marcadoras/vacías de redes y las descripciones provisionales de servicios
se omiten; el catálogo conserva los precios del contenido actual. Los precios
«desde» usan `minPrice`, sin inventar un máximo. Confirmar todos los datos de
contacto y precios antes de la publicación final.

Las fotos reales aún faltan (P-25): los marcadores no se convierten en descripciones
SEO. Al entregar `src/assets/portada.*`, completar `negocio.portadaAlt` con una
descripción real; si falta, el build falla con un mensaje. Se añade el distrito a
la portada y a la primera foto de la galería si no estaba ya presente. Las demás
conservan sus descripciones del contenido para evitar repetir el distrito en cada
imagen. El comparador conserva los alt descriptivos de cada foto.

La imagen social se compone con la portada y el logo disponibles; mientras no se
entreguen, usa la marca textual provisional. `src/assets/og.*` permite sustituir
la composición por un diseño aprobado, siempre convertido a JPEG 1200×630.
Iconos y social se regeneran localmente con Sharp, ya presente en el pipeline de
Astro; no se añadió otra dependencia de imágenes. Los archivos generados de
`public/` están ignorados por Git. La única dependencia nueva es
`@astrojs/sitemap` 3.7.4, fijada por el lockfile.

Las pruebas externas por URL y la vista previa de WhatsApp requieren TASK-008.
No se ha publicado esta rama. Resultados, capturas y límites en
`docs/tasks/TASK-006-seo.md` y `docs/diseno/resultados/task-006/`.

## Parte del cliente (fuera del desarrollo, con guía)

- [ ] Crear o reclamar y **verificar** el Perfil de Empresa de Google, categoría principal «Barbería».
- [ ] Nombre, dirección y teléfono **idénticos** en Google, la web, TikTok, Instagram y Facebook.
- [ ] Subir fotos al perfil de Google cada semana.
- [ ] Pedir reseñas: un código QR en el local que abra la página de reseñas y un mensaje después del corte. Nunca comprar reseñas: Google las elimina y puede penalizar.
- [ ] Responder todas las reseñas.
- [ ] Poner el enlace de la web en la bio de TikTok e Instagram y en el perfil de Google.

## Medición

Google Search Console: búsquedas, posición media y clics. Perfil de Google: llamadas, solicitudes de ruta y clics a la web. Primera revisión a las 4–6 semanas de publicar; el SEO local tarda semanas o meses.
