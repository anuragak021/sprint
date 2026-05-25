/* ═══════════════════════════════════════════════════════════
   SPRINT — Main JavaScript
   Angular-style modular SPA controller
═══════════════════════════════════════════════════════════ */

'use strict';

/* ── App Bootstrap ─────────────────────────────────────── */
const SprintApp = (() => {

  /* ── Navbar ──────────────────────────────────────────── */
  const initNavbar = () => {
    const navbar    = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks  = document.getElementById('navLinks');
    const links     = document.querySelectorAll('.nav-link');

    // Scroll: add .scrolled class
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
      updateActiveLink();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile toggle
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu on link click
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });

    // Highlight active section
    const sections = document.querySelectorAll('section[id]');

    const updateActiveLink = () => {
      let current = '';
      sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top <= 120) current = sec.id;
      });
      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };
  };

  /* ── Reveal on Scroll ────────────────────────────────── */
  const initReveal = () => {
    // Add js-ready so CSS hides elements for animation
    document.body.classList.add('js-ready');

    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  };

  /* ── Typing effect for hero subtitle ────────────────── */
  const initTyping = () => {
    const el = document.querySelector('.hero-subtitle');
    if (!el) return;

    const text = el.textContent;
    el.textContent = '';
    el.style.opacity = '1';

    let i = 0;
    const type = () => {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(type, 28);
      }
    };
    setTimeout(type, 900);
  };

  /* ── Counter animation for stat chips ───────────────── */
  const initCounters = () => {
    // Animate numbers on the hero stats
    const chips = document.querySelectorAll('.stat-num');
    chips.forEach(chip => {
      chip.style.opacity = '0';
      chip.style.transform = 'translateY(10px)';
      chip.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    setTimeout(() => {
      chips.forEach((chip, i) => {
        setTimeout(() => {
          chip.style.opacity = '1';
          chip.style.transform = 'translateY(0)';
        }, i * 150);
      });
    }, 1200);
  };

  /* ── Parallax on hero illustration ──────────────────── */
  const initParallax = () => {
    const illustration = document.querySelector('.hero-illustration');
    if (!illustration) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      illustration.style.transform = `translateY(${scrollY * 0.25}px)`;
    }, { passive: true });
  };

  /* ── Smooth card hover glow effect ──────────────────── */
  const initCardGlow = () => {
    const cards = document.querySelectorAll(
      '.comp-card, .team-card, .future-card, .adv-card, .timeline-item'
    );

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width)  * 100;
        const y = ((e.clientY - rect.top)  / rect.height) * 100;
        card.style.background = `
          radial-gradient(
            circle at ${x}% ${y}%,
            rgba(74, 222, 128, 0.06) 0%,
            var(--bg-card) 60%
          )
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = '';
      });
    });
  };

  /* ── Fetch project metadata from Express API ─────────── */
  const fetchProjectData = async () => {
    try {
      const res  = await fetch('/api/project');
      const data = await res.json();
      console.log('🌿 SPRINT Project Data:', data);
      // Could be used to dynamically populate DOM elements
    } catch (err) {
      // Silently fail — static content already rendered
    }
  };

  /* ── Cursor spotlight (desktop only) ────────────────── */
  const initSpotlight = () => {
    if (window.innerWidth < 768) return;

    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 0;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(
        circle, rgba(74,222,128,0.04) 0%, transparent 70%
      );
      transform: translate(-50%, -50%);
      transition: left 0.15s ease, top 0.15s ease;
      will-change: left, top;
    `;
    document.body.appendChild(spotlight);

    window.addEventListener('mousemove', (e) => {
      spotlight.style.left = `${e.clientX}px`;
      spotlight.style.top  = `${e.clientY}px`;
    }, { passive: true });
  };

  /* ── Progress bar on scroll ─────────────────────────── */
  const initProgressBar = () => {
    const bar = document.createElement('div');
    bar.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      height: 2px;
      width: 0%;
      background: linear-gradient(90deg, #4ade80, #22c55e, #4ade80);
      z-index: 200;
      transition: width 0.1s linear;
    `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const doc     = document.documentElement;
      const scrolled = doc.scrollTop;
      const total    = doc.scrollHeight - doc.clientHeight;
      const pct      = (scrolled / total) * 100;
      bar.style.width = `${pct}%`;
    }, { passive: true });
  };

  /* ── Timeline step sequential reveal ────────────────── */
  const initTimelineStagger = () => {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.08}s`;
    });
  };

  /* ── Init ────────────────────────────────────────────── */
  const init = () => {
    initNavbar();
    initReveal();
    initTyping();
    initCounters();
    initParallax();
    initCardGlow();
    initSpotlight();
    initProgressBar();
    initTimelineStagger();
    fetchProjectData();

    console.log(
      '%c🌿 SPRINT%c Smart Precision Remote Irrigation Network Technology\n' +
      '%c   B.Tech ECE · Delhi Technological University · 2026',
      'color:#4ade80;font-size:20px;font-weight:900;',
      'color:#86efac;font-size:13px;font-weight:500;',
      'color:#4b7a5a;font-size:11px;'
    );
  };

  return { init };
})();

/* ── DOM Ready ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', SprintApp.init);
