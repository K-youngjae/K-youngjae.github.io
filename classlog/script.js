(() => {
  const dialog = document.getElementById('lightbox');
  const img = dialog?.querySelector('.lightbox-image');
  const title = dialog?.querySelector('.lightbox-title');
  const close = dialog?.querySelector('.lightbox-close');

  document.querySelectorAll('.zoomable').forEach((item) => {
    item.addEventListener('click', () => {
      if (!dialog || !img || !title) return;
      img.src = item.dataset.src || '';
      img.alt = item.dataset.title || '수업로그 화면';
      title.textContent = item.dataset.title || '수업로그 화면';
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  });

  const closeDialog = () => {
    if (!dialog) return;
    dialog.close();
    document.body.style.overflow = '';
  };

  close?.addEventListener('click', closeDialog);
  dialog?.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
  });
  dialog?.addEventListener('close', () => {
    document.body.style.overflow = '';
  });
})();
