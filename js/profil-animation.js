/* ============================================
   PROFIL SECTION — SUPER PREMIUM ANIMATION
   ============================================ */
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const aboutSection = document.querySelector('#about');
  if (!aboutSection) return;

  // ============================================
  // SPLIT TEXT INTO LETTERS/WORDS for stagger
  // ============================================
  function splitTextNodes(element, mode = 'word') {
    if (!element || element.dataset.split === 'done') return [];
    const text = element.textContent;
    element.textContent = '';
    const parts = mode === 'word' ? text.split(/(\s+)/) : text.split('');
    const spans = [];
    parts.forEach(part => {
      if (part.trim() === '' && mode === 'word') {
        element.appendChild(document.createTextNode(part));
        return;
      }
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, opacity, filter';
      span.textContent = part;
      element.appendChild(span);
      spans.push(span);
    });
    element.dataset.split = 'done';
    return spans;
  }

  // ============================================
  // SECTION HEADER — CINEMATIC ENTRANCE
  // ============================================
  const sectionTitle = aboutSection.querySelector('.section-title');
  const titleWords = sectionTitle ? splitTextNodes(sectionTitle, 'word') : [];

  gsap.set('#about .section-badge', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set(titleWords, { opacity: 0, y: 80, rotateX: -90, transformPerspective: 1000 });
  gsap.set('#about .section-subtitle', { opacity: 0, y: 30, filter: 'blur(10px)' });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#about .section-header',
      start: 'top 88%',
      toggleActions: 'play none none none'
    }
  })
  .to('#about .section-badge', {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 0.9,
    ease: 'elastic.out(1, 0.5)'
  })
  .to(titleWords, {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: 'back.out(1.7)'
  }, '-=0.5')
  .to('#about .section-subtitle', {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.7,
    ease: 'power3.out'
  }, '-=0.4');

  // ============================================
  // PHOTO — DRAMATIC 3D CINEMATIC REVEAL
  // ============================================
  gsap.set('.about-image-card', {
    opacity: 0,
    scale: 0.5,
    rotateY: -45,
    rotateX: 15,
    transformPerspective: 1500,
    transformOrigin: 'center center'
  });
  gsap.set('.about-image-card img', { scale: 1.5, filter: 'blur(20px) brightness(0.3)' });

  gsap.timeline({
    scrollTrigger: {
      trigger: '.about-image',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })
  .to('.about-image-card', {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    duration: 1.4,
    ease: 'power4.out'
  })
  .to('.about-image-card img', {
    scale: 1,
    filter: 'blur(0px) brightness(1)',
    duration: 1.6,
    ease: 'power3.out'
  }, '<');

  // Continuous floating effect on photo
  gsap.to('.about-image-card', {
    y: -8,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // ============================================
  // STATS — EXPLODE ENTRANCE WITH GLOW
  // ============================================
  gsap.set('.about-stat', {
    opacity: 0,
    y: 100,
    scale: 0.3,
    rotation: -15,
    transformOrigin: 'center bottom'
  });
  gsap.set('.about-stat .stat-icon svg', { scale: 0, rotation: -180 });
  gsap.set('.about-stat .label', { opacity: 0, y: 10 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '.about-stats',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
  .to('.about-stat', {
    opacity: 1,
    y: 0,
    scale: 1,
    rotation: 0,
    duration: 0.9,
    stagger: 0.2,
    ease: 'elastic.out(1, 0.6)'
  })
  .to('.about-stat .stat-icon svg', {
    scale: 1,
    rotation: 0,
    duration: 0.7,
    stagger: 0.2,
    ease: 'back.out(2.5)'
  }, '-=0.7')
  .to('.about-stat .label', {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.15,
    ease: 'power2.out'
  }, '-=0.5');

  // Floating animation for stats
  // gsap.utils.toArray('.about-stat').forEach((stat, i) => {
  //   gsap.to(stat, {
  //     y: -6,
  //     duration: 2.5 + i * 0.3,
  //     repeat: -1,
  //     yoyo: true,
  //     ease: 'sine.inOut',
  //     delay: i * 0.5
  //   });
  // });

  // ============================================
  // INFO ITEMS — STAGGERED CASCADE WITH ICON SPIN
  // ============================================
  gsap.set('.about-info-item', {
    opacity: 0,
    x: -50,
    scale: 0.8
  });
  gsap.set('.about-info-item .info-icon', { rotation: -180, scale: 0 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '.about-info-list',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
  .to('.about-info-item', {
    opacity: 1,
    x: 0,
    scale: 1,
    duration: 0.7,
    stagger: { each: 0.12, from: 'start' },
    ease: 'power3.out'
  })
  .to('.about-info-item .info-icon', {
    rotation: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.12,
    ease: 'back.out(2)'
  }, '-=0.5');

  // ============================================
  // QUOTE — DRAMATIC REVEAL WITH GLOW PULSE
  // ============================================
  gsap.set('.profil-quote', {
    opacity: 0,
    scale: 0.7,
    filter: 'blur(20px)',
    rotateX: 30,
    transformPerspective: 1000
  });
  gsap.set('.profil-quote p em', { opacity: 0, y: 20 });
  gsap.set('.profil-quote cite', { opacity: 0, x: -20 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '.profil-quote',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
  .to('.profil-quote', {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    rotateX: 0,
    duration: 1.2,
    ease: 'power4.out'
  })
  .to('.profil-quote p em', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .to('.profil-quote cite', {
    opacity: 1,
    x: 0,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.3');

  // ============================================
  // NARASI — 3D FLIP CARDS WITH WORD STAGGER
  // ============================================
  document.querySelectorAll('.profil-narasi').forEach((narasi, idx) => {
    const heading = narasi.querySelector('.narasi-heading');
    const text = narasi.querySelector('.about-text');

    gsap.set(narasi, {
      opacity: 0,
      y: 80,
      rotateX: 25,
      transformPerspective: 1200
    });
    gsap.set(heading, { opacity: 0, x: -40, scale: 0.9 });
    gsap.set(text, { opacity: 0, y: 20, filter: 'blur(8px)' });

    gsap.timeline({
      scrollTrigger: {
        trigger: narasi,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
    .to(narasi, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      ease: 'power4.out'
    })
    .to(heading, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.5)'
    }, '-=0.6')
    .to(text, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');
  });

  // ============================================
  // BOLD WORDS — SLIDING HIGHLIGHT EFFECT
  // ============================================
  document.querySelectorAll('.about-text strong').forEach(strong => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const color = isDark
      ? 'rgba(125, 211, 252, 0.32)'
      : 'rgba(255, 107, 107, 0.22)';
    strong.style.background = `linear-gradient(120deg, ${color}, ${color})`;
    strong.style.backgroundRepeat = 'no-repeat';
    strong.style.backgroundPosition = '0 92%';
    strong.style.backgroundSize = '0% 35%';
    strong.style.transition = 'background-size 0.9s cubic-bezier(0.65, 0, 0.35, 1)';
    strong.style.padding = '0 2px';

    ScrollTrigger.create({
      trigger: strong,
      start: 'top 85%',
      onEnter: () => {
        strong.style.backgroundSize = '100% 35%';
      }
    });
  });

  // ============================================
  // TIMELINE — PROGRESSIVE REVEAL WITH ENERGY FLOW
  // ============================================
  gsap.set('.life-timeline-title', { opacity: 0, y: 30, scale: 0.9 });
  gsap.set('.life-step', { opacity: 0, y: 50, scale: 0 });
  gsap.set('.life-step-line', { scaleX: 0, transformOrigin: 'left center' });

  gsap.timeline({
    scrollTrigger: {
      trigger: '.life-timeline',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })
  .to('.life-timeline-title', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.5)'
  })
  .to('.life-step', {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.18,
    ease: 'elastic.out(1, 0.6)'
  }, '-=0.3')
  .to('.life-step-line', {
    scaleX: 1,
    duration: 0.5,
    stagger: 0.18,
    ease: 'power2.inOut'
  }, '-=0.9');

  // Continuous energy pulse on active step
  const activeDot = document.querySelector('.life-step.active .life-step-dot');
  if (activeDot) {
    gsap.to(activeDot, {
      boxShadow: '0 0 40px rgba(46, 196, 182, 0.9), 0 0 60px rgba(15, 94, 168, 0.5)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // Floating dots
  gsap.utils.toArray('.life-step-dot').forEach((dot, i) => {
    gsap.to(dot, {
      y: -3,
      duration: 2 + (i * 0.2),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.3
    });
  });

  // ============================================
  // PARALLAX EFFECTS (Desktop only)
  // ============================================
  if (window.innerWidth > 768) {
    // Photo parallax
    gsap.to('.about-image-card', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    // Stats parallax (slower)
    gsap.to('.about-stats', {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    });

    // Info list parallax
    gsap.to('.about-info-list', {
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-info-list',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2.5
      }
    });

    // Quote float
    gsap.to('.profil-quote', {
      y: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: '.profil-quote',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    });

    // Narasi parallax (each different speed)
    gsap.utils.toArray('.profil-narasi').forEach((narasi, i) => {
      gsap.to(narasi, {
        y: -15 - (i * 5),
        ease: 'none',
        scrollTrigger: {
          trigger: narasi,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5 + (i * 0.5)
        }
      });
    });
  }

  // ============================================
  // MOUSE-FOLLOWING TILT ON PHOTO
  // ============================================
  const photoCard = document.querySelector('.about-image-card');
  if (photoCard && window.innerWidth > 768) {
    let bounds;
    const updateBounds = () => { bounds = photoCard.getBoundingClientRect(); };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds, { passive: true });

    photoCard.addEventListener('mousemove', e => {
      if (!bounds) return;
      const x = (e.clientX - bounds.left) / bounds.width - 0.5;
      const y = (e.clientY - bounds.top) / bounds.height - 0.5;
      gsap.to(photoCard, {
        rotateY: x * 12,
        rotateX: -y * 12,
        scale: 1.03,
        duration: 0.6,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    });

    photoCard.addEventListener('mouseleave', () => {
      gsap.to(photoCard, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  }

  // ============================================
  // MAGNETIC HOVER ON STATS
  // ============================================
  document.querySelectorAll('.about-stat').forEach(stat => {
    const svg = stat.querySelector('svg');

    stat.addEventListener('mousemove', e => {
      const bounds = stat.getBoundingClientRect();
      const x = (e.clientX - bounds.left - bounds.width / 2) * 0.3;
      const y = (e.clientY - bounds.top - bounds.height / 2) * 0.3;
      gsap.to(stat, { x, y, duration: 0.3, ease: 'power2.out' });
      if (svg) gsap.to(svg, { rotation: x * 0.3, scale: 1.15, duration: 0.3 });
    });

    stat.addEventListener('mouseleave', () => {
      gsap.to(stat, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      if (svg) gsap.to(svg, { rotation: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });

  // ============================================
  // INFO ITEM HOVER WITH ICON SPIN
  // ============================================
  document.querySelectorAll('.about-info-item').forEach(item => {
    const icon = item.querySelector('.info-icon');
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { x: 12, duration: 0.4, ease: 'power3.out' });
      if (icon) gsap.to(icon, {
        rotation: 360,
        scale: 1.2,
        duration: 0.7,
        ease: 'back.out(2)'
      });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { x: 0, duration: 0.4, ease: 'power3.out' });
      if (icon) gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });

  // ============================================
  // TIMELINE DOT HOVER WITH RIPPLE
  // ============================================
  document.querySelectorAll('.life-step').forEach(step => {
    const dot = step.querySelector('.life-step-dot');
    const label = step.querySelector('.life-step-label');
    if (!dot) return;

    step.addEventListener('mouseenter', () => {
      gsap.to(dot, {
        scale: 1.4,
        y: -8,
        rotation: 360,
        duration: 0.5,
        ease: 'back.out(2)'
      });
      if (label) gsap.to(label, {
        y: -4,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    step.addEventListener('mouseleave', () => {
      const isActive = step.classList.contains('active');
      gsap.to(dot, {
        scale: isActive ? 1.08 : 1,
        y: 0,
        rotation: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)'
      });
      if (label) gsap.to(label, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  });

  // ============================================
  // PHOTO HOVER ZOOM (override magnet on touch)
  // ============================================
  const aboutImg = document.querySelector('.about-image-card img');
  if (aboutImg) {
    const imgWrapper = aboutImg.closest('.about-image-card');
    imgWrapper.addEventListener('mouseenter', () => {
      gsap.to(aboutImg, { scale: 1.1, duration: 0.7, ease: 'power3.out' });
    });
    imgWrapper.addEventListener('mouseleave', () => {
      gsap.to(aboutImg, { scale: 1, duration: 0.7, ease: 'power3.out' });
    });
  }

  // ============================================
  // LIVE AMBIENT ANIMATIONS (Always running)
  // ============================================

  // --- 1. AURORA BACKGROUND ORBS ---
  const auroraContainer = document.createElement('div');
  auroraContainer.className = 'profil-aurora';
  auroraContainer.setAttribute('aria-hidden', 'true');
  auroraContainer.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;border-radius:inherit;';
  aboutSection.style.position = 'relative';
  aboutSection.style.overflow = 'hidden';
  aboutSection.insertBefore(auroraContainer, aboutSection.firstChild);

  const orbColors = [
    'rgba(46, 196, 182, 0.12)',
    'rgba(57, 189, 235, 0.1)',
    'rgba(155, 114, 207, 0.08)',
    'rgba(241, 192, 91, 0.08)'
  ];

  orbColors.forEach((color, i) => {
    const orb = document.createElement('div');
    orb.style.cssText = `
      position: absolute;
      width: ${200 + i * 80}px;
      height: ${200 + i * 80}px;
      border-radius: 50%;
      background: radial-gradient(circle, ${color} 0%, transparent 70%);
      filter: blur(40px);
      opacity: 0.7;
    `;
    auroraContainer.appendChild(orb);

    gsap.set(orb, {
      x: Math.random() * aboutSection.offsetWidth,
      y: Math.random() * aboutSection.offsetHeight
    });

    gsap.to(orb, {
      x: `random(0, ${aboutSection.offsetWidth})`,
      y: `random(0, ${aboutSection.offsetHeight})`,
      duration: 12 + i * 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 2
    });
  });

  // --- 2. NARASI CARD BREATHING GLOW ---
  document.querySelectorAll('.profil-narasi').forEach((narasi, i) => {
    gsap.to(narasi, {
      boxShadow: '0 4px 30px rgba(46, 196, 182, 0.12), 0 0 60px rgba(57, 189, 235, 0.06)',
      duration: 3 + i * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 1
    });
  });

  // --- 4. QUOTE GRADIENT SHIFT ---
  const quote = document.querySelector('.profil-quote');
  if (quote) {
    gsap.to(quote, {
      backgroundImage: 'linear-gradient(135deg, rgba(15, 94, 168, 0.08), rgba(46, 196, 182, 0.06))',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(quote, {
      borderColor: 'rgba(46, 196, 182, 0.25)',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5
    });
  }

  // --- 6. TIMELINE DOT HEARTBEAT ---
  document.querySelectorAll('.life-step-dot').forEach((dot, i) => {
    if (dot.closest('.life-step.active')) return;
    gsap.to(dot, {
      scale: 1.06,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.4
    });
  });

  // --- 8. PHOTO AMBIENT PARTICLES ---
  const photoCardAmbient = document.querySelector('.about-image-card');
  if (photoCardAmbient) {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;border-radius:inherit;z-index:2;';
    photoCardAmbient.appendChild(particleContainer);

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      const size = 3 + Math.random() * 4;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, ${0.4 + Math.random() * 0.3});
        box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.3);
      `;
      particleContainer.appendChild(particle);

      gsap.set(particle, {
        x: Math.random() * photoCardAmbient.offsetWidth,
        y: Math.random() * photoCardAmbient.offsetHeight
      });

      gsap.to(particle, {
        x: `random(10, ${photoCardAmbient.offsetWidth - 10})`,
        y: `random(10, ${photoCardAmbient.offsetHeight - 10})`,
        opacity: `random(0.2, 0.8)`,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 3
      });
    }
  }
})();
