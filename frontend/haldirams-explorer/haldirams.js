document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderProductCategories();
    renderRestaurantBusiness();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof HALDIRAM_INFO === 'undefined') return;

    grid.innerHTML = HALDIRAM_INFO.quickStats
        .map(
            stat => `
        <div class="stat-card">
            <span class="stat-icon">${stat.icon}</span>
            <div class="stat-val">${stat.value}</div>
            <div class="stat-lbl">${stat.label}</div>
        </div>
    `
        )
        .join('');
}

function renderProductCategories() {
    const grid = document.getElementById('products-grid');
    if (!grid || typeof PRODUCT_CATEGORIES === 'undefined') return;

    grid.innerHTML = PRODUCT_CATEGORIES.map(
        c => `
        <div class="collection-card">
            <div class="card-header">
                <h3>${c.icon} ${c.name}</h3>
                <span class="year-badge">${c.launchYear}</span>
            </div>
            <span class="cat-tag">${c.category}</span>
            <p>${c.description}</p>
        </div>
    `
    ).join('');
}

function renderRestaurantBusiness() {
    const intro = document.getElementById('restaurant-intro');
    const grid = document.getElementById('restaurant-grid');
    if (typeof RESTAURANT_BUSINESS === 'undefined') return;

    if (intro) intro.textContent = RESTAURANT_BUSINESS.intro;

    if (grid) {
        grid.innerHTML = RESTAURANT_BUSINESS.milestones
            .map(
                m => `
            <div class="collection-card">
                <div class="card-header">
                    <h3>🍽️ ${m.title}</h3>
                </div>
                <p>${m.description}</p>
            </div>
        `
            )
            .join('');
    }
}

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container || typeof TIMELINE_EVENTS === 'undefined') return;

    container.innerHTML = TIMELINE_EVENTS.map(
        item => `
        <div class="timeline-card">
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderReferences() {
    const list = document.getElementById('references-list');
    if (!list || typeof REFERENCES === 'undefined') return;

    list.innerHTML = REFERENCES.map(
        r => `
        <li>
            <a href="${r.link}" target="_blank" rel="noopener noreferrer">📚 ${r.text}</a>
        </li>
    `
    ).join('');
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}