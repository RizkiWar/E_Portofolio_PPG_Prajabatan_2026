/* ============================================
   EP1 UNIFIED ANIMATION ENGINE
   Single file replacing all per-section animations
   Dependencies: GSAP + ScrollTrigger (loaded globally)
   ============================================ */

export function initEp1Animations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.section, .footer').forEach(function(s) {
      s.style.visibility = 'visible';
      s.style.opacity = '1';
    });
    return;
  }

  initHeroEntrance();
  initSectionEntrances();
  initParallaxScrub();
  initHoverMicroMotion();
  initLiveAmbient();
  initScrollUI();
}

/* ============================================
   UTILITY: Word Split
   ============================================ */
function splitWords(el) {
  var text = el.textContent.trim();
  var words = text.split(/\s+/);
  el.innerHTML = '';
  words.forEach(function(word) {
    var span = document.createElement('span');
    span.textContent = word + ' ';
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, opacity';
    el.appendChild(span);
  });
  return el.querySelectorAll('span');
}

/* ============================================
   HERO CINEMATIC ENTRANCE
   ============================================ */
function initHeroEntrance() {
  var hero = document.querySelector('#hero');
  if (!hero) return;

  var tl = gsap.timeline({ delay: 0.3 });

  var imageWrapper = hero.querySelector('.hero-image-wrapper');
  if (imageWrapper) {
    tl.fromTo(imageWrapper,
      { autoAlpha: 0, scale: 0.6, rotation: -12 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.55)' }
    );
  }

  var heroName = hero.querySelector('.hero-name');
  if (heroName) {
    var words = splitWords(heroName);
    tl.fromTo(words,
      { yPercent: 90, rotationX: 50, autoAlpha: 0 },
      { yPercent: 0, rotationX: 0, autoAlpha: 1, duration: 0.85, stagger: 0.045, ease: 'power3.out' },
      '-=0.7'
    );
  }

  var greeting = hero.querySelector('.hero-greeting');
  if (greeting) {
    tl.fromTo(greeting,
      { autoAlpha: 0, x: -30 },
      { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.6'
    );
  }

  var role = hero.querySelector('.hero-role');
  if (role) {
    tl.fromTo(role,
      { autoAlpha: 0, y: 15 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );
  }

  var desc = hero.querySelector('.hero-desc');
  if (desc) {
    tl.fromTo(desc,
      { autoAlpha: 0, y: 20, filter: 'blur(4px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    );
  }

  var actions = hero.querySelectorAll('.hero-actions .btn');
  if (actions.length) {
    tl.fromTo(actions,
      { autoAlpha: 0, y: 20, scale: 0.9 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.3'
    );
  }

  var social = hero.querySelectorAll('.hero-social a');
  if (social.length) {
    tl.fromTo(social,
      { autoAlpha: 0, scale: 0, rotation: -180 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(2.5)' },
      '-=0.3'
    );
  }

  var badges = hero.querySelectorAll('.hero-badge');
  if (badges.length) {
    tl.fromTo(badges,
      { autoAlpha: 0, scale: 0.5, y: 20 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'elastic.out(1, 0.6)' },
      '-=0.4'
    );
  }
}

/* ============================================
   SECTION SCROLL ENTRANCES
   ============================================ */
function initSectionEntrances() {
  var sections = document.querySelectorAll('section.section[id]');
  sections.forEach(function(section) {
    if (section.closest('.eportfolio2-wrapper')) return;
    animateSection(section);
  });
  animateFooter();
}

function animateSectionHeader(section) {
  var badge = section.querySelector('.section-badge');
  var title = section.querySelector('.section-title');
  var subtitle = section.querySelector('.section-subtitle');
  var tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 78%', once: true }
  });

  if (badge) {
    tl.fromTo(badge,
      { autoAlpha: 0, scale: 0, rotation: -180 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }
    );
  }
  if (title) {
    var words = splitWords(title);
    tl.fromTo(words,
      { yPercent: 80, rotationX: 45, autoAlpha: 0 },
      { yPercent: 0, rotationX: 0, autoAlpha: 1, duration: 0.8, stagger: 0.035, ease: 'power3.out' },
      '-=0.4'
    );
  }
  if (subtitle) {
    tl.fromTo(subtitle,
      { autoAlpha: 0, y: 15, filter: 'blur(3px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );
  }
  return tl;
}

function animateSection(section) {
  var id = section.id;
  animateSectionHeader(section);

  switch (id) {
    case 'about': animateAbout(section); break;
    case 'education': animateEducation(section); break;
    case 'portfolio': animatePortfolio(section); break;
    case 'penilaian': animatePenilaian(section); break;
    case 'model-guru': animateModelGuru(section); break;
    case 'skills': animateSkills(section); break;
    case 'certificates': animateCertificates(section); break;
    case 'gallery': animateGallery(section); break;
    case 'contact': animateContact(section); break;
  }
}

function animateAbout(section) {
  var imageCard = section.querySelector('.about-image-card');
  var stats = section.querySelectorAll('.about-stat');
  var infoItems = section.querySelectorAll('.about-info-item');
  var quote = section.querySelector('.profil-quote');
  var narasi = section.querySelectorAll('.profil-narasi');
  var lifeSteps = section.querySelectorAll('.life-step');

  var tl = gsap.timeline({ scrollTrigger: { trigger: section.querySelector('.about-grid'), start: 'top 75%', once: true } });

  if (imageCard) {
    tl.fromTo(imageCard,
      { autoAlpha: 0, scale: 0.9, y: 30 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.9, ease: 'power2.out' }
    );
  }
  if (stats.length) {
    tl.fromTo(stats,
      { autoAlpha: 0, scale: 0.5, y: 20 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'elastic.out(1, 0.6)' },
      '-=0.4'
    );
  }
  if (infoItems.length) {
    tl.fromTo(infoItems,
      { autoAlpha: 0, x: -30 },
      { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
      '-=0.3'
    );
  }
  if (quote) {
    tl.fromTo(quote,
      { autoAlpha: 0, scale: 0.92, filter: 'blur(4px)' },
      { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
      '-=0.2'
    );
  }
  if (narasi.length) {
    tl.fromTo(narasi,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' },
      '-=0.3'
    );
  }
  if (lifeSteps.length) {
    gsap.fromTo(lifeSteps,
      { autoAlpha: 0, scale: 0.6, y: 20 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'elastic.out(1, 0.6)',
        scrollTrigger: { trigger: section.querySelector('.life-timeline'), start: 'top 82%', once: true }
      }
    );
  }
}

function animateEducation(section) {
  var items = section.querySelectorAll('.timeline-item');
  items.forEach(function(item, i) {
    var card = item.querySelector('.timeline-card');
    var dot = item.querySelector('.timeline-dot');
    var direction = i % 2 === 0 ? -1 : 1;

    var tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 80%', once: true } });

    if (dot) {
      tl.fromTo(dot,
        { autoAlpha: 0, scale: 0 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
      );
    }
    if (card) {
      tl.fromTo(card,
        { autoAlpha: 0, x: direction * 40, rotateY: direction * 12, scale: 0.92 },
        { autoAlpha: 1, x: 0, rotateY: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.3'
      );
    }
  });
}

function animatePortfolio(section) {
  var tabs = section.querySelectorAll('.tab-btn');
  var filters = section.querySelectorAll('.filter-btn');
  var cards = section.querySelectorAll('.portfolio-card');

  var tl = gsap.timeline({ scrollTrigger: { trigger: section.querySelector('.portfolio-tabs') || section, start: 'top 78%', once: true } });

  if (tabs.length) {
    tl.fromTo(tabs,
      { autoAlpha: 0, y: -15, scale: 0.85 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.7)' }
    );
  }
  if (filters.length) {
    tl.fromTo(filters,
      { autoAlpha: 0, y: -10, scale: 0.85 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.7)' },
      '-=0.3'
    );
  }

  var visibleCards = Array.from(cards).filter(function(c) { return c.offsetParent !== null; });
  if (visibleCards.length) {
    gsap.fromTo(visibleCards,
      { autoAlpha: 0, y: 50, rotateX: 10, scale: 0.9 },
      { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: section.querySelector('.portfolio-grid'), start: 'top 80%', once: true }
      }
    );
  }
}

function animatePenilaian(section) {
  var items = section.querySelectorAll('.accordion-item');
  if (items.length) {
    gsap.fromTo(items,
      { autoAlpha: 0, y: 30, scale: 0.95 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: items[0], start: 'top 80%', once: true }
      }
    );
  }
}

function animateModelGuru(section) {
  var philCard = section.querySelector('.philosophy-card');
  var pillars = section.querySelectorAll('.pillar-card');

  if (philCard) {
    gsap.fromTo(philCard,
      { autoAlpha: 0, rotateX: 8, y: 40, scale: 0.92 },
      { autoAlpha: 1, rotateX: 0, y: 0, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: philCard, start: 'top 78%', once: true }
      }
    );
  }
  if (pillars.length) {
    gsap.fromTo(pillars,
      { autoAlpha: 0, y: 50, rotateX: 10, scale: 0.88 },
      { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: pillars[0], start: 'top 80%', once: true }
      }
    );
  }
}

function animateSkills(section) {
  var tabs = section.querySelectorAll('.skills-tab-btn');
  var cards = section.querySelectorAll('.skills-panel.active .skill-item-card');

  if (tabs.length) {
    gsap.fromTo(tabs,
      { autoAlpha: 0, y: -15, scale: 0.85 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: tabs[0], start: 'top 82%', once: true }
      }
    );
  }
  if (cards.length) {
    gsap.fromTo(cards,
      { autoAlpha: 0, y: 40, rotateX: 12, scale: 0.85 },
      { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: cards[0], start: 'top 82%', once: true }
      }
    );
  }
}

function animateCertificates(section) {
  var cards = section.querySelectorAll('.cert-card');
  if (cards.length) {
    gsap.fromTo(cards,
      { autoAlpha: 0, y: 40, scale: 0.88 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: cards[0], start: 'top 82%', once: true }
      }
    );
  }
}

function animateGallery(section) {
  var items = section.querySelectorAll('.gallery-item');
  if (items.length) {
    gsap.fromTo(items,
      { autoAlpha: 0, scale: 0.85, y: 30 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: items[0], start: 'top 82%', once: true }
      }
    );
  }
}

function animateContact(section) {
  var info = section.querySelector('.contact-info');
  var form = section.querySelector('.contact-form');
  var details = section.querySelectorAll('.contact-detail-item');

  var tl = gsap.timeline({ scrollTrigger: { trigger: section.querySelector('.contact-grid'), start: 'top 78%', once: true } });

  if (info) {
    tl.fromTo(info,
      { autoAlpha: 0, x: -40 },
      { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    );
  }
  if (details.length) {
    tl.fromTo(details,
      { autoAlpha: 0, x: -20, scale: 0.95 },
      { autoAlpha: 1, x: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
      '-=0.4'
    );
  }
  if (form) {
    tl.fromTo(form,
      { autoAlpha: 0, x: 40 },
      { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
  }
}

function animateFooter() {
  var footer = document.querySelector('.footer:not(.ep2-footer)');
  if (!footer) return;

  var logo = footer.querySelector('.footer-logo');
  var tagline = footer.querySelector('.footer-tagline');
  var socialLinks = footer.querySelectorAll('.footer-social a');
  var sitemap = footer.querySelector('.footer-sitemap');

  var tl = gsap.timeline({ scrollTrigger: { trigger: footer, start: 'top 90%', once: true } });

  if (logo) tl.fromTo(logo, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  if (tagline) tl.fromTo(tagline, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
  if (socialLinks.length) {
    tl.fromTo(socialLinks,
      { autoAlpha: 0, scale: 0, rotation: -90 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(2)' },
      '-=0.2'
    );
  }
  if (sitemap) tl.fromTo(sitemap, { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
}

/* ============================================
   PARALLAX SCRUB
   ============================================ */
function initParallaxScrub() {
  var heroImage = document.querySelector('.hero-image-wrapper');
  if (heroImage) {
    gsap.to(heroImage, {
      yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
    });
  }

  var aboutImage = document.querySelector('.about-image-card');
  if (aboutImage) {
    gsap.to(aboutImage, {
      yPercent: -6, ease: 'none',
      scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 2 }
    });
  }

  var shapes = document.querySelectorAll('.floating-shapes .shape');
  shapes.forEach(function(shape, i) {
    gsap.to(shape, {
      yPercent: -25 - (i * 8), rotation: 20 + (i * 10), ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2.5 }
    });
  });

  var timelineDots = document.querySelectorAll('.timeline-dot');
  timelineDots.forEach(function(dot) {
    gsap.to(dot, {
      y: -8, ease: 'none',
      scrollTrigger: { trigger: dot, start: 'top bottom', end: 'bottom top', scrub: 3 }
    });
  });

  var pillarIcons = document.querySelectorAll('.pillar-icon');
  pillarIcons.forEach(function(icon) {
    gsap.to(icon, {
      y: -6, ease: 'none',
      scrollTrigger: { trigger: icon, start: 'top bottom', end: 'bottom top', scrub: 3 }
    });
  });
}

/* ============================================
   HOVER MICRO-MOTION
   ============================================ */
function initHoverMicroMotion() {
  var isTouchDevice = 'ontouchstart' in window;
  if (isTouchDevice) return;

  // 3D Card Tilt
  var tiltCards = document.querySelectorAll('.portfolio-card, .pillar-card, .skill-item-card, .cert-card, .timeline-card, .philosophy-card');
  tiltCards.forEach(function(card) {
    if (card.closest('.eportfolio2-wrapper')) return;
    card.style.transformStyle = 'preserve-3d';

    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { rotateY: x * 10, rotateX: -y * 6, scale: 1.02, duration: 0.3, ease: 'power2.out' });
    });

    card.addEventListener('mouseleave', function() {
      gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });

  // Icon elastic bounce
  var icons = document.querySelectorAll('.pillar-icon, .skill-item-icon, .cert-icon, .stat-icon, .detail-icon');
  icons.forEach(function(icon) {
    if (icon.closest('.eportfolio2-wrapper')) return;
    icon.addEventListener('mouseenter', function() {
      gsap.fromTo(icon, { scale: 1, rotation: 0 }, { scale: 1.25, rotation: 10, duration: 0.35, ease: 'back.out(3)', yoyo: true, repeat: 1 });
    });
  });

  // Social icon hover
  var socialLinks = document.querySelectorAll('.hero-social a, .footer-social a');
  socialLinks.forEach(function(link) {
    if (link.closest('.eportfolio2-wrapper')) return;
    link.addEventListener('mouseenter', function() {
      gsap.to(link, { scale: 1.3, rotation: 15, duration: 0.3, ease: 'back.out(2.5)' });
    });
    link.addEventListener('mouseleave', function() {
      gsap.to(link, { scale: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });

  // Button click bounce
  var buttons = document.querySelectorAll('.btn, .card-link, .filter-btn, .tab-btn, .skills-tab-btn');
  buttons.forEach(function(btn) {
    if (btn.closest('.eportfolio2-wrapper')) return;
    btn.addEventListener('click', function() {
      gsap.fromTo(btn, { scale: 1 }, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' });
    });
  });
}

/* ============================================
   LIVE AMBIENT ANIMATIONS
   ============================================ */
function initLiveAmbient() {
  // Card breathing
  var cards = document.querySelectorAll('.portfolio-card, .pillar-card, .cert-card');
  cards.forEach(function(card, i) {
    if (card.closest('.eportfolio2-wrapper')) return;
    gsap.to(card, {
      boxShadow: '0 8px 32px rgba(15, 94, 168, 0.12)',
      duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
      delay: (i % 5) * 0.6
    });
  });

  // Hero badges float
  var badges = document.querySelectorAll('.hero-badge');
  badges.forEach(function(badge, i) {
    gsap.to(badge, {
      y: -6, duration: 2.5 + (i * 0.3), repeat: -1, yoyo: true, ease: 'sine.inOut',
      delay: i * 0.4
    });
  });

  // Timeline active dot glow
  var activeDot = document.querySelector('.ppg-era .timeline-dot, .timeline-item:first-child .timeline-dot');
  if (activeDot) {
    gsap.to(activeDot, {
      boxShadow: '0 0 20px rgba(46, 196, 182, 0.6), 0 0 40px rgba(46, 196, 182, 0.3)',
      duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
  }

  // Philosophy card shadow pulse
  var philCard = document.querySelector('.philosophy-card');
  if (philCard) {
    gsap.to(philCard, {
      boxShadow: '0 12px 40px rgba(155, 114, 207, 0.15)',
      duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
  }

  // Floating shapes GSAP drift (replaces CSS animation for smoother control)
  var shapes = document.querySelectorAll('.floating-shapes .shape');
  shapes.forEach(function(shape, i) {
    gsap.to(shape, {
      y: '-=20', x: (i % 2 === 0 ? '+=10' : '-=10'), rotation: '+=15',
      duration: 4 + (i * 0.5), repeat: -1, yoyo: true, ease: 'sine.inOut',
      delay: i * 0.3
    });
  });

  // Life step dots pulse
  var lifeStepDots = document.querySelectorAll('.life-step-dot');
  lifeStepDots.forEach(function(dot, i) {
    gsap.to(dot, {
      scale: 1.08, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      delay: i * 0.2
    });
  });
}

/* ============================================
   SCROLL UI (progress bar + dot nav)
   ============================================ */
function initScrollUI() {
  // Scroll progress bar
  var progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }
}
