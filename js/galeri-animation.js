/* ============================================
   GALERI SECTION — ANIMATION + LIGHTBOX
   ============================================ */
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const section = document.querySelector('#gallery');
  if (!section) return;

  // ============================================
  // SECTION HEADER
  // ============================================
  gsap.set('#gallery .section-badge', { opacity: 0, scale: 0, rotation: -180 });
  gsap.set('#gallery .section-title', { opacity: 0, y: 60, filter: 'blur(10px)' });
  gsap.set('#gallery .section-subtitle', { opacity: 0, y: 30 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#gallery .section-header',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })
  .to('#gallery .section-badge', {
    opacity: 1, scale: 1, rotation: 0,
    duration: 0.8, ease: 'elastic.out(1, 0.5)'
  })
  .to('#gallery .section-title', {
    opacity: 1, y: 0, filter: 'blur(0px)',
    duration: 0.7, ease: 'power3.out'
  }, '-=0.4')
  .to('#gallery .section-subtitle', {
    opacity: 1, y: 0,
    duration: 0.5, ease: 'power2.out'
  }, '-=0.3');

  // ============================================
  // GALLERY ITEMS — STAGGERED ENTRANCE
  // ============================================
  const items = gsap.utils.toArray('#gallery .gallery-item');

  gsap.set(items, { opacity: 0, scale: 0.85, y: 40 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#gallery .gallery-accordion',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })
  .to(items, {
    opacity: 1, scale: 1, y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.4)'
  });

  // ============================================
  // HOVER — ZOOM + CAPTION REVEAL
  // ============================================
  items.forEach(item => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');

    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        scale: 1.03, y: -6,
        boxShadow: '0 20px 50px rgba(15, 94, 168, 0.2)',
        duration: 0.4, ease: 'power2.out'
      });
      if (img) gsap.to(img, { scale: 1.1, duration: 0.6, ease: 'power2.out' });
      if (caption) gsap.to(caption, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        scale: 1, y: 0,
        boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
        duration: 0.5, ease: 'power2.out'
      });
      if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' });
      if (caption) gsap.to(caption, { y: 20, opacity: 0.8, duration: 0.3, ease: 'power2.in' });
    });
  });

  // ============================================
  // LIGHTBOX FUNCTIONALITY
  // ============================================
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const prevBtn = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
  const nextBtn = lightbox ? lightbox.querySelector('.lightbox-next') : null;

  let currentIndex = 0;

  function openLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('lightbox-open');
    var navbar = document.getElementById('navbar');
    var scrollProg = document.getElementById('scrollProgress');
    var scrollRail = document.querySelector('.scroll-rail');
    if (navbar) navbar.style.display = 'none';
    if (scrollProg) scrollProg.style.display = 'none';
    if (scrollRail) scrollRail.style.display = 'none';

    gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(lightboxContent, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.1 });
  }

  function closeLightbox() {
    if (!lightbox) return;
    gsap.to(lightbox, {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.body.classList.remove('lightbox-open');
        var navbar = document.getElementById('navbar');
        var scrollProg = document.getElementById('scrollProgress');
        var scrollRail = document.querySelector('.scroll-rail');
        if (navbar) navbar.style.display = '';
        if (scrollProg) scrollProg.style.display = '';
        if (scrollRail) scrollRail.style.display = '';
        lightboxContent.innerHTML = '';
      }
    });
  }

  function updateLightboxContent() {
    const item = items[currentIndex];
    if (!item) return;
    const type = item.getAttribute('data-type');
    const src = item.getAttribute('data-src');
    const caption = item.querySelector('.gallery-caption');
    const title = caption ? caption.querySelector('h3').textContent : '';
    const desc = caption ? caption.querySelector('p').textContent : '';

    if (type === 'video') {
      lightboxContent.innerHTML = '<iframe src="' + src + '" style="width:100%;height:70vh;border:none;border-radius:12px;" allowfullscreen></iframe>';
    } else {
      lightboxContent.innerHTML = '<img src="' + src + '" alt="' + title + '" style="max-width:100%;max-height:80vh;border-radius:12px;object-fit:contain;" />';
    }

    lightboxCaption.innerHTML = '<h3>' + title + '</h3><p>' + desc + '</p>';
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    gsap.to(lightboxContent, {
      x: -30, opacity: 0, duration: 0.2,
      onComplete: () => {
        updateLightboxContent();
        gsap.fromTo(lightboxContent, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
      }
    });
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    gsap.to(lightboxContent, {
      x: 30, opacity: 0, duration: 0.2,
      onComplete: () => {
        updateLightboxContent();
        gsap.fromTo(lightboxContent, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
      }
    });
  }

  // Event listeners
  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
    item.style.cursor = 'pointer';
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
})();
