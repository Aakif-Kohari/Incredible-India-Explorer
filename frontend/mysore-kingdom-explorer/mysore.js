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
    if (!grid || typeof MYSORE_INFO === 'undefined') return;

    grid.innerHTML = MYSORE_INFO.quickStats
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
    const rocketEl = document.getElementById('contrib-rocket');
    const archEl = document.getElementById('contrib-arch');
    const indEl = document.getElementById('contrib-ind');
    const dasaraEl = document.getElementById('contrib-dasara');

    if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${CONTRIBUTIONS_DATA.overview}`;
    if (rocketEl) rocketEl.innerHTML = `<strong>Military Rocketry & Innovation:</strong> ${CONTRIBUTIONS_DATA.militaryRocketry}`;
    if (archEl) archEl.innerHTML = `<strong>Architectural Icons:</strong> ${CONTRIBUTIONS_DATA.architecture}`;
    if (indEl) indEl.innerHTML = `<strong>Industry & Hydroelectric Power:</strong> ${CONTRIBUTIONS_DATA.industryAgriculture}`;
    if (dasaraEl) dasaraEl.innerHTML = `<strong>Mysore Dasara Heritage:</strong> ${CONTRIBUTIONS_DATA.cultureDasara}`;
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
