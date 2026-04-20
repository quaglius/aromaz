import { writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const API = 'https://admin.extractoimportado.com.ar/api/v2/tienda-web/2307';
const PAGE_SIZE = 100;
const AROMAZ_MARKUP = 1.0;

// ===== Helpers =====
function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function splitNotes(rawList) {
  if (!rawList) return [];
  return rawList
    .split(/[,;·\/]|\s+y\s+/i)
    .map(x => x.trim())
    .filter(x => x && x.length > 1 && x.length < 60)
    .map(x => x.toLowerCase())
    .map(capitalize);
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/[\t ]+/g, ' ')
    .replace(/\n[\t ]+/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function parseDescripcion(html) {
  const text = stripHtml(html);
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const notas = { salida: [], corazon: [], fondo: [] };
  let descripcionExtra = [];
  let estacion = null, momento = null;

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (/^notas?\s+de\s+salida\s*:/i.test(line)) {
      const v = line.split(':').slice(1).join(':').trim();
      notas.salida = splitNotes(v);
    } else if (/^notas?\s+de\s+coraz[oó]n\s*:/i.test(line)) {
      const v = line.split(':').slice(1).join(':').trim();
      notas.corazon = splitNotes(v);
    } else if (/^notas?\s+de\s+fondo\s*:/i.test(line)) {
      const v = line.split(':').slice(1).join(':').trim();
      notas.fondo = splitNotes(v);
    } else if (/^ideal\s+para\s*:/i.test(line)) {
      const v = line.split(':').slice(1).join(':').trim().toLowerCase();
      if (/primavera|verano|otoño|invierno/.test(v)) estacion = v;
      else if (/dia|noche|tarde/.test(v)) momento = v;
    } else if (/^genero\s*:/i.test(line)) {
      // skip, already have it from caracteristicas
    } else if (line.length > 10) {
      descripcionExtra.push(line);
    }
  }

  return { notas, descripcionExtra: descripcionExtra.join(' '), estacionParsed: estacion, momentoParsed: momento };
}

function normalizeProduct(p) {
  const slug = slugify(`${p.nombre}-${p.equivalencia || ''}`).replace(/--+/g, '-').slice(0, 80);

  const rawHtml = p.variantes?.[0]?.descripcion || '';
  const { notas } = parseDescripcion(rawHtml);

  const caract = {};
  for (const c of (p.caracteristicasAplicadas || [])) {
    const key = c.caracteristica.slug;
    if (!caract[key]) caract[key] = [];
    if (!caract[key].includes(c.valor)) caract[key].push(c.valor);
  }

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

  // Buscar imágenes ya descargadas localmente
  const localImages = [];
  for (let i = 0; i < 20; i++) {
    const candidates = [`${p.sku}-${i}.webp`, `${p.sku}-${i}.jpg`, `${p.sku}-${i}.png`];
    let found = null;
    for (const c of candidates) {
      const fp = path.join('images', 'products', c);
      if (existsSync(fp)) { found = `images/products/${c}`; break; }
    }
    if (found) localImages.push(found);
    else if (i > 0) break;
  }

  // Descripción generada: limpia, sin redundancia
  const notasText = [];
  if (notas.salida.length) notasText.push(`salida de ${notas.salida.slice(0, 3).join(', ').toLowerCase()}`);
  if (notas.corazon.length) notasText.push(`corazón de ${notas.corazon.slice(0, 3).join(', ').toLowerCase()}`);
  if (notas.fondo.length) notasText.push(`fondo de ${notas.fondo.slice(0, 3).join(', ').toLowerCase()}`);

  const equivalenciaClean = (p.equivalencia || '').trim();
  const familiaText = caract['familia-olfativa']?.[0] || '';
  const generoText = caract['genero']?.[0] || 'unisex';

  const partsDesc = [];
  if (equivalenciaClean) {
    partsDesc.push(`${p.nombre} es una fragancia ${generoText === 'unisex' ? 'unisex' : generoText === 'femenino' ? 'femenina' : 'masculina'} inspirada en ${equivalenciaClean}.`);
  } else {
    partsDesc.push(`${p.nombre} es una fragancia ${generoText} de alta calidad.`);
  }
  if (familiaText) partsDesc.push(`Pertenece a la familia olfativa ${familiaText}.`);
  if (notasText.length) partsDesc.push(`Presenta notas ${notasText.join(', ')}.`);
  if (caract['estacion-ideal']?.length) partsDesc.push(`Ideal para ${caract['estacion-ideal'].join(' y ')}.`);
  if (caract['momento-del-dia']?.length) partsDesc.push(`Perfecta para el ${caract['momento-del-dia'].join(' y ')}.`);
  const descripcion = partsDesc.join(' ');

  // Reviews falsas determinísticas
  const seed = parseInt(p.sku.replace(/\D/g, '').slice(-3) || '0', 10) || 1;
  const rating = Math.round((4.3 + ((seed * 7) % 70) / 100) * 10) / 10;
  const reviewsCount = 45 + (seed * 13) % 180;

  return {
    id: p.id,
    sku: p.sku,
    slug: `${slug}-${p.sku.toLowerCase()}`,
    nombre: p.nombre,
    equivalencia: equivalenciaClean,
    categoria: p.categoria?.slug || 'perfume',
    categoriaNombre: p.categoria?.nombre || 'Perfume',
    genero: generoText,
    familiaOlfativa: caract['familia-olfativa'] || [],
    estacionIdeal: caract['estacion-ideal'] || [],
    momentoDia: caract['momento-del-dia'] || [],
    notas,
    descripcion,
    bestseller: !!p.esBestSeller,
    nuevo: !!p.esNuevo,
    imagenPrincipal: localImages[0] || null,
    imagenes: localImages,
    presentaciones,
    precioDesde: presentaciones.length ? Math.min(...presentaciones.map(x => x.precio)) : 0,
    precioHasta: presentaciones.length ? Math.max(...presentaciones.map(x => x.precio)) : 0,
    stockTotal: presentaciones.reduce((a, b) => a + b.stock, 0),
    rating,
    reviewsCount,
    tipoProducto: p.tipoProducto
  };
}

// ===== Main =====
console.log('Re-fetching products from list endpoint...');
let page = 1;
let all = [];
let total = Infinity;
while (all.length < total) {
  const r = await fetch(`${API}/productos?page=${page}&pageSize=${PAGE_SIZE}&orden=relevancia`);
  const data = await r.json();
  const m = data.message.match(/de\s+(\d+)\s+totales/);
  if (m) total = parseInt(m[1], 10);
  all.push(...data.data.productos);
  console.log(`  Pagina ${page}: ${all.length}/${total}`);
  if (data.data.productos.length < PAGE_SIZE) break;
  page++;
}

console.log(`\nNormalizing ${all.length} products...`);
const normalized = all.map(normalizeProduct);

await writeFile('data/products.json', JSON.stringify({
  generatedAt: new Date().toISOString(),
  total: normalized.length,
  products: normalized
}, null, 2));

console.log(`\n✓ Written data/products.json (${normalized.length} products)`);
console.log(`\nSample notas from first product:`);
console.log(JSON.stringify(normalized[0].notas, null, 2));
console.log(`\nSample descripcion:`);
console.log(normalized[0].descripcion);
