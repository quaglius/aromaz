import fs from 'node:fs/promises';
import path from 'node:path';

const DOMAIN = 'https://aromazperfumshop.com.ar';
const ROOT = path.resolve(process.cwd());

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/catalogo.html', priority: '0.9', changefreq: 'daily' },
  { loc: '/nosotros.html', priority: '0.6', changefreq: 'monthly' },
  { loc: '/faq.html', priority: '0.6', changefreq: 'monthly' },
  { loc: '/envios.html', priority: '0.6', changefreq: 'monthly' },
  { loc: '/contacto.html', priority: '0.5', changefreq: 'monthly' },
  { loc: '/empresas.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/revende.html', priority: '0.8', changefreq: 'monthly' },
  { loc: '/terminos.html', priority: '0.3', changefreq: 'yearly' },
  { loc: '/promos.html', priority: '0.8', changefreq: 'weekly' },
  { loc: '/promo-generica.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/promo-dia-del-padre.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/promo-dia-de-la-madre.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/promo-cyber-monday.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/promo-black-friday.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/promo-navidad.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/promo-reyes.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/promo-cumpleanos.html', priority: '0.7', changefreq: 'monthly' },
  { loc: '/promo-pareja.html', priority: '0.7', changefreq: 'monthly' }
];

const today = new Date().toISOString().slice(0, 10);

const productsPath = path.join(ROOT, 'data', 'products.json');
const productsRaw = JSON.parse(await fs.readFile(productsPath, 'utf8'));
const products = Array.isArray(productsRaw) ? productsRaw : (productsRaw.products || []);

const urls = [];

for (const p of staticPages) {
  urls.push(
    `  <url>\n    <loc>${DOMAIN}${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
  );
}

for (const prod of products) {
  if (!prod.slug) continue;
  urls.push(
    `  <url>\n    <loc>${DOMAIN}/producto.html?p=${prod.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`
  );
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

const out = path.join(ROOT, 'sitemap.xml');
await fs.writeFile(out, xml, 'utf8');

console.log(`sitemap.xml generado: ${urls.length} URLs (${staticPages.length} páginas estáticas + ${products.length} productos)`);
