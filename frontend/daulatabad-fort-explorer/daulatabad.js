/**
 * Daulatabad Fort Explorer — Script
 * Renders fort data into the page and powers the emoji-gallery lightbox.
 */
(function () {
    'use strict';

    const lightboxState = { index: 0 };

    document.addEventListener('DOMContentLoaded', function () {
        renderHeroStats();
        renderText();
        renderFacts();
        renderGallery();
        bindLightboxEvents();
    });

    function renderHeroStats() {
        const el = document.getElementById('hero-quick-stats');
        if (!el) return;
        el.innerHTML =
            statHtml(DAULATABAD_FORT.height, 'Hill Height') +
            statHtml(DAULATABAD_FORT.built, 'Founded') +
            statHtml(DAULATABAD_FORT.builtBy, 'Founded By');
    }

    function statHtml(value, label) {
        return (
            '<div class="quick-stat"><strong>' + esc(value) + '</strong><span>' + esc(label) + '</span></div>'
        );
    }

    function renderText() {
        setText('overview-text', DAULATABAD_FORT.overview);
        setText('history-text', DAULATABAD_FORT.history);
        setText('builder-text', DAULATABAD_FORT.builder);
        setText('yadava-text', DAULATABAD_FORT.yadavaDynasty);
        setText('defence-text', DAULATABAD_FORT.defenceMechanisms);
        setText('architecture-text', DAULATABAD_FORT.architecture);
    }

    function setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    function renderFacts() {
        const el = document.getElementById('facts-grid');
        if (!el) return;
        el.innerHTML = DAULATABAD_FORT.interestingFacts
            .map(function (f) {
                return '<li>' + esc(f) + '</li>';
            })
            .join('');
    }

    function renderGallery() {
        const el = document.getElementById('gallery-grid');
        if (!el) return;
        el.innerHTML = DAULATABAD_FORT.gallery
            .map(function (item, i) {
                return (
                    '<div class="gallery-card" data-index="' +
                    i +
                    '" role="listitem" tabindex="0" aria-label="' +
                    escA(item.caption) +
                    '">' +
                    '<div class="gallery-card-emoji" aria-hidden="true">' +
                    item.emoji +
                    '</div>' +
                    '<div class="gallery-card-caption">' +
                    esc(item.caption) +
                    '</div></div>'
                );
            })
            .join('');

        el.querySelectorAll('.gallery-card').forEach(function (card) {
            card.addEventListener('click', function () {
                openLightbox(parseInt(card.dataset.index, 10));
            });
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(parseInt(card.dataset.index, 10));
                }
            });
        });
    }

    function bindLightboxEvents() {
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        const backdrop = document.getElementById('lightbox-backdrop');

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (backdrop) backdrop.addEventListener('click', closeLightbox);
        if (prevBtn)
            prevBtn.addEventListener('click', function () {
                navigateLightbox(-1);
            });
        if (nextBtn)
            nextBtn.addEventListener('click', function () {
                navigateLightbox(1);
            });

        document.addEventListener('keydown', function (e) {
            const lb = document.getElementById('lightbox');
            if (!lb || lb.classList.contains('hidden')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        });
    }

    function openLightbox(index) {
        lightboxState.index = index;
        const lb = document.getElementById('lightbox');
        lb.classList.remove('hidden');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        updateLightbox();
        const closeBtn = document.getElementById('lightbox-close');
        if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
        const lb = document.getElementById('lightbox');
        lb.classList.add('hidden');
        lb.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function navigateLightbox(dir) {
        const len = DAULATABAD_FORT.gallery.length;
        lightboxState.index = (lightboxState.index + dir + len) % len;
        updateLightbox();
    }

    function updateLightbox() {
        const item = DAULATABAD_FORT.gallery[lightboxState.index];
        if (!item) return;
        document.getElementById('lightbox-emoji').textContent = item.emoji;
        document.getElementById('lightbox-caption').textContent =
            lightboxState.index + 1 + ' / ' + DAULATABAD_FORT.gallery.length + ' — ' + item.caption;
    }

    function esc(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function escA(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
})();