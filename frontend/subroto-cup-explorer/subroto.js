document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderPipeline();
    renderCategories();
    renderAlumni();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof SUBROTO_INFO === 'undefined') return;

    grid.innerHTML = SUBROTO_INFO.quickStats
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

function renderPipeline() {
    const container = document.getElementById('pipeline-container');
    if (!container || typeof PLAYER_PIPELINE === 'undefined') return;

    container.innerHTML = PLAYER_PIPELINE.map(
        (p, idx) => `
        <div class="pipeline-step">
            <div class="step-num">${idx + 1}</div>
            <div class="step-content">
                <h3>${p.stage}</h3>
                <span class="level-tag">${p.level}</span>
                <p>${p.description}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderCategories() {
    const grid = document.getElementById('categories-grid');
    if (!grid || typeof AGE_CATEGORIES === 'undefined') return;

    grid.innerHTML = AGE_CATEGORIES.map(
        c => `
        <div class="category-card">
            <span class="intro-tag">Introduced: ${c.introduced}</span>
            <h3>⚽ ${c.category}</h3>
            <p><strong>Official Trophy:</strong> ${c.trophy}</p>
            <p>${c.description}</p>
        </div>
    `
    ).join('');
}

function renderAlumni() {
    const grid = document.getElementById('alumni-grid');
    if (!grid || typeof FAMOUS_ALUMNI === 'undefined') return;

    grid.innerHTML = FAMOUS_ALUMNI.map(
        a => `
        <div class="alumni-card">
            <span class="pos-tag">${a.position}</span>
            <h3>⭐ ${a.name}</h3>
            <p><strong>School Alma Mater:</strong> ${a.school}</p>
            <p>${a.achievements}</p>
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
