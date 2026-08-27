document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderChapters();
    renderThemes();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof SHABARI_INFO === 'undefined') return;

    grid.innerHTML = SHABARI_INFO.quickStats
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

function renderThemes() {
    const grid = document.getElementById('themes-grid');
    if (!grid || typeof DEVOTIONAL_THEMES === 'undefined') return;

    grid.innerHTML = DEVOTIONAL_THEMES.map(
        t => `
        <div class="theme-card">
            <div class="card-header">
                <h3>${t.icon} ${t.theme}</h3>
            </div>
            <p class="theme-sig"><strong>${t.significance}</strong></p>
            <p>${t.description}</p>
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
