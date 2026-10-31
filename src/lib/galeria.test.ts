import { describe, expect, it } from "vitest";
import { obtenerPares, ordenarComoArchivo } from "./galeria";

const foto = (id: string, par?: { id: string; tipo: "antes" | "despues" }) => ({
  id,
  data: { par },
});

describe("ordenarComoArchivo", () => {
  it("repone el orden del archivo aunque los ids ordenen distinto", () => {
    const fotos = ["f-1", "f-10", "f-2"].map((id) => foto(id));
    expect(
      ordenarComoArchivo(fotos, ["f-2", "f-10", "f-1"]).map(({ id }) => id),
    ).toEqual(["f-2", "f-10", "f-1"]);
  });
  it("deja al final las fotos que no están en la lista", () => {
    const fotos = [foto("x"), foto("a")];
    expect(ordenarComoArchivo(fotos, ["a"]).map(({ id }) => id)).toEqual([
      "a",
      "x",
    ]);
  });
});

describe("obtenerPares", () => {
  it("solo devuelve pares completos", () => {
    const antes = foto("a", { id: "p", tipo: "antes" });
    const despues = foto("b", { id: "p", tipo: "despues" });
    expect(obtenerPares([despues, antes, foto("c")])).toEqual([
      { id: "p", antes, despues },
    ]);
    expect(obtenerPares([antes])).toEqual([]);
  });
  it("rechaza un lado duplicado", () => {
    const antes = foto("a", { id: "p", tipo: "antes" });
    expect(() => obtenerPares([antes, antes])).toThrow(/Par duplicado/);
  });
});
