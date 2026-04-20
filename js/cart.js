/* =========================================================
   AROMAZ - Carrito + Favoritos (LocalStorage)
   ========================================================= */

window.AROMAZ = window.AROMAZ || {};

AROMAZ.cart = {
  KEY: 'aromaz-cart-v1',
  _items: null,

  load() {
    if (this._items) return this._items;
    try {
      const raw = localStorage.getItem(this.KEY);
      this._items = raw ? JSON.parse(raw) : [];
    } catch {
      this._items = [];
    }
    return this._items;
  },

  save() {
    localStorage.setItem(this.KEY, JSON.stringify(this._items || []));
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('cart:updated'));
  },

  count() {
    return this.load().reduce((acc, it) => acc + it.cantidad, 0);
  },

  total() {
    return this.load().reduce((acc, it) => acc + it.precio * it.cantidad, 0);
  },

  add(item) {
    // item: { sku, skuVariante, nombre, equivalencia, tamanio, precio, imagen, cantidad }
    const items = this.load();
    const existing = items.find(i => i.skuVariante === item.skuVariante);
    if (existing) {
      existing.cantidad += item.cantidad;
    } else {
      items.push({ ...item });
    }
    this._items = items;
    this.save();
    AROMAZ.toast(`${item.nombre} (${item.tamanio}) agregado al carrito`, 'success');
    if (window.gtag) {
      gtag('event', 'add_to_cart', {
        currency: 'ARS',
        value: item.precio * item.cantidad,
        items: [{ item_id: item.skuVariante, item_name: item.nombre, price: item.precio, quantity: item.cantidad }]
      });
    }
  },

  updateQty(skuVariante, cantidad) {
    const items = this.load();
    const it = items.find(i => i.skuVariante === skuVariante);
    if (!it) return;
    it.cantidad = Math.max(1, parseInt(cantidad, 10) || 1);
    this.save();
  },

  remove(skuVariante) {
    this._items = this.load().filter(i => i.skuVariante !== skuVariante);
    this.save();
  },

  clear() {
    this._items = [];
    this.save();
  },

  updateBadge() {
    const c = this.count();
    document.querySelectorAll('[data-cart-badge]').forEach(el => {
      el.textContent = c;
      el.style.display = c > 0 ? '' : 'none';
    });
  },

  init() {
    this.load();
    this.updateBadge();
  }
};

AROMAZ.favorites = {
  KEY: 'aromaz-favorites-v1',
  _set: null,

  load() {
    if (this._set) return this._set;
    try {
      const raw = localStorage.getItem(this.KEY);
      this._set = new Set(raw ? JSON.parse(raw) : []);
    } catch {
      this._set = new Set();
    }
    return this._set;
  },

  save() {
    localStorage.setItem(this.KEY, JSON.stringify([...(this._set || new Set())]));
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('favorites:updated'));
  },

  count() { return this.load().size; },
  has(sku) { return this.load().has(sku); },
  list() { return [...this.load()]; },

  toggle(sku) {
    const set = this.load();
    let added;
    if (set.has(sku)) { set.delete(sku); added = false; }
    else { set.add(sku); added = true; }
    this.save();
    return added;
  },

  updateBadge() {
    const c = this.count();
    document.querySelectorAll('[data-favorites-badge]').forEach(el => {
      el.textContent = c;
      el.style.display = c > 0 ? '' : 'none';
    });
  },

  init() {
    this.load();
    this.updateBadge();
  }
};
