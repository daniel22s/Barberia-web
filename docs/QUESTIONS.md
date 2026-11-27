# Preguntas para el cliente

Impacto en precio o plazo: **A** alto · **M** medio · **B** bajo.

## Respondidas (2026-10-29)

| # | Pregunta | Respuesta | Consecuencia |
|---|---|---|---|
| P-09 | Opción A o B | **Opción A** (completa) | `COSTS.md` |
| P-10 | ¿Edita él mismo? | **Sí: precios y fotos** | Panel de edición: [ADR-0003](DECISIONS/ADR-0003-edicion-cliente.md); suma horas y precio |
| P-08 | ¿Fotos? | **Tiene muchas** | Elegir las mejores 15–20 para empezar |
| P-04 | ¿Perfil de Google? | **No tiene** | Corregido por P-27: la ficha ya existe |
| P-01 | Nombre | **Vektra «Hair Studio»** | Ver P-17 |
| P-02 | Ubicación | **Mi Perú** | Ver P-18 |
| P-13 | Dominio | **`.com`** | `vektrahairstudio.com` estaba libre el 2026-10-29 (consulta RDAP); comprarlo pronto |
| P-06 | ¿Logo? | **Sí tiene** | Enviar el archivo original |
| P-05 | ¿Colores de la maqueta? | **No le gustan del todo** | La maqueta ofrece 5 combinaciones; o se sacan del logo |
| P-19 | ¿Hombres o también mujeres? | **Hombres y mujeres** (unisex) | Servicios de dama, textos y búsquedas «peluquería» y «salón» además de «barbería»; colores no solo masculinos |
| P-10b | ¿Quién usa el panel? | **El desarrollador**; el cliente pide los cambios | ADR-0003 aceptada con ese cambio; P-21 (GitHub del cliente) ya no aplica |
| P-06b | Logo | Es la palabra **VÉKTRA** en blanco, letras anchas, con «HAIR STUDIO» espaciado debajo, sobre negro; portada con «Jassary Cruz» en dorado | Paleta recomendada: **negro y dorado** (P-20) |
| P-20 | Colores | **Microcemento** (gris cálido, grafito y salvia, 2026-11-27), reemplaza negro y dorado | TASK-015 |
| P-18 | Dirección | **Av. Ayacucho, Mz. A10, Lote 20 — 3.er piso, Mi Perú, Callao** (2026-10-31) | `negocio.json`: `direccion`, `referencia` («3.er piso») y `provincia`. Falta el enlace de Maps: P-26 |
| P-26 | Enlace de Maps | **https://maps.app.goo.gl/xyGVY4HTM2puz4DM8** (2026-10-31): ficha «Barbería Vektra», -11.8547056, -77.1254608 | `negocio.json`: `mapsUrl` y `coordenadas`. La ficha existe en Maps: ver P-27 |
| P-27 | ¿La ficha «Barbería Vektra» de Maps es suya? | **Sí, es su empresa** (2026-10-31) | No se crea un perfil nuevo: se administra o reclama esa ficha (P-28). P-04 queda corregida |
| P-12 | Fecha | **7 días** (ya se le comunicó) | Plan diario en `ROADMAP.md`, con condiciones |

## Pendientes

- **P-28** ¿El cliente puede **administrar** la ficha «Barbería Vektra» (la creó con su cuenta de Google y le llegan avisos), o la creó otra persona o Google? Si la administra: agregar al desarrollador como administrador. Si no: reclamarla desde Maps con el correo del negocio (P-14). En los dos casos, nombre «Véktra Hair Studio» (P-17). (M, bloquea SEO local)
- **P-17** El logo dice **«VÉKTRA HAIR STUDIO»** (con tilde en la É). ¿Así se escribe en Google, la web y las redes? (B)
- **P-23 respondida (2026-11-26):** el cliente perdió el original del logo. Se conserva la marca tipográfica provisional existente.
- **P-24 respondida (2026-11-26):** lunes a sábado de 10:00 a 21:00; domingos de 11:00 a 18:00, hora de Lima. Redes TikTok, Instagram y Facebook recibidas; WhatsApp +51 995 631 618 reconfirmado.
- **P-25** Fotos: hacen falta los archivos originales (no capturas) y **permiso** de las personas que aparecen; si aparece un menor, permiso de su padre o madre. (M)
- **P-22 respondida (2026-11-26):** recibidos nueve servicios y precios. El dueño solicita categorías por tratamiento, sin duración y fotos de referencia (TASK-012).
- **P-03** ¿Atiende solo con cita, o también sin cita? (B)
- **P-07** ¿Webs o cuentas que le gusten? (B)
- **P-11** ¿Solo español? (M)
- **P-14** Correo del negocio para crear las cuentas a su nombre. (B, bloquea dominio y Google)
- **P-15** Pago 50/50 y garantía de 30 días: ¿de acuerdo? (Contractual)
- **P-16** ¿Le interesa el sistema de reservas más adelante? (B)
