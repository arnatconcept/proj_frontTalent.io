function inicializarFormularioContacto() {
  const formulario = document.getElementById('contact-form');

  if (!formulario) {
    return;
  }

  formulario.addEventListener('submit', (event) => {
    const nombre = formulario.elements.nombre;
    const email = formulario.elements.email;
    const mensaje = formulario.elements.mensaje;

    if (!nombre.value.trim() || nombre.value.trim().length < 2) {
      event.preventDefault();
      mostrarErrorCampo(nombre, 'Ingresa un nombre valido de al menos 2 caracteres.');
      return;
    }

    if (!validarEmail(email.value)) {
      event.preventDefault();
      mostrarErrorCampo(email, 'Ingresa un correo electronico valido.');
      return;
    }

    if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
      event.preventDefault();
      mostrarErrorCampo(mensaje, 'El mensaje debe tener al menos 10 caracteres.');
    }
  });
}

function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(valor).trim());
}

function mostrarErrorCampo(campo, mensaje) {
  campo.focus();
  campo.setAttribute('aria-invalid', 'true');
  showToast(mensaje, 'error');

  campo.addEventListener('input', () => {
    campo.removeAttribute('aria-invalid');
  }, { once: true });
}