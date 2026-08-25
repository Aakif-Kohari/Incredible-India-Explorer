/**
 * 1946 Calcutta Crisis Explorer — Interactive Script
 * Handles tab navigation, the Leaflet map of Calcutta, the map points list,
 * timeline accordion, theme toggle, smooth scroll, and mobile menu.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initCalcuttaMap();
    initTimeline();
    initThemeToggle();
    initSmoothScroll();
    initMobileMenu();
    initJourney();
});

/**
 * Journey integration (bookmarks & global search index)
 */
function initJourney() {
    if (!window.Journey) return;

    const bookmarkButtons = document.querySelectorAll('.cc-bookmark-btn');
    bookmarkButtons.forEach((btn) => {
        const id = btn.dataset.bookmarkId;
        const updateBookmarkUI = () => {
            const isSaved = window.Journey.isSaved(id);
            btn.classList.toggle('is-saved', isSaved);
            btn.setAttribute('aria-pressed', String(isSaved));
            btn.textContent = isSaved ? '♥ Saved to Journey' : '♡ Save to Journey';
        };
        updateBookmarkUI();
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.Journey.toggle({
                id,
                explorerPage: 'frontend/calcutta-1946-crisis-explorer/index.html',
                title: '1946 Calcutta Crisis — The Great Calcutta Killings',
                thumbnail: 'frontend/calcutta-1946-crisis-explorer/',
                category: 'history'
            });
            updateBookmarkUI();
        });
    });

    window.Journey.registerSearchItems(
        'frontend/calcutta-1946-crisis-explorer/index.html',
        [
            {
                id: 'calcutta-1946-main',
                title: '1946 Calcutta Crisis — The Great Calcutta Killings',
                description: 'Explore the political crisis behind Direct Action Day of 16 August 1946, the events of the Great Calcutta Killings, the human impact, the spread of violence across Bengal and Bihar, and the road to Partition.',
                link: 'frontend/calcutta-1946-crisis-explorer/index.html'
            },
            {
                id: 'calcutta-1946-map',
                title: 'Historical Calcutta Map — August 1946',
                description: 'Interactive map of Calcutta showing the Maidan assembly, the Direct Action procession routes, the hardest-hit quarters such as Burrabazar, and the points of refuge from the 1946 violence.',
                link: 'frontend/calcutta-1946-crisis-explorer/index.html#map'
            },
            {
                id: 'calcutta-1946-timeline',
                title: '1946 Calcutta Crisis Timeline (1946–1948)',
                description: 'From the Cabinet Mission to Direct Action Day, the Noakhali and Bihar violence, the Mountbatten Plan, and the legacy of the Great Calcutta Killings in Partition.',
                link: 'frontend/calcutta-1946-crisis-explorer/index.html#timeline'
            }
        ]
    );
}

/**
 * Activate a tab section by its id (shared by tab bar and hash links)
 */
function activateTab(targetTab) {
    const tabs = document.querySelectorAll('.cc-tab');
    const sections = document.querySelectorAll('.cc-section');
    if (!tabs.length || !sections.length) return;

    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    const tab = document.querySelector(`.cc-tab[data-tab="${targetTab}"]`);
    const section = document.getElementById(targetTab);
    if (tab) tab.classList.add('active');
    if (section) {
        section.classList.add('active');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Initialize tab navigation for the explorer sections
 */
function initTabNavigation() {
    const tabs = document.querySelectorAll('.cc-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab.dataset.tab));
    });

    // Activate tab from hash if present (e.g. #timeline)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const valid = ['overview', 'calcutta', 'direct-action', 'events', 'map', 'spread', 'impact', 'response', 'reactions', 'bengal', 'timeline', 'references'];
        if (valid.includes(hash)) activateTab(hash);
    }
}

/**
 * Map points for the August 1946 Calcutta violence
 * Locations are drawn from historical accounts of Direct Action Day.
 */
const CC_MAP_POINTS = {
    maidan: {
        title: 'The Maidan & Shaheed Minar (Ochterlony Monument)',
        tag: '🔥 Direct Action assembly',
        body: 'The Ochterlony Monument and the Maidan were the assembly point for the Direct Action Day procession on the morning of 16 August 1946, where large Muslim crowds gathered before marching through the city centre.',
        coords: [22.5647, 88.3482],
        markerClass: 'is-epicentre'
    },
    dharmatala: {
        title: 'Dharmatala Street (Lenin Sarani)',
        tag: '🔥 Route of the procession',
        body: 'The Direct Action procession moved down Dharmatala Street through the commercial heart of Calcutta. Clashes along this route marked the first serious violence of the day.',
        coords: [22.5636, 88.3521],
        markerClass: 'is-violence'
    },
    chowringhee: {
        title: 'Chowringhee Road',
        tag: '🔥 Central Calcutta',
        body: 'The city\'s principal avenue saw mobs converge and clashes erupt as the demonstration passed through mixed Hindu–Muslim neighbourhoods on 16 August.',
        coords: [22.5585, 88.3539],
        markerClass: 'is-violence'
    },
    burrabazar: {
        title: 'Burrabazar & Harrison Road',
        tag: '🧨 Hardest-hit quarter',
        body: 'The dense commercial lanes of Burrabazar and the area around Harrison Road (today\'s Mahatma Gandhi Road) became a major centre of the killing on 17–18 August, with shops and homes attacked.',
        coords: [22.5756, 88.3649],
        markerClass: 'is-violence'
    },
    collegestreet: {
        title: 'College Street & North Calcutta',
        tag: '🧨 Hardest-hit quarter',
        body: 'The lanes off College Street and the crowded bustees of north-central Calcutta were sites of sustained violence, where many poor residents of every community were killed.',
        coords: [22.5751, 88.3640],
        markerClass: 'is-violence'
    },
    dalhousie: {
        title: 'Dalhousie Square & Government House',
        tag: '🏛️ Administrative centre',
        body: 'The administrative quarter where the Bengal government, the police, and Government House (now Raj Bhavan) were located. Reinforcements were dispatched from here to the affected districts.',
        coords: [22.5708, 88.3485],
        markerClass: 'is-political'
    },
    howrah: {
        title: 'Howrah Station & the bridge',
        tag: '🚉 Point of escape',
        body: 'The railway station across the Hooghly and the Howrah Bridge became the principal escape route as tens of thousands of terrified residents fled the city during and after the killings.',
        coords: [22.5856, 88.3439],
        markerClass: 'is-political'
    },
    maidanCamp: {
        title: 'Relief camps on the Maidan',
        tag: '🕊️ Refuge',
        body: 'After the violence subsided, the Maidan and other open grounds held refugee camps sheltering those displaced — a small mercy amid the devastation, and a symbol of the city\'s shattered peace.',
        coords: [22.5565, 88.3449],
        markerClass: 'is-political'
    }
};

let calcuttaMap = null;
let calcuttaMarkers = {};

function showMapPoint(pointId) {
    const point = CC_MAP_POINTS[pointId];
    if (!point) return;

    const title = document.getElementById('cc-map-detail-title');
    const body = document.getElementById('cc-map-detail-body');
    const tag = document.getElementById('cc-map-detail-tag');
    if (title) title.textContent = point.title;
    if (body) body.textContent = point.body;
    if (tag) tag.textContent = point.tag;

    if (calcuttaMap && point.coords) {
        calcuttaMap.flyTo(point.coords, Math.max(calcuttaMap.getZoom(), 14), { duration: 0.9 });
        const marker = calcuttaMarkers[pointId];
        if (marker) marker.openPopup();
    }
}

function initCalcuttaMap() {
    const mapContainer = document.getElementById('cc-calcutta-map');
    if (!mapContainer || typeof L === 'undefined') return;

    calcuttaMap = L.map(mapContainer, {
        center: [22.5697, 88.3538],
        zoom: 13,
        scrollWheelZoom: false,
        attributionControl: true,
        zoomControl: false
    });

    L.control.zoom({ position: 'bottomleft' }).addTo(calcuttaMap);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles © Esri'
    }).addTo(calcuttaMap);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors © CARTO'
    }).addTo(calcuttaMap);

    const letterFor = {};
    Object.keys(CC_MAP_POINTS).forEach((id, i) => {
        letterFor[id] = String.fromCharCode(65 + i);
    });

    Object.entries(CC_MAP_POINTS).forEach(([id, point]) => {
        const icon = L.divIcon({
            className: `cc-map-marker ${point.markerClass}`,
            html: `<span aria-hidden="true">${letterFor[id]}</span>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -14]
        });

        const marker = L.marker(point.coords, { icon, title: point.title, alt: point.title, keyboard: true }).addTo(calcuttaMap);

        marker.bindTooltip(point.title, { direction: 'top', offset: [0, -12], className: 'cc-map-tooltip' });

        const popupContent = document.createElement('div');
        popupContent.innerHTML = `<p class="cc-popup-title">${point.title}</p><p class="cc-popup-desc">${point.body}</p><span class="cc-popup-tag">${point.tag}</span>`;
        marker.bindPopup(popupContent, { className: 'cc-map-popup', closeButton: true, maxWidth: 300 });

        marker.on('click', () => showMapPoint(id));
        marker.on('keydown', (e) => {
            if (e.originalEvent.key === 'Enter' || e.originalEvent.key === ' ') {
                e.originalEvent.preventDefault();
                showMapPoint(id);
            }
        });

        calcuttaMarkers[id] = marker;
    });

    // Build the shortcut list beneath the map
    const list = document.getElementById('cc-map-points-list');
    if (list) {
        Object.entries(CC_MAP_POINTS).forEach(([id, point]) => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = point.title;
            btn.setAttribute('aria-label', `Show details for ${point.title}`);
            btn.addEventListener('click', () => showMapPoint(id));
            li.appendChild(btn);
            list.appendChild(li);
        });
    }

    showMapPoint('maidan');

    requestAnimationFrame(() => calcuttaMap.invalidateSize());
    setTimeout(() => calcuttaMap.invalidateSize(), 400);

    const canvas = mapContainer.closest('.cc-map-canvas');
    if (canvas && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) calcuttaMap.invalidateSize();
            });
        }, { threshold: 0.05 });
        revealObserver.observe(canvas);
    }
}

/**
 * Initialize the interactive timeline accordion
 */
function initTimeline() {
    const items = document.querySelectorAll('.cc-timeline-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const isOpen = item.getAttribute('aria-expanded') === 'true';
            items.forEach(i => {
                i.setAttribute('aria-expanded', 'false');
            });
            item.setAttribute('aria-expanded', String(!isOpen));
        });
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const next = document.body.classList.contains('light-theme') ? 'dark' : 'light';
        document.body.classList.toggle('light-theme', next === 'light');
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

/**
 * Smooth scroll for hash links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });
}
