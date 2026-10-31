# Contenido que entrega el cliente

Sin este contenido la web no se publica: los `[MARCADORES]` no salen a producción.

## Datos del negocio

- [ ] Nombre comercial exacto (como aparecerá en Google)
- [ ] Dirección completa, distrito, ciudad y una referencia («frente a…»)
- [ ] Ubicación en Google Maps (enlace)
- [ ] Número de WhatsApp
- [ ] Horario por día (y feriados, si cambia)
- [ ] ¿Atiende sin cita?
- [ ] Enlaces de TikTok, Instagram y Facebook
- [ ] Una frase que lo describa (se puede proponer)

## Servicios

Para cada uno: nombre, precio, duración aproximada y una línea de descripción. Indicar cuál es «el más pedido».

## Marca

- [ ] Logo en la mejor calidad que tenga (PNG grande o vectorial). Si no tiene, se usa el nombre en tipografía; un logo diseñado se cotiza aparte.
- [ ] Colores preferidos (la maqueta usa negro y amarillo; se puede cambiar).
- [ ] 1–3 webs o cuentas que le gusten como referencia.

## Fotos y videos

- [ ] 1 foto principal vertical de su mejor trabajo
- [ ] 8–12 fotos de cortes (de frente, de perfil y de espalda)
- [ ] 2–4 fotos del local
- [ ] 1–3 videos cortos de 5–15 s (antes y después)
- [ ] Una foto suya trabajando (opcional, genera confianza)

Consejos: luz natural o de frente, fondo limpio, celular en vertical, sin filtros fuertes. **Pedir permiso** a los clientes que aparecen en las fotos.

## Reseñas

- [ ] 3 reseñas reales de Google con permiso para mostrarlas (nombre de pila e inicial)

## Galería y comparador (TASK-004)

Guarda los originales autorizados en `src/assets/galeria/`. Cada entrada de
`src/content/galeria.json` necesita `id` único, `imagen` (ruta relativa al JSON),
`alt` descriptivo y `categoria` (`el`, `ella` o `local`). El orden del JSON es el
orden de presentación. No publiques el SVG de ejemplo ni marcadores.

Para comparar dos fotos del mismo trabajo, añade a ambas un objeto `par`:
`{"id":"trabajo-01","tipo":"antes"}` y
`{"id":"trabajo-01","tipo":"despues"}`. Usa encuadres y proporciones iguales.
Solo se muestran pares completos; dos fotos con igual id de par y tipo generan
un error de compilación para evitar una comparación incorrecta. La galería
mantiene también estas fotos. No se ha añadido el filtro opcional.

Astro genera AVIF y WebP, anchos hasta 1280 px sin ampliar originales, y carga
las imágenes de forma diferida. El build comprueba todas las imágenes publicadas
y falla si alguna supera 200 000 bytes (200 KB); reduce el original si ocurre.
Comprueba siempre con las fotos definitivas el límite inicial de 500 KB en móvil.

`redes.tiktok` se usa para «Más en TikTok»; si sigue como marcador se muestra
`[ENLACE DE TIKTOK PENDIENTE]` sin un enlace inválido. Añade `resenasUrl` en
`negocio.json` solo cuando haya una URL HTTP(S) real de reseñas de Google.
`resenas.json` vacío oculta toda la sección. Se muestran como máximo tres entradas,
cada una con id único, texto, autor autorizado y estrellas enteras de 1 a 5.
