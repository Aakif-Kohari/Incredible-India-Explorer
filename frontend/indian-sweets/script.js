// The Sweet Tooth Explorer Script

document.addEventListener('DOMContentLoaded', () => {
    // Check if data is loaded
    if (typeof window.INDIAN_SWEETS_DATA === 'undefined') {
        console.error("Sweet data not found!");
        return;
    }

    const sweetsData = window.INDIAN_SWEETS_DATA;
    const sweetsGrid = document.getElementById('sweets-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const emptyState = document.getElementById('empty-state');
    const themeBtn = document.getElementById('theme-toggle');

    // Theme Toggle Logic
    let isDarkMode = localStorage.getItem('theme') === 'dark';
    if (isDarkMode) {
        document.body.classList.replace('light-theme', 'dark-theme');
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
            themeBtn.textContent = '☀️';
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
            themeBtn.textContent = '🌙';
            themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
        }
    });

    // Helper: Map category keys to human-readable badges
    const getBadgeInfo = (cat) => {
        switch(cat) {
            case 'milk': return { text: 'Milk-Based', class: 'badge-milk' };
            case 'flour': return { text: 'Flour-Based', class: 'badge-flour' };
            case 'festival': return { text: 'Festival', class: 'badge-festival' };
            default: return { text: cat, class: '' };
        }
    };

    // Render cards initially
    const renderSweets = (sweets) => {
        sweetsGrid.innerHTML = '';
        sweets.forEach(sweet => {
            const card = document.createElement('article');
            card.className = 'sweet-card fade-in';
            card.setAttribute('data-categories', sweet.categories.join(' '));
            card.tabIndex = 0; // Make focusable
            
            // Build badges HTML
            const badgesHtml = sweet.categories.map(cat => {
                const info = getBadgeInfo(cat);
                return `<span class="badge ${info.class}">${info.text}</span>`;
            }).join('');

            card.innerHTML = `
                <div class="card-image" style="background-color: ${sweet.bgColor}; color: ${sweet.color};" aria-hidden="true">
                    ${sweet.image}
                </div>
                <div class="card-content">
                    <h2 class="card-title">${sweet.name}</h2>
                    <div class="card-state">📍 ${sweet.state}</div>
                    <div class="card-badges">
                        ${badgesHtml}
                    </div>
                    <div class="card-meta">
                        <div class="meta-group">
                            <span class="meta-label">Ingredients:</span>
                            <span class="meta-value">${sweet.ingredients.join(', ')}</span>
                        </div>
                        <div class="meta-group">
                            <span class="meta-label">Popular during:</span>
                            <span class="meta-value">${sweet.festivals.join(', ')}</span>
                        </div>
                    </div>
                </div>
            `;
            
            sweetsGrid.appendChild(card);
        });
    };

    // Initialize with all sweets
    renderSweets(sweetsData);

    // Filtering Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active states for buttons
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            const filterValue = btn.getAttribute('data-filter');
            const allCards = document.querySelectorAll('.sweet-card');
            let visibleCount = 0;

            allCards.forEach(card => {
                const categories = card.getAttribute('data-categories').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden-card');
                    // Retrigger animation
                    card.classList.remove('fade-in');
                    void card.offsetWidth; // trigger reflow
                    card.classList.add('fade-in');
                    visibleCount++;
                } else {
                    card.classList.add('hidden-card');
                }
            });

            if (visibleCount === 0) {
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
            }
        });
    });
});
