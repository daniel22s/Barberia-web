# Requisitos y alcance

Etiquetas: **[C]** confirmado · **[S]** suposición · **[P]** propuesta · **[D]** decisión pendiente.

## Qué es

- **[C]** Una página web de catálogo para la barbería del cliente (no el sistema de reservas).
- **[C]** El dueño la quiere **moderna y llamativa**, no una página simple.
- **[C]** Quiere que **aparezca en las primeras búsquedas**. Ver límites en `SEO.md`: nadie puede garantizar el primer puesto.
- **[C]** Contacto y reservas por WhatsApp.
- **[S]** La mayoría de visitas llegarán desde el celular, vía TikTok, Instagram, Google Maps o un enlace compartido por WhatsApp.
- **[S]** Un solo local y un solo barbero por ahora.
- **[C]** Negocio: **Vektra «Hair Studio»**, en **Mi Perú** (Callao, por confirmar). Dominio **`.com`**. Atiende a **hombres y mujeres**. Tiene logo y muchas fotos. No tiene Perfil de Empresa de Google.
- **[C]** Opción A de `COSTS.md`.
- **[C]** Precios y fotos se editan con un panel (ADR-0003, aceptada); **lo usa el desarrollador** a pedido del cliente. Precio cerrado: **S/ 1,400**.
- **[C]** Plazo comunicado al cliente: **7 días** (condiciones en `ROADMAP.md`).
- **[D]** Colores: no le gustan del todo los de la maqueta; elegirá entre las combinaciones de la maqueta (3 recomendadas para unisex) o se sacan del logo (P-20).

## Secciones (MVP)

| # | Sección | Contenido |
|---|---|---|
| 1 | Cabecera | Logo, nombre, menú y botón «Reservar por WhatsApp» |
| 2 | Portada | Titular grande, distrito y ciudad, foto principal, botones de WhatsApp y de servicios, datos rápidos (calificación, días, hora) |
| 3 | Franja animada | Estilos que trabaja (fade, clásico, barba…) |
| 4 | Servicios y precios | Tarjetas con nombre, descripción corta, precio y duración; cada una abre WhatsApp con el servicio ya escrito |
| 5 | Cómo reservar | 3 pasos |
| 6 | Trabajos | Galería de fotos y videos cortos, con enlace a TikTok |
| 7 | Reseñas | Calificación de Google y 3 reseñas reales (con permiso) |
| 8 | Ubicación y horario | Dirección, referencia, horario, mapa, «Cómo llegar» |
| 9 | Llamado final | «¿Listo para tu próximo corte?» + WhatsApp |
| 10 | Pie | Redes, nombre y ciudad |
| — | Botón flotante | WhatsApp siempre visible en el celular |
| — | Página 404 | Con enlace de vuelta al inicio |

## Requisitos de calidad

- **[P]** Lighthouse móvil ≥ 90 en Performance y ≥ 95 en Accessibility, Best Practices y SEO.
- **[P]** Carga visible en menos de 2,5 s en un celular con 4G (LCP).
- **[P]** Animaciones suaves (aparición al hacer scroll, franja en movimiento, botones) que se desactivan si el usuario pidió menos movimiento.
- **[P]** Vista previa con logo, nombre y descripción al compartir el enlace (Open Graph).
- **[P]** Datos estructurados `HairSalon` de schema.org (dirección, horario, teléfono, redes, precios).
- **[P]** Solo en español. **[D]** ¿Inglés también (turistas)?

## No incluye

- Reservas automáticas, agenda, panel, pagos en línea (eso es el sistema SaaS).
- Edición de todo lo demás por el cliente: con el panel (ADR-0003) solo edita servicios, precios, fotos y horario; textos y diseño los cambia el desarrollador.
- Blog, tienda, varios idiomas.
- Redacción profesional, sesión de fotos, diseño de logo.
- Publicidad pagada (Google Ads, TikTok Ads) y manejo de redes.
- Mantenimiento después de la garantía.

## Criterios de aceptación

1. Todas las secciones con el contenido real entregado por el cliente; ningún `[MARCADOR]` publicado.
2. Cada botón de WhatsApp abre el chat correcto con el mensaje correcto.
3. Se ve y funciona bien a 360, 390, 768 y 1280 px de ancho.
4. Lighthouse móvil cumple los mínimos de arriba (resultado real anotado).
5. La prueba de resultados enriquecidos de Google valida los datos estructurados sin errores.
6. `sitemap.xml` y `robots.txt` publicados; sitio enviado a Google Search Console.
7. Dominio propio con HTTPS, registrado a nombre del cliente.
8. El cliente aprobó el diseño tras las 2 rondas de cambios incluidas.
9. Desde un celular, con el panel, se cambia un precio y se sube una foto, y la web publicada los muestra en menos de 5 minutos.
