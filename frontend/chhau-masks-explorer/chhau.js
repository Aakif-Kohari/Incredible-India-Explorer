document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderProcess();
    renderMasks();
    renderArtisan();
    renderGallery();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof CHHAU_INFO === 'undefined') return;

    grid.innerHTML = CHHAU_INFO.quickStats
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

function renderProcess() {
    const container = document.getElementById('process-steps');
    if (!container || typeof PROCESS_STEPS === 'undefined') return;

    container.innerHTML = PROCESS_STEPS.map(
        s => `
        <div class="step-card">
            <div class="step-num">Step ${s.step}</div>
            <div class="step-content">
                <h3>${s.title}</h3>
                <p>${s.description}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderMasks() {
    const grid = document.getElementById('masks-grid');
    if (!grid || typeof TRADITIONAL_MASKS === 'undefined') return;

    grid.innerHTML = TRADITIONAL_MASKS.map(
        m => `
        <div class="mask-card">
            <h3>✨ ${m.name}</h3>
            <p>${m.description}</p>
        </div>
    `
    ).join('');
}

function renderArtisan() {
    if (typeof ARTISAN_COMMUNITY === 'undefined') return;
    const titleEl = document.getElementById('artisan-title');
    const descEl = document.getElementById('artisan-desc');

    if (titleEl) titleEl.textContent = ARTISAN_COMMUNITY.title;
    if (descEl) descEl.textContent = ARTISAN_COMMUNITY.description;
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
