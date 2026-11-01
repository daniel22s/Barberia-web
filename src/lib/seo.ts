/** Los marcadores se conservan en contenido, pero no son URLs publicables. */
export function urlHttp(valor: string | undefined): string | undefined {
  if (!valor?.trim()) return undefined;
  try {
    const url = new URL(valor);
    return ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export function urlSitio(
  dominio: string,
  alternativa?: string,
): string | undefined {
  const valor = alternativa?.trim() || dominio.trim();
  if (!valor || valor.includes("[") || valor.includes("]")) return undefined;
  const url = urlHttp(valor.includes("://") ? valor : `https://${valor}`);
  if (!url)
    throw new Error("El dominio o SITE_URL debe ser una URL HTTP(S) válida.");
  const parsed = new URL(url);
  if (parsed.pathname !== "/" || parsed.search || parsed.hash)
    throw new Error(
      "El dominio o SITE_URL debe indicar solo el origen, sin rutas ni parámetros.",
    );
  return parsed.origin + "/";
}

export function metaDescripcion(texto: string): string {
  const limpio = texto.replace(/\s+/g, " ").trim();
  return limpio.length <= 155 ? limpio : limpio.slice(0, 154).trimEnd() + "…";
}

export function textoConfirmado(texto: string | undefined): texto is string {
  return !!texto?.trim() && !/\[[^\]]+\]/.test(texto);
}

export function altConDistrito(alt: string, distrito: string): string {
  return textoConfirmado(alt) &&
    !alt.toLocaleLowerCase("es").includes(distrito.toLocaleLowerCase("es"))
    ? `${alt} · ${distrito}`
    : alt;
}
