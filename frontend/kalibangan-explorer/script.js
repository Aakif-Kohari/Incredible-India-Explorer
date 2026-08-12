/**
 * Kalibangan Explorer Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Scroll to Top Button
  const scrollTopBtn = document.getElementById('btn-scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});