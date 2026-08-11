(() => {
  const links = document.querySelectorAll('[data-dialog]');

  links.forEach((link) => {
    const dialog = document.getElementById(link.dataset.dialog);
    if (!dialog || typeof dialog.showModal !== 'function') return;

    link.addEventListener('click', (event) => {
      event.preventDefault();
      dialog.showModal();
    });
  });

  document.querySelectorAll('.demo-dialog').forEach((dialog) => {
    const closeButton = dialog.querySelector('.demo-dialog-close');
    closeButton?.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
})();
