document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderHistory();
    renderHeroes();
    renderTimeline();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof PVC_INFO === 'undefined') return;

    grid.innerHTML = PVC_INFO.quickStats
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

function renderHistory() {
    if (typeof MEDAL_HISTORY === 'undefined') return;
    const overviewEl = document.getElementById('pvc-overview');
    const designEl = document.getElementById('pvc-design');
    const mottoEl = document.getElementById('pvc-motto');

    if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${MEDAL_HISTORY.overview}`;
    if (designEl) designEl.innerHTML = `<strong>Medal Design by Savitri Khanolkar:</strong> ${MEDAL_HISTORY.designOrigin}`;
    if (mottoEl) mottoEl.innerHTML = `<strong>Motto & Spirit:</strong> ${MEDAL_HISTORY.motto}`;
}

function renderHeroes() {
    const grid = document.getElementById('heroes-grid');
    if (!grid || typeof PVC_HEROES === 'undefined') return;

    grid.innerHTML = PVC_HEROES.map(
        hero => `
        <div class="hero-card">
            <img src="${hero.image}" alt="${hero.name}" loading="lazy" />
            <div class="hero-card-body">
                <div class="hero-header">
                    <h3>${hero.name} 🎖️</h3>
                    <span class="posthumous-badge">${hero.posthumous ? 'Posthumous' : 'Living Legend'}</span>
                </div>
                <p class="regiment-lbl"><strong>${hero.rank}</strong> — ${hero.regiment}</p>
                <span class="conflict-badge">⚔️ ${hero.conflict} (${hero.year})</span>
                <p class="citation-txt">${hero.citation}</p>
                <blockquote class="famous-words">${hero.famousWords}</blockquote>
            </div>
        </div>
    `
    ).join('');
}

function renderTimeline() {
    const grid = document.getElementById('timeline-grid');
    if (!grid || typeof CONFLICTS_TIMELINE === 'undefined') return;

    grid.innerHTML = CONFLICTS_TIMELINE.map(
        t => `
        <div class="timeline-card">
            <div class="timeline-year">${t.year}</div>
            <h3>${t.title}</h3>
            <span class="timeline-count">${t.recipients} PVC Awardee${t.recipients > 1 ? 's' : ''}</span>
        </div>
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
