/**
 * Genera imágenes promocionales en 3 formatos por cada landing, CON FOTO DE MARCA:
 *   - images/promos-posts/{id}.png         → 1080x1080  (post Instagram / WhatsApp)
 *   - images/promos-posts/{id}-story.png   → 1080x1920  (IG/FB Stories + WhatsApp Estado)
 *   - images/og/promo-{id}.png             → 1200x630   (preview al compartir la URL)
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const PROMOS = [
  { id: 'generica',        photo: 'images/brand/flatlay-grid.webp',          title: 'Llevá 2,<br>pagá menos',  badge: '15% OFF',            code: 'AROMAZ15',    color: '#0a0a0a', accent: '#c9a35a', subtitle: 'Promo todo el año',  url: '/promo-generica',       ogHeadline: 'Llevá 2 fragancias, pagá 15% menos',  ogDesc: 'Promo permanente. Código AROMAZ15 al pedir por WhatsApp.' },
  { id: 'dia-del-padre',   photo: 'images/brand/man-purple.webp',            title: 'Día del<br>Padre',        badge: '20% OFF · 2 unid',   code: 'PAPA2026',    color: '#1d2a38', accent: '#c9a35a', subtitle: 'Regalale de 10',     url: '/promo-dia-del-padre',   ogHeadline: 'Día del Padre · 20% OFF',              ogDesc: 'Regalale algo que realmente use. Envíos 24/48hs en CABA.' },
  { id: 'dia-de-la-madre', photo: 'images/brand/couple-flowers.webp',        title: 'Día de la<br>Madre',      badge: '20% + envoltorio',   code: 'MAMA2026',    color: '#4a1d2e', accent: '#f5b3c4', subtitle: 'Para la más importante', url: '/promo-dia-de-la-madre', ogHeadline: 'Día de la Madre · 20% OFF + envoltorio', ogDesc: 'Perfumería fina para mamá. Envolvemos sin cargo.' },
  { id: 'cyber-monday',    photo: 'images/brand/ig-neon-woman.webp',         title: 'Cyber<br>Monday',         badge: '25% OFF',            code: 'CYBER2026',   color: '#0a0a1a', accent: '#00e0ff', subtitle: '72 hs de precios únicos', url: '/promo-cyber-monday',  ogHeadline: 'Cyber Monday · 25% OFF en perfumes',    ogDesc: '72 hs de precios únicos. Código CYBER2026.' },
  { id: 'black-friday',    photo: 'images/brand/ig-couple-silhouette.webp',  title: 'Black<br>Friday',         badge: '20% OFF + envío',    code: 'BLACK2026',   color: '#0a0a0a', accent: '#ff3355', subtitle: 'El viernes más negro', url: '/promo-black-friday',     ogHeadline: 'Black Friday · 20% OFF + envío',        ogDesc: 'El viernes más negro en perfumes importados.' },
  { id: 'navidad',         photo: 'images/brand/ig-wedding-candle.webp',     title: 'Navidad<br>Aromaz',       badge: 'Gift Box + 15% OFF', code: 'NAVIDAD2026', color: '#0f2a1f', accent: '#e8b76b', subtitle: 'Regalos que se recuerdan', url: '/promo-navidad',       ogHeadline: 'Navidad · Gift Box + 15% OFF',          ogDesc: 'Regalos envueltos listos para el arbolito.' },
  { id: 'reyes',           photo: 'images/brand/lily-still-life.webp',       title: 'Noche de<br>Reyes',       badge: '10% OFF + envío',    code: 'REYES2027',   color: '#1a1443', accent: '#f0c555', subtitle: 'El último regalo',   url: '/promo-reyes',           ogHeadline: 'Noche de Reyes · 10% OFF',              ogDesc: 'El último regalo con aroma. Envío bonificado.' },
  { id: 'cumpleanos',      photo: 'images/brand/splash-trio.webp',           title: 'Para<br>cumpleaños',      badge: '15% OFF + tarjeta',  code: 'CUMPLE15',    color: '#2a1a3d', accent: '#f0c555', subtitle: 'Quedá bien siempre', url: '/promo-cumpleanos',      ogHeadline: 'Perfumes para cumpleaños · 15% OFF',    ogDesc: 'Queda siempre bien. Incluye tarjeta dedicatoria.' },
  { id: 'pareja',          photo: 'images/brand/couple-intimate.webp',       title: 'Regalo<br>para 2',        badge: '20% OFF · él + ella', code: 'PAREJA20',  color: '#3d0f28', accent: '#f5b3c4', subtitle: 'Pack pareja',        url: '/promo-pareja',          ogHeadline: 'Pack Pareja · 20% OFF (él + ella)',     ogDesc: 'Dos perfumes a elección con descuento especial.' }
];

const DOMAIN = 'aromazperfumshop.netlify.app';
const POSTS_DIR = 'images/promos-posts';
const OG_DIR = 'images/og';
await fs.mkdir(POSTS_DIR, { recursive: true });
await fs.mkdir(OG_DIR, { recursive: true });

async function toDataUrl(p) {
  const buf = await fs.readFile(p);
  const ext = path.extname(p).slice(1).toLowerCase();
  const mime = ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

const COMMON_STYLE = (p) => `
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { overflow:hidden; background:${p.color}; font-family:'Inter',system-ui,sans-serif; color:#fff; }
  .stage { position:relative; overflow:hidden; background-size:cover; background-position:center; }
  .stage::before {
    content:''; position:absolute; inset:0;
    background:
      linear-gradient(180deg, ${p.color}cc 0%, ${p.color}66 38%, ${p.color}cc 100%),
      radial-gradient(circle at 80% 85%, color-mix(in srgb, ${p.accent} 40%, transparent), transparent 55%);
  }
  .stage::after {
    content:''; position:absolute; inset:28px;
    border:1.5px solid rgba(255,255,255,0.18);
    border-radius:24px; pointer-events:none;
  }
  .content { position:relative; z-index:1; width:100%; height:100%;
             display:flex; flex-direction:column; justify-content:space-between; }
  .brand { display:flex; align-items:center; gap:14px; font-family:'Cormorant Garamond',serif; letter-spacing:0.06em; }
  .brand .dot { border-radius:50%; background:${p.accent}; display:flex; align-items:center; justify-content:center; color:${p.color}; font-weight:700; font-family:'Cormorant Garamond',serif; }
  .eyebrow { color:${p.accent}; letter-spacing:0.3em; text-transform:uppercase; font-weight:700; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
  .hero-title { font-family:'Cormorant Garamond',serif; font-weight:500; line-height:0.95; letter-spacing:-0.01em; text-shadow: 0 4px 20px rgba(0,0,0,0.55); }
  .badge { display:inline-block; background:${p.accent}; color:${p.color}; border-radius:999px; font-weight:800; letter-spacing:0.04em; text-transform:uppercase; box-shadow: 0 6px 24px rgba(0,0,0,0.35); }
  .code-card { background:rgba(10,10,10,0.45); border:1px dashed ${p.accent}; border-radius:18px; backdrop-filter: blur(8px); }
  .code-card .label { color:rgba(255,255,255,0.7); letter-spacing:0.28em; text-transform:uppercase; font-weight:600; }
  .code-card .value { font-family:'Cormorant Garamond',serif; color:${p.accent}; letter-spacing:0.08em; line-height:1; }
  .url .arrow { color:${p.accent}; line-height:1; }
  .url .domain { color:rgba(255,255,255,0.7); letter-spacing:0.08em; text-shadow: 0 1px 4px rgba(0,0,0,0.6); }
`;

function buildSquare(p, photoUrl) {
  return `<!DOCTYPE html><html lang="es"><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  ${COMMON_STYLE(p)}
  html,body { width:1080px; height:1080px; }
  .stage { width:1080px; height:1080px; background-image: url('${photoUrl}'); }
  .content { padding:72px; }
  .top { display:flex; justify-content:space-between; align-items:center; }
  .brand { font-size:34px; }
  .brand .dot { width:48px; height:48px; font-size:28px; }
  .eyebrow { font-size:20px; margin-bottom:36px; }
  .hero-title { font-size:146px; margin-bottom:46px; }
  .badge { padding:14px 28px; font-size:24px; }
  .bottom { display:flex; justify-content:space-between; align-items:flex-end; gap:20px; }
  .code-card { padding:22px 32px; }
  .code-card .label { font-size:13px; margin-bottom:6px; }
  .code-card .value { font-size:44px; }
  .url { text-align:right; }
  .url .arrow { font-size:60px; }
  .url .domain { font-size:15px; margin-top:10px; }
</style></head><body>
<div class="stage">
  <div class="content">
    <div class="top">
      <div class="brand"><span class="dot">A</span><span>Aromaz Perfum Shop</span></div>
    </div>
    <div>
      <div class="eyebrow">${p.subtitle}</div>
      <h1 class="hero-title">${p.title}</h1>
      <div class="badge">${p.badge}</div>
    </div>
    <div class="bottom">
      <div class="code-card">
        <div class="label">Código</div>
        <div class="value">${p.code}</div>
      </div>
      <div class="url"><div class="arrow">→</div><div class="domain">${DOMAIN}${p.url}</div></div>
    </div>
  </div>
</div></body></html>`;
}

function buildStory(p, photoUrl) {
  return `<!DOCTYPE html><html lang="es"><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  ${COMMON_STYLE(p)}
  html,body { width:1080px; height:1920px; }
  .stage { width:1080px; height:1920px; background-image: url('${photoUrl}'); }
  .stage::before {
    background:
      linear-gradient(180deg, ${p.color}dd 0%, ${p.color}55 35%, ${p.color}55 65%, ${p.color}ee 100%),
      radial-gradient(circle at 80% 92%, color-mix(in srgb, ${p.accent} 40%, transparent), transparent 60%);
  }
  .content { padding:110px 80px 110px; }
  .top { display:flex; justify-content:center; align-items:center; margin-top:20px; }
  .brand { font-size:42px; }
  .brand .dot { width:60px; height:60px; font-size:34px; }
  .middle { text-align:center; }
  .eyebrow { font-size:28px; margin-bottom:50px; }
  .hero-title { font-size:196px; margin-bottom:70px; }
  .badge { padding:22px 44px; font-size:34px; }
  .bottom { display:flex; flex-direction:column; align-items:center; gap:44px; }
  .code-card { padding:32px 60px; text-align:center; min-width:520px; }
  .code-card .label { font-size:18px; margin-bottom:12px; }
  .code-card .value { font-size:72px; }
  .swipe { display:flex; flex-direction:column; align-items:center; gap:8px; color:${p.accent}; }
  .swipe .arrow { font-size:56px; line-height:1; }
  .swipe .txt { font-size:22px; letter-spacing:0.3em; text-transform:uppercase; font-weight:800; }
  .swipe .domain { font-size:22px; color:rgba(255,255,255,0.7); margin-top:4px; letter-spacing:0.08em; text-shadow: 0 1px 4px rgba(0,0,0,0.6); }
</style></head><body>
<div class="stage">
  <div class="content">
    <div class="top">
      <div class="brand"><span class="dot">A</span><span>Aromaz Perfum Shop</span></div>
    </div>
    <div class="middle">
      <div class="eyebrow">${p.subtitle}</div>
      <h1 class="hero-title">${p.title}</h1>
      <div class="badge">${p.badge}</div>
    </div>
    <div class="bottom">
      <div class="code-card">
        <div class="label">Código promo</div>
        <div class="value">${p.code}</div>
      </div>
      <div class="swipe">
        <div class="arrow">▲</div>
        <div class="txt">Ver la promo</div>
        <div class="domain">${DOMAIN}${p.url}</div>
      </div>
    </div>
  </div>
</div></body></html>`;
}

function buildOG(p, photoUrl) {
  return `<!DOCTYPE html><html lang="es"><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  ${COMMON_STYLE(p)}
  html,body { width:1200px; height:630px; }
  .stage { width:1200px; height:630px; background-image: url('${photoUrl}'); }
  .stage::before {
    background:
      linear-gradient(95deg, ${p.color}ee 0%, ${p.color}dd 38%, ${p.color}55 68%, ${p.color}22 100%),
      radial-gradient(circle at 92% 88%, color-mix(in srgb, ${p.accent} 35%, transparent), transparent 55%);
  }
  .content { padding:56px 64px; flex-direction: row; align-items:center; }
  .left { flex: 1; display:flex; flex-direction:column; gap:16px; max-width: 720px; }
  .brand { font-size:26px; }
  .brand .dot { width:40px; height:40px; font-size:22px; }
  .eyebrow { font-size:14px; letter-spacing:0.3em; }
  h1 { font-family:'Cormorant Garamond',serif; font-weight:500; font-size:72px; line-height:1.02; letter-spacing:-0.01em; text-shadow: 0 3px 18px rgba(0,0,0,0.55); }
  .desc { color:rgba(255,255,255,0.88); font-size:19px; line-height:1.4; max-width:640px; text-shadow: 0 1px 6px rgba(0,0,0,0.55); }
  .row { display:flex; align-items:center; gap:16px; margin-top:6px; flex-wrap:wrap; }
  .badge { padding:10px 22px; font-size:16px; }
  .code { font-family:'Cormorant Garamond',serif; color:${p.accent}; font-size:26px; letter-spacing:0.1em; padding:8px 20px; border:1px dashed ${p.accent}; border-radius:999px; background: rgba(10,10,10,0.45); backdrop-filter: blur(6px); }
  .domain-tag { position:absolute; right:64px; bottom:46px; z-index:1;
    color:rgba(255,255,255,0.75); font-size:14px; letter-spacing:0.12em;
    background: rgba(0,0,0,0.45); padding: 8px 16px; border-radius:999px;
    border:1px solid rgba(255,255,255,0.15); }
</style></head><body>
<div class="stage">
  <div class="content">
    <div class="left">
      <div class="brand"><span class="dot">A</span><span>Aromaz Perfum Shop</span></div>
      <div class="eyebrow">${p.subtitle}</div>
      <h1>${p.ogHeadline}</h1>
      <div class="desc">${p.ogDesc}</div>
      <div class="row">
        <span class="badge">${p.badge}</span>
        <span class="code">${p.code}</span>
      </div>
    </div>
  </div>
  <div class="domain-tag">${DOMAIN}${p.url}</div>
</div></body></html>`;
}

const browser = await chromium.launch({ headless: true });

async function snap({ html, width, height, out }) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width, height } });
  await ctx.close();
  console.log('✓', out);
}

for (const p of PROMOS) {
  const photoUrl = await toDataUrl(p.photo);
  await snap({ html: buildSquare(p, photoUrl), width: 1080, height: 1080, out: path.join(POSTS_DIR, `${p.id}.png`) });
  await snap({ html: buildStory(p, photoUrl),  width: 1080, height: 1920, out: path.join(POSTS_DIR, `${p.id}-story.png`) });
  await snap({ html: buildOG(p, photoUrl),     width: 1200, height: 630,  out: path.join(OG_DIR,    `promo-${p.id}.png`) });
}

await browser.close();
console.log(`\n${PROMOS.length} promos · ${PROMOS.length * 3} imágenes generadas`);
console.log(`  · Feed 1080×1080 en ${POSTS_DIR}/{id}.png`);
console.log(`  · Stories 1080×1920 en ${POSTS_DIR}/{id}-story.png`);
console.log(`  · OG 1200×630 en ${OG_DIR}/promo-{id}.png`);
