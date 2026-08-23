let currentEraFilter = 'all';
let currentCategoryFilter = 'all';
let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    renderFeaturedWomen();
    renderAllProfiles();
    renderMapSites();
    renderMethodology();
    initSearch();
    initThemeToggle();
    initModal();
});

function initFilters() {
    // Era filters
    const eraContainer = document.getElementById('era-filter-pills');
    if (eraContainer && typeof ERAS !== 'undefined') {
        eraContainer.innerHTML = ERAS.map(
            era => `
            <button class="filter-pill ${era.id === 'all' ? 'active' : ''}" data-era="${era.id}">
                ${era.label}
            </button>
        `
        ).join('');

        eraContainer.querySelectorAll('.filter-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                eraContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentEraFilter = btn.dataset.era;
                renderAllProfiles();
            });
        });
    }

    // Category filters
    const catContainer = document.getElementById('category-filter-pills');
    if (catContainer && typeof CATEGORIES !== 'undefined') {
        catContainer.innerHTML = CATEGORIES.map(
            cat => `
            <button class="filter-pill ${cat.id === 'all' ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.icon} ${cat.label}
            </button>
        `
        ).join('');

        catContainer.querySelectorAll('.filter-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                catContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategoryFilter = btn.dataset.cat;
                renderAllProfiles();
            });
        });
    }
}

function initSearch() {
    const searchInput = document.getElementById('women-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', e => {
        currentSearchQuery = e.target.value.toLowerCase().trim();
        renderAllProfiles();
    });
}

function renderFeaturedWomen() {
    const grid = document.getElementById('featured-grid');
    if (!grid || typeof WOMEN_PROFILES === 'undefined') return;

    const featuredList = WOMEN_PROFILES.filter(w => w.featured);

    grid.innerHTML = featuredList.map(w => createProfileCardHTML(w, true)).join('');
    attachCardEvents(grid);
}

function renderAllProfiles() {
    const grid = document.getElementById('all-profiles-grid');
    const countDisplay = document.getElementById('results-count');
    if (!grid || typeof WOMEN_PROFILES === 'undefined') return;

    const filtered = WOMEN_PROFILES.filter(w => {
        const matchesEra = currentEraFilter === 'all' || w.era === currentEraFilter;
        const matchesCategory = currentCategoryFilter === 'all' || w.category === currentCategoryFilter;
        const matchesSearch =
            !currentSearchQuery ||
            w.name.toLowerCase().includes(currentSearchQuery) ||
            w.region.toLowerCase().includes(currentSearchQuery) ||
            w.contribution.toLowerCase().includes(currentSearchQuery) ||
            w.bio.toLowerCase().includes(currentSearchQuery) ||
            (w.dynasty && w.dynasty.toLowerCase().includes(currentSearchQuery));

        return matchesEra && matchesCategory && matchesSearch;
    });

    if (countDisplay) {
        countDisplay.textContent = `Showing ${filtered.length} of ${WOMEN_PROFILES.length} Historical Women`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">No matching profiles found. Try resetting filters.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(w => createProfileCardHTML(w)).join('');
    attachCardEvents(grid);
}

function createProfileCardHTML(w, isFeatured = false) {
    const catObj = CATEGORIES.find(c => c.id === w.category);
    const catLabel = catObj ? `${catObj.icon} ${catObj.label}` : w.category;

    return `
        <div class="profile-card ${isFeatured ? 'featured-card' : ''}" data-id="${w.id}">
            <div>
                <div class="profile-card-header">
                    <span class="profile-icon">${w.icon}</span>
                    <div class="profile-badges">
                        <span class="category-tag">${catLabel}</span>
                        <span class="era-tag">⏳ ${w.eraLabel}</span>
                    </div>
                </div>
                <h3>${w.name}</h3>
                <div class="profile-region">📍 ${w.region} ${w.dynasty ? `· 🏛️ ${w.dynasty}` : ''}</div>
                <div class="profile-contribution">🌟 ${w.contribution}</div>
                <div class="profile-bio">${w.bio}</div>
            </div>
            ${w.url 
                ? `<a href="${w.url}" class="explore-story-btn" style="text-decoration: none; display: inline-block; text-align: center;" data-no-route="true">Explore App &rarr;</a>`
                : `<button type="button" class="explore-story-btn" data-id="${w.id}">Explore Story &rarr;</button>`
            }
        </div>
    `;
}

function attachCardEvents(container) {
    container.querySelectorAll('button.explore-story-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const woman = WOMEN_PROFILES.find(w => w.id === btn.dataset.id);
            if (woman) openProfileModal(woman);
        });
    });
}

function renderMapSites() {
    const grid = document.getElementById('map-sites-grid');
    if (!grid || typeof WOMEN_PROFILES === 'undefined') return;

    // Show diverse regional distribution
    const sites = WOMEN_PROFILES.slice(0, 16);

    grid.innerHTML = sites
        .map(
            s => `
        <div class="map-site-item" data-id="${s.id}">
            <strong>${s.icon} ${s.name}</strong>
            <span style="font-size: 0.85rem; color: var(--accent-gold)">📍 ${s.region}</span>
        </div>
    `
        )
        .join('');

    grid.querySelectorAll('.map-site-item').forEach(item => {
        item.addEventListener('click', () => {
            const woman = WOMEN_PROFILES.find(w => w.id === item.dataset.id);
            if (woman) {
                if (woman.url) {
                    window.location.href = woman.url;
                } else {
                    openProfileModal(woman);
                }
            }
        });
    });
}

function renderMethodology() {
    const grid = document.getElementById('method-grid');
    if (!grid || typeof HISTORICAL_METHODOLOGY === 'undefined') return;

    grid.innerHTML = HISTORICAL_METHODOLOGY.principles
        .map(
            p => `
        <div class="method-card">
            <h3>📜 ${p.title}</h3>
            <p>${p.text}</p>
        </div>
    `
        )
        .join('');
}

function openProfileModal(w) {
    const modal = document.getElementById('story-modal');
    const body = document.getElementById('modal-body');
    if (!modal || !body) return;

    body.innerHTML = `
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${w.icon}</div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--accent-amber); margin: 0 0 0.25rem 0;">${w.name}</h2>
        <div style="font-weight: 700; color: var(--accent-gold); margin-bottom: 0.75rem;">⏳ ${w.eraLabel} · 📍 ${w.region}</div>
        <div style="background: rgba(255,255,255,0.08); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--accent-gold);">
            <strong>Primary Contribution:</strong> ${w.contribution}
        </div>
        <p style="font-size: 1.05rem; line-height: 1.6;">${w.bio}</p>
        ${w.dynasty ? `<div style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.5rem;"><strong>Historical Context / Movement:</strong> ${w.dynasty}</div>` : ''}
    `;

    modal.classList.remove('hidden');
}

function initModal() {
    const modal = document.getElementById('story-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.add('hidden');
    });
}

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        toggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    });
}
