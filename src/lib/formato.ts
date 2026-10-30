export function formatearPrecio(precio: number, desde = false): string {
  if (!Number.isFinite(precio) || precio < 0)
    throw new Error("Precio inválido");
  return `${desde ? "desde " : ""}S/ ${precio.toFixed(Number.isInteger(precio) ? 0 : 2)}`;
}

export function formatearDuracion(minutos: number): string {
  if (!Number.isInteger(minutos) || minutos <= 0)
    throw new Error("Duración inválida");
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return [horas ? `${horas} h` : "", resto ? `${resto} min` : ""]
    .filter(Boolean)
    .join(" ");
}
