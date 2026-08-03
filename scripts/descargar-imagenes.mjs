#!/usr/bin/env node
/**
 * Descarga las imágenes originales de Framer a /public/img.
 *
 *   npm run imagenes        → descarga las que falten
 *   npm run imagenes -- -f  → vuelve a descargar todas
 *
 * Nunca corta el build: si una imagen falla, avisa y sigue (el sitio usa la URL
 * remota como respaldo).
 */

import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEST = join(ROOT, 'public', 'img');
const FORCE = process.argv.includes('-f') || process.argv.includes('--force');

// nombre local  →  id de Framer
const IMAGES = {
  // Los 3 PNG siguen descargándose por si se colocan más adelante
  'marca-1.png': 'ZnDS1sLoNXXyxKTTzxtwajPYc.png',
  'marca-2.png': '5oMD8T6MEjYlTXCXsgjZlmpDGY.png',
  'marca-3.png': 'HtSI9peN5sWhUTmdOBxunxyO6T4.png',
  'oficina.jpg': 'mgRdbBZJGPn94ft58M4tL0u810.jpg',
  'diseno-web.jpg': 'yCcyXXnlSxsnynkfXT6uzTu1dY.jpg',
  'desarrollo-web.jpg': 'eoUdREFfjogISB3XYJJK9Wr2s.jpg',
  'posicionamiento-web.jpg': 'yfMmkpVDpnZUduaLy9mKK9R835o.jpg',
  'diseno-grafico.jpg': 'zWHIxkz9zb6gD7w73TyvSnPXcZU.jpg',
  'equipo-cta.jpg': 'XrAkB5lDZ7p7k8FlKgFA3Z8Uxw.jpg',
  'jaime.jpg': 'HEqa9cuWzQPeAaKu8yOKbl6zOrA.jpeg',
};

const BASE = 'https://framerusercontent.com/images/';
const MAX_WIDTH = 1800; // suficiente para pantallas retina sin pesar de más

const exists = (p) =>
  access(p).then(
    () => true,
    () => false
  );

async function descargar(nombre, id) {
  const destino = join(DEST, nombre);

  if (!FORCE && (await exists(destino))) {
    console.log(`  ·  ${nombre} (ya estaba)`);
    return true;
  }

  // Framer redimensiona con ?width=. Si no lo acepta, se pide el original.
  for (const url of [`${BASE}${id}?width=${MAX_WIDTH}`, `${BASE}${id}`]) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const buffer = Buffer.from(await res.arrayBuffer());
      await writeFile(destino, buffer);
      console.log(`  ✓  ${nombre}  ${(buffer.length / 1024).toFixed(0)} KB`);
      return true;
    } catch {
      /* se prueba la siguiente URL */
    }
  }

  console.warn(`  ✗  ${nombre} — no se pudo descargar, se usará la URL de Framer`);
  return false;
}

async function main() {
  await mkdir(DEST, { recursive: true });
  console.log(`\nDescargando imágenes en public/img${FORCE ? ' (forzado)' : ''}\n`);

  const entradas = Object.entries(IMAGES);
  const resultados = [];
  for (const [nombre, id] of entradas) {
    resultados.push(await descargar(nombre, id));
  }

  const ok = resultados.filter(Boolean).length;
  console.log(`\n${ok}/${entradas.length} imágenes listas\n`);
}

main().catch((err) => {
  console.warn('No se pudieron descargar las imágenes:', err.message);
});
