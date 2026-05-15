export function initEp2Animation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var wrapper = document.getElementById('eportfolio2Wrapper');
  if (!wrapper || wrapper.style.display === 'none') return;

  // Section headers
  wrapper.querySelectorAll('.section-header').forEach(function(header) {
    var badge = header.querySelector('.section-badge');
    var title = header.querySelector('.section-title');
    var subtitle = header.querySelector('.section-subtitle');

    if (badge) gsap.set(badge, { opacity: 0, scale: 0, rotation: -180 });
    if (title) gsap.set(title, { opacity: 0, y: 40, filter: 'blur(8px)' });
    if (subtitle) gsap.set(subtitle, { opacity: 0, y: 20 });

    var tl = gsap.timeline({
      scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none none' }
    });
    if (badge) tl.to(badge, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    if (title) tl.to(title, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }, '-=0.2');
    if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
  });

  // EP2 Cards
  wrapper.querySelectorAll('.ep2-card').forEach(function(card) {
    gsap.set(card, { opacity: 0, y: 40 });
    gsap.to(card, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 82%', toggleActions: 'play none none none' }
    });
  });

  // Timeline items
  wrapper.querySelectorAll('.ep2-timeline-item').forEach(function(item, i) {
    gsap.set(item, { opacity: 0, x: -30 });
    gsap.to(item, {
      opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.1,
      scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Challenge items
  wrapper.querySelectorAll('.ep2-challenge-item').forEach(function(item, i) {
    gsap.set(item, { opacity: 0, y: 30, scale: 0.95 });
    gsap.to(item, {
      opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', delay: i * 0.08,
      scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Feedback items
  wrapper.querySelectorAll('.ep2-feedback-item').forEach(function(item, i) {
    gsap.set(item, { opacity: 0, y: 30 });
    gsap.to(item, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: i * 0.1,
      scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Philosophy quote card
  var quoteCard = wrapper.querySelector('.ep2-quote-card');
  if (quoteCard) {
    gsap.set(quoteCard, { opacity: 0, scale: 0.9, filter: 'blur(6px)' });
    gsap.to(quoteCard, {
      opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power4.out',
      scrollTrigger: { trigger: quoteCard, start: 'top 80%', toggleActions: 'play none none none' }
    });
  }

  // Filosofi cards
  wrapper.querySelectorAll('.ep2-filosofi-card').forEach(function(card, i) {
    gsap.set(card, { opacity: 0, y: 40 });
    gsap.to(card, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.12,
      scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Value cards
  wrapper.querySelectorAll('.ep2-value-card').forEach(function(card, i) {
    gsap.set(card, { opacity: 0, y: 30, scale: 0.85 });
    gsap.to(card, {
      opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.6)', delay: i * 0.1,
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Scroll-spy for EP2 navbar
  var navLinks = wrapper.querySelectorAll('#ep2NavLinks a');
  var sections = wrapper.querySelectorAll('.ep2-hero, .ep2-section');
  if (navLinks.length && sections.length) {
    sections.forEach(function(section) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: function() { updateActiveNav(section.id); },
        onEnterBack: function() { updateActiveNav(section.id); }
      });
    });
  }

  function updateActiveNav(id) {
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + id) link.classList.add('active');
    });
  }
}

export function refreshEp2Animation() {
  ScrollTrigger.getAll().forEach(function(st) {
    if (st.trigger && st.trigger.closest && st.trigger.closest('.eportfolio2-wrapper')) {
      st.kill();
    }
  });
  initEp2Animation();
  initEp2Interactions();
}

function initEp2Interactions() {
  var wrapper = document.getElementById('eportfolio2Wrapper');
  if (!wrapper || wrapper.dataset.interactionsBound === '1') return;
  wrapper.dataset.interactionsBound = '1';

  var overlay = document.getElementById('ep2ModalOverlay');
  var modalContent = document.getElementById('ep2ModalContent');
  var closeBtn = document.getElementById('ep2ModalClose');

  function openModal(templateId) {
    var template = document.getElementById(templateId + '-template');
    if (!template || !overlay || !modalContent) return;
    modalContent.innerHTML = '';
    modalContent.appendChild(template.content.cloneNode(true));
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(function() {
      if (modalContent) modalContent.innerHTML = '';
    }, 300);
  }

  // Question card click → open modal
  wrapper.querySelectorAll('[data-ep2-modal]').forEach(function(card) {
    card.addEventListener('click', function() {
      openModal(card.getAttribute('data-ep2-modal'));
    });
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) closeModal();
  });

  // Filosofi expand/collapse
  wrapper.querySelectorAll('[data-ep2-expand]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var targetId = btn.getAttribute('data-ep2-expand');
      var target = document.getElementById(targetId);
      if (!target) return;
      var isOpen = target.classList.toggle('open');
      btn.classList.toggle('expanded', isOpen);
      btn.querySelector('span') ||
        (btn.firstChild.nodeType === 3 ? null : null);
      var label = isOpen ? 'Tutup' : 'Baca Selengkapnya';
      btn.innerHTML = label + ' <i class="fa-solid fa-chevron-down"></i>';
      if (isOpen) btn.classList.add('expanded');
    });
  });

  // EP2 theme toggle (syncs with EP1 toggle via data-theme attribute on html)
  var ep2ThemeToggle = document.getElementById('ep2ThemeToggle');
  if (ep2ThemeToggle) {
    var ep2ThemeIcon = ep2ThemeToggle.querySelector('.theme-icon');
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    if (ep2ThemeIcon) ep2ThemeIcon.textContent = current === 'dark' ? '☀️' : '🌙';
    ep2ThemeToggle.addEventListener('click', function() {
      var now = document.documentElement.getAttribute('data-theme') || 'light';
      var next = now === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      if (ep2ThemeIcon) ep2ThemeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
      // Sync EP1 toggle icon if present
      var ep1Icon = document.querySelector('#themeToggle .theme-icon');
      if (ep1Icon) ep1Icon.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }
}
