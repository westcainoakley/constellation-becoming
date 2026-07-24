'use strict';

document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const toTop = document.querySelector('[data-to-top]');

function closeMenu() {
  if (!navToggle || !navMenu) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navMenu.classList.remove('is-open');
  document.body.style.overflow = '';
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navMenu.classList.toggle('is-open', !open);
    document.body.style.overflow = open ? '' : 'hidden';
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 840) closeMenu();
  });
}

function setActiveNavigation() {
  const page = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
setActiveNavigation();

function handleScroll() {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 16);
  toTop?.classList.toggle('is-visible', y > 650);
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

toTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
});

const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion.matches || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas || reducedMotion.matches) return;
  const context = canvas.getContext('2d');
  if (!context) return;

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let stars = [];
  let frameId = 0;

  function createStars() {
    const count = Math.min(115, Math.max(48, Math.round((width * height) / 16000)));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.25 + 0.25,
      alpha: Math.random() * 0.45 + 0.18,
      drift: Math.random() * 0.035 + 0.008
    }));
  }

  function resize() {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    createStars();
  }

  function draw() {
    context.clearRect(0, 0, width, height);

    stars.forEach((star) => {
      star.y += star.drift;
      if (star.y > height + 3) {
        star.y = -3;
        star.x = Math.random() * width;
      }
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(240, 234, 220, ${star.alpha})`;
      context.fill();
    });

    for (let i = 0; i < stars.length; i += 1) {
      for (let j = i + 1; j < stars.length; j += 1) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance < 105) {
          const alpha = (1 - distance / 105) * 0.055;
          context.beginPath();
          context.moveTo(stars[i].x, stars[i].y);
          context.lineTo(stars[j].x, stars[j].y);
          context.strokeStyle = `rgba(208, 183, 123, ${alpha})`;
          context.lineWidth = 0.65;
          context.stroke();
        }
      }
    }

    frameId = window.requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize, { passive: true });

  reducedMotion.addEventListener?.('change', (event) => {
    if (event.matches) {
      window.cancelAnimationFrame(frameId);
      context.clearRect(0, 0, width, height);
    } else {
      resize();
      draw();
    }
  });
}

initStarfield();
