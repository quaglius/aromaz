import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const OUT = 'scripts/screenshots/manual';
await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
const page = await ctx.newPage();

await page.goto('http://localhost:3000/manual.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// Scroll to kit section and take a focused shot of 1 kit
await page.locator('#kit-dia-del-padre').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const box = await page.locator('#kit-dia-del-padre').boundingBox();
if (box) {
  await page.screenshot({
    path: `${OUT}/kit-padre-desktop.png`,
    clip: box
  });
  console.log('✓ kit-padre-desktop');
}

// Scroll to another section
await page.locator('#banner').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/banner-section-desktop.png` });
console.log('✓ banner-section-desktop');

await browser.close();
