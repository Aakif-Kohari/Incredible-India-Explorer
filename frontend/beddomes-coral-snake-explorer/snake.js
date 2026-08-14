document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderTaxonomy();
    renderProfile();
    renderFacts();
    renderGallery();
    renderReferences();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof SNAKE_INFO === 'undefined') return;

    grid.innerHTML = SNAKE_INFO.quickStats
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
    if (!grid || typeof SNAKE_INFO === 'undefined') return;
    const tax = SNAKE_INFO.taxonomy;

    const items = [
        { label: "Kingdom", val: tax.kingdom },
        { label: "Phylum", val: tax.phylum },
        { label: "Class", val: tax.class },
        { label: "Order", val: tax.order },
        { label: "Family", val: tax.family },
        { label: "Genus", val: tax.genus },
        { label: "Species", val: tax.species }
    ];

    grid.innerHTML = items.map(
        i => `
        <div class="tax-card">
            <span class="tax-lbl">${i.label}</span>
            <span class="tax-val">${i.val}</span>
        </div>
    `
    ).join('');
}

function renderProfile() {
    if (typeof ECOLOGICAL_PROFILE === 'undefined') return;
    const p = ECOLOGICAL_PROFILE;

    const overviewEl = document.getElementById('profile-overview');
    const distEl = document.getElementById('profile-dist');
    const behEl = document.getElementById('profile-behaviour');
    const dietEl = document.getElementById('profile-diet');
    const reproEl = document.getElementById('profile-repro');
    const thrEl = document.getElementById('profile-threats');
    const ecoEl = document.getElementById('profile-eco');

    if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${p.overview}`;
    if (distEl) distEl.innerHTML = `<strong>Distribution & Habitat:</strong> ${p.distributionAndHabitat}`;
    if (behEl) behEl.innerHTML = `<strong>Behavior:</strong> ${p.behaviour}`;
    if (dietEl) dietEl.innerHTML = `<strong>Diet & Prey:</strong> ${p.diet}`;
    if (reproEl) reproEl.innerHTML = `<strong>Reproduction:</strong> ${p.reproduction}`;
    if (thrEl) thrEl.innerHTML = `<strong>Threats & Conservation Status:</strong> ${p.threatsAndConservation}`;
    if (ecoEl) ecoEl.innerHTML = `<strong>Ecological Importance:</strong> ${p.ecologicalImportance}`;
}

function renderFacts() {
    const list = document.getElementById('facts-list');
    if (!list || typeof ECOLOGICAL_PROFILE === 'undefined') return;

    list.innerHTML = ECOLOGICAL_PROFILE.interestingFacts
        .map(f => `<li>💡 ${f}</li>`)
        .join('');
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
