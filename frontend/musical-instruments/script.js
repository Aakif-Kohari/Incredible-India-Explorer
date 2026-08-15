// Classical Indian Musical Instruments Logic

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.instrument-filter');
  const instrumentCards = document.querySelectorAll('.instrument-card');
  const emptyState = document.querySelector('.instrument-empty');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      let visibleCount = 0;

      // Filter cards
      instrumentCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === category) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Show/hide empty state
      if (visibleCount === 0) {
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
      }
    });

    // Keyboard accessibility for filters
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
});
