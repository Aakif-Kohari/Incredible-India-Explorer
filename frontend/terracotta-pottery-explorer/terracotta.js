document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderHistoryAndMaterials();
    renderProcess();
    renderStyles();
    renderGallery();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof TERRACOTTA_INFO === 'undefined') return;

    grid.innerHTML = TERRACOTTA_INFO.quickStats
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

function renderHistoryAndMaterials() {
    if (typeof TERRACOTTA_INFO === 'undefined') return;
    const histEl = document.getElementById('info-history');
    const matEl = document.getElementById('info-materials');

    if (histEl) histEl.innerHTML = `<strong>Historical Background:</strong> ${TERRACOTTA_INFO.historicalBackground}`;
    if (matEl) matEl.innerHTML = `<strong>Raw Materials & Firing Media:</strong> ${TERRACOTTA_INFO.materialsUsed}`;
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

function renderStyles() {
    const grid = document.getElementById('styles-grid');
    if (!grid || typeof REGIONAL_STYLES === 'undefined') return;

    grid.innerHTML = REGIONAL_STYLES.map(
        st => `
        <div class="style-card">
            <h3>🏺 ${st.name}</h3>
            <span class="style-tag">${st.giTag}</span>
            <p>${st.description}</p>
        </div>
    `
    ).join('');
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
