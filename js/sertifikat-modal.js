/* ============================================
   SERTIFIKAT MODAL POPUP
   ============================================ */
export function initSertifikatModal() {
  const modal = document.getElementById('certModal');
  if (!modal) return;

  const iframe = document.getElementById('certModalIframe');
  const openBtn = document.getElementById('certModalOpen');
  const titleEl = document.getElementById('certModalTitle');
  const closeBtn = document.getElementById('certModalClose');
  const popupBox = modal.querySelector('.cert-modal-box');

  function openModal(url, title) {
    iframe.src = url;
    openBtn.href = url.replace('/preview', '/view');
    if (titleEl && title) titleEl.textContent = title;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(popupBox,
        { scale: 0.85, opacity: 0, y: 18 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)', clearProps: 'transform' }
      );
    }
  }

  function closeModal() {
    if (typeof gsap !== 'undefined') {
      gsap.to(popupBox, { scale: 0.9, opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
      gsap.to(modal, {
        opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          modal.style.display = 'none';
          iframe.src = '';
          document.body.style.overflow = '';
        }
      });
    } else {
      modal.style.display = 'none';
      iframe.src = '';
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.cert-btn[data-cert-url]').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-cert-url');
      const card = btn.closest('.cert-card');
      const title = card ? card.querySelector('h4').textContent : 'Sertifikat';
      openModal(url, title);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
  });
}
