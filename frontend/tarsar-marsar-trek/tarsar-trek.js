/**
 * tarsar-trek.js
 * Interactive script for Tarsar Marsar Trek profile (Aru Valley, Jammu & Kashmir)
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
        const tabBtns = document.querySelectorAll('.tarsar-tab-btn');
        const tabContents = document.querySelectorAll('.tarsar-tab-content');

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
        if (!container || typeof TARSAR_TREK_TIMELINE === 'undefined') return;

        container.innerHTML = '';
        TARSAR_TREK_TIMELINE.forEach(function (item) {
            const el = document.createElement('div');
            el.className = 'tarsar-timeline-item';

            el.innerHTML = `
                <div class="tarsar-timeline-node"></div>
                <div class="tarsar-timeline-card">
                    <div class="tarsar-timeline-header">
                        <span class="tarsar-timeline-year">${item.year}</span>
                        <span class="tarsar-badge tarsar-badge--emerald">${item.badge}</span>
                    </div>
                    <h3 class="tarsar-timeline-title">${item.title}</h3>
                    <p class="tarsar-timeline-desc">${item.description}</p>
                </div>
            `;
            container.appendChild(el);
        });
    }

    /* ---------- Render Highlights Grid ---------- */
    function renderHighlights() {
        const grid = document.getElementById('highlightsGrid');
        if (!grid || typeof TARSAR_TREK_HIGHLIGHTS === 'undefined') return;

        grid.innerHTML = '';
        TARSAR_TREK_HIGHLIGHTS.forEach(function (item) {
            const card = document.createElement('article');
            card.className = 'tarsar-highlight-card';

            card.innerHTML = `
                <span class="tarsar-highlight-icon">${item.icon}</span>
                <span class="tarsar-eyebrow">${item.tag}</span>
                <h3 class="tarsar-highlight-title">${item.title}</h3>
                <span class="tarsar-highlight-sub">${item.subtitle}</span>
                <p class="tarsar-highlight-desc">${item.description}</p>
            `;
            grid.appendChild(card);
        });
    }

    /* ---------- Render Trek Route Steps ---------- */
    function renderTrekSteps() {
        const container = document.getElementById('trekStepsContainer');
        if (!container || typeof TARSAR_TREK_STEPS === 'undefined') return;

        container.innerHTML = '';
        TARSAR_TREK_STEPS.forEach(function (step) {
            const card = document.createElement('div');
            card.className = 'tarsar-step-card';

            card.innerHTML = `
                <div class="tarsar-step-num">${step.step}</div>
                <div class="tarsar-step-body">
                    <div class="tarsar-step-header">
                        <h3 class="tarsar-step-title">${step.title}</h3>
                        <span class="tarsar-step-meta">⏱️ ${step.duration} · ${step.terrain}</span>
                    </div>
                    <p class="tarsar-step-desc">${step.description}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    /* ---------- Trek Estimator Calculator ---------- */
    function initTrekCalculator() {
        const calcBtns = document.querySelectorAll('.tarsar-calc-btn');
        const ascentEl = document.getElementById('calcAscent');
        const descentEl = document.getElementById('calcDescent');
        const waterEl = document.getElementById('calcWater');
        const startEl = document.getElementById('calcStart');

        if (!calcBtns.length) return;

        const presets = {
            fast: { ascent: "4.0 – 5.0 hrs (Lidderwat to Tarsar)", descent: "3.0 hrs (Sundersar back)", water: "2.5 Liters", start: "7:30 AM (Lidderwat camp)" },
            moderate: { ascent: "5.0 – 6.0 hrs (Lidderwat to Tarsar)", descent: "4.0 hrs", water: "3.0 Liters", start: "7:00 AM" },
            leisurely: { ascent: "6.5 – 7.5 hrs (Lidderwat to Tarsar)", descent: "5.0 hrs", water: "3.5 Liters", start: "6:30 AM" }
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

    /* ---------- Render Interactive Checklist ---------- */
    function renderChecklist() {
        const grid = document.getElementById('checklistGrid');
        if (!grid || typeof TARSAR_TREK_CHECKLIST === 'undefined') return;

        let savedChecked = [];
        try {
            savedChecked = JSON.parse(sessionStorage.getItem('tarsar_checklist') || '[]');
        } catch (e) {}

        grid.innerHTML = '';
        TARSAR_TREK_CHECKLIST.forEach(function (item) {
            const isChecked = savedChecked.includes(item.id);
            const card = document.createElement('label');
            card.className = 'tarsar-chk-item' + (isChecked ? ' checked' : '');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = isChecked;
            checkbox.value = item.id;

            const textSpan = document.createElement('span');
            textSpan.className = 'tarsar-chk-label';
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
                sessionStorage.setItem('tarsar_checklist', JSON.stringify(checkedIds));
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

        if (!grid || !lightbox || typeof TARSAR_TREK_GALLERY === 'undefined') return;

        let lastFocusedElement = null;

        grid.innerHTML = '';
        TARSAR_TREK_GALLERY.forEach(function (item, index) {
            const tile = document.createElement('button');
            tile.type = 'button';
            tile.className = 'tarsar-gallery-tile';
            tile.setAttribute('aria-label', 'View photo ' + item.title);

            tile.innerHTML = `
                <span class="tarsar-gallery-emoji">${item.emoji}</span>
                <h3 class="tarsar-gallery-title">${item.title}</h3>
            `;

            tile.addEventListener('click', function () {
                openLightbox(index);
            });
            grid.appendChild(tile);
        });

        function openLightbox(index) {
            const item = TARSAR_TREK_GALLERY[index];
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
        renderChecklist();
        initGalleryAndLightbox();
    });
})();
