import { readdir, readFile } from "node:fs/promises";
const errores = [];
function revisar(valor, ruta) {
  if (typeof valor === "string" && /\[[^\]]+\]/.test(valor))
    errores.push(`${ruta}: marcador pendiente`);
  if (Array.isArray(valor))
    valor.forEach((v, i) => revisar(v, `${ruta}[${i}]`));
  else if (valor && typeof valor === "object") {
    for (const [clave, v] of Object.entries(valor))
      revisar(v, `${ruta}.${clave}`);
    if (valor.whatsapp === "51900000000")
      errores.push(`${ruta}: teléfono de ejemplo`);
    if (valor.coordenadas?.lat === 0 && valor.coordenadas?.lng === 0)
      errores.push(`${ruta}: coordenadas de ejemplo`);
    if ("precio" in valor && valor.precio <= 0)
      errores.push(`${ruta}: precio inválido`);
    if (valor.duracionMin === 1) errores.push(`${ruta}: duración de ejemplo`);
  }
}
for (const archivo of await readdir(
  new URL("../src/content/", import.meta.url),
)) {
  if (!archivo.endsWith(".json")) continue;
  revisar(
    JSON.parse(
      await readFile(
        new URL(`../src/content/${archivo}`, import.meta.url),
        "utf8",
      ),
    ),
    archivo,
  );
}
if (errores.length)
  throw new Error(`Contenido pendiente de publicación:\n${errores.join("\n")}`);
console.log("Contenido listo: sin marcadores ni datos de ejemplo detectados.");
