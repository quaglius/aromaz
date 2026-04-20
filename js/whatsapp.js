/* =========================================================
   AROMAZ - Generador de mensajes WhatsApp
   ========================================================= */

window.AROMAZ = window.AROMAZ || {};

AROMAZ.wa = {
  // Mensaje desde carrito
  checkoutMessage(items, total, codigoPostal = '', promoCode = '') {
    const lines = [
      '¡Hola! 👋 Quiero hacer un pedido desde Aromaz Perfum Shop:',
      '',
      '🛍️ *MI PEDIDO:*'
    ];
    for (const it of items) {
      lines.push(`• ${it.nombre} — ${it.tamanio} x${it.cantidad} — ${AROMAZ.formatMoney(it.precio * it.cantidad)}`);
    }
    lines.push('');
    lines.push(`💰 *TOTAL: ${AROMAZ.formatMoney(total)}*`);
    if (promoCode) {
      lines.push('');
      lines.push(`🎁 *Código promo:* ${promoCode}`);
    }
    lines.push('');
    if (codigoPostal) {
      lines.push(`📍 Mi código postal: ${codigoPostal}`);
    } else {
      lines.push('📍 ¿Cuál sería el costo de envío a mi zona?');
    }
    lines.push('');
    lines.push('¡Gracias!');
    return lines.join('\n');
  },

  // Consulta desde producto
  productMessage(producto, presentacion) {
    const lines = [
      `¡Hola! 👋 Quisiera consultar por este producto:`,
      '',
      `🌸 *${producto.nombre}*`,
    ];
    if (producto.equivalencia) lines.push(`Inspirado en: ${producto.equivalencia}`);
    if (presentacion) {
      lines.push(`Presentación: ${presentacion.tamanio}`);
      lines.push(`Precio: ${AROMAZ.formatMoney(presentacion.precio)}`);
    }
    lines.push('');
    lines.push('¿Tiene stock? ¿Cuál sería el costo de envío?');
    return lines.join('\n');
  },

  // Consulta general
  generalMessage(tema = '') {
    if (tema) return `¡Hola! 👋 Quisiera consultar sobre: ${tema}`;
    return '¡Hola! 👋 Quisiera consultar sobre los productos de Aromaz Perfum Shop';
  },

  // Empresas
  b2bMessage(servicio = '') {
    const lines = [
      '¡Hola! 👔 Quisiera una cotización para mi empresa/evento.',
      ''
    ];
    if (servicio) lines.push(`Servicio de interés: ${servicio}`);
    lines.push('¿Me podrían asesorar?');
    return lines.join('\n');
  },

  // Formulario empresas completo
  b2bFormMessage(data) {
    const lines = [
      '¡Hola! 👔 Quisiera una cotización empresarial:',
      '',
      `🏢 Empresa: ${data.empresa || '-'}`,
      `👤 Contacto: ${data.contacto || '-'}`,
      `📧 Email: ${data.email || '-'}`,
      `📱 Teléfono: ${data.telefono || '-'}`,
      `📦 Servicio: ${data.servicio || '-'}`,
      `🔢 Cantidad: ${data.cantidad || '-'}`,
      `📅 Fecha estimada: ${data.fecha || '-'}`,
      '',
      data.mensaje ? `📝 Mensaje: ${data.mensaje}` : '',
      '',
      '¡Gracias!'
    ].filter(Boolean);
    return lines.join('\n');
  },

  // Revendedores
  revendedorMessage() {
    return '¡Hola! 👋 Me interesa saber cómo ser revendedor de Aromaz. ¿Me pueden enviar información?';
  },

  openCheckout(items, total, codigoPostal = '', promoCode = '') {
    const msg = this.checkoutMessage(items, total, codigoPostal, promoCode);
    if (window.gtag) {
      gtag('event', 'begin_checkout', {
        currency: 'ARS',
        value: total,
        items: items.map(it => ({
          item_id: it.skuVariante,
          item_name: it.nombre,
          price: it.precio,
          quantity: it.cantidad
        }))
      });
      gtag('event', 'generate_lead', { currency: 'ARS', value: total });
    }
    window.open(AROMAZ.whatsappLink(msg), '_blank', 'noopener');
  }
};
