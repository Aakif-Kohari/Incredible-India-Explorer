// Traditional Board Games Flip Card Logic
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.board-game-card-container');

  cards.forEach(card => {
    // Click event to flip
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    // Keyboard accessibility for flipping
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Prevent page scroll on space
        card.classList.toggle('flipped');
      }
    });
  });
});
