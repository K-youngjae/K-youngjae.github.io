const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const stage = document.querySelector('[data-tilt]');

if (stage && window.matchMedia('(pointer:fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  stage.addEventListener('mousemove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.setProperty('--mx', `${x * 10}px`);
    stage.style.setProperty('--my', `${y * 10}px`);

    const shot = stage.querySelector('.product-shot');
    if (shot) {
      shot.style.translate = `${x * 7}px ${y * 5}px`;
    }
  });

  stage.addEventListener('mouseleave', () => {
    const shot = stage.querySelector('.product-shot');
    if (shot) shot.style.translate = '0 0';
  });
}
