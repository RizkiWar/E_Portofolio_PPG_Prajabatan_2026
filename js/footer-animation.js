/* ============================================
   FOOTER — ANIMATION
   ============================================ */
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const footer = document.querySelector('.footer');
  if (!footer) return;

  const logo = footer.querySelector('.footer-logo');
  const tagline = footer.querySelector('.footer-tagline');
  const socialLinks = footer.querySelectorAll('.footer-social a');
  const sitemap = footer.querySelector('.footer-sitemap');
  const sitemapLinks = footer.querySelectorAll('.footer-sitemap a');
  const bottomText = footer.querySelector('.footer-bottom p');

  gsap.set(logo, { opacity: 0, y: 30 });
  gsap.set(tagline, { opacity: 0, y: 20 });
  gsap.set(socialLinks, { opacity: 0, scale: 0, rotation: -90 });
  gsap.set(sitemap, { opacity: 0, x: 30 });
  gsap.set(bottomText, { opacity: 0, y: 15 });

  gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      start: 'top 90%',
      toggleActions: 'play none none none'
    }
  })
  .to(logo, {
    opacity: 1, y: 0,
    duration: 0.6, ease: 'power3.out'
  })
  .to(tagline, {
    opacity: 1, y: 0,
    duration: 0.5, ease: 'power2.out'
  }, '-=0.3')
  .to(socialLinks, {
    opacity: 1, scale: 1, rotation: 0,
    duration: 0.5, stagger: 0.08, ease: 'back.out(2)'
  }, '-=0.3')
  .to(sitemap, {
    opacity: 1, x: 0,
    duration: 0.6, ease: 'power3.out'
  }, '-=0.5')
  .to(bottomText, {
    opacity: 1, y: 0,
    duration: 0.4, ease: 'power2.out'
  }, '-=0.2');

  // Hover on sitemap links
  sitemapLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, { x: 6, color: '#2EC4B6', duration: 0.3, ease: 'power2.out' });
    });
    link.addEventListener('mouseleave', () => {
      gsap.to(link, { x: 0, color: '', duration: 0.3, ease: 'power2.out' });
    });
  });

  // Hover on social links
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, { y: -4, scale: 1.15, duration: 0.3, ease: 'back.out(2)' });
    });
    link.addEventListener('mouseleave', () => {
      gsap.to(link, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    });
  });
})();
