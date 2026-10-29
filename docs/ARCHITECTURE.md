# Arquitectura (propuesta, pendiente de aprobación)

Decisión formal en [ADR-0001](DECISIONS/ADR-0001-stack.md).

## Stack propuesto

| Pieza | Elección | Por qué |
|---|---|---|
| Generador | **Astro** (salida estática) | Entrega HTML ya armado: Google lo lee completo y carga muy rápido. Casi sin JavaScript por defecto. Optimiza imágenes al compilar. |
| Estilos | **Tailwind CSS** | Rápido de escribir y mantener; solo envía las clases que se usan. |
| Interactividad | CSS + JavaScript mínimo | Las animaciones (aparición al hacer scroll, franja, botones) no necesitan librerías pesadas. Si alguna lo justifica, se evalúa en una ADR. |
| Tipografía | Google Fonts servidas desde el propio sitio | Sin depender de terceros al cargar; mejor rendimiento y privacidad. |
| Hosting | **Cloudflare Pages** | Gratis, permite uso comercial, HTTPS y CDN incluidos. |
| Dominio | Registrador a nombre del cliente | Ver `DEPLOYMENT.md`. |
| Analítica | Cloudflare Web Analytics | Gratis, sin cookies: no exige banner de consentimiento. |
| Edición del cliente | **Pages CMS** ([ADR-0003](DECISIONS/ADR-0003-edicion-cliente.md)) | Panel gratuito que edita los archivos de contenido; cada cambio se publica solo en 1–2 min. |

**Por qué no React + Vite (SPA):** una SPA arma la página en el navegador. Google la indexa peor, y al compartir el enlace por WhatsApp no muestra bien la vista previa. Para una web de catálogo que debe salir en búsquedas, el HTML estático es la opción correcta.

**Por qué no WordPress:** necesita hosting de pago, actualizaciones y plugins (superficie de ataque), y suele ser más lento. La edición por parte del cliente se resuelve con Pages CMS sin perder la web estática.

## Estructura prevista

```
src/
  content/negocio.json    ← único lugar con nombre, dirección, teléfono, horario, redes
  content/servicios.json  ← servicios, precios y duración
  assets/galeria/         ← fotos originales, editables desde el panel (Astro genera AVIF/WebP)
  components/             ← una pieza por sección
  layouts/Base.astro      ← <head>: SEO, Open Graph, datos estructurados
  pages/index.astro
  pages/404.astro
public/
  robots.txt, favicon, imagen para compartir
```

El enlace de WhatsApp se arma desde `negocio.json`: `https://wa.me/51<número>?text=<mensaje codificado>`.

## Presupuesto de rendimiento

- JavaScript total ≤ 30 KB comprimido.
- Peso inicial de la portada ≤ 500 KB (foto principal incluida).
- Fotos de la galería con carga diferida; la foto principal se precarga.
- Fuentes: 2 familias como máximo, con `font-display: swap`.

## Diseño

- Base de la maqueta: titulares Anton, texto Manrope y un tema de colores elegido entre 5 combinaciones (lima, dorado, rojo, claro y cobre) o sacado del logo (P-20).
- Tokens de color y tipografía en un solo archivo de configuración de Tailwind.
- Prioridad móvil: botones de al menos 48 px de alto y botón flotante de WhatsApp.

## Futuro: sistema de reservas

Si se contrata el SaaS, esta web sigue en el dominio principal y el botón «Reservar» enlaza a la página de reservas del sistema. No hace falta rehacerla.
