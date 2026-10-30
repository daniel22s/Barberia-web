import { describe, expect, it } from "vitest";
import { formatearPrecio, formatearDuracion } from "./formato";

describe("formatearPrecio", () => {
  it.each([
    [25, false, "S/ 25"],
    [12.5, false, "S/ 12.50"],
    [90, true, "desde S/ 90"],
    [0, false, "S/ 0"],
  ] as const)("%s, desde %s", (valor, desde, esperado) =>
    expect(formatearPrecio(valor, desde)).toBe(esperado),
  );
  it.each([-1, NaN, Infinity])("rechaza %s", (valor) =>
    expect(() => formatearPrecio(valor)).toThrow(),
  );
});
describe("formatearDuracion", () => {
  it.each([
    [40, "40 min"],
    [120, "2 h"],
    [90, "1 h 30 min"],
    [60, "1 h"],
  ] as const)("%s minutos", (valor, esperado) =>
    expect(formatearDuracion(valor)).toBe(esperado),
  );
  it.each([0, -1, 1.5, NaN, Infinity])("rechaza %s", (valor) =>
    expect(() => formatearDuracion(valor)).toThrow(),
  );
});
