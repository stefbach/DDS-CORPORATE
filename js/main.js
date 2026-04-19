/* =========================================================
   MAISON NOIR — Interactions & gallery
   Lightweight vanilla JS, no deps, focus on perf.
   ========================================================= */
(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ──────────────────────────────────────────────────────
     1. PORTFOLIO DATA
     Curated collection of photography stock, keyed by
     category. Unsplash URLs use responsive params.
     ────────────────────────────────────────────────────── */
  const PORTFOLIO = [
    { id: 1,  cat: 'portrait',  title: 'Silhouette, Studio Paris',
      src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1600&q=80',
      thumb: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=70' },
    { id: 2,  cat: 'editorial', title: 'Maison d\'Hôte, Vogue Paris',
      src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
      thumb: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=70' },
    { id: 3,  cat: 'interior',  title: 'Hôtel Particulier, Saint-Germain',
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      thumb: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=70' },
    { id: 4,  cat: 'travel',    title: 'Aube, Cinque Terre',
      src: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=1600&q=80',
      thumb: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=800&q=70' },
    { id: 5,  cat: 'portrait',  title: 'Portrait intimiste, argentique',
      src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1600&q=80',
      thumb: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=70' },
    { id: 6,  cat: 'editorial', title: 'Joaillerie, série sombre',
      src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80',
      thumb: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=70' },
    { id: 7,  cat: 'interior',  title: 'Bibliothèque, rue du Bac',
      src: 'https://images.unsplash.com/photo-1505692794403-34d4982f88aa?auto=format&fit=crop&w=1600&q=80',
      thumb: 'https://images.unsplash.com/photo-1505692794403-34d4982f88aa?auto=format&fit=crop&w=800&q=70' },
    { id: 8,  cat: 'travel',    title: 'Brume, côte d\'Opale',
      src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80',
      thumb: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=70' },
    { id: 9,  cat: 'portrait',  title: 'Regard, Milan',
      src: 'https://images.unsplash.com/photo-1502767089025-6572583495b9?auto=format&fit=crop&w=1600&q=80',
      thumb: 'https://images.unsplash.com/photo-1502767089025-6572583495b9?auto=format&fit=crop&w=800&q=70' },
    { id: 10, cat: 'editorial', title: 'Satin, série AD Magazine',
      src: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1600&q=80',
      thumb: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=70' },
    { id: 11, cat: 'interior',  title: 'Suite, Palace alpin',
      src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
      thumb: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=70' },
    { id: 12, cat: 'travel',    title: 'Horizon, Lanzarote',
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
      thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70' },
  ];

  /* ──────────────────────────────────────────────────────
     2. LOADER
     ────────────────────────────────────────────────────── */
  const loader = $('#loader');
  const reveal = () => {
    loader?.classList.add('is-hidden');
    document.body.classList.add('is-ready');
  };
  if (document.readyState === 'complete') {
    setTimeout(reveal, 900);
  } else {
    window.addEventListener('load', () => setTimeout(reveal, 900), { once: true });
  }

  /* ──────────────────────────────────────────────────────
     3. YEAR + SMOOTH ANCHORS
     ────────────────────────────────────────────────────── */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  $$('[data-link]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      closeMobileMenu();
    });
  });

  /* ──────────────────────────────────────────────────────
     4. NAV SCROLL STATE
     ────────────────────────────────────────────────────── */
  const nav = $('#nav');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('is-scrolled', y > 40);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ──────────────────────────────────────────────────────
     5. MOBILE MENU
     ────────────────────────────────────────────────────── */
  const toggle = $('.nav__toggle');
  const menu   = $('#menu');
  function openMobileMenu() {
    toggle?.classList.add('is-open');
    toggle?.setAttribute('aria-expanded', 'true');
    menu?.classList.add('is-open');
    menu?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    toggle?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    menu?.classList.remove('is-open');
    menu?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  toggle?.addEventListener('click', () => {
    menu?.classList.contains('is-open') ? closeMobileMenu() : openMobileMenu();
  });

  /* ──────────────────────────────────────────────────────
     6. GALLERY — render, filter, lightbox
     ────────────────────────────────────────────────────── */
  const galleryEl = $('#gallery');
  const filtersEls = $$('.filters__btn');

  function renderGallery() {
    if (!galleryEl) return;
    const frag = document.createDocumentFragment();
    PORTFOLIO.forEach((item, i) => {
      const tile = document.createElement('figure');
      tile.className = 'tile';
      tile.dataset.cat = item.cat;
      tile.dataset.index = i;
      tile.innerHTML = `
        <img class="tile__img"
             src="${item.thumb}"
             alt="${item.title}"
             loading="lazy" decoding="async"
             width="800" height="1000" />
        <span class="tile__index">${String(i + 1).padStart(2, '0')} / ${String(PORTFOLIO.length).padStart(2, '0')}</span>
        <figcaption class="tile__overlay">
          <span class="tile__cat">${item.cat}</span>
          <span class="tile__title">${item.title}</span>
        </figcaption>`;
      tile.addEventListener('click', () => openLightbox(i));
      frag.appendChild(tile);
    });
    galleryEl.appendChild(frag);
  }
  renderGallery();

  filtersEls.forEach(btn => {
    btn.addEventListener('click', () => {
      filtersEls.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      const f = btn.dataset.filter;
      $$('.tile', galleryEl).forEach(tile => {
        const match = f === 'all' || tile.dataset.cat === f;
        tile.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ──────────────────────────────────────────────────────
     7. LIGHTBOX
     ────────────────────────────────────────────────────── */
  const lightbox    = $('#lightbox');
  const lightImg    = $('.lightbox__img', lightbox);
  const lightTitle  = $('.lightbox__caption-title', lightbox);
  const lightIndex  = $('.lightbox__caption-index', lightbox);
  const btnClose    = $('.lightbox__close', lightbox);
  const btnPrev     = $('.lightbox__nav--prev', lightbox);
  const btnNext     = $('.lightbox__nav--next', lightbox);
  let current = 0;
  let visibleItems = PORTFOLIO.slice();

  function updateVisible() {
    const active = $('.filters__btn.is-active')?.dataset.filter || 'all';
    visibleItems = active === 'all' ? PORTFOLIO.slice() : PORTFOLIO.filter(p => p.cat === active);
  }

  function openLightbox(globalIndex) {
    updateVisible();
    const item = PORTFOLIO[globalIndex];
    const idx = visibleItems.findIndex(v => v.id === item.id);
    current = idx >= 0 ? idx : 0;
    showCurrent();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function showCurrent() {
    const item = visibleItems[current];
    if (!item) return;
    lightImg.style.opacity = '0';
    // Preload next/prev
    const preload = (src) => { if (src) { const img = new Image(); img.src = src; } };
    const len = visibleItems.length;
    preload(visibleItems[(current + 1) % len]?.src);
    preload(visibleItems[(current - 1 + len) % len]?.src);

    const temp = new Image();
    temp.onload = () => {
      lightImg.src = item.src;
      lightImg.alt = item.title;
      requestAnimationFrame(() => { lightImg.style.opacity = '1'; });
    };
    temp.src = item.src;
    lightTitle.textContent = item.title;
    lightIndex.textContent = `${String(current + 1).padStart(2, '0')} / ${String(len).padStart(2, '0')}`;
  }
  function next() { current = (current + 1) % visibleItems.length; showCurrent(); }
  function prev() { current = (current - 1 + visibleItems.length) % visibleItems.length; showCurrent(); }

  btnClose?.addEventListener('click', closeLightbox);
  btnNext ?.addEventListener('click', next);
  btnPrev ?.addEventListener('click', prev);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')      closeLightbox();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft')  prev();
  });

  // Touch swipe
  let touchX = 0;
  lightbox?.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox?.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  });

  /* ──────────────────────────────────────────────────────
     8. REVEAL ON SCROLL — IntersectionObserver
     ────────────────────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    $$('.reveal').forEach(el => io.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  /* ──────────────────────────────────────────────────────
     9. CUSTOM CURSOR (desktop fine pointer only)
     ────────────────────────────────────────────────────── */
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer && !prefersReducedMotion) {
    const cursor = $('.cursor');
    const dot    = $('.cursor__dot');
    const ring   = $('.cursor__ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot .style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    const hoverables = 'a, button, .tile, .filters__btn, [data-link], .entry__link';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverables)) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverables)) cursor.classList.remove('is-hover');
    });
  } else {
    $('.cursor')?.remove();
  }

  /* ──────────────────────────────────────────────────────
    10. PARALLAX — lightweight rAF, no layout thrash
     ────────────────────────────────────────────────────── */
  if (!prefersReducedMotion) {
    const parEls = $$('[data-parallax]');
    let scrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      parEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const translate = center * -0.12;
        el.style.transform = `translate3d(0, ${translate.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    const request = () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener('scroll', () => { scrollY = window.scrollY; request(); }, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    update();
  }

  /* ──────────────────────────────────────────────────────
    11. MAGNETIC BUTTONS (subtle)
     ────────────────────────────────────────────────────── */
  if (finePointer && !prefersReducedMotion) {
    $$('.btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top  - r.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

})();
