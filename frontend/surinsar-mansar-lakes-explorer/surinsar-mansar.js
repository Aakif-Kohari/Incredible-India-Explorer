document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderEcosystem();
    renderRamsar();
    renderReligious();
    renderWildlife();
    renderBirds();
    renderLegends();
    renderHotspots();
    initMap();
    renderGallery();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof SM_INFO === 'undefined') return;

    grid.innerHTML = SM_INFO.quickStats
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

function renderEcosystem() {
    if (typeof TWIN_LAKE_ECOSYSTEM === 'undefined') return;
    const overviewEl = document.getElementById('eco-overview');
    const surinsarEl = document.getElementById('eco-surinsar');
    const mansarEl = document.getElementById('eco-mansar');
    const hydroEl = document.getElementById('eco-hydrology');

    if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${TWIN_LAKE_ECOSYSTEM.overview}`;
    if (surinsarEl) surinsarEl.innerHTML = `<strong>Surinsar Lake:</strong> ${TWIN_LAKE_ECOSYSTEM.surinsarProfile}`;
    if (mansarEl) mansarEl.innerHTML = `<strong>Mansar Lake:</strong> ${TWIN_LAKE_ECOSYSTEM.mansarProfile}`;
    if (hydroEl) hydroEl.innerHTML = `<strong>Hydrology & Water Source:</strong> ${TWIN_LAKE_ECOSYSTEM.hydrology}`;
}

function renderRamsar() {
    if (typeof RAMSAR_DETAILS === 'undefined') return;
    const summaryEl = document.getElementById('ramsar-summary');
    const criteriaEl = document.getElementById('ramsar-criteria');
    const threatsEl = document.getElementById('ramsar-threats');
    const conservationEl = document.getElementById('ramsar-conservation');

    if (summaryEl) summaryEl.textContent = RAMSAR_DETAILS.summary;
    if (criteriaEl)
        criteriaEl.innerHTML = RAMSAR_DETAILS.criteria.map(item => `<li>${item}</li>`).join('');
    if (threatsEl)
        threatsEl.innerHTML = RAMSAR_DETAILS.threats.map(item => `<li>${item}</li>`).join('');
    if (conservationEl)
        conservationEl.innerHTML = `<strong>Conservation & Management:</strong> ${RAMSAR_DETAILS.conservation}`;
}

function renderReligious() {
    const grid = document.getElementById('religious-grid');
    if (!grid || typeof RELIGIOUS_IMPORTANCE === 'undefined') return;

    grid.innerHTML = RELIGIOUS_IMPORTANCE.map(
        item => `
        <div class="sm-card">
            <span class="sm-card-icon">${item.icon}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `
    ).join('');
}

function renderWildlife() {
    const grid = document.getElementById('wildlife-grid');
    if (!grid || typeof WILDLIFE_SPECIES === 'undefined') return;

    grid.innerHTML = WILDLIFE_SPECIES.map(
        sp => `
        <div class="species-card">
            <div class="species-card-body">
                <div class="species-header">
                    <h3>${sp.icon} ${sp.name}</h3>
                    <span class="status-badge">${sp.status}</span>
                </div>
                <p class="scientific-name"><em>${sp.scientificName} · ${sp.category}</em></p>
                <p>${sp.description}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderBirds() {
    const grid = document.getElementById('birds-grid');
    if (!grid || typeof BIRD_SPECIES === 'undefined') return;

    grid.innerHTML = BIRD_SPECIES.map(
        sp => `
        <div class="species-card">
            <div class="species-card-body">
                <div class="species-header">
                    <h3>${sp.icon} ${sp.name}</h3>
                    <span class="status-badge">${sp.status}</span>
                </div>
                <p class="scientific-name"><em>${sp.scientificName}</em></p>
                <p>${sp.description}</p>
                <div class="bird-meta">
                    <span>🗓️ ${sp.season}</span> |
                    <span>📊 ${sp.count}</span>
                </div>
            </div>
        </div>
    `
    ).join('');
}

function renderLegends() {
    const grid = document.getElementById('legends-grid');
    if (!grid || typeof LOCAL_LEGENDS === 'undefined') return;

    grid.innerHTML = LOCAL_LEGENDS.map(
        item => `
        <div class="sm-card legend-card">
            <span class="sm-card-icon">${item.icon}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
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

function initMap() {
    const mapEl = document.getElementById('map-container');
    if (!mapEl || typeof MAP_HOTSPOTS === 'undefined' || typeof L === 'undefined') return;

    const map = L.map('map-container').setView([SM_INFO.coordinates.lat, SM_INFO.coordinates.lng], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    MAP_HOTSPOTS.forEach(spot => {
        L.marker([spot.lat, spot.lng])
            .addTo(map)
            .bindPopup(`<strong>${spot.title}</strong><br/><em>${spot.type}</em><br/>${spot.description}`);
    });
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
