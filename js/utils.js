function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(Number(valor) || 0);
}

function rutaProductos() {
  return location.pathname.includes('/paginas/')
    ? '../index.html#contenedor_producto'
    : '#contenedor_producto';
}

function imagenSinImagen() {
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect width="100%" height="100%" fill="#dddddd"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#555555" font-size="18">Sin imagen</text>
    </svg>
  `);
}

function mismoProducto(producto, id, talla) {
  return (
    String(producto.id) === String(id) &&
    String(producto.talla || PRESENTACION_UNICA) === String(talla || PRESENTACION_UNICA)
  );
}