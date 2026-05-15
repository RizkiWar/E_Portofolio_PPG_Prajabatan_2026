/* ============================================
   PORTFOLIO CHOOSER SCREEN
   Show 2 portfolio options after intro loading
   ============================================ */
(function() {
  const chooser = document.getElementById('portfolioChooser');
  const introTear = document.getElementById('introTear');
  if (!chooser) return;

  const STORAGE_KEY = 'selectedPortfolio';
  const cards = chooser.querySelectorAll('.chooser-card');

  function showChooser() {
    chooser.classList.add('active');
    chooser.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.classList.add('chooser-active');

    if (typeof gsap !== 'undefined') {
      gsap.to(chooser, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      gsap.from('.chooser-content > *', {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.2
      });
    } else {
      chooser.style.opacity = '1';
    }
  }

  function hideChooser() {
    if (typeof gsap !== 'undefined') {
      gsap.to(chooser, {
        opacity: 0, duration: 0.4, ease: 'power2.in',
        onComplete: () => {
          chooser.classList.remove('active');
          chooser.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
          document.body.style.height = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.classList.remove('chooser-active');
        }
      });
    } else {
      chooser.classList.remove('active');
      chooser.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.classList.remove('chooser-active');
    }
  }

  function selectPortfolio(num) {
    document.body.setAttribute('data-portfolio', num);

    if (num === '2') {
      // E-Portfolio 2 placeholder - hide existing sections, show coming soon message
      const message = document.createElement('div');
      message.style.cssText = 'position:fixed; inset:0; background:linear-gradient(135deg,#0F2027,#2C5364); display:flex; align-items:center; justify-content:center; z-index:9997; color:#fff; text-align:center; padding:24px;';
      message.innerHTML = '<div><h2 style="font-size:1.8rem; margin-bottom:12px;">E-Portfolio 2 - UAS</h2><p style="opacity:0.8; max-width:480px; margin:0 auto 24px;">Konten E-Portfolio 2 (Refleksi Akhir PPL Terbimbing dan Filosofi Mengajar) akan tersedia setelah PPL Terbimbing selesai.</p><button id="backToChooser" style="background:#2EC4B6; color:#fff; border:none; padding:12px 28px; border-radius:12px; font-weight:600; cursor:pointer; font-size:0.95rem;">Kembali</button></div>';
      document.body.appendChild(message);
      hideChooser();
      document.getElementById('backToChooser').addEventListener('click', () => {
        message.remove();
        try { sessionStorage.removeItem(STORAGE_KEY); } catch(e) {}
        showChooser();
      });
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

  // Show chooser after intro loading completes
  function tryShowChooser() {
    if (introTear && introTear.classList.contains('is-complete')) {
      setTimeout(showChooser, 400);
    } else if (introTear) {
      const observer = new MutationObserver(() => {
        if (introTear.classList.contains('is-complete')) {
          observer.disconnect();
          setTimeout(showChooser, 400);
        }
      });
      observer.observe(introTear, { attributes: true, attributeFilter: ['class'] });
    } else {
      setTimeout(showChooser, 800);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryShowChooser);
  } else {
    tryShowChooser();
  }
})();
