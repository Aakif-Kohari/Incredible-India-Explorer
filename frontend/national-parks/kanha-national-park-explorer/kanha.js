/**
 * Kanha National Park Explorer — Interactive Logic
 * Renders KANHA_DATA (from kanha-data.js) into the DOM and wires up
 * theme toggling, the safari zone selector, the interactive map, and the gallery lightbox.
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        renderQuickStats();
        renderBarasingha();
        renderTigerReserve();
        renderWildlife();
        renderFlora();
        renderForests();
        renderSafariZones();
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
                themeBtn.textContent = isLight ? '🌙' : '☀️';
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
        if (!container || typeof KANHA_DATA === 'undefined') return;

        var html = '';
        KANHA_DATA.quickStats.forEach(function (st) {
            html +=
                '<div class="stat-card glass-card">' +
                '<div class="stat-icon">' + st.icon + '</div>' +
                '<span class="stat-value">' + st.value + '</span>' +
                '<span class="stat-label">' + st.label + '</span>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderBarasingha() {
        if (typeof KANHA_DATA === 'undefined') return;
        var data = KANHA_DATA.barasingha;
        var titleEl = document.getElementById('barasingha-title');
        var descEl = document.getElementById('barasingha-desc');
        var factsEl = document.getElementById('barasingha-facts');

        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.description;
        if (factsEl) {
            var html = '<ul style="list-style:none; padding:0;">';
            data.facts.forEach(function (f) {
                html += '<li style="padding:0.4rem 0; color:var(--kanha-text-muted-dark);">🦌 ' + f + '</li>';
            });
            html += '</ul>';
            factsEl.innerHTML = html;
        }
    }

    function renderTigerReserve() {
        if (typeof KANHA_DATA === 'undefined') return;
        var data = KANHA_DATA.tigerReserve;
        var titleEl = document.getElementById('tiger-title');
        var descEl = document.getElementById('tiger-desc');
        var container = document.getElementById('tiger-highlights');

        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.description;
        if (container) {
            var html = '';
            data.highlights.forEach(function (h) {
                html +=
                    '<div class="glass-card" style="padding:1.2rem;">🐅' +
                    '<p style="margin-top:0.5rem; font-size:0.9rem; color:var(--kanha-text-muted-dark);">' + h + '</p>' +
                    '</div>';
            });
            container.innerHTML = html;
        }
    }

    function renderWildlife() {
        var container = document.getElementById('wildlife-grid');
        if (!container || typeof KANHA_DATA === 'undefined') return;

        var html = '';
        KANHA_DATA.wildlife.forEach(function (w) {
            html +=
                '<div class="glass-card" style="padding:1.5rem;">' +
                '<h3 style="font-family:var(--font-heading); font-size:1.2rem; margin-bottom:0.2rem;">' + w.icon + ' ' + w.name + '</h3>' +
                '<span style="display:inline-block; padding:0.2rem 0.6rem; background:rgba(180,83,9,0.2); color:#fb923c; border-radius:999px; font-size:0.75rem; font-weight:700; margin-bottom:0.8rem;">' + w.status + '</span>' +
                '<p style="font-size:0.9rem; color:var(--kanha-text-muted-dark); line-height:1.55;">' + w.desc + '</p>' +
                '</div>';
        });
        container.innerHTML = html;
    }

    function renderFlora() {
        if (typeof KANHA_DATA === 'undefined') return;
        var data = KANHA_DATA.flora;
        var titleEl = document.getElementById('flora-title');
        var descEl = document.getElementById('flora-desc');
        var container = document.getElementById('flora-grid');

        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.description;
        if (container) {
            var html = '';
            data.types.forEach(function (t) {
                html +=
                    '<div class="glass-card" style="padding:1.5rem;">' +
                    '<h4 style="color:var(--kanha-gold); margin-bottom:0.5rem;">🌳 ' + t.name + '</h4>' +
                    '<p style="font-size:0.9rem; color:var(--kanha-text-muted-dark); line-height:1.5;">' + t.desc + '</p>' +
                    '</div>';
            });
            container.innerHTML = html;
        }
    }

    function renderForests() {
        if (typeof KANHA_DATA === 'undefined') return;
        var data = KANHA_DATA.forests;
        var titleEl = document.getElementById('forests-title');
        var descEl = document.getElementById('forests-desc');
        var container = document.getElementById('forests-grid');

        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.description;
        if (container) {
            var html = '';
            data.zones.forEach(function (z) {
                html +=
                    '<div class="glass-card" style="padding:1.5rem;">' +
                    '<h4 style="color:var(--kanha-gold); margin-bottom:0.5rem;">🏞️ ' + z.name + '</h4>' +
                    '<p style="font-size:0.9rem; color:var(--kanha-text-muted-dark); line-height:1.5;">' + z.desc + '</p>' +
                    '</div>';
            });
            container.innerHTML = html;
        }
    }

    function renderSafariZones() {
        var selector = document.getElementById('zone-selector');
        var details = document.getElementById('zone-details');
        if (!selector || !details || typeof KANHA_DATA === 'undefined') return;

        var html = '';
        KANHA_DATA.safariZones.forEach(function (z, idx) {
            html +=
                '<div class="zone-list-item' + (idx === 0 ? ' active' : '') + '" data-zone-id="' + z.id + '">' +
                '<strong>' + z.name + '</strong>' +
                '</div>';
        });
        selector.innerHTML = html;

        function showZone(zone) {
            details.innerHTML =
                '<h3 style="color:var(--kanha-gold); margin-bottom:0.5rem;">' + zone.name + '</h3>' +
                '<p style="font-size:0.85rem; color:var(--kanha-text-muted-dark); margin-bottom:0.8rem;">⏱ ' + zone.timing + '</p>' +
                '<p style="margin-bottom:0.8rem; line-height:1.6;">' + zone.desc + '</p>' +
                '<p style="font-weight:600; color:var(--kanha-gold);">✨ ' + zone.highlight + '</p>';
        }

        showZone(KANHA_DATA.safariZones[0]);

        selector.querySelectorAll('.zone-list-item').forEach(function (item) {
            item.addEventListener('click', function () {
                selector.querySelectorAll('.zone-list-item').forEach(function (i) {
                    i.classList.remove('active');
                });
                item.classList.add('active');
                var zone = KANHA_DATA.safariZones.find(function (z) {
                    return z.id === item.dataset.zoneId;
                });
                if (zone) showZone(zone);
            });
        });
    }

    function renderInteractiveMap() {
        var container = document.getElementById('map-hotspots-layer');
        var infoPopup = document.getElementById('map-info-popup');
        if (!container || typeof KANHA_DATA === 'undefined') return;

        var html = '';
        KANHA_DATA.mapHotspots.forEach(function (spot) {
            var leftPct = (spot.x / 1000) * 100;
            var topPct = (spot.y / 600) * 100;
            html +=
                '<button type="button" class="map-hotspot-pin" style="left:' + leftPct + '%; top:' + topPct + '%;" data-spot-id="' + spot.id + '" aria-label="' + spot.name + '">📍</button>';
        });
        container.innerHTML = html;

        container.querySelectorAll('.map-hotspot-pin').forEach(function (pin) {
            pin.addEventListener('click', function () {
                var spot = KANHA_DATA.mapHotspots.find(function (s) {
                    return s.id === pin.dataset.spotId;
                });
                if (spot && infoPopup) {
                    infoPopup.innerHTML = '<h4>' + spot.name + '</h4><p>' + spot.desc + '</p>';
                    infoPopup.classList.remove('hidden');
                }
            });
        });
    }

    function renderGalleryGrid() {
        var container = document.getElementById('gallery-grid');
        if (!container || typeof KANHA_DATA === 'undefined') return;

        var html = '';
        KANHA_DATA.gallery.forEach(function (img, idx) {
            html +=
                '<div class="gallery-item" data-idx="' + idx + '">' +
                '<img class="gallery-img" src="' + img.src + '" alt="Kanha National Park" loading="lazy">' +
                '<div class="gallery-overlay"><p>' + img.caption + '</p></div>' +
                '</div>';
        });
        container.innerHTML = html;

        container.querySelectorAll('.gallery-item').forEach(function (item) {
            item.addEventListener('click', function () {
                openLightbox(parseInt(item.dataset.idx, 10));
            });
        });
    }

    function openLightbox(idx) {
        if (typeof KANHA_DATA === 'undefined' || !KANHA_DATA.gallery[idx]) return;
        var modal = document.getElementById('lightbox-modal');
        var imgEl = document.getElementById('lightbox-img');
        var capEl = document.getElementById('lightbox-caption');
        if (!modal || !imgEl || !capEl) return;

        imgEl.src = KANHA_DATA.gallery[idx].src;
        capEl.textContent = KANHA_DATA.gallery[idx].caption;
        modal.classList.remove('hidden');
    }

    function closeLightbox() {
        var modal = document.getElementById('lightbox-modal');
        if (modal) modal.classList.add('hidden');
    }
})();