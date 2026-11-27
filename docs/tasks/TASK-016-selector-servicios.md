# TASK-016 — Selector de servicios para WhatsApp

Permite seleccionar uno o varios servicios del catálogo, ver el importe estimado e indicar un día y un turno opcionales. El mensaje de WhatsApp incluye la selección y solicita confirmar disponibilidad. Los precios variables conservan la indicación «desde».

## Resultados reales y pendientes

- El componente SelectorServicios se integra en la página principal y se enlaza desde la sección de reserva. Con JavaScript desactivado hay un enlace directo a WhatsApp.
- En Node 22, pasaron la comprobación de tipos, el lint, la compilación y las 44 pruebas automatizadas existentes.
- Chromium a 375 y 1280 px verificó el total con precio variable, el mensaje generado y la ausencia de desbordamiento del formulario. La navegación a WhatsApp se interceptó en la prueba, sin enviar mensajes. También se comprobó el enlace con JavaScript desactivado.
- Lighthouse móvil sobre la compilación local. Rendimiento 100, accesibilidad 100, buenas prácticas 100 y SEO 100.
- Publicación y prueba en dispositivo físico pendientes.
