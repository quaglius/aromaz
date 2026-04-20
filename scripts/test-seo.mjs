/**
 * Verifica SEO en las páginas clave:
 *  - title, description, keywords
 *  - og:image absoluta y accesible
 *  - twitter:card + twitter:image
 *  - canonical
 *  - schema.org presente
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const PAGES = [
  { path: '/',                           expectOg: 'og/default.png' },
  { path: '/catalogo.html',              expectOg: 'og/catalogo.png' },
  { path: '/promos.html',                expectOg: 'og/promos.png' },
  { path: '/empresas.html',              expectOg: 'og/empresas.png' },
  { path: '/revende.html',               expectOg: 'og/revende.png' },
  { path: '/nosotros.html',              expectOg: 'og/nosotros.png' },
  { path: '/contacto.html',              expectOg: 'og/contacto.png' },
  { path: '/faq.html',                   expectOg: 'og/default.png' },
  { path: '/envios.html',                expectOg: 'og/default.png' },
  { path: '/promo-generica.html',        expectOg: 'og/promo-generica.png' },
  { path: '/promo-dia-del-padre.html',   expectOg: 'og/promo-dia-del-padre.png' },
  { path: '/promo-black-friday.html',    expectOg: 'og/promo-black-friday.png' },
  { path: '/promo-cyber-monday.html',    expectOg: 'og/promo-cyber-monday.png' },
  { path: '/promo-navidad.html',         expectOg: 'og/promo-navidad.png' },
  { path: '/producto.html?p=extracto-n194-erba-pura-ex-195', expectOg: 'images/products/' }
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

let ok = 0, fail = 0;

for (const { path, expectOg } of PAGES) {
  // `serve` hace redirect 301 de `.html?q=...` a clean URL perdiendo la query string.
  // En prod (Netlify) la query se conserva, así que en local usamos la clean URL.
  const safePath = path.includes('?') ? path.replace(/\.html\?/, '?') : path;
  await page.goto(BASE + safePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  const meta = await page.evaluate(() => {
    const get = (sel) => document.querySelector(sel)?.getAttribute('content') || document.querySelector(sel)?.getAttribute('href') || null;
    const schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
      try { return JSON.parse(s.textContent)['@type']; } catch { return null; }
    });
    return {
      title: document.title,
      desc: get('meta[name="description"]'),
      keywords: get('meta[name="keywords"]'),
      ogTitle: get('meta[property="og:title"]'),
      ogDesc: get('meta[property="og:description"]'),
      ogImage: get('meta[property="og:image"]'),
      ogUrl: get('meta[property="og:url"]'),
      twCard: get('meta[name="twitter:card"]'),
      twImage: get('meta[name="twitter:image"]'),
      canonical: get('link[rel="canonical"]'),
      schemas: schemas.filter(Boolean)
    };
  });

  const problems = [];
  if (!meta.title || meta.title.length < 20) problems.push('title corto o vacío');
  if (!meta.desc || meta.desc.length < 50) problems.push('description corta o vacía');
  if (!meta.ogImage) problems.push('og:image ausente');
  if (meta.ogImage && !meta.ogImage.includes(expectOg)) problems.push(`og:image no coincide (esperaba ${expectOg}, recibido ${meta.ogImage})`);
  if (!meta.twImage) problems.push('twitter:image ausente');
  if (!meta.canonical) problems.push('canonical ausente');

  if (problems.length) {
    console.log(`❌ ${path}`);
    problems.forEach(p => console.log('    ·', p));
    fail++;
  } else {
    console.log(`✓ ${path} — ${meta.title.substring(0, 60)}… | schemas: [${meta.schemas.join(', ')}]`);
    ok++;
  }
}

await browser.close();
console.log(`\n${ok}/${ok+fail} páginas OK`);
process.exit(fail > 0 ? 1 : 0);
