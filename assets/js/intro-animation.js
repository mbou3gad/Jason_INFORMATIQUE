/**
 * JASON_INFORMATIQUE - 3D High-Tech Intro Animation Engine
 * Displays 3-second futuristic intro animation with 3D letters, floating matrix particles, light sweep & slogan.
 * Persists in sessionStorage to run once per session.
 */

document.addEventListener('DOMContentLoaded', () => {
  const introOverlay = document.getElementById('intro-overlay');
  
  if (!introOverlay) return;

  // Check if intro has already been displayed during this session
  const hasSeenIntro = sessionStorage.getItem('jason_intro_played');

  if (hasSeenIntro) {
    introOverlay.style.display = 'none';
    introOverlay.classList.add('hidden');
    return;
  }

  // Initialize Canvas Particles in Intro Overlay
  initIntroCanvas();

  // Schedule graceful exit after 3.2 seconds
  setTimeout(() => {
    introOverlay.classList.add('hidden');
    sessionStorage.setItem('jason_intro_played', 'true');

    // Trigger AOS animations once intro fades out
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, 3200);
});

/**
 * Renders a high-tech particle matrix background on the intro canvas.
 */
function initIntroCanvas() {
  const canvas = document.getElementById('intro-particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const numParticles = Math.min(Math.floor(width / 15), 60);

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      alpha: Math.random() * 0.7 + 0.3
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#00F0FF';
    ctx.strokeStyle = 'rgba(10, 102, 194, 0.2)';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Connect nearby particles with glowing lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    if (!document.getElementById('intro-overlay').classList.contains('hidden')) {
      requestAnimationFrame(animate);
    }
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}
