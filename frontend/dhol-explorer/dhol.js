document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderRegionalExplorer();
    renderFestivals();
    renderDanceTraditions();
    renderConstruction();
    renderGallery();
    renderSignificance();
    renderReferences();
    renderImageCredits();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof DHOL_INFO === 'undefined') return;

    grid.innerHTML = DHOL_INFO.quickStats
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

/**
 * Interactive Regional Instrument Explorer.
 * Renders a clickable card grid of regional dhol-family variants.
 * Clicking a card (or pressing Enter/Space when focused) updates the
 * detail panel below with that variant's information.
 */
function renderRegionalExplorer() {
    const grid = document.getElementById('regional-grid');
    const detailPanel = document.getElementById('regional-detail');
    if (!grid || !detailPanel || typeof REGIONAL_VARIANTS === 'undefined' || !REGIONAL_VARIANTS.length) return;

    grid.innerHTML = REGIONAL_VARIANTS.map(
        variant => `
        <button
            type="button"
            class="regional-card"
            data-variant-id="${variant.id}"
            aria-pressed="false"
        >
            <span class="regional-emoji" aria-hidden="true">${variant.emoji}</span>
            <span class="regional-tag">${variant.region}</span>
            <h3>${variant.name}</h3>
            <p>${variant.summary}</p>
        </button>
    `
    ).join('');

    const cards = grid.querySelectorAll('.regional-card');

    function selectVariant(id) {
        const variant = REGIONAL_VARIANTS.find(v => v.id === id);
        if (!variant) return;

        cards.forEach(card => {
            const isActive = card.dataset.variantId === id;
            card.classList.toggle('active', isActive);
            card.setAttribute('aria-pressed', String(isActive));
        });

        detailPanel.innerHTML = `
            <div class="detail-header">
                <span class="detail-emoji" aria-hidden="true">${variant.emoji}</span>
                <div>
                    <h3>${variant.name}</h3>
                    <span class="detail-region">📍 ${variant.region}</span>
                </div>
            </div>
            <p>${variant.details}</p>
            <div class="detail-rhythm">🎵 ${variant.rhythmNote}</div>
        `;
        detailPanel.classList.add('is-visible');
    }

    cards.forEach(card => {
        card.addEventListener('click', () => selectVariant(card.dataset.variantId));
    });

    // Select the first variant by default so the panel is never empty.
    selectVariant(REGIONAL_VARIANTS[0].id);
}

function renderFestivals() {
    const grid = document.getElementById('festivals-grid');
    if (!grid || typeof FESTIVALS === 'undefined') return;

    grid.innerHTML = FESTIVALS.map(
        festival => `
        <div class="festival-card">
            <span class="festival-icon" aria-hidden="true">${festival.icon}</span>
            <div class="festival-tag">${festival.region}</div>
            <h3>${festival.name}</h3>
            <p>${festival.description}</p>
        </div>
    `
    ).join('');
}

function renderDanceTraditions() {
    const grid = document.getElementById('dance-grid');
    if (!grid || typeof DANCE_TRADITIONS === 'undefined') return;

    grid.innerHTML = DANCE_TRADITIONS.map(
        dance => `
        <div class="dance-card">
            <div class="dance-tag">${dance.region}</div>
            <h3>${dance.name}</h3>
            <p>${dance.description}</p>
        </div>
    `
    ).join('');
}

function renderConstruction() {
    const container = document.getElementById('construction-steps');
    if (!container || typeof CONSTRUCTION_STEPS === 'undefined') return;

    container.innerHTML = CONSTRUCTION_STEPS.map(
        step => `
        <div class="step-card">
            <div class="step-num">Step ${step.step}</div>
            <div class="step-content">
                <h3>${step.title}</h3>
                <p>${step.description}</p>
                ${step.image ? `<img class="step-image" src="${step.image}" alt="${step.title}" loading="lazy" />` : ''}
            </div>
        </div>
    `
    ).join('');
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid || typeof GALLERY_ITEMS === 'undefined') return;

    grid.innerHTML = GALLERY_ITEMS.map(
        item => `
        <div class="gallery-card">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
            <div class="gallery-body">
                <h3>${item.title}</h3>
                <p>${item.caption}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderSignificance() {
    const grid = document.getElementById('significance-grid');
    if (!grid || typeof CULTURAL_SIGNIFICANCE === 'undefined') return;

    grid.innerHTML = CULTURAL_SIGNIFICANCE.map(
        item => `
        <div class="significance-card">
            <h3>✨ ${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `
    ).join('');
}

function renderReferences() {
    const list = document.getElementById('references-list');
    if (!list || typeof REFERENCES === 'undefined') return;

    list.innerHTML = REFERENCES.map(
        ref => `
        <li>
            <a href="${ref.link}" target="_blank" rel="noopener noreferrer">📚 ${ref.text}</a>
        </li>
    `
    ).join('');
}

function renderImageCredits() {
    const list = document.getElementById('image-credits-list');
    if (!list || typeof IMAGE_CREDITS === 'undefined') return;

    list.innerHTML = IMAGE_CREDITS.map(credit => `<li>${credit}</li>`).join('');
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
