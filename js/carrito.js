function agregarProducto(boton) {
  const id = boton.dataset.id;
  const nombre = boton.dataset.nombre;
  const precio = Number(boton.dataset.precio);
  const talla = boton.dataset.talla || PRESENTACION_UNICA;

  if (!id || !nombre || !Number.isFinite(precio)) {
    showToast('No se pudo agregar este producto.', 'error');
    return;
  }

  const producto = {
    id: String(id),
    nombre,
    precio,
    talla,
    imagen: boton.dataset.imagen || '',
    cantidad: 1
  };

  const carrito = obtenerCarrito();
  const index = carrito.findIndex((item) => mismoProducto(item, producto.id, producto.talla));

  if (index !== -1) {
    carrito[index].cantidad = Number(carrito[index].cantidad || 0) + 1;
  } else {
    carrito.push(producto);
  }

  guardarCarrito(carrito);
  cargarCarrito();

  boton.textContent = 'Agregado OK';
  boton.disabled = true;

  window.setTimeout(() => {
    boton.textContent = 'Anadir al carrito';
    boton.disabled = false;
  }, 700);
}

function cargarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  const contadorCarrito = document.getElementById('contador-carrito');
  const carrito = obtenerCarrito();
  const cantidadTotal = contarProductosCarrito(carrito);

  actualizarIndicadorCarrito(cantidadTotal);

  if (!listaCarrito || !totalCarrito || !contadorCarrito) {
    return;
  }

  listaCarrito.innerHTML = '';

  if (carrito.length === 0) {
    const mensaje = document.createElement('li');
    mensaje.className = 'carrito-vacio';
    mensaje.innerHTML = `
      <p>El carrito esta vacio.</p>
      <a href="${rutaProductos()}">Ver productos</a>
    `;
    listaCarrito.appendChild(mensaje);
    totalCarrito.textContent = formatearPrecio(0);
    contadorCarrito.textContent = '0 unidades';
    return;
  }

  let total = 0;
  let cantidadRenderizada = 0;

  carrito.forEach((producto) => {
    const cantidad = Math.max(1, Number(producto.cantidad || 1));
    const precio = Number(producto.precio || 0);
    const subtotal = precio * cantidad;
    const talla = producto.talla || PRESENTACION_UNICA;

    total += subtotal;
    cantidadRenderizada += cantidad;

    const li = document.createElement('li');
    li.className = 'carrito-item';
    li.innerHTML = `
      <div class="carrito-imagen-contenedor">
        <img class="carrito-imagen" src="${producto.imagen || imagenSinImagen()}" alt="${producto.nombre}" loading="lazy">
      </div>
      <div class="carrito-informacion">
        <h3 class="carrito-producto-nombre">${producto.nombre}</h3>
        <p class="carrito-producto-precio">Precio unitario: <strong>${formatearPrecio(precio)}</strong></p>
        <p class="carrito-producto-presentacion">Presentacion: ${talla}</p>
        <div class="carrito-controles-cantidad">
          <button type="button" class="disminuir-cantidad" data-id="${producto.id}" data-talla="${talla}" aria-label="Disminuir cantidad de ${producto.nombre}">-</button>
          <input type="number" class="input-cantidad" min="1" max="99" value="${cantidad}" readonly aria-label="Cantidad de ${producto.nombre}">
          <button type="button" class="aumentar-cantidad" data-id="${producto.id}" data-talla="${talla}" aria-label="Aumentar cantidad de ${producto.nombre}">+</button>
        </div>
      </div>
      <div class="carrito-resumen-producto">
        <p>Subtotal</p>
        <strong class="carrito-subtotal">${formatearPrecio(subtotal)}</strong>
        <button type="button" class="eliminar-producto" data-id="${producto.id}" data-talla="${talla}" aria-label="Eliminar ${producto.nombre} del carrito">Eliminar</button>
      </div>
    `;

    const imagen = li.querySelector('.carrito-imagen');
    imagen.addEventListener('error', () => {
      imagen.src = imagenSinImagen();
    });

    listaCarrito.appendChild(li);
  });

  totalCarrito.textContent = formatearPrecio(total);
  contadorCarrito.textContent = cantidadRenderizada === 1 ? '1 unidad' : `${cantidadRenderizada} unidades`;
}

function actualizarIndicadorCarrito(cantidad) {
  document.querySelectorAll('.contador-carrito-icono').forEach((indicador) => {
    indicador.textContent = String(cantidad);
    indicador.hidden = cantidad === 0;
  });
}

function contarProductosCarrito(carrito) {
  return carrito.reduce((total, producto) => total + Number(producto.cantidad || 0), 0);
}

function cambiarCantidadProducto(id, talla, cambio) {
  const carrito = obtenerCarrito();
  const index = carrito.findIndex((producto) => mismoProducto(producto, id, talla));

  if (index === -1) {
    return;
  }

  const nuevaCantidad = Number(carrito[index].cantidad || 1) + cambio;

  if (nuevaCantidad > 0) {
    carrito[index].cantidad = Math.min(nuevaCantidad, 99);
  } else {
    carrito.splice(index, 1);
  }

  guardarCarrito(carrito);
  cargarCarrito();
}

function eliminarProducto(id, talla) {
  const carrito = obtenerCarrito().filter((producto) => !mismoProducto(producto, id, talla));
  guardarCarrito(carrito);
  cargarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem(CLAVE_CARRITO);
  cargarCarrito();
}

function procederAlPago() {
  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    showToast('El carrito esta vacio. Agrega productos antes de proceder al pago.', 'error');
    return;
  }

  const cantidadTotal = contarProductosCarrito(carrito);
  const total = carrito.reduce((acumulado, producto) => {
    return acumulado + Number(producto.precio || 0) * Number(producto.cantidad || 1);
  }, 0);

  showToast(`Resumen de compra:\n\nProductos: ${cantidadTotal}\nTotal: ${formatearPrecio(total)}\n\nConfirmar compra.`, 'success');
}