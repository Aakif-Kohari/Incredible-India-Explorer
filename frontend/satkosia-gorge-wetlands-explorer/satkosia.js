document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderEcology();
    renderFacts();
    renderSpecies();
    renderHotspots();
    renderGallery();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof SATKOSIA_INFO === 'undefined') return;

    grid.innerHTML = SATKOSIA_INFO.quickStats
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
    const crocsEl = document.getElementById('eco-crocs');
    const statusEl = document.getElementById('eco-status');

    if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${ECOLOGY_HYDROLOGY.overview}`;
    if (hydroEl) hydroEl.innerHTML = `<strong>Gorge Hydrology & Mahanadi Canyon:</strong> ${ECOLOGY_HYDROLOGY.gorgeHydrology}`;
    if (crocsEl) crocsEl.innerHTML = `<strong>Crocodile Conservation (Gharial & Mugger):</strong> ${ECOLOGY_HYDROLOGY.crocodileConservation}`;
    if (statusEl) statusEl.innerHTML = `<strong>Conservation Status:</strong> ${ECOLOGY_HYDROLOGY.conservationStatus}`;
}

function renderFacts() {
    const grid = document.getElementById('facts-grid');
    if (!grid || typeof INTERESTING_FACTS === 'undefined') return;

    grid.innerHTML = INTERESTING_FACTS.map(
        f => `
        <div class="fact-card">
            <h3>💡 ${f.title}</h3>
            <p>${f.fact}</p>
        </div>
    `
    ).join('');
}

function renderSpecies() {
    const grid = document.getElementById('species-grid');
    if (!grid || typeof SPECIES_CATALOG === 'undefined') return;

    grid.innerHTML = SPECIES_CATALOG.map(
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
