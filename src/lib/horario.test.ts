import { describe, expect, it } from "vitest";
import {
  diaActualEnLima,
  obtenerHorario,
  type EntradaHorario,
} from "./horario";

const fecha = new Date("2026-11-02T02:30:00Z");
const abierto = (
  dia: string,
  apertura = "10:00",
  cierre = "20:00",
): EntradaHorario => ({
  dia,
  cerrado: false,
  apertura,
  cierre,
});

describe("horario", () => {
  it("expande el formato del contenido y conserva el domingo cerrado", () => {
    const entradas: EntradaHorario[] = [
      abierto("Lun–Sáb"),
      { dia: "Dom", cerrado: true },
    ];
    const original = structuredClone(entradas);
    const resultado = obtenerHorario(entradas, fecha);
    expect(resultado.resumen).toEqual([
      "Lun – Sáb 10:00 – 20:00",
      "Dom Cerrado",
    ]);
    expect(resultado.dias).toHaveLength(7);
    expect(resultado.dias[6]).toEqual({
      indice: 6,
      dia: "Dom",
      horas: "Cerrado",
    });
    expect(entradas).toEqual(original);
  });
  it("ordena y agrupa días consecutivos con horas iguales", () => {
    expect(
      obtenerHorario(
        [
          abierto("Sábado", "09:00", "14:00"),
          abierto("Vie"),
          abierto("Lun"),
          abierto("Mar"),
          abierto("Jue"),
          abierto("Mié"),
          { dia: "Dom", cerrado: true },
        ],
        fecha,
      ).resumen,
    ).toEqual(["Lun – Vie 10:00 – 20:00", "Sáb 09:00 – 14:00", "Dom Cerrado"]);
  });
  it("refleja cambios de horas sin agrupar días ausentes o distintos", () => {
    expect(
      obtenerHorario(
        [abierto("Lun"), abierto("Mié"), abierto("Jue", "11:00")],
        fecha,
      ).resumen,
    ).toEqual(["Lun 10:00 – 20:00", "Mié 10:00 – 20:00", "Jue 11:00 – 20:00"]);
    expect(obtenerHorario([], fecha).resumen).toEqual([]);
  });
  it("usa Lima aunque UTC ya esté en lunes y cambia a medianoche local", () => {
    expect(fecha.getUTCDay()).toBe(1);
    expect(diaActualEnLima(fecha)).toBe(6);
    expect(obtenerHorario([], fecha).diaActual).toBe(6);
    expect(diaActualEnLima(new Date("2026-11-02T04:59:59Z"))).toBe(6);
    expect(diaActualEnLima(new Date("2026-11-02T05:00:00Z"))).toBe(0);
  });
  it("rechaza días desconocidos, rangos invertidos y duplicados", () => {
    expect(() => obtenerHorario([abierto("Feriado")], fecha)).toThrow(
      /desconocido/,
    );
    expect(() => obtenerHorario([abierto("Dom–Lun")], fecha)).toThrow(
      /invertido/,
    );
    expect(() =>
      obtenerHorario([abierto("Lun–Vie"), abierto("Lun")], fecha),
    ).toThrow(/duplicado/);
  });
});
