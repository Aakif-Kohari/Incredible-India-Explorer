document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderTaxonomy();
    renderEcology();
    renderFacts();
    renderGallery();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof GECKO_INFO === 'undefined') return;

    grid.innerHTML = GECKO_INFO.quickStats
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

function renderTaxonomy() {
    const grid = document.getElementById('taxonomy-grid');
    if (!grid || typeof TAXONOMY_DATA === 'undefined') return;

    grid.innerHTML = Object.entries(TAXONOMY_DATA)
        .map(
            ([key, val]) => `
        <div class="tax-card">
            <span class="tax-lbl">${key.toUpperCase()}:</span>
            <span class="tax-val">${val}</span>
        </div>
    `
        )
        .join('');
}

function renderEcology() {
    if (typeof ECOLOGY_BEHAVIOUR === 'undefined') return;
    const introEl = document.getElementById('eco-intro');
    const distEl = document.getElementById('eco-dist');
    const habEl = document.getElementById('eco-habitat');
    const morphEl = document.getElementById('eco-morph');
    const behEl = document.getElementById('eco-behaviour');
    const dietEl = document.getElementById('eco-diet');
    const reproEl = document.getElementById('eco-repro');
    const consEl = document.getElementById('eco-conserve');

    if (introEl) introEl.innerHTML = `<strong>Introduction:</strong> ${ECOLOGY_BEHAVIOUR.introduction}`;
    if (distEl) distEl.innerHTML = `<strong>Geographic Distribution:</strong> ${ECOLOGY_BEHAVIOUR.distribution}`;
    if (habEl) habEl.innerHTML = `<strong>Habitat Preference:</strong> ${ECOLOGY_BEHAVIOUR.habitat}`;
    if (morphEl) morphEl.innerHTML = `<strong>Physical Characteristics & Morphology:</strong> ${ECOLOGY_BEHAVIOUR.morphology}`;
    if (behEl) behEl.innerHTML = `<strong>Nocturnal Behaviour & Activity:</strong> ${ECOLOGY_BEHAVIOUR.behaviour}`;
    if (dietEl) dietEl.innerHTML = `<strong>Diet & Feeding Habits:</strong> ${ECOLOGY_BEHAVIOUR.diet}`;
    if (reproEl) reproEl.innerHTML = `<strong>Reproduction & Nesting:</strong> ${ECOLOGY_BEHAVIOUR.reproduction}`;
    if (consEl) consEl.innerHTML = `<strong>Conservation Status & Threats:</strong> ${ECOLOGY_BEHAVIOUR.conservation}`;
}

function renderFacts() {
    const grid = document.getElementById('facts-grid');
    if (!grid || typeof INTERESTING_FACTS === 'undefined') return;

    grid.innerHTML = INTERESTING_FACTS.map(
        f => `
        <div class="fact-card">
            <h3>✨ ${f.title}</h3>
            <p>${f.description}</p>
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
