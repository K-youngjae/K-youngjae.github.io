
// V15.1: never restore transient animation state after refresh/history restoration.
function resetTransientActors() {
  [
    ['#band-stage', 'active'],
    ['#car-stage', 'active'],
    ['#robot-stage', 'active'],
    ['#robot-stage', 'bow'],
    ['#match-overlay', 'active']
  ].forEach(([selector, cls]) => document.querySelector(selector)?.classList.remove(cls));

  document.querySelector('#band-stage')?.setAttribute('aria-hidden', 'true');
  document.querySelector('#car-stage')?.setAttribute('aria-hidden', 'true');
  document.querySelector('#robot-stage')?.setAttribute('aria-hidden', 'true');
  document.querySelector('#match-overlay')?.setAttribute('aria-hidden', 'true');
}

resetTransientActors();
window.addEventListener('pageshow', resetTransientActors);

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

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const seoulTime = $('#seoul-time');
const rabbitHole = $('#rabbit-hole');
const rabbitNext = $('#rabbit-next');
const seoulInterest = $('#seoul-interest');
const seoulDialog = $('#seoul-dialog');
const flightButton = $('#flight-button');
const outsideButton = $('#outside-button');
const compareButton = $('#compare-button');
const compareDialog = $('#compare-dialog');
const deskButton = $('#desk-button');
const deskDrawer = $('#desk-drawer');
const drawerClose = $('#drawer-close');
const alignmentFix = $('#alignment-fix');
const queueButton = $('#queue-button');
const matchOverlay = $('#match-overlay');
const matchCount = $('#match-count');
const matchCaption = $('#match-caption');
const bandButton = $('#band-button');
const bandStage = $('#band-stage');
const dbButton = $('#db-button');
const dbNumber = $('#db-number');
const dbCaption = $('#db-caption');
const carStage = $('#car-stage');
const figureButton = $('#figure-button');
const figureCaption = $('#figure-caption');
const robotStage = $('#robot-stage');
const efficiencyButton = $('#efficiency-button');
const homeButton = $('#home-button');
const chaosButton = $('#chaos-button');
const systemMessage = $('#system-message');
const classlogScreen = $('#classlog-screen');
const viewButtons = $$('.view-button');
const pokeButton = $('#poke-button');
const seoulCard = $('#seoul-card');
const koreanToggle = $('#korean-toggle');
const commandButton = $('#command-button');
const commandDialog = $('#command-dialog');
const commandButtons = $$('[data-command]');
const cursorDot = $('#cursor-dot');
const toast = $('#toast');

function showToast(message, delay = 1800) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), delay);
}

function updateSeoulClock() {
  const formatted = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date());
  if (seoulTime) seoulTime.textContent = formatted;
}
updateSeoulClock();
setInterval(updateSeoulClock, 30000);

const rabbitSteps = [
  'making this page less embarrassing',
  'why this button feels 2px too low',
  '17 tabs opened',
  '3 PDFs downloaded',
  'original question temporarily forgotten',
  'comparison table created',
  'one implementation detail now occupies the entire evening',
  'research complete. probably.'
];
let rabbitIndex = 0;
rabbitNext?.addEventListener('click', () => {
  rabbitIndex = (rabbitIndex + 1) % rabbitSteps.length;
  rabbitHole.textContent = rabbitSteps[rabbitIndex];
});

seoulInterest?.addEventListener('click', () => seoulDialog?.showModal());

flightButton?.addEventListener('click', () => {
  seoulDialog?.close();
  showToast('well, this became a trip.');
  setTimeout(() => {
    window.open('https://www.google.com/travel/flights?hl=en&q=flights%20to%20Seoul', '_blank', 'noopener,noreferrer');
  }, 500);
});

outsideButton?.addEventListener('click', () => {
  const dx = Math.random() > .5 ? 52 : -52;
  outsideButton.animate(
    [{ transform: 'translateX(0)' }, { transform: `translateX(${dx}px)` }, { transform: 'translateX(0)' }],
    { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' }
  );
  showToast('unsupported operation: leaving home');
});

compareButton?.addEventListener('click', () => compareDialog?.showModal());

deskButton?.addEventListener('click', () => {
  deskDrawer?.classList.add('open');
  deskDrawer?.setAttribute('aria-hidden', 'false');
});
drawerClose?.addEventListener('click', () => {
  deskDrawer?.classList.remove('open');
  deskDrawer?.setAttribute('aria-hidden', 'true');
});

$$('[data-desk]').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.dataset.desk;
    if (item === 'figure') summonRobots();
    if (item === 'speaker') summonBand();
    if (item === 'latte') showToast('latte. no further notes.');
    if (item === 'tabs') showToast('14 was an optimistic estimate.');
  });
});

alignmentFix?.addEventListener('click', () => {
  const alreadyFixed = alignmentFix.classList.contains('fixed');
  alignmentFix.classList.toggle('fixed');
  showToast(alreadyFixed ? 'why would you undo that?' : 'better.');
});

let queueRunning = false;
queueButton?.addEventListener('click', () => {
  if (queueRunning) return;
  queueRunning = true;
  matchOverlay.classList.add('active');
  matchOverlay.setAttribute('aria-hidden', 'false');
  matchCount.textContent = '10';
  matchCaption.textContent = 'accept?';

  let n = 10;
  const interval = setInterval(() => {
    n -= 1;
    matchCount.textContent = String(n);

    if (n <= 7) {
      clearInterval(interval);
      matchCaption.textContent = 'never mind. finish the website.';
      setTimeout(() => {
        matchOverlay.classList.remove('active');
        matchOverlay.setAttribute('aria-hidden', 'true');
        queueRunning = false;
      }, 1200);
    }
  }, 420);
});

let bandBusy = false;
function summonBand() {
  if (bandBusy) {
    showToast('encore denied.');
    return;
  }
  bandBusy = true;
  bandStage?.classList.remove('active');
  void bandStage?.offsetWidth;
  bandStage?.classList.add('active');
  bandStage?.setAttribute('aria-hidden', 'false');
  setTimeout(() => showToast('this got louder than expected.'), 1400);
  setTimeout(() => {
    bandStage?.classList.remove('active');
    bandStage?.setAttribute('aria-hidden', 'true');
    bandBusy = false;
  }, 5800);
}
bandButton?.addEventListener('click', summonBand);

let carBusy = false;
function driveCar() {
  if (carBusy) return;
  carBusy = true;
  carStage?.classList.remove('active');
  void carStage?.offsetWidth;
  carStage?.classList.add('active');
  carStage?.setAttribute('aria-hidden', 'false');
  setTimeout(() => {
    carStage?.classList.remove('active');
    carStage?.setAttribute('aria-hidden', 'true');
    carBusy = false;
  }, 3300);
}

let dbStep = 0;
dbButton?.addEventListener('click', () => {
  dbStep += 1;

  if (dbStep === 1) {
    dbNumber.textContent = '12';
    dbCaption.textContent = 'ah. twelve.';
    dbButton.textContent = 'and ownership? →';
    driveCar();
  } else if (dbStep === 2) {
    dbCaption.textContent = 'owned: 0';
    dbButton.textContent = 'emotionally? →';
  } else {
    dbCaption.textContent = 'emotionally owned: 1';
    dbButton.textContent = 'close enough';
    driveCar();
  }
});

let robotsBusy = false;
function summonRobots() {
  if (robotsBusy) {
    showToast('they already said hi.');
    return;
  }

  robotsBusy = true;
  robotStage.classList.add('active');

  setTimeout(() => {
    robotStage.classList.add('bow');
    showToast('hello.');
  }, 3900);

  setTimeout(() => {
    robotStage.classList.remove('active', 'bow');
    robotsBusy = false;
  }, 5600);
}

figureButton?.addEventListener('click', () => {
  figureCaption.textContent = 'summoning...';
  summonRobots();
  setTimeout(() => {
    figureCaption.textContent = 'they mostly mind their own business';
  }, 5700);
});

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
    ? '37% less website'
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
  rabbitIndex = (rabbitIndex + 1) % rabbitSteps.length;
  rabbitHole.textContent = rabbitSteps[rabbitIndex];

  seoulCard?.animate(
    [
      { transform: 'rotate(0deg) translateY(0)' },
      { transform: 'rotate(-1.2deg) translateY(-4px)' },
      { transform: 'rotate(.7deg) translateY(1px)' },
      { transform: 'rotate(0deg) translateY(0)' }
    ],
    { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' }
  );
});

commandButton?.addEventListener('click', () => commandDialog?.showModal());

function runCommand(command) {
  if (command === 'robots') summonRobots();
  if (command === 'band') summonBand();
  if (command === 'car') driveCar();
  if (command === 'home') homeButton?.click();
  if (command === 'efficiency') efficiencyButton?.click();
  if (command === 'chaos') chaosButton?.click();
}

commandButtons.forEach((button) => {
  button.addEventListener('click', () => {
    runCommand(button.dataset.command);
    commandDialog?.close();
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

  if (key === 'r') runCommand('robots');
  if (key === 'b') runCommand('band');
  if (key === 'a') runCommand('car');
  if (key === 'h') runCommand('home');
  if (key === 'e') runCommand('efficiency');
  if (key === 'c') runCommand('chaos');
});

if (window.matchMedia('(pointer:fine)').matches && cursorDot) {
  document.body.classList.add('pointer-active');

  document.addEventListener('mousemove', (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
  });

  $$('a, button, .personal-card').forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('pointer-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('pointer-hover'));
  });
}
