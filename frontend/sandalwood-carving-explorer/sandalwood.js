document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderTimeline();
    renderTechniques();
    renderMotifs();
    renderGallery();
    renderArtisanCenters();
    renderPreservation();
    renderReferences();
    initThemeToggle();
    initParallax();
    initScrollReveal();
    initLightbox();
});

/* ============================================================
   RENDER FUNCTIONS
   ============================================================ */

function renderStats() {
    const grid = document.getElementById('sw-stats-grid');
    if (!grid || typeof SANDALWOOD_INFO === 'undefined') return;

    grid.innerHTML = SANDALWOOD_INFO.quickStats.map(stat => `
        <div class="sw-stat-item sw-reveal">
            <span class="sw-stat-icon">${stat.icon}</span>
            <div class="sw-stat-value">${stat.value}</div>
            <div class="sw-stat-label">${stat.label}</div>
        </div>
    `).join('');
}

function renderTimeline() {
    const container = document.getElementById('sw-timeline');
    if (!container || typeof TIMELINE_EVENTS === 'undefined') return;

    container.innerHTML = TIMELINE_EVENTS.map((event, i) => `
        <div class="sw-timeline-item sw-reveal sw-reveal-delay-${Math.min(i + 1, 3)}">
            <div class="sw-timeline-year">${event.year}</div>
            <h3 class="sw-timeline-title">${event.title}</h3>
            <p class="sw-timeline-desc">${event.description}</p>
        </div>
    `).join('');
}

function renderTechniques() {
    const grid = document.getElementById('sw-techniques-grid');
    if (!grid || typeof CARVING_TECHNIQUES === 'undefined') return;

    grid.innerHTML = CARVING_TECHNIQUES.map((tech, i) => `
        <div class="sw-technique-card sw-reveal sw-reveal-delay-${(i % 3) + 1}">
            <div class="sw-technique-step-num">
                <span>${tech.icon}</span>
                Step ${tech.step}
            </div>
            <div class="sw-technique-body">
                <h3>${tech.title}</h3>
                <p>${tech.description}</p>
            </div>
        </div>
    `).join('');
}

function renderMotifs() {
    const grid = document.getElementById('sw-motifs-grid');
    if (!grid || typeof TRADITIONAL_MOTIFS === 'undefined') return;

    grid.innerHTML = TRADITIONAL_MOTIFS.map((motif, i) => `
        <div class="sw-motif-card sw-reveal sw-reveal-delay-${(i % 3) + 1}" data-symbol="${motif.symbol}">
            <span class="sw-motif-symbol">${motif.symbol}</span>
            <span class="sw-motif-sig">${motif.significance}</span>
            <h3>${motif.name}</h3>
            <p>${motif.description}</p>
        </div>
    `).join('');
}

function renderGallery() {
    const grid = document.getElementById('sw-gallery-grid');
    if (!grid || typeof GALLERY_ITEMS === 'undefined') return;

    grid.innerHTML = GALLERY_ITEMS.map((item, i) => `
        <div class="sw-gallery-card sw-reveal sw-reveal-delay-${(i % 3) + 1}"
             data-index="${i}"
             data-title="${item.title}"
             data-caption="${item.caption}"
             data-image="${item.image}"
             role="button"
             tabindex="0"
             aria-label="View ${item.title}">
            <div class="sw-gallery-img-wrap">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
                <div class="sw-gallery-tag">${item.tag}</div>
            </div>
            <div class="sw-gallery-body">
                <h3>${item.title}</h3>
                <p>${item.caption}</p>
            </div>
        </div>
    `).join('');

    // Attach click events
    grid.querySelectorAll('.sw-gallery-card').forEach(card => {
        card.addEventListener('click', () => openLightbox(
            card.dataset.image,
            card.dataset.title,
            card.dataset.caption
        ));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(card.dataset.image, card.dataset.title, card.dataset.caption);
            }
        });
    });
}

function renderArtisanCenters() {
    const grid = document.getElementById('sw-centers-grid');
    if (!grid || typeof ARTISAN_CENTERS === 'undefined') return;

    grid.innerHTML = ARTISAN_CENTERS.map((center, i) => `
        <div class="sw-center-card sw-reveal sw-reveal-delay-${(i % 3) + 1}">
            <div class="sw-center-icon">${center.icon}</div>
            <span class="sw-center-highlight">${center.highlight}</span>
            <h3>${center.city}</h3>
            <p>${center.description}</p>
        </div>
    `).join('');
}

function renderPreservation() {
    const grid = document.getElementById('sw-preservation-grid');
    if (!grid || typeof PRESERVATION_FACTS === 'undefined') return;

    grid.innerHTML = PRESERVATION_FACTS.map((fact, i) => `
        <div class="sw-preservation-card sw-reveal sw-reveal-delay-${(i % 3) + 1}">
            <div class="sw-preservation-icon">${fact.icon}</div>
            <h3>${fact.title}</h3>
            <p>${fact.description}</p>
        </div>
    `).join('');
}

function renderReferences() {
    const list = document.getElementById('sw-references-list');
    if (!list || typeof REFERENCES === 'undefined') return;

    list.innerHTML = REFERENCES.map(ref => `
        <li>
            <span class="sw-ref-icon">📚</span>
            <a href="${ref.link}" target="_blank" rel="noopener noreferrer">${ref.text}</a>
        </li>
    `).join('');
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */
function initThemeToggle() {
    const btn = document.getElementById('sw-theme-toggle');
    if (!btn) return;

    // Set initial icon based on stored preference
    const stored = localStorage.getItem('theme');
    const isLight = stored === 'light' || document.body.classList.contains('light-theme');
    btn.textContent = isLight ? '🌙' : '☀️';

    btn.addEventListener('click', () => {
        const nowLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', nowLight ? 'light' : 'dark');
        btn.textContent = nowLight ? '🌙' : '☀️';
    });
}

/* ============================================================
   PARALLAX HERO
   ============================================================ */
function initParallax() {
    const bg = document.getElementById('sw-hero-bg');
    if (!bg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        bg.style.transform = `translateY(${y * 0.35}px)`;
    }, { passive: true });
}

/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
function initScrollReveal() {
    const targets = document.querySelectorAll('.sw-reveal');
    if (!targets.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => io.observe(el));
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
function initLightbox() {
    const lb = document.getElementById('sw-lightbox');
    const lbImg = document.getElementById('sw-lb-img');
    const lbTitle = document.getElementById('sw-lb-title');
    const lbCaption = document.getElementById('sw-lb-caption');
    const lbClose = document.getElementById('sw-lb-close');

    if (!lb) return;

    lbClose.addEventListener('click', closeLightbox);
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

    window._openLightbox = (img, title, caption) => {
        lbImg.src = img;
        lbImg.alt = title;
        lbTitle.textContent = title;
        lbCaption.textContent = caption;
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window._closeLightbox = () => {
        lb.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lbImg.src = ''; }, 300);
    };
}

function openLightbox(img, title, caption) {
    if (window._openLightbox) window._openLightbox(img, title, caption);
}

function closeLightbox() {
    if (window._closeLightbox) window._closeLightbox();
}
