/**
 * Harmanpreet Singh — Portfolio
 * Interactive animations, particle system, smooth scroll, reveal effects.
 *
 * @author Harmanpreet Singh (Harman Hanjra)
 * @license MIT
 */

(() => {
  'use strict';

  // ====================== LOADER ======================
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader')?.classList.add('hide');
      document.body.style.overflow = 'auto';
    }, 1200);
  });
  document.body.style.overflow = 'hidden';

  // ====================== CUSTOM CURSOR ======================
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  let mx = 0, my = 0, tx = 0, ty = 0;

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    // Trail with smoothed lerp
    const animateTrail = () => {
      tx += (mx - tx) * 0.15;
      ty += (my - ty) * 0.15;
      if (trail) {
        trail.style.left = tx + 'px';
        trail.style.top = ty + 'px';
      }
      requestAnimationFrame(animateTrail);
    };
    animateTrail();

    // Hover effect on interactive elements
    const hoverTargets = 'a, button, .stack-card, .project-card, .pill-card, .cert-card, .timeline-content, .contact-item, .stat, input, textarea';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ====================== PARTICLE BACKGROUND ======================
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const NUM_PARTICLES = isMobile ? 30 : 60;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 92, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) particles.push(new Particle());
    }
    init();
    window.addEventListener('resize', init);

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ====================== NAV: scroll behavior ======================
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);
    if (y > 300 && y > lastScroll) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = y;
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Active nav link based on scroll
  const sections = document.querySelectorAll('section[id]');
  const linkMap = {};
  document.querySelectorAll('.nav-link').forEach(l => {
    const href = l.getAttribute('href');
    if (href?.startsWith('#')) linkMap[href.slice(1)] = l;
  });

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          linkMap[id]?.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );
  sections.forEach(s => navObserver.observe(s));

  // ====================== REVEAL ON SCROLL ======================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseFloat(el.dataset.delay || '0');
          setTimeout(() => el.classList.add('in'), delay * 1000);
          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ====================== STAT COUNTERS ======================
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter || '0');
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const start = performance.now();
          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

  // ====================== MAGNETIC BUTTONS ======================
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ====================== 3D TILT on cards ======================
  document.querySelectorAll('.stack-card, .cert-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-cy * 5}deg) rotateY(${cx * 5}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ====================== SMOOTH SCROLL ======================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ====================== CONTACT FORM ======================
  window.handleSubmit = (e) => {
    e.preventDefault();
    const submitText = document.getElementById('submitText');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Build mailto link (since this is a static site)
    const body = `Hi Harmanpreet,\n\nName: ${name}\nEmail: ${email}\n\n${message}\n`;
    const mailto = `mailto:2000sharmanpreet@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    submitText.textContent = 'Opening your email client…';
    setTimeout(() => {
      window.location.href = mailto;
      submitText.textContent = 'Send Message';
    }, 500);

    return false;
  };

  // ====================== PARALLAX hero code card ======================
  const heroCode = document.querySelector('.hero-code');
  if (heroCode && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroCode.style.transform = `translate(${-x}px, calc(-50% + ${-y}px))`;
    });
  }

  // ====================== KONAMI / EASTER EGG ======================
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let codePos = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === code[codePos]) {
      codePos++;
      if (codePos === code.length) {
        document.body.style.animation = 'gradient-shift 2s ease infinite';
        document.documentElement.style.setProperty('--brand-1', '#FF3DCB');
        document.documentElement.style.setProperty('--brand-2', '#FFB547');
        console.log('🎉 Easter egg activated! Welcome, fellow developer.');
        codePos = 0;
      }
    } else {
      codePos = 0;
    }
  });

  // ====================== CONSOLE GREETING ======================
  console.log('%c👋 Hey there, fellow developer!', 'color: #7C5CFF; font-size: 24px; font-weight: bold;');
  console.log('%cThanks for inspecting my portfolio.', 'color: #00D4FF; font-size: 14px;');
  console.log('%cInterested in working together?', 'color: #F5F7FA; font-size: 13px;');
  console.log('%c→ 2000sharmanpreet@gmail.com', 'color: #22D39A; font-size: 13px; font-weight: bold;');
  console.log('%cTry the Konami code: ↑↑↓↓←→←→ba 🎮', 'color: #FFB547; font-size: 12px; font-style: italic;');
})();
