/* ============================================
   PENDIDIKAN SECTION — PREMIUM ANIMATION
   ============================================ */
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const eduSection = document.querySelector('#education');
  if (!eduSection) return;

  // ============================================
  // SECTION HEADER — CINEMATIC ENTRANCE
  // ============================================
  gsap.set('#education .section-badge', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('#education .section-title', { opacity: 0, y: 60, filter: 'blur(10px)' });
  gsap.set('#education .section-subtitle', { opacity: 0, y: 30 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#education .section-header',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
  .to('#education .section-badge', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.8,
    ease: 'elastic.out(1, 0.5)'
  })
  .to('#education .section-title', {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.7,
    ease: 'power3.out'
  }, '-=0.4')
  .to('#education .section-subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.3');

  // ============================================
  // TIMELINE CARDS — 3D STAGGERED ENTRANCE
  // ============================================
  const timelineItems = gsap.utils.toArray('#education .timeline-item');

  timelineItems.forEach((item, i) => {
    const card = item.querySelector('.timeline-card');
    const dot = item.querySelector('.timeline-dot');
    const logo = item.querySelector('.edu-logo');
    const heading = item.querySelector('h3');
    const institution = item.querySelector('.institution');
    const desc = item.querySelector('p:not(.institution)');
    const year = item.querySelector('.timeline-year');

    gsap.set(item, { opacity: 0 });
    gsap.set(card, {
      opacity: 0,
      x: i % 2 === 0 ? -80 : 80,
      rotateY: i % 2 === 0 ? -20 : 20,
      transformPerspective: 1200
    });
    gsap.set(dot, { scale: 0, opacity: 0 });
    if (logo) gsap.set(logo, { scale: 0, rotation: -90 });
    if (heading) gsap.set(heading, { opacity: 0, y: 20 });
    if (institution) gsap.set(institution, { opacity: 0, x: -20 });
    if (desc) gsap.set(desc, { opacity: 0, y: 15, filter: 'blur(6px)' });
    if (year) gsap.set(year, { opacity: 0, scale: 0.5 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });

    tl.to(item, { opacity: 1, duration: 0.1 })
      .to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      })
      .to(card, {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1,
        ease: 'power4.out'
      }, '-=0.3')
      .to(year, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(2)'
      }, '-=0.7');

    if (logo) {
      tl.to(logo, {
        scale: 1,
        rotation: 0,
        duration: 0.7,
        ease: 'back.out(2.5)'
      }, '-=0.8');
    }

    if (heading) {
      tl.to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.5');
    }

    if (institution) {
      tl.to(institution, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.3');
    }

    if (desc) {
      tl.to(desc, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.2');
    }
  });

  // ============================================
  // TIMELINE VERTICAL LINE — DRAW EFFECT
  // ============================================
  const timelineEl = eduSection.querySelector('.timeline');
  if (timelineEl) {
    gsap.set(timelineEl, { '--line-progress': '0%' });

    gsap.to(timelineEl, {
      '--line-progress': '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: timelineEl,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 1.2
      }
    });
  }

  // ============================================
  // HOVER MICRO-INTERACTIONS
  // ============================================
  timelineItems.forEach(item => {
    const card = item.querySelector('.timeline-card');
    const dot = item.querySelector('.timeline-dot');
    const logo = item.querySelector('.edu-logo');

    if (card) {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          boxShadow: '0 20px 50px rgba(15, 94, 168, 0.15)',
          duration: 0.4,
          ease: 'power2.out'
        });
        if (dot) gsap.to(dot, { scale: 1.4, duration: 0.3, ease: 'back.out(2)' });
        if (logo) gsap.to(logo, { rotation: 10, scale: 1.1, duration: 0.4, ease: 'power2.out' });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          duration: 0.5,
          ease: 'power2.out'
        });
        if (dot) gsap.to(dot, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        if (logo) gsap.to(logo, { rotation: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
      });
    }
  });

  // ============================================
  // LIVE AMBIENT — TIMELINE DOT PULSE
  // ============================================
  const ppgDot = eduSection.querySelector('.ppg-era .timeline-dot');
  if (ppgDot) {
    gsap.to(ppgDot, {
      boxShadow: '0 0 30px rgba(46, 196, 182, 0.7), 0 0 50px rgba(15, 94, 168, 0.4)',
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // ============================================
  // BADGE ONGOING PULSE
  // ============================================
  const badgeOngoing = eduSection.querySelector('.badge-ongoing');
  if (badgeOngoing) {
    gsap.to(badgeOngoing, {
      opacity: 0.5,
      scale: 0.95,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
})();
