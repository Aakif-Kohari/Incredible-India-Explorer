(function () {
    'use strict';

    /* ---------- Theme toggle ---------- */
    function initThemeToggle() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;

        const isLight = document.documentElement.classList.contains('light-theme');
        btn.setAttribute('aria-pressed', String(isLight));

        btn.addEventListener('click', function () {
            const nowLight = document.documentElement.classList.toggle('light-theme');
            btn.setAttribute('aria-pressed', String(nowLight));
            localStorage.setItem('theme', nowLight ? 'light' : 'dark');
        });
    }

    /* ---------- Facts grid (DOM-safe, no innerHTML with data) ---------- */
    function renderFacts() {
        const grid = document.getElementById('factsGrid');
        if (!grid || typeof RAJGAD_FACTS === 'undefined') return;

        RAJGAD_FACTS.forEach(function (fact) {
            const card = document.createElement('article');
            card.className = 'rg-fact-card';

            const title = document.createElement('h3');
            title.className = 'rg-fact-card__title';
            title.textContent = fact.title;

            const detail = document.createElement('p');
            detail.textContent = fact.detail;

            card.appendChild(title);
            card.appendChild(detail);
            grid.appendChild(card);
        });
    }

    /* ---------- Gallery + accessible lightbox with Tab focus trap ---------- */
    function initGallery() {
        const grid = document.getElementById('galleryGrid');
        const lightbox = document.getElementById('lightbox');
        const lightboxFigure = document.getElementById('lightboxFigure');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const closeBtn = document.getElementById('lightboxClose');
        if (!grid || !lightbox || typeof RAJGAD_GALLERY === 'undefined') return;

        let lastFocused = null;

        function buildTile(item, index) {
            const tile = document.createElement('button');
            tile.type = 'button';
            tile.className = 'rg-gallery__tile rg-gallery__tile--' + item.id;
            tile.setAttribute('aria-label', 'View ' + item.title);
            tile.dataset.index = String(index);

            const emojiBox = document.createElement('span');
            emojiBox.className = 'rg-gallery__tile-emoji';
            emojiBox.textContent = item.emoji;

            const label = document.createElement('span');
            label.className = 'rg-gallery__tile-label';
            label.textContent = item.title;

            tile.appendChild(emojiBox);
            tile.appendChild(label);
            tile.addEventListener('click', function () {
                openLightbox(index);
            });
            return tile;
        }

        RAJGAD_GALLERY.forEach(function (item, index) {
            grid.appendChild(buildTile(item, index));
        });

        function getFocusableInLightbox() {
            return Array.prototype.slice.call(
                lightbox.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
            ).filter(function (el) { return !el.hasAttribute('hidden'); });
        }

        function openLightbox(index) {
            const item = RAJGAD_GALLERY[index];
            if (!item) return;

            lastFocused = document.activeElement;

            lightboxFigure.className = 'rg-lightbox__figure rg-lightbox__figure--' + item.id;
            lightboxFigure.textContent = '';

            const lightboxEmoji = document.createElement('span');
            lightboxEmoji.className = 'rg-lightbox__emoji';
            lightboxEmoji.textContent = item.emoji;
            lightboxFigure.appendChild(lightboxEmoji);

            const heading = document.createElement('span');
            heading.textContent = item.title;
            lightboxFigure.appendChild(heading);

            lightboxCaption.textContent = item.caption;

            lightbox.hidden = false;
            document.addEventListener('keydown', onKeydown);
            closeBtn.focus();
        }

        function closeLightbox() {
            lightbox.hidden = true;
            document.removeEventListener('keydown', onKeydown);
            if (lastFocused && typeof lastFocused.focus === 'function') {
                lastFocused.focus();
            }
        }

        function onKeydown(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                return;
            }
            if (e.key !== 'Tab') return;

            const focusable = getFocusableInLightbox();
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initThemeToggle();
        renderFacts();
        initGallery();
    });
})();