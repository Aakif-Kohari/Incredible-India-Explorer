/* ==========================================================================
   Waterfalls Components
   Safe DOM rendering functions for cards, map pins, and statistics.
   ========================================================================== */

/**
 * Renders the interactive map pins based on waterfall coordinates.
 * @param {Array} data - Array of waterfall objects.
 */
function renderMapPins(data) {
    const map = document.getElementById('india-map');
    if (!map) return;

    // Clear existing
    while (map.firstChild) map.removeChild(map.firstChild);

    const fragment = document.createDocumentFragment();
    data.forEach(fall => {
        const pin = document.createElement('div');
        pin.className = 'map-pin';
        pin.style.left = `${fall.mapX}%`;
        pin.style.top = `${fall.mapY}%`;
        pin.setAttribute('data-name', fall.name);
        pin.setAttribute('role', 'button');
        pin.setAttribute('tabindex', '0');
        pin.setAttribute('aria-label', `View ${fall.name}`);

        pin.addEventListener('click', () => {
            const card = document.querySelector(`[data-fall-id="${fall.id}"]`);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.boxShadow = '0 0 20px var(--accent)';
                setTimeout(() => { card.style.boxShadow = ''; }, 2000);
            }
        });

        fragment.appendChild(pin);
    });
    map.appendChild(fragment);
}

/**
 * Renders the waterfall cards into the grid.
 * @param {Array} data - Filtered array of waterfall objects.
 */
function renderWaterfallCards(data) {
    const grid = document.getElementById('waterfalls-grid');
    if (!grid) return;

    while (grid.firstChild) grid.removeChild(grid.firstChild);

    if (data.length === 0) {
        const empty = document.createElement('p');
        empty.style.gridColumn = '1 / -1';
        empty.style.textAlign = 'center';
        empty.style.color = 'var(--text-secondary)';
        empty.textContent = 'No waterfalls match your current filters.';
        grid.appendChild(empty);
        return;
    }

    const fragment = document.createDocumentFragment();
    data.forEach(fall => {
        const card = document.createElement('article');
        card.className = 'waterfall-card animate-on-scroll';
        card.setAttribute('role', 'listitem');
        card.setAttribute('data-fall-id', fall.id);

        const img = document.createElement('div');
        img.className = 'card-img';
        img.style.backgroundImage = `url('${fall.img}')`;

        const badge = document.createElement('span');
        badge.className = 'card-badge';
        badge.textContent = `${fall.height}m`;
        img.appendChild(badge);

        const content = document.createElement('div');
        content.className = 'card-content';

        const h3 = document.createElement('h3');
        h3.textContent = fall.name;

        const meta = document.createElement('div');
        meta.className = 'card-meta';
        meta.textContent = `📍 ${fall.state} • 🌊 ${fall.river} River`;

        const p = document.createElement('p');
        p.textContent = fall.desc;

        const btn = document.createElement('a');
        btn.className = 'btn-card';
        btn.href = `../${fall.id}-falls/index.html`; // Dynamic link to specific page
        btn.textContent = 'Explore Cascade →';
        // Fallback for pages that don't exist yet
        btn.addEventListener('click', (e) => {
            if (!document.getElementById(`${fall.id}-exists`)) {
                e.preventDefault();
                alert(`Detailed explorer for ${fall.name} coming soon!`);
            }
        });

        content.appendChild(h3);
        content.appendChild(meta);
        content.appendChild(p);
        content.appendChild(btn);

        card.appendChild(img);
        card.appendChild(content);
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

/**
 * Renders the statistics bar charts.
 */
function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid) return;

    const stateCounts = {};
    const typeCounts = {};

    waterfallsData.forEach(f => {
        stateCounts[f.state] = (stateCounts[f.state] || 0) + 1;
        typeCounts[f.type] = (typeCounts[f.type] || 0) + 1;
    });

    const fragment = document.createDocumentFragment();

    // State Stats Card
    const stateCard = document.createElement('div');
    stateCard.className = 'stat-card';
    const stateH4 = document.createElement('h4');
    stateH4.textContent = 'Waterfalls by State';
    stateCard.appendChild(stateH4);

    const stateBarContainer = document.createElement('div');
    stateBarContainer.className = 'stat-bar-container';
    Object.entries(stateCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([state, count]) => {
        const row = document.createElement('div');
        row.className = 'stat-bar-row';
        const label = document.createElement('span');
        label.textContent = state.split('/')[0];
        const track = document.createElement('div');
        track.className = 'stat-bar-track';
        const fill = document.createElement('div');
        fill.className = 'stat-bar-fill';
        fill.style.width = '0%';
        setTimeout(() => { fill.style.width = `${(count / waterfallsData.length) * 100 * 2}%`; }, 100);
        const val = document.createElement('span');
        val.textContent = count;
        track.appendChild(fill);
        row.appendChild(label);
        row.appendChild(track);
        row.appendChild(val);
        stateBarContainer.appendChild(row);
    });
    stateCard.appendChild(stateBarContainer);
    fragment.appendChild(stateCard);

    // Type Stats Card
    const typeCard = document.createElement('div');
    typeCard.className = 'stat-card';
    const typeH4 = document.createElement('h4');
    typeH4.textContent = 'Waterfalls by Type';
    typeCard.appendChild(typeH4);

    const typeBarContainer = document.createElement('div');
    typeBarContainer.className = 'stat-bar-container';
    Object.entries(typeCounts).forEach(([type, count]) => {
        const row = document.createElement('div');
        row.className = 'stat-bar-row';
        const label = document.createElement('span');
        label.textContent = type;
        const track = document.createElement('div');
        track.className = 'stat-bar-track';
        const fill = document.createElement('div');
        fill.className = 'stat-bar-fill';
        fill.style.width = '0%';
        setTimeout(() => { fill.style.width = `${(count / waterfallsData.length) * 100}%`; }, 100);
        const val = document.createElement('span');
        val.textContent = count;
        track.appendChild(fill);
        row.appendChild(label);
        row.appendChild(track);
        row.appendChild(val);
        typeBarContainer.appendChild(row);
    });
    typeCard.appendChild(typeBarContainer);
    fragment.appendChild(typeCard);

    grid.appendChild(fragment);
}
