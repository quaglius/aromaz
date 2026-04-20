import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const OUT = 'scripts/screenshots/manual';
await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

const shots = [
  { name: 'manual-full-desktop', viewport: { width: 1400, height: 900 }, fullPage: true },
  { name: 'manual-top-desktop',  viewport: { width: 1400, height: 900 } },
  { name: 'manual-full-mobile',  viewport: { width: 390, height: 844 }, fullPage: true }
];

for (const s of shots) {
  const ctx = await browser.newContext({ viewport: s.viewport });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://localhost:3000/manual.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const opts = { path: `${OUT}/${s.name}.png` };
  if (s.fullPage) opts.fullPage = true;
  await page.screenshot(opts);
  console.log(`✓ ${s.name}  errors=${errors.length}`);
  errors.forEach(e => console.log('   ERR: ' + e));
  await ctx.close();
}

await browser.close();
