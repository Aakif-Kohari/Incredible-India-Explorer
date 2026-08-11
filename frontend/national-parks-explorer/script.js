/**
 * National Parks of India Explorer — Script
 * Interactive India SVG map, state filters, wildlife with images,
 * tiger reserves with images, gallery with lightbox, animations.
 */
(function () {
    'use strict';

    /* ================================================================
       1. STATE
       ================================================================ */

    var activeFilters = { search: '', state: 'all', type: 'all', region: 'all' };
    var lightboxState = { images: [], currentIndex: 0 };

    /* ================================================================
       2. INIT
       ================================================================ */

    document.addEventListener('DOMContentLoaded', function () {
        renderStateFilter();
        renderMap();
        renderParksGrid();
        renderWildlifeGrid();
        renderTigerSection();
        renderGallery();
        bindFilterEvents();
        bindModalEvents();
        bindLightboxEvents();
        initScrollAnimations();
    });

    /* ================================================================
       3. SCROLL ANIMATIONS (IntersectionObserver)
       ================================================================ */

    function initScrollAnimations() {
        var targets = document.querySelectorAll(
            '.section-header, .park-card, .wildlife-card, .tiger-park-card, .tiger-stat-card, .gallery-item'
        );
        if (!targets.length) return;

        if (!('IntersectionObserver' in window)) {
            targets.forEach(function (el) {
                el.classList.add('animate-visible');
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        targets.forEach(function (el) {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    /* ================================================================
       4. STATE FILTER DROPDOWN
       ================================================================ */

    function renderStateFilter() {
        var select = document.getElementById('filter-state');
        if (!select) return;
        var seen = {};
        NATIONAL_PARKS.forEach(function (p) {
            seen[p.state] = 1;
        });
        Object.keys(seen)
            .sort()
            .forEach(function (state) {
                var opt = document.createElement('option');
                opt.value = state;
                opt.textContent = state;
                select.appendChild(opt);
            });
    }

    /* ================================================================
       5. INDIA SVG MAP (uses real paths from map-data.js)
       ================================================================ */

    function renderMap() {
        var svg = document.getElementById('india-svg-map');
        if (!svg) return;

        var states = typeof INDIA_MAP_STATES !== 'undefined' ? INDIA_MAP_STATES : [];
        if (!states.length) {
            svg.innerHTML =
                '<text x="306" y="348" text-anchor="middle" fill="#94a3b8" font-size="14" font-family="Outfit,sans-serif">Map data loading...</text>';
            return;
        }

        var pathsHtml = '';
        states.forEach(function (s) {
            pathsHtml += '<path class="state-path" data-state="' + s.id + '" d="' + s.path + '"/>';
        });
        svg.innerHTML = pathsHtml;

        renderMapMarkers();

        svg.querySelectorAll('.state-path').forEach(function (path) {
            path.addEventListener('click', function () {
                var sid = path.dataset.state;
                var park = NATIONAL_PARKS.find(function (p) {
                    return p.stateId === sid;
                });
                if (park) openParkModal(park.id);
            });
        });
    }

    function renderMapMarkers() {
        var container = document.getElementById('map-park-markers');
        if (!container) return;

        var html = '';
        NATIONAL_PARKS.forEach(function (park) {
            var pos = latLngToMapPos(park.coordinates.lat, park.coordinates.lng);
            var cls = 'map-marker ';
            cls += park.isTigerReserve ? 'tiger' : park.isUNESCO ? 'unesco' : 'park';

            html +=
                '<div class="' +
                cls +
                '" data-park-id="' +
                park.id +
                '" ' +
                'style="left:' +
                pos.x +
                '%;top:' +
                pos.y +
                '%;" ' +
                'tabindex="0" role="button" ' +
                'aria-label="' +
                escA(park.name) +
                ', ' +
                escA(park.state) +
                ' – ' +
                (park.isTigerReserve ? 'Tiger Reserve' : park.isUNESCO ? 'UNESCO Site' : 'National Park') +
                '">' +
                '<div class="map-marker-pulse" aria-hidden="true"></div></div>';
        });
        container.innerHTML = html;

        container.querySelectorAll('.map-marker').forEach(function (marker) {
            marker.addEventListener('mouseenter', function () {
                showMapTooltip(marker.dataset.parkId, marker);
            });
            marker.addEventListener('mouseleave', hideMapTooltip);
            marker.addEventListener('focus', function () {
                showMapTooltip(marker.dataset.parkId, marker);
            });
            marker.addEventListener('blur', hideMapTooltip);
            marker.addEventListener(
                'touchstart',
                function () {
                    showMapTooltip(marker.dataset.parkId, marker);
                    setTimeout(hideMapTooltip, 2500);
                },
                { passive: true }
            );
            marker.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    hideMapTooltip();
                    openParkModal(marker.dataset.parkId);
                }
            });
            marker.addEventListener('click', function () {
                hideMapTooltip();
                openParkModal(marker.dataset.parkId);
            });
        });
    }

    function latLngToMapPos(lat, lng) {
        var minLat = 6.0,
            maxLat = 37.0,
            minLng = 68.0,
            maxLng = 98.0;
        var x = ((lng - minLng) / (maxLng - minLng)) * 100;
        var y = ((maxLat - lat) / (maxLat - minLat)) * 100;
        return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
    }

    function showMapTooltip(parkId, markerEl) {
        hideMapTooltip();
        var park = NATIONAL_PARKS.find(function (p) {
            return p.id === parkId;
        });
        if (!park) return;
        var badge = '';
        if (park.isTigerReserve) badge = '<span class="tt-badge tt-tiger">Tiger Reserve</span>';
        else if (park.isUNESCO) badge = '<span class="tt-badge tt-unesco">UNESCO Site</span>';
        else badge = '<span class="tt-badge tt-park">National Park</span>';
        var faunaStr = park.keyFauna.slice(0, 3).join(', ');
        var tt = document.createElement('div');
        tt.className = 'map-tooltip';
        tt.id = 'map-tooltip';
        tt.innerHTML =
            '<div class="tt-header">' +
            '<div class="tt-name">' +
            esc(park.name) +
            '</div>' +
            badge +
            '</div>' +
            '<div class="tt-location">📍 ' +
            esc(park.state) +
            '</div>' +
            '<div class="tt-meta">' +
            park.area +
            ' ' +
            park.areaUnit +
            ' · Est. ' +
            park.established +
            '</div>' +
            '<div class="tt-fauna">🐾 ' +
            esc(faunaStr) +
            '</div>' +
            '<div class="tt-cta">Click for full details →</div>';
        markerEl.appendChild(tt);
    }

    function hideMapTooltip() {
        var el = document.getElementById('map-tooltip');
        if (el) el.remove();
    }

    /* ================================================================
       6. PARKS GRID (with staggered entrance animation)
       ================================================================ */

    function renderParksGrid() {
        var filtered = getFilteredParks();
        var grid = document.getElementById('parks-grid');
        var emptyState = document.getElementById('empty-state');
        var resultsCount = document.getElementById('results-count');
        var resetBtn = document.getElementById('btn-reset');
        if (!grid) return;

        if (filtered.length === 0) {
            grid.style.display = 'none';
            emptyState.classList.remove('hidden');
            if (activeFilters.search) {
                var message = 'No national parks found matching "' + esc(activeFilters.search) + '".';
                emptyState.querySelector('h3').textContent = message;
                resultsCount.textContent = message;
                var statusEl = document.getElementById('parks-search-status');
                if (statusEl) statusEl.textContent = message;
            } else {
                emptyState.querySelector('h3').textContent = 'No Parks Found';
                resultsCount.textContent = 'No parks match your filters';
                var statusEl = document.getElementById('parks-search-status');
                if (statusEl) statusEl.textContent = 'No national parks found.';
            }
            resetBtn.classList.remove('hidden');
            return;
        }

        grid.style.display = '';
        emptyState.classList.add('hidden');
        resetBtn.classList.toggle('hidden', !hasActiveFilters());
        var countMsg = 'Showing ' + filtered.length + ' park' + (filtered.length !== 1 ? 's' : '');
        resultsCount.textContent = countMsg;
        var statusEl = document.getElementById('parks-search-status');
        if (statusEl) {
            statusEl.textContent = activeFilters.search ? countMsg : '';
        }

        var html = '';
        filtered.forEach(function (park, i) {
            var tags = '';
            if (park.isTigerReserve) tags += '<span class="park-tag tiger">Tiger Reserve</span>';
            if (park.isUNESCO) tags += '<span class="park-tag unesco">UNESCO</span>';
            if (!park.isTigerReserve && !park.isUNESCO)
                tags += '<span class="park-tag np">' + esc(park.type) + '</span>';

            var faunaHtml = '';
            park.keyFauna.slice(0, 3).forEach(function (f) {
                faunaHtml += '<span class="park-fauna-chip">' + esc(f) + '</span>';
            });
            if (park.keyFauna.length > 3)
                faunaHtml += '<span class="park-fauna-chip">+' + (park.keyFauna.length - 3) + '</span>';

            html +=
                '<div class="park-card animate-on-scroll" data-park-id="' +
                park.id +
                '" role="listitem" tabindex="0" ' +
                'aria-label="' +
                escA(park.name) +
                ' in ' +
                escA(park.state) +
                ', ' +
                park.area +
                ' ' +
                park.areaUnit +
                '" ' +
                'style="animation-delay:' +
                i * 0.06 +
                's">' +
                '<div class="park-card-img-wrap">' +
                '<img class="park-card-img" src="' +
                escA(park.image) +
                '" alt="' +
                escA(park.name) +
                '" loading="lazy" onerror="this.parentElement.classList.add(\'img-failed\')">' +
                '<div class="park-card-img-overlay"></div>' +
                '</div>' +
                '<div class="park-card-body">' +
                '<div class="park-card-tags">' +
                tags +
                '</div>' +
                '<h3>' +
                esc(park.name) +
                '</h3>' +
                '<div class="park-card-meta">' +
                '<span>📍 ' +
                esc(park.state) +
                '</span>' +
                '<span>📐 ' +
                park.area +
                ' ' +
                park.areaUnit +
                '</span>' +
                '<span>📅 ' +
                park.established +
                '</span>' +
                '</div>' +
                '<p class="park-card-desc">' +
                esc(park.description) +
                '</p>' +
                '<div class="park-card-fauna">' +
                faunaHtml +
                '</div>' +
                '</div></div>';
        });

        grid.innerHTML = html;

        grid.querySelectorAll('.park-card').forEach(function (card) {
            card.addEventListener('click', function () {
                openParkModal(card.dataset.parkId);
            });
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openParkModal(card.dataset.parkId);
                }
            });
        });

        initScrollAnimations();
    }

    function getFilteredParks() {
        return NATIONAL_PARKS.filter(function (park) {
            var matchSearch = true;
            if (activeFilters.search) {
                var q = activeFilters.search.toLowerCase();
                matchSearch =
                    park.name.toLowerCase().indexOf(q) !== -1 ||
                    park.state.toLowerCase().indexOf(q) !== -1 ||
                    park.description.toLowerCase().indexOf(q) !== -1 ||
                    park.keyFauna.some(function (f) {
                        return f.toLowerCase().indexOf(q) !== -1;
                    });
            }
            var matchState = activeFilters.state === 'all' || park.state === activeFilters.state;
            var matchType = true;
            if (activeFilters.type === 'tiger') matchType = park.isTigerReserve;
            else if (activeFilters.type === 'unesco') matchType = park.isUNESCO;
            else if (activeFilters.type === 'national')
                matchType = !park.isTigerReserve && !park.isUNESCO && park.type.indexOf('Marine') === -1;
            else if (activeFilters.type === 'marine') matchType = park.type.indexOf('Marine') !== -1;
            var matchRegion = true;
            if (activeFilters.region !== 'all') {
                var st = STATES.find(function (s) {
                    return s.name === park.state;
                });
                matchRegion = st && st.region === activeFilters.region;
            }
            return matchSearch && matchState && matchType && matchRegion;
        });
    }

    function hasActiveFilters() {
        return (
            activeFilters.search !== '' ||
            activeFilters.state !== 'all' ||
            activeFilters.type !== 'all' ||
            activeFilters.region !== 'all'
        );
    }

    /* ================================================================
       7. FILTER EVENTS
       ================================================================ */

    function bindFilterEvents() {
        var searchInput = document.getElementById('search-parks');
        var newSearchInput = document.getElementById('parks-search');
        var stateSelect = document.getElementById('filter-state');
        var typeSelect = document.getElementById('filter-type');
        var regionSelect = document.getElementById('filter-region');
        var resetBtn = document.getElementById('btn-reset');
        var emptyResetBtn = document.getElementById('btn-empty-reset');
        var timer = null;

        function handleSearchInput(e) {
            clearTimeout(timer);
            var val = e.target.value;
            timer = setTimeout(function () {
                activeFilters.search = val.trim();
                // Sync the other search input if it exists
                if (searchInput && e.target !== searchInput) searchInput.value = val;
                if (newSearchInput && e.target !== newSearchInput) newSearchInput.value = val;
                renderParksGrid();
            }, 250);
        }

        if (searchInput) searchInput.addEventListener('input', handleSearchInput);
        if (newSearchInput) newSearchInput.addEventListener('input', handleSearchInput);
        if (stateSelect)
            stateSelect.addEventListener('change', function () {
                activeFilters.state = stateSelect.value;
                renderParksGrid();
            });
        if (typeSelect)
            typeSelect.addEventListener('change', function () {
                activeFilters.type = typeSelect.value;
                renderParksGrid();
            });
        if (regionSelect)
            regionSelect.addEventListener('change', function () {
                activeFilters.region = regionSelect.value;
                renderParksGrid();
            });

        function resetAll() {
            activeFilters = { search: '', state: 'all', type: 'all', region: 'all' };
            if (searchInput) searchInput.value = '';
            if (newSearchInput) newSearchInput.value = '';
            if (stateSelect) stateSelect.value = 'all';
            if (typeSelect) typeSelect.value = 'all';
            if (regionSelect) regionSelect.value = 'all';
            renderParksGrid();
        }
        if (resetBtn) resetBtn.addEventListener('click', resetAll);
        if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAll);
    }

    /* ================================================================
       8. WILDLIFE GRID (with real images)
       ================================================================ */

    function renderWildlifeGrid() {
        var grid = document.getElementById('wildlife-grid');
        if (!grid) return;

        var html = '';
        WILDLIFE_SPECIES.forEach(function (sp, i) {
            var statusClass = sp.status.toLowerCase().replace(/\s+/g, '-');

            html +=
                '<div class="wildlife-card animate-on-scroll" role="listitem" aria-label="' +
                escA(sp.name) +
                ', ' +
                esc(sp.status) +
                '" style="animation-delay:' +
                i * 0.07 +
                's">' +
                '<div class="wildlife-card-img-wrap">' +
                '<img class="wildlife-card-img" src="' +
                escA(sp.image) +
                '" alt="' +
                escA(sp.name) +
                '" loading="lazy" onerror="this.parentElement.classList.add(\'img-failed\')">' +
                '<div class="wildlife-card-status-badge"><span class="wildlife-status ' +
                statusClass +
                '">' +
                esc(sp.status) +
                '</span></div>' +
                '</div>' +
                '<div class="wildlife-card-body">' +
                '<div class="wildlife-card-header">' +
                '<div class="wildlife-icon">' +
                sp.icon +
                '</div>' +
                '<h3>' +
                esc(sp.name) +
                '</h3>' +
                '</div>' +
                '<p>' +
                esc(sp.description) +
                '</p>' +
                '<div class="wildlife-card-parks">Found in ' +
                sp.parks.length +
                ' park' +
                (sp.parks.length !== 1 ? 's' : '') +
                '</div>' +
                '</div></div>';
        });

        grid.innerHTML = html;
        initScrollAnimations();
    }

    /* ================================================================
       9. TIGER RESERVES (with real images)
       ================================================================ */

    function renderTigerSection() {
        var list = document.getElementById('tiger-parks-list');
        if (!list) return;

        var html = '';
        TIGER_RESERVES.forEach(function (park, i) {
            html +=
                '<div class="tiger-park-card animate-on-scroll" data-park-id="' +
                park.id +
                '" role="listitem" tabindex="0" ' +
                'aria-label="' +
                escA(park.name) +
                ', Tiger Reserve in ' +
                escA(park.state) +
                '" ' +
                'style="animation-delay:' +
                i * 0.08 +
                's">' +
                '<div class="tiger-card-img-wrap">' +
                '<img class="tiger-card-img" src="' +
                escA(park.image) +
                '" alt="' +
                escA(park.name) +
                '" loading="lazy" onerror="this.parentElement.classList.add(\'img-failed\')">' +
                '<div class="tiger-card-number">' +
                (i + 1) +
                '</div>' +
                '</div>' +
                '<div class="tiger-card-body">' +
                '<h4>' +
                esc(park.name) +
                '</h4>' +
                '<div class="tiger-card-meta">' +
                '<span>📍 ' +
                esc(park.state) +
                '</span>' +
                '<span>📐 ' +
                park.area +
                ' ' +
                park.areaUnit +
                '</span>' +
                '<span>📅 Est. ' +
                park.established +
                '</span>' +
                '</div>' +
                '<p class="tiger-card-desc">' +
                esc(park.description) +
                '</p>' +
                '</div></div>';
        });

        list.innerHTML = html;

        list.querySelectorAll('.tiger-park-card').forEach(function (card) {
            card.addEventListener('click', function () {
                openParkModal(card.dataset.parkId);
            });
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openParkModal(card.dataset.parkId);
                }
            });
        });

        initScrollAnimations();
    }

    /* ================================================================
       10. IMAGE GALLERY
       ================================================================ */

    function renderGallery() {
        var grid = document.getElementById('gallery-grid');
        if (!grid) return;

        var html = '';
        NATIONAL_PARKS.forEach(function (park, i) {
            html +=
                '<div class="gallery-item animate-on-scroll" data-park-id="' +
                park.id +
                '" role="listitem" tabindex="0" ' +
                'aria-label="View ' +
                escA(park.name) +
                ' image" ' +
                'style="animation-delay:' +
                i * 0.05 +
                's">' +
                '<img src="' +
                escA(park.image) +
                '" alt="' +
                escA(park.name) +
                '" loading="lazy" onerror="this.parentElement.classList.add(\'img-failed\');this.style.display=\'none\'">' +
                '<div class="gallery-fallback-icon">🌿</div>' +
                '<div class="gallery-item-overlay">' +
                '<div class="gallery-item-info">' +
                '<span class="gallery-item-name">' +
                esc(park.name) +
                '</span>' +
                '<span class="gallery-item-state">📍 ' +
                esc(park.state) +
                ' &middot; ' +
                esc(park.type) +
                '</span>' +
                '</div></div></div>';
        });

        grid.innerHTML = html;

        grid.querySelectorAll('.gallery-item').forEach(function (item, idx) {
            item.addEventListener('click', function () {
                openLightbox(idx);
            });
            item.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(idx);
                }
            });
        });

        initScrollAnimations();
    }

    /* ================================================================
       11. LIGHTBOX
       ================================================================ */

    function bindLightboxEvents() {
        var closeBtn = document.getElementById('lightbox-close');
        var prevBtn = document.getElementById('lightbox-prev');
        var nextBtn = document.getElementById('lightbox-next');
        var backdrop = document.getElementById('lightbox-backdrop');

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
            var lb = document.getElementById('lightbox');
            if (!lb || lb.classList.contains('hidden')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        });

        trapFocus(document.getElementById('lightbox'));
    }

    function openLightbox(index) {
        previouslyFocusedElement = document.activeElement;
        lightboxState.images = NATIONAL_PARKS.map(function (p) {
            return { src: p.image, caption: p.name + ' — ' + p.state };
        });
        lightboxState.currentIndex = index;
        var lb = document.getElementById('lightbox');
        lb.classList.remove('hidden');
        lb.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        updateLightboxImage();
        var closeBtn = document.getElementById('lightbox-close');
        if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
        var lb = document.getElementById('lightbox');
        lb.classList.add('hidden');
        lb.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (previouslyFocusedElement) previouslyFocusedElement.focus();
    }

    function navigateLightbox(dir) {
        lightboxState.currentIndex += dir;
        var len = lightboxState.images.length;
        if (lightboxState.currentIndex < 0) lightboxState.currentIndex = len - 1;
        if (lightboxState.currentIndex >= len) lightboxState.currentIndex = 0;
        updateLightboxImage();
    }

    function updateLightboxImage() {
        var img = document.getElementById('lightbox-img');
        var cap = document.getElementById('lightbox-caption');
        var item = lightboxState.images[lightboxState.currentIndex];
        if (!item) return;
        img.src = item.src;
        img.alt = item.caption;
        cap.textContent = lightboxState.currentIndex + 1 + ' / ' + lightboxState.images.length + ' — ' + item.caption;
    }

    /* ================================================================
       12. PARK DETAIL MODAL
       ================================================================ */

    var previouslyFocusedElement = null;

    function trapFocus(container) {
        var focusable = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        container.addEventListener('keydown', function handler(e) {
            if (e.key !== 'Tab') return;
            if (container.classList.contains('hidden')) {
                container.removeEventListener('keydown', handler);
                return;
            }
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });
    }

    function bindModalEvents() {
        var closeBtn = document.getElementById('park-modal-close');
        var backdrop = document.getElementById('park-modal-backdrop');
        if (closeBtn) closeBtn.addEventListener('click', closeParkModal);
        if (backdrop) backdrop.addEventListener('click', closeParkModal);
        document.addEventListener('keydown', function (e) {
            var m = document.getElementById('park-modal');
            if (!m || m.classList.contains('hidden')) return;
            if (e.key === 'Escape') closeParkModal();
        });
        trapFocus(document.getElementById('park-modal'));
    }

    function openParkModal(parkId) {
        var park = NATIONAL_PARKS.find(function (p) {
            return p.id === parkId;
        });
        if (!park) return;

        previouslyFocusedElement = document.activeElement;

        var body = document.getElementById('park-modal-body');
        var tags = '';
        if (park.isTigerReserve) tags += '<span class="park-tag tiger">Tiger Reserve</span>';
        if (park.isUNESCO) tags += '<span class="park-tag unesco">UNESCO World Heritage</span>';
        if (!park.isTigerReserve && !park.isUNESCO) tags += '<span class="park-tag np">' + esc(park.type) + '</span>';

        var faunaHtml = park.keyFauna
            .map(function (f) {
                return '<span class="modal-chip">' + esc(f) + '</span>';
            })
            .join('');

        var floraHtml = park.keyFlora
            .map(function (fl) {
                return '<span class="modal-chip modal-flora-chip">' + esc(fl) + '</span>';
            })
            .join('');

        body.innerHTML =
            '<img class="modal-hero-img" src="' +
            escA(park.image) +
            '" alt="' +
            escA(park.name) +
            '" onerror="this.style.display=\'none\'">' +
            '<div class="modal-body">' +
            '<h2>' +
            esc(park.name) +
            '</h2>' +
            '<div class="modal-park-state">📍 ' +
            esc(park.state) +
            '</div>' +
            '<div class="modal-tags">' +
            tags +
            '</div>' +
            '<p class="modal-description">' +
            esc(park.description) +
            '</p>' +
            '<div class="modal-info-grid">' +
            '<div class="modal-info-item"><label>Established</label><strong>' +
            park.established +
            '</strong></div>' +
            '<div class="modal-info-item"><label>Area</label><strong>' +
            park.area +
            ' ' +
            park.areaUnit +
            '</strong></div>' +
            '<div class="modal-info-item"><label>Climate</label><strong>' +
            esc(park.climate) +
            '</strong></div>' +
            '<div class="modal-info-item"><label>Best Time to Visit</label><strong>' +
            esc(park.bestTime) +
            '</strong></div>' +
            '<div class="modal-info-item"><label>Entry Fee</label><strong>' +
            esc(park.entryFee) +
            '</strong></div>' +
            '<div class="modal-info-item"><label>Coordinates</label><strong>' +
            park.coordinates.lat.toFixed(2) +
            ', ' +
            park.coordinates.lng.toFixed(2) +
            '</strong></div>' +
            '</div>' +
            '<div class="modal-section-title">Key Fauna</div>' +
            '<div class="modal-fauna-list">' +
            faunaHtml +
            '</div>' +
            '<div class="modal-section-title">Key Flora</div>' +
            '<div class="modal-flora-list">' +
            floraHtml +
            '</div>';

        if (park.explorerUrl) {
            body.innerHTML +=
                '<div style="margin-top:1.5rem; text-align:center;">' +
                '<a href="' + escA(park.explorerUrl) + '" class="btn-explorer-link" style="display:inline-block; padding:0.75rem 1.5rem; background:linear-gradient(135deg, #0284c7, #14b8a6); color:#fff; font-weight:700; border-radius:999px; text-decoration:none; box-shadow:0 4px 14px rgba(2,132,199,0.4);">Launch Dedicated Explorer ➔</a>' +
                '</div>';
        }

        var modal = document.getElementById('park-modal');
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        var closeBtn = document.getElementById('park-modal-close');
        if (closeBtn) closeBtn.focus();
    }

    function closeParkModal() {
        var modal = document.getElementById('park-modal');
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (previouslyFocusedElement) previouslyFocusedElement.focus();
    }

    /* ================================================================
       13. UTILITIES
       ================================================================ */

    function esc(str) {
        var d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function escA(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
})();
