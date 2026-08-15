/**
 * Nokrek National Park Explorer — Interactive Logic
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        renderQuickStats();
        renderBiosphereOverview();
        renderForestZones();
        renderRedPandaAndCitrus();
        renderWildlifeGrid();
        renderBiodiversityStats();
        renderInteractiveMap();
        renderGalleryGrid();
        bindEvents();
    });

    function initTheme() {
        var savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }

    function bindEvents() {
        var themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', function () {
                document.body.classList.toggle('light-theme');
                var isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            });
        }

        var lbClose = document.getElementById('lightbox-close');
        if (lbClose) lbClose.addEventListener('click', closeLightbox);

        var lbModal = document.getElementById('lightbox-modal');
        if (lbModal) {
            lbModal.addEventListener('click', function (e) {
                if (e.target === lbModal) closeLightbox();
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    function renderQuickStats() {
        var container = document.getElementById('stats-grid');
        if (!container || typeof NOKREK_INFO === 'undefined') return;

        var html = '';
        NOKREK_INFO.quickStats.forEach(function (st) {
            html +=
                '<div class="stat-card glass-card">' +
                '<div class="stat-icon">' + st.icon + '</div>' +
                '<span class="stat-value">' + st.value + '</span>' +
                '<span class="stat-label">' + st.label + '</span>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderBiosphereOverview() {
        var el = document.getElementById('biosphere-overview-text');
        if (!el || typeof BIOSPHERE_OVERVIEW === 'undefined') return;
        el.textContent = BIOSPHERE_OVERVIEW.overview + ' ' + BIOSPHERE_OVERVIEW.zoning;
    }

    function renderForestZones() {
        var container = document.getElementById('forest-zones-grid');
        if (!container || typeof FOREST_ZONES === 'undefined') return;

        var html = '';
        FOREST_ZONES.forEach(function (zone) {
            html +=
                '<div class="eco-card glass-card">' +
                '<h3>' + zone.title + '</h3>' +
                '<p>' + zone.description + '</p>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderRedPandaAndCitrus() {
        var pandaEl = document.getElementById('red-panda-text');
        if (pandaEl && typeof RED_PANDA_INFO !== 'undefined') {
            pandaEl.textContent = RED_PANDA_INFO.significance + ' ' + RED_PANDA_INFO.adaptation;
        }

        var citrusEl = document.getElementById('wild-citrus-text');
        if (citrusEl && typeof WILD_CITRUS_INFO !== 'undefined') {
            citrusEl.textContent = WILD_CITRUS_INFO.overview + ' ' + WILD_CITRUS_INFO.conservation;
        }
    }

    function renderWildlifeGrid() {
        var container = document.getElementById('wildlife-grid');
        if (!container || typeof NOKREK_WILDLIFE === 'undefined') return;

        var html = '';
        NOKREK_WILDLIFE.forEach(function (w) {
            html +=
                '<div class="glass-card" style="overflow:hidden; display:flex; flex-direction:column;">' +
                '<div style="height:190px; position:relative; overflow:hidden;">' +
                '<div class="media-icon-box">' + w.icon + '</div>' +
                '<span style="position:absolute; top:0.8rem; right:0.8rem; padding:0.3rem 0.7rem; border-radius:999px; font-size:0.75rem; font-weight:700; background:rgba(217,119,6,0.9); color:#fff;">' + w.status + '</span>' +
                '</div>' +
                '<div style="padding:1.5rem; display:flex; flex-direction:column; flex-grow:1;">' +
                '<h3 style="font-family:var(--font-heading); font-size:1.3rem; margin-bottom:0.2rem;">' + w.name + '</h3>' +
                '<div style="font-style:italic; font-size:0.85rem; color:var(--gold-bright); margin-bottom:0.8rem;">' + w.scientificName + '</div>' +
                '<p style="font-size:0.9rem; color:var(--nokrek-text-muted-dark); line-height:1.55;">' + w.description + '</p>' +
                '</div>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderBiodiversityStats() {
        var container = document.getElementById('biodiversity-grid');
        if (!container || typeof BIODIVERSITY_STATS === 'undefined') return;

        var html = '';
        BIODIVERSITY_STATS.forEach(function (st) {
            html +=
                '<div class="stat-card glass-card">' +
                '<div class="stat-icon">' + st.icon + '</div>' +
                '<span class="stat-value">' + st.value + '</span>' +
                '<span class="stat-label">' + st.label + '</span>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderInteractiveMap() {
        var container = document.getElementById('map-hotspots-layer');
        var infoPopup = document.getElementById('map-info-popup');
        if (!container || typeof MAP_HOTSPOTS === 'undefined') return;

        var iconFor = function (category) {
            if (category === 'gate') return '🚪';
            if (category === 'citrus') return '🍊';
            if (category === 'peak') return '⛰️';
            return '🌲';
        };

        var html = '';
        MAP_HOTSPOTS.forEach(function (spot) {
            html +=
                '<button type="button" class="map-hotspot-pin" style="left:' + spot.x + '%; top:' + spot.y + '%;" data-spot-id="' + spot.id + '" aria-label="' + spot.name + '">' +
                iconFor(spot.category) +
                '</button>';
        });
        container.innerHTML = html;

        container.querySelectorAll('.map-hotspot-pin').forEach(function (pin) {
            pin.addEventListener('click', function () {
                var spot = MAP_HOTSPOTS.find(function (s) { return s.id === pin.dataset.spotId; });
                if (spot && infoPopup) {
                    infoPopup.innerHTML =
                        '<h4>' + spot.name + '</h4>' +
                        '<p>' + spot.description + '</p>';
                    infoPopup.classList.remove('hidden');
                }
            });
        });
    }
    function galleryIconFor(title) {
    var t = title.toLowerCase();
    if (t.indexOf('panda') !== -1) return '🐼';
    if (t.indexOf('leopard') !== -1) return '🐆';
    if (t.indexOf('elephant') !== -1) return '🐘';
    if (t.indexOf('stream') !== -1 || t.indexOf('river') !== -1) return '💧';
    return '🌳';
}
    function renderGalleryGrid() {
        var container = document.getElementById('gallery-grid');
        if (!container || typeof GALLERY_IMAGES === 'undefined') return;

        var html = '';
        GALLERY_IMAGES.forEach(function (img, idx) {
            html +=
                '<button type="button" class="gallery-item" data-idx="' + idx + '">' +
                '<div class="gallery-icon-box">' + galleryIconFor(img.title) + '</div>' +
                '<div class="gallery-overlay">' +
                '<h4 style="color:#fff;">' + img.title + '</h4>' +
                '<p style="color:#cbd5e1; font-size:0.82rem;">' + img.caption + '</p>' +
                '</div>' +
                '</button>';
        });
        container.innerHTML = html;

        container.querySelectorAll('.gallery-item').forEach(function (item) {
            item.addEventListener('click', function () {
                openLightbox(parseInt(item.dataset.idx, 10));
            });
        });
    }

    function openLightbox(idx) {
    if (typeof GALLERY_IMAGES === 'undefined' || !GALLERY_IMAGES[idx]) return;
    var modal = document.getElementById('lightbox-modal');
    var imgEl = document.getElementById('lightbox-img');
    var capEl = document.getElementById('lightbox-caption');
    if (!modal || !imgEl || !capEl) return;

    imgEl.style.display = 'none';
    var iconEl = document.getElementById('lightbox-icon');
    if (!iconEl) {
        iconEl = document.createElement('div');
        iconEl.id = 'lightbox-icon';
        iconEl.className = 'lightbox-icon';
        imgEl.parentNode.insertBefore(iconEl, imgEl);
    }
    iconEl.textContent = galleryIconFor(GALLERY_IMAGES[idx].title);
    capEl.textContent = GALLERY_IMAGES[idx].title + ' — ' + GALLERY_IMAGES[idx].caption;
    modal.classList.remove('hidden');
}

    function closeLightbox() {
        var modal = document.getElementById('lightbox-modal');
        if (modal) modal.classList.add('hidden');
    }
})();