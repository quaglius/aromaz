/* =========================================================
   AROMAZ - Landings de promociones
   ========================================================= */

window.AROMAZ = window.AROMAZ || {};

AROMAZ.promos = {
  STORAGE_KEY: 'aromaz-active-promo',

  // Fechas 2026 (AR):
  //  - Día del Padre AR: 3er domingo de junio → 21-jun-2026
  //  - Día de la Madre AR: 3er domingo de octubre → 18-oct-2026
  //  - CACE Cyber Monday AR: típicamente 1ra semana de noviembre → 2/3/4-nov-2026
  //  - Black Friday: viernes post Thanksgiving → 27-nov-2026
  //  - Navidad: 25-dic
  //  - Reyes: 6-ene-2027
  list: [
    {
      id: 'generica',
      slug: 'promo-generica.html',
      title: 'Llevá 2, pagá menos',
      subtitle: 'Promo todo el año',
      badge: '15% OFF',
      code: 'AROMAZ15',
      description: '15% de descuento llevando 2 fragancias (cualquier presentación).',
      long: 'Una promo que siempre está: elegí dos fragancias cualesquiera del catálogo, ya sea para vos, para regalar o para sumar a tu colección, y llevate <strong>15% off</strong> en el total. Aplica sobre cualquier presentación (30ml, 50ml, 100ml o Body Splash).',
      color: '#0a0a0a',
      accent: '#c9a35a',
      icon: 'fa-spray-can-sparkles',
      productFilter: p => p.bestseller || p.destacado,
      pickLimit: 8,
      evergreen: true,
      menu: false
    },
    {
      id: 'padre',
      slug: 'promo-dia-del-padre.html',
      title: 'Día del Padre',
      subtitle: 'Regalale una fragancia de 10',
      badge: '20% OFF en 2 unidades',
      code: 'PAPA2026',
      description: '20% OFF llevando 2 fragancias para él + envío gratis CABA y GBA.',
      long: 'Un perfume es el regalo que siempre queda bien. Elegí <strong>dos fragancias masculinas o unisex</strong> y aprovechá <strong>20% off</strong> en el total, más <strong>envío gratis</strong> en CABA y GBA. Tenemos clásicos amaderados, frescos, especiados y los nuevos elixires 2025.',
      date: '2026-06-21',
      windowStart: '2026-06-07',
      windowEnd: '2026-06-28',
      color: '#1d2a38',
      accent: '#c9a35a',
      icon: 'fa-mustache',
      productFilter: p => p.genero === 'masculino' || p.genero === 'unisex',
      pickLimit: 8
    },
    {
      id: 'madre',
      slug: 'promo-dia-de-la-madre.html',
      title: 'Día de la Madre',
      subtitle: 'Para la mujer más importante',
      badge: '20% OFF en 2 unidades',
      code: 'MAMA2026',
      description: '20% OFF llevando 2 fragancias para ella + envoltorio regalo sin cargo.',
      long: 'Sorprendé a mamá con una fragancia pensada para ella. Elegí <strong>dos perfumes femeninos</strong> y aprovechá <strong>20% off</strong> en el total. Te regalamos el <strong>envoltorio premium</strong> con tarjeta escrita a mano. ¿No sabés cuál elegir? Te asesoramos por WhatsApp.',
      date: '2026-10-18',
      windowStart: '2026-10-04',
      windowEnd: '2026-10-25',
      color: '#4a1d2e',
      accent: '#d97b93',
      icon: 'fa-heart',
      productFilter: p => p.genero === 'femenino' || p.genero === 'unisex',
      pickLimit: 8
    },
    {
      id: 'cyber-monday',
      slug: 'promo-cyber-monday.html',
      title: 'Cyber Monday',
      subtitle: '72 horas de precios únicos',
      badge: '25% OFF',
      code: 'CYBER2026',
      description: '25% OFF en toda la tienda durante Cyber Monday AR.',
      long: 'Tres días y sólo tres días. Durante el <strong>Cyber Monday AR</strong>, llevate <strong>25% off</strong> en todo el catálogo (pedido mínimo: 2 unidades). Se combinan con <strong>3 cuotas sin interés</strong> con MercadoPago. No acumulable con otras promos.',
      date: '2026-11-03',
      windowStart: '2026-10-20',
      windowEnd: '2026-11-09',
      color: '#0a0a1a',
      accent: '#00e0ff',
      icon: 'fa-bolt',
      productFilter: p => p.bestseller || p.destacado,
      pickLimit: 12
    },
    {
      id: 'black-friday',
      slug: 'promo-black-friday.html',
      title: 'Black Friday',
      subtitle: 'El viernes más negro del año',
      badge: '20% OFF + envío',
      code: 'BLACK2026',
      description: '20% OFF + envío gratis a todo el país durante Black Friday.',
      long: 'Black Friday Aromaz: <strong>20% off</strong> en todo el catálogo, más <strong>envío gratis</strong> a todo el país. Aprovechá para armar tu kit de verano, adelantar regalos navideños o renovar tu fragancia diaria.',
      date: '2026-11-27',
      windowStart: '2026-11-13',
      windowEnd: '2026-12-04',
      color: '#0a0a0a',
      accent: '#ff3355',
      icon: 'fa-fire',
      productFilter: p => p.bestseller,
      pickLimit: 12
    },
    {
      id: 'navidad',
      slug: 'promo-navidad.html',
      title: 'Navidad',
      subtitle: 'Regalos que se recuerdan',
      badge: 'Gift Box + 15% OFF',
      code: 'NAVIDAD2026',
      description: '15% OFF llevando 2 perfumes + Gift Box navideño premium sin cargo.',
      long: 'Armá el regalo perfecto sin salir de casa. Elegí <strong>2 fragancias cualesquiera</strong>, aplicamos <strong>15% off</strong> al total y sumamos el <strong>Gift Box navideño premium</strong> (caja, moño dorado y tarjeta escrita a mano) sin cargo. Envíos express para llegar a tiempo.',
      date: '2026-12-25',
      windowStart: '2026-12-01',
      windowEnd: '2026-12-26',
      color: '#0f2a1f',
      accent: '#c9a35a',
      icon: 'fa-tree',
      productFilter: p => p.bestseller || p.destacado,
      pickLimit: 12
    },
    {
      id: 'reyes',
      slug: 'promo-reyes.html',
      title: 'Reyes',
      subtitle: 'El último regalo de la temporada',
      badge: '10% OFF + envío',
      code: 'REYES2027',
      description: '10% OFF + envío gratis para la noche de los Reyes Magos.',
      long: 'El 5 de enero no se olvida. Regalale una fragancia sorprendente y aprovechá <strong>10% off</strong> en todo el catálogo más <strong>envío gratis</strong>. Entregas programadas para que llegue la noche del 5.',
      date: '2027-01-06',
      windowStart: '2026-12-26',
      windowEnd: '2027-01-13',
      color: '#1a1443',
      accent: '#f0c555',
      icon: 'fa-crown',
      productFilter: p => p.destacado,
      pickLimit: 8
    },
    {
      id: 'cumpleanos',
      slug: 'promo-cumpleanos.html',
      title: 'Cumpleaños',
      subtitle: 'Para quedar bien en cualquier festejo',
      badge: '15% OFF + tarjeta',
      code: 'CUMPLE15',
      description: '15% OFF llevando 2 fragancias + tarjeta personalizada escrita a mano.',
      long: '¿Tenés un cumple en puerta? Un perfume queda siempre bien y se nota. Elegí <strong>2 fragancias</strong> y aprovechá <strong>15% off</strong> en el total. Sumamos una <strong>tarjeta personalizada</strong> escrita a mano con el mensaje que quieras.',
      color: '#2a1a3d',
      accent: '#f0c555',
      icon: 'fa-cake-candles',
      productFilter: p => p.bestseller || p.destacado,
      pickLimit: 8,
      evergreen: true
    },
    {
      id: 'pareja',
      slug: 'promo-pareja.html',
      title: 'Regalo para tu pareja',
      subtitle: 'La combinación perfecta: él + ella',
      badge: 'Pack 2x 20% OFF',
      code: 'PAREJA20',
      description: '20% OFF llevando un perfume para él y uno para ella (o unisex).',
      long: 'La pareja perfecta también en fragancias. Armá el pack <strong>él + ella</strong> (o unisex + unisex, como prefieran) y aprovechá <strong>20% off</strong> en el total. Ideal para aniversarios, San Valentín o simplemente "porque sí". Incluye <strong>packaging romántico</strong> sin cargo.',
      color: '#3d0f28',
      accent: '#d97b93',
      icon: 'fa-heart',
      productFilter: p => p.bestseller,
      pickLimit: 10,
      evergreen: true
    }
  ],

  get(id) {
    return this.list.find(p => p.id === id);
  },

  /** Devuelve la promo activa más cercana a su fecha pico (o null) */
  activeCampaign() {
    const now = new Date();
    const active = this.list.filter(p => {
      if (!p.windowStart || !p.windowEnd) return false;
      const start = new Date(p.windowStart + 'T00:00:00-03:00');
      const end = new Date(p.windowEnd + 'T23:59:59-03:00');
      return now >= start && now <= end;
    });
    if (!active.length) return null;
    active.sort((a, b) => Math.abs(new Date(a.date) - now) - Math.abs(new Date(b.date) - now));
    return active[0];
  },

  setActive(id) {
    const p = this.get(id);
    if (!p) return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ id, code: p.code, title: p.title, ts: Date.now() }));
    } catch {}
  },

  getActive() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (Date.now() - obj.ts > 1000 * 60 * 60 * 24 * 14) return null;
      return obj;
    } catch { return null; }
  },

  clearActive() {
    try { localStorage.removeItem(this.STORAGE_KEY); } catch {}
  },

  formatCountdown(target) {
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return { d, h, m, s, done: diff === 0 };
  },

  async render(id) {
    const p = this.get(id);
    const container = document.querySelector('[data-promo-landing]');
    if (!p || !container) return;

    this.setActive(id);

    const allProducts = await AROMAZ.products.all();
    const picks = allProducts.filter(p.productFilter || (() => true)).slice(0, p.pickLimit || 8);

    const dateText = p.date ? new Date(p.date + 'T12:00:00-03:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    const cta = `¡Hola! 👋 Vengo de la landing *${p.title}* y quiero aprovechar la promo con el código *${p.code}*.`;
    const waHref = AROMAZ.whatsappLink(cta);

    container.innerHTML = `
      <section class="promo-hero" style="--promo-bg:${p.color}; --promo-accent:${p.accent};">
        <div class="promo-hero-bg"></div>
        <div class="container promo-hero-inner">
          <div class="promo-hero-text">
            <span class="promo-eyebrow"><i class="fas ${p.icon}"></i> ${p.subtitle}</span>
            <h1>${p.title}</h1>
            <p class="promo-lead">${p.long}</p>
            <div class="promo-code-card">
              <div>
                <span class="promo-code-label">Código</span>
                <span class="promo-code-value" data-promo-code>${p.code}</span>
              </div>
              <button class="btn btn-sm btn-outline-light" data-copy-code aria-label="Copiar código">
                <i class="fas fa-copy"></i> <span>Copiar</span>
              </button>
            </div>
            <div class="promo-ctas">
              <a href="#productos" class="btn btn-primary btn-lg"><i class="fas fa-arrow-down"></i> Ver seleccionados</a>
              <a href="${waHref}" class="btn btn-outline-light btn-lg" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Consultar</a>
            </div>
          </div>
          <div class="promo-hero-badge">
            <span class="promo-badge-big">${p.badge}</span>
            ${dateText ? `<span class="promo-hero-date">${dateText}</span>` : ''}
          </div>
        </div>
        ${p.date ? `<div class="promo-countdown" data-countdown="${p.date}"></div>` : ''}
      </section>

      <div class="container">
        <div class="breadcrumb">
          <a href="index.html">Inicio</a>
          <span class="separator">/</span>
          <a href="promos.html">Promos</a>
          <span class="separator">/</span>
          <span>${p.title}</span>
        </div>
      </div>

      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="eyebrow">¿Cómo funciona?</span>
            <h2>3 pasos para <em>aprovecharla</em></h2>
          </div>
          <div class="steps-grid promo-steps">
            <div class="step-card">
              <h4>Armá tu carrito</h4>
              <p>Elegí tus ${p.id === 'pareja' ? 'perfumes en combo (él + ella, o los dos unisex)' : '2 (o más) fragancias'} desde nuestra selección o el catálogo completo.</p>
            </div>
            <div class="step-card">
              <h4>Ingresá el código</h4>
              <p>En el carrito, pegá el código <strong>${p.code}</strong> en el campo de cupón para que se aplique el descuento.</p>
            </div>
            <div class="step-card">
              <h4>Finalizá por WhatsApp</h4>
              <p>Confirmamos stock, coordinamos envío o retiro y avisamos apenas despachemos. Así de simple.</p>
            </div>
          </div>
          <p class="promo-fine-print">
            <i class="fas fa-circle-info"></i>
            Promo no acumulable con otros descuentos. Sujeto a stock disponible al momento de confirmar el pedido. Válida ${p.date ? 'hasta el ' + new Date(new Date(p.windowEnd + 'T23:59:59-03:00')).toLocaleDateString('es-AR', { day: 'numeric', month: 'long' }) : 'mientras dure la campaña'}.
          </p>
        </div>
      </section>

      <section class="section" id="productos" style="background: var(--c-cream-dark);">
        <div class="container">
          <div class="section-header">
            <span class="eyebrow">Selección especial</span>
            <h2>${p.id === 'madre' ? 'Para ella' : p.id === 'padre' ? 'Para él' : p.id === 'pareja' ? 'Pack él + ella' : 'Nuestras recomendaciones'}</h2>
            <p>Elegí 2 o más y aplicá el código <strong style="color: var(--c-gold);">${p.code}</strong> en el carrito.</p>
          </div>
          <div class="product-grid" data-promo-products></div>
          <div style="text-align:center; margin-top: var(--sp-7);">
            <a href="catalogo.html" class="btn btn-outline">Explorar catálogo completo</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container-narrow" style="text-align:center;">
          <span class="eyebrow">Asesoramiento gratuito</span>
          <h2>¿No sabés qué <em>elegir</em>?</h2>
          <p style="margin-block: var(--sp-4); color: var(--c-gray-700); line-height: 1.8;">Contanos qué gustos tiene la persona, qué fragancias le gustaron antes y para qué ocasión querés el regalo. En minutos te recomendamos opciones ideales por WhatsApp.</p>
          <a href="${waHref}" class="btn btn-whatsapp btn-lg" target="_blank" rel="noopener">
            <i class="fab fa-whatsapp"></i> Pedir asesoramiento · Código ${p.code}
          </a>
        </div>
      </section>
    `;

    const grid = container.querySelector('[data-promo-products]');
    if (grid) grid.innerHTML = picks.map(prod => AROMAZ.products.renderCard(prod)).join('');

    // Copy-to-clipboard del código
    container.querySelector('[data-copy-code]')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(p.code);
        AROMAZ.toast?.(`Código ${p.code} copiado`, 'success');
      } catch {
        AROMAZ.toast?.('No se pudo copiar — copiá manualmente', 'error');
      }
    });

    // Countdown
    const cd = container.querySelector('[data-countdown]');
    if (cd) this._initCountdown(cd, new Date(p.date + 'T23:59:59-03:00').getTime(), p);
  },

  _initCountdown(el, target, promo) {
    const tick = () => {
      const t = this.formatCountdown(target);
      const past = Date.now() > target;
      if (past) {
        el.innerHTML = `<strong>¡Última semana!</strong> Aprovechá antes que termine la campaña.`;
        return;
      }
      el.innerHTML = `
        <span class="cd-label">Termina en</span>
        <div class="cd-boxes">
          <div><strong>${t.d}</strong><span>días</span></div>
          <div><strong>${String(t.h).padStart(2, '0')}</strong><span>hs</span></div>
          <div><strong>${String(t.m).padStart(2, '0')}</strong><span>min</span></div>
          <div><strong>${String(t.s).padStart(2, '0')}</strong><span>seg</span></div>
        </div>
      `;
    };
    tick();
    setInterval(tick, 1000);
  },

  /** Banner global en el header si hay promo activa */
  injectGlobalBanner() {
    const active = this.activeCampaign();
    if (!active) return;
    if (document.querySelector('.promo-banner')) return;

    const dismissed = sessionStorage.getItem('aromaz-promo-dismissed');
    if (dismissed === active.id) return;

    const banner = document.createElement('div');
    banner.className = 'promo-banner';
    banner.style.setProperty('--promo-accent', active.accent || '#c9a35a');
    banner.innerHTML = `
      <div class="promo-banner-inner">
        <span class="promo-banner-tag"><i class="fas ${active.icon}"></i> ${active.title}</span>
        <span class="promo-banner-copy">${active.description}</span>
        <span class="promo-banner-countdown" data-banner-cd></span>
        <a href="${active.slug}" class="promo-banner-cta">Ver promo <i class="fas fa-arrow-right"></i></a>
        <button class="promo-banner-close" aria-label="Cerrar banner"><i class="fas fa-times"></i></button>
      </div>
    `;

    const marquee = document.querySelector('.marquee');
    if (marquee && marquee.parentElement) {
      marquee.parentElement.insertBefore(banner, marquee);
    } else {
      document.body.insertBefore(banner, document.body.firstChild);
    }

    const cd = banner.querySelector('[data-banner-cd]');
    const target = new Date(active.date + 'T23:59:59-03:00').getTime();
    const tick = () => {
      const t = this.formatCountdown(target);
      if (Date.now() > target) {
        cd.innerHTML = `<strong>¡Última semana!</strong>`;
        return;
      }
      cd.innerHTML = `${t.d}d ${String(t.h).padStart(2, '0')}:${String(t.m).padStart(2, '0')}:${String(t.s).padStart(2, '0')}`;
    };
    tick();
    setInterval(tick, 1000);

    banner.querySelector('.promo-banner-close').addEventListener('click', () => {
      banner.remove();
      sessionStorage.setItem('aromaz-promo-dismissed', active.id);
    });
  }
};
