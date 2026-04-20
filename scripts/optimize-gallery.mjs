/**
 * Convierte las fotos originales descargadas de WordPress/Instagram
 * (en images/gallery/) a WebP optimizados en images/brand/ con
 * un ancho máximo razonable y calidad 80.
 *
 * Lee un MAP con renombres "amigables" para usar en el sitio.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const SRC = 'images/gallery';
const OUT = 'images/brand';

// Mapeo de nombre original → nombre "limpio" usado en el sitio.
// Si una imagen no está acá, se saltea (así evitamos subir basura al repo).
const MAP = {
  // Hero / home
  'tenada_2024_03_08_21_28_29_213-2.jpeg': 'hero-portrait.jpg',
  '2022-09-3009415_16-9-1.jpeg':             'hero-wide.jpg',

  // Branding / nosotros
  'b6885693-35ef-422f-a0e0-cbd63e86b1bc-1.png': 'brand-autumn.jpg',
  'dsc4902-1.jpeg':                              'lifestyle-waterfall.jpg',
  '2023-08-073609.jpeg':                         'couple-flowers.jpg',
  '2023-08-073739-1.jpeg':                       'couple-intimate.jpg',
  '2022-11-1112547-1.jpeg':                      'woman-green-back.jpg',

  // Producto / flat-lay
  '2023-01-1702404.jpeg': 'flatlay-grid.jpg',
  '2023-01-1702409.jpeg': 'flatlay-grid-2.jpg',
  '2022-09-3009265.jpeg': 'lily-still-life.jpg',

  // Modelos / emocional
  '2024-01-2711777-1.jpeg':   'woman-blue-shirt.jpg',
  '2024-01-2711703.jpeg':     'woman-closeup.jpg',
  '2023-03-2906708-1.jpeg':   'woman-white-shirt.jpg',
  '2023-12-219347.jpeg':      'man-closeup.jpg',
  '2023-12-219048.jpeg':      'man-purple.jpg',
  '2022-11-1112695.jpeg':     'woman-pink-paper.jpg',

  // Body splash (revende / categoría splash)
  '2023-03-2907474.jpeg':     'splash-coconut.jpg',
  '2023-03-2907495.jpeg':     'splash-pasion.jpg',
  '2023-03-2907227.jpeg':     'splash-love.jpg',
  '2023-08-144332-3.jpeg':    'splash-trio.jpg',
};

await fs.mkdir(OUT, { recursive: true });

// ancho máx distinto según el uso: los "hero" pueden pesar más.
const WIDE_MAX   = 1600;
const NORMAL_MAX = 1200;

function maxWidthFor(name) {
  if (name.startsWith('hero-') || name.startsWith('brand-')) return WIDE_MAX;
  return NORMAL_MAX;
}

for (const [src, dest] of Object.entries(MAP)) {
  const inPath  = path.join(SRC, src);
  const outPath = path.join(OUT, dest.replace(/\.jpe?g$/i, '.webp'));
  try {
    const meta = await sharp(inPath).metadata();
    const maxW = maxWidthFor(dest);
    const w = meta.width && meta.width > maxW ? maxW : null;
    await sharp(inPath)
      .rotate()
      .resize({ width: w || undefined, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(outPath);
    const stat = await fs.stat(outPath);
    console.log(`✓ ${src.padEnd(48)} → ${path.basename(outPath).padEnd(30)} ${(stat.size/1024).toFixed(0)} KB`);
  } catch (e) {
    console.log(`✗ ${src}: ${e.message}`);
  }
}

console.log('\nOK — imágenes disponibles en images/brand/');
