import { describe, expect, it } from "vitest";
import { enlaceWhatsApp } from "./whatsapp";

describe("enlaceWhatsApp", () => {
  it("normaliza espacios", () => {
    expect(enlaceWhatsApp("51 900 000 000", "Hola")).toBe(
      "https://wa.me/51900000000?text=Hola",
    );
  });
  it("codifica tildes y ampersand", () => {
    expect(enlaceWhatsApp("51900000000", "¡Sí! Corte & barba")).toBe(
      "https://wa.me/51900000000?text=%C2%A1S%C3%AD!%20Corte%20%26%20barba",
    );
  });
  it.each(["", "   ", "51900abc000", "+51900000000", "900000000"])(
    "rechaza número inválido %j",
    (numero) => {
      expect(() => enlaceWhatsApp(numero, "Hola")).toThrow(
        /51 seguido de nueve dígitos/,
      );
    },
  );
});
