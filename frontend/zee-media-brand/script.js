// Zee Media Brand Timeline Logic

document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.zee-timeline-item');

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => {
    observer.observe(item);
  });

  // Ensure items currently in view on load are visible
  setTimeout(() => {
    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        item.classList.add('visible');
        observer.unobserve(item);
      }
    });
  }, 100);
});
