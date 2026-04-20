/**
 * Genera imágenes promocionales en 3 formatos por cada landing:
 *   - images/promos-posts/{id}.png         → 1080x1080  (post Instagram / WhatsApp)
 *   - images/promos-posts/{id}-story.png   → 1080x1920  (IG/FB Stories + WhatsApp Estado)
 *   - images/og/promo-{id}.png             → 1200x630   (preview al compartir la URL)
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const PROMOS = [
  { id: 'generica', title: 'Llevá 2,<br>pagá menos', badge: '15% OFF', code: 'AROMAZ15', color: '#0a0a0a', accent: '#c9a35a', emoji: '✨', subtitle: 'Promo todo el año', url: '/promo-generica', ogHeadline: 'Llevá 2 fragancias, pagá 15% menos', ogDesc: 'Promo permanente. Código AROMAZ15 al pedir por WhatsApp.' },
  { id: 'dia-del-padre', title: 'Día del<br>Padre', badge: '20% OFF en 2 unidades', code: 'PAPA2026', color: '#1d2a38', accent: '#c9a35a', emoji: '👔', subtitle: 'Regalá una fragancia de 10', url: '/promo-dia-del-padre', ogHeadline: 'Día del Padre · 20% OFF', ogDesc: 'Regalale algo que realmente use. Envíos 24/48hs en CABA.' },
  { id: 'dia-de-la-madre', title: 'Día de la<br>Madre', badge: '20% OFF + envoltorio', code: 'MAMA2026', color: '#4a1d2e', accent: '#d97b93', emoji: '💐', subtitle: 'Para la más importante', url: '/promo-dia-de-la-madre', ogHeadline: 'Día de la Madre · 20% OFF + envoltorio', ogDesc: 'Perfumería fina para mamá. Envolvemos sin cargo.' },
  { id: 'cyber-monday', title: 'Cyber<br>Monday', badge: '25% OFF', code: 'CYBER2026', color: '#0a0a1a', accent: '#00e0ff', emoji: '⚡', subtitle: '72 hs de precios únicos', url: '/promo-cyber-monday', ogHeadline: 'Cyber Monday · 25% OFF en perfumes', ogDesc: '72 hs de precios únicos. Código CYBER2026.' },
  { id: 'black-friday', title: 'Black<br>Friday', badge: '20% OFF + envío', code: 'BLACK2026', color: '#0a0a0a', accent: '#ff3355', emoji: '🔥', subtitle: 'El viernes más negro', url: '/promo-black-friday', ogHeadline: 'Black Friday · 20% OFF + envío', ogDesc: 'El viernes más negro en perfumes importados.' },
  { id: 'navidad', title: 'Navidad<br>Aromaz', badge: 'Gift Box + 15% OFF', code: 'NAVIDAD2026', color: '#0f2a1f', accent: '#c9a35a', emoji: '🎄', subtitle: 'Regalos que se recuerdan', url: '/promo-navidad', ogHeadline: 'Navidad · Gift Box + 15% OFF', ogDesc: 'Regalos envueltos listos para el arbolito.' },
  { id: 'reyes', title: 'Noche de<br>Reyes', badge: '10% OFF + envío', code: 'REYES2027', color: '#1a1443', accent: '#f0c555', emoji: '👑', subtitle: 'El último regalo', url: '/promo-reyes', ogHeadline: 'Noche de Reyes · 10% OFF', ogDesc: 'El último regalo con aroma. Envío bonificado.' },
  { id: 'cumpleanos', title: 'Para<br>cumpleaños', badge: '15% OFF + tarjeta', code: 'CUMPLE15', color: '#2a1a3d', accent: '#f0c555', emoji: '🎂', subtitle: 'Quedá bien siempre', url: '/promo-cumpleanos', ogHeadline: 'Perfumes para cumpleaños · 15% OFF', ogDesc: 'Queda siempre bien. Incluye tarjeta dedicatoria.' },
  { id: 'pareja', title: 'Regalo<br>para 2', badge: '20% OFF · él + ella', code: 'PAREJA20', color: '#3d0f28', accent: '#d97b93', emoji: '💕', subtitle: 'Pack pareja', url: '/promo-pareja', ogHeadline: 'Pack Pareja · 20% OFF (él + ella)', ogDesc: 'Dos perfumes a elección con descuento especial.' }
];

const DOMAIN = 'aromazperfumshop.netlify.app';

const COMMON_STYLE = (p) => `
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { overflow:hidden; background:${p.color}; font-family:'Inter',system-ui,sans-serif; }
  .stage { color:#fff; position:relative; display:flex; flex-direction:column; justify-content:space-between; }
  .stage::before {
    content:''; position:absolute; inset:30px;
    border:1.5px solid rgba(255,255,255,0.14);
    border-radius:24px; pointer-events:none;
  }
  .brand { display:flex; align-items:center; gap:14px; font-family:'Cormorant Garamond',serif; letter-spacing:0.06em; }
  .brand .dot { border-radius:50%; background:${p.accent}; display:flex; align-items:center; justify-content:center; color:${p.color}; font-weight:700; font-family:'Cormorant Garamond',serif; }
  .icon { border-radius:50%; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.25); display:flex; align-items:center; justify-content:center; }
  .eyebrow { color:${p.accent}; letter-spacing:0.35em; text-transform:uppercase; font-weight:600; }
  .hero-title { font-family:'Cormorant Garamond',serif; font-weight:500; line-height:0.95; letter-spacing:-0.01em; }
  .badge { display:inline-block; background:${p.accent}; color:${p.color}; border-radius:999px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; }
  .code-card { background:rgba(255,255,255,0.06); border:1px dashed ${p.accent}; border-radius:18px; }
  .code-card .label { color:rgba(255,255,255,0.55); letter-spacing:0.3em; text-transform:uppercase; }
  .code-card .value { font-family:'Cormorant Garamond',serif; color:${p.accent}; letter-spacing:0.08em; line-height:1; }
  .url .arrow { color:${p.accent}; line-height:1; }
  .url .domain { color:rgba(255,255,255,0.55); letter-spacing:0.08em; }
`;

function buildSquare(p) {
  return `<!DOCTYPE html><html lang="es"><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  ${COMMON_STYLE(p)}
  html,body { width:1080px; height:1080px; }
  .stage {
    width:1080px; height:1080px; padding:72px;
    background:
      radial-gradient(circle at 18% 15%, rgba(255,255,255,0.08), transparent 45%),
      radial-gradient(circle at 82% 85%, color-mix(in srgb, ${p.accent} 35%, transparent), transparent 55%),
      ${p.color};
  }
  .top { display:flex; justify-content:space-between; align-items:center; }
  .brand { font-size:34px; }
  .brand .dot { width:48px; height:48px; font-size:28px; }
  .icon { width:84px; height:84px; font-size:42px; }
  .eyebrow { font-size:18px; margin-bottom:36px; }
  .hero-title { font-size:150px; margin-bottom:44px; }
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
  <div class="top">
    <div class="brand"><span class="dot">A</span><span>Aromaz Perfum Shop</span></div>
    <div class="icon">${p.emoji}</div>
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
</div></body></html>`;
}

function buildStory(p) {
  return `<!DOCTYPE html><html lang="es"><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  ${COMMON_STYLE(p)}
  html,body { width:1080px; height:1920px; }
  .stage {
    width:1080px; height:1920px; padding:110px 80px 110px;
    background:
      radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
      radial-gradient(circle at 80% 92%, color-mix(in srgb, ${p.accent} 40%, transparent), transparent 60%),
      ${p.color};
  }
  .top { display:flex; justify-content:space-between; align-items:center; margin-top:40px; }
  .brand { font-size:40px; }
  .brand .dot { width:60px; height:60px; font-size:34px; }
  .icon { width:130px; height:130px; font-size:72px; }
  .middle { text-align:center; }
  .eyebrow { font-size:26px; margin-bottom:56px; }
  .hero-title { font-size:200px; margin-bottom:70px; }
  .badge { padding:22px 44px; font-size:36px; }
  .spacer { height:0; }
  .bottom { display:flex; flex-direction:column; align-items:center; gap:44px; }
  .code-card { padding:32px 60px; text-align:center; min-width:520px; }
  .code-card .label { font-size:18px; margin-bottom:12px; }
  .code-card .value { font-size:72px; }
  .swipe { display:flex; flex-direction:column; align-items:center; gap:10px; color:${p.accent}; }
  .swipe .arrow { font-size:56px; line-height:1; animation:none; }
  .swipe .txt { font-size:20px; letter-spacing:0.3em; text-transform:uppercase; font-weight:700; }
  .swipe .domain { font-size:20px; color:rgba(255,255,255,0.55); margin-top:6px; letter-spacing:0.08em; }
</style></head><body>
<div class="stage">
  <div class="top">
    <div class="brand"><span class="dot">A</span><span>Aromaz Perfum Shop</span></div>
    <div class="icon">${p.emoji}</div>
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
</div></body></html>`;
}

function buildOG(p) {
  return `<!DOCTYPE html><html lang="es"><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  ${COMMON_STYLE(p)}
  html,body { width:1200px; height:630px; }
  .stage {
    width:1200px; height:630px; padding:56px 64px;
    display:grid; grid-template-columns: 1fr 280px; gap:48px; align-items:center;
    background:
      radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08), transparent 50%),
      radial-gradient(circle at 90% 90%, color-mix(in srgb, ${p.accent} 38%, transparent), transparent 55%),
      ${p.color};
  }
  .left { display:flex; flex-direction:column; gap:18px; }
  .brand { font-size:26px; }
  .brand .dot { width:40px; height:40px; font-size:22px; }
  .eyebrow { font-size:14px; letter-spacing:0.3em; }
  h1 { font-family:'Cormorant Garamond',serif; font-weight:500; font-size:74px; line-height:1.02; letter-spacing:-0.01em; }
  .desc { color:rgba(255,255,255,0.78); font-size:20px; line-height:1.35; max-width:680px; }
  .row { display:flex; align-items:center; gap:16px; margin-top:8px; }
  .badge { padding:10px 22px; font-size:16px; }
  .code { font-family:'Cormorant Garamond',serif; color:${p.accent}; font-size:28px; letter-spacing:0.1em; padding:8px 20px; border:1px dashed ${p.accent}; border-radius:999px; }
  .right { display:flex; flex-direction:column; align-items:center; gap:18px; }
  .icon { width:180px; height:180px; font-size:96px; }
  .domain { color:rgba(255,255,255,0.6); font-size:14px; letter-spacing:0.12em; text-align:center; }
</style></head><body>
<div class="stage">
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
  <div class="right">
    <div class="icon">${p.emoji}</div>
    <div class="domain">${DOMAIN}${p.url}</div>
  </div>
</div></body></html>`;
}

const POSTS_DIR = 'images/promos-posts';
const OG_DIR = 'images/og';
await fs.mkdir(POSTS_DIR, { recursive: true });
await fs.mkdir(OG_DIR, { recursive: true });

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
  await snap({ html: buildSquare(p), width: 1080, height: 1080, out: path.join(POSTS_DIR, `${p.id}.png`) });
  await snap({ html: buildStory(p), width: 1080, height: 1920, out: path.join(POSTS_DIR, `${p.id}-story.png`) });
  await snap({ html: buildOG(p), width: 1200, height: 630, out: path.join(OG_DIR, `promo-${p.id}.png`) });
}

await browser.close();
console.log(`\n${PROMOS.length} promos · ${PROMOS.length * 3} imágenes generadas`);
console.log(`  · Feed 1080×1080 en ${POSTS_DIR}/{id}.png`);
console.log(`  · Stories 1080×1920 en ${POSTS_DIR}/{id}-story.png`);
console.log(`  · OG 1200×630 en ${OG_DIR}/promo-{id}.png`);
