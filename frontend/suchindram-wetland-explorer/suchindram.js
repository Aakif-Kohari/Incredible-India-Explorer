document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderSections();
    renderBirdSpecies();
    initBirdFilters();
    renderMapHotspots();
    renderGallery();
    initLightbox();
    initTabsNav();
    initThemeToggle();
    initScrollProgress();
    initNavbarToggle();
});

/* --------------------------------------------------------------------------
   Quick Stats Rendering
   -------------------------------------------------------------------------- */
function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof SUCHINDRAM_INFO === 'undefined') return;

    grid.innerHTML = SUCHINDRAM_INFO.quickStats.map(stat => `
        <div class="stat-card">
            <span class="stat-icon">${stat.icon}</span>
            <div class="stat-val">${stat.value}</div>
            <div class="stat-lbl">${stat.label}</div>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   Sections Rendering (History, Ramsar, Freshwater, Biodiversity, Conservation)
   -------------------------------------------------------------------------- */
function renderSections() {
    if (typeof SUCHINDRAM_SECTIONS === 'undefined') return;

    // History
    const historyGrid = document.getElementById('history-grid');
    if (historyGrid && SUCHINDRAM_SECTIONS.history) {
        historyGrid.innerHTML = `
            <div class="info-block-card">
                <h3>${SUCHINDRAM_SECTIONS.history.subtitle}</h3>
                ${SUCHINDRAM_SECTIONS.history.paragraphs.map(p => `<p>${p}</p>`).join('')}
            </div>
        `;
    }

    // Ramsar Site
    const ramsarContainer = document.getElementById('ramsar-container');
    if (ramsarContainer && SUCHINDRAM_SECTIONS.ramsarSite) {
        ramsarContainer.innerHTML = `
            <div class="info-block-card">
                <h3>${SUCHINDRAM_SECTIONS.ramsarSite.subtitle}</h3>
                ${SUCHINDRAM_SECTIONS.ramsarSite.paragraphs.map(p => `<p>${p}</p>`).join('')}
            </div>
        `;
    }

    // Freshwater Wetland
    const freshGrid = document.getElementById('freshwater-grid');
    if (freshGrid && SUCHINDRAM_SECTIONS.freshwaterWetland) {
        freshGrid.innerHTML = `
            <div class="info-block-card">
                <h3>${SUCHINDRAM_SECTIONS.freshwaterWetland.subtitle}</h3>
                ${SUCHINDRAM_SECTIONS.freshwaterWetland.paragraphs.map(p => `<p>${p}</p>`).join('')}
            </div>
        `;
    }

    // Aquatic Biodiversity
    const bioGrid = document.getElementById('biodiversity-grid');
    if (bioGrid && SUCHINDRAM_SECTIONS.aquaticBiodiversity) {
        bioGrid.innerHTML = `
            <div class="info-block-card">
                <h3>${SUCHINDRAM_SECTIONS.aquaticBiodiversity.subtitle}</h3>
                ${SUCHINDRAM_SECTIONS.aquaticBiodiversity.paragraphs.map(p => `<p>${p}</p>`).join('')}
            </div>
        `;
    }

    // Conservation
    const consGrid = document.getElementById('conservation-grid');
    if (consGrid && SUCHINDRAM_SECTIONS.conservation) {
        consGrid.innerHTML = `
            <div class="info-block-card">
                <h3>${SUCHINDRAM_SECTIONS.conservation.subtitle}</h3>
                ${SUCHINDRAM_SECTIONS.conservation.paragraphs.map(p => `<p>${p}</p>`).join('')}
            </div>
        `;
    }
}

/* --------------------------------------------------------------------------
   Migratory Bird Species Catalog
   -------------------------------------------------------------------------- */
function renderBirdSpecies(filterCategory = 'all', searchQuery = '') {
    const grid = document.getElementById('species-grid');
    if (!grid || typeof BIRD_SPECIES === 'undefined') return;

    const filtered = BIRD_SPECIES.filter(bird => {
        const matchesCategory = filterCategory === 'all' || bird.category === filterCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = !query || 
            bird.name.toLowerCase().includes(query) ||
            bird.scientificName.toLowerCase().includes(query) ||
            bird.description.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="no-results" style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No bird species found matching your search.</p>`;
        return;
    }

    grid.innerHTML = filtered.map(bird => `
        <div class="species-card">
            <img src="${bird.image}" alt="${bird.name}" loading="lazy" />
            <div class="species-card-body">
                <div class="species-header">
                    <h3>${bird.name} ${bird.icon}</h3>
                    <span class="status-badge ${bird.status.toLowerCase().replace(/\s+/g, '-')}">${bird.status}</span>
                </div>
                <div class="scientific-name"><em>${bird.scientificName}</em></div>
                <p>${bird.description}</p>
                <div class="bird-meta">
                    <div>🗓️ ${bird.season}</div>
                    <div>🪶 Wingspan: ${bird.wingspan}</div>
                    <div>🐟 Diet: ${bird.diet}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function initBirdFilters() {
    const buttons = document.querySelectorAll('#bird-category-filters .filter-btn');
    const searchInput = document.getElementById('bird-search');

    let currentCategory = 'all';
    let currentSearch = '';

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category || 'all';
            renderBirdSpecies(currentCategory, currentSearch);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderBirdSpecies(currentCategory, currentSearch);
        });
    }
}

/* --------------------------------------------------------------------------
   Interactive Map & Hotspots
   -------------------------------------------------------------------------- */
function renderMapHotspots() {
    const listContainer = document.getElementById('hotspots-list');
    const pinsGroup = document.getElementById('map-pins-group');
    const detailCard = document.getElementById('hotspot-detail-card');

    if (typeof MAP_HOTSPOTS === 'undefined') return;

    // SVG Map 800x500
    // Lat: 8.1470 to 8.1520 (Span: ~0.005)
    // Lng: 77.4640 to 77.4675 (Span: ~0.0035)
    const mapCoordinatesToSvg = (lat, lng) => {
        const x = 140 + ((lng - 77.4640) / 0.004) * 530;
        const y = 430 - ((lat - 8.1465) / 0.006) * 340;
        return { x: Math.max(120, Math.min(680, x)), y: Math.max(100, Math.min(420, y)) };
    };

    if (pinsGroup) {
        pinsGroup.innerHTML = MAP_HOTSPOTS.map((spot, index) => {
            const pos = mapCoordinatesToSvg(spot.lat, spot.lng);
            return `
                <g class="map-pin" data-index="${index}" transform="translate(${pos.x}, ${pos.y})">
                    <circle r="14" fill="#0284c7" stroke="#ffffff" stroke-width="2" />
                    <text text-anchor="middle" dy="4" fill="#ffffff" font-size="11" font-weight="bold">${index + 1}</text>
                </g>
            `;
        }).join('');
    }

    if (listContainer) {
        listContainer.innerHTML = MAP_HOTSPOTS.map((spot, index) => `
            <div class="hotspot-item" data-index="${index}">
                <h4>${index + 1}. ${spot.title}</h4>
                <span>${spot.type}</span>
            </div>
        `).join('');
    }

    const selectHotspot = (index) => {
        const spot = MAP_HOTSPOTS[index];
        if (!spot || !detailCard) return;

        document.querySelectorAll('.hotspot-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        detailCard.innerHTML = `
            <h4>📍 ${spot.title}</h4>
            <p><strong>Category:</strong> ${spot.type}</p>
            <p>${spot.description}</p>
            <small style="color: var(--text-muted);">Coordinates: ${spot.lat}° N, ${spot.lng}° E</small>
        `;
    };

    document.querySelectorAll('.map-pin').forEach(pin => {
        pin.addEventListener('click', () => {
            const idx = parseInt(pin.dataset.index, 10);
            selectHotspot(idx);
        });
    });

    document.querySelectorAll('.hotspot-item').forEach(item => {
        item.addEventListener('click', () => {
            const idx = parseInt(item.dataset.index, 10);
            selectHotspot(idx);
        });
    });

    selectHotspot(0);
}

/* --------------------------------------------------------------------------
   Image Gallery & Lightbox Modal
   -------------------------------------------------------------------------- */
function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid || typeof GALLERY_IMAGES === 'undefined') return;

    grid.innerHTML = GALLERY_IMAGES.map((img, index) => `
        <div class="gallery-card" data-index="${index}">
            <img src="${img.url}" alt="${img.caption}" loading="lazy" />
            <p>${img.caption}</p>
        </div>
    `).join('');
}

function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    if (!modal || !modalImg || typeof GALLERY_IMAGES === 'undefined') return;

    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.dataset.index, 10);
            const imgData = GALLERY_IMAGES[idx];
            if (imgData) {
                modalImg.src = imgData.url;
                modalImg.alt = imgData.caption;
                modalCaption.textContent = imgData.caption;
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

/* --------------------------------------------------------------------------
   Tab Navigation & Smooth Scroll
   -------------------------------------------------------------------------- */
function initTabsNav() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.tab;
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Theme Toggle & LocalStorage
   -------------------------------------------------------------------------- */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const isLight = document.body.classList.contains('light-theme');
    toggleBtn.textContent = isLight ? '🌙' : '☀️';

    toggleBtn.addEventListener('click', () => {
        const currentlyLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', currentlyLight ? 'light' : 'dark');
        toggleBtn.textContent = currentlyLight ? '🌙' : '☀️';
    });
}

/* --------------------------------------------------------------------------
   Scroll Progress Indicator
   -------------------------------------------------------------------------- */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

/* --------------------------------------------------------------------------
   Navbar Mobile Toggle
   -------------------------------------------------------------------------- */
function initNavbarToggle() {
    const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}
