const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const toggle = document.querySelector('#motion-toggle');
let paused = reducedMotion.matches;
function setMotion(value) {
  paused = value;
  document.body.classList.toggle('motion-paused', paused);
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.textContent = paused ? 'Enable motion' : 'Pause motion';
  window.dispatchEvent(new CustomEvent('portfolio-motion', { detail: { paused } }));
}
setMotion(paused);
toggle.addEventListener('click', () => setMotion(!paused));
reducedMotion.addEventListener('change', event => setMotion(event.matches));
const cards = [...document.querySelectorAll('.project')];
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== 'All work' && card.dataset.category !== button.dataset.filter;
      card.classList.remove('pending');
      if (!card.hidden) count++;
    });
    document.querySelector('#project-count').textContent = `${count} projects`;
  });
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.remove('pending'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  cards.forEach(card => { if (!paused) card.classList.add('pending'); observer.observe(card); });
}
const progress = document.querySelector('.reading-progress');
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}
addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress);
import('./scene.js').then(({ initScene }) => initScene(paused)).catch(() => {
  document.querySelector('#scene-hint').textContent = 'CONNECTED POSSIBILITIES';
});
