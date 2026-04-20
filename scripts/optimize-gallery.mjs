/**
 * Convierte las fotos originales (WordPress e Instagram) descargadas
 * a WebP optimizados en images/brand/ con calidad 80 y ancho máx 1200-1600.
 *
 * Usa un MAP con renombres "amigables" para usar en el sitio.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT = 'images/brand';
await fs.mkdir(OUT, { recursive: true });

// from = ruta relativa a la raíz del repo (dentro de images/gallery/ o images/gallery-ig/)
// to   = nombre amigable (la extensión final siempre es .webp)
const MAP = [
  // ========== WordPress ==========
  { from: 'images/gallery/tenada_2024_03_08_21_28_29_213-2.jpeg',    to: 'hero-portrait' },
  { from: 'images/gallery/2022-09-3009415_16-9-1.jpeg',               to: 'hero-wide' },
  { from: 'images/gallery/b6885693-35ef-422f-a0e0-cbd63e86b1bc-1.png',to: 'brand-autumn' },
  { from: 'images/gallery/dsc4902-1.jpeg',                            to: 'lifestyle-waterfall' },
  { from: 'images/gallery/2023-08-073609.jpeg',                       to: 'couple-flowers' },
  { from: 'images/gallery/2023-08-073739-1.jpeg',                     to: 'couple-intimate' },
  { from: 'images/gallery/2022-11-1112547-1.jpeg',                    to: 'woman-green-back' },
  { from: 'images/gallery/2023-01-1702404.jpeg',                      to: 'flatlay-grid' },
  { from: 'images/gallery/2023-01-1702409.jpeg',                      to: 'flatlay-grid-2' },
  { from: 'images/gallery/2022-09-3009265.jpeg',                      to: 'lily-still-life' },
  { from: 'images/gallery/2024-01-2711777-1.jpeg',                    to: 'woman-blue-shirt' },
  { from: 'images/gallery/2024-01-2711703.jpeg',                      to: 'woman-closeup' },
  { from: 'images/gallery/2023-03-2906708-1.jpeg',                    to: 'woman-white-shirt' },
  { from: 'images/gallery/2023-12-219347.jpeg',                       to: 'man-closeup' },
  { from: 'images/gallery/2023-12-219048.jpeg',                       to: 'man-purple' },
  { from: 'images/gallery/2022-11-1112695.jpeg',                      to: 'woman-pink-paper' },
  { from: 'images/gallery/2023-03-2907474.jpeg',                      to: 'splash-coconut' },
  { from: 'images/gallery/2023-03-2907495.jpeg',                      to: 'splash-pasion' },
  { from: 'images/gallery/2023-03-2907227.jpeg',                      to: 'splash-love' },
  { from: 'images/gallery/2023-08-144332-3.jpeg',                     to: 'splash-trio' },

  // ========== Instagram ==========
  { from: 'images/gallery-ig/ig-011.jpg', to: 'ig-desert-woman' },
  { from: 'images/gallery-ig/ig-013.jpg', to: 'ig-hotel-diffuser' },
  { from: 'images/gallery-ig/ig-014.jpg', to: 'ig-hotel-soaps' },
  { from: 'images/gallery-ig/ig-015.jpg', to: 'ig-bathroom-roses' },
  { from: 'images/gallery-ig/ig-016.jpg', to: 'ig-spa-candle' },
  { from: 'images/gallery-ig/ig-017.jpg', to: 'ig-home-spray' },
  { from: 'images/gallery-ig/ig-018.jpg', to: 'ig-wedding-candle' },
  { from: 'images/gallery-ig/ig-020.jpg', to: 'ig-neon-woman' },
  { from: 'images/gallery-ig/ig-021.jpg', to: 'ig-boxing-man' },
  { from: 'images/gallery-ig/ig-022.jpg', to: 'ig-couple-silhouette' },
];

const WIDE_MAX   = 1600;
const NORMAL_MAX = 1200;

function maxWidthFor(name) {
  if (name.startsWith('hero-') || name.startsWith('brand-')) return WIDE_MAX;
  return NORMAL_MAX;
}

for (const { from, to } of MAP) {
  const outPath = path.join(OUT, `${to}.webp`);
  try {
    await fs.access(from);
  } catch {
    // original no está descargado (limpieza previa), salteamos
    continue;
  }
  try {
    const meta = await sharp(from).metadata();
    const maxW = maxWidthFor(to);
    const w = meta.width && meta.width > maxW ? maxW : null;
    await sharp(from)
      .rotate()
      .resize({ width: w || undefined, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(outPath);
    const stat = await fs.stat(outPath);
    console.log(`✓ ${from.padEnd(46)} → ${path.basename(outPath).padEnd(30)} ${(stat.size/1024).toFixed(0)} KB`);
  } catch (e) {
    console.log(`✗ ${from}: ${e.message}`);
  }
}

console.log('\nOK — imágenes disponibles en images/brand/');
