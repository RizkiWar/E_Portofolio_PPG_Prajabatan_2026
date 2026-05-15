/* ============================================
   KEAHLIAN SECTION — PREMIUM ANIMATION
   ============================================ */
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const section = document.querySelector('#skills');
  if (!section) return;

  // ============================================
  // SECTION HEADER
  // ============================================
  gsap.set('#skills .section-badge', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('#skills .section-title', { opacity: 0, y: 60, filter: 'blur(10px)' });
  gsap.set('#skills .section-subtitle', { opacity: 0, y: 30 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#skills .section-header',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
  .to('#skills .section-badge', {
    opacity: 1, scale: 1, rotation: 0,
    duration: 0.8, ease: 'elastic.out(1, 0.5)'
  })
  .to('#skills .section-title', {
    opacity: 1, y: 0, filter: 'blur(0px)',
    duration: 0.7, ease: 'power3.out'
  }, '-=0.4')
  .to('#skills .section-subtitle', {
    opacity: 1, y: 0,
    duration: 0.5, ease: 'power2.out'
  }, '-=0.3');

  // ============================================
  // TAB BUTTONS — CASCADE ENTRANCE
  // ============================================
  gsap.set('#skills .skills-tab-btn', { opacity: 0, y: -20, scale: 0.8 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#skills .skills-tabs',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
  .to('#skills .skills-tab-btn', {
    opacity: 1, y: 0, scale: 1,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  });

  // ============================================
  // SKILL CARDS — STAGGERED ENTRANCE
  // ============================================
  function animateSkillCards() {
    const activePanel = section.querySelector('.skills-panel.active');
    if (!activePanel) return;
    const cards = activePanel.querySelectorAll('.skill-item-card');

    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.8, rotateX: 15, transformPerspective: 1000 },
      {
        opacity: 1, y: 0, scale: 1, rotateX: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'back.out(1.4)'
      }
    );
  }

  ScrollTrigger.create({
    trigger: '#skills .skills-panel',
    start: 'top 82%',
    once: true,
    onEnter: animateSkillCards
  });

  // Re-animate on tab change
  section.querySelectorAll('.skills-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(animateSkillCards, 100);
    });
  });

  // ============================================
  // HOVER MICRO-INTERACTIONS
  // ============================================
  section.querySelectorAll('.skill-item-card').forEach(card => {
    const icon = card.querySelector('.skill-item-icon');
    const badge = card.querySelector('.skill-item-badge');

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8, scale: 1.05,
        boxShadow: '0 16px 40px rgba(15, 94, 168, 0.15)',
        duration: 0.4, ease: 'power2.out'
      });
      if (icon) gsap.to(icon, {
        scale: 1.2, rotation: 10,
        duration: 0.4, ease: 'back.out(2)'
      });
      if (badge) gsap.to(badge, {
        scale: 1.1, y: -2,
        duration: 0.3, ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0, scale: 1,
        boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
        duration: 0.5, ease: 'power2.out'
      });
      if (icon) gsap.to(icon, {
        scale: 1, rotation: 0,
        duration: 0.5, ease: 'elastic.out(1, 0.4)'
      });
      if (badge) gsap.to(badge, {
        scale: 1, y: 0,
        duration: 0.3, ease: 'power2.out'
      });
    });
  });

  // ============================================
  // TAB BUTTON HOVER
  // ============================================
  section.querySelectorAll('.skills-tab-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { y: -3, scale: 1.05, duration: 0.3, ease: 'back.out(2)' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { y: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('click', () => {
      gsap.fromTo(btn, { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' });
    });
  });

  // ============================================
  // PARALLAX (Desktop)
  // ============================================
  if (window.innerWidth > 768) {
    gsap.utils.toArray('#skills .skill-item-card').forEach((card, i) => {
      gsap.to(card, {
        y: -10 - (i % 4) * 5,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    });
  }
})();
