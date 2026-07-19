async function cargarProductos(categoria = 'cafe') {
  const contenedor = document.getElementById('contenedor_productos');

  if (!contenedor) {
    return;
  }

  mostrarEstadoCarga(contenedor);

  try {
    const url = `${API_BASE_URL}/category/${encodeURIComponent(categoria)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('La API no devolvio una lista valida de productos.');
    }

    mostrarProductos(data, contenedor);
  } catch (error) {
    console.error('Error al cargar los productos:', error);
    contenedor.innerHTML = `
      <div class="mensaje-api mensaje-error">
        <p>No fue posible cargar los productos.</p>
        <button type="button" id="reintentar-productos">Reintentar</button>
      </div>
    `;

    const botonReintentar = document.getElementById('reintentar-productos');

    if (botonReintentar) {
      botonReintentar.addEventListener('click', () => cargarProductos(categoria));
    }
  }
}