/**
 * torna-trek.js
 * Interactive script for Torna Fort Trek profile
 */

(function () {
    'use strict';

    /* ---------- Theme Toggle ---------- */
    function initThemeToggle() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;

        function updateState() {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light' ||
                            document.documentElement.classList.contains('light-theme');
            btn.setAttribute('aria-pressed', String(isLight));
        }

        updateState();

        btn.addEventListener('click', function () {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light' ||
                            document.documentElement.classList.contains('light-theme');
            
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                document.documentElement.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                document.documentElement.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            }
            updateState();
        });
    }

    /* ---------- Tab Navigation ---------- */
    function initTabs() {
        const tabBtns = document.querySelectorAll('.torna-tab-btn');
        const tabContents = document.querySelectorAll('.torna-tab-content');

        if (!tabBtns.length) return;

        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const targetId = btn.getAttribute('data-tab');

                tabBtns.forEach(function (b) {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                tabContents.forEach(function (c) {
                    c.classList.remove('active');
                });

                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.classList.add('active');
                }
            });
        });
    }

    /* ---------- Render Historical Timeline ---------- */
    function renderTimeline() {
        const container = document.getElementById('timelineContainer');
        if (!container || typeof TORNA_TIMELINE === 'undefined') return;

        container.innerHTML = '';
        TORNA_TIMELINE.forEach(function (item) {
            const el = document.createElement('div');
            el.className = 'torna-timeline-item';

            el.innerHTML = `
                <div class="torna-timeline-node"></div>
                <div class="torna-timeline-card">
                    <div class="torna-timeline-header">
                        <span class="torna-timeline-year">${item.year}</span>
                        <span class="torna-badge torna-badge--saffron">${item.badge}</span>
                    </div>
                    <h3 class="torna-timeline-title">${item.title}</h3>
                    <p class="torna-timeline-desc">${item.description}</p>
                </div>
            `;
            container.appendChild(el);
        });
    }

    /* ---------- Render Highlights Grid ---------- */
    function renderHighlights() {
        const grid = document.getElementById('highlightsGrid');
        if (!grid || typeof TORNA_HIGHLIGHTS === 'undefined') return;

        grid.innerHTML = '';
        TORNA_HIGHLIGHTS.forEach(function (item) {
            const card = document.createElement('article');
            card.className = 'torna-highlight-card';

            card.innerHTML = `
                <span class="torna-highlight-icon">${item.icon}</span>
                <span class="torna-eyebrow">${item.tag}</span>
                <h3 class="torna-highlight-title">${item.title}</h3>
                <span class="torna-highlight-sub">${item.subtitle}</span>
                <p class="torna-highlight-desc">${item.description}</p>
            `;
            grid.appendChild(card);
        });
    }

    /* ---------- Render Trek Route Steps ---------- */
    function renderTrekSteps() {
        const container = document.getElementById('trekStepsContainer');
        if (!container || typeof TORNA_TREK_STEPS === 'undefined') return;

        container.innerHTML = '';
        TORNA_TREK_STEPS.forEach(function (step) {
            const card = document.createElement('div');
            card.className = 'torna-step-card';

            card.innerHTML = `
                <div class="torna-step-num">${step.step}</div>
                <div class="torna-step-body">
                    <div class="torna-step-header">
                        <h3 class="torna-step-title">${step.title}</h3>
                        <span class="torna-step-meta">⏱️ ${step.duration} · ${step.terrain}</span>
                    </div>
                    <p class="torna-step-desc">${step.description}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    /* ---------- Trek Estimator Calculator ---------- */
    function initTrekCalculator() {
        const calcBtns = document.querySelectorAll('.torna-calc-btn');
        const ascentEl = document.getElementById('calcAscent');
        const descentEl = document.getElementById('calcDescent');
        const waterEl = document.getElementById('calcWater');
        const startEl = document.getElementById('calcStart');

        if (!calcBtns.length) return;

        const presets = {
            fast: { ascent: "2.5 – 3.0 hrs", descent: "1.5 – 2.0 hrs", water: "2.5 Liters", start: "6:30 AM" },
            moderate: { ascent: "3.5 – 4.0 hrs", descent: "2.0 – 2.5 hrs", water: "3.5 Liters", start: "6:00 AM" },
            leisurely: { ascent: "4.5 – 5.0 hrs", descent: "2.5 – 3.0 hrs", water: "4.5 Liters", start: "5:30 AM" }
        };

        calcBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const pace = btn.getAttribute('data-pace');
                const data = presets[pace];
                if (!data) return;

                calcBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                if (ascentEl) ascentEl.textContent = data.ascent;
                if (descentEl) descentEl.textContent = data.descent;
                if (waterEl) waterEl.textContent = data.water;
                if (startEl) startEl.textContent = data.start;
            });
        });
    }

    /* ---------- Season Switcher ---------- */
    function initSeasonToggle() {
        const seasonOpts = document.querySelectorAll('.torna-season-opt');
        const monsoonBox = document.getElementById('seasonMonsoon');
        const winterBox = document.getElementById('seasonWinter');

        if (!seasonOpts.length) return;

        seasonOpts.forEach(function (opt) {
            opt.addEventListener('click', function () {
                const season = opt.getAttribute('data-season');
                seasonOpts.forEach(function (o) { o.classList.remove('active'); });
                opt.classList.add('active');

                if (season === 'monsoon') {
                    if (monsoonBox) monsoonBox.style.display = 'block';
                    if (winterBox) winterBox.style.display = 'none';
                } else {
                    if (monsoonBox) monsoonBox.style.display = 'none';
                    if (winterBox) winterBox.style.display = 'block';
                }
            });
        });
    }

    /* ---------- Render Interactive Checklist ---------- */
    function renderChecklist() {
        const grid = document.getElementById('checklistGrid');
        if (!grid || typeof TORNA_CHECKLIST === 'undefined') return;

        let savedChecked = [];
        try {
            savedChecked = JSON.parse(sessionStorage.getItem('torna_checklist') || '[]');
        } catch (e) {}

        grid.innerHTML = '';
        TORNA_CHECKLIST.forEach(function (item) {
            const isChecked = savedChecked.includes(item.id);
            const card = document.createElement('label');
            card.className = 'torna-chk-item' + (isChecked ? ' checked' : '');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = isChecked;
            checkbox.value = item.id;

            const textSpan = document.createElement('span');
            textSpan.className = 'torna-chk-label';
            textSpan.textContent = item.text + ' (' + item.category + ')';

            card.appendChild(checkbox);
            card.appendChild(textSpan);

            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    card.classList.add('checked');
                } else {
                    card.classList.remove('checked');
                }
                saveChecklistState();
            });

            grid.appendChild(card);
        });

        function saveChecklistState() {
            const checkedIds = Array.from(grid.querySelectorAll('input:checked')).map(function (cb) {
                return cb.value;
            });
            try {
                sessionStorage.setItem('torna_checklist', JSON.stringify(checkedIds));
            } catch (e) {}
        }
    }

    /* ---------- Lightbox Modal with Accessibility ---------- */
    function initGalleryAndLightbox() {
        const grid = document.getElementById('galleryGrid');
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.getElementById('lightboxClose');
        const emojiEl = document.getElementById('lightboxEmoji');
        const titleEl = document.getElementById('lightboxTitle');
        const captionEl = document.getElementById('lightboxCaption');

        if (!grid || !lightbox || typeof TORNA_GALLERY === 'undefined') return;

        let lastFocusedElement = null;

        grid.innerHTML = '';
        TORNA_GALLERY.forEach(function (item, index) {
            const tile = document.createElement('button');
            tile.type = 'button';
            tile.className = 'torna-gallery-tile';
            tile.setAttribute('aria-label', 'View photo ' + item.title);

            tile.innerHTML = `
                <span class="torna-gallery-emoji">${item.emoji}</span>
                <h3 class="torna-gallery-title">${item.title}</h3>
            `;

            tile.addEventListener('click', function () {
                openLightbox(index);
            });
            grid.appendChild(tile);
        });

        function openLightbox(index) {
            const item = TORNA_GALLERY[index];
            if (!item) return;

            lastFocusedElement = document.activeElement;

            if (emojiEl) emojiEl.textContent = item.emoji;
            if (titleEl) titleEl.textContent = item.title;
            if (captionEl) captionEl.textContent = item.caption;

            lightbox.hidden = false;
            document.body.style.overflow = 'hidden';
            if (closeBtn) closeBtn.focus();

            document.addEventListener('keydown', onKeydown);
        }

        function closeLightbox() {
            lightbox.hidden = true;
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKeydown);

            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }

        function onKeydown(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                return;
            }

            if (e.key === 'Tab') {
                const focusables = Array.from(lightbox.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])'));
                if (!focusables.length) return;

                const first = focusables[0];
                const last = focusables[focusables.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    /* ---------- DOM Ready Initialization ---------- */
    document.addEventListener('DOMContentLoaded', function () {
        initThemeToggle();
        initTabs();
        renderTimeline();
        renderHighlights();
        renderTrekSteps();
        initTrekCalculator();
        initSeasonToggle();
        renderChecklist();
        initGalleryAndLightbox();
    });
})();
