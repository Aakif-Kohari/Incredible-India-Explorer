/**
 * Deepor Beel Explorer — Logic & DOM Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    renderStats();
    renderEcology();
    renderSpecies();
    renderHotspots();
    renderGallery();
});

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}

function initMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !expanded);
        navMenu.classList.toggle('active');
    });
}

function renderStats() {
    const container = document.getElementById('stats-grid');
    if (!container || typeof DEEPOR_BEEL_INFO === 'undefined') return;

    container.innerHTML = DEEPOR_BEEL_INFO.quickStats.map(stat => `
        <div class="stat-card">
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join('');
}

function renderEcology() {
    if (typeof ECOLOGY_HYDROLOGY === 'undefined') return;
    
    setElText('eco-history', ECOLOGY_HYDROLOGY.history);
    setElText('eco-ramsar', ECOLOGY_HYDROLOGY.ramsarSite);
    setElText('eco-elephant', ECOLOGY_HYDROLOGY.elephantCorridor);
    setElText('eco-birds', ECOLOGY_HYDROLOGY.wetlandBirds);
    setElText('eco-fisheries', ECOLOGY_HYDROLOGY.fisheries);
    setElText('eco-biodiversity', ECOLOGY_HYDROLOGY.biodiversity);
}

function setElText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function renderSpecies() {
    const container = document.getElementById('species-grid');
    if (!container || typeof BIRD_SPECIES === 'undefined') return;

    container.innerHTML = BIRD_SPECIES.map(bird => `
        <div class="species-card">
            <img src="${bird.image}" alt="${bird.name}" loading="lazy" />
            <div class="species-content">
                <div class="species-title">${bird.icon} ${bird.name}</div>
                <div class="species-scientific">${bird.scientificName}</div>
                <span class="status-badge">${bird.status}</span>
                <p style="font-size: 0.9rem; margin-top: 0.5rem; line-height: 1.4;">${bird.description}</p>
            </div>
        </div>
    `).join('');
}

function renderHotspots() {
    const container = document.getElementById('hotspots-grid');
    if (!container || typeof MAP_HOTSPOTS === 'undefined') return;

    container.innerHTML = MAP_HOTSPOTS.map(spot => `
        <div class="hotspot-card">
            <div class="hotspot-content">
                <h3 style="margin: 0 0 0.5rem; color: #38bdf8;">📍 ${spot.title}</h3>
                <div style="font-size: 0.85rem; color: var(--deepor-muted); margin-bottom: 0.5rem;">${spot.type} (${spot.lat}°N, ${spot.lng}°E)</div>
                <p style="font-size: 0.9rem; margin: 0; line-height: 1.4;">${spot.description}</p>
            </div>
        </div>
    `).join('');
}

function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container || typeof GALLERY_IMAGES === 'undefined') return;

    container.innerHTML = GALLERY_IMAGES.map(img => `
        <div class="gallery-card">
            <img src="${img.url}" alt="${img.caption}" loading="lazy" />
            <div class="gallery-caption">
                <strong style="font-size: 0.9rem;">${img.caption}</strong>
                <span style="font-size: 0.75rem; display: block; color: var(--deepor-muted); margin-top: 0.25rem;">Category: ${img.category}</span>
            </div>
        </div>
    `).join('');
}
