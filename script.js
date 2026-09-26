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
const alignmentFix = $('#alignment-fix');
const queueButton = $('#queue-button');
const matchOverlay = $('#match-overlay');
const matchCount = $('#match-count');
const matchCaption = $('#match-caption');
const volumeKnob = $('#volume-knob');
const volumeValue = $('#volume-value');
const dbButton = $('#db-button');
const dbNumber = $('#db-number');
const dbCaption = $('#db-caption');
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
  showToast('unsupported operation: leaving home');
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

let volume = 7;
volumeKnob?.style.setProperty('--knob', '-20deg');
volumeKnob?.addEventListener('click', () => {
  volume = volume >= 11 ? 0 : volume + 1;
  volumeValue.textContent = String(volume);
  const deg = -130 + (volume / 11) * 260;
  volumeKnob.style.setProperty('--knob', `${deg}deg`);

  if (volume === 11) showToast('correct.');
  if (volume === 0) showToast('tragic.');
});

let dbStep = 0;
dbButton?.addEventListener('click', () => {
  dbStep += 1;

  if (dbStep === 1) {
    dbNumber.textContent = '12';
    dbCaption.textContent = 'ah. twelve.';
    dbButton.textContent = 'and ownership? →';
  } else if (dbStep === 2) {
    dbCaption.textContent = 'owned: 0';
    dbButton.textContent = 'emotionally? →';
  } else {
    dbCaption.textContent = 'emotionally owned: 1';
    dbButton.textContent = 'close enough';
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
