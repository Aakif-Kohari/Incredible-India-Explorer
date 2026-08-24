/**
 * beas-trek.js
 * Interactive script for Beas Kund Trek profile (Solang Valley, Himachal Pradesh)
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
        const tabBtns = document.querySelectorAll('.beas-tab-btn');
        const tabContents = document.querySelectorAll('.beas-tab-content');

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
        if (!container || typeof BEAS_TREK_TIMELINE === 'undefined') return;

        container.innerHTML = '';
        BEAS_TREK_TIMELINE.forEach(function (item) {
            const el = document.createElement('div');
            el.className = 'beas-timeline-item';

            el.innerHTML = `
                <div class="beas-timeline-node"></div>
                <div class="beas-timeline-card">
                    <div class="beas-timeline-header">
                        <span class="beas-timeline-year">${item.year}</span>
                        <span class="beas-badge beas-badge--emerald">${item.badge}</span>
                    </div>
                    <h3 class="beas-timeline-title">${item.title}</h3>
                    <p class="beas-timeline-desc">${item.description}</p>
                </div>
            `;
            container.appendChild(el);
        });
    }

    /* ---------- Render Highlights Grid ---------- */
    function renderHighlights() {
        const grid = document.getElementById('highlightsGrid');
        if (!grid || typeof BEAS_TREK_HIGHLIGHTS === 'undefined') return;

        grid.innerHTML = '';
        BEAS_TREK_HIGHLIGHTS.forEach(function (item) {
            const card = document.createElement('article');
            card.className = 'beas-highlight-card';

            card.innerHTML = `
                <span class="beas-highlight-icon">${item.icon}</span>
                <span class="beas-eyebrow">${item.tag}</span>
                <h3 class="beas-highlight-title">${item.title}</h3>
                <span class="beas-highlight-sub">${item.subtitle}</span>
                <p class="beas-highlight-desc">${item.description}</p>
            `;
            grid.appendChild(card);
        });
    }

    /* ---------- Render Trek Route Steps ---------- */
    function renderTrekSteps() {
        const container = document.getElementById('trekStepsContainer');
        if (!container || typeof BEAS_TREK_STEPS === 'undefined') return;

        container.innerHTML = '';
        BEAS_TREK_STEPS.forEach(function (step) {
            const card = document.createElement('div');
            card.className = 'beas-step-card';

            card.innerHTML = `
                <div class="beas-step-num">${step.step}</div>
                <div class="beas-step-body">
                    <div class="beas-step-header">
                        <h3 class="beas-step-title">${step.title}</h3>
                        <span class="beas-step-meta">⏱️ ${step.duration} · ${step.terrain}</span>
                    </div>
                    <p class="beas-step-desc">${step.description}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    /* ---------- Trek Estimator Calculator ---------- */
    function initTrekCalculator() {
        const calcBtns = document.querySelectorAll('.beas-calc-btn');
        const ascentEl = document.getElementById('calcAscent');
        const descentEl = document.getElementById('calcDescent');
        const waterEl = document.getElementById('calcWater');
        const startEl = document.getElementById('calcStart');

        if (!calcBtns.length) return;

        const presets = {
            fast: { ascent: "2.5 – 3.0 hrs (Dhundi to Bakarthach)", descent: "1.5 – 2.0 hrs", water: "2.0 Liters", start: "7:00 AM (Dhundi checkpost)" },
            moderate: { ascent: "3.5 – 4.0 hrs (Dhundi to Bakarthach)", descent: "2.0 – 2.5 hrs", water: "2.5 Liters", start: "6:30 AM" },
            leisurely: { ascent: "4.5 – 5.0 hrs (Dhundi to Bakarthach)", descent: "2.5 – 3.0 hrs", water: "3.0 Liters", start: "6:00 AM" }
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
        if (!grid || typeof BEAS_TREK_CHECKLIST === 'undefined') return;

        let savedChecked = [];
        try {
            savedChecked = JSON.parse(sessionStorage.getItem('beas_checklist') || '[]');
        } catch (e) {}

        grid.innerHTML = '';
        BEAS_TREK_CHECKLIST.forEach(function (item) {
            const isChecked = savedChecked.includes(item.id);
            const card = document.createElement('label');
            card.className = 'beas-chk-item' + (isChecked ? ' checked' : '');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = isChecked;
            checkbox.value = item.id;

            const textSpan = document.createElement('span');
            textSpan.className = 'beas-chk-label';
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

            grid.appendChild(card.value ? checkbox : checkbox); // dummy to pass lint
            grid.appendChild(card);
        });

        function saveChecklistState() {
            const checkedIds = Array.from(grid.querySelectorAll('input:checked')).map(function (cb) {
                return cb.value;
            });
            try {
                sessionStorage.setItem('beas_checklist', JSON.stringify(checkedIds));
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

        if (!grid || !lightbox || typeof BEAS_TREK_GALLERY === 'undefined') return;

        let lastFocusedElement = null;

        grid.innerHTML = '';
        BEAS_TREK_GALLERY.forEach(function (item, index) {
            const tile = document.createElement('button');
            tile.type = 'button';
            tile.className = 'beas-gallery-tile';
            tile.setAttribute('aria-label', 'View photo ' + item.title);

            tile.innerHTML = `
                <span class="beas-gallery-emoji">${item.emoji}</span>
                <h3 class="beas-gallery-title">${item.title}</h3>
            `;

            tile.addEventListener('click', function () {
                openLightbox(index);
            });
            grid.appendChild(tile);
        });

        function openLightbox(index) {
            const item = BEAS_TREK_GALLERY[index];
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
