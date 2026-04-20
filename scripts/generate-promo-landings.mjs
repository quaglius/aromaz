/**
 * Genera las páginas de landing para cada promo.
 * Se corre una sola vez (o cuando se agregan/quitan promos).
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const promos = [
  {
    id: 'generica', slug: 'promo-generica.html',
    title: 'Llevá 2, pagá 15% menos — Aromaz Perfum Shop',
    description: 'Promo permanente: 15% de descuento en tu carrito llevando 2 fragancias cualesquiera. Código AROMAZ15.',
    code: 'AROMAZ15'
  },
  {
    id: 'padre', slug: 'promo-dia-del-padre.html',
    title: 'Día del Padre — 20% OFF en 2 perfumes | Aromaz',
    description: 'Regalale a papá una fragancia de 10. 20% OFF llevando 2 perfumes masculinos o unisex. Código PAPA2026.',
    code: 'PAPA2026'
  },
  {
    id: 'madre', slug: 'promo-dia-de-la-madre.html',
    title: 'Día de la Madre — 20% OFF + envoltorio | Aromaz',
    description: 'Para la mujer más importante. 20% OFF llevando 2 perfumes femeninos o unisex + envoltorio premium sin cargo. Código MAMA2026.',
    code: 'MAMA2026'
  },
  {
    id: 'cyber-monday', slug: 'promo-cyber-monday.html',
    title: 'Cyber Monday — 25% OFF en toda la tienda | Aromaz',
    description: '72 horas de precios únicos: 25% OFF en todo el catálogo Aromaz. Código CYBER2026.',
    code: 'CYBER2026'
  },
  {
    id: 'black-friday', slug: 'promo-black-friday.html',
    title: 'Black Friday — 20% OFF + envío gratis | Aromaz',
    description: 'Black Friday en Aromaz: 20% OFF en todo el catálogo + envío gratis a todo el país. Código BLACK2026.',
    code: 'BLACK2026'
  },
  {
    id: 'navidad', slug: 'promo-navidad.html',
    title: 'Navidad — Gift Box + 15% OFF | Aromaz',
    description: 'Regalos que se recuerdan. 15% OFF llevando 2 perfumes + Gift Box navideño sin cargo. Código NAVIDAD2026.',
    code: 'NAVIDAD2026'
  },
  {
    id: 'reyes', slug: 'promo-reyes.html',
    title: 'Reyes — 10% OFF + envío gratis | Aromaz',
    description: 'El último regalo de la temporada. 10% OFF + envío gratis para llegar el 5 de enero. Código REYES2027.',
    code: 'REYES2027'
  },
  {
    id: 'cumpleanos', slug: 'promo-cumpleanos.html',
    title: 'Cumpleaños — 15% OFF + tarjeta escrita a mano | Aromaz',
    description: 'Para quedar bien en cualquier festejo. 15% OFF llevando 2 perfumes + tarjeta personalizada. Código CUMPLE15.',
    code: 'CUMPLE15'
  },
  {
    id: 'pareja', slug: 'promo-pareja.html',
    title: 'Regalo para tu pareja — Pack él + ella 20% OFF | Aromaz',
    description: 'La combinación perfecta. 20% OFF llevando un perfume para él y uno para ella (o unisex). Código PAREJA20.',
    code: 'PAREJA20'
  }
];

const HEAD_COMMON = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/responsive.css">
  <link rel="stylesheet" href="css/promos.css">
  <link rel="icon" type="image/jpeg" href="images/logo/aromaz-instagram.jpg">`;

const SCRIPTS_COMMON = `
  <script src="js/config.js"></script>
  <script src="js/cart.js"></script>
  <script src="js/whatsapp.js"></script>
  <script src="js/products.js"></script>
  <script src="js/promos.js"></script>
  <script src="js/layout.js"></script>
  <script src="js/main.js"></script>`;

function buildLanding(p) {
  return `<!DOCTYPE html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title}</title>
  <meta name="description" content="${p.description}">
${HEAD_COMMON}
</head>
<body>
  <div id="layout-header"></div>

  <main data-promo-landing>
    <div class="spinner" style="margin: var(--sp-9) auto;"></div>
  </main>

  <div id="layout-footer"></div>
${SCRIPTS_COMMON}

  <script>
    AROMAZ.layout.render({
      activeNav: '',
      title: ${JSON.stringify(p.title)},
      description: ${JSON.stringify(p.description)},
      path: '/${p.slug.replace('.html', '')}'
    });
    AROMAZ.promos.render('${p.id}');
  </script>
</body>
</html>
`;
}

function buildIndex() {
  return `<!DOCTYPE html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Promociones y descuentos — Aromaz Perfum Shop</title>
  <meta name="description" content="Todas las promos de Aromaz Perfum Shop: 15% OFF llevando 2, Día del Padre, Día de la Madre, Cyber Monday, Black Friday, Navidad, Reyes, cumpleaños y regalos de pareja.">
${HEAD_COMMON}
</head>
<body>
  <div id="layout-header"></div>

  <main>
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">Beneficios y descuentos</span>
        <h1>Promos <em>vigentes</em></h1>
        <p>Elegí la promo que más se adapte a vos, anotá el código y usalo al finalizar la compra por WhatsApp.</p>
      </div>
    </section>

    <div class="container">
      <div class="breadcrumb">
        <a href="index.html">Inicio</a>
        <span class="separator">/</span>
        <span>Promos</span>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="promos-grid" data-promos-grid></div>
        <p class="promo-fine-print" style="margin-top: var(--sp-8);">
          <i class="fas fa-circle-info"></i>
          Las promos no son acumulables entre sí ni con otros descuentos vigentes. Stock sujeto a disponibilidad al momento de la compra. Fechas específicas se indican en cada landing.
        </p>
      </div>
    </section>
  </main>

  <div id="layout-footer"></div>
${SCRIPTS_COMMON}

  <script>
    AROMAZ.layout.render({
      activeNav: '',
      title: 'Promociones y descuentos — Aromaz Perfum Shop',
      description: 'Todas las promos de Aromaz: descuentos por temporada, Día del Padre, Madre, Cyber Monday, Black Friday, Navidad, Reyes y más.',
      path: '/promos'
    });

    (function renderPromosIndex() {
      const grid = document.querySelector('[data-promos-grid]');
      if (!grid) return;
      const active = AROMAZ.promos.activeCampaign();
      const now = new Date();
      const cards = AROMAZ.promos.list.map(p => {
        const isActive = active && active.id === p.id;
        const dateText = p.date
          ? new Date(p.date + 'T12:00:00-03:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
          : 'Todo el año';
        return \`
          <a href="\${p.slug}" class="promo-card" data-active="\${isActive}">
            <div class="promo-card-head" style="background: \${p.color}; --promo-accent: \${p.accent};">
              <div class="promo-card-icon"><i class="fas \${p.icon}"></i></div>
              <div>
                <span class="promo-card-badge">\${p.badge}</span>
                <h3>\${p.title}</h3>
                <div class="subtitle">\${p.subtitle}</div>
              </div>
            </div>
            <div class="promo-card-body">
              <p>\${p.description}</p>
              <div class="promo-card-meta">
                <span class="promo-card-code"><i class="fas fa-tag"></i> \${p.code}</span>
                <span class="promo-card-date">\${dateText}</span>
              </div>
              <span class="promo-card-link">Ver promo <i class="fas fa-arrow-right"></i></span>
            </div>
          </a>
        \`;
      }).join('');
      grid.innerHTML = cards;
    })();
  </script>
</body>
</html>
`;
}

const root = path.resolve(process.cwd());

for (const p of promos) {
  await fs.writeFile(path.join(root, p.slug), buildLanding(p), 'utf8');
  console.log(`✓ ${p.slug}`);
}
await fs.writeFile(path.join(root, 'promos.html'), buildIndex(), 'utf8');
console.log(`✓ promos.html`);
console.log(`\n${promos.length} landings + index generados.`);
