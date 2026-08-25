document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderCampsites();
    renderPanoramas();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof DAYARA_INFO === 'undefined') return;

    grid.innerHTML = DAYARA_INFO.quickStats
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

function renderCampsites() {
    const grid = document.getElementById('campsites-grid');
    if (!grid || typeof TRAIL_CAMPSITES === 'undefined') return;

    grid.innerHTML = TRAIL_CAMPSITES.map(
        c => `
        <div class="trail-card">
            <div class="card-header">
                <h3>${c.icon} ${c.day}</h3>
                <span class="alt-tag">${c.altitude}</span>
            </div>
            <p>${c.description}</p>
        </div>
    `
    ).join('');
}

function renderPanoramas() {
    const grid = document.getElementById('panoramas-grid');
    if (!grid || typeof MOUNTAIN_PANORAMAS === 'undefined') return;

    grid.innerHTML = MOUNTAIN_PANORAMAS.map(
        p => `
        <div class="panorama-card">
            <div class="card-header">
                <h3>${p.icon} ${p.peak}</h3>
                <span class="height-tag">${p.height}</span>
            </div>
            <p>${p.significance}</p>
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
