document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderRocks();
    renderSeasonalData();
    renderAttractions();
    renderGallery();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof RANEH_INFO === 'undefined') return;

    grid.innerHTML = RANEH_INFO.quickStats
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

function renderRocks() {
    const grid = document.getElementById('rocks-grid');
    if (!grid || typeof GEOLOGY_ROCKS === 'undefined') return;

    grid.innerHTML = GEOLOGY_ROCKS.map(
        r => `
        <div class="rock-card">
            <span class="color-tag">${r.color}</span>
            <h3>💎 ${r.name}</h3>
            <p><strong>Rock Classification:</strong> ${r.type}</p>
            <p>${r.description}</p>
        </div>
    `
    ).join('');
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
            <span class="dist-tag">${a.distance} from Raneh</span>
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
