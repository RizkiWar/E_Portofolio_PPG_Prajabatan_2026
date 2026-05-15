/* ============================================
   KONTAK SECTION — PREMIUM ANIMATION
   ============================================ */
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const section = document.querySelector('#contact');
  if (!section) return;

  // ============================================
  // SECTION HEADER
  // ============================================
  gsap.set('#contact .section-badge', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('#contact .section-title', { opacity: 0, y: 60, filter: 'blur(10px)' });
  gsap.set('#contact .section-subtitle', { opacity: 0, y: 30 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#contact .section-header',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
  .to('#contact .section-badge', {
    opacity: 1, scale: 1, rotation: 0,
    duration: 0.8, ease: 'elastic.out(1, 0.5)'
  })
  .to('#contact .section-title', {
    opacity: 1, y: 0, filter: 'blur(0px)',
    duration: 0.7, ease: 'power3.out'
  }, '-=0.4')
  .to('#contact .section-subtitle', {
    opacity: 1, y: 0,
    duration: 0.5, ease: 'power2.out'
  }, '-=0.3');

  // ============================================
  // CONTACT INFO LEFT — SLIDE FROM LEFT
  // ============================================
  const contactInfo = section.querySelector('.contact-info');
  if (contactInfo) {
    const heading = contactInfo.querySelector('h3');
    const desc = contactInfo.querySelector('p');
    const items = contactInfo.querySelectorAll('.contact-detail-item');

    gsap.set(contactInfo, { opacity: 0, x: -60 });
    gsap.set(heading, { opacity: 0, y: 20 });
    gsap.set(desc, { opacity: 0, y: 15, filter: 'blur(6px)' });
    gsap.set(items, { opacity: 0, x: -40, scale: 0.9 });

    gsap.timeline({
      scrollTrigger: {
        trigger: contactInfo,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    })
    .to(contactInfo, {
      opacity: 1, x: 0,
      duration: 0.8, ease: 'power3.out'
    })
    .to(heading, {
      opacity: 1, y: 0,
      duration: 0.5, ease: 'back.out(1.5)'
    }, '-=0.5')
    .to(desc, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 0.6, ease: 'power2.out'
    }, '-=0.3')
    .to(items, {
      opacity: 1, x: 0, scale: 1,
      duration: 0.5, stagger: 0.12, ease: 'back.out(1.5)'
    }, '-=0.2');
  }

  // ============================================
  // CONTACT FORM RIGHT — SLIDE FROM RIGHT
  // ============================================
  const contactForm = section.querySelector('.contact-form');
  if (contactForm) {
    const formGroups = contactForm.querySelectorAll('.form-group');
    const submitBtn = contactForm.querySelector('.form-submit');

    gsap.set(contactForm, { opacity: 0, x: 60 });
    gsap.set(formGroups, { opacity: 0, y: 20 });
    gsap.set(submitBtn, { opacity: 0, scale: 0.8 });

    gsap.timeline({
      scrollTrigger: {
        trigger: contactForm,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    })
    .to(contactForm, {
      opacity: 1, x: 0,
      duration: 0.8, ease: 'power3.out'
    })
    .to(formGroups, {
      opacity: 1, y: 0,
      duration: 0.5, stagger: 0.1, ease: 'power2.out'
    }, '-=0.5')
    .to(submitBtn, {
      opacity: 1, scale: 1,
      duration: 0.5, ease: 'back.out(1.7)'
    }, '-=0.2');
  }

  // ============================================
  // HOVER MICRO-INTERACTIONS — CONTACT ITEMS
  // ============================================
  section.querySelectorAll('.contact-detail-item').forEach(item => {
    const icon = item.querySelector('.detail-icon');

    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        x: 8, y: -2,
        duration: 0.35, ease: 'power2.out'
      });
      if (icon) gsap.to(icon, {
        scale: 1.15, rotation: -5,
        duration: 0.35, ease: 'back.out(2)'
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0, y: 0,
        duration: 0.4, ease: 'power2.out'
      });
      if (icon) gsap.to(icon, {
        scale: 1, rotation: 0,
        duration: 0.4, ease: 'elastic.out(1, 0.4)'
      });
    });
  });

  // ============================================
  // FORM INPUTS — FOCUS GLOW
  // ============================================
  contactForm && contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, {
        boxShadow: '0 0 0 3px rgba(46, 196, 182, 0.18)',
        duration: 0.3, ease: 'power2.out'
      });
    });
    input.addEventListener('blur', () => {
      gsap.to(input, {
        boxShadow: 'none',
        duration: 0.3, ease: 'power2.out'
      });
    });
  });

  // ============================================
  // SUBMIT BUTTON HOVER
  // ============================================
  const submitBtn = contactForm && contactForm.querySelector('.form-submit');
  if (submitBtn) {
    submitBtn.addEventListener('mouseenter', () => {
      gsap.to(submitBtn, { y: -3, scale: 1.03, duration: 0.3, ease: 'back.out(2)' });
    });
    submitBtn.addEventListener('mouseleave', () => {
      gsap.to(submitBtn, { y: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
    });
  }
  // ============================================
  // EMAIL POPUP OVERLAY
  // ============================================
  const emailChooser = section.querySelector('.email-chooser');
  const emailPopup = document.getElementById('emailPopup');
  if (emailChooser && emailPopup) {
    const popupBox = emailPopup.querySelector('.email-popup-box');
    const closeBtn = emailPopup.querySelector('.email-popup-close');

    function openPopup() {
      emailPopup.style.display = 'flex';
      gsap.fromTo(emailPopup, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(popupBox,
        { scale: 0.7, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.6)' }
      );
    }

    function closePopup() {
      gsap.to(popupBox, { scale: 0.8, opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
      gsap.to(emailPopup, {
        opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => { emailPopup.style.display = 'none'; }
      });
    }

    emailChooser.addEventListener('click', openPopup);
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    emailPopup.addEventListener('click', (e) => {
      if (e.target === emailPopup) closePopup();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && emailPopup.style.display === 'flex') closePopup();
    });

    // Hover effects on popup links
    emailPopup.querySelectorAll('a').forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1.03, x: 4, duration: 0.25, ease: 'power2.out' });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, x: 0, duration: 0.25, ease: 'power2.out' });
      });
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        setTimeout(closePopup, 500);
      });
    });
  }
})();
