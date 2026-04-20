import { chromium } from 'playwright';

const PAGES = [
  { url: 'http://localhost:3000/', name: 'Home' },
  { url: 'http://localhost:3000/catalogo.html', name: 'Catalogo' },
  { url: 'http://localhost:3000/nosotros.html', name: 'Nosotros' },
  { url: 'http://localhost:3000/faq.html', name: 'FAQ' },
  { url: 'http://localhost:3000/envios.html', name: 'Envios' },
  { url: 'http://localhost:3000/contacto.html', name: 'Contacto' },
  { url: 'http://localhost:3000/empresas.html', name: 'Empresas' },
  { url: 'http://localhost:3000/revende.html', name: 'Revende' },
  { url: 'http://localhost:3000/terminos.html', name: 'Terminos' },
  { url: 'http://localhost:3000/carrito.html', name: 'Carrito' },
  { url: 'http://localhost:3000/favoritos.html', name: 'Favoritos' }
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });

for (const p of PAGES) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(`[pageerror] ${e.message}`));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`); });
  page.on('requestfailed', req => errors.push(`[req failed] ${req.url()} — ${req.failure()?.errorText}`));

  try {
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);
    const title = await page.title();
    const h1 = await page.locator('h1').first().textContent().catch(() => null);
    const productCount = await page.locator('.product-card').count();
    const name = p.name.replace(/[^\w]/g, '_');
    await page.screenshot({ path: `scripts/screenshots/${name}.png`, fullPage: false });
    console.log(`\n=== ${p.name} (${p.url}) ===`);
    console.log(`  title: ${title}`);
    console.log(`  h1: ${h1?.trim().slice(0, 100)}`);
    console.log(`  product-cards: ${productCount}`);
    if (errors.length) {
      console.log(`  ERRORS:`);
      errors.forEach(e => console.log(`    - ${e}`));
    } else {
      console.log(`  ✓ no errors`);
    }
  } catch (e) {
    console.log(`\n=== ${p.name} FAILED ===`);
    console.log(`  ${e.message}`);
  }
  await page.close();
}

await browser.close();
