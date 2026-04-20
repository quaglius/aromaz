/**
 * Genera imágenes Open Graph (1200x630) con FOTO DE MARCA de fondo
 * y un velo oscuro a izquierda para que el texto siempre se lea.
 *
 * Output: images/og/{slug}.png
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const DOMAIN = 'aromazperfumshop.netlify.app';
const OUT = 'images/og';
await fs.mkdir(OUT, { recursive: true });

const PAGES = [
  {
    slug: 'default',
    photo: 'images/brand/ig-couple-silhouette.webp',
    eyebrow: 'Perfumes importados · Argentina',
    title: 'Encontrá tu<br><em>fragancia perfecta</em>',
    desc: 'Más de 220 fragancias de Extracto Importado. Envíos a todo el país. 10% OFF por transferencia.',
    badges: ['+220 fragancias', 'Envío gratis +$50K', '10% OFF transferencia'],
    color: '#0a0a0a',
    accent: '#c9a35a'
  },
  {
    slug: 'catalogo',
    photo: 'images/brand/flatlay-grid.webp',
    eyebrow: 'Catálogo completo',
    title: 'Más de 220<br><em>fragancias</em>',
    desc: 'Femeninos, masculinos y unisex. Body splash, discovery sets y más.',
    badges: ['Mujer · Hombre · Unisex', 'Body Splash', 'Discovery Sets'],
    color: '#0a0a0a',
    accent: '#c9a35a'
  },
  {
    slug: 'promos',
    photo: 'images/brand/ig-neon-woman.webp',
    eyebrow: 'Promociones vigentes',
    title: 'Descuentos<br><em>que te regalan algo</em>',
    desc: 'Llevá 2 y pagá menos. Promos por fechas especiales. Códigos válidos por WhatsApp.',
    badges: ['15% OFF llevando 2', 'Cyber · Black Friday', 'Fechas especiales'],
    color: '#12081d',
    accent: '#f0c555'
  },
  {
    slug: 'empresas',
    photo: 'images/brand/ig-hotel-diffuser.webp',
    eyebrow: 'Aromaz para empresas',
    title: 'Perfumes<br><em>con tu logo</em>',
    desc: 'Regalos corporativos, amenities de hotel, souvenirs de boda y 15. Cotizaciones en 24hs.',
    badges: ['Corporate gifts', 'Amenities hoteleros', 'Souvenirs premium'],
    color: '#0f1b2b',
    accent: '#c9a35a'
  },
  {
    slug: 'revende',
    photo: 'images/brand/splash-trio.webp',
    eyebrow: 'Programa de revendedoras',
    title: 'Revendé<br><em>Extracto Importado</em>',
    desc: 'Pedí desde 6 unidades con precio mayorista. Más de 220 fragancias, márgenes reales.',
    badges: ['Desde 6 unidades', 'Mayorista real', 'Sin mínimos mensuales'],
    color: '#0a1f1a',
    accent: '#c9a35a'
  },
  {
    slug: 'nosotros',
    photo: 'images/brand/couple-intimate.webp',
    eyebrow: 'Quiénes somos',
    title: 'Aromaz<br><em>Perfum Shop</em>',
    desc: 'Distribuidores oficiales de Extracto Importado. Más de 600.000 perfumes vendidos en Argentina.',
    badges: ['Distribuidor oficial', '+600K vendidos', 'Atención personalizada'],
    color: '#1a0d0a',
    accent: '#c9a35a'
  },
  {
    slug: 'contacto',
    photo: 'images/brand/ig-desert-woman.webp',
    eyebrow: 'Hablemos',
    title: 'Atención<br><em>por WhatsApp</em>',
    desc: 'Respuesta en minutos. Te ayudamos a elegir tu fragancia ideal y coordinamos envío.',
    badges: ['WhatsApp directo', 'Respuesta rápida', 'Lun a Sáb 10 a 19'],
    color: '#0a1a14',
    accent: '#25d366'
  }
];

async function toDataUrl(p) {
  const buf = await fs.readFile(p);
  const ext = path.extname(p).slice(1).toLowerCase();
  const mime = ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

function buildHtml(p, photoDataUrl) {
  return `<!DOCTYPE html><html lang="es"><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; overflow:hidden; background:${p.color}; font-family:'Inter',system-ui,sans-serif; color:#fff; }
  .stage {
    width:1200px; height:630px; position:relative; overflow:hidden;
    background-image: url('${photoDataUrl}');
    background-size: cover; background-position: center;
  }
  .stage::before {
    content:''; position:absolute; inset:0;
    background:
      linear-gradient(95deg, ${p.color} 0%, ${p.color}ee 35%, ${p.color}66 62%, ${p.color}33 100%),
      radial-gradient(circle at 90% 90%, color-mix(in srgb, ${p.accent} 30%, transparent), transparent 45%);
  }
  .stage::after {
    content:''; position:absolute; inset:22px;
    border:1.5px solid rgba(255,255,255,0.16);
    border-radius:22px; pointer-events:none;
  }
  .inner {
    position:relative; z-index:1;
    padding:56px 64px;
    width:780px; height:630px;
    display:flex; flex-direction:column; justify-content:center; gap:16px;
  }
  .brand {
    display:flex; align-items:center; gap:14px;
    font-family:'Cormorant Garamond',serif; font-size:26px; letter-spacing:0.06em;
  }
  .brand .dot {
    width:42px; height:42px; border-radius:50%; background:${p.accent};
    display:flex; align-items:center; justify-content:center;
    color:${p.color}; font-weight:700; font-family:'Cormorant Garamond',serif; font-size:24px;
  }
  .eyebrow {
    color:${p.accent}; font-size:14px; letter-spacing:0.3em;
    text-transform:uppercase; font-weight:600;
  }
  h1 {
    font-family:'Cormorant Garamond',serif; font-weight:500;
    font-size:82px; line-height:1.02; letter-spacing:-0.015em;
    text-shadow: 0 2px 18px rgba(0,0,0,0.45);
  }
  h1 em { color:${p.accent}; font-style:italic; }
  .desc {
    color:rgba(255,255,255,0.88); font-size:19px; line-height:1.45;
    max-width:640px; text-shadow: 0 1px 8px rgba(0,0,0,0.5);
  }
  .badges { display:flex; flex-wrap:wrap; gap:10px; margin-top:6px; }
  .pill {
    font-size:13px; padding:7px 16px; border-radius:999px;
    background:rgba(10,10,10,0.55); border:1px solid rgba(255,255,255,0.22);
    font-weight:500; letter-spacing:0.02em; backdrop-filter: blur(6px);
  }
  .domain {
    position:absolute; right:64px; bottom:46px; z-index:1;
    color:rgba(255,255,255,0.7); font-size:14px; letter-spacing:0.14em;
    background: rgba(0,0,0,0.45); padding: 8px 16px; border-radius:999px;
    border:1px solid rgba(255,255,255,0.15);
  }
</style></head><body>
<div class="stage">
  <div class="inner">
    <div class="brand"><span class="dot">A</span><span>Aromaz Perfum Shop</span></div>
    <div class="eyebrow">${p.eyebrow}</div>
    <h1>${p.title}</h1>
    <div class="desc">${p.desc}</div>
    <div class="badges">${p.badges.map(b => `<span class="pill">${b}</span>`).join('')}</div>
  </div>
  <div class="domain">${DOMAIN}</div>
</div></body></html>`;
}

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

for (const p of PAGES) {
  const data = await toDataUrl(p.photo);
  await page.setContent(buildHtml(p, data), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const out = path.join(OUT, `${p.slug}.png`);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log('✓', out);
}

await browser.close();
console.log(`\n${PAGES.length} OG images generadas en ${OUT}/`);
