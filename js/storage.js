function obtenerCarrito() {
  try {
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

    if (!carritoGuardado) {
      return [];
    }

    const carrito = JSON.parse(carritoGuardado);
    return Array.isArray(carrito) ? carrito : [];
  } catch (error) {
    console.error('El carrito guardado esta danado:', error);
    localStorage.removeItem(CLAVE_CARRITO);
    return [];
  }
}

function guardarCarrito(carrito) {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  } catch (error) {
    console.error('No se pudo guardar el carrito:', error);
    showToast('No se pudo guardar el carrito en el navegador.', 'error');
  }
}