/**
 * Shots por página: baja la página entera, espera imágenes, toma fullpage.
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE = 'http://localhost:3000';
const OUT = 'scripts/_shots';
await fs.mkdir(OUT, { recursive: true });

const PAGES = [
  { path: '/',           name: 'home' },
  { path: '/nosotros',   name: 'nosotros' },
  { path: '/empresas',   name: 'empresas' },
  { path: '/revende',    name: 'revende' },
  { path: '/contacto',   name: 'contacto' },
  { path: '/envios',     name: 'envios' },
  { path: '/faq',        name: 'faq' },
  { path: '/terminos',   name: 'terminos' }
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const failures = [];
page.on('response', r => {
  const u = r.url();
  if (u.includes('/images/') && r.status() >= 400) failures.push({ url: u, status: r.status() });
});

async function scrollToBottom() {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 400;
      const t = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) { clearInterval(t); resolve(); }
      }, 100);
    });
  });
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

let ok = 0, fail = 0;
for (const { path, name } of PAGES) {
  const before = failures.length;
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await scrollToBottom();
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  const fails = failures.slice(before);
  if (fails.length) {
    console.log(`❌ ${path}`);
    fails.forEach(f => console.log('    · 404', f.status, f.url));
    fail++;
  } else {
    console.log(`✓ ${path}`);
    ok++;
  }
}

await browser.close();
console.log(`\n${ok}/${ok+fail} páginas sin imágenes rotas · shots en ${OUT}/`);
process.exit(fail > 0 ? 1 : 0);
