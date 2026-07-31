document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderEcology();
    renderSpecies();
    renderHotspots();
    renderGallery();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof TAMPARA_INFO === 'undefined') return;

    grid.innerHTML = TAMPARA_INFO.quickStats
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

function renderEcology() {
    if (typeof ECOLOGY_HYDROLOGY === 'undefined') return;
    const overviewEl = document.getElementById('eco-overview');
    const hydroEl = document.getElementById('eco-hydrology');
    const fisheriesEl = document.getElementById('eco-fisheries');
    const statusEl = document.getElementById('eco-status');

    if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${ECOLOGY_HYDROLOGY.overview}`;
    if (hydroEl) hydroEl.innerHTML = `<strong>Hydrology & Coastal Setting:</strong> ${ECOLOGY_HYDROLOGY.hydrology}`;
    if (fisheriesEl) fisheriesEl.innerHTML = `<strong>Fisheries & Local Economy:</strong> ${ECOLOGY_HYDROLOGY.fisheriesAndEconomy}`;
    if (statusEl) statusEl.innerHTML = `<strong>Conservation Status:</strong> ${ECOLOGY_HYDROLOGY.conservationStatus}`;
}

function renderSpecies() {
    const grid = document.getElementById('species-grid');
    if (!grid || typeof BIRD_FISH_SPECIES === 'undefined') return;

    grid.innerHTML = BIRD_FISH_SPECIES.map(
        sp => `
        <div class="species-card">
            <img src="${sp.image}" alt="${sp.name}" loading="lazy" />
            <div class="species-card-body">
                <div class="species-header">
                    <h3>${sp.name} ${sp.icon}</h3>
                    <span class="status-badge">${sp.status}</span>
                </div>
                <p class="scientific-name"><em>${sp.scientificName}</em></p>
                <p>${sp.description}</p>
                <div class="bird-meta">
                    <span>🗓️ ${sp.season}</span> | 
                    <span>📏 ${sp.wingspan || sp.size}</span>
                </div>
            </div>
        </div>
    `
    ).join('');
}

function renderHotspots() {
    const grid = document.getElementById('hotspots-grid');
    if (!grid || typeof MAP_HOTSPOTS === 'undefined') return;

    grid.innerHTML = MAP_HOTSPOTS.map(
        spot => `
        <div class="hotspot-card">
            <h3>📍 ${spot.title}</h3>
            <span class="spot-type">${spot.type}</span>
            <p>${spot.description}</p>
            <small>Coordinates: ${spot.lat}° N, ${spot.lng}° E</small>
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

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}
