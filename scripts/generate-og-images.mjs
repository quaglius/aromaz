/**
 * Genera imágenes Open Graph (1200x630) para las páginas clave del sitio.
 * Se usan en meta tags og:image/twitter:image para que cuando compartan una URL
 * (WhatsApp, Instagram DM, Messenger, Twitter, etc.) se vea un preview hermoso.
 *
 * Output: images/og/{slug}.png
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const DOMAIN = 'aromazperfumshop.netlify.app';

const PAGES = [
  {
    slug: 'default',
    eyebrow: 'Perfumes importados · Argentina',
    title: 'Encontrá tu<br><em>fragancia perfecta</em>',
    desc: 'Más de 220 fragancias de Extracto Importado. Envíos a todo el país. 10% OFF por transferencia.',
    badges: ['+220 fragancias', 'Envío gratis +$50K', '10% OFF transferencia'],
    emoji: '✨',
    color: '#0a0a0a',
    accent: '#c9a35a'
  },
  {
    slug: 'catalogo',
    eyebrow: 'Catálogo completo',
    title: 'Más de 220<br><em>fragancias</em>',
    desc: 'Femeninos, masculinos y unisex. Body splash, discovery sets y más. Encontrá tu próximo perfume.',
    badges: ['Mujer · Hombre · Unisex', 'Body Splash', 'Discovery Sets'],
    emoji: '🧴',
    color: '#0a0a0a',
    accent: '#c9a35a'
  },
  {
    slug: 'promos',
    eyebrow: 'Promociones vigentes',
    title: 'Descuentos<br><em>que te regalan algo</em>',
    desc: 'Llevá 2 y pagá menos. Promos por fechas especiales. Códigos válidos por WhatsApp.',
    badges: ['15% OFF llevando 2', 'Cyber · Black Friday', 'Fechas especiales'],
    emoji: '🎁',
    color: '#12081d',
    accent: '#c9a35a'
  },
  {
    slug: 'empresas',
    eyebrow: 'Aromaz para empresas',
    title: 'Perfumes<br><em>con tu logo</em>',
    desc: 'Regalos corporativos, amenities de hotel, souvenirs de boda y 15. Cotizaciones en 24hs.',
    badges: ['Corporate gifts', 'Amenities hoteleros', 'Souvenirs premium'],
    emoji: '💼',
    color: '#0f1b2b',
    accent: '#c9a35a'
  },
  {
    slug: 'revende',
    eyebrow: 'Programa de revendedoras',
    title: 'Revendé<br><em>Extracto Importado</em>',
    desc: 'Pedí desde 6 unidades con precio mayorista. Más de 220 fragancias, márgenes reales.',
    badges: ['Desde 6 unidades', 'Mayorista real', 'Sin mínimos mensuales'],
    emoji: '💸',
    color: '#0a1f1a',
    accent: '#c9a35a'
  },
  {
    slug: 'nosotros',
    eyebrow: 'Quiénes somos',
    title: 'Aromaz<br><em>Perfum Shop</em>',
    desc: 'Distribuidores oficiales de Extracto Importado. Más de 600.000 perfumes vendidos en Argentina.',
    badges: ['Distribuidor oficial', '+600K vendidos', 'Atención personalizada'],
    emoji: '🌿',
    color: '#1a0d0a',
    accent: '#c9a35a'
  },
  {
    slug: 'contacto',
    eyebrow: 'Hablemos',
    title: 'Atención<br><em>por WhatsApp</em>',
    desc: 'Respuesta en minutos. Te ayudamos a elegir tu fragancia ideal y coordinamos envío.',
    badges: ['WhatsApp directo', 'Respuesta rápida', 'Lun a Sáb 10 a 19'],
    emoji: '💬',
    color: '#0a1a14',
    accent: '#25d366'
  }
];

function buildHtml(p) {
  return `<!DOCTYPE html><html lang="es"><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; overflow:hidden; background:${p.color}; font-family:'Inter',system-ui,sans-serif; color:#fff; }
  .stage {
    width:1200px; height:630px; padding:56px 64px;
    display:grid; grid-template-columns: 1fr 260px; gap:40px; align-items:center;
    position:relative;
    background:
      radial-gradient(circle at 12% 15%, rgba(255,255,255,0.08), transparent 50%),
      radial-gradient(circle at 92% 90%, color-mix(in srgb, ${p.accent} 40%, transparent), transparent 55%),
      ${p.color};
  }
  .stage::before {
    content:''; position:absolute; inset:22px;
    border:1.5px solid rgba(255,255,255,0.14);
    border-radius:22px; pointer-events:none;
  }
  .left { display:flex; flex-direction:column; gap:18px; position:relative; }
  .brand { display:flex; align-items:center; gap:14px; font-family:'Cormorant Garamond',serif; font-size:26px; letter-spacing:0.06em; }
  .brand .dot { width:42px; height:42px; border-radius:50%; background:${p.accent}; display:flex; align-items:center; justify-content:center; color:${p.color}; font-weight:700; font-family:'Cormorant Garamond',serif; font-size:24px; }
  .eyebrow { color:${p.accent}; font-size:14px; letter-spacing:0.3em; text-transform:uppercase; font-weight:600; }
  h1 { font-family:'Cormorant Garamond',serif; font-weight:500; font-size:80px; line-height:1.02; letter-spacing:-0.015em; }
  h1 em { color:${p.accent}; font-style:italic; }
  .desc { color:rgba(255,255,255,0.8); font-size:20px; line-height:1.4; max-width:720px; }
  .badges { display:flex; flex-wrap:wrap; gap:10px; margin-top:10px; }
  .pill { font-size:14px; padding:8px 18px; border-radius:999px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.14); font-weight:500; letter-spacing:0.02em; }
  .right { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px; }
  .icon { width:180px; height:180px; border-radius:50%; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.24); display:flex; align-items:center; justify-content:center; font-size:92px; box-shadow: 0 0 100px color-mix(in srgb, ${p.accent} 30%, transparent); }
  .domain { color:rgba(255,255,255,0.62); font-size:14px; letter-spacing:0.14em; text-align:center; }
</style></head><body>
<div class="stage">
  <div class="left">
    <div class="brand"><span class="dot">A</span><span>Aromaz Perfum Shop</span></div>
    <div class="eyebrow">${p.eyebrow}</div>
    <h1>${p.title}</h1>
    <div class="desc">${p.desc}</div>
    <div class="badges">${p.badges.map(b => `<span class="pill">${b}</span>`).join('')}</div>
  </div>
  <div class="right">
    <div class="icon">${p.emoji}</div>
    <div class="domain">${DOMAIN}</div>
  </div>
</div></body></html>`;
}

const OUT = 'images/og';
await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

for (const p of PAGES) {
  await page.setContent(buildHtml(p), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const out = path.join(OUT, `${p.slug}.png`);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log('✓', out);
}

await browser.close();
console.log(`\n${PAGES.length} OG images generadas en ${OUT}/`);
