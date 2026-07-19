function normalizarProducto(item) {
  const id = item.id ?? item._id ?? item.productId;
  const nombre = item.name ?? item.title ?? item.nombre;
  const precio = Number(item.price ?? item.precio);
  const imagen = item.image ?? item.img ?? item.imagen ?? '';
  const categoria = item.category ?? item.categoria ?? '';

  if (id === undefined || id === null || !nombre || !Number.isFinite(precio)) {
    return null;
  }

  return {
    id: String(id),
    nombre: String(nombre),
    precio,
    imagen: String(imagen),
    categoria: String(categoria),
    talla: PRESENTACION_UNICA
  };
}

function crearTarjetaProducto(producto) {
  const article = document.createElement('article');
  article.className = 'card producto-card';

  if (producto.imagen) {
    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.loading = 'lazy';
    imagen.addEventListener('error', () => imagen.remove());
    article.appendChild(imagen);
  }

  const titulo = document.createElement('h3');
  titulo.textContent = producto.nombre;
  article.appendChild(titulo);

  const categoria = document.createElement('p');
  categoria.className = 'producto-categoria';
  categoria.textContent = `Categoria: ${producto.categoria || 'Sin categoria'}`;
  article.appendChild(categoria);

  const precio = document.createElement('p');
  precio.className = 'producto-precio';
  precio.textContent = `Precio: ${formatearPrecio(producto.precio)}`;
  article.appendChild(precio);

  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'agregar-carrito';
  boton.dataset.id = producto.id;
  boton.dataset.nombre = producto.nombre;
  boton.dataset.precio = String(producto.precio);
  boton.dataset.talla = producto.talla;
  boton.dataset.imagen = producto.imagen;
  boton.textContent = 'Anadir al carrito';
  article.appendChild(boton);

  return article;
}

function mostrarEstadoCarga(contenedor) {
  contenedor.innerHTML = '<div class="mensaje-api"><p>Cargando productos...</p></div>';
}

function mostrarProductos(productos, contenedor) {
  contenedor.innerHTML = '';

  if (productos.length === 0) {
    contenedor.innerHTML = '<div class="mensaje-api"><p>No se encontraron productos en esta categoria.</p></div>';
    return;
  }

  const fragmento = document.createDocumentFragment();

  productos.forEach((item) => {
    const producto = normalizarProducto(item);

    if (!producto) {
      console.warn('Producto invalido omitido:', item);
      return;
    }

    fragmento.appendChild(crearTarjetaProducto(producto));
  });

  contenedor.appendChild(fragmento);

  if (!contenedor.children.length) {
    contenedor.innerHTML = '<div class="mensaje-api mensaje-error"><p>La API no devolvio productos validos.</p></div>';
  }
}