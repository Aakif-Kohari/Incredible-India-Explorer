// Mahindra Timeline Animation Logic

document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.mahindra-timeline-item');

  // Intersection Observer for timeline animation
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
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

  timelineItems.forEach(item => {
    observer.observe(item);
  });

  // Ensure first few items are visible on load if they are already in viewport
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
