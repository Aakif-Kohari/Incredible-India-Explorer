document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderEcology();
    renderMigration();
    renderFacts();
    renderSpecies();
    renderHotspots();
    renderGallery();
    setupRevealGrids();
    initScrollReveal();
    initScrollProgress();
    initLightbox();
    initThemeToggle();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof POINT_CALIMERE_INFO === 'undefined') return;

    grid.innerHTML = POINT_CALIMERE_INFO.quickStats
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
    if (typeof COASTAL_ECOLOGY === 'undefined') return;
    const overviewEl = document.getElementById('eco-overview');
    const habitatsEl = document.getElementById('eco-habitats');
    const mangrovesEl = document.getElementById('eco-mangroves');
    const migrationEl = document.getElementById('eco-migration');
    const statusEl = document.getElementById('eco-status');

    if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${COASTAL_ECOLOGY.overview}`;
    if (habitatsEl) habitatsEl.innerHTML = `<strong>Coastal Habitats:</strong> ${COASTAL_ECOLOGY.coastalHabitats}`;
    if (mangrovesEl) mangrovesEl.innerHTML = `<strong>Muthupet Mangroves:</strong> ${COASTAL_ECOLOGY.mangroves}`;
    if (migrationEl) migrationEl.innerHTML = `<strong>Bird Migration:</strong> ${COASTAL_ECOLOGY.birdMigration}`;
    if (statusEl) statusEl.innerHTML = `<strong>Conservation Status:</strong> ${COASTAL_ECOLOGY.conservationStatus}`;
}

function renderMigration() {
    const grid = document.getElementById('migration-grid');
    if (!grid || typeof BIRD_MIGRATION === 'undefined') return;

    grid.innerHTML = BIRD_MIGRATION.map(
        item => `
        <div class="migration-card">
            <h3>${item.icon} ${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `
    ).join('');
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
    if (!grid || typeof WILDLIFE_SPECIES === 'undefined') return;

    grid.innerHTML = WILDLIFE_SPECIES.map(
        species => `
        <div class="species-card">
            <img src="${species.image}" alt="${species.name}" loading="lazy" />
            <div class="species-card-body">
                <div class="species-header">
                    <h3>${species.name} ${species.icon}</h3>
                    <span class="status-badge">${species.status}</span>
                </div>
                <p class="scientific-name"><em>${species.scientificName}</em></p>
                <p>${species.description}</p>
                <div class="bird-meta">
                    <span>🗓️ ${species.season}</span> | 
                    <span>${species.diet ? '🍤 ' + species.diet : ''}</span>
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
            <h3>${spot.title}</h3>
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
        (img, index) => `
        <div class="gallery-card" data-index="${index}" tabindex="0" role="button" aria-label="View image: ${img.caption}">
            <img src="${img.url}" alt="${img.caption}" loading="lazy" />
            <p>${img.caption}</p>
        </div>
    `
    ).join('');
}

function setupRevealGrids() {
    document.querySelectorAll('.anim-grid').forEach(grid => {
        [...grid.children].forEach((child, index) => {
            child.classList.add('reveal');
            child.style.setProperty('--reveal-delay', (index % 6) * 90 + 'ms');
        });
    });
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => observer.observe(el));
}

function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const update = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const image = document.getElementById('lightbox-image');
    const caption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    if (!lightbox || !image) return;

    function open(index) {
        const item = GALLERY_IMAGES[index];
        if (!item) return;
        image.src = item.url;
        image.alt = item.caption;
        caption.textContent = item.caption;
        lightbox.classList.add('open');
        closeBtn.focus();
    }

    function close() {
        lightbox.classList.remove('open');
    }

    document.getElementById('gallery-grid').addEventListener('click', e => {
        const card = e.target.closest('.gallery-card');
        if (card) open(parseInt(card.getAttribute('data-index'), 10));
    });

    document.getElementById('gallery-grid').addEventListener('keydown', e => {
        const card = e.target.closest('.gallery-card');
        if (card && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            open(parseInt(card.getAttribute('data-index'), 10));
        }
    });

    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) close();
    });
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
