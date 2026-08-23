document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderHistory();
    populateRailwayFilters();
    renderLines(MOUNTAIN_RAILWAYS);
    renderScenic();
    renderFacts();
    renderGallery();
    initThemeToggle();
    initRailwayFilters();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof RAILWAYS_INFO === 'undefined') return;

    grid.innerHTML = RAILWAYS_INFO.quickStats
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

function renderHistory() {
    if (typeof ENGINEERING_MARVELS === 'undefined') return;
    const overviewEl = document.getElementById('rail-overview');
    const mechEl = document.getElementById('rail-mechanisms');
    const statusEl = document.getElementById('rail-status');

    if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${ENGINEERING_MARVELS.overview}`;
    if (mechEl) mechEl.innerHTML = `<strong>Engineering Innovations:</strong> ${ENGINEERING_MARVELS.mechanisms}`;
    if (statusEl) statusEl.innerHTML = `<strong>Conservation Status:</strong> ${ENGINEERING_MARVELS.conservationStatus}`;
}

// --- Filtering (Region / Railway / Terrain) --------------------------
function populateRailwayFilters() {
    if (typeof MOUNTAIN_RAILWAYS === 'undefined') return;

    const regionSelect = document.getElementById('filter-region');
    const railwaySelect = document.getElementById('filter-railway');
    const terrainSelect = document.getElementById('filter-terrain');
    if (!regionSelect || !railwaySelect || !terrainSelect) return;

    const regions = [...new Set(MOUNTAIN_RAILWAYS.map(r => r.state))].sort();
    const terrains = [...new Set(MOUNTAIN_RAILWAYS.map(r => r.terrain))].sort();

    regions.forEach(region => {
        const opt = document.createElement('option');
        opt.value = region;
        opt.textContent = region;
        regionSelect.appendChild(opt);
    });

    MOUNTAIN_RAILWAYS.forEach(railway => {
        const opt = document.createElement('option');
        opt.value = railway.id;
        opt.textContent = railway.name;
        railwaySelect.appendChild(opt);
    });

    terrains.forEach(terrain => {
        const opt = document.createElement('option');
        opt.value = terrain;
        opt.textContent = terrain;
        terrainSelect.appendChild(opt);
    });
}

function initRailwayFilters() {
    const regionSelect = document.getElementById('filter-region');
    const railwaySelect = document.getElementById('filter-railway');
    const terrainSelect = document.getElementById('filter-terrain');
    const clearBtn = document.getElementById('clear-railway-filters');
    const form = document.getElementById('railway-filter-form');
    if (!regionSelect || !railwaySelect || !terrainSelect) return;

    function applyRailwayFilters() {
        const region = regionSelect.value;
        const railwayId = railwaySelect.value;
        const terrain = terrainSelect.value;

        const filtered = MOUNTAIN_RAILWAYS.filter(r => {
            const matchesRegion = !region || r.state === region;
            const matchesRailway = !railwayId || r.id === railwayId;
            const matchesTerrain = !terrain || r.terrain === terrain;
            return matchesRegion && matchesRailway && matchesTerrain;
        });

        renderLines(filtered);

        const status = document.getElementById('railway-filter-status');
        if (status) {
            status.textContent = `Showing ${filtered.length} of ${MOUNTAIN_RAILWAYS.length} mountain railways.`;
        }
    }

    regionSelect.addEventListener('change', applyRailwayFilters);
    railwaySelect.addEventListener('change', applyRailwayFilters);
    terrainSelect.addEventListener('change', applyRailwayFilters);

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            regionSelect.value = '';
            railwaySelect.value = '';
            terrainSelect.value = '';
            applyRailwayFilters();
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => e.preventDefault());
    }
}

// --- Railway Cards (with Explore / Route toggle) ----------------------
function renderLines(lines) {
    const grid = document.getElementById('lines-grid');
    if (!grid) return;

    if (!lines || lines.length === 0) {
        grid.innerHTML = '<p class="no-results">No mountain railways match your filters.</p>';
        return;
    }

    grid.innerHTML = lines.map(
        line => `
        <div class="line-card" id="line-${line.id}">
            <img src="${line.image}" alt="${line.name} mountain railway" loading="lazy" />
            <div class="line-card-body">
                <div class="line-header">
                    <h3>${line.name} ${line.icon}</h3>
                    <span class="unesco-badge">UNESCO (${line.unescoYear})</span>
                </div>
                <p class="route-lbl"><strong>Location:</strong> ${line.state}</p>
                <p class="route-lbl"><strong>Route:</strong> ${line.route} (${line.length})</p>
                <p class="gauge-lbl"><strong>Gauge:</strong> ${line.gauge} | <strong>Highest:</strong> ${line.highestPoint}</p>
                <p>${line.description}</p>
                <div class="highlights-box">
                    <strong>Engineering Highlights:</strong>
                    <ul>
                        ${line.highlights.map(h => `<li>✨ ${h}</li>`).join('')}
                    </ul>
                </div>
                <button type="button" class="btn-explore-line" data-line-id="${line.id}" aria-expanded="false" aria-controls="route-detail-${line.id}">
                    Explore Route &amp; Stations ▾
                </button>
                <div class="route-detail-panel" id="route-detail-${line.id}">
                    <p><strong>Major Stations:</strong></p>
                    <ol class="station-list">
                        ${line.majorStations ? line.majorStations.map(s => `<li>${s}</li>`).join('') : '<li>Station data unavailable</li>'}
                    </ol>
                </div>
            </div>
        </div>
    `
    ).join('');

    grid.querySelectorAll('.btn-explore-line').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = document.getElementById(`line-${btn.dataset.lineId}`);
            const isExpanded = card.classList.toggle('expanded');
            btn.setAttribute('aria-expanded', String(isExpanded));
            btn.innerHTML = isExpanded ? 'Hide Route &amp; Stations ▴' : 'Explore Route &amp; Stations ▾';
        });
    });
}

// --- Scenic Highlights -------------------------------------------------
function renderScenic() {
    const grid = document.getElementById('scenic-grid');
    if (!grid || typeof MOUNTAIN_RAILWAYS === 'undefined') return;

    grid.innerHTML = MOUNTAIN_RAILWAYS.map(line => `
        <div class="scenic-card">
            <h3>${line.name}</h3>
            <ul>
                ${(line.scenicHighlights || []).map(h => `<li>🏞️ ${h}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// --- Interesting Facts --------------------------------------------------
function renderFacts() {
    const grid = document.getElementById('facts-list-grid');
    if (!grid || typeof INTERESTING_FACTS === 'undefined') return;

    grid.innerHTML = INTERESTING_FACTS.map(fact => `
        <div class="fact-list-card" tabindex="0">
            <p>💡 ${fact}</p>
        </div>
    `).join('');
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