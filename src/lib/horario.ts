export const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;
const nombres = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
  "domingo",
];

export type EntradaHorario =
  | { dia: string; cerrado: true }
  | { dia: string; cerrado: false; apertura: string; cierre: string };

function indiceDia(nombre: string): number {
  const normalizado = nombre
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
  const indice = nombres.findIndex(
    (dia) => dia === normalizado || dia.slice(0, 3) === normalizado,
  );
  if (indice < 0) throw new Error(`Día de horario desconocido: ${nombre}`);
  return indice;
}

/** Lunes = 0, domingo = 6; la fecha se recibe para mantener la función pura. */
export function diaActualEnLima(fecha: Date): number {
  const dia = new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    weekday: "long",
  }).format(fecha);
  return indiceDia(dia);
}

/** Expande rangos existentes (Lun–Sáb) y agrupa solo días consecutivos iguales. */
export function obtenerHorario(
  entradas: readonly EntradaHorario[],
  fecha: Date,
) {
  const porDia = new Map<number, string>();
  for (const entrada of entradas) {
    const extremos = entrada.dia.split(/\s*[–—-]\s*/);
    if (extremos.length > 2)
      throw new Error(`Rango de horario inválido: ${entrada.dia}`);
    const inicio = indiceDia(extremos[0]!);
    const fin = extremos[1] ? indiceDia(extremos[1]) : inicio;
    if (fin < inicio)
      throw new Error(`Rango de horario invertido: ${entrada.dia}`);
    const horas = entrada.cerrado
      ? "Cerrado"
      : `${entrada.apertura} – ${entrada.cierre}`;
    for (let indice = inicio; indice <= fin; indice++) {
      if (porDia.has(indice))
        throw new Error(`Día de horario duplicado: ${dias[indice]}`);
      porDia.set(indice, horas);
    }
  }
  const horarioDiario = [...porDia]
    .sort(([a], [b]) => a - b)
    .map(([indice, horas]) => ({
      indice,
      dia: dias[indice]!,
      horas,
    }));
  const grupos: { inicio: number; fin: number; horas: string }[] = [];
  for (const dia of horarioDiario) {
    const anterior = grupos.at(-1);
    if (
      anterior &&
      anterior.fin + 1 === dia.indice &&
      anterior.horas === dia.horas
    ) {
      anterior.fin = dia.indice;
    } else {
      grupos.push({ inicio: dia.indice, fin: dia.indice, horas: dia.horas });
    }
  }
  return {
    diaActual: diaActualEnLima(fecha),
    dias: horarioDiario,
    resumen: grupos.map(
      ({ inicio, fin, horas }) =>
        `${inicio === fin ? dias[inicio] : `${dias[inicio]} – ${dias[fin]}`} ${horas}`,
    ),
  };
}
