// Bajaj Auto Gallery Animation Logic

document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.bajaj-gallery-card');

  // Intersection Observer for gallery animation
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animating in once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  galleryItems.forEach(item => {
    observer.observe(item);
  });

  // Ensure first few items are visible on load if they are already in viewport
  setTimeout(() => {
    galleryItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        item.classList.add('visible');
        observer.unobserve(item);
      }
    });
  }, 100);
});
