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
const pokeButton = document.querySelector('#poke-button');
const seoulCard = document.querySelector('#seoul-card');
const koreanToggle = document.querySelector('#korean-toggle');
const commandButton = document.querySelector('#command-button');
const commandDialog = document.querySelector('#command-dialog');
const commandButtons = document.querySelectorAll('[data-command]');
const cursorDot = document.querySelector('#cursor-dot');

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
  const formatted = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);
  if (seoulTime) seoulTime.textContent = formatted;
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
  systemMessage.textContent = on ? 'minor aesthetic instability detected' : 'nothing suspicious happening';
});

let koreanMode = false;
koreanToggle?.addEventListener('click', () => {
  koreanMode = !koreanMode;
  seoulCard?.querySelectorAll('dd[data-en]').forEach((el) => {
    el.textContent = koreanMode ? el.dataset.ko : el.dataset.en;
  });
});

pokeButton?.addEventListener('click', () => {
  randomThought();
  if (seoulCard) {
    seoulCard.animate(
      [
        { transform: 'rotate(0deg) translateY(0)' },
        { transform: 'rotate(-1.2deg) translateY(-4px)' },
        { transform: 'rotate(.7deg) translateY(1px)' },
        { transform: 'rotate(0deg) translateY(0)' }
      ],
      { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' }
    );
  }
});

commandButton?.addEventListener('click', () => commandDialog?.showModal());

function runCommand(command) {
  if (command === 'home') homeButton?.click();
  if (command === 'efficiency') efficiencyButton?.click();
  if (command === 'garage') garageDialog?.showModal();
  if (command === 'chaos') chaosButton?.click();
}

commandButtons.forEach((button) => {
  button.addEventListener('click', () => {
    runCommand(button.dataset.command);
    if (button.dataset.command !== 'garage') commandDialog?.close();
  });
});

document.addEventListener('keydown', (event) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
  const key = event.key.toLowerCase();

  if (key === '/' || key === '?') {
    event.preventDefault();
    commandDialog?.showModal();
    return;
  }
  if (key === 'h') runCommand('home');
  if (key === 'e') runCommand('efficiency');
  if (key === 'g') runCommand('garage');
  if (key === 'c') runCommand('chaos');
});

if (window.matchMedia('(pointer:fine)').matches && cursorDot) {
  document.body.classList.add('pointer-active');
  document.addEventListener('mousemove', (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
  });
  document.querySelectorAll('a, button, [data-bob]').forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('pointer-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('pointer-hover'));
  });
}
