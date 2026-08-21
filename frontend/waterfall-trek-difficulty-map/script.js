/**
 * Waterfall Trails of India — Trek Difficulty Map
 *
 * Reuses the canonical WATERFALLS_DATA from
 * ../waterfalls-of-india/waterfalls-data.js. Does not define, duplicate, or
 * invent any waterfall entries, distances, or durations. Difficulty is only
 * shown for entries where waterfalls-data.js marks trek.documented = true.
 */
(function () {
    'use strict';

    const DATA = window.WATERFALLS_DATA || [];
    const LEVELS = window.WATERFALL_DIFFICULTY_LEVELS || [
        { id: "easy", label: "Easy", icon: "🟢" },
        { id: "moderate", label: "Moderate", icon: "🟡" },
        { id: "challenging", label: "Challenging", icon: "🟠" },
        { id: "difficult", label: "Difficult", icon: "🔴" }
    ];
    const UNDOCUMENTED = { id: "undocumented", label: "Not Yet Documented", icon: "⚪" };

    // DOM references
    const filterButtons = document.querySelectorAll('.filter-btn');
    const markersLayer = document.getElementById('markers-layer');
    const cardsGrid = document.getElementById('trek-cards-grid');
    const resultsCount = document.getElementById('results-count');

    const emptyState = document.getElementById('empty-state');
    const waterfallDetail = document.getElementById('waterfall-detail');
    const detailImage = document.getElementById('detail-image');
    const detailName = document.getElementById('detail-name');
    const detailDifficulty = document.getElementById('detail-difficulty');
    const detailState = document.getElementById('detail-state');
    const detailRegion = document.getElementById('detail-region');
    const detailSeason = document.getElementById('detail-season');
    const detailApproach = document.getElementById('detail-approach');
    const detailCompareBtn = document.getElementById('detail-compare-btn');
    const detailExploreBtn = document.getElementById('detail-explore-btn');

    const compareSection = document.getElementById('compare-section');
    const compareTableHead = document.getElementById('compare-table-head');
    const compareTableBody = document.getElementById('compare-table-body');
    const compareClearBtn = document.getElementById('compare-clear-btn');

    // State
    let activeFilter = 'all';
    let selectedId = null;
    const compareIds = new Set();

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        applyFilterFromQueryParam();
        renderMarkers(DATA);
        renderCards(getFilteredData());
        bindFilterButtons();
        compareClearBtn.addEventListener('click', clearCompare);
        updateResultsCount(getFilteredData().length);
    }

    function applyFilterFromQueryParam() {
        const params = new URLSearchParams(window.location.search);
        const requested = params.get('difficulty');
        const validIds = ['all', ...LEVELS.map(l => l.id), UNDOCUMENTED.id];
        if (requested && validIds.includes(requested)) {
            activeFilter = requested;
            filterButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === requested);
            });
        }
    }

    /* ================================================================
       Difficulty helpers
       ================================================================ */

    function getDifficultyMeta(item) {
        if (item.trek && item.trek.documented && item.trek.difficulty) {
            return LEVELS.find(l => l.id === item.trek.difficulty) || UNDOCUMENTED;
        }
        return UNDOCUMENTED;
    }

    function getFilteredData() {
        if (activeFilter === 'all') return DATA;
        return DATA.filter(item => getDifficultyMeta(item).id === activeFilter);
    }

    /* ================================================================
       Filters
       ================================================================ */

    function bindFilterButtons() {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.dataset.filter;
                const filtered = getFilteredData();
                renderCards(filtered);
                updateMarkerVisibility(filtered);
                updateResultsCount(filtered.length);
            });
        });
    }

    function updateResultsCount(count) {
        resultsCount.textContent = activeFilter === 'all'
            ? `Showing all ${count} waterfalls`
            : `Showing ${count} waterfall${count === 1 ? '' : 's'}`;
    }

    /* ================================================================
       Map markers
       ================================================================ */

    function renderMarkers(data) {
        markersLayer.innerHTML = '';
        data.forEach(item => {
            const meta = getDifficultyMeta(item);
            const marker = document.createElement('button');
            marker.type = 'button';
            marker.className = `trek-marker difficulty-${meta.id}`;
            marker.id = `marker-${item.id}`;
            marker.setAttribute('aria-label', `${item.name}, ${item.state} — ${meta.label}`);
            marker.style.left = `${item.coordinates.x}%`;
            marker.style.top = `${item.coordinates.y}%`;
            marker.textContent = meta.icon;

            const tooltip = document.createElement('span');
            tooltip.className = 'marker-tooltip';
            tooltip.textContent = item.name;
            marker.appendChild(tooltip);

            marker.addEventListener('click', () => selectWaterfall(item.id));
            markersLayer.appendChild(marker);
        });
        updateMarkerVisibility(data);
    }

    function updateMarkerVisibility(filteredData) {
        const visibleIds = new Set(filteredData.map(item => item.id));
        DATA.forEach(item => {
            const marker = document.getElementById(`marker-${item.id}`);
            if (marker) {
                marker.classList.toggle('marker-hidden', !visibleIds.has(item.id));
            }
        });
    }

    /* ================================================================
       Cards
       ================================================================ */

    function renderCards(data) {
        cardsGrid.innerHTML = '';

        if (data.length === 0) {
            cardsGrid.innerHTML = '<p class="no-results">No waterfalls match this difficulty yet.</p>';
            return;
        }

        data.forEach(item => {
            const meta = getDifficultyMeta(item);
            const card = document.createElement('article');
            card.className = 'trek-card';
            card.id = `card-${item.id}`;
            card.dataset.id = item.id;

            const exploreUrl = item.url ? item.url : `../waterfalls-of-india/index.html?open=${encodeURIComponent(item.id)}`;
            const approachText = (item.trek && item.trek.documented && item.trek.approach)
                ? item.trek.approach
                : 'Trek/approach information is not yet documented for this waterfall.';

            card.innerHTML = `
                <div class="trek-card-image">
                    <img src="${item.thumb}" alt="${escapeHTML(item.name)} waterfall thumbnail" loading="lazy" width="400" height="260" />
                    <span class="difficulty-badge difficulty-${meta.id}">${meta.icon} ${escapeHTML(meta.label)}</span>
                </div>
                <div class="trek-card-content">
                    <h3>${escapeHTML(item.name)}</h3>
                    <p class="trek-card-meta">📍 ${escapeHTML(item.state)} &middot; ${escapeHTML(item.region)}</p>
                    <p class="trek-card-approach">${escapeHTML(approachText)}</p>
                    <p class="trek-card-season">📅 Best season: ${escapeHTML(item.season)}</p>
                    <div class="trek-card-actions">
                        <label class="compare-checkbox-label">
                            <input type="checkbox" class="compare-checkbox" data-id="${item.id}" ${compareIds.has(item.id) ? 'checked' : ''} />
                            Compare
                        </label>
                        <a class="explore-btn" href="${exploreUrl}">Explore →</a>
                    </div>
                </div>
            `;

            card.querySelector('.trek-card-image').addEventListener('click', () => selectWaterfall(item.id));
            card.querySelector('h3').addEventListener('click', () => selectWaterfall(item.id));
            card.querySelector('.compare-checkbox').addEventListener('change', (e) => {
                toggleCompare(item.id, e.target.checked);
            });

            cardsGrid.appendChild(card);
        });
    }

    /* ================================================================
       Detail panel
       ================================================================ */

    function selectWaterfall(id) {
        const item = DATA.find(w => w.id === id);
        if (!item) return;
        selectedId = id;

        document.querySelectorAll('.trek-marker').forEach(m => m.classList.remove('active-marker'));
        const marker = document.getElementById(`marker-${id}`);
        if (marker) marker.classList.add('active-marker');

        const meta = getDifficultyMeta(item);
        const approachText = (item.trek && item.trek.documented && item.trek.approach)
            ? item.trek.approach
            : 'Trek/approach information is not yet documented for this waterfall.';
        const exploreUrl = item.url ? item.url : `../waterfalls-of-india/index.html?open=${encodeURIComponent(item.id)}`;

        detailImage.src = item.thumb;
        detailImage.alt = `${item.name} waterfall`;
        detailName.textContent = item.name;
        detailDifficulty.textContent = `${meta.icon} ${meta.label}`;
        detailDifficulty.className = `difficulty-badge difficulty-${meta.id}`;
        detailState.textContent = item.state;
        detailRegion.textContent = item.region;
        detailSeason.textContent = item.season;
        detailApproach.textContent = approachText;
        detailExploreBtn.href = exploreUrl;
        detailCompareBtn.textContent = compareIds.has(id) ? 'Remove from Compare' : 'Add to Compare';
        detailCompareBtn.onclick = () => {
            toggleCompare(id, !compareIds.has(id));
            detailCompareBtn.textContent = compareIds.has(id) ? 'Remove from Compare' : 'Add to Compare';
        };

        emptyState.classList.add('hidden');
        waterfallDetail.classList.remove('hidden');
    }

    /* ================================================================
       Accessibility comparison
       ================================================================ */

    function toggleCompare(id, shouldAdd) {
        if (shouldAdd) {
            compareIds.add(id);
        } else {
            compareIds.delete(id);
        }

        // Keep checkboxes in sync across card grid
        document.querySelectorAll(`.compare-checkbox[data-id="${id}"]`).forEach(cb => {
            cb.checked = compareIds.has(id);
        });

        if (selectedId === id) {
            detailCompareBtn.textContent = compareIds.has(id) ? 'Remove from Compare' : 'Add to Compare';
        }

        renderCompareTable();
    }

    function clearCompare() {
        compareIds.clear();
        document.querySelectorAll('.compare-checkbox').forEach(cb => { cb.checked = false; });
        if (selectedId) {
            detailCompareBtn.textContent = 'Add to Compare';
        }
        renderCompareTable();
    }

    function renderCompareTable() {
        if (compareIds.size < 2) {
            compareSection.hidden = true;
            return;
        }

        const items = DATA.filter(item => compareIds.has(item.id));

        compareTableHead.innerHTML = '<th scope="col">Waterfall</th>' +
            items.map(item => `<th scope="col">${escapeHTML(item.name)}</th>`).join('');

        const rows = [
            { label: 'Difficulty', getValue: (item) => {
                const meta = getDifficultyMeta(item);
                return `${meta.icon} ${meta.label}`;
            }},
            { label: 'State', getValue: (item) => item.state },
            { label: 'Region', getValue: (item) => item.region },
            { label: 'Best Season', getValue: (item) => item.season },
            { label: 'Height', getValue: (item) => item.height },
            { label: 'Approach', getValue: (item) => (item.trek && item.trek.documented && item.trek.approach) ? item.trek.approach : 'Not yet documented.' }
        ];

        compareTableBody.innerHTML = rows.map(row => {
            const cells = items.map(item => `<td>${escapeHTML(String(row.getValue(item)))}</td>`).join('');
            return `<tr><th scope="row">${escapeHTML(row.label)}</th>${cells}</tr>`;
        }).join('');

        compareSection.hidden = false;
    }

    /* ================================================================
       Utils
       ================================================================ */

    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

})();