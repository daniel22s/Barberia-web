import { expandirHorario, type EntradaHorario } from "./horario";
import { textoConfirmado, urlHttp } from "./seo";

interface NegocioSEO {
  nombre: string;
  whatsapp: string;
  direccion: string;
  distrito: string;
  provincia: string;
  coordenadas: { lat: number; lng: number };
  horario: EntradaHorario[];
  horarioNota?: string;
  redes: Record<string, string | undefined>;
}

interface ServicioSEO {
  nombre: string;
  descripcion: string;
  precio: number;
  precioDesde: boolean;
}

const diasSchema = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function horariosJsonLd(horario: EntradaHorario[]) {
  const grupos = new Map<
    string,
    { "@type": string; dayOfWeek: string[]; opens: string; closes: string }
  >();
  for (const dia of expandirHorario(horario)) {
    const opens = dia.cerrado ? "00:00" : dia.apertura;
    const closes = dia.cerrado ? "00:00" : dia.cierre;
    const clave = `${opens}/${closes}`;
    const grupo = grupos.get(clave) ?? {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [],
      opens,
      closes,
    };
    grupo.dayOfWeek.push(`https://schema.org/${diasSchema[dia.indice]}`);
    grupos.set(clave, grupo);
  }
  return [...grupos.values()];
}

export function crearHairSalon(
  negocio: NegocioSEO,
  servicios: ServicioSEO[],
  sitio?: string,
  imagen?: string,
) {
  const redes = [
    ...new Set(
      Object.values(negocio.redes)
        .map(urlHttp)
        .filter((url): url is string => !!url),
    ),
  ];
  const precios = servicios.map(({ precio }) => precio);
  const image = urlHttp(imagen);
  const url = urlHttp(sitio);
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    ...(url && { "@id": `${url}#negocio`, url }),
    name: negocio.nombre,
    telephone: `+${negocio.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: negocio.direccion,
      addressLocality: negocio.distrito,
      addressRegion: negocio.provincia,
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: negocio.coordenadas.lat,
      longitude: negocio.coordenadas.lng,
    },
    // Una nota de confirmación pendiente no debe convertirse en horas afirmadas para buscadores.
    ...(!negocio.horarioNota &&
      negocio.horario.length > 0 && {
        openingHoursSpecification: horariosJsonLd(negocio.horario),
      }),
    ...(precios.length > 0 && {
      priceRange: servicios.some(({ precioDesde }) => precioDesde)
        ? `Desde S/ ${Math.min(...precios)}`
        : `S/ ${Math.min(...precios)} – S/ ${Math.max(...precios)}`,
    }),
    ...(image && { image }),
    ...(redes.length > 0 && { sameAs: redes }),
    ...(servicios.length > 0 && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios y precios",
        itemListElement: servicios.map((servicio) => ({
          "@type": "Offer",
          ...(servicio.precioDesde
            ? {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: servicio.precio,
                  priceCurrency: "PEN",
                },
              }
            : { price: servicio.precio, priceCurrency: "PEN" }),
          itemOffered: {
            "@type": "Service",
            name: servicio.nombre,
            ...(textoConfirmado(servicio.descripcion) && {
              description: servicio.descripcion,
            }),
          },
        })),
      },
    }),
    // No se emite aggregateRating: el contenido actual no acredita recuento ni origen verificable.
  };
}

export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

export function preguntasPublicables(preguntas: Pregunta[]) {
  return preguntas.filter(
    ({ pregunta, respuesta }) =>
      textoConfirmado(pregunta) && textoConfirmado(respuesta),
  );
}

export function crearFaq(preguntas: Pregunta[]) {
  const publicables = preguntasPublicables(preguntas);
  return publicables.length === 0
    ? undefined
    : {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: publicables.map(({ pregunta, respuesta }) => ({
          "@type": "Question",
          name: pregunta,
          acceptedAnswer: { "@type": "Answer", text: respuesta },
        })),
      };
}

/** Seguro dentro de <script type="application/ld+json">, incluso con contenido del CMS. */
export function serializarJsonLd(valor: unknown): string {
  return JSON.stringify(valor).replace(
    /[<>&\u2028\u2029]/g,
    (caracter) => `\\u${caracter.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}
