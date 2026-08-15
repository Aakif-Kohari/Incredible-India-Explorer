document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderRegions();
    renderProcess();
    renderGallery();
    renderSustainability();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof BAMBOO_INFO === 'undefined') return;

    grid.innerHTML = BAMBOO_INFO.quickStats
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

function renderRegions() {
    const grid = document.getElementById('regional-grid');
    if (!grid || typeof REGIONAL_CRAFTS === 'undefined') return;

    grid.innerHTML = REGIONAL_CRAFTS.map(
        region => `
        <div class="regional-card">
            <div class="regional-tag">${region.highlight}</div>
            <h3>${region.name}</h3>
            <p>${region.description}</p>
        </div>
    `
    ).join('');
}

function renderProcess() {
    const container = document.getElementById('process-steps');
    if (!container || typeof PROCESS_STEPS === 'undefined') return;

    container.innerHTML = PROCESS_STEPS.map(
        step => `
        <div class="step-card">
            <div class="step-num">Step ${step.step}</div>
            <div class="step-content">
                <h3>${step.title}</h3>
                <p>${step.description}</p>
                ${step.image ? `<img class="step-image" src="${step.image}" alt="${step.title}" loading="lazy" />` : ''}
            </div>
        </div>
    `
    ).join('');
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid || typeof GALLERY_ITEMS === 'undefined') return;

    grid.innerHTML = GALLERY_ITEMS.map(
        item => `
        <div class="gallery-card">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
            <div class="gallery-body">
                <h3>${item.title}</h3>
                <p>${item.caption}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderSustainability() {
    const grid = document.getElementById('sustainability-grid');
    if (!grid || typeof SUSTAINABILITY_POINTS === 'undefined') return;

    grid.innerHTML = SUSTAINABILITY_POINTS.map(
        item => `
        <div class="sustainability-card">
            <h3>🌱 ${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `
    ).join('');
}

function renderReferences() {
    const list = document.getElementById('references-list');
    if (!list || typeof REFERENCES === 'undefined') return;

    list.innerHTML = REFERENCES.map(
        ref => `
        <li>
            <a href="${ref.link}" target="_blank" rel="noopener noreferrer">📚 ${ref.text}</a>
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
