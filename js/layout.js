/* =========================================================
   AROMAZ - Header/Footer/Overlays inyectados en todas las páginas
   ========================================================= */

(function () {
  'use strict';

  const LOGO = 'images/logo/aromaz-instagram.jpg';

  const NAV_ITEMS = [
    { href: 'index.html', label: 'Inicio', id: 'home' },
    { href: 'catalogo.html', label: 'Catálogo', id: 'catalog' },
    { href: 'empresas.html', label: 'Empresas', id: 'b2b' },
    { href: 'revende.html', label: 'Revende', id: 'revende' },
    { href: 'nosotros.html', label: 'Nosotros', id: 'about' },
    { href: 'contacto.html', label: 'Contacto', id: 'contact' }
  ];

  function buildHeader(activeId) {
    const nav = NAV_ITEMS.map(i => `<li><a href="${i.href}" class="${i.id === activeId ? 'active' : ''}">${i.label}</a></li>`).join('');
    return `
      <div class="marquee">
        <div class="marquee-track">
          <span>✨ Envío gratis en compras +$50.000</span>
          <span>💳 3 cuotas sin interés</span>
          <span>💰 10% OFF por transferencia</span>
          <span>📦 Envíos a todo el país</span>
          <span>✨ Envío gratis en compras +$50.000</span>
          <span>💳 3 cuotas sin interés</span>
          <span>💰 10% OFF por transferencia</span>
          <span>📦 Envíos a todo el país</span>
        </div>
      </div>
      <header class="header">
        <div class="header-inner">
          <a href="index.html" class="logo" aria-label="Aromaz Perfum Shop">
            <img src="${LOGO}" alt="Aromaz Perfum Shop" width="52" height="52">
            <div class="logo-text">
              <span class="brand">Aromaz</span>
              <span class="tag">Perfum Shop</span>
            </div>
          </a>
          <nav class="nav-main" aria-label="Navegación principal">
            <ul>${nav}</ul>
          </nav>
          <div class="header-actions">
            <button class="btn-icon" data-search-trigger aria-label="Buscar">
              <i class="fas fa-magnifying-glass"></i>
            </button>
            <a href="favoritos.html" class="btn-icon has-badge" aria-label="Favoritos">
              <i class="far fa-heart"></i>
              <span class="badge-count" data-favorites-badge style="display:none">0</span>
            </a>
            <a href="carrito.html" class="btn-icon has-badge" aria-label="Carrito">
              <i class="fas fa-cart-shopping"></i>
              <span class="badge-count" data-cart-badge style="display:none">0</span>
            </a>
            <button class="btn-icon menu-toggle" data-menu-toggle aria-label="Menú">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  function buildSearchOverlay() {
    return `
      <div class="search-overlay">
        <button class="search-close" aria-label="Cerrar búsqueda">
          <i class="fas fa-times" aria-hidden="true"></i>
          <span class="search-close-label">Cerrar</span>
        </button>
        <div class="container-narrow">
          <input type="search" placeholder="Buscá tu fragancia favorita..." aria-label="Buscar productos">
          <div class="search-results"></div>
        </div>
      </div>
    `;
  }

  function buildMobileDrawer(activeId) {
    const links = NAV_ITEMS.map(i => `<a href="${i.href}" class="${i.id === activeId ? 'active' : ''}">${i.label}</a>`).join('');
    return `
      <div class="drawer-backdrop"></div>
      <aside class="mobile-drawer" aria-label="Menú móvil">
        <button class="close-drawer" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
        <a href="index.html" class="logo">
          <img src="${LOGO}" alt="Aromaz" width="52" height="52">
          <div class="logo-text">
            <span class="brand">Aromaz</span>
            <span class="tag">Perfum Shop</span>
          </div>
        </a>
        <nav>${links}</nav>
        <div class="mobile-drawer-footer">
          <a href="faq.html">Preguntas frecuentes</a>
          <a href="terminos.html">Términos y condiciones</a>
          <a href="${AROMAZ.whatsappLink(AROMAZ.wa.generalMessage())}" target="_blank" rel="noopener">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
          <a href="${AROMAZ.instagramUrl}" target="_blank" rel="noopener">
            <i class="fab fa-instagram"></i> @${AROMAZ.instagram}
          </a>
        </div>
      </aside>
    `;
  }

  function buildFooter() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="logo">
                <img src="${LOGO}" alt="Aromaz" width="52" height="52">
                <div class="logo-text">
                  <span class="brand">Aromaz</span>
                  <span class="tag">Perfum Shop</span>
                </div>
              </a>
              <p class="footer-desc">
                Distribuidores oficiales de Extracto Importado. Más de 220 fragancias de alta calidad para que encuentres la tuya. Envíos a todo el país.
              </p>
              <div class="footer-social">
                <a href="${AROMAZ.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="${AROMAZ.whatsappLink(AROMAZ.wa.generalMessage())}" target="_blank" rel="noopener" aria-label="WhatsApp">
                  <i class="fab fa-whatsapp"></i>
                </a>
                <a href="https://www.facebook.com/aromazperfumshop" target="_blank" rel="noopener" aria-label="Facebook">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
            <div>
              <h4>Explorar</h4>
              <ul>
                <li><a href="catalogo.html">Catálogo completo</a></li>
                <li><a href="catalogo.html?genero=femenino">Perfumes Mujer</a></li>
                <li><a href="catalogo.html?genero=masculino">Perfumes Hombre</a></li>
                <li><a href="catalogo.html?genero=unisex">Unisex</a></li>
                <li><a href="catalogo.html?categoria=body_splash">Body Splash</a></li>
                <li><a href="catalogo.html?categoria=discovery-set">Discovery Sets</a></li>
              </ul>
            </div>
            <div>
              <h4>Empresa</h4>
              <ul>
                <li><a href="nosotros.html">Nosotros</a></li>
                <li><a href="empresas.html">Empresas & Eventos</a></li>
                <li><a href="revende.html">Revende Extracto</a></li>
                <li><a href="promos.html">Promociones</a></li>
                <li><a href="faq.html">Preguntas frecuentes</a></li>
                <li><a href="terminos.html">Términos y condiciones</a></li>
                <li><a href="envios.html">Política de envíos</a></li>
              </ul>
            </div>
            <div>
              <h4>Contacto</h4>
              <div class="footer-contact-item">
                <i class="fab fa-whatsapp"></i>
                <a href="${AROMAZ.whatsappLink(AROMAZ.wa.generalMessage())}" target="_blank" rel="noopener">+54 9 11 6696-7597</a>
              </div>
              <div class="footer-contact-item">
                <i class="fab fa-instagram"></i>
                <a href="${AROMAZ.instagramUrl}" target="_blank" rel="noopener">@aromazperfumshop</a>
              </div>
              <div class="footer-contact-item">
                <i class="fas fa-truck"></i>
                <span>Envíos a todo el país</span>
              </div>
              <div class="footer-contact-item">
                <i class="fas fa-clock"></i>
                <span>Lun a Sáb 10 a 19hs</span>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <div>© ${new Date().getFullYear()} Aromaz Perfum Shop. Todos los derechos reservados.</div>
            <div class="footer-afip">
              <span>Datos fiscales:</span>
              <span>[Monotributo responsable]</span>
              <i class="fas fa-shield-halved" style="color: var(--c-gold)" title="Compra segura"></i>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function buildWhatsAppFloat() {
    return `<a href="${AROMAZ.whatsappLink(AROMAZ.wa.generalMessage())}" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Consultanos por WhatsApp" title="Consultanos">
      <i class="fab fa-whatsapp"></i>
    </a>`;
  }

  function buildExitIntent() {
    return `
      <div class="exit-popup">
        <div class="exit-popup-content">
          <i class="fas fa-gift big-icon"></i>
          <h3>¿Te ayudamos a elegir?</h3>
          <p>Consultá con nuestros asesores por WhatsApp y te guiamos para encontrar tu fragancia ideal. ¡Además podés tener 10% off pagando por transferencia!</p>
          <div class="cta-stack">
            <a href="${AROMAZ.whatsappLink(AROMAZ.wa.generalMessage('Hola! Vi la promo y quisiera asesoramiento'))}" class="btn btn-whatsapp btn-block" target="_blank" rel="noopener">
              <i class="fab fa-whatsapp"></i> Chatear con un asesor
            </a>
            <button class="btn btn-outline btn-block" data-close-exit>Seguir mirando</button>
          </div>
        </div>
      </div>
      <div class="social-pop"></div>
    `;
  }

  function setMetaTags(options = {}) {
    const {
      title = 'Aromaz Perfum Shop',
      description = 'Más de 220 fragancias importadas en Argentina',
      path = ''
    } = options;

    const url = `https://${AROMAZ.domain}${path}`;
    document.title = title;

    const ogImage = options.image || `https://${AROMAZ.domain}/images/logo/aromaz-instagram.jpg`;
    const tags = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'es_AR' },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: 'Aromaz Perfum Shop' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage }
    ];
    for (const t of tags) {
      const key = t.name ? `name="${t.name}"` : `property="${t.property}"`;
      let el = document.head.querySelector(`meta[${key}]`);
      if (!el) {
        el = document.createElement('meta');
        if (t.name) el.setAttribute('name', t.name);
        else el.setAttribute('property', t.property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', t.content);
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  function injectGA4() {
    const id = AROMAZ.gaId;
    if (!id || id === 'G-XXXXXXXXXX') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      gtag('js', new Date());
      return;
    }
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`)) return;

    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true });
  }

  function ensurePromosStylesheet() {
    if (document.querySelector('link[data-promos-css]')) return;
    if (document.querySelector('link[href$="css/promos.css"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/promos.css';
    link.setAttribute('data-promos-css', '');
    document.head.appendChild(link);
  }

  function ensurePromosScript() {
    return new Promise((resolve) => {
      if (window.AROMAZ?.promos) return resolve();
      const existing = document.querySelector('script[src$="js/promos.js"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        if (window.AROMAZ?.promos) resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = 'js/promos.js';
      s.onload = () => resolve();
      s.onerror = () => resolve();
      document.head.appendChild(s);
    });
  }

  AROMAZ.layout = {
    render({ activeNav = '', title, description, path, image } = {}) {
      ensurePromosStylesheet();

      const layoutRoot = document.getElementById('layout-header');
      if (layoutRoot) layoutRoot.outerHTML = buildHeader(activeNav) + buildSearchOverlay() + buildMobileDrawer(activeNav);
      const footRoot = document.getElementById('layout-footer');
      if (footRoot) footRoot.outerHTML = buildFooter() + buildWhatsAppFloat() + buildExitIntent();

      if (title || description) setMetaTags({ title, description, path, image });

      injectGA4();

      // Banner global de promos activas (si las hubiera)
      ensurePromosScript().then(() => {
        if (window.AROMAZ?.promos?.injectGlobalBanner) {
          try { AROMAZ.promos.injectGlobalBanner(); } catch (e) { /* noop */ }
        }
      });
    },
    setMetaTags
  };
})();
