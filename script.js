const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

const efficiencyButton = document.querySelector('#efficiency-button');
const chaosButton = document.querySelector('#chaos-button');
const controlNote = document.querySelector('#control-note');
const garageButton = document.querySelector('#garage-button');
const garageDialog = document.querySelector('#garage-dialog');
const timeReadout = document.querySelector('#local-time');

efficiencyButton?.addEventListener('click', () => {
  document.body.classList.toggle('efficiency');
  const on = document.body.classList.contains('efficiency');
  controlNote.textContent = on
    ? 'unnecessary words successfully removed'
    : 'everything operating within normal parameters';
});

chaosButton?.addEventListener('click', () => {
  document.body.classList.toggle('chaos');
  const on = document.body.classList.contains('chaos');
  chaosButton.textContent = on ? 'OKAY, UNPRESS' : 'DO NOT PRESS';
  controlNote.textContent = on
    ? 'minor aesthetic instability detected'
    : (document.body.classList.contains('efficiency')
        ? 'unnecessary words successfully removed'
        : 'everything operating within normal parameters');
});

garageButton?.addEventListener('click', () => {
  garageDialog?.showModal();
});

function updateClock() {
  if (!timeReadout) return;
  const now = new Date();
  timeReadout.textContent = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);
}

updateClock();
setInterval(updateClock, 30000);
