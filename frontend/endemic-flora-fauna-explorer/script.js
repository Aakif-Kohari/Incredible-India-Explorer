/**
 * Endemic Flora & Fauna Explorer Landing Page Script
 */

document.addEventListener('DOMContentLoaded', function () {
  initCategoryFilters();
});

function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const speciesCards = document.querySelectorAll('.species-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const selectedCat = btn.getAttribute('data-category');

      speciesCards.forEach(function (card) {
        const cardCat = card.getAttribute('data-category');
        if (selectedCat === 'all' || cardCat === selectedCat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initCategoryFilters
  };
}
