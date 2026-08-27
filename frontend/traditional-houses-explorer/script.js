/* ==========================================================================
   Traditional Houses Explorer Logic
   Handles search, multi-criteria filtering, interactive map, and Journey API.
   ========================================================================== */

/**
 * Comprehensive dataset of Traditional Indian Houses.
 * Includes data for parallel PRs (Kath Kuni, Koti Banal, Wada, Goan).
 * @type {Array<Object>}
 */
const housesData = [
    {
        id: 'kath-kuni', name: 'Kath Kuni Houses', state: 'Himachal Pradesh', region: 'north',
        climate: 'alpine', material: 'timber',
        desc: 'Traditional timber-and-stone architecture adapted to the harsh Himalayan winters and steep slopes.',
        features: ['Timber Layers', 'Stone Base', 'Insulation'],
        img: 'https://placehold.co/400x300/8B4513/fff',
        link: '../kath-kuni-houses/index.html'
    },
    {
        id: 'koti-banal', name: 'Koti Banal Houses', state: 'Uttarakhand', region: 'north',
        climate: 'alpine', material: 'stone',
        desc: 'Earthquake-resistant multi-story structures utilizing a unique timber-and-stone framework.',
        features: ['Seismic Resilience', 'Stone Masonry', 'Wooden Frame'],
        img: 'https://placehold.co/400x300/696969/fff',
        link: '../koti-banal-houses/index.html'
    },
    {
        id: 'wada', name: 'Wada Houses', state: 'Maharashtra', region: 'west',
        climate: 'tropical', material: 'timber',
        desc: 'Grand courtyard mansions of the Maratha empire, designed for joint families and natural ventilation.',
        features: ['Courtyard', 'Wooden Pillars', 'Natural Cooling'],
        img: 'https://placehold.co/400x300/CD853F/fff',
        link: '../wada-houses/index.html'
    },
    {
        id: 'goan', name: 'Goan Traditional Houses', state: 'Goa', region: 'south',
        climate: 'coastal', material: 'laterite',
        desc: 'A vibrant blend of Indian and Portuguese architectural styles, adapted to the tropical monsoon.',
        features: ['Verandahs', 'Laterite Stone', 'Oyster Windows'],
        img: 'https://placehold.co/400x300/B22222/fff',
        link: '../goan-traditional-houses/index.html'
    },
    {
        id: 'bhunga', name: 'Bhunga', state: 'Gujarat', region: 'west',
        climate: 'arid', material: 'mud',
        desc: 'Circular mud huts of the Kutch region, highly resilient to earthquakes and extreme desert heat.',
        features: ['Circular Plan', 'Thatch Roof', 'Thermal Mass'],
        img: 'https://placehold.co/400x300/D2B48C/333',
        link: '#'
    },
    {
        id: 'nalukettu', name: 'Nalukettu', state: 'Kerala', region: 'south',
        climate: 'tropical', material: 'timber',
        desc: 'Traditional matrilineal joint-family homes with a central open courtyard (Nadumuttam) for rain and light.',
        features: ['Nadumuttam', 'Sloping Roof', 'Teak Wood'],
        img: 'https://placehold.co/400x300/556B2F/fff',
        link: '#'
    }
];

let activeFilters = {
    search: '',
    climate: 'all',
    material: 'all',
    region: 'all'
};

function init() {
    renderHouses();
    attachEventListeners();
    setupThemeToggle();
    setupScrollAnimations();
    setupJourneyIntegration();
}

function renderHouses() {
    const grid = document.getElementById('house-grid');
    const noResults = document.getElementById('no-results');
    if (!grid) return;

    const filtered = housesData.filter(house => {
        const matchSearch = house.name.toLowerCase().includes(activeFilters.search) ||
            house.state.toLowerCase().includes(activeFilters.search) ||
            house.material.toLowerCase().includes(activeFilters.search);
        const matchClimate = activeFilters.climate === 'all' || house.climate === activeFilters.climate;
        const matchMaterial = activeFilters.material === 'all' || house.material === activeFilters.material;
        const matchRegion = activeFilters.region === 'all' || house.region === activeFilters.region;

        return matchSearch && matchClimate && matchMaterial && matchRegion;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.hidden = false;
        return;
    }

    noResults.hidden = true;
    grid.innerHTML = filtered.map(house => `
        <article class="house-card animate-on-scroll" role="listitem">
            <div class="card-img" style="background-image: url('${house.img}')">
                <span class="card-badge">${house.climate}</span>
            </div>
            <div class="card-content">
                <h3>${house.name}</h3>
                <div class="card-meta">📍 ${house.state}</div>
                <p>${house.desc}</p>
                <div class="card-features">
                    ${house.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                </div>
                <a href="${house.link}" class="btn-explore" aria-label="Explore ${house.name}">Explore Architecture &rarr;</a>
            </div>
        </article>
    `).join('');

    // Re-observe for scroll animations
    if (window.scrollObserver) {
        grid.querySelectorAll('.animate-on-scroll').forEach(el => window.scrollObserver.observe(el));
    }
}

function attachEventListeners() {
    // Search Input
    const searchInput = document.getElementById('house-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            activeFilters.search = e.target.value.toLowerCase();
            renderHouses();
        }, 300));
    }

    // Dropdown Filters
    ['climate', 'material', 'region'].forEach(type => {
        const select = document.getElementById(`${type}-filter`);
        if (select) {
            select.addEventListener('change', (e) => {
                activeFilters[type] = e.target.value;
                updateMapActiveState();
                renderHouses();
            });
        }
    });

    // Interactive Map Regions
    document.querySelectorAll('.map-region').forEach(region => {
        region.addEventListener('click', () => handleMapClick(region));
        region.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleMapClick(region);
            }
        });
    });
}

function handleMapClick(regionEl) {
    const region = regionEl.dataset.region;
    const regionSelect = document.getElementById('region-filter');

    // Toggle logic: if already active, clear filter. Else, set filter.
    if (activeFilters.region === region) {
        activeFilters.region = 'all';
        if (regionSelect) regionSelect.value = 'all';
    } else {
        activeFilters.region = region;
        if (regionSelect) regionSelect.value = region;
    }

    updateMapActiveState();
    renderHouses();
}

function updateMapActiveState() {
    document.querySelectorAll('.map-region').forEach(el => {
        if (el.dataset.region === activeFilters.region) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggle.textContent = isLight ? '☀️' : '🌙';
    });
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        toggle.textContent = '☀️';
    }
}

function setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    window.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => window.scrollObserver.observe(el));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function setupJourneyIntegration() {
    if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
        const items = housesData.filter(h => h.link !== '#').map(h => ({
            id: 'house-' + h.id, title: h.name, description: h.desc, link: h.link
        }));
        window.Journey.registerSearchItems('frontend/traditional-houses-explorer/index.html', items);
    }
}

document.addEventListener('DOMContentLoaded', init);
