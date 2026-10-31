import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export async function verificarImagenes(directorio) {
  for (const entrada of await readdir(directorio, { withFileTypes: true })) {
    const ruta = join(directorio, entrada.name);
    if (entrada.isDirectory()) await verificarImagenes(ruta);
    else if (/\.(avif|webp|png|jpe?g|gif|svg)$/i.test(entrada.name)) {
      const { size } = await stat(ruta);
      if (size > 200_000)
        throw new Error(`Imagen supera 200 KB: ${ruta} (${size} bytes). Reduce dimensiones o calidad antes de publicar.`);
    }
  }
}
