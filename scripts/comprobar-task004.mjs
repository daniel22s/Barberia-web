import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { stripTypeScriptTypes } from "node:module";
import { runInNewContext } from "node:vm";
import { obtenerPares } from "../src/lib/galeria.ts";
import { verificarImagenes } from "./verificar-imagenes.mjs";

const foto = (id, par) => ({ id, data: { par } });
assert.deepEqual(obtenerPares([]), []);
assert.deepEqual(obtenerPares([foto("suelta")]), []);
assert.deepEqual(obtenerPares([foto("a", { id: "corte", tipo: "antes" })]), []);
const antes = foto("a", { id: "corte", tipo: "antes" });
const despues = foto("b", { id: "corte", tipo: "despues" });
assert.deepEqual(obtenerPares([despues, antes]), [{ id: "corte", antes, despues }]);
assert.throws(() => obtenerPares([antes, antes]), /Par duplicado/);
console.log("Pares: vacío, fotos sueltas, incompleto, orden invertido y duplicados: OK");

const directorio = await mkdtemp(join(tmpdir(), "task004-"));
try {
  await mkdir(join(directorio, "_astro"));
  await writeFile(join(directorio, "_astro", "limite.webp"), Buffer.alloc(200_000));
  await verificarImagenes(directorio);
  await writeFile(join(directorio, "_astro", "exceso.avif"), Buffer.alloc(200_001));
  await assert.rejects(verificarImagenes(directorio), /Imagen supera 200 KB/);
  console.log("Presupuesto: acepta 200000 bytes y rechaza 200001 en subdirectorios: OK");
} finally {
  await rm(directorio, { recursive: true, force: true });
}

// Ejecuta el script real del componente con controles simulados. No sustituye
// la comprobación del range nativo con teclado en un navegador.
const componente = await readFile(new URL("../src/components/AntesDespues.astro", import.meta.url), "utf8");
const script = componente.match(/<script>([\s\S]*?)<\/script>/)[1];
const controles = [0, 1].map(() => {
  const atributos = {};
  const propiedades = {};
  let escuchar;
  const control = {
    value: "50",
    setAttribute: (nombre, valor) => { atributos[nombre] = valor; },
    addEventListener: (nombre, fn) => { assert.equal(nombre, "input"); escuchar = fn; },
  };
  const fotos = { style: { setProperty: (nombre, valor) => { propiedades[nombre] = valor; } } };
  return {
    nodo: { querySelector: (selector) => selector === ".fotos" ? fotos : control },
    control, atributos, propiedades,
    cambiar: (valor) => { control.value = valor; escuchar(); },
  };
});
runInNewContext(stripTypeScriptTypes(script), {
  document: { querySelectorAll: () => controles.map(({ nodo }) => nodo) },
});
controles[0].cambiar("0");
assert.equal(controles[0].propiedades["--posicion"], "0%");
assert.equal(controles[0].atributos["aria-valuetext"], "0% de la imagen anterior visible");
assert.equal(controles[1].propiedades["--posicion"], undefined);
controles[0].cambiar("100");
assert.equal(controles[0].propiedades["--posicion"], "100%");
controles[1].cambiar("37");
assert.equal(controles[1].propiedades["--posicion"], "37%");
assert.equal(controles[0].propiedades["--posicion"], "100%");
const bytes = Buffer.byteLength(script);
assert.ok(bytes < 3000);
console.log(`Comparador: extremos, estado accesible, instancias independientes: OK; fuente JS/TS: ${bytes} bytes (<3000, sin medir bundle).`);
