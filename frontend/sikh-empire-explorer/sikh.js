document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderTimeline();
    renderRulers();
    renderContributions();
    renderGallery();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof SIKH_EMPIRE_INFO === 'undefined') return;

    grid.innerHTML = SIKH_EMPIRE_INFO.quickStats
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

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container || typeof TIMELINE_DATA === 'undefined') return;

    container.innerHTML = TIMELINE_DATA.map(
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

function renderRulers() {
    const grid = document.getElementById('rulers-grid');
    if (!grid || typeof RULERS_DATA === 'undefined') return;

    grid.innerHTML = RULERS_DATA.map(
        r => `
        <div class="ruler-card">
            <h3>👑 ${r.name}</h3>
            <span class="ruler-role">${r.role}</span>
            <p>${r.achievements}</p>
        </div>
    `
    ).join('');
}

function renderContributions() {
    if (typeof CONTRIBUTIONS_DATA === 'undefined') return;
    const overviewEl = document.getElementById('contrib-overview');
    const armyEl = document.getElementById('contrib-army');
    const templeEl = document.getElementById('contrib-temple');
    const secularEl = document.getElementById('contrib-secular');
    const borderEl = document.getElementById('contrib-border');

    if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${CONTRIBUTIONS_DATA.overview}`;
    if (armyEl) armyEl.innerHTML = `<strong>Fauj-i-Khas Military Modernization:</strong> ${CONTRIBUTIONS_DATA.faujIKhas}`;
    if (templeEl) templeEl.innerHTML = `<strong>Golden Temple Architecture:</strong> ${CONTRIBUTIONS_DATA.harmandirSahib}`;
    if (secularEl) secularEl.innerHTML = `<strong>Secular Governance & Equality:</strong> ${CONTRIBUTIONS_DATA.secularGovernance}`;
    if (borderEl) borderEl.innerHTML = `<strong>Northwest Border Security:</strong> ${CONTRIBUTIONS_DATA.borderSecurity}`;
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
