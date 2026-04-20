import { writeFile, mkdir } from 'node:fs/promises';
import { createWriteStream, existsSync } from 'node:fs';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';
import path from 'node:path';

const API = 'https://admin.extractoimportado.com.ar/api/v2/tienda-web/2307';
const PAGE_SIZE = 100;

const AROMAZ_MARKUP = 1.0; // 1.0 = precio igual a Extracto Importado

// --- Helpers ---
function slugify(str) {
  return String(str)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function parseNotes(text) {
  if (!text) return { salida: [], corazon: [], fondo: [] };
  const clean = text.toLowerCase();
  const out = { salida: [], corazon: [], fondo: [] };
  const salidaMatch = clean.match(/notas?\s+de\s+salida\s*:?\s*([^\n]+)/);
  const corazonMatch = clean.match(/notas?\s+de\s+coraz[oó]n\s*:?\s*([^\n]+)/);
  const fondoMatch = clean.match(/notas?\s+de\s+fondo\s*:?\s*([^\n]+)/);
  const splitNotes = s => s ? s.split(/[,;·\/]|\sy\s/).map(x => x.trim()).filter(x => x && x.length > 1).map(x => x.charAt(0).toUpperCase() + x.slice(1)) : [];
  out.salida = splitNotes(salidaMatch?.[1]);
  out.corazon = splitNotes(corazonMatch?.[1]);
  out.fondo = splitNotes(fondoMatch?.[1]);
  return out;
}

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return r.json();
}

async function downloadImage(url, dest) {
  if (!url) return null;
  if (existsSync(dest)) return dest;
  try {
    const r = await fetch(url);
    if (!r.ok) {
      console.warn(`  ! HTTP ${r.status} for image ${url}`);
      return null;
    }
    const fileStream = createWriteStream(dest);
    await finished(Readable.fromWeb(r.body).pipe(fileStream));
    return dest;
  } catch (e) {
    console.warn(`  ! Error downloading ${url}: ${e.message}`);
    return null;
  }
}

// --- Main scraper ---
console.log('[1/4] Descargando caracteristicas (opciones de filtros)...');
const caracts = await fetchJson('https://admin.extractoimportado.com.ar/api/v2/caracteristicas');
await writeFile('data/caracteristicas.json', JSON.stringify(caracts.data, null, 2));
console.log(`      Caracteristicas: ${caracts.data.characteristics.map(c => c.slug).join(', ')}`);

console.log('\n[2/4] Descargando lista de productos (paginado)...');
let page = 1;
let allProducts = [];
let total = Infinity;

while (allProducts.length < total) {
  const url = `${API}/productos?page=${page}&pageSize=${PAGE_SIZE}&orden=relevancia`;
  const data = await fetchJson(url);
  const productos = data.data.productos;
  const mensaje = data.message;
  const m = mensaje.match(/de\s+(\d+)\s+totales/);
  if (m) total = parseInt(m[1], 10);
  allProducts.push(...productos);
  console.log(`      Pagina ${page}: +${productos.length} (acumulado ${allProducts.length}/${total})`);
  if (productos.length < PAGE_SIZE) break;
  page++;
}

console.log(`\n      Total productos recolectados: ${allProducts.length}`);

console.log('\n[3/4] Descargando detalle completo de cada producto...');
const detailed = [];
for (let i = 0; i < allProducts.length; i++) {
  const p = allProducts[i];
  try {
    const detail = await fetchJson(`${API}/productos/${p.id}`);
    detailed.push(detail.data.producto);
    if ((i + 1) % 20 === 0 || i === allProducts.length - 1) {
      console.log(`      Detalle ${i + 1}/${allProducts.length}`);
    }
  } catch (e) {
    console.warn(`      ! Error detalle ${p.id}: ${e.message}`);
    detailed.push(p); // fallback al de la lista
  }
}

console.log('\n[4/4] Normalizando y descargando imagenes...');
await mkdir('images/products', { recursive: true });

const normalized = [];
for (let i = 0; i < detailed.length; i++) {
  const p = detailed[i];
  const slug = slugify(`${p.nombre}-${p.equivalencia || ''}`).replace(/--+/g, '-').slice(0, 80);

  const notas = parseNotes(p.variantes?.[0]?.descripcion || '');

  const caract = {};
  for (const c of (p.caracteristicasAplicadas || [])) {
    const key = c.caracteristica.slug;
    if (!caract[key]) caract[key] = [];
    if (!caract[key].includes(c.valor)) caract[key].push(c.valor);
  }

  // Presentaciones ordenadas por tamaño (30 -> 50 -> 100 -> 240)
  const sizeOrder = { '30ml': 1, '50ml': 2, '100ml': 3, '240ml': 4 };
  const presentaciones = (p.variantes || [])
    .sort((a, b) => (sizeOrder[a.tamanio?.nombre] || 99) - (sizeOrder[b.tamanio?.nombre] || 99))
    .map(v => ({
      sku: v.sku,
      tamanio: v.tamanio?.nombre || '-',
      precio: Math.round(v.precioMinorista * AROMAZ_MARKUP),
      stock: v.stock || 0,
      disponible: (v.stock || 0) > 0
    }));

  // Imagenes: principal + galerias de cada variante
  const imageUrls = new Set();
  if (p.imagenPrincipal) imageUrls.add(p.imagenPrincipal);
  for (const v of (p.variantes || [])) {
    for (const g of (v.galeria || [])) {
      if (g.url) imageUrls.add(g.url);
    }
  }

  const localImages = [];
  let idx = 0;
  for (const url of imageUrls) {
    const ext = path.extname(new URL(url).pathname) || '.webp';
    const filename = `${p.sku}-${idx}${ext}`;
    const dest = path.join('images', 'products', filename);
    const ok = await downloadImage(url, dest);
    if (ok) localImages.push(`images/products/${filename}`);
    idx++;
  }

  // Descripcion limpia (quitando el HTML y duplicado con notas)
  const rawDesc = stripHtml(p.variantes?.[0]?.descripcion || '');

  normalized.push({
    id: p.id,
    sku: p.sku,
    slug: `${slug}-${p.sku.toLowerCase()}`,
    nombre: p.nombre,
    equivalencia: (p.equivalencia || '').trim(),
    categoria: p.categoria?.slug || 'perfume',
    categoriaNombre: p.categoria?.nombre || 'Perfume',
    genero: caract['genero']?.[0] || 'unisex',
    familiaOlfativa: caract['familia-olfativa'] || [],
    estacionIdeal: caract['estacion-ideal'] || [],
    momentoDia: caract['momento-del-dia'] || [],
    notas,
    descripcionRaw: rawDesc,
    bestseller: !!p.esBestSeller,
    nuevo: !!p.esNuevo,
    imagenPrincipal: localImages[0] || null,
    imagenes: localImages,
    presentaciones,
    precioDesde: Math.min(...presentaciones.map(x => x.precio)),
    precioHasta: Math.max(...presentaciones.map(x => x.precio)),
    stockTotal: presentaciones.reduce((a, b) => a + b.stock, 0),
    tipoProducto: p.tipoProducto
  });

  if ((i + 1) % 10 === 0 || i === detailed.length - 1) {
    console.log(`      Procesado ${i + 1}/${detailed.length}`);
  }
}

await writeFile('data/products.json', JSON.stringify({
  generatedAt: new Date().toISOString(),
  total: normalized.length,
  products: normalized
}, null, 2));

// Resumen
console.log(`\n==========================`);
console.log(`   Total productos: ${normalized.length}`);
console.log(`   Por categoria:`);
const byCat = {};
for (const n of normalized) byCat[n.categoriaNombre] = (byCat[n.categoriaNombre] || 0) + 1;
for (const [k, v] of Object.entries(byCat)) console.log(`     - ${k}: ${v}`);
console.log(`   Por genero:`);
const byGen = {};
for (const n of normalized) byGen[n.genero] = (byGen[n.genero] || 0) + 1;
for (const [k, v] of Object.entries(byGen)) console.log(`     - ${k}: ${v}`);
console.log(`   Best sellers: ${normalized.filter(n => n.bestseller).length}`);
console.log(`   Nuevos: ${normalized.filter(n => n.nuevo).length}`);
console.log(`   Archivo: data/products.json`);
