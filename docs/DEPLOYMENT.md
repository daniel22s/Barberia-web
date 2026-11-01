# Publicación y entrega

## Cuentas (todas a nombre del cliente)

| Cuenta                     | Para qué                             | Quién la crea                                           |
| -------------------------- | ------------------------------------ | ------------------------------------------------------- |
| Correo del negocio (Gmail) | Dueño de todas las demás cuentas     | Cliente                                                 |
| Cloudflare                 | Hosting (Pages), dominio y analítica | Cliente; el desarrollador entra como miembro            |
| GitHub                     | Código fuente                        | Repositorio transferible al cliente al terminar **[D]** |
| Google Business Profile    | Mapa y reseñas                       | Cliente, con guía                                       |
| Google Search Console      | Seguimiento de búsquedas             | Cliente; el desarrollador como usuario                  |

## Flujo

1. Rama de trabajo → vista previa automática de Cloudflare Pages en cada push.
2. El dueño revisa la vista previa → merge a `main` → publicación.
3. Primera publicación: conectar el dominio, verificar HTTPS, enviar el sitemap a Search Console y probar los datos estructurados.

## Entrega final

- Código fuente y acceso al repositorio.
- Cuentas a nombre del cliente, con contraseñas cambiadas por él.
- Guía corta: cómo pedir un cambio, cómo renovar el dominio y cómo usar el perfil de Google.
- Resultados reales de Lighthouse y de la prueba de resultados enriquecidos.

## Respaldo

El sitio entero está en el repositorio: si Cloudflare falla, se vuelve a publicar desde GitHub en minutos. No hay base de datos que respaldar.

## Panel de edición — TASK-009

**Lo usa el desarrollador**, cuando el cliente pide un cambio (ADR-0003).
Preparación local; la conexión a Pages CMS y las pruebas en una vista previa de
Cloudflare todavía no están realizadas. No introducir contenido de prueba en
`main` ni dar por medido el plazo de cinco minutos hasta ejecutar la prueba real.

### Entrar y elegir la rama

1. Abrir [Pages CMS](https://app.pagescms.org/) desde el navegador del celular e
   iniciar sesión con GitHub del desarrollador.
2. Si hace falta, instalar la aplicación GitHub de Pages CMS solo para
   `daniel22s/Barberia-web`. No compartir contraseñas ni guardar tokens en el repo.
3. Seleccionar el repositorio y una rama de vista previa que contenga `.pages.yml`.
   Verificar la rama antes de guardar. La instalación del panel no configura
   Cloudflare: su integración Git y las vistas previas corresponden a TASK-008.
4. Confirmar que aparecen «Servicios y precios», «Fotos y comparaciones» y
   «Horario y mensaje de WhatsApp». No se necesita añadir un panel al sitio Astro.

Guía oficial: [inicio de Pages CMS](https://pagescms.org/docs/quick-start/).

### Cambiar un precio o servicio

1. Abrir «Servicios y precios» y localizar el servicio por nombre e identificador.
2. Escribir el precio como número, sin `S/`. Mínimo **S/ 1**; se admiten decimales.
   Un precio vacío o 0 no se puede guardar. `precioDesde` añade «desde» al importe.
3. La duración es un entero positivo en minutos y el orden es un entero desde
   cero. Elegir «Para él» o «Para ella». Al crear un servicio, darle un `id` único;
   al editar, conservarlo. Nombre y descripción no pueden estar en blanco.
4. Guardar, anotar el SHA del commit y revisar el build y la vista previa antes de
   fusionar. La lista JSON se guarda completa: coordinar ediciones para evitar
   sobrescribir cambios de otra persona.

**Precio vacío (resuelto en la revisión de TASK-009):** el validador de Pages CMS 2.1.8
([`6f4e860`](https://github.com/pagescms/pagescms/blob/6f4e860a35d934406580287e7042e5e111e207a1/fields/core/number/index.tsx))
convierte `""` en `0` con `z.coerce.number()`. Por eso el precio tiene **mínimo 1**
en `.pages.yml` y en Zod: el 0 que resulta de un campo vacío se rechaza en el panel
y, si llegara a guardarse, el build falla.

### Subir una foto y añadirla a la galería

1. Usar una imagen autorizada y **quitar la ubicación GPS antes de subirla**.
   En el celular, exportar/compartir una copia con la opción de ubicación
   desactivada y comprobar sus detalles. Esa opción varía entre dispositivos:
   si no permite confirmar que está limpia, preparar la copia en computadora.
   Con ExifTool instalado como herramienta externa puede hacerse:
   `exiftool -all= -o foto-sin-metadatos.jpg foto-original.jpg` y después
   `exiftool -gps:all -a -G1 foto-sin-metadatos.jpg` (sin salida GPS).
   La carga al CMS crea un archivo en GitHub: la optimización posterior de Astro
   no elimina datos del original que ya se haya subido al historial.
2. En «Fotos y comparaciones», añadir un elemento y un `id` único. En «Foto»,
   subir el archivo o seleccionar uno existente en la biblioteca de medios.
3. Escribir el `alt` describiendo lo visible y elegir la categoría. El archivo se
   guarda en `src/assets/galeria/`, y el JSON debe guardar una ruta como
   `../assets/galeria/foto-sin-metadatos.jpg`, relativa a `src/content/galeria.json`.
   **No usar `/src/assets/...` ni `/public/...`** en ese JSON.
4. Para una foto suelta, dejar los dos campos de «Comparación» vacíos. Para un
   antes/después, usar el mismo identificador de par en dos fotos con `id`
   individuales distintos y elegir «Antes» y «Después». Un duplicado del mismo
   lado del par hace fallar el build; uno incompleto no muestra comparador.
5. Guardar y revisar la vista previa. Astro publica AVIF/WebP y carga diferida;
   el build falla si una imagen publicada supera **200000 bytes**. El original
   no debe aparecer como descarga directa en la página. Si falla el presupuesto,
   reducir dimensiones/calidad del original y volver a guardar.

La lista acepta SVG para conservar el ejemplo existente; para fotos usar JPEG,
PNG, WebP o AVIF. No publicar el ejemplo ni los marcadores como contenido final.

### Horario y mensaje

Solo se editan `horario` y `mensajeWhatsapp` en el formulario del negocio.
`settings.content.merge: true` conserva nombre, dirección, Maps, redes y las demás
claves no incluidas; no desactivarlo. Pages CMS reemplaza el array de horario
completo al guardar. [Comportamiento oficial de merge](https://pagescms.org/docs/configuration/settings/).

Usar `Lun`, `Mar`, `Mié`, `Jue`, `Vie`, `Sáb`, `Dom`, o rangos como `Lun–Sáb`.
No solapar días ni invertir rangos. Marcar «Cerrado» para un día sin atención;
dejar apertura y cierre vacíos. En un día abierto, ambos son obligatorios en
formato `HH:MM`, de 00:00 a 23:59, hora de Lima.

El CMS comprueba formatos, opciones y mínimos. Su configuración no expresa la
obligatoriedad de las horas condicionada a «Cerrado», los enteros de Zod ni las
reglas entre entradas. Astro y las funciones del sitio validan esos casos al
compilar; revisar el resultado del build antes de aprobar el contenido.
`step: 1` ayuda a introducir enteros, pero no sustituye la validación del build.

`horarioNota` se conserva y no es editable desde el panel; el desarrollador la
quita en código cuando se confirme P-24. El mensaje de WhatsApp cambia el texto
del enlace; el teléfono sigue siendo un dato gestionado fuera del panel.

### Deshacer desde el historial de GitHub

1. En la misma rama de vista previa, abrir el historial del archivo modificado
   en GitHub y localizar la versión anterior al cambio. Anotar su SHA.
2. Abrir el archivo en ese commit y copiar su contenido completo. Volver a la
   rama de vista previa, pulsar editar, restaurar ese contenido y crear un commit
   de reversión. Esto conserva el historial, sin borrar ni reescribir commits.
3. Si el cambio abarca varios archivos, revertir el commit completo desde un
   checkout de esa rama con `git revert <SHA_DEL_CAMBIO>` y hacer push. Para un PR
   fusionado también existe la opción «Revert» del PR. No restablecer la rama con
   `reset --hard` ni usar push forzado para deshacer una edición de contenido.
4. Esperar al build de reversión y verificar que la vista previa muestra el precio
   o la foto anterior. Una subida de medios y la entrada de galería pueden ser
   commits separados: quitar primero la referencia antes de borrar la imagen.

### Publicación provisional en la cuenta del desarrollador (2026-11-01)

Decisión del dueño: publicar **de momento** en una cuenta de Cloudflare propia
para enseñar la web al cliente, y pasarla después a la cuenta del cliente
(ADR-0002 y TASK-008 siguen vigentes). Cloudflare no transfiere proyectos de
Pages entre cuentas: en la cuenta del cliente se crea un proyecto nuevo
conectado al mismo repositorio y se borra el provisional.

- `public/_headers` envía `X-Robots-Tag: noindex` en `*.pages.dev`, para que
  Google no indexe la copia provisional con datos de relleno.
- Sin dominio propio: no hay canonical ni sitemap hasta configurar
  `negocio.dominio` o `SITE_URL`.

La configuración prevista de Cloudflare debe usar Node **22.23.4**, `npm run build`
y salida `dist`; habilitar vistas previas de la rama elegida. Un build fallido no
debe desplegarse. La conservación de la última versión correcta y el flujo de
reversión se comprobarán en el hosting real durante TASK-008/TASK-009.
[Vistas previas de Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/preview-deployments/).

### Registro pendiente de la prueba desde el celular

Completar en `docs/tasks/TASK-009-panel-edicion.md`: fecha/hora de Lima, rama,
modelo/navegador del celular, SHA antes/después, URL de vista previa y capturas.
Medir desde «Guardar» hasta ver el precio nuevo (< 5 minutos); subir una imagen
de 4 MB y registrar tamaño y ausencia de GPS de sus variantes publicadas;
comprobar que el precio vacío no se guarda como cero; revertir el cambio y
verificar la versión anterior. Las pruebas locales no aprueban estos criterios
de extremo a extremo.
