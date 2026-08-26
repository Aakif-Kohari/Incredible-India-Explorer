/**
 * Gandhi's Noakhali Peace Mission Explorer — Interactive Script
 * Handles tab navigation, the Leaflet route map of Noakhali, the route
 * stops list, timeline accordion, theme toggle, smooth scroll, and mobile menu.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initRouteMap();
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

    const bookmarkButtons = document.querySelectorAll('.np-bookmark-btn');
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
                explorerPage: 'frontend/noakhali-peace-mission-explorer/index.html',
                title: "Gandhi's Noakhali Peace Mission",
                thumbnail: 'frontend/noakhali-peace-mission-explorer/',
                category: 'history'
            });
            updateBookmarkUI();
        });
    });

    window.Journey.registerSearchItems(
        'frontend/noakhali-peace-mission-explorer/index.html',
        [
            {
                id: 'noakhali-peace-main',
                title: "Gandhi's Noakhali Peace Mission (1946-47)",
                description: "Follow Mahatma Gandhi's walking peace mission through the villages of Noakhali after the October 1946 communal violence: his arrival, the villages he visited, his peace meetings, and his 'Do or Die' vow for communal harmony.",
                link: 'frontend/noakhali-peace-mission-explorer/index.html'
            },
            {
                id: 'noakhali-peace-route',
                title: "Gandhi's Noakhali Route Map",
                description: "Interactive map of Gandhi's walking tour through the Noakhali countryside from his arrival at Chandpur in November 1946 — the villages, prayer meetings, and sites of his peace mission.",
                link: 'frontend/noakhali-peace-mission-explorer/index.html#route'
            },
            {
                id: 'noakhali-peace-timeline',
                title: "Noakhali Peace Mission Timeline (1946-1948)",
                description: "From the Great Calcutta Killings and the Noakhali violence of October 1946, to Gandhi's four-month walking mission, the spread to Bihar, Partition, and his later peace efforts until his assassination in 1948.",
                link: 'frontend/noakhali-peace-mission-explorer/index.html#timeline'
            }
        ]
    );
}

/**
 * Activate a tab section by its id (shared by tab bar and hash links)
 */
function activateTab(targetTab) {
    const tabs = document.querySelectorAll('.np-tab');
    const sections = document.querySelectorAll('.np-section');
    if (!tabs.length || !sections.length) return;

    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    const tab = document.querySelector(`.np-tab[data-tab="${targetTab}"]`);
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
    const tabs = document.querySelectorAll('.np-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab.dataset.tab));
    });

    // Activate tab from hash if present (e.g. #timeline)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const valid = ['overview', 'violence', 'arrival', 'villages', 'meetings', 'outreach', 'reactions', 'route', 'tensions', 'efforts', 'significance', 'timeline', 'references'];
        if (valid.includes(hash)) activateTab(hash);
    }
}

/**
 * Route stops for Gandhi's Noakhali peace mission
 * Locations and the walking route are approximated from historical accounts
 * of Gandhi's tour between November 1946 and March 1947.
 */
const NP_ROUTE_POINTS = {
    chandpur: {
        title: 'Chandpur — arrival point',
        tag: '🕊️ Start of the mission',
        body: 'Gandhi arrived at the river-port town of Chandpur on 6 November 1946, the gateway to the Noakhali countryside, and announced he would walk from village to village until peace was restored.',
        coords: [23.2339, 90.6532],
        markerClass: 'is-arrival'
    },
    ramganj: {
        title: 'Ramganj',
        tag: '🏘️ Village on the route',
        body: 'A major market town in the affected district and one of the first stops of Gandhi\'s walking tour, where he held prayer meetings and met survivors of the October violence.',
        coords: [23.0875, 90.9511],
        markerClass: 'is-village'
    },
    dattapara: {
        title: 'Dattapara',
        tag: '🏘️ Village on the route',
        body: 'One of the villages Gandhi walked to and stayed in, deep in the heart of the affected countryside, sharing the simple life of the villagers under his "Do or Die" vow.',
        coords: [23.0239, 90.9611],
        markerClass: 'is-village'
    },
    haimchar: {
        title: 'Haimchar',
        tag: '🏘️ Village on the route',
        body: 'A village in the Chandpur region along Gandhi\'s route where he continued his daily round of prayer meetings and reconciliation work.',
        coords: [23.0762, 90.6245],
        markerClass: 'is-village'
    },
    nandigram: {
        title: 'Nandigram',
        tag: '🏘️ Village on the route',
        body: 'A village where Gandhi held meetings and encouraged displaced families to return and rebuild their lives in their ancestral homes.',
        coords: [23.1038, 90.9581],
        markerClass: 'is-village'
    },
    srirampur: {
        title: 'Srirampur',
        tag: '🏘️ Village on the route',
        body: 'A site of sustained peace work, where Gandhi remained for a period and conducted some of the most intensive outreach to both communities.',
        coords: [22.9983, 90.9511],
        markerClass: 'is-village'
    },
    sonapur: {
        title: 'Sonapur',
        tag: '🏘️ Village on the route',
        body: 'A village in the delta where Gandhi continued his walking mission, meeting survivors and appealing for the protection and return of minorities.',
        coords: [23.0339, 90.9311],
        markerClass: 'is-village'
    },
    khilgram: {
        title: 'Khilgram & surrounding hamlets',
        tag: '🏘️ Smaller settlements',
        body: 'Gandhi passed through Khilgram and many smaller hamlets on foot, stopping wherever villagers gathered to speak, pray, and listen.',
        coords: [22.9839, 90.9211],
        markerClass: 'is-village'
    }
};

let routeMap = null;
let routeMarkers = {};

function showRoutePoint(pointId) {
    const point = NP_ROUTE_POINTS[pointId];
    if (!point) return;

    const title = document.getElementById('np-map-detail-title');
    const body = document.getElementById('np-map-detail-body');
    const tag = document.getElementById('np-map-detail-tag');
    if (title) title.textContent = point.title;
    if (body) body.textContent = point.body;
    if (tag) tag.textContent = point.tag;

    if (routeMap && point.coords) {
        routeMap.flyTo(point.coords, Math.max(routeMap.getZoom(), 14), { duration: 0.9 });
        const marker = routeMarkers[pointId];
        if (marker) marker.openPopup();
    }
}

function initRouteMap() {
    const mapContainer = document.getElementById('np-route-map');
    if (!mapContainer || typeof L === 'undefined') return;

    routeMap = L.map(mapContainer, {
        center: [23.07, 90.83],
        zoom: 10,
        scrollWheelZoom: false,
        attributionControl: true,
        zoomControl: false
    });

    L.control.zoom({ position: 'bottomleft' }).addTo(routeMap);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles © Esri'
    }).addTo(routeMap);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors © CARTO'
    }).addTo(routeMap);

    const letterFor = {};
    Object.keys(NP_ROUTE_POINTS).forEach((id, i) => {
        letterFor[id] = String.fromCharCode(65 + i);
    });

    Object.entries(NP_ROUTE_POINTS).forEach(([id, point]) => {
        const icon = L.divIcon({
            className: `np-map-marker ${point.markerClass}`,
            html: `<span aria-hidden="true">${letterFor[id]}</span>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -14]
        });

        const marker = L.marker(point.coords, { icon, title: point.title, alt: point.title, keyboard: true }).addTo(routeMap);

        marker.bindTooltip(point.title, { direction: 'top', offset: [0, -12], className: 'np-map-tooltip' });

        const popupContent = document.createElement('div');
        popupContent.innerHTML = `<p class="np-popup-title">${point.title}</p><p class="np-popup-desc">${point.body}</p><span class="np-popup-tag">${point.tag}</span>`;
        marker.bindPopup(popupContent, { className: 'np-map-popup', closeButton: true, maxWidth: 300 });

        marker.on('click', () => showRoutePoint(id));
        marker.on('keydown', (e) => {
            if (e.originalEvent.key === 'Enter' || e.originalEvent.key === ' ') {
                e.originalEvent.preventDefault();
                showRoutePoint(id);
            }
        });

        routeMarkers[id] = marker;
    });

    // Draw an approximate route line through the walking tour stops
    const routeOrder = ['chandpur', 'haimchar', 'ramganj', 'dattapara', 'nandigram', 'srirampur', 'sonapur', 'khilgram'];
    const latlngs = routeOrder.map(id => NP_ROUTE_POINTS[id].coords).filter(Boolean);
    L.polyline(latlngs, {
        color: '#a8322a',
        weight: 3,
        dashArray: '6 6',
        opacity: 0.85,
        className: 'np-route-line'
    }).addTo(routeMap);

    // Build the shortcut list beneath the map
    const list = document.getElementById('np-map-points-list');
    if (list) {
        Object.entries(NP_ROUTE_POINTS).forEach(([id, point]) => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = point.title;
            btn.setAttribute('aria-label', `Show details for ${point.title}`);
            btn.addEventListener('click', () => showRoutePoint(id));
            li.appendChild(btn);
            list.appendChild(li);
        });
    }

    showRoutePoint('chandpur');

    requestAnimationFrame(() => routeMap.invalidateSize());
    setTimeout(() => routeMap.invalidateSize(), 400);

    const canvas = mapContainer.closest('.np-map-canvas');
    if (canvas && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) routeMap.invalidateSize();
            });
        }, { threshold: 0.05 });
        revealObserver.observe(canvas);
    }
}

/**
 * Initialize the interactive timeline accordion
 */
function initTimeline() {
    const items = document.querySelectorAll('.np-timeline-item');
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
