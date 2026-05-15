/* ============================================
   MODEL GURU SECTION — PREMIUM ANIMATION
   ============================================ */
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const section = document.querySelector('#model-guru');
  if (!section) return;

  // ============================================
  // SECTION HEADER
  // ============================================
  gsap.set('#model-guru .section-badge', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('#model-guru .section-title', { opacity: 0, y: 60, filter: 'blur(10px)' });
  gsap.set('#model-guru .section-subtitle', { opacity: 0, y: 30 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#model-guru .section-header',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
  .to('#model-guru .section-badge', {
    opacity: 1, scale: 1, rotation: 0,
    duration: 0.8, ease: 'elastic.out(1, 0.5)'
  })
  .to('#model-guru .section-title', {
    opacity: 1, y: 0, filter: 'blur(0px)',
    duration: 0.7, ease: 'power3.out'
  }, '-=0.4')
  .to('#model-guru .section-subtitle', {
    opacity: 1, y: 0,
    duration: 0.5, ease: 'power2.out'
  }, '-=0.3');

  // ============================================
  // PHILOSOPHY CARD (QUOTE) — CINEMATIC REVEAL
  // ============================================
  const quoteCard = section.querySelector('.philosophy-card');
  if (quoteCard) {
    const quoteIcon = quoteCard.querySelector('.quote-icon');
    const blockquote = quoteCard.querySelector('blockquote');
    const author = quoteCard.querySelector('.philosophy-author');

    gsap.set(quoteCard, { opacity: 0, scale: 0.85, rotateX: 20, transformPerspective: 1000 });
    gsap.set(quoteIcon, { opacity: 0, scale: 0, rotation: -90 });
    gsap.set(blockquote, { opacity: 0, y: 20 });
    gsap.set(author, { opacity: 0, x: -20 });

    gsap.timeline({
      scrollTrigger: {
        trigger: quoteCard,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    })
    .to(quoteCard, {
      opacity: 1, scale: 1, rotateX: 0,
      duration: 1, ease: 'power4.out'
    })
    .to(quoteIcon, {
      opacity: 1, scale: 1, rotation: 0,
      duration: 0.7, ease: 'elastic.out(1, 0.5)'
    }, '-=0.6')
    .to(blockquote, {
      opacity: 1, y: 0,
      duration: 0.8, ease: 'power3.out'
    }, '-=0.4')
    .to(author, {
      opacity: 1, x: 0,
      duration: 0.5, ease: 'power2.out'
    }, '-=0.2');
  }

  // ============================================
  // PILLAR CARDS — STAGGERED 3D ENTRANCE
  // ============================================
  const pillars = gsap.utils.toArray('#model-guru .pillar-card');

  pillars.forEach((card, i) => {
    const icon = card.querySelector('.pillar-icon');
    const heading = card.querySelector('h4');
    const desc = card.querySelector('p');

    gsap.set(card, {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotateY: i % 2 === 0 ? -20 : 20,
      transformPerspective: 1200
    });
    if (icon) gsap.set(icon, { opacity: 0, scale: 0, rotation: -180 });
    if (heading) gsap.set(heading, { opacity: 0, y: 15 });
    if (desc) gsap.set(desc, { opacity: 0, y: 10, filter: 'blur(6px)' });
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#model-guru .philosophy-pillars',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })
  .to(pillars, {
    opacity: 1, y: 0, scale: 1, rotateY: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power4.out'
  })
  .to('#model-guru .pillar-icon', {
    opacity: 1, scale: 1, rotation: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'back.out(2.5)'
  }, '-=0.7')
  .to('#model-guru .pillar-card h4', {
    opacity: 1, y: 0,
    duration: 0.5,
    stagger: 0.12,
    ease: 'power2.out'
  }, '-=0.5')
  .to('#model-guru .pillar-card p', {
    opacity: 1, y: 0, filter: 'blur(0px)',
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out'
  }, '-=0.4');

  // ============================================
  // HOVER MICRO-INTERACTIONS
  // ============================================
  pillars.forEach(card => {
    const icon = card.querySelector('.pillar-icon');

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10, scale: 1.04,
        boxShadow: '0 20px 50px rgba(15, 94, 168, 0.18)',
        duration: 0.4, ease: 'power2.out'
      });
      if (icon) gsap.to(icon, {
        scale: 1.3, rotation: 10,
        duration: 0.4, ease: 'back.out(2)'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0, scale: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        duration: 0.5, ease: 'power2.out'
      });
      if (icon) gsap.to(icon, {
        scale: 1, rotation: 0,
        duration: 0.5, ease: 'elastic.out(1, 0.4)'
      });
    });

    // 3D tilt on desktop
    if (window.innerWidth > 768) {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 10, rotateX: -y * 10,
          duration: 0.4, ease: 'power2.out',
          transformPerspective: 1000
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateY: 0, rotateX: 0,
          duration: 0.6, ease: 'elastic.out(1, 0.5)'
        });
      });
    }
  });

  // ============================================
  // QUOTE CARD HOVER
  // ============================================
  if (quoteCard) {
    quoteCard.addEventListener('mouseenter', () => {
      gsap.to(quoteCard, {
        y: -6, scale: 1.02,
        boxShadow: '0 20px 50px rgba(155, 114, 207, 0.15)',
        duration: 0.4, ease: 'power2.out'
      });
    });
    quoteCard.addEventListener('mouseleave', () => {
      gsap.to(quoteCard, {
        y: 0, scale: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        duration: 0.5, ease: 'power2.out'
      });
    });
  }

  // ============================================
  // PARALLAX (Desktop)
  // ============================================
  if (window.innerWidth > 768) {
    gsap.to('.philosophy-card', {
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#model-guru',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    pillars.forEach((card, i) => {
      gsap.to(card, {
        y: -15 - (i % 2) * 10,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5 + (i % 2) * 0.5
        }
      });
    });
  }

  // ============================================
  // LIVE AMBIENT ANIMATIONS — ALWAYS RUNNING
  // ============================================

  // --- 1. PILLAR ICON UNIQUE ANIMATIONS ---
  pillars.forEach((card, i) => {
    const icon = card.querySelector('.pillar-icon');
    if (!icon) return;

    // Skip wrapping if icon contains SVG
    const hasSvg = icon.querySelector('svg');
    if (!hasSvg && !icon.querySelector('.icon-inner')) {
      const inner = document.createElement('span');
      inner.className = 'icon-inner';
      inner.style.display = 'inline-block';
      inner.textContent = icon.textContent;
      icon.textContent = '';
      icon.appendChild(inner);
    }
    const inner = icon.querySelector('.icon-inner');

    if (i === 0) {
      gsap.to(inner, {
        y: -4,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
    else if (i === 1) {
      gsap.to(inner, {
        rotateZ: 360,
        duration: 8,
        repeat: -1,
        ease: 'none'
      });
    }
    else if (i === 2) {
      gsap.to(inner, {
        x: 4,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
    else if (i === 3) {
      // Diamond SVG: smooth Y-axis rotation with perspective
      const svg = icon.querySelector('.diamond-3d');
      if (svg) {
        svg.style.display = 'inline-block';
        svg.style.transformStyle = 'preserve-3d';
        gsap.to(svg, {
          rotateY: 360,
          duration: 4,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center'
        });
      } else if (inner) {
        gsap.to(inner, {
          keyframes: [
            { rotateY: 0, scaleX: 1, duration: 0 },
            { rotateY: 90, scaleX: 0.3, duration: 1, ease: 'power1.in' },
            { rotateY: 180, scaleX: 1, duration: 1, ease: 'power1.out' },
            { rotateY: 270, scaleX: 0.3, duration: 1, ease: 'power1.in' },
            { rotateY: 360, scaleX: 1, duration: 1, ease: 'power1.out' }
          ],
          repeat: -1,
          ease: 'none'
        });
      }
    }
  });

  // --- 2. QUOTE CARD BREATHING GLOW ---
  if (quoteCard) {
    gsap.to(quoteCard, {
      boxShadow: '0 8px 40px rgba(155, 114, 207, 0.18), 0 0 60px rgba(57, 189, 235, 0.08)',
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Quote icon floating
    const quoteIcon = quoteCard.querySelector('.quote-icon');
    if (quoteIcon) {
      gsap.to(quoteIcon, {
        y: -6,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }

  // --- 3. PILLAR CARD BREATHING (subtle border glow) ---
  pillars.forEach((card, i) => {
    gsap.to(card, {
      borderColor: 'rgba(15, 94, 168, 0.25)',
      duration: 3 + i * 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.6
    });
  });

  // --- 4. AURORA BACKGROUND ORBS ---
  const auroraContainer = document.createElement('div');
  auroraContainer.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;border-radius:inherit;';
  section.style.position = 'relative';
  section.style.overflow = 'hidden';
  section.insertBefore(auroraContainer, section.firstChild);

  const orbColors = [
    'rgba(155, 114, 207, 0.10)',
    'rgba(57, 189, 235, 0.08)',
    'rgba(46, 196, 182, 0.07)',
    'rgba(241, 192, 91, 0.06)'
  ];

  orbColors.forEach((color, i) => {
    const orb = document.createElement('div');
    orb.style.cssText = `
      position: absolute;
      width: ${250 + i * 70}px;
      height: ${250 + i * 70}px;
      border-radius: 50%;
      background: radial-gradient(circle, ${color} 0%, transparent 70%);
      filter: blur(50px);
      opacity: 0.7;
    `;
    auroraContainer.appendChild(orb);

    gsap.set(orb, {
      x: Math.random() * section.offsetWidth,
      y: Math.random() * section.offsetHeight
    });

    gsap.to(orb, {
      x: `random(0, ${section.offsetWidth})`,
      y: `random(0, ${section.offsetHeight})`,
      duration: 14 + i * 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 2.5
    });
  });

  // --- 5. SECTION BADGE GENTLE FLOAT ---
  const badge = section.querySelector('.section-badge');
  if (badge) {
    gsap.to(badge, {
      y: -3,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
})();
