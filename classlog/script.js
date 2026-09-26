(() => {
  const dialog = document.getElementById('lightbox');
  if (!dialog) return;

  const image = dialog.querySelector('.lightbox-image');
  const title = dialog.querySelector('.lightbox-title');
  const close = dialog.querySelector('.lightbox-close');

  document.querySelectorAll('[data-zoom]').forEach((frame) => {
    frame.addEventListener('click', () => {
      image.src = frame.dataset.zoom;
      image.alt = frame.dataset.title || '수업로그 화면';
      title.textContent = frame.dataset.title || '수업로그 화면';
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    });
  });

  const closeDialog = () => {
    dialog.close();
    document.documentElement.style.overflow = '';
  };

  close.addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
  });
})();
