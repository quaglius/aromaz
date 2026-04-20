import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

const xhrRequests = [];

page.on('response', async (res) => {
  const url = res.url();
  const type = res.request().resourceType();
  if (type === 'xhr' || type === 'fetch' || url.includes('/api/')) {
    let preview = '';
    try {
      const text = await res.text();
      preview = text.slice(0, 500);
    } catch {}
    xhrRequests.push({
      method: res.request().method(),
      status: res.status(),
      url,
      preview: preview.replace(/\s+/g, ' ')
    });
  }
});

console.log('Navigating to store...');
await page.goto('https://checkout.extractoimportado.com.ar/u/2307/store', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);

console.log(`\n=== ${xhrRequests.length} API/XHR calls captured ===\n`);
for (const r of xhrRequests) {
  console.log(`[${r.method}] ${r.status} ${r.url}`);
  if (r.preview) console.log(`  PREVIEW: ${r.preview.slice(0, 300)}`);
  console.log('');
}

await browser.close();
