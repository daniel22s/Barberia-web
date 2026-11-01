import { describe, expect, it } from "vitest";
import {
  crearHairSalon,
  crearFaq,
  horariosJsonLd,
  serializarJsonLd,
} from "./jsonld";
import { altConDistrito, metaDescripcion, urlSitio } from "./seo";

const negocio = {
  nombre: "Salón de prueba",
  whatsapp: "51912345678",
  direccion: "Dirección de prueba",
  distrito: "Distrito de prueba",
  provincia: "Provincia de prueba",
  coordenadas: { lat: -12, lng: -77 },
  horario: [
    {
      dia: "Lun–Sáb",
      cerrado: false as const,
      apertura: "10:00",
      cierre: "20:00",
    },
    { dia: "Dom", cerrado: true as const },
  ],
  redes: { tiktok: "[URL PENDIENTE]", facebook: "", instagram: undefined },
};
const servicios = [
  {
    nombre: "Corte",
    descripcion: "Corte clásico",
    precio: 20,
    precioDesde: false,
  },
  {
    nombre: "Color",
    descripcion: "[DESCRIPCIÓN PENDIENTE]",
    precio: 90.5,
    precioDesde: true,
  },
];

describe("JSON-LD del negocio", () => {
  it("expande el rango, agrupa horas iguales y marca el domingo cerrado", () => {
    const horas = horariosJsonLd(negocio.horario);
    expect(horas).toHaveLength(2);
    expect(horas[0]!.dayOfWeek).toHaveLength(6);
    expect(horas[0]).toMatchObject({ opens: "10:00", closes: "20:00" });
    expect(horas[1]).toMatchObject({
      dayOfWeek: ["https://schema.org/Sunday"],
      opens: "00:00",
      closes: "00:00",
    });
  });
  it("no afirma horas pendientes de confirmar", () => {
    expect(
      crearHairSalon(
        { ...negocio, horarioNota: "[HORARIO PENDIENTE]" },
        servicios,
      ),
    ).not.toHaveProperty("openingHoursSpecification");
  });
  it("incluye dirección, coordenadas, URL, imagen y teléfono del contenido", () => {
    expect(
      crearHairSalon(
        negocio,
        servicios,
        "https://ejemplo.test/",
        "https://ejemplo.test/og.jpg",
      ),
    ).toMatchObject({
      "@type": "HairSalon",
      name: negocio.nombre,
      telephone: "+51912345678",
      url: "https://ejemplo.test/",
      image: "https://ejemplo.test/og.jpg",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PE",
        addressLocality: negocio.distrito,
      },
      geo: { latitude: -12, longitude: -77 },
    });
  });
  it("mantiene precios numéricos y distingue precio fijo y precio desde", () => {
    const salon = crearHairSalon(negocio, servicios);
    expect(salon.priceRange).toBe("Desde S/ 20");
    expect(
      crearHairSalon(
        negocio,
        servicios.map((s) => ({ ...s, precioDesde: false })),
      ).priceRange,
    ).toBe("S/ 20 – S/ 90.5");
    expect(salon.hasOfferCatalog!.itemListElement[0]).toMatchObject({
      price: 20,
      priceCurrency: "PEN",
    });
    expect(salon.hasOfferCatalog!.itemListElement[1]).toMatchObject({
      priceSpecification: { minPrice: 90.5, priceCurrency: "PEN" },
    });
    expect(salon.hasOfferCatalog!.itemListElement[1]).not.toHaveProperty(
      "price",
    );
    expect(
      salon.hasOfferCatalog!.itemListElement[1]!.itemOffered,
    ).not.toHaveProperty("description");
  });
  it("omite redes vacías, marcadores y protocolos ajenos a HTTP(S)", () => {
    expect(crearHairSalon(negocio, servicios)).not.toHaveProperty("sameAs");
    const redes = {
      una: "https://social.test/perfil",
      duplicada: "https://social.test/perfil",
      falsa: "javascript:alert(1)",
    };
    expect(crearHairSalon({ ...negocio, redes }, servicios).sameAs).toEqual([
      "https://social.test/perfil",
    ]);
  });
  it("no inventa URLs, precios ni calificaciones", () => {
    const salon = crearHairSalon(negocio, []);
    for (const campo of [
      "url",
      "image",
      "priceRange",
      "aggregateRating",
      "hasOfferCatalog",
    ])
      expect(salon).not.toHaveProperty(campo);
  });
});

describe("FAQ y serialización", () => {
  it("no genera FAQPage si faltan respuestas confirmadas", () => {
    expect(crearFaq([])).toBeUndefined();
    expect(
      crearFaq([{ pregunta: "[PREGUNTA]", respuesta: "[RESPUESTA]" }]),
    ).toBeUndefined();
  });
  it("usa las mismas preguntas y respuestas visibles", () => {
    expect(
      crearFaq([
        { pregunta: "Pregunta de prueba", respuesta: "Respuesta de prueba" },
      ])?.mainEntity,
    ).toEqual([
      {
        "@type": "Question",
        name: "Pregunta de prueba",
        acceptedAnswer: { "@type": "Answer", text: "Respuesta de prueba" },
      },
    ]);
  });
  it("impide cerrar el script desde contenido del CMS sin perder el texto", () => {
    const contenido = {
      texto: '</script><script>alert("x")</script>&\u2028\u2029',
    };
    const serializado = serializarJsonLd(contenido);
    expect(serializado).not.toMatch(/[<>&\u2028\u2029]/);
    expect(JSON.parse(serializado)).toEqual(contenido);
  });
});

describe("metadatos SEO", () => {
  it("limita la descripción y normaliza espacios", () => {
    expect(metaDescripcion("  Texto\n de prueba  ")).toBe("Texto de prueba");
    expect(metaDescripcion("a".repeat(200))).toHaveLength(155);
  });
  it("resuelve el dominio confirmado y deja pendientes los marcadores", () => {
    expect(urlSitio("[DOMINIO]")).toBeUndefined();
    expect(urlSitio("ejemplo.test")).toBe("https://ejemplo.test/");
    expect(urlSitio("[DOMINIO]", "http://localhost:4336")).toBe(
      "http://localhost:4336/",
    );
    expect(() => urlSitio("javascript:alert(1)")).toThrow();
    expect(() => urlSitio("https://ejemplo.test/ruta")).toThrow();
  });
  it("añade el distrito sin repetirlo ni convertir marcadores en descripciones", () => {
    expect(altConDistrito("Fade bajo", "Mi Perú")).toBe("Fade bajo · Mi Perú");
    expect(altConDistrito("Fade en MI PERÚ", "Mi Perú")).toBe(
      "Fade en MI PERÚ",
    );
    expect(altConDistrito("[FOTO PENDIENTE]", "Mi Perú")).toBe(
      "[FOTO PENDIENTE]",
    );
  });
});
