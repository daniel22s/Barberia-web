import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const xml = (texto) =>
  texto.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char],
  );
const encontrar = (root, nombre, extensiones) =>
  extensiones
    .map((ext) => join(root, "src/assets", `${nombre}.${ext}`))
    .find(existsSync);

/** Se ejecuta en build y dev, sin servicios remotos ni nuevas librerías de imágenes. */
export async function generarRecursosSEO(root) {
  const negocio = JSON.parse(
    await readFile(join(root, "src/content/negocio.json"), "utf8"),
  );
  const output = join(root, "public");
  await mkdir(output, { recursive: true });
  const icono = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#0B0B0B"/><rect x="22" y="22" width="468" height="468" rx="96" fill="none" stroke="#C9A23A" stroke-width="12"/><text x="256" y="363" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="310" fill="#C9A23A">${xml([...negocio.logoTexto][0])}</text></svg>`,
  );
  await writeFile(join(output, "favicon.svg"), icono);
  await sharp(icono)
    .resize(32, 32)
    .png()
    .toFile(join(output, "favicon-32.png"));
  await sharp(icono)
    .resize(180, 180)
    .png()
    .toFile(join(output, "apple-touch-icon.png"));
  const reemplazo = encontrar(root, "og", [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "avif",
    "svg",
  ]);
  let social;
  if (reemplazo) {
    social = sharp(reemplazo)
      .resize(1200, 630, { fit: "cover" })
      .flatten({ background: "#0B0B0B" });
  } else {
    const foto = encontrar(root, "portada", [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "avif",
    ]);
    const logo = encontrar(root, "logo", ["svg", "png"]);
    const capas = [];
    if (foto)
      capas.push({
        input: await sharp(foto)
          .rotate()
          .resize(540, 630, { fit: "cover" })
          .toBuffer(),
        top: 0,
        left: 660,
      });
    const palabras = negocio.descripcion.split(/\s+/);
    const lineas = [""];
    for (const palabra of palabras) {
      if ((lineas.at(-1) + palabra).length > 44) lineas.push("");
      lineas[lineas.length - 1] += `${palabra} `;
    }
    const fuente = Math.min(
      88,
      Math.floor(620 / (negocio.logoTexto.length * 0.7)),
    );
    const capa = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="fondo"><stop offset="0.47" stop-color="#0B0B0B"/><stop offset="1" stop-color="#0B0B0B" stop-opacity="${foto ? ".15" : "1"}"/></linearGradient></defs><rect width="1200" height="630" fill="url(#fondo)"/><rect x="48" y="60" width="8" height="510" fill="#C9A23A"/>${logo ? "" : `<text x="92" y="235" font-family="sans-serif" font-weight="bold" font-size="${fuente}" fill="#F5F1E8">${xml(negocio.logoTexto)}</text><text x="96" y="280" font-family="sans-serif" font-size="26" letter-spacing="7" fill="#C9A23A">${xml(negocio.logoSubtexto)}</text>`}<text x="96" y="345" font-family="sans-serif" font-size="26" fill="#C9A23A">${xml(negocio.distrito)} · ${xml(negocio.provincia)}</text>${lineas
      .slice(0, 3)
      .map(
        (linea, index) =>
          `<text x="96" y="${420 + 38 * index}" font-family="sans-serif" font-size="25" fill="#F5F1E8">${xml(linea.trim())}</text>`,
      )
      .join("")}</svg>`;
    capas.push({ input: Buffer.from(capa), top: 0, left: 0 });
    if (logo)
      capas.push({
        input: await sharp(logo)
          .resize(540, 190, { fit: "inside" })
          .png()
          .toBuffer(),
        top: 130,
        left: 96,
      });
    social = sharp({
      create: { width: 1200, height: 630, channels: 3, background: "#0B0B0B" },
    }).composite(capas);
  }
  await social
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(output, "og.jpg"));
}
