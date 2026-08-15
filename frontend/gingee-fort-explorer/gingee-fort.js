/**
 * gingee-fort.js
 * Dynamic controller logic for Gingee Fort Explorer page.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    renderOverview();
    renderTimeline();
    renderBuilders();
    renderThreeHills();
    renderArchitecture();
    renderStrategicImportance();
    renderFacts();
    renderGallery();
    initLightbox();
});

/* ==========================================================================
   1. TAB NAVIGATION CONTROLLER
   ========================================================================== */
function initTabs() {
    const tabButtons = document.querySelectorAll('.gingee-tab-btn');
    const sections = document.querySelectorAll('.gingee-section');

    function activateTab(tabId) {
        tabButtons.forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        sections.forEach(sec => {
            const isTarget = sec.id === tabId;
            sec.classList.toggle('active', isTarget);
        });

        // Update URL Hash without auto scroll jump
        if (history.pushState) {
            history.pushState(null, null, `#${tabId}`);
        } else {
            location.hash = `#${tabId}`;
        }
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            activateTab(tabId);
        });
    });

    // Check URL Hash on load
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        activateTab(hash);
    }
}

/* ==========================================================================
   2. RENDER OVERVIEW
   ========================================================================== */
function renderOverview() {
    const overviewContainer = document.getElementById('overview-content');
    if (!overviewContainer || typeof GINGEE_INFO === 'undefined') return;

    overviewContainer.innerHTML = `
        <div class="overview-grid">
            <div class="overview-card">
                <h3><span>📍</span> Location & Geography</h3>
                <p>Located in <strong>${GINGEE_INFO.location}</strong> at <strong>${GINGEE_INFO.coordinates}</strong>.</p>
                <p>Spans over 11 sq km across three granite peaks rising <strong>${GINGEE_INFO.elevation}</strong>.</p>
            </div>
            <div class="overview-card">
                <h3><span>👑</span> Citadel Legacy</h3>
                <p>Original foundation: <strong>${GINGEE_INFO.builtEra}</strong> by <strong>${GINGEE_INFO.primaryBuilders}</strong>.</p>
                <p>Recognized as a <strong>${GINGEE_INFO.status}</strong>.</p>
            </div>
            <div class="overview-card">
                <h3><span>⚔️</span> The Troy of the East</h3>
                <p>${GINGEE_INFO.nicknameReason}</p>
            </div>
        </div>
    `;
}

/* ==========================================================================
   3. RENDER HISTORICAL TIMELINE
   ========================================================================== */
function renderTimeline() {
    const timelineContainer = document.getElementById('timeline-content');
    if (!timelineContainer || typeof TIMELINE_EVENTS === 'undefined') return;

    timelineContainer.innerHTML = TIMELINE_EVENTS.map(event => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-year">${event.year}</span>
                <h3 style="margin: 0.5rem 0; font-family: 'Playfair Display', serif; color: var(--gingee-gold);">${event.title}</h3>
                <p style="color: var(--gingee-text-muted); font-size: 0.95rem; margin: 0;">${event.description}</p>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   4. RENDER BUILDERS & RULERS
   ========================================================================== */
function renderBuilders() {
    const buildersContainer = document.getElementById('builder-content');
    if (!buildersContainer || typeof BUILDERS_LIST === 'undefined') return;

    buildersContainer.innerHTML = `
        <div class="builders-grid">
            ${BUILDERS_LIST.map(b => `
                <div class="builder-card">
                    <div class="builder-avatar">${b.icon}</div>
                    <div class="builder-dynasty">${b.dynasty}</div>
                    <h3 class="builder-name">${b.name}</h3>
                    <div class="builder-era">${b.era} • <em>${b.role}</em></div>
                    <p style="color: var(--gingee-text-muted); font-size: 0.95rem;">${b.contribution}</p>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   5. RENDER THREE HILL FORTS
   ========================================================================== */
function renderThreeHills() {
    const hillsContainer = document.getElementById('three-hills-content');
    if (!hillsContainer || typeof THREE_HILLS === 'undefined') return;

    hillsContainer.innerHTML = `
        <div class="hills-grid">
            ${THREE_HILLS.map(hill => `
                <div class="hill-card">
                    <div class="hill-card-header">
                        <div class="hill-card-title">${hill.icon} ${hill.name}</div>
                        <div class="hill-meta">
                            <span>⛰️ Height: ${hill.height}</span>
                            <span>🧗 ${hill.difficulty}</span>
                        </div>
                    </div>
                    <div class="hill-card-body">
                        <p style="color: var(--gingee-text-muted); line-height: 1.6;">${hill.description}</p>
                        <div style="font-weight: 700; margin-top: 1rem; color: var(--gingee-gold); font-size: 0.9rem;">KEY HIGHLIGHTS:</div>
                        <div class="highlights-tags">
                            ${hill.highlights.map(h => `<span class="tag">${h}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   6. RENDER ARCHITECTURE FEATURES
   ========================================================================== */
function renderArchitecture() {
    const archContainer = document.getElementById('architecture-content');
    if (!archContainer || typeof ARCH_FEATURES === 'undefined') return;

    archContainer.innerHTML = `
        <div class="arch-grid">
            ${ARCH_FEATURES.map(arch => `
                <div class="arch-card">
                    <div class="arch-icon">${arch.icon}</div>
                    <h3 class="arch-title">${arch.title}</h3>
                    <span class="arch-type">${arch.type}</span>
                    <p style="color: var(--gingee-text-muted); font-size: 0.95rem;">${arch.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   7. RENDER STRATEGIC IMPORTANCE
   ========================================================================== */
function renderStrategicImportance() {
    const strategicContainer = document.getElementById('strategic-content');
    if (!strategicContainer) return;

    strategicContainer.innerHTML = `
        <div class="overview-grid">
            <div class="overview-card">
                <h3><span>🗺️</span> Geographic Gateway</h3>
                <p>Gingee held a pivotal position controlling northern Tamil Nadu, bridging the trade routes between the Deccan plateau and the Coromandel coastports.</p>
            </div>
            <div class="overview-card">
                <h3><span>⚔️</span> The 8-Year Siege (1690–1698)</h3>
                <p>During the Maratha-Mughal conflict, Maratha King Rajaram held out at Gingee against Mughal general Zulfiqar Khan for 8 long years. This epic stand drained Mughal coffers and tied down thousands of imperial troops.</p>
            </div>
            <div class="overview-card">
                <h3><span>🛡️</span> Natural Chasm & Drawbridge</h3>
                <p>The 60-foot deep natural ravine surrounding Rajagiri meant that even if an army breached the outer 13-km wall, the inner citadel remained completely inaccessible once the wooden drawbridge was raised.</p>
            </div>
        </div>
    `;
}

/* ==========================================================================
   8. RENDER INTERESTING FACTS
   ========================================================================== */
function renderFacts() {
    const factsContainer = document.getElementById('facts-content');
    if (!factsContainer || typeof INTERESTING_FACTS === 'undefined') return;

    factsContainer.innerHTML = `
        <div class="facts-grid">
            ${INTERESTING_FACTS.map(f => `
                <div class="fact-card">
                    <div class="fact-header">
                        <span class="fact-icon">${f.icon}</span>
                        <div class="fact-title">${f.title}</div>
                    </div>
                    <p style="color: var(--gingee-text-muted); font-size: 0.95rem; margin: 0;">${f.fact}</p>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   9. RENDER GALLERY & FILTERING
   ========================================================================== */
function renderGallery() {
    const galleryContainer = document.getElementById('gallery-content');
    if (!galleryContainer || typeof GALLERY_IMAGES === 'undefined') return;

    const categories = ['All', ...new Set(GALLERY_IMAGES.map(img => img.category))];

    function filterImages(cat) {
        const filtered = cat === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(i => i.category === cat);
        const grid = document.querySelector('.gallery-grid');
        if (grid) {
            grid.innerHTML = filtered.map((img, idx) => `
                <div class="gallery-item" data-index="${GALLERY_IMAGES.indexOf(img)}">
                    <img src="${img.thumb}" alt="${img.alt}" loading="lazy" />
                    <div class="gallery-overlay">
                        <div class="gallery-caption">${img.caption}</div>
                    </div>
                </div>
            `).join('');
            attachGalleryEvents();
        }
    }

    galleryContainer.innerHTML = `
        <div class="gallery-filters">
            ${categories.map(cat => `
                <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-category="${cat}">${cat}</button>
            `).join('')}
        </div>
        <div class="gallery-grid"></div>
    `;

    filterImages('All');

    const filterBtns = galleryContainer.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterImages(btn.dataset.category);
        });
    });
}

/* ==========================================================================
   10. LIGHTBOX MODAL CONTROLLER
   ========================================================================== */
let currentImgIndex = 0;

function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.lightbox-close');
    const prevBtn = modal.querySelector('.lightbox-prev');
    const nextBtn = modal.querySelector('.lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

function attachGalleryEvents() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const idx = parseInt(item.dataset.index, 10);
            openLightbox(idx);
        });
    });
}

function openLightbox(index) {
    if (typeof GALLERY_IMAGES === 'undefined' || !GALLERY_IMAGES[index]) return;
    currentImgIndex = index;
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    if (modal && img && caption) {
        img.src = GALLERY_IMAGES[index].url;
        img.alt = GALLERY_IMAGES[index].alt;
        caption.textContent = GALLERY_IMAGES[index].caption;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
}

function navigateLightbox(direction) {
    if (typeof GALLERY_IMAGES === 'undefined') return;
    currentImgIndex = (currentImgIndex + direction + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    openLightbox(currentImgIndex);
}
