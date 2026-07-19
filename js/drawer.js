function inicializarCarritoDrawer() {
  const drawer = document.getElementById('carrito-drawer');

  if (!drawer) {
    return;
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      cerrarCarritoDrawer();
    }

    mantenerFocoEnDrawer(event);
  });
}

function abrirCarritoDrawer() {
  const drawer = document.getElementById('carrito-drawer');
  const overlay = document.querySelector('.carrito-overlay');

  if (!drawer) {
    return;
  }

  drawer.hidden = false;
  drawer.setAttribute('aria-hidden', 'false');

  if (overlay) {
    overlay.hidden = false;
  }

  document.body.classList.add('carrito-abierto');
  actualizarBotonesCarrito(true);

  const botonCerrar = drawer.querySelector('.carrito-cerrar');

  if (botonCerrar) {
    botonCerrar.focus();
  }
}

function cerrarCarritoDrawer() {
  const drawer = document.getElementById('carrito-drawer');
  const overlay = document.querySelector('.carrito-overlay');

  if (!drawer) {
    return;
  }

  document.body.classList.remove('carrito-abierto');
  drawer.setAttribute('aria-hidden', 'true');
  actualizarBotonesCarrito(false);

  window.setTimeout(() => {
    if (!document.body.classList.contains('carrito-abierto')) {
      drawer.hidden = true;

      if (overlay) {
        overlay.hidden = true;
      }
    }
  }, 280);
}

function actualizarBotonesCarrito(abierto) {
  document.querySelectorAll('.carrito-toggle').forEach((boton) => {
    boton.setAttribute('aria-expanded', String(abierto));
  });
}

function mantenerFocoEnDrawer(event) {
  const drawer = document.getElementById('carrito-drawer');

  if (!drawer || !document.body.classList.contains('carrito-abierto') || event.key !== 'Tab') {
    return;
  }

  const elementos = drawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])');
  const focables = Array.from(elementos).filter((elemento) => elemento.offsetParent !== null);

  if (focables.length === 0) {
    return;
  }

  const primero = focables[0];
  const ultimo = focables[focables.length - 1];

  if (event.shiftKey && document.activeElement === primero) {
    event.preventDefault();
    ultimo.focus();
  } else if (!event.shiftKey && document.activeElement === ultimo) {
    event.preventDefault();
    primero.focus();
  }
}