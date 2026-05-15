export function initEp2Animation() {
  var wrapper = document.getElementById('eportfolio2Wrapper');
  if (!wrapper) return;

  // Scroll-spy: update active nav link based on scroll position
  var navLinks = wrapper.querySelectorAll('#ep2NavLinks a');
  var sections = wrapper.querySelectorAll('section[id]');
  var navbar = document.getElementById('ep2Navbar');

  function updateActiveNav() {
    var scrollTop = wrapper.scrollTop;
    var wrapperH = wrapper.clientHeight;
    var current = '';
    sections.forEach(function(section) {
      if (section.offsetTop <= scrollTop + wrapperH * 0.5) {
        current = section.id;
      }
    });
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollTop > 24);
    }
  }

  wrapper.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  initEp2RevealAnimations(wrapper);
  initEp2HeroParallax(wrapper);

  // Smooth scroll for nav links (snap will handle the rest)
  wrapper.querySelectorAll('a[href^="#ep2-"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var target = wrapper.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}


function initEp2RevealAnimations(wrapper) {
  if (wrapper.dataset.animationsBound === '1') return;
  wrapper.dataset.animationsBound = '1';

  var animatedItems = wrapper.querySelectorAll([
    '.ep2-hero-left',
    '.ep2-hero-greeting',
    '.ep2-title',
    '.ep2-subtitle',
    '.ep2-hero-quote',
    '.ep2-hero-actions',
    '.ep2-hero-preview-card',
    '.section-header',
    '.ep2-question-card',
    '.ep2-quote-banner',
    '.ep2-filosofi-mini-card',
    '.ep2-values-section',
    '.ep2-value-mini',
    '.ep2-footer .footer-brand',
    '.ep2-footer .footer-sitemap',
    '.ep2-footer .footer-bottom'
  ].join(','));

  animatedItems.forEach(function(item, index) {
    item.classList.add('ep2-animate');
    item.style.setProperty('--ep2-delay', Math.min(index % 6, 5) * 80 + 'ms');
  });

  var floatItems = wrapper.querySelectorAll('.ep2-hero-photo, .ep2-hero-preview-icon');
  floatItems.forEach(function(item, index) {
    item.classList.add('ep2-float-soft');
    item.style.animationDelay = (index * -0.7) + 's';
  });

  if (!('IntersectionObserver' in window)) {
    animatedItems.forEach(function(item) { item.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: wrapper,
    threshold: 0.15,
    rootMargin: '0px 0px -8% 0px'
  });

  animatedItems.forEach(function(item) { observer.observe(item); });
}

function initEp2HeroParallax(wrapper) {
  if (wrapper.dataset.parallaxBound === '1') return;
  wrapper.dataset.parallaxBound = '1';

  var ticking = false;
  function update() {
    ticking = false;
    var shift = Math.min(wrapper.scrollTop * 0.08, 28);
    wrapper.style.setProperty('--ep2-bg-shift', shift.toFixed(2));
  }

  wrapper.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

export function refreshEp2Animation() {
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
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    setTimeout(function() {
      if (modalContent) modalContent.innerHTML = '';
    }, 300);
  }

  // Question card click -> open modal
  wrapper.querySelectorAll('[data-ep2-modal]').forEach(function(card) {
    card.addEventListener('click', function() {
      openModal(card.getAttribute('data-ep2-modal'));
    });
  });

  // Filosofi expand buttons -> open modal
  wrapper.querySelectorAll('[data-ep2-expand]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = 'ep2-' + btn.getAttribute('data-ep2-expand');
      openModal(id);
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

  // EP2 theme toggle (syncs with EP1 toggle via data-theme attribute on html)
  var ep2ThemeToggle = document.getElementById('ep2ThemeToggle');
  if (ep2ThemeToggle) {
    var ep2ThemeIcon = ep2ThemeToggle.querySelector('.theme-icon');
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    if (ep2ThemeIcon) ep2ThemeIcon.textContent = current === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    ep2ThemeToggle.addEventListener('click', function() {
      var now = document.documentElement.getAttribute('data-theme') || 'light';
      var next = now === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      if (ep2ThemeIcon) ep2ThemeIcon.textContent = next === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
      var ep1Icon = document.querySelector('#themeToggle .theme-icon');
      if (ep1Icon) ep1Icon.textContent = next === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    });
  }
}
