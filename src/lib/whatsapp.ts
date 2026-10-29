/** Normaliza separadores de presentación y conserva el código de país. */
export function enlaceWhatsApp(numero: string, mensaje: string): string {
  const normalizado = numero.replace(/\s/g, "");
  if (!/^51\d{9}$/.test(normalizado)) {
    throw new Error("WhatsApp requiere 51 seguido de nueve dígitos.");
  }
  return `https://wa.me/${normalizado}?text=${encodeURIComponent(mensaje)}`;
}
