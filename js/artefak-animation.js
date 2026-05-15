/* ============================================
   ARTEFAK SECTION — PREMIUM ANIMATION
   ============================================ */
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const portfolioSection = document.querySelector('#portfolio');
  if (!portfolioSection) return;

  // ============================================
  // SECTION HEADER
  // ============================================
  gsap.set('#portfolio .section-badge', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('#portfolio .section-title', { opacity: 0, y: 60, filter: 'blur(10px)' });
  gsap.set('#portfolio .section-subtitle', { opacity: 0, y: 30 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#portfolio .section-header',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
  .to('#portfolio .section-badge', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    ease: 'elastic.out(1, 0.5)'
  })
  .to('#portfolio .section-title', {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.7,
    ease: 'power3.out'
  }, '-=0.4')
  .to('#portfolio .section-subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.3');

  // ============================================
  // TABS & FILTER BUTTONS — CASCADE ENTRANCE
  // ============================================
  gsap.set('#portfolio .tab-btn', { opacity: 0, y: -20, scale: 0.8 });
  gsap.set('#portfolio .filter-btn', { opacity: 0, y: 20, scale: 0.8 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#portfolio .portfolio-tabs',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
  .to('#portfolio .tab-btn', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.5,
    stagger: 0.08,
    ease: 'back.out(1.7)'
  })
  .to('#portfolio .filter-btn', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.4,
    stagger: 0.06,
    ease: 'back.out(1.7)'
  }, '-=0.3');

  // ============================================
  // PORTFOLIO CARDS — STAGGERED 3D ENTRANCE
  // ============================================
  function animateCards() {
    const cards = portfolioSection.querySelectorAll('.portfolio-card:not([style*="display: none"])');
    if (cards.length === 0) return;

    gsap.set(cards, {
      opacity: 0,
      y: 60,
      scale: 0.85,
      rotateX: 15,
      transformPerspective: 1000
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 0.8,
      stagger: { each: 0.08, from: 'start', grid: 'auto' },
      ease: 'power3.out'
    });
  }

  // Initial animation on scroll
  ScrollTrigger.create({
    trigger: '#portfolio .portfolio-grid',
    start: 'top 80%',
    once: true,
    onEnter: animateCards
  });

  // Re-animate on tab/filter change
  const tabBtns = document.querySelectorAll('#portfolio .tab-btn');
  const filterBtns = document.querySelectorAll('#portfolio .filter-btn');
  [...tabBtns, ...filterBtns].forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        const visibleCards = portfolioSection.querySelectorAll('.portfolio-card:not([style*="display: none"])');
        gsap.fromTo(visibleCards,
          { opacity: 0, scale: 0.8, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'back.out(1.4)'
          }
        );
      }, 100);
    });
  });

  // ============================================
  // CARD HOVER — 3D TILT + ELEVATE
  // ============================================
  document.querySelectorAll('#portfolio .portfolio-card').forEach(card => {
    const img = card.querySelector('.portfolio-card-img img');
    const tag = card.querySelector('.card-tag');
    const overlay = card.querySelector('.card-img-overlay');

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        scale: 1.03,
        boxShadow: '0 25px 60px rgba(15, 94, 168, 0.18)',
        duration: 0.4,
        ease: 'power2.out'
      });
      if (img) gsap.to(img, { scale: 1.1, duration: 0.6, ease: 'power2.out' });
      if (tag) gsap.to(tag, { scale: 1.1, y: -2, duration: 0.3, ease: 'back.out(2)' });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        duration: 0.5,
        ease: 'power2.out'
      });
      if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' });
      if (tag) gsap.to(tag, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    });

    // Mouse-following 3D tilt
    if (window.innerWidth > 768) {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 8,
          rotateX: -y * 8,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    }
  });

  // ============================================
  // BUTTON HOVER — RIPPLE EFFECT
  // ============================================
  document.querySelectorAll('#portfolio .tab-btn, #portfolio .filter-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { y: -3, scale: 1.05, duration: 0.3, ease: 'back.out(2)' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { y: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
    });
  });

  // ============================================
  // CARD-IMG OVERLAY — SLIDE UP REVEAL
  // ============================================
  document.querySelectorAll('#portfolio .portfolio-card-img').forEach(imgWrap => {
    const overlay = imgWrap.querySelector('.card-img-overlay');
    if (!overlay) return;

    imgWrap.addEventListener('mouseenter', () => {
      gsap.fromTo(overlay,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    });

    imgWrap.addEventListener('mouseleave', () => {
      gsap.to(overlay, { y: 30, opacity: 0, duration: 0.3, ease: 'power2.in' });
    });
  });

  // ============================================
  // ACTIVE TAB / FILTER INDICATOR ANIMATION
  // ============================================
  function animateActiveButton(btn) {
    gsap.fromTo(btn,
      { scale: 1 },
      { scale: 1.08, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 }
    );
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => animateActiveButton(btn));
  });
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => animateActiveButton(btn));
  });

  // ============================================
  // PARALLAX (Desktop only)
  // ============================================
  if (window.innerWidth > 768) {
    gsap.utils.toArray('#portfolio .portfolio-card').forEach((card, i) => {
      gsap.to(card, {
        y: -20 - (i % 3) * 10,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5 + (i % 3) * 0.3
        }
      });
    });
  }
})();
