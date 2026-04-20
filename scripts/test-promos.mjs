import { chromium } from 'playwright';

const PAGES = [
  '/promos.html',
  '/promo-generica.html',
  '/promo-dia-del-padre.html',
  '/promo-dia-de-la-madre.html',
  '/promo-cyber-monday.html',
  '/promo-black-friday.html',
  '/promo-navidad.html',
  '/promo-reyes.html',
  '/promo-cumpleanos.html',
  '/promo-pareja.html'
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', err => errors.push(err.message));
page.on('console', msg => {
  if (msg.type() === 'error') errors.push(`[console] ${msg.text()}`);
});

let ok = 0, fail = 0;
for (const p of PAGES) {
  errors.length = 0;
  try {
    const res = await page.goto(`http://localhost:3000${p}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(600);
    const title = await page.title();
    const h1 = await page.locator('h1').first().textContent().catch(() => '(sin h1)');
    const status = res.status();
    if (status >= 400 || errors.length) {
      console.log(`✗ ${p}  [${status}]  h1=${h1?.trim()}`);
      if (errors.length) errors.forEach(e => console.log('    ERR: ' + e));
      fail++;
    } else {
      console.log(`✓ ${p}  [${status}]  h1="${h1?.trim()}"`);
      ok++;
    }
  } catch (e) {
    console.log(`✗ ${p}  EXCEPTION: ${e.message}`);
    fail++;
  }
}

await browser.close();
console.log(`\nResumen: ${ok} OK · ${fail} fallidas`);
process.exit(fail > 0 ? 1 : 0);
