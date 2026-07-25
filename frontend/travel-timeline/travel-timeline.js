/* ==========================================================================
   TRAVEL TIMELINE — completed-trip history, replay & memories
   Loaded on travel-timeline.html (and optionally alongside trip-planner.html)
   the same way journey.js is loaded site-wide: a plain <script> include with
   a public window.TravelTimeline API, backed by localStorage.

   This project has no application server (see README "Getting Started" —
   it runs purely in the browser), so "the database" for this feature is a
   single localStorage record per browser, structured so the exact same
   shape could be persisted to a real backend later without changing the
   UI layer. See docs/travel-timeline.md for the full data-flow writeup.

   Public API (window.TravelTimeline):
     getTrips()                -> array of completed trips, chronological
     getTrip(id)                -> single trip or null
     addTrip(input)              -> creates a trip, returns it
     updateTrip(id, patch)       -> merges patch into a trip, returns it
     deleteTrip(id)              -> removes a trip, returns boolean
     filterTrips(opts)           -> { year, state, category, query }
     getYears() / getStates() / getCategories()
     getStats()                  -> summary counters for the header
     exportTimeline(format)      -> { filename, mimeType, content }
     downloadExport(format)      -> triggers a browser file download
   ========================================================================== */

(function () {
    'use strict';

    const STORAGE_KEY = 'india-explorer-travel-timeline';
    const PAGE_SIZE = 10;

    const CATEGORIES = [
        'historical', 'heritage', 'beaches', 'mountains', 'wildlife',
        'spiritual', 'desert', 'backwaters', 'adventure', 'city', 'other'
    ];

    /* ---------------------------------------------------------------- */
    /* Storage layer                                                     */
    /* ---------------------------------------------------------------- */

    function readTrips() {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            return Array.isArray(stored) ? stored : [];
        } catch (error) {
            return [];
        }
    }

    function writeTrips(trips) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
        return trips;
    }

    function generateId() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return 'trip-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    }

    /* ---------------------------------------------------------------- */
    /* Validation & normalization                                        */
    /* ---------------------------------------------------------------- */

    function computeDurationDays(startDate, endDate) {
        if (!startDate) return 1;
        const start = new Date(startDate);
        if (Number.isNaN(start.getTime())) return 1;
        if (!endDate) return 1;
        const end = new Date(endDate);
        if (Number.isNaN(end.getTime()) || end < start) return 1;
        const diffMs = end.getTime() - start.getTime();
        return Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;
    }

    function validateTrip(input) {
        const errors = [];
        if (!input || typeof input !== 'object') {
            return ['Trip data is required'];
        }
        if (!input.title || !String(input.title).trim()) {
            errors.push('Title is required');
        }
        if (!input.startDate || Number.isNaN(new Date(input.startDate).getTime())) {
            errors.push('A valid start date is required');
        }
        if (input.endDate && !Number.isNaN(new Date(input.startDate).getTime())) {
            const start = new Date(input.startDate);
            const end = new Date(input.endDate);
            if (!Number.isNaN(end.getTime()) && end < start) {
                errors.push('End date cannot be before start date');
            }
        }
        if (input.rating !== undefined && input.rating !== null && input.rating !== '') {
            const rating = Number(input.rating);
            if (Number.isNaN(rating) || rating < 1 || rating > 5) {
                errors.push('Rating must be between 1 and 5');
            }
        }
        return errors;
    }

    function normalizeTrip(input, existing) {
        const now = new Date().toISOString();
        const destinationNames = Array.isArray(input.destinationNames)
            ? input.destinationNames.filter(Boolean)
            : (existing ? existing.destinationNames : []) || [];
        const photos = Array.isArray(input.photos)
            ? input.photos.filter((p) => p && (p.url || p.caption)).map((p) => ({
                url: p.url || '',
                caption: p.caption || ''
            }))
            : (existing ? existing.photos : []) || [];
        const milestones = Array.isArray(input.milestones)
            ? input.milestones.filter((m) => m && (m.label || m.date)).map((m) => ({
                date: m.date || '',
                label: m.label || ''
            }))
            : (existing ? existing.milestones : []) || [];

        const startDate = input.startDate || (existing && existing.startDate) || '';
        const endDate = input.endDate !== undefined ? input.endDate : (existing ? existing.endDate : '');

        return {
            id: existing ? existing.id : generateId(),
            title: (input.title !== undefined ? input.title : existing.title || '').toString().trim(),
            state: (input.state !== undefined ? input.state : (existing ? existing.state : '') || '').toString().trim(),
            category: input.category || (existing ? existing.category : '') || 'other',
            destinationNames,
            startDate,
            endDate: endDate || '',
            durationDays: computeDurationDays(startDate, endDate),
            rating: input.rating !== undefined && input.rating !== ''
                ? Number(input.rating)
                : (existing ? existing.rating : null),
            notes: input.notes !== undefined ? input.notes : (existing ? existing.notes : '') || '',
            photos,
            milestones,
            createdAt: existing ? existing.createdAt : now,
            updatedAt: now
        };
    }

    /* ---------------------------------------------------------------- */
    /* CRUD                                                              */
    /* ---------------------------------------------------------------- */

    function getTrips() {
        return readTrips()
            .slice()
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    function getTrip(id) {
        return readTrips().find((trip) => trip.id === id) || null;
    }

    function addTrip(input) {
        const errors = validateTrip(input);
        if (errors.length) {
            throw new Error(errors.join('; '));
        }
        const trips = readTrips();
        const trip = normalizeTrip(input, null);
        trips.push(trip);
        writeTrips(trips);
        return trip;
    }

    function updateTrip(id, patch) {
        const trips = readTrips();
        const index = trips.findIndex((trip) => trip.id === id);
        if (index === -1) return null;

        const merged = Object.assign({}, trips[index], patch);
        const errors = validateTrip(merged);
        if (errors.length) {
            throw new Error(errors.join('; '));
        }
        const updated = normalizeTrip(patch, trips[index]);
        trips[index] = updated;
        writeTrips(trips);
        return updated;
    }

    function deleteTrip(id) {
        const trips = readTrips();
        const next = trips.filter((trip) => trip.id !== id);
        const removed = next.length !== trips.length;
        if (removed) writeTrips(next);
        return removed;
    }

    /* ---------------------------------------------------------------- */
    /* Filtering & search                                                */
    /* ---------------------------------------------------------------- */

    function filterTrips(opts) {
        const { year, state, category, query } = opts || {};
        const q = (query || '').trim().toLowerCase();

        return getTrips().filter((trip) => {
            if (year && String(new Date(trip.startDate).getFullYear()) !== String(year)) return false;
            if (state && trip.state !== state) return false;
            if (category && trip.category !== category) return false;
            if (q) {
                const haystack = [
                    trip.title, trip.state, trip.category, trip.notes,
                    ...(trip.destinationNames || [])
                ].join(' ').toLowerCase();
                if (!haystack.includes(q)) return false;
            }
            return true;
        });
    }

    function getYears() {
        const years = new Set(
            getTrips()
                .map((trip) => new Date(trip.startDate).getFullYear())
                .filter((y) => !Number.isNaN(y))
        );
        return Array.from(years).sort((a, b) => b - a);
    }

    function getStates() {
        const states = new Set(getTrips().map((trip) => trip.state).filter(Boolean));
        return Array.from(states).sort();
    }

    function getCategories() {
        return CATEGORIES.slice();
    }

    function getStats() {
        const trips = getTrips();
        const totalDays = trips.reduce((sum, trip) => sum + (trip.durationDays || 0), 0);
        const statesVisited = new Set(trips.map((t) => t.state).filter(Boolean)).size;
        const rated = trips.filter((t) => typeof t.rating === 'number');
        const avgRating = rated.length
            ? Math.round((rated.reduce((s, t) => s + t.rating, 0) / rated.length) * 10) / 10
            : null;
        return {
            totalTrips: trips.length,
            totalDays,
            statesVisited,
            avgRating
        };
    }

    /* ---------------------------------------------------------------- */
    /* Export                                                            */
    /* ---------------------------------------------------------------- */

    function csvEscape(value) {
        const str = String(value === undefined || value === null ? '' : value);
        if (/[",\n]/.test(str)) {
            return '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
    }

    function exportTimeline(format) {
        const trips = getTrips();
        const fmt = (format || 'json').toLowerCase();

        if (fmt === 'csv') {
            const headers = ['title', 'state', 'category', 'startDate', 'endDate', 'durationDays', 'rating', 'notes'];
            const rows = trips.map((trip) => headers.map((h) => csvEscape(trip[h])).join(','));
            return {
                filename: 'travel-timeline.csv',
                mimeType: 'text/csv',
                content: [headers.join(','), ...rows].join('\n')
            };
        }

        return {
            filename: 'travel-timeline.json',
            mimeType: 'application/json',
            content: JSON.stringify(trips, null, 2)
        };
    }

    function downloadExport(format) {
        if (typeof document === 'undefined') return;
        const { filename, mimeType, content } = exportTimeline(format);
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    /* ---------------------------------------------------------------- */
    /* Page rendering (travel-timeline.html)                             */
    /* ---------------------------------------------------------------- */

    function initTimelinePage() {
        const root = document.getElementById('timeline-root');
        if (!root) return; // Not on travel-timeline.html

        const listEl = document.getElementById('timeline-list');
        const emptyEl = document.getElementById('timeline-empty');
        const statsEl = document.getElementById('timeline-stats');
        const yearSelect = document.getElementById('timeline-year-filter');
        const stateSelect = document.getElementById('timeline-state-filter');
        const categorySelect = document.getElementById('timeline-category-filter');
        const searchInput = document.getElementById('timeline-search-input');
        const addForm = document.getElementById('timeline-add-form');
        const addModal = document.getElementById('timeline-add-modal');
        const detailModal = document.getElementById('timeline-detail-modal');
        const detailBody = document.getElementById('timeline-detail-body');
        const replayModal = document.getElementById('timeline-replay-modal');
        const replayBody = document.getElementById('timeline-replay-body');

        let visibleCount = PAGE_SIZE;
        let replayIndex = 0;
        let replayTimer = null;
        let photoRowCount = 0;
        let milestoneRowCount = 0;

        function currentFilters() {
            return {
                year: yearSelect ? yearSelect.value : '',
                state: stateSelect ? stateSelect.value : '',
                category: categorySelect ? categorySelect.value : '',
                query: searchInput ? searchInput.value : ''
            };
        }

        function populateFilterOptions() {
            if (yearSelect) {
                const current = yearSelect.value;
                yearSelect.innerHTML = '<option value="">All years</option>' +
                    getYears().map((y) => `<option value="${y}">${y}</option>`).join('');
                yearSelect.value = current;
            }
            if (stateSelect) {
                const current = stateSelect.value;
                stateSelect.innerHTML = '<option value="">All states</option>' +
                    getStates().map((s) => `<option value="${s}">${s}</option>`).join('');
                stateSelect.value = current;
            }
            if (categorySelect && !categorySelect.dataset.populated) {
                categorySelect.innerHTML = '<option value="">All categories</option>' +
                    getCategories().map((c) => `<option value="${c}">${c}</option>`).join('');
                categorySelect.dataset.populated = 'true';
            }
        }

        function starString(rating) {
            if (!rating) return '';
            return '★'.repeat(rating) + '☆'.repeat(5 - rating);
        }

        function renderStats() {
            if (!statsEl) return;
            const stats = getStats();
            statsEl.innerHTML = `
                <div class="timeline-stat"><strong>${stats.totalTrips}</strong><span>Trips</span></div>
                <div class="timeline-stat"><strong>${stats.totalDays}</strong><span>Days traveled</span></div>
                <div class="timeline-stat"><strong>${stats.statesVisited}</strong><span>States visited</span></div>
                <div class="timeline-stat"><strong>${stats.avgRating ?? '—'}</strong><span>Avg. rating</span></div>
            `;
        }

        function renderList() {
            const filtered = filterTrips(currentFilters());

            if (filtered.length === 0) {
                listEl.innerHTML = '';
                if (emptyEl) emptyEl.hidden = false;
                return;
            }
            if (emptyEl) emptyEl.hidden = true;

            const slice = filtered.slice(0, visibleCount);
            const groupedByYear = slice.reduce((acc, trip) => {
                const year = new Date(trip.startDate).getFullYear();
                acc[year] = acc[year] || [];
                acc[year].push(trip);
                return acc;
            }, {});

            const years = Object.keys(groupedByYear).sort((a, b) => b - a);

            listEl.innerHTML = years.map((year) => `
                <div class="timeline-year-group">
                    <h2 class="timeline-year-heading">${year}</h2>
                    <div class="timeline-track">
                        ${groupedByYear[year].map((trip) => `
                            <article class="timeline-entry" data-id="${trip.id}" tabindex="0">
                                <div class="timeline-dot"></div>
                                <div class="timeline-card">
                                    ${trip.photos && trip.photos[0] ? `<img class="timeline-card-img" src="${trip.photos[0].url}" alt="${trip.title}" loading="lazy">` : '<div class="timeline-card-img timeline-card-noimg">🧳</div>'}
                                    <div class="timeline-card-body">
                                        <p class="timeline-card-date">${trip.startDate}${trip.endDate ? ' → ' + trip.endDate : ''} &middot; ${trip.durationDays} day${trip.durationDays === 1 ? '' : 's'}</p>
                                        <h3>${trip.title}</h3>
                                        <p class="timeline-card-meta">${[trip.state, trip.category].filter(Boolean).join(' &middot; ')}</p>
                                        ${trip.rating ? `<p class="timeline-card-rating">${starString(trip.rating)}</p>` : ''}
                                        ${trip.notes ? `<p class="timeline-card-notes">${trip.notes.slice(0, 120)}${trip.notes.length > 120 ? '…' : ''}</p>` : ''}
                                    </div>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            `).join('') + (filtered.length > visibleCount
                ? `<button type="button" class="timeline-load-more" id="timeline-load-more">Load more (${filtered.length - visibleCount} remaining)</button>`
                : '');

            listEl.querySelectorAll('.timeline-entry').forEach((card) => {
                const open = () => openDetail(card.dataset.id);
                card.addEventListener('click', open);
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
                });
            });

            const loadMoreBtn = document.getElementById('timeline-load-more');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', () => {
                    visibleCount += PAGE_SIZE;
                    renderList();
                });
            }
        }

        function renderAll() {
            populateFilterOptions();
            renderStats();
            renderList();
        }

        /* ---------------- Detail modal ---------------- */

        function openDetail(id) {
            const trip = getTrip(id);
            if (!trip || !detailModal || !detailBody) return;

            detailBody.innerHTML = `
                <h2>${trip.title}</h2>
                <p class="timeline-detail-meta">${trip.startDate}${trip.endDate ? ' → ' + trip.endDate : ''} &middot; ${trip.durationDays} day${trip.durationDays === 1 ? '' : 's'} &middot; ${[trip.state, trip.category].filter(Boolean).join(' &middot; ')}</p>
                ${trip.rating ? `<p class="timeline-card-rating">${starString(trip.rating)}</p>` : ''}
                ${trip.destinationNames && trip.destinationNames.length ? `<p><strong>Destinations:</strong> ${trip.destinationNames.join(', ')}</p>` : ''}
                ${trip.notes ? `<p class="timeline-detail-notes">${trip.notes}</p>` : ''}
                ${trip.photos && trip.photos.length ? `<div class="timeline-detail-photos">${trip.photos.map((p) => `<figure><img src="${p.url}" alt="${p.caption || trip.title}" loading="lazy"><figcaption>${p.caption || ''}</figcaption></figure>`).join('')}</div>` : ''}
                ${trip.milestones && trip.milestones.length ? `<ul class="timeline-detail-milestones">${trip.milestones.map((m) => `<li>${m.date ? `<strong>${m.date}:</strong> ` : ''}${m.label}</li>`).join('')}</ul>` : ''}
                <div class="timeline-detail-actions">
                    <button type="button" class="timeline-btn-danger" id="timeline-delete-trip" data-id="${trip.id}">Delete trip</button>
                </div>
            `;
            detailModal.hidden = false;

            const deleteBtn = document.getElementById('timeline-delete-trip');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    if (!confirm('Remove this trip from your timeline?')) return;
                    deleteTrip(trip.id);
                    detailModal.hidden = true;
                    renderAll();
                });
            }
        }

        document.querySelectorAll('[data-close-modal]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.timeline-modal');
                if (modal) modal.hidden = true;
                stopReplay();
            });
        });

        /* ---------------- Add trip form ---------------- */

        function addRepeatableRow(container, template) {
            const row = document.createElement('div');
            row.className = 'timeline-repeatable-row';
            row.innerHTML = template;
            container.appendChild(row);
            row.querySelector('[data-remove-row]')?.addEventListener('click', () => row.remove());
        }

        const addPhotoBtn = document.getElementById('timeline-add-photo-row');
        const photoRows = document.getElementById('timeline-photo-rows');
        if (addPhotoBtn && photoRows) {
            addPhotoBtn.addEventListener('click', () => {
                photoRowCount += 1;
                addRepeatableRow(photoRows, `
                    <input type="url" name="photo-url-${photoRowCount}" placeholder="Photo URL">
                    <input type="text" name="photo-caption-${photoRowCount}" placeholder="Caption">
                    <button type="button" class="timeline-remove-row" data-remove-row aria-label="Remove photo">✕</button>
                `);
            });
        }

        const addMilestoneBtn = document.getElementById('timeline-add-milestone-row');
        const milestoneRows = document.getElementById('timeline-milestone-rows');
        if (addMilestoneBtn && milestoneRows) {
            addMilestoneBtn.addEventListener('click', () => {
                milestoneRowCount += 1;
                addRepeatableRow(milestoneRows, `
                    <input type="date" name="milestone-date-${milestoneRowCount}">
                    <input type="text" name="milestone-label-${milestoneRowCount}" placeholder="Memorable moment">
                    <button type="button" class="timeline-remove-row" data-remove-row aria-label="Remove milestone">✕</button>
                `);
            });
        }

        if (addForm) {
            addForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = new FormData(addForm);

                const photos = [];
                photoRows?.querySelectorAll('.timeline-repeatable-row').forEach((row) => {
                    const url = row.querySelector('input[type="url"]')?.value;
                    const caption = row.querySelector('input[type="text"]')?.value;
                    if (url || caption) photos.push({ url, caption });
                });

                const milestones = [];
                milestoneRows?.querySelectorAll('.timeline-repeatable-row').forEach((row) => {
                    const date = row.querySelector('input[type="date"]')?.value;
                    const label = row.querySelector('input[type="text"]')?.value;
                    if (label) milestones.push({ date, label });
                });

                try {
                    addTrip({
                        title: data.get('title'),
                        state: data.get('state'),
                        category: data.get('category'),
                        startDate: data.get('startDate'),
                        endDate: data.get('endDate'),
                        rating: data.get('rating'),
                        notes: data.get('notes'),
                        destinationNames: (data.get('destinationNames') || '')
                            .split(',').map((s) => s.trim()).filter(Boolean),
                        photos,
                        milestones
                    });
                    addForm.reset();
                    if (photoRows) photoRows.innerHTML = '';
                    if (milestoneRows) milestoneRows.innerHTML = '';
                    if (addModal) addModal.hidden = true;
                    visibleCount = PAGE_SIZE;
                    renderAll();
                } catch (err) {
                    alert(err.message);
                }
            });
        }

        const openAddBtn = document.getElementById('timeline-open-add');
        if (openAddBtn && addModal) {
            openAddBtn.addEventListener('click', () => { addModal.hidden = false; });
        }

        /* ---------------- Filters & search ---------------- */

        [yearSelect, stateSelect, categorySelect].forEach((el) => {
            if (!el) return;
            el.addEventListener('change', () => { visibleCount = PAGE_SIZE; renderList(); });
        });
        if (searchInput) {
            searchInput.addEventListener('input', () => { visibleCount = PAGE_SIZE; renderList(); });
        }

        /* ---------------- Export ---------------- */

        document.getElementById('timeline-export-json')?.addEventListener('click', () => downloadExport('json'));
        document.getElementById('timeline-export-csv')?.addEventListener('click', () => downloadExport('csv'));

        /* ---------------- Replay ---------------- */

        function renderReplayFrame() {
            const trips = getTrips();
            if (!trips.length || !replayBody) return;
            replayIndex = Math.max(0, Math.min(replayIndex, trips.length - 1));
            const trip = trips[replayIndex];
            replayBody.innerHTML = `
                <p class="timeline-replay-progress">${replayIndex + 1} / ${trips.length}</p>
                ${trip.photos && trip.photos[0] ? `<img class="timeline-replay-img" src="${trip.photos[0].url}" alt="${trip.title}">` : '<div class="timeline-replay-img timeline-card-noimg">🧳</div>'}
                <h2>${trip.title}</h2>
                <p class="timeline-detail-meta">${trip.startDate}${trip.endDate ? ' → ' + trip.endDate : ''} &middot; ${[trip.state, trip.category].filter(Boolean).join(' &middot; ')}</p>
                ${trip.rating ? `<p class="timeline-card-rating">${starString(trip.rating)}</p>` : ''}
                ${trip.notes ? `<p>${trip.notes}</p>` : ''}
            `;
        }

        function stopReplay() {
            if (replayTimer) {
                clearInterval(replayTimer);
                replayTimer = null;
            }
        }

        document.getElementById('timeline-replay-open')?.addEventListener('click', () => {
            if (!getTrips().length || !replayModal) return;
            replayIndex = 0;
            replayModal.hidden = false;
            renderReplayFrame();
        });
        document.getElementById('timeline-replay-next')?.addEventListener('click', () => {
            replayIndex += 1;
            renderReplayFrame();
        });
        document.getElementById('timeline-replay-prev')?.addEventListener('click', () => {
            replayIndex -= 1;
            renderReplayFrame();
        });
        document.getElementById('timeline-replay-play')?.addEventListener('click', (e) => {
            if (replayTimer) {
                stopReplay();
                e.target.textContent = '▶ Play';
            } else {
                e.target.textContent = '⏸ Pause';
                replayTimer = setInterval(() => {
                    const trips = getTrips();
                    replayIndex = (replayIndex + 1) % trips.length;
                    renderReplayFrame();
                }, 3000);
            }
        });

        renderAll();
    }

    document.addEventListener('app:route-changed', initTimelinePage);
    // Run once immediately too, matching journey.js, in case this script
    // loads after the first app:route-changed event has already fired.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTimelinePage);
    } else {
        initTimelinePage();
    }

    window.TravelTimeline = {
        getTrips,
        getTrip,
        addTrip,
        updateTrip,
        deleteTrip,
        filterTrips,
        getYears,
        getStates,
        getCategories,
        getStats,
        exportTimeline,
        downloadExport,
        validateTrip,
        computeDurationDays
    };
})();
