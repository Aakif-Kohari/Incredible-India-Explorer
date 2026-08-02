import { NANDA_LAKE_DATA } from './nanda-lake-data.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    renderStats();
    renderFreshwaterLake();
    renderRamsar();
    renderAquaticPlants();
    renderBirdSpecies();
    renderBiodiversity();
    renderConservation();
    renderMapHotspots();
    renderGallery();
    renderFacts();
});

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeToggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}

function initNavbar() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
}

function renderStats() {
    const container = document.getElementById('stats-grid');
    if (!container || !NANDA_LAKE_DATA.stats) return;

    container.innerHTML = NANDA_LAKE_DATA.stats
        .map(
            (stat) => `
        <div class="stat-card">
            <span class="stat-icon">${stat.icon}</span>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `
        )
        .join('');
}

function renderFreshwaterLake() {
    const title = document.getElementById('lake-title');
    const content = document.getElementById('lake-content');
    if (title) title.textContent = NANDA_LAKE_DATA.freshwaterLake.title;
    if (content) content.textContent = NANDA_LAKE_DATA.freshwaterLake.content;
}

function renderRamsar() {
    const title = document.getElementById('ramsar-title');
    const content = document.getElementById('ramsar-content');
    if (title) title.textContent = NANDA_LAKE_DATA.ramsarSite.title;
    if (content) content.textContent = NANDA_LAKE_DATA.ramsarSite.content;
}

function renderAquaticPlants() {
    const title = document.getElementById('plants-title');
    const content = document.getElementById('plants-content');
    if (title) title.textContent = NANDA_LAKE_DATA.aquaticPlants.title;
    if (content) content.textContent = NANDA_LAKE_DATA.aquaticPlants.content;
}

function renderBirdSpecies() {
    const title = document.getElementById('birds-title');
    const content = document.getElementById('birds-content');
    const factsList = document.getElementById('birds-facts');

    if (title) title.textContent = NANDA_LAKE_DATA.birdSpecies.title;
    if (content) content.textContent = NANDA_LAKE_DATA.birdSpecies.content;

    if (factsList && NANDA_LAKE_DATA.birdSpecies.facts) {
        factsList.innerHTML = NANDA_LAKE_DATA.birdSpecies.facts
            .map((f) => `<div class="fact-bullet">🐦 ${f}</div>`)
            .join('');
    }
}

function renderBiodiversity() {
    const title = document.getElementById('biodiversity-title');
    const content = document.getElementById('biodiversity-content');
    if (title) title.textContent = NANDA_LAKE_DATA.biodiversity.title;
    if (content) content.textContent = NANDA_LAKE_DATA.biodiversity.content;
}

function renderConservation() {
    const title = document.getElementById('conservation-title');
    const content = document.getElementById('conservation-content');
    if (title) title.textContent = NANDA_LAKE_DATA.conservation.title;
    if (content) content.textContent = NANDA_LAKE_DATA.conservation.content;
}

function renderMapHotspots() {
    const listContainer = document.getElementById('hotspots-list');
    if (!listContainer || !NANDA_LAKE_DATA.hotspots) return;

    listContainer.innerHTML = NANDA_LAKE_DATA.hotspots
        .map(
            (spot, index) => `
        <button class="spot-btn ${index === 0 ? 'active' : ''}" data-id="${spot.id}">
            <span class="spot-name">${spot.name}</span>
        </button>
    `
        )
        .join('');

    showHotspotDetail(NANDA_LAKE_DATA.hotspots[0]);

    listContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.spot-btn');
        if (!btn) return;

        const id = btn.getAttribute('data-id');
        const spot = NANDA_LAKE_DATA.hotspots.find((s) => s.id === id);

        document.querySelectorAll('.spot-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (spot) {
            showHotspotDetail(spot);
        }
    });
}

function showHotspotDetail(spot) {
    const detailContainer = document.getElementById('hotspot-detail');
    if (!detailContainer) return;

    detailContainer.innerHTML = `
        <h3 style="margin: 0 0 0.5rem; color: #ec4899; font-size: 1.5rem;">${spot.name}</h3>
        <p style="color: var(--nanda-text-sub); line-height: 1.6; margin-bottom: 1.25rem;">${spot.desc}</p>
        <div style="font-family: monospace; font-size: 0.85rem; color: #94a3b8; background: rgba(0,0,0,0.2); padding: 0.5rem 0.85rem; border-radius: 0.5rem;">Coordinates: ${spot.lat}° N, ${spot.lng}° E</div>
    `;
}

function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container || !NANDA_LAKE_DATA.gallery) return;

    container.innerHTML = NANDA_LAKE_DATA.gallery
        .map(
            (g) => `
        <div class="gallery-card">
            <img src="${g.url}" alt="${g.title}" loading="lazy" />
            <div class="gallery-info">
                <h4>${g.title}</h4>
                <p>${g.caption}</p>
            </div>
        </div>
    `
        )
        .join('');
}

function renderFacts() {
    const container = document.getElementById('facts-grid');
    if (!container || !NANDA_LAKE_DATA.facts) return;

    container.innerHTML = NANDA_LAKE_DATA.facts
        .map((f) => `<div class="trivia-box">💡 ${f}</div>`)
        .join('');
}