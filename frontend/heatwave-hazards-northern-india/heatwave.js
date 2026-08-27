/**
 * heatwave.js
 * Client-side script for Northern India Heatwave Hazards Explorer
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initTabs();
    renderCauses();
    renderSocioEconomic();
    renderWarningMatrix();
    renderPrep();
    renderSources();
    initMap();
});

/* -------------------------------------------------------------------------- */
/* 1. Theme Toggler                                                           */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isLight = document.documentElement.classList.toggle('light-theme');
        if (isLight) {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleBtn.setAttribute('aria-pressed', 'true');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            toggleBtn.setAttribute('aria-pressed', 'false');
            localStorage.setItem('theme', 'dark');
        }
    });
}

/* -------------------------------------------------------------------------- */
/* 2. ARIA Accessible Tab Switcher                                           */
/* -------------------------------------------------------------------------- */
function initTabs() {
    const tabBtns = document.querySelectorAll('.heatwave-tab-btn');
    const tabPanels = document.querySelectorAll('.heatwave-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });

            tabPanels.forEach(panel => {
                panel.classList.remove('active');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/* -------------------------------------------------------------------------- */
/* 3. Render Climatological Causes                                            */
/* -------------------------------------------------------------------------- */
function renderCauses() {
    const container = document.getElementById('causesGrid');
    if (!container || typeof HEATWAVE_CHAPTERS === 'undefined') return;

    const causes = HEATWAVE_CHAPTERS.filter(c => c.id === 'climatic-causes' || c.id === 'urban-heat-island');
    container.innerHTML = causes.map(sec => `
        <article class="heatwave-card">
            <span class="heatwave-eyebrow">${sec.eyebrow}</span>
            <h3 class="heatwave-card__title">${sec.title}</h3>
            <p class="heatwave-card__desc" style="font-weight:500; color:var(--heatwave-text); margin-bottom:1rem;">${sec.summary}</p>
            <ul style="padding-left:1.25rem; display:flex; flex-direction:column; gap:0.5rem; color:var(--heatwave-text-dim); font-size:0.95rem;">
                ${sec.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 4. Render Socio-Economic Impacts                                           */
/* -------------------------------------------------------------------------- */
function renderSocioEconomic() {
    const container = document.getElementById('socioEconomicGrid');
    if (!container || typeof HEATWAVE_CHAPTERS === 'undefined') return;

    const impacts = HEATWAVE_CHAPTERS.filter(c => c.id === 'agriculture-impact' || c.id === 'water-resources');
    container.innerHTML = impacts.map(sec => `
        <article class="heatwave-card">
            <span class="heatwave-eyebrow">${sec.eyebrow}</span>
            <h3 class="heatwave-card__title">${sec.title}</h3>
            <p class="heatwave-card__desc" style="font-weight:500; color:var(--heatwave-text); margin-bottom:1rem;">${sec.summary}</p>
            <ul style="padding-left:1.25rem; display:flex; flex-direction:column; gap:0.5rem; color:var(--heatwave-text-dim); font-size:0.95rem;">
                ${sec.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
        </article>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 5. Render IMD Alert Matrix                                                 */
/* -------------------------------------------------------------------------- */
function renderWarningMatrix() {
    const container = document.getElementById('warningMatrix');
    if (!container || typeof HEATWAVE_WARNING_LEVELS === 'undefined') return;

    container.innerHTML = HEATWAVE_WARNING_LEVELS.map(level => `
        <div class="heatwave-matrix-card level-${level.color.toLowerCase()}">
            <span class="heatwave-matrix-card__badge">${level.label}</span>
            <h3 class="heatwave-matrix-card__title">IMD ${level.color} Alert</h3>
            <p class="heatwave-matrix-card__threshold">⚠️ ${level.threshold}</p>
            <p class="heatwave-card__desc" style="color:var(--heatwave-text-dim);">${level.action}</p>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 6. Render Preparedness Action Cards                                       */
/* -------------------------------------------------------------------------- */
function renderPrep() {
    const container = document.getElementById('prepGrid');
    if (!container || typeof HEATWAVE_PREPAREDNESS === 'undefined') return;

    container.innerHTML = HEATWAVE_PREPAREDNESS.map(card => `
        <div class="heatwave-prep-card">
            <h3 class="heatwave-prep-card__header">
                <span class="heatwave-prep-card__icon">${card.icon}</span>
                ${card.title}
            </h3>
            <ul class="heatwave-prep-card__list">
                ${card.steps.map(step => `<li>${step}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 7. Render Sources & Citations                                              */
/* -------------------------------------------------------------------------- */
function renderSources() {
    const container = document.getElementById('sourcesList');
    if (!container || typeof HEATWAVE_SOURCES === 'undefined') return;

    container.innerHTML = HEATWAVE_SOURCES.map(s => `
        <div class="heatwave-source-item">
            <div class="heatwave-source-item__citation">📚 ${s.citation}</div>
            <div class="heatwave-source-item__notes">${s.notes}</div>
        </div>
    `).join('');
}

/* -------------------------------------------------------------------------- */
/* 8. Leaflet Map Initialization                                              */
/* -------------------------------------------------------------------------- */
function initMap() {
    const mapElement = document.getElementById('heatwave-map');
    if (!mapElement || typeof L === 'undefined') return;

    // Center Leaflet map around Northern India
    const map = L.map('heatwave-map', {
        scrollWheelZoom: false,
        minZoom: 5,
        maxZoom: 10
    }).setView([26.5, 78.5], 5);

    // Dark layer tile provider matching dark/light mode
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 12
    }).addTo(map);

    if (typeof HEATWAVE_REGIONS !== 'undefined') {
        HEATWAVE_REGIONS.forEach(reg => {
            const isExtreme = reg.risk.includes('Extreme');
            const color = isExtreme ? '#be123c' : '#d97706'; // Red for Extreme, Amber for High
            
            const circle = L.circleMarker([reg.lat, reg.lng], {
                radius: 12,
                color: color,
                fillColor: color,
                fillOpacity: 0.75,
                weight: 3
            }).addTo(map);

            circle.bindPopup(`
                <div style="font-family: 'Outfit', sans-serif; color: #fff; padding: 0.25rem;">
                    <strong style="font-size: 1.05rem; display: block; margin-bottom: 0.25rem; color: #f97316;">${reg.name}</strong>
                    <span style="font-size: 0.85rem; font-weight: 700; color: ${color}; display: block; margin-bottom: 0.5rem;">⚠️ Risk Level: ${reg.risk}</span>
                    <span style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 0.5rem; color: #fff;">🌡️ Avg Temp Peak: ${reg.temp}</span>
                    <p style="font-size: 0.82rem; margin: 0; line-height: 1.4; color: #ddd;">${reg.description}</p>
                </div>
            `);
        });
    }
}
