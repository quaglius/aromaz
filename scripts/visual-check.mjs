import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const OUT = 'scripts/screenshots';
await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

const checks = [
  // Desktop
  { name: 'home-desktop', url: 'http://localhost:3000/', viewport: { width: 1400, height: 900 } },
  { name: 'home-desktop-full', url: 'http://localhost:3000/', viewport: { width: 1400, height: 900 }, fullPage: true },
  { name: 'revende-desktop', url: 'http://localhost:3000/revende.html', viewport: { width: 1400, height: 900 } },
  { name: 'revende-nav-highlight', url: 'http://localhost:3000/revende.html', viewport: { width: 1400, height: 900 }, clip: { x: 0, y: 0, width: 1400, height: 130 } },
  // Search overlay desktop
  { name: 'search-desktop', url: 'http://localhost:3000/', viewport: { width: 1400, height: 900 }, action: async (p) => {
      await p.click('[data-search-trigger]');
      await p.waitForTimeout(400);
  }},
  // Mobile
  { name: 'home-mobile', url: 'http://localhost:3000/', viewport: { width: 390, height: 844 } },
  { name: 'header-mobile', url: 'http://localhost:3000/', viewport: { width: 390, height: 844 }, clip: { x: 0, y: 0, width: 390, height: 180 } },
  // Mobile search
  { name: 'search-mobile', url: 'http://localhost:3000/', viewport: { width: 390, height: 844 }, action: async (p) => {
      await p.click('[data-search-trigger]');
      await p.waitForTimeout(400);
  }},
];

for (const c of checks) {
  const ctx = await browser.newContext({ viewport: c.viewport });
  const page = await ctx.newPage();
  await page.goto(c.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  if (c.action) await c.action(page);
  const opts = { path: `${OUT}/${c.name}.png` };
  if (c.fullPage) opts.fullPage = true;
  if (c.clip) opts.clip = c.clip;
  await page.screenshot(opts);
  console.log(`✓ ${c.name}`);
  await ctx.close();
}

await browser.close();
console.log('Done.');
