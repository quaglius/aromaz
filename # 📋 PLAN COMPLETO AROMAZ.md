# 📋 PLAN COMPLETO AROMAZ PERFUM SHOP E-COMMERCE

Basándome en toda la información analizada, te presento el plan completo de desarrollo:

---

## 🎯 RESUMEN EJECUTIVO

**Sitio:** E-commerce front-end (HTML/CSS/JS) con carrito WhatsApp  
**Productos:** 284 fragancias de Extracto Importado  
**Público:** Mujeres 25-45 años + segmento B2B (empresas/eventos)  
**Conversión:** WhatsApp +54 9 11 6696-7597  

---

## 🎨 IDENTIDAD VISUAL (Basada en análisis)

### Paleta de Colores Detectada:
- **Principal:** Rosa suave/dorado elegante (#D4A5A5, #C9A870)
- **Secundario:** Blanco crema (#FAF8F5)
- **Acentos:** Negro elegante (#1A1A1A), dorado (#B8935F)
- **CTAs:** Rosa intenso (#D97B93) / Dorado vibrante

### Tipografía:
- **Headers:** Playfair Display / Cormorant (serif elegante)
- **Body:** Poppins / Inter (sans-serif moderna)

### Estilo Visual:
- Fotografía elegante con fondos neutros
- Estética femenina, sofisticada, aspiracional
- Mucho espacio en blanco (whitespace)
- Imágenes grandes de producto con ambiente lifestyle

---

## 📐 ESTRUCTURA DEL SITIO

### **NAVEGACIÓN PRINCIPAL**
```
Logo [Aromaz] | Inicio | Catálogo ▾ | Empresas | Revende Extracto | Nosotros | Contacto
[🔍 Buscar] [❤️ Favoritos] [🛒 Carrito (0)]
```

### **FOOTER**
```
COLUMNA 1: Sobre Nosotros | Preguntas Frecuentes | Términos y Condiciones | Política de Envíos
COLUMNA 2: Categorías (Mujer, Hombre, Unisex, Body Splash, Combos, Discovery Sets)
COLUMNA 3: Contacto | WhatsApp | Instagram | Email
COLUMNA 4: Newsletter + íconos sociales
```

---

## 📄 PÁGINAS Y SECCIONES

### **1. HOME (index.html)**

#### Hero Section
```
- Video/carrusel con 3-4 imágenes lifestyle
- H1: "Descubrí tu fragancia perfecta"
- Subtítulo: "Más de 284 perfumes de alta calidad. Envíos a todo el país"
- CTA principal: "EXPLORAR CATÁLOGO" (botón grande)
- CTA secundario: "Consultar por WhatsApp"
- Badge flotante: "Envíos gratis +$50.000"
```

#### Trust Bar
```
✓ +600.000 perfumes vendidos | ✓ Envíos a todo el país | ✓ Todos los medios de pago | ✓ Atención personalizada
```

#### Categorías Destacadas (Grid 3 cols)
```
- Perfumes Femeninos (imagen + CTA)
- Perfumes Masculinos (imagen + CTA)
- Unisex (imagen + CTA)
- Body Splash (imagen + CTA)
- Discovery Sets (imagen + CTA)
- Combos/Packs (imagen + CTA)
```

#### Los Más Vendidos (Carrusel)
```
- 12 productos destacados
- Vista de tarjeta con:
  * Imagen producto
  * Nombre fragancia
  * Equivalencia original
  * Género
  * Precio desde (30ml, 50ml, 100ml)
  * CTA: "Comprar por WhatsApp"
  * Botón: Agregar a favoritos
```

#### Banner Full Width: B2B
```
"¿EVENTOS CORPORATIVOS O AMENITIES PARA TU HOTEL?"
- Subtítulo: "Perfumes personalizados, packs con logo, regalos empresariales"
- CTA: "Solicitar propuesta B2B"
- Enlace a landing específica
```

#### Por qué elegirnos
```
[Ícono] Alta calidad - Extractos importados de larga duración
[Ícono] Envíos todo el país - CABA con moto, interior con OCA
[Ícono] Atención personalizada - Asesoramiento experto por WhatsApp
[Ícono] Más de 284 fragancias - Encontrá tu favorita
```

#### Instagram Feed
```
"Seguinos en @aromazperfumshop"
- Grid 6 últimas fotos (embebidas o estáticas)
- CTA: "Ver más en Instagram"
```

#### Newsletter
```
"Recibí ofertas exclusivas y novedades"
[Email] [SUSCRIBIRME]
```

---

### **2. CATÁLOGO (catalogo.html)**

#### Filtros Lateral (Desktop) / Drawer (Mobile)
```
BUSCAR: [input con autocompletado]

CATEGORÍA:
☐ Perfume 30ml
☐ Perfume 50ml
☐ Perfume 100ml
☐ Body Splash
☐ Discovery Set

GÉNERO:
☐ Femenino
☐ Masculino
☐ Unisex

FAMILIA OLFATIVA:
☐ Floral
☐ Frutal
☐ Amaderado
☐ Oriental
☐ Cítrico
☐ Fresco

PRECIO:
[Slider] $0 - $50.000

ORDENAR POR:
- Relevancia
- Más vendidos
- Precio: menor a mayor
- Precio: mayor a menor
- Novedades
- A-Z

[Limpiar filtros]
```

#### Grid de Productos (3 cols desktop, 2 mobile)
```
Por cada producto:
- Imagen alta calidad (con hover: segunda imagen)
- Badge: "Más vendido" / "Nuevo"
- Nombre fragancia
- Equivalencia: "Similar a [marca original]"
- Género badge
- Presentaciones disponibles:
  * 30ml - $X.XXX [+CARRITO]
  * 50ml - $X.XXX [+CARRITO]
  * 100ml - $X.XXX [+CARRITO]
- ❤️ Favorito
- 👁️ Vista rápida (modal)
```

#### Paginación
```
[< Anterior] [1] [2] [3] ... [15] [Siguiente >]
Mostrando 1-24 de 284 productos
```

---

### **3. DETALLE DE PRODUCTO (producto.html)**

#### Layout 2 Columnas

**COLUMNA IZQUIERDA:**
```
- Galería de imágenes:
  * Imagen principal grande
  * Thumbnails (4-6 fotos)
  * Zoom on hover/click
  * Lightbox
```

**COLUMNA DERECHA:**
```
[Badge: Género + Familia Olfativa]

# Nombre del Perfume
## "Similar a [marca original]"

⭐⭐⭐⭐⭐ (4.8) - 127 opiniones [Simular si no hay reales]

---

DESCRIPCIÓN:
[Texto descriptivo de notas, carácter, ocasión]

Notas de salida: [lista]
Notas de corazón: [lista]
Notas de fondo: [lista]

---

PRESENTACIONES DISPONIBLES:

○ 30ml - $X.XXX
● 50ml - $X.XXX (más elegido)
○ 100ml - $X.XXX

[- 1 +] 

[🛒 AGREGAR AL CARRITO] (botón grande y llamativo)
[💬 COMPRAR POR WHATSAPP] (botón secundario)
[❤️ AÑADIR A FAVORITOS]

---

✓ Envío gratis en compras +$50.000
✓ Concentración premium de larga duración
✓ Consultá stock en tiempo real
```

#### Tabs Adicionales
```
TAB 1: Descripción extendida
TAB 2: Modo de uso
TAB 3: Envíos y devoluciones
TAB 4: Preguntas frecuentes
```

#### Productos Relacionados
```
"También te puede interesar"
[Carrusel 4-6 productos similares]
```

---

### **4. NOSOTROS (nosotros.html)**

```
HERO:
"La pasión nos inspira a destacar el aroma que te hace especial"

NUESTRA HISTORIA:
- Quiénes somos
- Distribuidores oficiales de Extracto Importado
- Más de 600.000 perfumes vendidos
- Compromiso con la calidad

POR QUÉ ELEGIRNOS:
[Grid 4 bloques con íconos]

NUESTROS VALORES:
- Calidad
- Atención personalizada
- Variedad
- Confianza

EQUIPO (opcional, si tienen fotos)

CTA: "Explorá nuestro catálogo"
```

---

### **5. LANDING B2B - EMPRESAS & EVENTOS (empresas.html)**

```
HERO:
"Perfumes personalizados para tu empresa o evento"
Subtítulo: "Amenities, regalos corporativos, packs con logo"
[Formulario de contacto empresas en sidebar]

SERVICIOS:
1. 🏨 AMENITIES PARA HOTELES
   - Perfumes y body splash personalizados
   - Packaging con logo del hotel
   - Presentaciones desde 30ml
   [CTA: Solicitar propuesta]

2. 🎁 REGALOS CORPORATIVOS
   - Combos personalizados para colaboradores
   - Eventos empresariales, fin de año, clientes
   - Cajas de regalo premium
   [CTA: Solicitar propuesta]

3. 💍 SOUVENIRS PARA EVENTOS
   - Bodas, 15 años, cumpleaños
   - Discovery sets personalizados
   - Etiquetas customizadas
   [CTA: Solicitar propuesta]

4. 📦 PACKS CON LOGO
   - Branding personalizado
   - Mínimo [X] unidades
   - Diseño incluido
   [CTA: Solicitar propuesta]

BENEFICIOS:
- Precios especiales por volumen
- Asesoramiento personalizado
- Entregas programadas
- Muestras sin cargo

CASOS DE ÉXITO:
[2-3 testimonios/fotos de trabajos realizados]

FORMULARIO:
Nombre empresa:
Contacto:
Email:
Teléfono:
Tipo de servicio:
Cantidad estimada:
Fecha estimada:
Mensaje:
[ENVIAR CONSULTA]

Todos los envíos van a WhatsApp
```

---

### **6. REVENDE EXTRACTO (revende.html)**

```
Similar a vendeextracto.com.ar pero adaptado:

HERO:
"Convertí Extracto en tu oportunidad de negocio"

BENEFICIOS:
- +200 fragancias en stock
- Presentaciones para cada tipo de venta
- Soporte y herramientas
- Precios mayoristas

CÓMO FUNCIONA:
[Paso 1] [Paso 2] [Paso 3]

REQUISITOS

FAQ REVENDEDORES

CTA: "Quiero ser revendedor" → WhatsApp
```

---

### **7. PREGUNTAS FRECUENTES (faq.html)**

```
Acordeón con categorías:

📦 ENVÍOS Y ENTREGAS
- ¿Cuánto demora el envío?
- ¿Hacen envíos a todo el país?
- ¿Cuál es el costo de envío?
- ¿Envío gratis?

🛍️ COMPRAS Y PAGOS
- ¿Cómo comprar?
- ¿Qué medios de pago aceptan?
- ¿Puedo pagar en cuotas?
- ¿Emiten factura?

💧 SOBRE LOS PRODUCTOS
- ¿Son extractos o perfumes?
- ¿Cuánto dura el aroma?
- ¿Diferencias entre 30ml, 50ml y 100ml?
- ¿Qué significa "similar a"?

🔄 CAMBIOS Y DEVOLUCIONES
- ¿Puedo devolver un producto?
- ¿Cómo hago un cambio?
- Política de devoluciones

📞 CONTACTO Y ATENCIÓN
- ¿Cómo los contacto?
- ¿Horarios de atención?
- ¿Tienen local físico?
```

---

### **8. TÉRMINOS Y CONDICIONES (terminos.html)**

```
Secciones legales:
1. Aceptación de términos
2. Uso del sitio
3. Productos y precios
4. Compras y pagos
5. Envíos y entregas
6. Cambios y devoluciones
7. Garantías
8. Limitación de responsabilidad
9. Propiedad intelectual
10. Protección de datos personales
11. Modificaciones
12. Jurisdicción

[Adaptado al marco legal argentino]
```

---

### **9. CARRITO (carrito.html)**

```
LAYOUT 2 COLUMNAS:

COLUMNA PRINCIPAL (70%):
[Tabla de productos en carrito]
- Imagen miniatura
- Nombre + presentación
- Precio unitario
- Cantidad [- 1 +]
- Subtotal
- [🗑️ Eliminar]

[Seguir comprando]

COLUMNA DERECHA (30%):
┌─────────────────────────┐
│ RESUMEN DEL PEDIDO      │
├─────────────────────────┤
│ Subtotal:      $XX.XXX  │
│ Envío:         A calcular│
├─────────────────────────┤
│ TOTAL:         $XX.XXX  │
└─────────────────────────┘

Código de descuento:
[___________] [Aplicar]

📍 ¿A dónde enviamos?
[Ingresá tu código postal]
[Calcular envío]

[🛒 FINALIZAR COMPRA POR WHATSAPP]
(botón grande, verde)

Mensaje pre-armado:
"¡Hola! Quiero comprar:
- [Producto 1] x[cant]
- [Producto 2] x[cant]
Total: $XX.XXX
Mi código postal: ____
¿Cuál es el costo de envío?"
```

---

### **10. FAVORITOS (favoritos.html)**

```
Grid de productos guardados
- Sincronizado con localStorage
- Botón "Mover todos al carrito"
- Botón individual "Agregar al carrito"
- Opción "Compartir favoritos" (link)
```

---

## 🔧 FUNCIONALIDADES TÉCNICAS

### **CARRITO DE COMPRAS**
```javascript
// LocalStorage persistente
- Agregar producto con tamaño seleccionado
- Actualizar cantidades
- Eliminar productos
- Calcular subtotales y totales
- Persistir entre sesiones
- Badge contador en header (actualización en tiempo real)
```

### **GENERADOR DE MENSAJE WHATSAPP**
```javascript
// Formato del mensaje:
¡Hola! 👋 Quiero hacer un pedido:

🛍️ *PRODUCTOS:*
• [Nombre Producto] - [Tamaño] x [Cant] - $[Precio]
• [Nombre Producto] - [Tamaño] x [Cant] - $[Precio]

💰 *TOTAL: $XX.XXX*

📍 *Código Postal:* [____]

¿Cuál es el costo de envío a mi zona?

// Botón que abre:
https://wa.me/5491166967597?text=[mensaje_encoded]
```

### **BUSCADOR INTELIGENTE**
```javascript
- Búsqueda en tiempo real (debounce 300ms)
- Busca por:
  * Nombre del perfume
  * Equivalencia/marca original
  * Familia olfativa
  * Género
- Autocomplete con sugerencias
- Muestra resultados mientras escribís
```

### **FILTROS Y ORDENAMIENTO**
```javascript
- Filtros múltiples (AND logic)
- URL params para compartir búsquedas
- "Limpiar filtros" individual y general
- Contador de productos encontrados
- Sin reload de página (JavaScript)
```

### **SISTEMA DE FAVORITOS**
```javascript
- ❤️ Toggle on/off
- LocalStorage
- Contador en header
- Página dedicada de favoritos
- Botón "Compartir lista" (copia URL)
```

### **VISTA RÁPIDA (MODAL)**
```javascript
// Al hacer click en "👁️ Vista rápida"
Modal con:
- Imagen producto
- Info básica
- Selector de tamaño
- Botón "Agregar al carrito"
- Link "Ver detalles completos"
```

---

## 📊 SEO COMPLETO

### **SEO ON-PAGE**

#### Meta Tags Globales (todas las páginas):
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="index, follow">
<meta name="author" content="Aromaz Perfum Shop">
<link rel="canonical" href="https://aromazperfumshop.com.ar/[page]">

<!-- Primary Meta Tags -->
<title>[Página específica] | Aromaz Perfum Shop - Perfumes Importados</title>
<meta name="title" content="[Título optimizado]">
<meta name="description" content="[Descripción 150-160 caracteres]">
<meta name="keywords" content="perfumes importados, extracto importado, fragancias argentina, perfumes baratos, body splash">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://aromazperfumshop.com.ar/">
<meta property="og:title" content="[Título]">
<meta property="og:description" content="[Descripción]">
<meta property="og:image" content="[imagen 1200x630]">
<meta property="og:locale" content="es_AR">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://aromazperfumshop.com.ar/">
<meta property="twitter:title" content="[Título]">
<meta property="twitter:description" content="[Descripción]">
<meta property="twitter:image" content="[imagen]">

<!-- Favicon -->
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

#### HOME - Meta Tags Específicos:
```html
<title>Aromaz Perfum Shop - Perfumes y Extractos Importados | Envíos a todo el País</title>
<meta name="description" content="✓ Más de 284 fragancias importadas en stock ✓ Envíos a todo Argentina ✓ Body Splash, Discovery Sets y Combos ✓ Atención personalizada por WhatsApp">
<meta name="keywords" content="perfumes importados argentina, extracto importado, comprar perfumes online, fragancias baratas, aromaz, body splash, discovery set">
```

#### PRODUCTO - Schema Markup:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "[Nombre del Perfume]",
  "image": "[URL imagen]",
  "description": "[Descripción del producto]",
  "brand": {
    "@type": "Brand",
    "name": "Extracto Importado"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "[precio mínimo]",
    "highPrice": "[precio máximo]",
    "priceCurrency": "ARS",
    "availability": "https://schema.org/InStock",
    "url": "[URL producto]"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
</script>
```

#### Organization Schema (HOME):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Aromaz Perfum Shop",
  "image": "[Logo URL]",
  "description": "Distribuidores oficiales de Extracto Importado. Más de 284 fragancias en Argentina.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Buenos Aires",
    "addressRegion": "CABA",
    "addressCountry": "AR"
  },
  "telephone": "+54-9-11-6696-7597",
  "email": "aromazperfumshop@gmail.com",
  "url": "https://aromazperfumshop.com.ar",
  "sameAs": [
    "https://www.instagram.com/aromazperfumshop/"
  ]
}
</script>
```

#### Breadcrumbs Schema:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Inicio",
    "item": "https://aromazperfumshop.com.ar/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Catálogo",
    "item": "https://aromazperfumshop.com.ar/catalogo"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "[Producto]"
  }]
}
</script>
```

### **SEO TÉCNICO**

#### sitemap.xml:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aromazperfumshop.com.ar/</loc>
    <lastmod>2026-04-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://aromazperfumshop.com.ar/catalogo</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- 284 productos individuales -->
  <url>
    <loc>https://aromazperfumshop.com.ar/producto/[nombre-perfume]</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Otras páginas -->
</urlset>
```

#### robots.txt:
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /carrito
Disallow: /favoritos

Sitemap: https://aromazperfumshop.com.ar/sitemap.xml
```

#### .htaccess (Optimizaciones):
```apache
# Redirección WWW
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.aromazperfumshop\.com\.ar [NC]
RewriteRule ^(.*)$ https://aromazperfumshop.com.ar/$1 [L,R=301]

# URLs limpias
RewriteRule ^producto/([a-z0-9-]+)$ producto.html?slug=$1 [L]
RewriteRule ^catalogo/([a-z0-9-]+)$ catalogo.html?categoria=$1 [L]

# Compresión GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Cache de archivos estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### **URLs AMIGABLES**

```
❌ MAL: producto.html?id=123
✅ BIEN: /producto/good-girl-carolina-herrera-100ml

❌ MAL: catalogo.html?cat=fem
✅ BIEN: /catalogo/perfumes-femeninos

❌ MAL: empresas.html
✅ BIEN: /soluciones-empresas-eventos
```

### **KEYWORDS TARGET**

#### Palabras Clave Principales:
```
- perfumes importados argentina [volumen alto]
- extracto importado [volumen alto]
- comprar perfumes online argentina
- perfumes baratos buenos aires
- aromaz perfum shop
- body splash argentina
- discovery set perfumes
- perfumes empresas argentina
- amenities hoteles personalizados
```

#### Long-tail Keywords (por producto):
```
- perfume similar good girl carolina herrera
- extracto chanel n5 argentina
- body splash victoria secret precio
- discovery set hombre regalo
- perfume para evento corporativo
```

### **CONTENIDO SEO**

#### Blog (Opcional pero recomendado):
```
/blog/
- "Cómo elegir tu perfume según tu personalidad"
- "Diferencia entre perfume y extracto: guía completa"
- "10 fragancias ideales para primavera 2026"
- "Cómo hacer durar más tu perfume: tips profesionales"
- "Perfumes corporativos: la imagen olfativa de tu marca"
```

---

## 📱 GOOGLE ANALYTICS 4

### **Implementación:**

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  gtag('config', 'G-XXXXXXXXXX', {
    'cookie_flags': 'SameSite=None;Secure',
    'send_page_view': true
  });
</script>
```

### **Eventos Personalizados a Trackear:**

```javascript
// 1. Ver producto
gtag('event', 'view_item', {
  currency: 'ARS',
  value: precio,
  items: [{
    item_id: 'SKU_123',
    item_name: 'Nombre Perfume',
    item_category: 'Perfume',
    item_category2: 'Femenino',
    price: precio,
    quantity: 1
  }]
});

// 2. Agregar al carrito
gtag('event', 'add_to_cart', {
  currency: 'ARS',
  value: precio,
  items: [...]
});

// 3. Iniciar checkout (ir a WhatsApp)
gtag('event', 'begin_checkout', {
  currency: 'ARS',
  value: totalCarrito,
  items: [...]
});

// 4. Click en WhatsApp
gtag('event', 'generate_lead', {
  currency: 'ARS',
  value: totalCarrito
});

// 5. Click en Instagram
gtag('event', 'social_click', {
  social_network: 'Instagram',
  social_action: 'click'
});

// 6. Búsqueda
gtag('event', 'search', {
  search_term: terminoBuscado
});

// 7. Filtros aplicados
gtag('event', 'filter_products', {
  filter_type: 'genero',
  filter_value: 'femenino'
});

// 8. Favoritos
gtag('event', 'add_to_wishlist', {
  currency: 'ARS',
  value: precio,
  items: [...]
});

// 9. Formulario empresas
gtag('event', 'submit_form', {
  form_name: 'empresas_b2b'
});

// 10. Newsletter
gtag('event', 'newsletter_signup', {
  method: 'email'
});
```

### **Objetivos/Conversiones en GA4:**

```
1. Conversión Primaria: Click en "Comprar por WhatsApp" (desde carrito)
2. Conversión Secundaria: Click en WhatsApp desde producto individual
3. Micro-conversión: Agregar al carrito
4. Micro-conversión: Agregar a favoritos
5. Engagement: Tiempo en página producto >30seg
6. Lead: Formulario empresas enviado
7. Lead: Suscripción newsletter
```

---

## 🎨 CTAs ESTRATÉGICOS

### **Distribución de CTAs por Página:**

#### HOME:
```
1. Hero: "EXPLORAR CATÁLOGO" (principal)
2. Hero: "Consultar por WhatsApp" (secundario)
3. Por cada categoría: "VER PRODUCTOS"
4. Productos destacados: "COMPRAR POR WHATSAPP" x12
5. Banner B2B: "SOLICITAR PROPUESTA"
6. Footer: "SEGUINOS EN INSTAGRAM"
7. Sticky bottom (mobile): "💬 Chateá con nosotros"
8. Popup salida (exit-intent): "¿TE AYUDAMOS A ELEGIR?"
```

#### CATÁLOGO:
```
1. Cada producto: "AGREGAR AL CARRITO"
2. Cada producto: "VISTA RÁPIDA"
3. Sticky top: "💬 ¿Dudas? Consultá por WhatsApp"
4. Sin resultados: "HABLÁ CON UN ASESOR"
```

#### PRODUCTO:
```
1. Principal: "AGREGAR AL CARRITO" (grande, dorado/rosa)
2. Secundario: "COMPRAR POR WHATSAPP"
3. Terciario: "❤️ FAVORITOS"
4. Sticky mobile: mismo layout compacto
5. Relacionados: "VER PRODUCTO" x6
```

#### CARRITO:
```
1. Principal: "FINALIZAR COMPRA POR WHATSAPP" (verde, grande)
2. Secundario: "Seguir comprando"
3. Si vacío: "EXPLORAR CATÁLOGO"
```

#### EMPRESAS:
```
1. Hero: "SOLICITAR COTIZACIÓN"
2. Por cada servicio: "CONSULTAR AHORA"
3. Formulario: "ENVIAR CONSULTA"
4. Sticky: "💼 Hablá con ventas empresas"
```

---

## 🎯 OPTIMIZACIÓN DE CONVERSIÓN (CRO)

### **Técnicas Implementadas:**

1. **Urgencia y Escasez:**
```
- Badge "Últimas unidades" en productos con stock <5
- "X personas vieron esto en la última hora"
- Countdown en promociones (si aplica)
```

2. **Prueba Social:**
```
- "Más de 600.000 perfumes vendidos"
- "★★★★★ (4.8) - 127 opiniones" en productos
- Instagram feed en home
- Testimonios en página empresas
```

3. **Trust Signals:**
```
- Iconos de medios de pago
- "Envío seguro con OCA"
- "Distribuidores oficiales"
- Sellos de seguridad (si los tienen)
```

4. **FOMO (Fear of Missing Out):**
```
- "Envío gratis en compras +$50K" (banner sticky)
- "Oferta válida hasta agotar stock"
```

5. **Abandono de Carrito:**
```
- LocalStorage persiste el carrito
- Pop-up al intentar salir: "¿Seguro que querés irte? Tus productos te esperan"
```

6. **Mobile First:**
```
- Botón WhatsApp flotante siempre visible
- Carrito sticky en mobile
- Filtros en drawer (mobile)
- One-tap para agregar al carrito
```

---

## 📦 GESTIÓN DE PRODUCTOS (284 perfumes)

### **Estructura JSON de Productos:**

```javascript
// products-database.json
{
  "products": [
    {
      "id": "001",
      "sku": "EI-GG-100",
      "name": "Good Girl",
      "brand": "Extracto Importado",
      "equivalence": "Carolina Herrera Good Girl",
      "gender": "femenino",
      "category": "perfume",
      "olfactive_family": ["floral", "oriental"],
      "description": "Fragancia seductora y sofisticada...",
      "notes": {
        "top": ["Almendra", "Café"],
        "heart": ["Jazmín Sambac", "Tuberosa"],
        "base": ["Cacao", "Tonka", "Vainilla"]
      },
      "presentations": [
        { "size": "30ml", "price": 12500, "stock": 15 },
        { "size": "50ml", "price": 18900, "stock": 8 },
        { "size": "100ml", "price": 29900, "stock": 3 }
      ],
      "images": [
        "/images/products/good-girl-001.webp",
        "/images/products/good-girl-002.webp",
        "/images/products/good-girl-003.webp"
      ],
      "featured": true,
      "bestseller": true,
      "new": false,
      "slug": "good-girl-carolina-herrera-100ml"
    }
  ]
}
```

### **Script para Obtener Productos de Extracto Importado:**

```javascript
// scraper-products.js (Node.js script)
// Este script deberás ejecutarlo tú para obtener los 284 productos
// Te lo preparo en el código final
```

---

## 📸 IMÁGENES Y MULTIMEDIA

### **Optimización de Imágenes:**

```
FORMATO: WebP (fallback JPG para navegadores viejos)
TAMAÑOS:
- Thumbnail: 300x300px
- Producto: 800x800px
- Hero/Banners: 1920x800px
- Mobile hero: 768x500px

NAMING CONVENTION:
[categoria]-[nombre-producto]-[numero].webp
Ejemplo: perfume-good-girl-001.webp

LAZY LOADING:
<img src="placeholder.jpg" data-src="real-image.webp" loading="lazy" alt="Good Girl perfume">
```

### **Imágenes Necesarias:**

```
HOME:
- 3-4 imágenes hero (lifestyle, modelo con perfume)
- 6 categorías (tiles)
- 12 productos destacados
- Banner B2B
- 6 fotos Instagram

CATÁLOGO:
- 284 productos x 2-4 fotos cada uno = ~800 imágenes

EMPRESAS:
- 4 fotos de servicios
- 2-3 casos de éxito

EXTRAS:
- Logo en varios formatos
- Favicon
- Open Graph images
- Icons
```

---

## 🛠️ STACK TÉCNICO

```
FRONTEND:
├── HTML5 (semántico)
├── CSS3 (Grid + Flexbox)
├── JavaScript vanilla (ES6+)
├── No frameworks (como pediste)
└── 100% responsive

LIBRERÍAS PERMITIDAS (CDN):
├── Swiper.js (carruseles)
├── LazyLoad (imágenes)
├── AOS (animaciones scroll)
└── Choices.js (selects personalizados)

ÍCONOS:
└── Font Awesome 6 (CDN)

FUENTES:
├── Google Fonts (Playfair Display + Poppins)
└── Preload críticas

OPTIMIZACIÓN:
├── Minificación CSS/JS
├── Compresión imágenes
├── Lazy loading
├── Cache browser
└── CDN para assets
```

---

## 📱 WHATSAPP INTEGRATION

### **Botones y Enlaces:**

```html
<!-- Botón flotante (siempre visible) -->
<a href="https://wa.me/5491166967597?text=¡Hola!%20Quisiera%20consultar%20sobre%20los%20productos" 
   class="whatsapp-float"
   target="_blank"
   rel="noopener">
  <i class="fab fa-whatsapp"></i>
  <span>Consultanos</span>
</a>

<!-- Desde carrito -->
<a href="https://wa.me/5491166967597?text=[mensaje-carrito]" 
   class="btn-checkout-whatsapp">
  💬 FINALIZAR COMPRA POR WHATSAPP
</a>

<!-- Desde producto individual -->
<a href="https://wa.me/5491166967597?text=Hola!%20Quiero%20consultar%20por%20[PRODUCTO]%20-%20[TAMAÑO]" 
   class="btn-product-whatsapp">
  COMPRAR POR WHATSAPP
</a>

<!-- Empresas -->
<a href="https://wa.me/5491166967597?text=Hola!%20Quisiera%20una%20cotización%20para%20mi%20empresa">
  SOLICITAR COTIZACIÓN B2B
</a>
```

### **Formato de Mensajes Pre-armados:**

#### Desde Carrito:
```
¡Hola! 👋 Quiero hacer un pedido desde Aromaz:

🛍️ *MI PEDIDO:*
• Good Girl - 100ml x1 - $29.900
• Paco Rabanne - 50ml x2 - $37.800
• Body Splash Coconut x1 - $8.500

💰 *TOTAL: $76.200*

📍 *Mi código postal:* [____]

¿Cuál es el costo de envío? ¿Tienen stock de todo?

¡Gracias!
```

#### Consulta General:
```
¡Hola! 👋 
Quisiera consultar sobre [TEMA]
```

#### Empresas:
```
Hola! 👔

Quisiera una cotización para:
🏢 Empresa: [____]
📦 Servicio: [Amenities/Regalos/Souvenirs]
🔢 Cantidad: [____]
📅 Fecha estimada: [____]

¡Gracias!
```

---

## 🎨 COMPONENTES REUTILIZABLES

### **Card de Producto:**

```html
<div class="product-card" data-product-id="001">
  <div class="product-image-wrapper">
    <img src="[...]" alt="[...]" loading="lazy">
    <span class="badge badge-bestseller">Más vendido</span>
    <button class="btn-favorite" data-id="001">
      <i class="far fa-heart"></i>
    </button>
    <button class="btn-quick-view" data-id="001">
      <i class="fas fa-eye"></i> Vista rápida
    </button>
  </div>
  
  <div class="product-info">
    <span class="product-gender">Femenino</span>
    <h3 class="product-name">Good Girl</h3>
    <p class="product-equivalence">Similar a Carolina Herrera Good Girl</p>
    
    <div class="product-presentations">
      <div class="presentation">
        <span class="size">30ml</span>
        <span class="price">$12.500</span>
        <button class="btn-add-cart" data-size="30ml">+</button>
      </div>
      <div class="presentation">
        <span class="size">50ml</span>
        <span class="price">$18.900</span>
        <button class="btn-add-cart" data-size="50ml">+</button>
      </div>
      <div class="presentation popular">
        <span class="size">100ml</span>
        <span class="price">$29.900</span>
        <button class="btn-add-cart" data-size="100ml">+</button>
      </div>
    </div>
  </div>
</div>
```

---

## 📂 ESTRUCTURA DE CARPETAS

```
aromazperfumshop/
│
├── index.html              ← HOME
├── catalogo.html           ← CATÁLOGO
├── producto.html           ← DETALLE PRODUCTO (dinámico)
├── nosotros.html           ← SOBRE NOSOTROS
├── empresas.html           ← LANDING B2B
├── revende.html            ← REVENDE EXTRACTO
├── faq.html                ← PREGUNTAS FRECUENTES
├── terminos.html           ← TÉRMINOS Y CONDICIONES
├── carrito.html            ← CARRITO
├── favoritos.html          ← FAVORITOS
├── contacto.html           ← CONTACTO
│
├── css/
│   ├── style.css           ← Estilos principales
│   ├── responsive.css      ← Media queries
│   └── components.css      ← Componentes reutilizables
│
├── js/
│   ├── main.js             ← Script principal
│   ├── products.js         ← Gestión de productos
│   ├── cart.js             ← Lógica del carrito
│   ├── filters.js          ← Filtros y búsqueda
│   ├── favorites.js        ← Sistema de favoritos
│   ├── whatsapp.js         ← Generador mensajes WA
│   └── analytics.js        ← Google Analytics events
│
├── data/
│   └── products.json       ← Base de datos de productos (284)
│
├── images/
│   ├── logo/
│   ├── hero/
│   ├── categories/
│   ├── products/           ← 800+ imágenes de productos
│   ├── banners/
│   ├── icons/
│   └── instagram/
│
├── fonts/
│   └── [fonts si son locales]
│
├── sitemap.xml
├── robots.txt
├── .htaccess
├── favicon.ico
└── README.md
```

---

## ⚡ PERFORMANCE

### **Métricas Objetivo (Lighthouse):**

```
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 100
```

### **Optimizaciones:**

```css
/* Critical CSS inline en <head> */
/* Resto de CSS async */
<link rel="preload" href="style.css" as="style">

/* Preload fuentes */
<link rel="preconnect" href="https://fonts.googleapis.com">

/* Defer JavaScript no crítico */
<script src="main.js" defer></script>

/* Lazy load imágenes */
<img loading="lazy" src="...">

/* WebP con fallback */
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```

---

## 🚀 CHECKLIST DE LANZAMIENTO

### **PRE-LANZAMIENTO:**

```
□ Todas las 284 productos cargados con imágenes
□ Precios actualizados
□ Textos revisados (sin errores)
□ Links funcionando (interno/externo)
□ Formularios testeados → WhatsApp
□ Carrito funcional → WhatsApp
□ Responsive en 5+ dispositivos
□ Cross-browser (Chrome, Firefox, Safari, Edge)
□ Google Analytics configurado y testeando
□ Favicon y meta tags en todas las páginas
□ Sitemap.xml generado
□ Robots.txt configurado
□ .htaccess con redirects
□ Compresión GZIP activa
□ Imágenes optimizadas (<200kb c/u)
□ Velocidad de carga <3seg
□ Lighthouse score >90
□ SSL instalado (HTTPS)
```

### **POST-LANZAMIENTO:**

```
□ Google Search Console configurado
□ Google Analytics verificando conversiones
□ Enviar sitemap a Google
□ Testear compra real vía WhatsApp
□ Backup completo del sitio
□ Monitoreo de uptime (Pingdom/UptimeRobot)
□ Configurar email profesional (@aromazperfumshop.com.ar)
□ Instagram Bio link actualizado
□ Pixel de Meta Ads (si aplica)
□ Retargeting (si aplica)
```

---

## 💡 EXTRAS Y MEJORAS FUTURAS

```
FASE 2 (Post-lanzamiento):
- Sistema de reviews real
- Wishlist compartible por link único
- Comparador de productos (lado a lado)
- Quiz "Encontrá tu perfume ideal"
- Chatbot básico FAQ
- Blog de contenido
- Programa de fidelización/puntos
- Cupones de descuento
- Sistema de afiliados

FASE 3 (Escalar):
- Integración con Mercado Pago/Mercado Libre
- Panel de admin propio (gestión stock)
- App móvil PWA
- Sistema de notificaciones (stock, ofertas)
- CRM básico
```

---

## 🎯 RESUMEN FINAL

Este plan contempla:

✅ **284 productos** con imágenes de extractoimportado.com.ar  
✅ **Carrito completo** → WhatsApp con mensaje pre-armado  
✅ **3 landings especializadas:** Empresas, Revendedores, Venta Extracto  
✅ **SEO completo:** Meta tags, Schema, Sitemap, URLs limpias  
✅ **Google Analytics 4:** 10+ eventos customizados  
✅ **CTAs estratégicos:** 50+ puntos de contacto WhatsApp/IG  
✅ **Mobile-first:** Responsive + optimizado para conversión móvil  
✅ **Identidad visual:** Basada en Instagram + estética elegante  
✅ **Secciones legales:** FAQ, Términos, Política envíos  

**Estimación de trabajo:**  
- Setup inicial + estructura: 3-4 días  
- Desarrollo páginas: 5-6 días  
- Integración productos (284): 2-3 días  
- Testing + optimización: 2 días  
- **TOTAL: ~12-15 días** (trabajo full-time)

---

## ❓ PREGUNTAS ANTES DE EMPEZAR

1. **¿Confirmás el dominio?** aromazperfumshop.com.ar o ya tenés otro?
2. **¿Tenés hosting contratado?** Necesitás recomendación?
3. **¿Querés que empiece por alguna página específica?** (Recomiendo: HOME → Producto → Catálogo)
4. **¿Algún color/fuente que NO querés usar?**
5. **¿Necesitás el script para scrapear los 284 productos?** (Te lo preparo)

---

¿Arrancamos con el código? ¿O necesitás ajustar algo del plan primero? 🚀