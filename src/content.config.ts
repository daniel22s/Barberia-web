import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file } from "astro/loaders";

const texto = z.string().trim().min(1);
const marcador = z
  .string()
  .regex(/^\[[^\]]+\]$/, "Usa una URL válida o un marcador [PENDIENTE].");
const urlPendiente = z.union([z.url(), marcador]);
const hora = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

const negocio = defineCollection({
  loader: file("src/content/negocio.json", {
    parser: (text) => [{ ...JSON.parse(text), id: "principal" }],
  }),
  schema: z.object({
    nombre: texto,
    logoTexto: texto,
    logoSubtexto: texto,
    eslogan: texto,
    descripcion: texto,
    distrito: texto,
    provincia: texto,
    direccion: texto,
    referencia: texto,
    coordenadas: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }),
    mapsUrl: urlPendiente,
    resenasUrl: z.url().regex(/^https?:\/\//).optional(),
    whatsapp: z
      .string()
      .regex(/^51\d{9}$/, "Usa 51 seguido de nueve dígitos, sin separadores."),
    mensajeWhatsapp: texto,
    horario: z.array(
      z.discriminatedUnion("cerrado", [
        z.object({ dia: texto, cerrado: z.literal(true) }),
        z.object({
          dia: texto,
          cerrado: z.literal(false),
          apertura: hora,
          cierre: hora,
        }),
      ]),
    ),
    redes: z.object({
      tiktok: urlPendiente,
      instagram: urlPendiente,
      facebook: urlPendiente,
    }),
    dominio: texto,
    calificacion: z.number().min(1).max(5).optional(),
  }),
});

const servicios = defineCollection({
  loader: file("src/content/servicios.json"),
  schema: z.object({
    grupo: z.enum(["el", "ella"]),
    nombre: texto,
    precio: z.number().nonnegative(),
    precioDesde: z.boolean(),
    duracionMin: z.number().int().positive(),
    descripcion: texto,
    destacado: z.boolean(),
    orden: z.number().int().nonnegative(),
  }),
});

const galeria = defineCollection({
  loader: file("src/content/galeria.json"),
  schema: ({ image }) =>
    z.object({
      imagen: image(),
      alt: texto,
      categoria: z.enum(["el", "ella", "local"]),
      par: z.object({ id: texto, tipo: z.enum(["antes", "despues"]) }).optional(),
    }),
});

const resenas = defineCollection({
  // El parser mantiene [] como colección vacía sin la advertencia del file-loader.
  loader: file("src/content/resenas.json", {
    parser: (text) => {
      const entries = z
        .array(z.looseObject({ id: texto }))
        .parse(JSON.parse(text));
      return Object.fromEntries(entries.map((entry) => [entry.id, entry]));
    },
  }),
  schema: z.object({
    texto,
    autor: texto,
    estrellas: z.number().int().min(1).max(5),
  }),
});

const faq = defineCollection({
  loader: file("src/content/faq.json"),
  schema: z.object({ pregunta: texto, respuesta: texto }),
});

export const collections = { negocio, servicios, galeria, resenas, faq };
