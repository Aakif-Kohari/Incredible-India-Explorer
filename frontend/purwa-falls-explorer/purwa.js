document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderHeightComparison();
    renderSeasonalData();
    renderAttractions();
    renderGallery();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof PURWA_INFO === 'undefined') return;

    grid.innerHTML = PURWA_INFO.quickStats
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

function renderHeightComparison() {
    const grid = document.getElementById('height-comparison-grid');
    if (!grid || typeof HEIGHT_COMPARISONS === 'undefined') return;

    const maxHeight = Math.max(...HEIGHT_COMPARISONS.map(h => h.heightMeters));

    grid.innerHTML = HEIGHT_COMPARISONS.map(item => {
        const pct = Math.round((item.heightMeters / maxHeight) * 100);
        const isPurwa = item.name.includes('Purwa');
        return `
        <div class="height-card ${isPurwa ? 'highlight' : ''}">
            <div class="height-header">
                <h3>${item.name}</h3>
                <span class="height-val">${item.heightMeters}m</span>
            </div>
            <div class="bar-container">
                <div class="bar-fill" style="width: ${pct}%;"></div>
            </div>
            <p>${item.note}</p>
        </div>
    `;
    }).join('');
}

function renderSeasonalData() {
    const grid = document.getElementById('seasonal-grid');
    if (!grid || typeof SEASONAL_DATA === 'undefined') return;

    grid.innerHTML = SEASONAL_DATA.map(
        s => `
        <div class="season-card">
            <h3>🌧️ ${s.season}</h3>
            <span class="flow-tag">${s.flow}</span>
            <p>${s.description}</p>
        </div>
    `
    ).join('');
}

function renderAttractions() {
    const grid = document.getElementById('attractions-grid');
    if (!grid || typeof NEARBY_ATTRACTIONS === 'undefined') return;

    grid.innerHTML = NEARBY_ATTRACTIONS.map(
        a => `
        <div class="attraction-card">
            <h3>📍 ${a.name}</h3>
            <span class="dist-tag">${a.distance} from Purwa</span>
            <p>${a.description}</p>
        </div>
    `
    ).join('');
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid || typeof GALLERY_IMAGES === 'undefined') return;

    grid.innerHTML = GALLERY_IMAGES.map(
        img => `
        <div class="gallery-card">
            <img src="${img.url}" alt="${img.caption}" loading="lazy" />
            <p>${img.caption}</p>
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
