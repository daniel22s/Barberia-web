interface FotoConPar {
  id: string;
  data: { par?: { id: string; tipo: "antes" | "despues" } };
}

// El orden del archivo se conserva; solo se publican pares completos y únicos.
export function obtenerPares<T extends FotoConPar>(fotos: T[]) {
  const grupos = new Map<string, { antes?: T; despues?: T }>();
  for (const foto of fotos) {
    const par = foto.data.par;
    if (!par) continue;
    const grupo = grupos.get(par.id) ?? {};
    if (grupo[par.tipo])
      throw new Error(`Par duplicado: ${par.id} (${par.tipo}).`);
    grupo[par.tipo] = foto;
    grupos.set(par.id, grupo);
  }
  return Array.from(grupos, ([id, grupo]) => ({ id, ...grupo })).flatMap(
    ({ id, antes, despues }) => antes && despues ? [{ id, antes, despues }] : [],
  );
}
