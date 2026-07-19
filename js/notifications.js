function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (!toast || !toastMessage) {
    alert(message);
    return;
  }

  toastMessage.textContent = message;
  toast.className = 'toast active';

  if (type) {
    toast.classList.add(type);
  }

  setTimeout(() => {
    toast.classList.remove('active', 'success', 'error');
  }, 3000);
}