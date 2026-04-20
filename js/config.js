/* =========================================================
   AROMAZ - Configuración global
   ========================================================= */
window.AROMAZ = {
  brand: 'Aromaz Perfum Shop',
  domain: 'aromazperfumshop.com.ar',
  whatsapp: '5491166967597',
  instagram: 'aromazperfumshop',
  instagramUrl: 'https://www.instagram.com/aromazperfumshop/',
  gaId: 'G-XXXXXXXXXX',
  envioGratisDesde: 50000,
  formatMoney(n) {
    return '$' + Math.round(n).toLocaleString('es-AR');
  },
  whatsappLink(message = '') {
    const base = `https://wa.me/${this.whatsapp}`;
    if (!message) return base;
    return `${base}?text=${encodeURIComponent(message)}`;
  }
};
