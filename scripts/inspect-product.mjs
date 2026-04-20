import { writeFile } from 'node:fs/promises';

const API = 'https://admin.extractoimportado.com.ar/api/v2/tienda-web/2307';

// Get first page to see total and structure
const r = await fetch(`${API}/productos?page=1&pageSize=5&orden=relevancia`);
const data = await r.json();
console.log(`Total productos: ${data.data.total || data.message}`);
console.log(`Productos en primera p\u00e1gina: ${data.data.productos.length}`);

// Full structure of first product
console.log('\n=== PRIMER PRODUCTO COMPLETO ===\n');
console.log(JSON.stringify(data.data.productos[0], null, 2));

// Also try to fetch detail of a specific product
const firstId = data.data.productos[0].id;
const firstSlug = data.data.productos[0].slug || data.data.productos[0].sku;
console.log(`\n=== PROBANDO ENDPOINTS DE DETALLE para id=${firstId} ===`);
const tries = [
  `${API}/productos/${firstId}`,
  `${API}/productos/${data.data.productos[0].sku}`,
  `${API}/producto/${firstId}`,
  `https://admin.extractoimportado.com.ar/api/v2/productos/${firstId}`,
];
for (const url of tries) {
  try {
    const rr = await fetch(url);
    const txt = await rr.text();
    console.log(`\n${rr.status} ${url}`);
    console.log(txt.slice(0, 1500).replace(/\s+/g, ' '));
  } catch (e) {
    console.log(`ERR ${url}: ${e.message}`);
  }
}

// Also get caracteristicas
const cr = await fetch('https://admin.extractoimportado.com.ar/api/v2/caracteristicas');
const c = await cr.json();
await writeFile('scripts/caracteristicas.json', JSON.stringify(c, null, 2));
console.log(`\n=== CARACTER\u00cdSTICAS (guardadas) ===`);
console.log(c.data.characteristics?.map(x => `${x.slug}: ${x.options?.length} opciones`).join('\n'));
