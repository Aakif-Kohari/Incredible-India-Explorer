/* ==========================================================================
   Pongal Components
   Safe DOM rendering functions for Pongal sections.
   ========================================================================== */

/**
 * Render the 4-day Pongal timeline grid.
 */
function renderPongalTimeline() {
    const container = document.getElementById('pongal-timeline');
    if (!container) return;
    const fragment = document.createDocumentFragment();

    pongalTimeline.forEach(event => {
        const item = document.createElement('div');
        item.className = 'timeline-item animate-on-scroll';

        const day = document.createElement('div');
        day.className = 'timeline-day';
        day.textContent = event.day;

        const title = document.createElement('div');
        title.className = 'timeline-title';
        title.textContent = event.title;

        const desc = document.createElement('div');
        desc.className = 'timeline-desc';
        desc.textContent = event.desc;

        item.appendChild(day);
        item.appendChild(title);
        item.appendChild(desc);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}

/**
 * Render the Kolam traditions grid.
 */
function renderKolamTraditions() {
    const grid = document.getElementById('kolam-grid');
    if (!grid) return;
    const fragment = document.createDocumentFragment();

    kolamTraditions.forEach(t => {
        const card = document.createElement('article');
        card.className = 'tradition-card animate-on-scroll';

        const h4 = document.createElement('h4');
        h4.textContent = t.title;

        const p = document.createElement('p');
        p.textContent = t.desc;

        card.appendChild(h4);
        card.appendChild(p);
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

/**
 * Render the interactive Food explorer.
 */
function renderFoodExplorer() {
    const container = document.getElementById('food-explorer');
    if (!container || pongalFoods.length === 0) return;

    const menu = document.createElement('div');
    menu.className = 'food-menu';
    menu.setAttribute('role', 'tablist');

    const details = document.createElement('div');
    details.className = 'food-details';
    details.setAttribute('role', 'tabpanel');

    pongalFoods.forEach((dish, index) => {
        const btn = document.createElement('button');
        btn.className = `food-btn ${index === 0 ? 'active' : ''}`;
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        btn.textContent = dish.name;

        btn.addEventListener('click', () => {
            menu.querySelectorAll('.food-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            updateFoodDetails(dish, details);
        });

        menu.appendChild(btn);
    });

    container.appendChild(menu);
    container.appendChild(details);
    updateFoodDetails(pongalFoods[0], details);
}

function updateFoodDetails(dish, container) {
    container.innerHTML = ''; // Safe clear
    const h3 = document.createElement('h3');
    h3.textContent = dish.name;
    const type = document.createElement('p');
    type.style.color = 'var(--accent)';
    type.style.fontWeight = '600';
    type.textContent = `Category: ${dish.type}`;
    const desc = document.createElement('p');
    desc.textContent = dish.desc;

    container.appendChild(h3);
    container.appendChild(type);
    container.appendChild(desc);
}

/**
 * Render the visual gallery.
 */
function renderPongalGallery() {
    const grid = document.getElementById('pongal-gallery');
    if (!grid) return;

    const images = [
        { src: 'https://placehold.co/400x400/FFCA28/2A1B12?text=Pongal+Pot', alt: 'Pongal Pot Boiling Over', caption: 'The sacred moment the milk boils over' },
        { src: 'https://placehold.co/400x400/558B2F/fff?text=Kolam', alt: 'Intricate Kolam', caption: 'Rice flour patterns welcoming prosperity' },
        { src: 'https://placehold.co/400x400/F57F17/fff?text=Mattu+Pongal', alt: 'Decorated Cattle', caption: 'Cattle adorned for Mattu Pongal' },
        { src: 'https://placehold.co/400x400/FFB300/2A1B12?text=Jallikattu', alt: 'Jallikattu', caption: 'The traditional bull-taming sport' }
    ];

    const fragment = document.createDocumentFragment();
    images.forEach(img => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
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

    grid.appendChild(fragment);
}
