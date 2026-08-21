document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderBiography();
    renderTimeline();
    renderKakoriMovement();
    renderPoetry();
    renderGallery();
    initGalleryFilters();
    renderReferences();
    initLightbox();
    initTabsNav();
    initThemeToggle();
    initBookmark();
    initNavbarToggle();
    initScrollProgress();
});

/* --------------------------------------------------------------------------
   Quick Stats Rendering
   -------------------------------------------------------------------------- */
function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof BISMIL_INFO === 'undefined') return;

    grid.innerHTML = BISMIL_INFO.quickStats.map(stat => `
        <div class="stat-card">
            <span class="stat-icon">${stat.icon}</span>
            <div class="stat-val">${stat.value}</div>
            <div class="stat-lbl">${stat.label}</div>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   Biography Rendering
   -------------------------------------------------------------------------- */
function renderBiography() {
    const grid = document.getElementById('biography-grid');
    if (!grid || typeof BIOGRAPHY_DATA === 'undefined') return;

    grid.innerHTML = `
        <div class="info-block-card">
            <h3>${BIOGRAPHY_DATA.subtitle}</h3>
            ${BIOGRAPHY_DATA.paragraphs.map(p => `<p>${p}</p>`).join('')}
        </div>
    `;
}

/* --------------------------------------------------------------------------
   Timeline Rendering
   -------------------------------------------------------------------------- */
function renderTimeline() {
    const track = document.getElementById('timeline-track');
    if (!track || typeof TIMELINE_DATA === 'undefined') return;

    track.innerHTML = TIMELINE_DATA.map(item => `
        <div class="timeline-card">
            <span class="timeline-year-badge">${item.year}</span>
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   Kakori Movement Rendering
   -------------------------------------------------------------------------- */
function renderKakoriMovement() {
    const overviewEl = document.getElementById('kakori-overview');
    const comradesGrid = document.getElementById('comrades-grid');
    const sigList = document.getElementById('significance-list');

    if (typeof KAKORI_MOVEMENT_DATA === 'undefined') return;

    if (overviewEl) {
        overviewEl.innerHTML = `
            <h3>🚂 ${KAKORI_MOVEMENT_DATA.subtitle}</h3>
            <p>${KAKORI_MOVEMENT_DATA.overview}</p>
        `;
    }

    if (comradesGrid && KAKORI_MOVEMENT_DATA.revolutionaries) {
        comradesGrid.innerHTML = KAKORI_MOVEMENT_DATA.revolutionaries.map(c => `
            <div class="comrade-card">
                <h4>${c.name}</h4>
                <div class="comrade-role">${c.role}</div>
                <div class="comrade-status">${c.status}</div>
            </div>
        `).join('');
    }

    if (sigList && KAKORI_MOVEMENT_DATA.significance) {
        sigList.innerHTML = KAKORI_MOVEMENT_DATA.significance.map(s => `<p>• ${s}</p>`).join('');
    }
}

/* --------------------------------------------------------------------------
   Poetry & Literary Contributions Rendering
   -------------------------------------------------------------------------- */
function renderPoetry() {
    const grid = document.getElementById('poetry-grid');
    if (!grid || typeof POETRY_DATA === 'undefined') return;

    grid.innerHTML = POETRY_DATA.map(p => `
        <div class="poetry-card">
            <h3>✍️ ${p.title}</h3>
            <div class="poetry-lang">${p.language}</div>
            <div class="poetry-verses">${p.verses}</div>
            <div class="poetry-translation"><strong>English Meaning:</strong> "${p.translation}"</div>
            <div class="poetry-desc">${p.description}</div>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   Gallery Rendering & Filter Controls
   -------------------------------------------------------------------------- */
function renderGallery(filterCategory = 'all', searchQuery = '') {
    const grid = document.getElementById('gallery-grid');
    if (!grid || typeof GALLERY_DATA === 'undefined') return;

    const filtered = GALLERY_DATA.filter(item => {
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = !query || 
            item.caption.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="no-results" style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No photos found matching your search.</p>`;
        return;
    }

    grid.innerHTML = filtered.map((item, index) => `
        <div class="gallery-card" data-index="${index}">
            <img src="${item.url}" alt="${item.caption}" loading="lazy" />
            <p>${item.caption}</p>
        </div>
    `).join('');
}

function initGalleryFilters() {
    const buttons = document.querySelectorAll('#gallery-category-filters .filter-btn');
    const searchInput = document.getElementById('gallery-search');

    let currentCategory = 'all';
    let currentSearch = '';

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category || 'all';
            renderGallery(currentCategory, currentSearch);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderGallery(currentCategory, currentSearch);
        });
    }
}

/* --------------------------------------------------------------------------
   References Rendering
   -------------------------------------------------------------------------- */
function renderReferences() {
    const grid = document.getElementById('references-grid');
    if (!grid || typeof REFERENCES_DATA === 'undefined') return;

    grid.innerHTML = REFERENCES_DATA.map(ref => `
        <div class="info-block-card">
            <h3>📖 ${ref.title}</h3>
            <p style="color: var(--accent-gold); font-size: 0.85rem; margin-bottom: 8px;"><strong>Source Type:</strong> ${ref.type}</p>
            <p>${ref.description}</p>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   Lightbox Modal
   -------------------------------------------------------------------------- */
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    if (!modal || !modalImg || typeof GALLERY_DATA === 'undefined') return;

    document.addEventListener('click', (e) => {
        const card = e.target.closest('.gallery-card');
        if (card) {
            const idx = parseInt(card.dataset.index, 10);
            const imgData = GALLERY_DATA[idx];
            if (imgData) {
                modalImg.src = imgData.url;
                modalImg.alt = imgData.caption;
                modalCaption.textContent = imgData.caption;
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            }
        }
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
    toggleBtn.textContent = isLight ? '☀️' : '🌙';

    toggleBtn.addEventListener('click', () => {
        const currentlyLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', currentlyLight ? 'light' : 'dark');
        toggleBtn.textContent = currentlyLight ? '☀️' : '🌙';
    });
}

/* --------------------------------------------------------------------------
   Bookmark Button & Journey Integration
   -------------------------------------------------------------------------- */
function initBookmark() {
    const btn = document.getElementById('bookmark-btn');
    if (!btn) return;

    const id = 'martyr-ram-prasad-bismil';
    const updateBtn = () => {
        btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey';
    };
    updateBtn();

    btn.addEventListener('click', () => {
        if (window.Journey) {
            window.Journey.toggle({
                id,
                explorerPage: 'frontend/ram-prasad-bismil-explorer/index.html',
                title: 'Ram Prasad Bismil',
                thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Ram_Prasad_Bismil.jpg/800px-Ram_Prasad_Bismil.jpg',
                category: 'revolutionary'
            });
            updateBtn();
        } else {
            btn.textContent = '✅ Bookmarked!';
            setTimeout(() => { updateBtn(); }, 2000);
        }
    });
}

/* --------------------------------------------------------------------------
   Scroll Progress & Mobile Toggle
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

function initNavbarToggle() {
    const toggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}
