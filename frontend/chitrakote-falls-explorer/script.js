/**
 * Chitrakote Falls Explorer
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    renderHeightChart();
    renderSeasonPanels();
    renderGallery();
    renderAttractions();
    renderReferences();
    initSeasonSwitcher();
    setTimeout(initMaps, 100);

    /* ================================================================
       SCALE (HEIGHT VS WIDTH) CHART
       ================================================================ */
    function renderHeightChart() {
        const chart = document.getElementById('height-chart');
        if (!chart || typeof HEIGHT_COMPARISONS === 'undefined') return;

        const maxVal = Math.max(...HEIGHT_COMPARISONS.map(h => h.heightMeters));
        chart.innerHTML = HEIGHT_COMPARISONS.map(item => {
            const pct = Math.max(6, Math.round((item.heightMeters / maxVal) * 100));
            const isChitrakote = item.name.includes('Chitrakote');
            return `
                <div class="height-bar-container">
                    <div class="height-bar ${isChitrakote ? 'highlight-bar' : ''}" style="height: ${pct}%; background: ${isChitrakote ? 'var(--chitra-amber)' : '#aaa'};" title="${item.note}"></div>
                    <span class="${isChitrakote ? 'highlight-text' : ''}">${item.name.replace('Chitrakote Falls ', '')} (${item.heightMeters}m)</span>
                </div>
            `;
        }).join('');
    }

    /* ================================================================
       SEASON SWITCHER PANELS
       ================================================================ */
    function renderSeasonPanels() {
        const area = document.getElementById('season-content-area');
        if (!area || typeof SEASON_VIEWS === 'undefined') return;

        area.innerHTML = SEASON_VIEWS.map((s, i) => `
            <div class="flow-panel ${i === 0 ? 'active' : 'hidden'}" id="panel-${s.stage}">
                <img src="${s.img}" alt="${s.alt}" class="flow-img" loading="lazy">
                <div class="flow-desc">
                    <h3>${s.title}</h3>
                    <p>${s.text}</p>
                </div>
            </div>
        `).join('');
    }

    function initSeasonSwitcher() {
        const stages = document.querySelectorAll('#season-switcher .flow-stage');
        const panels = document.querySelectorAll('#season-content-area .flow-panel');

        stages.forEach(stage => {
            stage.addEventListener('click', () => {
                stages.forEach(s => s.classList.remove('active'));
                panels.forEach(p => {
                    p.classList.remove('active');
                    p.classList.add('hidden');
                });

                stage.classList.add('active');

                const targetPanel = document.getElementById(`panel-${stage.dataset.stage}`);
                if (targetPanel) {
                    targetPanel.classList.remove('hidden');
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    /* ================================================================
       GALLERY
       ================================================================ */
    function renderGallery() {
        const grid = document.getElementById('gallery-grid');
        if (!grid || typeof GALLERY_IMAGES === 'undefined') return;

        grid.innerHTML = GALLERY_IMAGES.map(img => `
            <div class="gallery-card">
                <img src="${img.url}" alt="${img.caption}" loading="lazy">
                <p>${img.caption}</p>
            </div>
        `).join('');
    }

    /* ================================================================
       NEARBY ATTRACTIONS
       ================================================================ */
    function renderAttractions() {
        const grid = document.getElementById('attractions-grid');
        if (!grid || typeof NEARBY_ATTRACTIONS === 'undefined') return;

        grid.innerHTML = NEARBY_ATTRACTIONS.map(a => `
            <div class="attraction-card glass-card">
                <h3>📍 ${a.name}</h3>
                <span class="dist-tag">${a.distance} from Chitrakote Falls</span>
                <p>${a.description}</p>
            </div>
        `).join('');
    }

    /* ================================================================
       REFERENCES
       ================================================================ */
    function renderReferences() {
        const list = document.getElementById('references-list');
        if (!list || typeof REFERENCES === 'undefined') return;

        list.innerHTML = REFERENCES.map(r => `
            <li>
                <a href="${r.link}" target="_blank" rel="noopener noreferrer">📚 ${r.text}</a>
            </li>
        `).join('');
    }

    /* ================================================================
       LEAFLET MAPS
       ================================================================ */
    function initMaps() {
        if (typeof L === 'undefined' || typeof CHITRAKOTE_COORDS === 'undefined') return;

        // Main location map
        const mapContainer = document.getElementById('chitra-map');
        if (mapContainer) {
            const map = L.map('chitra-map', {
                center: CHITRAKOTE_COORDS,
                zoom: 12,
                scrollWheelZoom: false
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(map);

            L.marker(CHITRAKOTE_COORDS).addTo(map).bindPopup(`
                <div style="text-align: center;">
                    <strong>Chitrakote Falls</strong><br>
                    Bastar District, Chhattisgarh<br>
                    <em>On the Indravati River</em>
                </div>
            `).openPopup();

            map.on('click', () => { if (!map.scrollWheelZoom.enabled()) map.scrollWheelZoom.enable(); });
            map.on('mouseout', () => map.scrollWheelZoom.disable());
        }

        // Nearby attractions map
        const attrContainer = document.getElementById('attractions-map');
        if (attrContainer && typeof NEARBY_ATTRACTIONS !== 'undefined') {
            const attrMap = L.map('attractions-map', {
                center: CHITRAKOTE_COORDS,
                zoom: 9,
                scrollWheelZoom: false
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(attrMap);

            L.marker(CHITRAKOTE_COORDS).addTo(attrMap).bindPopup('<strong>Chitrakote Falls</strong>');

            NEARBY_ATTRACTIONS.forEach(a => {
                if (typeof a.lat === 'number' && typeof a.lng === 'number') {
                    L.marker([a.lat, a.lng]).addTo(attrMap).bindPopup(`<strong>${a.name}</strong><br>${a.distance} away`);
                }
            });

            attrMap.on('click', () => { if (!attrMap.scrollWheelZoom.enabled()) attrMap.scrollWheelZoom.enable(); });
            attrMap.on('mouseout', () => attrMap.scrollWheelZoom.disable());
        }
    }
});