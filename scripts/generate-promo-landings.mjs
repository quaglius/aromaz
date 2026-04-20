/**
 * Genera las páginas de landing para cada promo.
 * Se corre una sola vez (o cuando se agregan/quitan promos).
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const DOMAIN = 'https://aromazperfumshop.netlify.app';

const promos = [
  {
    id: 'generica', slug: 'promo-generica.html', imageKey: 'generica',
    title: 'Llevá 2, pagá 15% menos | Promo perfumes Aromaz',
    description: '15% OFF llevando 2 fragancias importadas cualesquiera. Envíos a todo el país. Código AROMAZ15. Válida todo el año.',
    code: 'AROMAZ15',
    keywords: 'promo perfumes, descuento perfumes argentina, 2x1 perfumes, 15% off fragancias, comprar perfumes importados'
  },
  {
    id: 'padre', slug: 'promo-dia-del-padre.html', imageKey: 'dia-del-padre',
    title: 'Día del Padre · 20% OFF en 2 perfumes | Aromaz',
    description: 'Regalo para papá: 20% OFF llevando 2 fragancias masculinas o unisex + envío gratis en CABA/GBA. Código PAPA2026.',
    code: 'PAPA2026',
    keywords: 'regalo día del padre, perfumes para papá, regalo día del padre argentina, fragancias masculinas'
  },
  {
    id: 'madre', slug: 'promo-dia-de-la-madre.html', imageKey: 'dia-de-la-madre',
    title: 'Día de la Madre · 20% OFF + envoltorio regalo | Aromaz',
    description: 'Perfumes para regalar a mamá: 20% OFF llevando 2 fragancias femeninas + envoltorio premium sin cargo. Código MAMA2026.',
    code: 'MAMA2026',
    keywords: 'regalo día de la madre, perfumes para mamá, regalo para madres argentina, fragancias femeninas'
  },
  {
    id: 'cyber-monday', slug: 'promo-cyber-monday.html', imageKey: 'cyber-monday',
    title: 'Cyber Monday AR · 25% OFF en perfumes importados | Aromaz',
    description: 'Cyber Monday en Aromaz: 25% OFF en todo el catálogo de perfumes. 72 horas de precios únicos. Código CYBER2026.',
    code: 'CYBER2026',
    keywords: 'cyber monday perfumes, cyber monday argentina, ofertas cyber monday perfumería'
  },
  {
    id: 'black-friday', slug: 'promo-black-friday.html', imageKey: 'black-friday',
    title: 'Black Friday · 20% OFF + envío gratis en perfumes | Aromaz',
    description: 'Black Friday Aromaz: 20% OFF en todo el catálogo de perfumes importados + envío gratis a todo el país. Código BLACK2026.',
    code: 'BLACK2026',
    keywords: 'black friday perfumes, black friday argentina, descuentos black friday perfumería'
  },
  {
    id: 'navidad', slug: 'promo-navidad.html', imageKey: 'navidad',
    title: 'Navidad · Gift Box + 15% OFF en perfumes | Aromaz',
    description: 'Regalos de Navidad con aroma: 15% OFF llevando 2 perfumes + Gift Box navideño premium sin cargo. Código NAVIDAD2026.',
    code: 'NAVIDAD2026',
    keywords: 'regalo de navidad, regalos navideños, perfumes para regalar navidad, gift box navideño'
  },
  {
    id: 'reyes', slug: 'promo-reyes.html', imageKey: 'reyes',
    title: 'Noche de Reyes · 10% OFF + envío gratis en perfumes | Aromaz',
    description: 'El último regalo: 10% OFF + envío gratis para el Día de Reyes. Entregas programadas para que llegue la noche del 5. Código REYES2027.',
    code: 'REYES2027',
    keywords: 'regalo día de reyes, perfumes reyes magos, regalo reyes argentina'
  },
  {
    id: 'cumpleanos', slug: 'promo-cumpleanos.html', imageKey: 'cumpleanos',
    title: 'Regalo de cumpleaños · 15% OFF + tarjeta personalizada | Aromaz',
    description: 'Perfume de regalo para cumpleaños: 15% OFF llevando 2 fragancias + tarjeta escrita a mano. Código CUMPLE15.',
    code: 'CUMPLE15',
    keywords: 'regalo de cumpleaños, perfumes para regalar, idea de regalo cumpleaños argentina'
  },
  {
    id: 'pareja', slug: 'promo-pareja.html', imageKey: 'pareja',
    title: 'Pack Pareja · 20% OFF · él + ella | Aromaz',
    description: 'Perfumes para regalar en pareja: 20% OFF llevando uno para él y otro para ella (o dos unisex). Ideal para aniversarios. Código PAREJA20.',
    code: 'PAREJA20',
    keywords: 'regalo para pareja, regalo aniversario, perfumes pareja, regalo san valentín'
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
  const ogImage = `${DOMAIN}/images/og/promo-${p.imageKey}.png`;
  const url = `${DOMAIN}/${p.slug.replace('.html', '')}`;
  return `<!DOCTYPE html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="author" content="Aromaz Perfum Shop">
  <meta name="theme-color" content="#0a0a0a">
  <title>${p.title}</title>
  <meta name="description" content="${p.description}">
  <meta name="keywords" content="${p.keywords}">

  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Aromaz Perfum Shop">
  <meta property="og:locale" content="es_AR">
  <meta property="og:title" content="${p.title}">
  <meta property="og:description" content="${p.description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${p.title}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${p.title}">
  <meta name="twitter:description" content="${p.description}">
  <meta name="twitter:image" content="${ogImage}">
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
      keywords: ${JSON.stringify(p.keywords)},
      image: ${JSON.stringify(ogImage)},
      path: '/${p.slug.replace('.html', '')}'
    });
    AROMAZ.promos.render('${p.id}');
  </script>
</body>
</html>
`;
}

function buildIndex() {
  const title = 'Promociones y descuentos en perfumes | Aromaz Perfum Shop';
  const description = 'Todas las promos vigentes de Aromaz: 15% OFF llevando 2 fragancias, Día del Padre, Día de la Madre, Cyber Monday, Black Friday, Navidad, Reyes y regalos para pareja.';
  const keywords = 'promociones perfumes, descuentos perfumes argentina, ofertas fragancias, cupones perfumes, promos perfumería';
  const ogImage = `${DOMAIN}/images/og/promos.png`;
  const url = `${DOMAIN}/promos`;
  return `<!DOCTYPE html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="author" content="Aromaz Perfum Shop">
  <meta name="theme-color" content="#0a0a0a">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">

  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Aromaz Perfum Shop">
  <meta property="og:locale" content="es_AR">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">
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
      title: ${JSON.stringify(title)},
      description: ${JSON.stringify(description)},
      keywords: ${JSON.stringify(keywords)},
      image: ${JSON.stringify(ogImage)},
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
