(() => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const dialog = document.getElementById('lightbox');
  const title = dialog?.querySelector('.lightbox-title');
  const image = dialog?.querySelector('.lightbox-image');
  const close = dialog?.querySelector('.lightbox-close');

  document.querySelectorAll('.screenshot-link').forEach((node) => {
    const openDialog = (event) => {
      const clickable = event.currentTarget;
      const src = clickable.getAttribute('data-image');
      const caption = clickable.getAttribute('data-title') || '화면 미리보기';
      if (!dialog || !src || !image || !title) return;
      image.src = src;
      image.alt = caption;
      title.textContent = caption;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    };

    if (node.tagName === 'BUTTON') {
      node.addEventListener('click', openDialog);
    } else {
      node.addEventListener('click', openDialog);
    }
  });

  const closeDialog = () => {
    if (!dialog) return;
    dialog.close();
    document.body.style.overflow = '';
  };

  close?.addEventListener('click', closeDialog);

  dialog?.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const inside = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
    if (!inside) closeDialog();
  });

  dialog?.addEventListener('close', () => {
    document.body.style.overflow = '';
  });
})();
