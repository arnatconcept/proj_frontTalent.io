document.addEventListener('DOMContentLoaded', inicializarAplicacion);

function inicializarAplicacion() {
  cargarCarrito();

  if (document.getElementById('contenedor_productos')) {
    cargarProductos('cafe');
  }

  document.addEventListener('click', manejarClicks);
  inicializarFiltros();
  inicializarCarritoDrawer();
  inicializarFormularioContacto();

  const botonVaciar = document.getElementById('vaciar-carrito');

  if (botonVaciar) {
    botonVaciar.addEventListener('click', vaciarCarrito);
  }

  const botonCheckout = document.getElementById('checkout-btn');

  if (botonCheckout) {
    botonCheckout.addEventListener('click', procederAlPago);
  }
}

function manejarClicks(event) {
  const botonCarrito = event.target.closest('.carrito-toggle');

  if (botonCarrito) {
    abrirCarritoDrawer();
    return;
  }

  const botonCerrarCarrito = event.target.closest('[data-carrito-cerrar]');

  if (botonCerrarCarrito) {
    cerrarCarritoDrawer();
    return;
  }

  const botonAgregar = event.target.closest('.agregar-carrito');

  if (botonAgregar) {
    agregarProducto(botonAgregar);
    return;
  }

  const botonEliminar = event.target.closest('.eliminar-producto');

  if (botonEliminar) {
    eliminarProducto(botonEliminar.dataset.id, botonEliminar.dataset.talla);
    return;
  }

  const botonAumentar = event.target.closest('.aumentar-cantidad');

  if (botonAumentar) {
    cambiarCantidadProducto(botonAumentar.dataset.id, botonAumentar.dataset.talla, 1);
    return;
  }

  const botonDisminuir = event.target.closest('.disminuir-cantidad');

  if (botonDisminuir) {
    cambiarCantidadProducto(botonDisminuir.dataset.id, botonDisminuir.dataset.talla, -1);
  }
}

function inicializarFiltros() {
  const filtros = document.querySelectorAll('.filtro-producto');

  filtros.forEach((filtro) => {
    filtro.addEventListener('click', () => {
      filtros.forEach((item) => item.classList.remove('activo'));
      filtro.classList.add('activo');
      cargarProductos(filtro.dataset.categoria || 'cafe');
    });
  });
}