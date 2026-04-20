import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const OUT = 'scripts/screenshots/promos';
await fs.mkdir(OUT, { recursive: true });

const checks = [
  { name: 'promos-index-desktop', url: 'http://localhost:3000/promos.html', viewport: { width: 1400, height: 900 }, fullPage: true },
  { name: 'promos-index-mobile', url: 'http://localhost:3000/promos.html', viewport: { width: 390, height: 844 }, fullPage: true },
  { name: 'landing-generica-desktop', url: 'http://localhost:3000/promo-generica.html', viewport: { width: 1400, height: 900 } },
  { name: 'landing-padre-desktop', url: 'http://localhost:3000/promo-dia-del-padre.html', viewport: { width: 1400, height: 900 } },
  { name: 'landing-madre-desktop', url: 'http://localhost:3000/promo-dia-de-la-madre.html', viewport: { width: 1400, height: 900 } },
  { name: 'landing-cyber-desktop', url: 'http://localhost:3000/promo-cyber-monday.html', viewport: { width: 1400, height: 900 } },
  { name: 'landing-black-desktop', url: 'http://localhost:3000/promo-black-friday.html', viewport: { width: 1400, height: 900 } },
  { name: 'landing-navidad-desktop', url: 'http://localhost:3000/promo-navidad.html', viewport: { width: 1400, height: 900 } },
  { name: 'landing-reyes-desktop', url: 'http://localhost:3000/promo-reyes.html', viewport: { width: 1400, height: 900 } },
  { name: 'landing-cumple-desktop', url: 'http://localhost:3000/promo-cumpleanos.html', viewport: { width: 1400, height: 900 } },
  { name: 'landing-pareja-desktop', url: 'http://localhost:3000/promo-pareja.html', viewport: { width: 1400, height: 900 } },
  { name: 'landing-padre-full', url: 'http://localhost:3000/promo-dia-del-padre.html', viewport: { width: 1400, height: 900 }, fullPage: true },
  { name: 'landing-padre-mobile', url: 'http://localhost:3000/promo-dia-del-padre.html', viewport: { width: 390, height: 844 }, fullPage: true }
];

const browser = await chromium.launch({ headless: true });

for (const c of checks) {
  const ctx = await browser.newContext({ viewport: c.viewport });
  const page = await ctx.newPage();
  await page.goto(c.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  const opts = { path: `${OUT}/${c.name}.png` };
  if (c.fullPage) opts.fullPage = true;
  await page.screenshot(opts);
  console.log(`✓ ${c.name}`);
  await ctx.close();
}

await browser.close();
