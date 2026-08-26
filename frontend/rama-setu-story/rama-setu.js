document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderChapters();
    renderHeritage();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof RAMA_SETU_INFO === 'undefined') return;

    grid.innerHTML = RAMA_SETU_INFO.quickStats
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

function renderChapters() {
    const grid = document.getElementById('chapters-grid');
    if (!grid || typeof STORY_CHAPTERS === 'undefined') return;

    grid.innerHTML = STORY_CHAPTERS.map(
        c => `
        <div class="chapter-card">
            <div class="card-header">
                <h3>${c.icon} ${c.chapter}</h3>
            </div>
            <h4 class="chapter-sub">${c.title}</h4>
            <p>${c.description}</p>
        </div>
    `
    ).join('');
}

function renderHeritage() {
    const grid = document.getElementById('heritage-grid');
    if (!grid || typeof GEOGRAPHICAL_AND_CULTURAL_HERITAGE === 'undefined') return;

    grid.innerHTML = GEOGRAPHICAL_AND_CULTURAL_HERITAGE.map(
        h => `
        <div class="heritage-card">
            <div class="card-header">
                <h3>${h.icon} ${h.aspect}</h3>
            </div>
            <p class="heritage-detail"><strong>${h.details}</strong></p>
            <p>${h.description}</p>
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
