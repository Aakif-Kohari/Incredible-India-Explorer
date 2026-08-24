/* ==========================================================================
   Chandipur Components
   Safe DOM rendering functions for all beach sections.
   Uses only document.createElement() - NO innerHTML.
   ========================================================================== */

/**
 * Renders the tidal comparison cards (high vs low tide).
 */
function renderTidalComparison() {
    const container = document.getElementById('tidal-comparison');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    tidalData.forEach(tide => {
        const card = document.createElement('article');
        card.className = 'tidal-card animate-on-scroll';

        const visual = document.createElement('div');
        visual.className = 'tidal-visual';
        visual.style.backgroundImage = `url('${tide.img}')`;
        visual.setAttribute('role', 'img');
        visual.setAttribute('aria-label', tide.title);

        const label = document.createElement('span');
        label.className = 'tidal-label';
        label.textContent = tide.id === 'low-tide' ? 'LOW TIDE' : 'HIGH TIDE';
        visual.appendChild(label);

        const content = document.createElement('div');
        content.className = 'tidal-content';

        const h4 = document.createElement('h4');
        h4.textContent = tide.title;

        const p = document.createElement('p');
        p.textContent = tide.desc;

        content.appendChild(h4);
        content.appendChild(p);

        card.appendChild(visual);
        card.appendChild(content);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Renders the tidal cycle chart using CSS-based visualization.
 */
function renderTidalChart() {
    const container = document.getElementById('tidal-chart');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    // Title
    const title = document.createElement('h4');
    title.textContent = '24-Hour Tidal Cycle';
    title.style.margin = '0 0 1.5rem 0';
    title.style.color = 'var(--text-primary)';
    title.style.fontFamily = "'Playfair Display', serif";
    fragment.appendChild(title);

    // Chart visualization using flexbox
    const chartContainer = document.createElement('div');
    chartContainer.style.display = 'flex';
    chartContainer.style.alignItems = 'flex-end';
    chartContainer.style.justifyContent = 'space-between';
    chartContainer.style.height = '200px';
    chartContainer.style.padding = '0 1rem';
    chartContainer.style.gap = '0.5rem';

    tidalCycle.forEach((data, index) => {
        const bar = document.createElement('div');
        bar.style.flex = '1';
        bar.style.background = `linear-gradient(to top, var(--accent), var(--accent-hover))`;
        bar.style.height = '0%';
        bar.style.borderRadius = '4px 4px 0 0';
        bar.style.transition = `height 1s ease-out ${index * 0.1}s`;
        bar.style.position = 'relative';
        bar.title = `${data.hour} - ${data.phase} (${data.tide}%)`;

        const value = document.createElement('div');
        value.style.position = 'absolute';
        value.style.top = '-20px';
        value.style.left = '50%';
        value.style.transform = 'translateX(-50%)';
        value.style.fontSize = '0.7rem';
        value.style.color = 'var(--accent)';
        value.style.fontWeight = '600';
        value.textContent = `${data.tide}%`;
        bar.appendChild(value);

        chartContainer.appendChild(bar);

        // Animate after append
        setTimeout(() => {
            bar.style.height = `${data.tide}%`;
        }, 100);
    });

    fragment.appendChild(chartContainer);

    // Labels
    const labels = document.createElement('div');
    labels.className = 'chart-labels';
    tidalCycle.forEach(data => {
        const span = document.createElement('span');
        span.textContent = data.hour;
        labels.appendChild(span);
    });
    fragment.appendChild(labels);

    container.appendChild(fragment);
}

/**
 * Renders a generic feature grid (ecology, activities, nearby).
 */
function renderFeatureGrid(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const card = document.createElement('article');
        card.className = 'feature-card animate-on-scroll';

        const icon = document.createElement('div');
        icon.className = 'feature-icon';
        icon.textContent = item.icon;

        const h4 = document.createElement('h4');
        h4.textContent = item.title;

        const p = document.createElement('p');
        p.textContent = item.desc;

        card.appendChild(icon);
        card.appendChild(h4);
        card.appendChild(p);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Renders the image gallery.
 */
function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    galleryData.forEach(img => {
        const item = document.createElement('div');
        item.className = 'gallery-item animate-on-scroll';
        item.tabIndex = 0;
        item.dataset.img = img.src;
        item.dataset.caption = img.caption;
        item.setAttribute('role', 'listitem');

        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = img.alt;
        imgEl.loading = 'lazy';

        item.appendChild(imgEl);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}
