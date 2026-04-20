/* =========================================================
   AROMAZ - Carga y helpers de productos
   ========================================================= */

window.AROMAZ = window.AROMAZ || {};

AROMAZ.products = {
  _data: null,
  _loading: null,

  async load() {
    if (this._data) return this._data;
    if (this._loading) return this._loading;
    this._loading = fetch('data/products.json')
      .then(r => r.json())
      .then(json => {
        this._data = json;
        return json;
      });
    return this._loading;
  },

  async all() {
    const d = await this.load();
    return d.products;
  },

  async bySlug(slug) {
    const products = await this.all();
    return products.find(p => p.slug === slug);
  },

  async bySku(sku) {
    const products = await this.all();
    return products.find(p => p.sku === sku);
  },

  async byCategory(slug) {
    const products = await this.all();
    return products.filter(p => p.categoria === slug);
  },

  async byGender(gender) {
    const products = await this.all();
    return products.filter(p => p.genero === gender);
  },

  async bestsellers(limit = 12) {
    const products = await this.all();
    return products.filter(p => p.bestseller).slice(0, limit);
  },

  async featured(limit = 12) {
    const products = await this.all();
    // Best sellers primero, despues los que tienen mas stock
    return products
      .slice()
      .sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0) || b.stockTotal - a.stockTotal)
      .slice(0, limit);
  },

  async related(product, limit = 6) {
    const products = await this.all();
    return products
      .filter(p => p.sku !== product.sku)
      .sort((a, b) => {
        let scoreA = 0, scoreB = 0;
        if (a.genero === product.genero) scoreA += 3;
        if (b.genero === product.genero) scoreB += 3;
        const famA = a.familiaOlfativa?.[0];
        const famB = b.familiaOlfativa?.[0];
        const famP = product.familiaOlfativa?.[0];
        if (famA && famA === famP) scoreA += 2;
        if (famB && famB === famP) scoreB += 2;
        return scoreB - scoreA;
      })
      .slice(0, limit);
  },

  renderCard(p, options = {}) {
    const { showAddButton = true } = options;
    const mainImg = p.imagenPrincipal || 'images/products/placeholder.jpg';
    const hoverImg = p.imagenes[1] || mainImg;
    const genderLabel = p.genero.charAt(0).toUpperCase() + p.genero.slice(1);
    const isFav = AROMAZ.favorites.has(p.sku);

    const badges = [];
    if (p.bestseller) badges.push('<span class="badge badge-bestseller">Más vendido</span>');
    if (p.nuevo) badges.push('<span class="badge badge-new">Nuevo</span>');
    if (p.stockTotal > 0 && p.stockTotal < 5) badges.push('<span class="badge badge-stock">Últimas unidades</span>');

    return `
      <article class="product-card" data-sku="${p.sku}">
        <a href="producto.html?p=${encodeURIComponent(p.slug)}" class="product-image-wrapper" aria-label="${p.nombre}">
          <img src="${mainImg}" alt="${p.nombre} - ${p.equivalencia}" loading="lazy" width="400" height="400">
          ${hoverImg !== mainImg ? `<img src="${hoverImg}" alt="" class="img-hover" loading="lazy" aria-hidden="true">` : ''}
        </a>
        <div class="product-badges">${badges.join('')}</div>
        <div class="product-actions">
          <button class="btn-favorite ${isFav ? 'is-active' : ''}" data-sku="${p.sku}" aria-label="Agregar a favoritos" title="Favorito">
            <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
          </button>
          <button class="btn-quick-view" data-sku="${p.sku}" aria-label="Vista rápida" title="Vista rápida">
            <i class="far fa-eye"></i>
          </button>
        </div>
        <div class="product-info">
          <span class="product-gender">${genderLabel}${p.familiaOlfativa?.[0] ? ` · ${p.familiaOlfativa[0]}` : ''}</span>
          <h3 class="product-name">
            <a href="producto.html?p=${encodeURIComponent(p.slug)}">${p.nombre}</a>
          </h3>
          <p class="product-equivalence">${p.equivalencia ? `Inspirada en <em>${p.equivalencia}</em>` : '&nbsp;'}</p>
          <div class="product-rating">
            <span class="stars">${this.stars(p.rating)}</span>
            <span>${p.rating} (${p.reviewsCount})</span>
          </div>
          <div class="product-price">
            <span class="price-from">Desde</span>
            <span class="price-value">${AROMAZ.formatMoney(p.precioDesde)}</span>
          </div>
          ${showAddButton ? `<button class="btn-add" data-sku="${p.sku}">Ver presentaciones</button>` : ''}
        </div>
      </article>
    `;
  },

  stars(rating) {
    const full = Math.floor(rating);
    const half = (rating - full) >= 0.5;
    let s = '';
    for (let i = 0; i < full; i++) s += '<i class="fas fa-star"></i>';
    if (half) s += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < 5 - full - (half ? 1 : 0); i++) s += '<i class="far fa-star"></i>';
    return s;
  }
};
