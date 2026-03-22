const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const slideCounter = document.getElementById('slide-counter');
const progressFill = document.getElementById('progress-fill');
const contrastToggle = document.getElementById('contrast-toggle');

let current = 0;

function renderSlide(index) {
  current = Math.min(Math.max(index, 0), slides.length - 1);

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === current);
  });

  slideCounter.textContent = `${current + 1} / ${slides.length}`;
  progressFill.style.width = `${((current + 1) / slides.length) * 100}%`;

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;
}

prevBtn.addEventListener('click', () => renderSlide(current - 1));
nextBtn.addEventListener('click', () => renderSlide(current + 1));

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown') {
    renderSlide(current + 1);
  }

  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    renderSlide(current - 1);
  }
});

// Timeline tabs
const timelineButtons = Array.from(document.querySelectorAll('.timeline-btn'));
const eraPanels = Array.from(document.querySelectorAll('.era-panel'));

timelineButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.era;

    timelineButtons.forEach((b) => b.setAttribute('aria-selected', 'false'));
    button.setAttribute('aria-selected', 'true');

    eraPanels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === target);
    });
  });
});

// Poll interaction
const pollForm = document.getElementById('checkpoint-form');
const pollResult = document.getElementById('poll-result');

pollForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const selected = new FormData(pollForm).get('concept');

  if (!selected) {
    pollResult.textContent = 'Please choose one concept to continue.';
    return;
  }

  const messages = {
    identity: 'Strong first step. Identity and conditional access reduce risk before data reaches unmanaged contexts.',
    containerization: 'Excellent choice. Containerization enforces clear boundaries between personal and corporate data planes.',
    policy: 'Great governance lens. Transparency and consent are what make BYOD security sustainable over time.',
    response: 'Important perspective. Rapid, selective incident response prevents escalation without overreaching on personal ownership.'
  };

  pollResult.textContent = messages[selected];
});

contrastToggle.addEventListener('click', () => {
  const isEnabled = document.body.classList.toggle('high-contrast');
  contrastToggle.setAttribute('aria-pressed', String(isEnabled));
  contrastToggle.textContent = isEnabled ? 'Disable High Contrast' : 'Enable High Contrast';
});

renderSlide(0);
