# Publicación y entrega

## Cuentas (todas a nombre del cliente)

| Cuenta | Para qué | Quién la crea |
|---|---|---|
| Correo del negocio (Gmail) | Dueño de todas las demás cuentas | Cliente |
| Cloudflare | Hosting (Pages), dominio y analítica | Cliente; el desarrollador entra como miembro |
| GitHub | Código fuente | Repositorio transferible al cliente al terminar **[D]** |
| Google Business Profile | Mapa y reseñas | Cliente, con guía |
| Google Search Console | Seguimiento de búsquedas | Cliente; el desarrollador como usuario |

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
