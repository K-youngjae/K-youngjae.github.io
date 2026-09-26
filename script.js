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

const seoulTime = document.querySelector('#seoul-time');
const seoulPeriod = document.querySelector('#seoul-period');
const rabbitHole = document.querySelector('#rabbit-hole');
const anotherThought = document.querySelector('#another-thought');
const garageButton = document.querySelector('#garage-button');
const garageDialog = document.querySelector('#garage-dialog');
const efficiencyButton = document.querySelector('#efficiency-button');
const homeButton = document.querySelector('#home-button');
const chaosButton = document.querySelector('#chaos-button');
const systemMessage = document.querySelector('#system-message');
const classlogScreen = document.querySelector('#classlog-screen');
const viewButtons = document.querySelectorAll('.view-button');

const thoughts = [
  'making this page less embarrassing',
  'why this button feels 2px too low',
  'something that should have taken ten minutes',
  'whether this could be automated',
  'a comparison nobody asked for',
  'one very specific implementation detail'
];

function randomThought() {
  if (!rabbitHole) return;
  const current = rabbitHole.textContent;
  const pool = thoughts.filter((item) => item !== current);
  rabbitHole.textContent = pool[Math.floor(Math.random() * pool.length)];
}

anotherThought?.addEventListener('click', randomThought);

function updateSeoulClock() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);

  const hour = Number(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    hour12: false
  }).format(now));

  if (seoulTime) seoulTime.textContent = parts;
  if (seoulPeriod) {
    seoulPeriod.textContent =
      hour >= 19 || hour < 5 ? 'SEOUL / AFTER DARK' :
      hour < 12 ? 'SEOUL / MORNING' :
      hour < 18 ? 'SEOUL / DAY' :
      'SEOUL / EVENING';
  }
}

updateSeoulClock();
setInterval(updateSeoulClock, 30000);

garageButton?.addEventListener('click', () => garageDialog?.showModal());

viewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.dataset.view;
    viewButtons.forEach((b) => b.classList.toggle('is-active', b === button));
    classlogScreen?.classList.toggle('is-detail', mode === 'detail');
    classlogScreen?.classList.toggle('is-full', mode === 'full');
  });
});

efficiencyButton?.addEventListener('click', () => {
  document.body.classList.toggle('efficiency');
  systemMessage.textContent = document.body.classList.contains('efficiency')
    ? 'unnecessary words successfully removed'
    : 'nothing suspicious happening';
});

homeButton?.addEventListener('click', () => {
  document.body.classList.toggle('home-mode');
  systemMessage.textContent = document.body.classList.contains('home-mode')
    ? '밖에 나갈 계획: 없음'
    : 'nothing suspicious happening';
});

chaosButton?.addEventListener('click', () => {
  document.body.classList.toggle('chaos');
  const on = document.body.classList.contains('chaos');
  chaosButton.querySelector('span').textContent = on ? 'OKAY, UNPRESS' : 'DO NOT PRESS';
  systemMessage.textContent = on
    ? 'minor aesthetic instability detected'
    : 'nothing suspicious happening';
});

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'h' && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) {
    homeButton?.click();
  }
});
