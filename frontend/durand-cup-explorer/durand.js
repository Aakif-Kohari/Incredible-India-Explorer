document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderTrophies();
    renderClubs();
    renderVenues();
    renderTimeline();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof DURAND_INFO === 'undefined') return;

    grid.innerHTML = DURAND_INFO.quickStats
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

function renderTrophies() {
    const grid = document.getElementById('trophies-grid');
    if (!grid || typeof THREE_TROPHIES === 'undefined') return;

    grid.innerHTML = THREE_TROPHIES.map(
        t => `
        <div class="trophy-card">
            <span class="trophy-icon">${t.icon}</span>
            <h3>${t.name}</h3>
            <span class="origin-tag">Instituted: ${t.origin}</span>
            <p>${t.description}</p>
        </div>
    `
    ).join('');
}

function renderClubs() {
    const grid = document.getElementById('clubs-grid');
    if (!grid || typeof SUCCESSFUL_CLUBS === 'undefined') return;

    grid.innerHTML = SUCCESSFUL_CLUBS.map(
        c => `
        <div class="club-card">
            <div class="card-header">
                <h3>⚽ ${c.club}</h3>
                <span class="titles-badge">${c.titles} Titles</span>
            </div>
            <p><strong>Runners-Up:</strong> ${c.runnersUp} times | <strong>First Crown:</strong> ${c.firstTitle}</p>
            <p class="era-text">${c.era}</p>
        </div>
    `
    ).join('');
}

function renderVenues() {
    const grid = document.getElementById('venues-grid');
    if (!grid || typeof HISTORIC_VENUES === 'undefined') return;

    grid.innerHTML = HISTORIC_VENUES.map(
        v => `
        <div class="venue-card">
            <span class="era-badge">${v.era}</span>
            <h3>🏟️ ${v.name}</h3>
            <p>${v.significance}</p>
        </div>
    `
    ).join('');
}

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container || typeof TOURNAMENT_MILESTONES === 'undefined') return;

    container.innerHTML = TOURNAMENT_MILESTONES.map(
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
