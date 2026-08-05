(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryCards = document.querySelectorAll('.gallery-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Filter cards
                galleryCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hidden');
                        card.setAttribute('tabindex', '0'); // make focusable
                    } else {
                        card.classList.add('hidden');
                        card.setAttribute('tabindex', '-1'); // remove from focus order
                    }
                });
            });
        });

        // Add keyboard support for clicking cards (accessibility)
        galleryCards.forEach(card => {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Custom logic for card click could go here (e.g., opening a modal)
                    // For now, it just demonstrates focus/interaction
                    card.focus();
                }
            });
        });
    });
})();
