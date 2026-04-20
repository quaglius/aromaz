const base = 'https://checkout.extractoimportado.com.ar';
const id = '171fe162-8fff-49fa-9e58-eb3b8b69e588';
const patterns = [
  `/api/store/${id}`,
  `/api/stores/${id}`,
  `/api/v1/store/${id}`,
  `/api/stores/${id}/products`,
  `/api/tienda/${id}`,
  `/api/tienda/${id}/productos`,
  `/api/tienda/${id}/producto`,
  `/api/productos?tienda=${id}`,
  `/api/store/${id}/products`,
  `/api/v1/tienda/${id}/productos`,
  `/api/v1/tienda/${id}/producto`,
  `/api/productos?id_tienda=${id}`,
  `/api/productos?tiendaId=${id}`,
  `/api/vendedor/${id}`,
  `/api/vendedor/${id}/productos`,
  `/api/landing/${id}`,
  `/api/landing/${id}/productos`,
];

for (const p of patterns) {
  try {
    const r = await fetch(base + p, { headers: { 'Accept': 'application/json' } });
    const text = await r.text();
    const preview = text.slice(0, 250).replace(/\s+/g, ' ');
    console.log(`${r.status} ${p} -> ${preview}`);
  } catch (e) {
    console.log(`ERR ${p} -> ${e.message}`);
  }
}
