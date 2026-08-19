/**
 * Kempty Falls Explorer
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    renderHeightChart();
    renderTierPanels();
    renderSeasonal();
    renderViewpoints();
    renderGallery();
    renderAttractions();
    renderReferences();
    initTierInteractivity();
    setTimeout(initMaps, 100);

    /* ================================================================
       HEIGHT COMPARISON CHART
       ================================================================ */
    function renderHeightChart() {
        const chart = document.getElementById('height-chart');
        if (!chart || typeof HEIGHT_COMPARISONS === 'undefined') return;

        const maxHeight = Math.max(...HEIGHT_COMPARISONS.map(h => h.heightMeters));
        chart.innerHTML = HEIGHT_COMPARISONS.map(item => {
            const pct = Math.max(6, Math.round((item.heightMeters / maxHeight) * 100));
            const isKempty = item.name.includes('Kempty');
            return `
                <div class="height-bar-container">
                    <div class="height-bar ${isKempty ? 'highlight-bar' : ''}" style="height: ${pct}%; background: ${isKempty ? 'var(--kempty-teal)' : '#aaa'};" title="${item.note}"></div>
                    <span class="${isKempty ? 'highlight-text' : ''}">${item.name.replace(' (total drop)', '')} (${item.heightMeters}m)</span>
                </div>
            `;
        }).join('');
    }

    /* ================================================================
       5-TIER CASCADE PANELS
       ================================================================ */
    function renderTierPanels() {
        const area = document.getElementById('tier-content-area');
        if (!area || typeof TIER_STAGES === 'undefined') return;

        area.innerHTML = TIER_STAGES.map((t, i) => `
            <div class="flow-panel ${i === 0 ? 'active' : 'hidden'}" id="panel-${t.stage}">
                <img src="${t.img}" alt="${t.alt}" class="flow-img" loading="lazy">
                <div class="flow-desc">
                    <h3>${t.stage}. ${t.title}</h3>
                    <p>${t.text}</p>
                </div>
            </div>
        `).join('');
    }

    function initTierInteractivity() {
        const stages = document.querySelectorAll('#tier-stages .flow-stage');
        const panels = document.querySelectorAll('#tier-content-area .flow-panel');

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
       SEASONAL COMPARISON
       ================================================================ */
    function renderSeasonal() {
        const grid = document.getElementById('season-comparison');
        if (!grid || typeof SEASONAL_DATA === 'undefined') return;

        grid.innerHTML = SEASONAL_DATA.map(s => `
            <div class="season-card glass-card">
                <div class="season-img-wrapper">
                    <img src="${s.img}" alt="${s.alt}" loading="lazy">
                    <span class="season-badge ${s.badgeClass}">${s.season}</span>
                </div>
                <div class="season-info">
                    <h4>${s.title}</h4>
                    <p>${s.text}</p>
                </div>
            </div>
        `).join('');
    }

    /* ================================================================
       VIEWPOINTS
       ================================================================ */
    function renderViewpoints() {
        const grid = document.getElementById('viewpoints-grid');
        if (!grid || typeof VIEWPOINTS === 'undefined') return;

        grid.innerHTML = VIEWPOINTS.map(v => `
            <div class="viewpoint-card glass-card">
                <img src="${v.img}" alt="${v.alt}" loading="lazy">
                <h4>${v.title}</h4>
                <p>${v.text}</p>
            </div>
        `).join('');
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
                <span class="dist-tag">${a.distance} from Kempty Falls</span>
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
        if (typeof L === 'undefined' || typeof KEMPTY_COORDS === 'undefined') return;

        // Main location map
        const mapContainer = document.getElementById('kempty-map');
        if (mapContainer) {
            const map = L.map('kempty-map', {
                center: KEMPTY_COORDS,
                zoom: 13,
                scrollWheelZoom: false
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(map);

            L.marker(KEMPTY_COORDS).addTo(map).bindPopup(`
                <div style="text-align: center;">
                    <strong>Kempty Falls</strong><br>
                    Ram Gaon, Tehri Garhwal, Uttarakhand
                </div>
            `).openPopup();

            map.on('click', () => { if (!map.scrollWheelZoom.enabled()) map.scrollWheelZoom.enable(); });
            map.on('mouseout', () => map.scrollWheelZoom.disable());
        }

        // Nearby attractions map
        const attrContainer = document.getElementById('attractions-map');
        if (attrContainer && typeof NEARBY_ATTRACTIONS !== 'undefined') {
            const attrMap = L.map('attractions-map', {
                center: KEMPTY_COORDS,
                zoom: 11,
                scrollWheelZoom: false
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(attrMap);

            L.marker(KEMPTY_COORDS).addTo(attrMap).bindPopup('<strong>Kempty Falls</strong>');

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