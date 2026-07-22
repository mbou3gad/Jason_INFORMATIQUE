/**
 * JASON_INFORMATIQUE - Scroll & Counter Animations Script
 * Integrates AOS, GSAP scroll triggers, and dynamic number counting.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initCounters();
});

/**
 * Initialize AOS (Animate On Scroll) library if available
 */
function initAOS() {
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }
}

/**
 * Animated Number Counters for Statistics Bar
 */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounterAnimation(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function startCounterAnimation(counterEl) {
  const target = parseInt(counterEl.getAttribute('data-target') || '100', 10);
  const suffix = counterEl.getAttribute('data-suffix') || '';
  const duration = 2000; // ms
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;

  const timer = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const currentVal = Math.round(target * easeOutQuad(progress));

    counterEl.textContent = `${currentVal}${suffix}`;

    if (frame >= totalFrames) {
      counterEl.textContent = `${target}${suffix}`;
      clearInterval(timer);
    }
  }, frameRate);
}

function easeOutQuad(t) {
  return t * (2 - t);
}
