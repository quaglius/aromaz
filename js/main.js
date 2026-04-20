/* =========================================================
   AROMAZ - Main script (header, drawer, toasts, etc.)
   ========================================================= */

(function () {
  'use strict';

  // ===== Toast =====
  AROMAZ.toast = function (message, type = '') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast ' + (type ? `toast-${type}` : '');
    const icon = type === 'success' ? 'fa-circle-check'
      : type === 'error' ? 'fa-circle-exclamation'
      : 'fa-circle-info';
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      toast.style.transition = 'all 400ms ease';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  // ===== Mobile drawer =====
  function initMobileDrawer() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    const closeBtn = drawer?.querySelector('.close-drawer');

    if (!toggle || !drawer || !backdrop) return;

    function open() {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    toggle.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }

  // ===== Búsqueda global =====
  async function initSearch() {
    const trigger = document.querySelector('[data-search-trigger]');
    const overlay = document.querySelector('.search-overlay');
    const input = overlay?.querySelector('input');
    const results = overlay?.querySelector('.search-results');
    const close = overlay?.querySelector('.search-close');
    if (!trigger || !overlay || !input) return;

    function openSearch() {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input.focus(), 100);
    }
    function closeSearch() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      input.value = '';
      results.innerHTML = '';
    }
    trigger.addEventListener('click', openSearch);
    close?.addEventListener('click', closeSearch);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

    let timeout;
    input.addEventListener('input', () => {
      clearTimeout(timeout);
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.innerHTML = ''; return; }
      timeout = setTimeout(async () => {
        const products = await AROMAZ.products.all();
        const filtered = products.filter(p => {
          return p.nombre.toLowerCase().includes(q)
            || p.equivalencia.toLowerCase().includes(q)
            || (p.familiaOlfativa || []).join(' ').includes(q)
            || p.genero.includes(q);
        }).slice(0, 8);
        if (filtered.length === 0) {
          results.innerHTML = `<div class="search-result-item"><div class="info"><div class="name">Sin resultados para "${q}"</div><div class="sub">Probá con otro nombre o marca</div></div></div>`;
          return;
        }
        results.innerHTML = filtered.map(p => `
          <a href="producto.html?p=${encodeURIComponent(p.slug)}" class="search-result-item">
            <img src="${p.imagenPrincipal}" alt="${p.nombre}">
            <div class="info">
              <div class="name">${p.nombre}</div>
              <div class="sub">${p.equivalencia ? 'Inspirada en ' + p.equivalencia : p.genero} — Desde ${AROMAZ.formatMoney(p.precioDesde)}</div>
            </div>
          </a>
        `).join('');
        if (window.gtag) gtag('event', 'search', { search_term: q });
      }, 250);
    });
  }

  // ===== Intersection Observer para fade-in-up =====
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-up');
    if (!elements.length || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
    elements.forEach(el => observer.observe(el));
  }

  // ===== Favoritos global listener =====
  function initFavorites() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-favorite');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const sku = btn.dataset.sku;
      if (!sku) return;
      const added = AROMAZ.favorites.toggle(sku);
      btn.classList.toggle('is-active', added);
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fas', added);
        icon.classList.toggle('far', !added);
      }
      if (added) {
        AROMAZ.toast('Agregado a favoritos', 'success');
        if (window.gtag) gtag('event', 'add_to_wishlist');
      } else {
        AROMAZ.toast('Eliminado de favoritos');
      }
    });
  }

  // ===== Vista rápida global listener =====
  function initQuickView() {
    document.addEventListener('click', async (e) => {
      const btn = e.target.closest('.btn-quick-view, .btn-add');
      if (!btn) return;
      e.preventDefault();
      const sku = btn.dataset.sku;
      if (!sku) return;
      const product = await AROMAZ.products.bySku(sku);
      if (!product) return;
      openQuickView(product);
    });
  }

  function openQuickView(p) {
    let modal = document.querySelector('.modal-backdrop[data-quickview]');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-backdrop';
      modal.dataset.quickview = 'true';
      document.body.appendChild(modal);
    }
    const presentaciones = p.presentaciones;
    const firstDisponible = presentaciones.find(v => v.disponible) || presentaciones[0];

    modal.innerHTML = `
      <div class="modal">
        <button class="modal-close" aria-label="Cerrar"><i class="fas fa-times"></i></button>
        <div class="modal-content">
          <div class="modal-img">
            <img src="${p.imagenPrincipal}" alt="${p.nombre}">
          </div>
          <div class="modal-info">
            <span class="product-gender">${p.genero.charAt(0).toUpperCase() + p.genero.slice(1)}${p.familiaOlfativa?.[0] ? ' · ' + p.familiaOlfativa[0] : ''}</span>
            <h2 style="font-size: var(--fs-3xl); margin: var(--sp-2) 0;">${p.nombre}</h2>
            <p class="equivalence" style="font-style:italic; color: var(--c-gray-600); margin-bottom: var(--sp-4);">${p.equivalencia ? 'Inspirada en ' + p.equivalencia : ''}</p>
            <p style="margin-bottom: var(--sp-4); color: var(--c-gray-800); font-size: var(--fs-sm); line-height:1.7;">${p.descripcion}</p>
            <div class="presentations">
              <h4>Elegí tu presentación</h4>
              <div class="presentation-options" data-presentations>
                ${presentaciones.map((v, i) => `
                  <div class="presentation-option ${v.disponible ? (v === firstDisponible ? 'is-active' : '') : 'is-out'}"
                       data-idx="${i}" data-precio="${v.precio}">
                    <span class="pres-size">${v.tamanio}</span>
                    <span class="pres-price">${AROMAZ.formatMoney(v.precio)}</span>
                    ${!v.disponible ? '<span class="pres-badge" style="background:var(--c-gray-400)">Sin stock</span>' : ''}
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="cta-stack">
              <button class="btn btn-primary btn-block" data-add-quickview>
                <i class="fas fa-cart-shopping"></i> Agregar al carrito
              </button>
              <a href="producto.html?p=${encodeURIComponent(p.slug)}" class="btn btn-outline btn-block">
                Ver detalles completos
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    modal.querySelector('.modal-close').onclick = closeModal;
    modal.onclick = e => { if (e.target === modal) closeModal(); };

    modal.querySelectorAll('.presentation-option:not(.is-out)').forEach(opt => {
      opt.onclick = () => {
        modal.querySelectorAll('.presentation-option').forEach(o => o.classList.remove('is-active'));
        opt.classList.add('is-active');
      };
    });

    modal.querySelector('[data-add-quickview]').onclick = () => {
      const active = modal.querySelector('.presentation-option.is-active');
      if (!active) { AROMAZ.toast('Seleccioná una presentación', 'error'); return; }
      const idx = parseInt(active.dataset.idx, 10);
      const pres = presentaciones[idx];
      AROMAZ.cart.add({
        sku: p.sku,
        skuVariante: pres.sku,
        nombre: p.nombre,
        equivalencia: p.equivalencia,
        tamanio: pres.tamanio,
        precio: pres.precio,
        imagen: p.imagenPrincipal,
        slug: p.slug,
        cantidad: 1
      });
      closeModal();
    };

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    if (window.gtag) {
      gtag('event', 'view_item', {
        currency: 'ARS',
        value: p.precioDesde,
        items: [{ item_id: p.sku, item_name: p.nombre, price: p.precioDesde }]
      });
    }
  }

  // ===== Header scroll effect =====
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== Exit Intent popup =====
  function initExitIntent() {
    if (sessionStorage.getItem('aromaz-exit-shown')) return;
    const popup = document.querySelector('.exit-popup');
    if (!popup) return;

    let shown = false;
    function show() {
      if (shown) return;
      shown = true;
      sessionStorage.setItem('aromaz-exit-shown', '1');
      popup.classList.add('is-open');
    }
    document.addEventListener('mouseout', (e) => {
      if (e.relatedTarget == null && e.clientY < 20) show();
    });
    // Mobile fallback: after 45s
    setTimeout(show, 45000);

    popup.querySelector('[data-close-exit]')?.addEventListener('click', () => popup.classList.remove('is-open'));
    popup.addEventListener('click', e => { if (e.target === popup) popup.classList.remove('is-open'); });
  }

  // ===== Social Proof popups =====
  async function initSocialProof() {
    const container = document.querySelector('.social-pop');
    if (!container) return;
    const products = await AROMAZ.products.all();
    if (!products || products.length < 3) return;
    const nombres = ['Sofía', 'Valentina', 'Martina', 'Camila', 'Juan', 'Federico', 'Lucía', 'Julieta', 'Agustina', 'Marcos', 'Florencia', 'Nicolás'];
    const ciudades = ['Buenos Aires', 'Rosario', 'Córdoba', 'La Plata', 'Mar del Plata', 'Mendoza', 'Tucumán'];

    function show() {
      const p = products[Math.floor(Math.random() * products.length)];
      const nombre = nombres[Math.floor(Math.random() * nombres.length)];
      const ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];
      const minutes = 2 + Math.floor(Math.random() * 55);
      container.innerHTML = `
        <img src="${p.imagenPrincipal}" alt="">
        <div class="text">
          <strong>${nombre} de ${ciudad}</strong>
          <span>Acaba de comprar ${p.nombre}</span>
          <span style="color: var(--c-gold); font-size: 10px;">hace ${minutes} min</span>
        </div>
        <button class="close-btn" aria-label="Cerrar"><i class="fas fa-times"></i></button>
      `;
      container.classList.add('is-visible');
      container.querySelector('.close-btn').onclick = hide;
      setTimeout(hide, 6000);
    }
    function hide() { container.classList.remove('is-visible'); }

    setTimeout(show, 12000);
    setInterval(show, 45000);
  }

  // ===== FAQ Accordion =====
  function initFAQ() {
    document.addEventListener('click', (e) => {
      const q = e.target.closest('.faq-question');
      if (!q) return;
      const item = q.parentElement;
      item.classList.toggle('is-open');
    });
  }

  // ===== Filter groups collapsibles =====
  function initFilterGroups() {
    document.addEventListener('click', (e) => {
      const h = e.target.closest('.filter-group h4');
      if (!h) return;
      h.parentElement.classList.toggle('is-collapsed');
    });
  }

  // ===== Tabs =====
  function initTabs() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.tab-trigger');
      if (!trigger) return;
      const tabset = trigger.closest('.detail-tabs');
      if (!tabset) return;
      const name = trigger.dataset.tab;
      tabset.querySelectorAll('.tab-trigger').forEach(t => t.classList.toggle('is-active', t === trigger));
      tabset.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('is-active', p.dataset.tab === name));
    });
  }

  // ===== Init all =====
  document.addEventListener('DOMContentLoaded', () => {
    AROMAZ.cart.init();
    AROMAZ.favorites.init();
    initMobileDrawer();
    initSearch();
    initFavorites();
    initQuickView();
    initHeaderScroll();
    initScrollAnimations();
    initExitIntent();
    initSocialProof();
    initFAQ();
    initFilterGroups();
    initTabs();
  });
})();
