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
    if (!grid || typeof JAIPUR_INFO === 'undefined') return;

    grid.innerHTML = JAIPUR_INFO.quickStats
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
    const planEl = document.getElementById('contrib-plan');
    const astroEl = document.getElementById('contrib-astro');
    const fortsEl = document.getElementById('contrib-forts');
    const craftsEl = document.getElementById('contrib-crafts');

    if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${CONTRIBUTIONS_DATA.overview}`;
    if (planEl) planEl.innerHTML = `<strong>Grid-Planned City Architecture:</strong> ${CONTRIBUTIONS_DATA.plannedCityDesign}`;
    if (astroEl) astroEl.innerHTML = `<strong>Astronomical Jantar Mantar:</strong> ${CONTRIBUTIONS_DATA.astronomyJantarMantar}`;
    if (fortsEl) fortsEl.innerHTML = `<strong>Forts & Palaces:</strong> ${CONTRIBUTIONS_DATA.architectureForts}`;
    if (craftsEl) craftsEl.innerHTML = `<strong>Arts & Craft Guilds:</strong> ${CONTRIBUTIONS_DATA.handicraftsArts}`;
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
