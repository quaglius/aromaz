import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const OUT = 'scripts/screenshots/promos';
await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

/**
 * Simulamos distintas fechas para ver si el banner global aparece
 * correctamente durante la ventana de cada campaña.
 */
const simulations = [
  { name: 'banner-padre', mockISO: '2026-06-15T12:00:00-03:00', url: 'http://localhost:3000/' },
  { name: 'banner-black-friday', mockISO: '2026-11-25T12:00:00-03:00', url: 'http://localhost:3000/' },
  { name: 'banner-navidad', mockISO: '2026-12-20T12:00:00-03:00', url: 'http://localhost:3000/' },
  { name: 'banner-none-today', mockISO: '2026-04-20T12:00:00-03:00', url: 'http://localhost:3000/' }
];

for (const s of simulations) {
  const ctx = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });
  const page = await ctx.newPage();

  await page.addInitScript((iso) => {
    const fixed = new Date(iso).getTime();
    const _Date = Date;
    class MockDate extends _Date {
      constructor(...args) {
        if (args.length === 0) super(fixed);
        else super(...args);
      }
    }
    MockDate.now = () => fixed;
    MockDate.UTC = _Date.UTC;
    MockDate.parse = _Date.parse;
    globalThis.Date = MockDate;
  }, s.mockISO);

  await page.goto(s.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const hasBanner = await page.locator('.promo-banner').count();
  const bannerCopy = hasBanner ? await page.locator('.promo-banner-copy').textContent() : '(sin banner)';
  console.log(`[${s.mockISO.slice(0, 10)}] banner=${hasBanner > 0 ? 'SÍ' : 'NO'}  → ${bannerCopy?.trim() || ''}`);
  await page.screenshot({ path: `${OUT}/${s.name}.png`, clip: { x: 0, y: 0, width: 1400, height: 200 } });
  await ctx.close();
}

await browser.close();
