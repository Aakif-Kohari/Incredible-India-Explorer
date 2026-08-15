document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderHistory();
    renderGoldWork();
    renderThemes();
    renderMaterials();
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
    if (!grid || typeof MYSORE_PAINTING_INFO === 'undefined') return;

    grid.innerHTML = MYSORE_PAINTING_INFO.quickStats.map(stat => `
        <div class="stat-card">
            <span class="stat-icon">${stat.icon}</span>
            <div class="stat-val">${stat.value}</div>
            <div class="stat-lbl">${stat.label}</div>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   Historical Background Rendering
   -------------------------------------------------------------------------- */
function renderHistory() {
    const grid = document.getElementById('history-grid');
    if (!grid || typeof HISTORICAL_BACKGROUND === 'undefined') return;

    grid.innerHTML = `
        <div class="info-block-card">
            <h3>${HISTORICAL_BACKGROUND.subtitle}</h3>
            ${HISTORICAL_BACKGROUND.paragraphs.map(p => `<p>${p}</p>`).join('')}
        </div>
    `;
}

/* --------------------------------------------------------------------------
   Gold Work Explanation (Gesso Technique)
   -------------------------------------------------------------------------- */
function renderGoldWork() {
    const grid = document.getElementById('gold-steps-grid');
    if (!grid || typeof GOLD_WORK_STEPS === 'undefined') return;

    grid.innerHTML = GOLD_WORK_STEPS.map(item => `
        <div class="gold-step-card">
            <span class="step-num-badge">${item.step}</span>
            <h3>${item.icon} ${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   Themes Catalog Rendering
   -------------------------------------------------------------------------- */
function renderThemes() {
    const grid = document.getElementById('themes-grid');
    if (!grid || typeof THEMES_LIST === 'undefined') return;

    grid.innerHTML = THEMES_LIST.map(theme => `
        <div class="info-block-card">
            <h3>🎨 ${theme.title}</h3>
            <p style="color: var(--accent-gold); font-size: 0.85rem; margin-bottom: 8px;"><strong>Category:</strong> ${theme.category}</p>
            <p>${theme.description}</p>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   Materials Catalog Rendering
   -------------------------------------------------------------------------- */
function renderMaterials() {
    const grid = document.getElementById('materials-grid');
    if (!grid || typeof MATERIALS_CATALOG === 'undefined') return;

    grid.innerHTML = MATERIALS_CATALOG.map(item => `
        <div class="info-block-card">
            <h3>${item.icon} ${item.name}</h3>
            <p style="color: var(--accent-gold); font-size: 0.85rem; margin-bottom: 8px;"><strong>Category:</strong> ${item.category}</p>
            <p>${item.description}</p>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   Gallery Rendering & Filter Controls
   -------------------------------------------------------------------------- */
function renderGallery(filterCategory = 'all', searchQuery = '') {
    const grid = document.getElementById('gallery-grid');
    if (!grid || typeof GALLERY_PAINTINGS === 'undefined') return;

    const filtered = GALLERY_PAINTINGS.filter(item => {
        const matchesCategory = filterCategory === 'all' || item.theme === filterCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = !query || 
            item.title.toLowerCase().includes(query) ||
            item.theme.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="no-results" style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No paintings found matching your search.</p>`;
        return;
    }

    grid.innerHTML = filtered.map(item => `
        <div class="gallery-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
            <div class="gallery-card-body">
                <h3>${item.title}</h3>
                <div class="painting-meta">${item.theme} • ${item.period}</div>
                <p>${item.description}</p>
            </div>
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
    if (!grid || typeof REFERENCES_LIST === 'undefined') return;

    grid.innerHTML = REFERENCES_LIST.map(ref => `
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
    const modalTitle = document.getElementById('lightbox-title');
    const modalCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    if (!modal || !modalImg || typeof GALLERY_PAINTINGS === 'undefined') return;

    document.addEventListener('click', (e) => {
        const card = e.target.closest('.gallery-card');
        if (card) {
            const paintingId = card.dataset.id;
            const painting = GALLERY_PAINTINGS.find(p => p.id === paintingId);
            if (painting) {
                modalImg.src = painting.image;
                modalImg.alt = painting.title;
                modalTitle.textContent = painting.title;
                modalCaption.textContent = `${painting.theme} (${painting.period}) — ${painting.description}`;
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

    const id = 'art-mysore-painting';
    const updateBtn = () => {
        btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey';
    };
    updateBtn();

    btn.addEventListener('click', () => {
        if (window.Journey) {
            window.Journey.toggle({
                id,
                explorerPage: 'frontend/mysore-painting-explorer/index.html',
                title: 'Mysore Painting',
                thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Rama_Pattabhisheka_Mysore_style.jpg/800px-Rama_Pattabhisheka_Mysore_style.jpg',
                category: 'art'
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
