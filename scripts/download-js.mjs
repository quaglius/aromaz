import { writeFile, mkdir } from 'node:fs/promises';

const html = await fetch('https://checkout.extractoimportado.com.ar/u/2307/store').then(r => r.text());
const matches = [...html.matchAll(/\/_nuxt\/[A-Za-z0-9._-]+\.(?:js|mjs)/g)].map(m => m[0]);
const unique = [...new Set(matches)];
console.log(`Found ${unique.length} JS files`);

await mkdir('scripts/nuxt-js', { recursive: true });

let apiUrls = new Set();
const apiPattern = /['"`]\/api\/[a-zA-Z0-9/_?=&{}\-:]+['"`]/g;

for (const url of unique) {
  const full = 'https://checkout.extractoimportado.com.ar' + url;
  try {
    const content = await fetch(full).then(r => r.text());
    const name = url.split('/').pop();
    await writeFile(`scripts/nuxt-js/${name}`, content);
    const m = [...content.matchAll(apiPattern)].map(x => x[0]);
    m.forEach(x => apiUrls.add(x));
  } catch (e) {
    console.error(`Failed ${url}: ${e.message}`);
  }
}

console.log('\nUnique API URL patterns found:');
[...apiUrls].sort().forEach(u => console.log(u));
