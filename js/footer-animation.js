export function initFooterAnimation(){
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var footer = document.querySelector('.footer');
  if (!footer) return;

  var logo = footer.querySelector('.footer-logo');
  var tagline = footer.querySelector('.footer-tagline');
  var socialLinks = gsap.utils.toArray(footer.querySelectorAll('.footer-social a'));
  var sitemap = footer.querySelector('.footer-sitemap');
  var sitemapLinks = gsap.utils.toArray(footer.querySelectorAll('.footer-sitemap a'));
  var bottomText = footer.querySelector('.footer-bottom p');

  if (logo) gsap.set(logo, { opacity: 0, y: 30 });
  if (tagline) gsap.set(tagline, { opacity: 0, y: 20 });
  gsap.set(socialLinks, { opacity: 0, scale: 0, rotation: -90 });
  if (sitemap) gsap.set(sitemap, { opacity: 0, x: 30 });
  if (bottomText) gsap.set(bottomText, { opacity: 0, y: 15 });

  var masterTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%',
      toggleActions: 'play none none none'
    }
  });

  if (logo) masterTL.to(logo, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  if (tagline) masterTL.to(tagline, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
  if (socialLinks.length) masterTL.to(socialLinks, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' }, '-=0.3');
  if (sitemap) masterTL.to(sitemap, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
  if (bottomText) masterTL.to(bottomText, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

  sitemapLinks.forEach(function(link){
    link.addEventListener('mouseenter', function(){
      gsap.to(link, { x: 6, color: '#2EC4B6', duration: 0.3, ease: 'power2.out' });
    });
    link.addEventListener('mouseleave', function(){
      gsap.to(link, { x: 0, color: '', duration: 0.3, ease: 'power2.out' });
    });
  });

  socialLinks.forEach(function(link){
    link.addEventListener('mouseenter', function(){
      gsap.to(link, { y: -4, scale: 1.15, duration: 0.3, ease: 'back.out(2)' });
    });
    link.addEventListener('mouseleave', function(){
      gsap.to(link, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    });
  });
}
