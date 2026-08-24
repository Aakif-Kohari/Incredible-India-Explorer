/* ==========================================================================
   Navratri Components
   Safe DOM rendering functions for all Navratri sections.
   Uses only document.createElement() - NO innerHTML.
   ========================================================================== */

/**
 * Renders the nine nights grid with color-coded cards.
 */
function renderNineNights() {
    const container = document.getElementById('nine-nights-grid');
    if (!container) return;

    // Clear existing content safely
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    navratriNights.forEach(night => {
        const card = document.createElement('article');
        card.className = 'night-card animate-on-scroll';

        // Header with color-coded number
        const header = document.createElement('div');
        header.className = 'night-header';

        const number = document.createElement('div');
        number.className = 'night-number';
        number.style.backgroundColor = night.color;
        number.textContent = night.day;

        const headerText = document.createElement('div');
        headerText.className = 'night-header-text';

        const h4 = document.createElement('h4');
        h4.textContent = night.name;

        const subtitle = document.createElement('p');
        subtitle.textContent = night.meaning;

        headerText.appendChild(h4);
        headerText.appendChild(subtitle);

        header.appendChild(number);
        header.appendChild(headerText);

        // Content
        const content = document.createElement('div');
        content.className = 'night-content';

        const desc = document.createElement('p');
        desc.textContent = night.desc;
        content.appendChild(desc);

        // Meta tags
        const meta = document.createElement('div');
        meta.className = 'night-meta';

        const colorTag = document.createElement('span');
        colorTag.className = 'night-tag';
        colorTag.textContent = `🎨 ${night.colorName}`;

        const offeringTag = document.createElement('span');
        offeringTag.className = 'night-tag';
        offeringTag.textContent = `🍯 ${night.offering}`;

        const flowerTag = document.createElement('span');
        flowerTag.className = 'night-tag';
        flowerTag.textContent = `🌸 ${night.flower}`;

        meta.appendChild(colorTag);
        meta.appendChild(offeringTag);
        meta.appendChild(flowerTag);
        content.appendChild(meta);

        card.appendChild(header);
        card.appendChild(content);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Renders the regional traditions grid.
 */
function renderRegionalTraditions() {
    const container = document.getElementById('regional-grid');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    regionalTraditions.forEach(tradition => {
        const card = document.createElement('article');
        card.className = 'regional-card animate-on-scroll';

        const h4 = document.createElement('h4');
        h4.textContent = `${tradition.region}: ${tradition.title}`;

        const p = document.createElement('p');
        p.textContent = tradition.desc;

        card.appendChild(h4);
        card.appendChild(p);

        // Highlights list
        if (tradition.highlights && tradition.highlights.length > 0) {
            const ul = document.createElement('ul');
            tradition.highlights.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ul.appendChild(li);
            });
            card.appendChild(ul);
        }

        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Renders the dance explorer (Garba & Dandiya).
 */
function renderDanceExplorer() {
    const container = document.getElementById('dance-explorer');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    danceForms.forEach(dance => {
        const card = document.createElement('article');
        card.className = 'dance-card animate-on-scroll';

        const h3 = document.createElement('h3');
        h3.textContent = dance.name;

        const p = document.createElement('p');
        p.textContent = dance.desc;

        card.appendChild(h3);
        card.appendChild(p);

        // Features section
        if (dance.features && dance.features.length > 0) {
            const features = document.createElement('div');
            features.className = 'dance-features';

            const h5 = document.createElement('h5');
            h5.textContent = 'Key Characteristics';
            features.appendChild(h5);

            const ul = document.createElement('ul');
            dance.features.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ul.appendChild(li);
            });
            features.appendChild(ul);
            card.appendChild(features);
        }

        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Renders the fasting foods list.
 */
function renderFastingFoods() {
    const container = document.getElementById('food-list');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    fastingFoods.forEach(food => {
        const item = document.createElement('div');
        item.className = 'food-item animate-on-scroll';

        const h5 = document.createElement('h5');
        h5.textContent = food.name;

        const p = document.createElement('p');
        p.textContent = food.desc;

        item.appendChild(h5);
        item.appendChild(p);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}

/**
 * Renders the traditional attire list.
 */
function renderTraditionalAttire() {
    const container = document.getElementById('attire-list');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    traditionalAttire.forEach(attire => {
        const item = document.createElement('div');
        item.className = 'attire-item animate-on-scroll';

        const h5 = document.createElement('h5');
        h5.textContent = attire.name;

        const p = document.createElement('p');
        p.textContent = attire.desc;

        item.appendChild(h5);
        item.appendChild(p);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}
