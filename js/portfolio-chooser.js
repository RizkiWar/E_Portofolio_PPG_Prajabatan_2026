/* ============================================
   PORTFOLIO CHOOSER SCREEN
   Show 2 portfolio options after intro loading
   ============================================ */
export function initPortfolioChooser() {
  const chooser = document.getElementById('portfolioChooser');
  const introTear = document.getElementById('introTear');
  if (!chooser) return;

  const STORAGE_KEY = 'selectedPortfolio';
  const cards = chooser.querySelectorAll('.chooser-card');
  const prefersReducedMotion = false;
  const ep2Wrapper = document.getElementById('eportfolio2Wrapper');

  function showChooser() {
    chooser.classList.add('active');
    chooser.setAttribute('aria-hidden', 'false');
    chooser.style.opacity = '1';
    chooser.style.display = 'flex';
    chooser.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = '0';
    document.body.classList.add('chooser-active');

    setTimeout(() => {
      if (chooser.classList.contains('active')) {
        chooser.style.display = 'flex';
        chooser.style.opacity = '1';
        chooser.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
      }
    }, 300);

    if (typeof gsap !== 'undefined' && window.innerWidth > 768) {
      gsap.from('.chooser-content > *', {
        opacity: 0, y: 12, duration: 0.25, stagger: 0.03, ease: 'power2.out', delay: 0
      });
    }
  }

  function hideChooser() {
    chooser.classList.remove('active');
    chooser.setAttribute('aria-hidden', 'true');
    chooser.style.display = 'none';
    chooser.style.visibility = 'hidden';
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.classList.remove('chooser-active');
  }

  function showEP2() {
    if (!ep2Wrapper) return;
    // Hide all E-Portfolio 1 sections
    document.querySelectorAll('body > section, body > footer, .floating-shapes, .scroll-progress, #navbar, .back-to-top, .scroll-rail').forEach(el => {
      el.style.display = 'none';
    });
    // Show E-Portfolio 2
    ep2Wrapper.style.display = 'block';
    document.body.style.overflow = '';
    document.body.style.position = '';
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Trigger reveal animations + refresh GSAP ScrollTrigger
    setTimeout(() => {
      ep2Wrapper.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible');
      });
      if (typeof window.refreshEp2Animation === 'function') {
        window.refreshEp2Animation();
      }
    }, 0);
  }

  function hideEP2() {
    if (!ep2Wrapper) return;
    ep2Wrapper.style.display = 'none';
    // Restore E-Portfolio 1 sections
    document.querySelectorAll('body > section, body > footer, .floating-shapes, .scroll-progress, #navbar, .back-to-top, .scroll-rail').forEach(el => {
      el.style.display = '';
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function selectPortfolio(num) {
    document.body.setAttribute('data-portfolio', num);

    if (num === '2') {
      hideChooser();
      showEP2();
    } else {
      hideChooser();
    }
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const num = card.getAttribute('data-portfolio');
      selectPortfolio(num);
    });
  });

  // EP1 home button -> back to chooser
  var homeBtn = document.getElementById('homeBtn');
  if (homeBtn) {
    homeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'auto' });
      showChooser();
    });
  }

  // EP2 back buttons
  if (ep2Wrapper) {
    var backBtns = ep2Wrapper.querySelectorAll('#ep2BackBtn, #ep2BackChooser, #ep2FooterBack');
    backBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        hideEP2();
        showChooser();
      });
    });
  }

  function introAnimationCompleted() {
    if (!introTear) return true;
    if (window.location.hash) return document.body.classList.contains('intro-opened');
    if (prefersReducedMotion) return document.body.classList.contains('intro-opened');
    return introTear.classList.contains('is-opening') && introTear.classList.contains('is-complete');
  }

  function tryShowChooser() {
    if (introAnimationCompleted()) {
      showChooser();
    } else {
      const observer = new MutationObserver(() => {
        if (introAnimationCompleted()) {
          observer.disconnect();
          showChooser();
        }
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

      if (introTear) {
        observer.observe(introTear, { attributes: true, attributeFilter: ['class'] });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryShowChooser);
  } else {
    tryShowChooser();
  }
}


