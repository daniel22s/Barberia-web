import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function completarCSP(directorio) {
  const hashes = new Set();
  async function revisar(carpeta) {
    for (const entrada of await readdir(carpeta, { withFileTypes: true })) {
      const ruta = join(carpeta, entrada.name);
      if (entrada.isDirectory()) await revisar(ruta);
      else if (entrada.name.endsWith(".html")) {
        const html = await readFile(ruta, "utf8");
        for (const script of html.matchAll(
          /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
        )) {
          if (/\bsrc\s*=/.test(script[1]) || !script[2].trim()) continue;
          hashes.add(
            `'sha256-${createHash("sha256").update(script[2]).digest("base64")}'`,
          );
        }
      }
    }
  }
  await revisar(directorio);
  const ruta = join(directorio, "_headers");
  const plantilla = await readFile(ruta, "utf8");
  await writeFile(
    ruta,
    plantilla.replace(
      "script-src 'self';",
      `script-src 'self' ${[...hashes].join(" ")};`,
    ),
  );
}
