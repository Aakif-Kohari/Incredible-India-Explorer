/* ==========================================================================
   Ganesh Chaturthi Components
   Safe DOM rendering functions for pandals, timeline, and foods.
   Uses only document.createElement() - NO innerHTML.
   ========================================================================== */

/**
 * Renders the famous pandals grid with stats.
 */
function renderPandals() {
    const container = document.getElementById('pandals-grid');
    if (!container) return;

    // Clear existing content safely
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    famousPandals.forEach(pandal => {
        const card = document.createElement('article');
        card.className = 'pandal-card animate-on-scroll';

        // Header
        const header = document.createElement('div');
        header.className = 'pandal-header';

        const h4 = document.createElement('h4');
        h4.textContent = pandal.name;

        const city = document.createElement('p');
        city.textContent = pandal.city;

        header.appendChild(h4);
        header.appendChild(city);

        // Content
        const content = document.createElement('div');
        content.className = 'pandal-content';

        const desc = document.createElement('p');
        desc.textContent = pandal.desc;
        content.appendChild(desc);

        // Stats
        const stats = document.createElement('div');
        stats.className = 'pandal-stats';

        const stat1 = document.createElement('div');
        stat1.className = 'pandal-stat';
        const label1 = document.createElement('div');
        label1.className = 'pandal-stat-label';
        label1.textContent = 'Since';
        const value1 = document.createElement('div');
        value1.className = 'pandal-stat-value';
        value1.textContent = pandal.since;
        stat1.appendChild(label1);
        stat1.appendChild(value1);

        const stat2 = document.createElement('div');
        stat2.className = 'pandal-stat';
        const label2 = document.createElement('div');
        label2.className = 'pandal-stat-label';
        label2.textContent = 'Visitors';
        const value2 = document.createElement('div');
        value2.className = 'pandal-stat-value';
        value2.textContent = pandal.visitors;
        stat2.appendChild(label2);
        stat2.appendChild(value2);

        const stat3 = document.createElement('div');
        stat3.className = 'pandal-stat';
        const label3 = document.createElement('div');
        label3.className = 'pandal-stat-label';
        label3.textContent = 'Height';
        const value3 = document.createElement('div');
        value3.className = 'pandal-stat-value';
        value3.textContent = pandal.height;
        stat3.appendChild(label3);
        stat3.appendChild(value3);

        stats.appendChild(stat1);
        stats.appendChild(stat2);
        stats.appendChild(stat3);
        content.appendChild(stats);

        card.appendChild(header);
        card.appendChild(content);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Renders the 10-day festival timeline.
 */
function renderTimeline() {
    const container = document.getElementById('festival-timeline');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    festivalTimeline.forEach(event => {
        const item = document.createElement('div');
        item.className = 'timeline-item animate-on-scroll';

        const day = document.createElement('div');
        day.className = 'timeline-day';
        day.textContent = `Day ${event.day}`;

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
 * Renders the traditional foods grid.
 */
function renderFoods() {
    const container = document.getElementById('food-grid');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    traditionalFoods.forEach(food => {
        const card = document.createElement('article');
        card.className = 'food-card animate-on-scroll';

        const icon = document.createElement('div');
        icon.className = 'food-icon';
        icon.textContent = food.icon;

        const h4 = document.createElement('h4');
        h4.textContent = food.name;

        const p = document.createElement('p');
        p.textContent = food.desc;

        card.appendChild(icon);
        card.appendChild(h4);
        card.appendChild(p);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}
