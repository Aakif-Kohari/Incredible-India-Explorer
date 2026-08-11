document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderBiography();
    renderTimeline();
    renderMovements();
    renderPrisonYears();
    renderSpeeches();
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
    if (!grid || typeof NEHRU_INFO === 'undefined') return;

    grid.innerHTML = NEHRU_INFO.quickStats.map(stat => `
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
   Interactive Timeline Rendering
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
   Major Movements Rendering
   -------------------------------------------------------------------------- */
function renderMovements() {
    const grid = document.getElementById('movements-grid');
    if (!grid || typeof MAJOR_MOVEMENTS_DATA === 'undefined') return;

    grid.innerHTML = MAJOR_MOVEMENTS_DATA.map(m => `
        <div class="info-block-card">
            <h3>${m.icon} ${m.title}</h3>
            <p style="color: var(--accent-gold); font-size: 0.85rem; margin-bottom: 8px;"><strong>${m.subtitle}</strong></p>
            <p>${m.description}</p>
        </div>
    `).join('');
}

/* --------------------------------------------------------------------------
   Prison Years & Books Rendering
   -------------------------------------------------------------------------- */
function renderPrisonYears() {
    const booksContainer = document.getElementById('books-container');
    const jailGrid = document.getElementById('jail-terms-grid');

    if (!typeof PRISON_YEARS_DATA === 'undefined') return;

    if (booksContainer && PRISON_YEARS_DATA.books) {
        booksContainer.innerHTML = PRISON_YEARS_DATA.books.map(b => `
            <div class="book-card">
                <h3>📖 ${b.title}</h3>
                <div class="book-meta">📍 Written In: ${b.writtenIn} • (${b.pages})</div>
                <p>${b.description}</p>
            </div>
        `).join('');
    }

    if (jailGrid && PRISON_YEARS_DATA.jailTerms) {
        jailGrid.innerHTML = PRISON_YEARS_DATA.jailTerms.map(j => `
            <div class="jail-term-item">
                <h4>${j.term} (${j.year})</h4>
                <p>📍 ${j.jail}</p>
            </div>
        `).join('');
    }
}

/* --------------------------------------------------------------------------
   Historic Speeches Rendering
   -------------------------------------------------------------------------- */
function renderSpeeches() {
    const grid = document.getElementById('speeches-grid');
    if (!grid || typeof HISTORIC_SPEECHES_DATA === 'undefined') return;

    grid.innerHTML = HISTORIC_SPEECHES_DATA.map(s => `
        <div class="speech-card">
            <h3>🎙️ ${s.title}</h3>
            <div class="speech-date">📅 ${s.date} • ${s.venue}</div>
            <div class="speech-quote">"${s.excerpt}"</div>
            <div class="speech-significance"><strong>Historical Impact:</strong> ${s.significance}</div>
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

    const id = 'leader-jawaharlal-nehru';
    const updateBtn = () => {
        btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey';
    };
    updateBtn();

    btn.addEventListener('click', () => {
        if (window.Journey) {
            window.Journey.toggle({
                id,
                explorerPage: 'frontend/jawaharlal-nehru-explorer/index.html',
                title: 'Jawaharlal Nehru',
                thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Jawaharlal_Nehru_1947.jpg/800px-Jawaharlal_Nehru_1947.jpg',
                category: 'leader'
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
