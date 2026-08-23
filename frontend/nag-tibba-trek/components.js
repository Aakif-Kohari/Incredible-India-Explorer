/* ==========================================================================
   Nag Tibba Trek Components
   Safe DOM rendering functions for all trek sections
   ========================================================================== */

/**
 * Renders the elevation profile chart using CSS-based visualization
 */
function renderElevationChart() {
    const container = document.getElementById('elevation-chart');
    if (!container) return;

    // Clear existing content safely
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();
    
    // Calculate chart dimensions
    const maxAltitude = 3022;
    const minAltitude = 1500;
    const chartHeight = 260; // Available height in pixels
    const barWidth = 60;
    const totalBars = elevationData.length;
    const spacing = (container.offsetWidth - (totalBars * barWidth)) / (totalBars + 1);

    elevationData.forEach((point, index) => {
        const bar = document.createElement('div');
        bar.className = 'elevation-bar';
        
        // Calculate height based on altitude
        const heightPercent = ((point.altitude - minAltitude) / (maxAltitude - minAltitude)) * 100;
        const heightPx = (heightPercent / 100) * chartHeight;
        
        bar.style.width = `${barWidth}px`;
        bar.style.height = '0px'; // Start at 0 for animation
        bar.style.left = `${spacing + (index * (barWidth + spacing))}px`;
        
        // Add altitude label
        const label = document.createElement('div');
        label.className = 'elevation-label';
        label.textContent = `${point.location} (${point.altitude}m)`;
        bar.appendChild(label);
        
        fragment.appendChild(bar);
        
        // Animate height after a short delay
        setTimeout(() => {
            bar.style.height = `${heightPx}px`;
        }, 100 + (index * 100));
    });

    container.appendChild(fragment);
}

/**
 * Renders trail segment cards
 */
function renderTrailSegments() {
    const container = document.getElementById('trail-segments');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    trailSegments.forEach((segment, index) => {
        const card = document.createElement('article');
        card.className = 'trail-card animate-on-scroll';

        const h4 = document.createElement('h4');
        h4.textContent = `${index + 1}. ${segment.name}`;

        const meta = document.createElement('div');
        meta.className = 'trail-meta';
        
        const distanceSpan = document.createElement('span');
        distanceSpan.innerHTML = `<strong>Distance:</strong> ${segment.distance}`;
        
        const durationSpan = document.createElement('span');
        durationSpan.innerHTML = `<strong>Duration:</strong> ${segment.duration}`;
        
        const altitudeSpan = document.createElement('span');
        altitudeSpan.innerHTML = `<strong>Altitude:</strong> ${segment.altitude}`;

        meta.appendChild(distanceSpan);
        meta.appendChild(durationSpan);
        meta.appendChild(altitudeSpan);

        const p = document.createElement('p');
        p.textContent = segment.description;

        card.appendChild(h4);
        card.appendChild(meta);
        card.appendChild(p);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Renders difficulty assessment cards
 */
function renderDifficultyGrid() {
    const container = document.getElementById('difficulty-grid');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    difficultyAssessment.forEach(item => {
        const card = document.createElement('div');
        card.className = 'difficulty-card animate-on-scroll';

        const h4 = document.createElement('h4');
        h4.textContent = item.parameter;

        const bar = document.createElement('div');
        bar.className = 'difficulty-bar';

        const fill = document.createElement('div');
        fill.className = 'difficulty-fill';
        fill.style.width = '0%';
        bar.appendChild(fill);

        const label = document.createElement('div');
        label.className = 'difficulty-label';
        label.textContent = item.description;

        card.appendChild(h4);
        card.appendChild(bar);
        card.appendChild(label);
        fragment.appendChild(card);

        // Animate fill width after append
        setTimeout(() => {
            fill.style.width = `${item.level}%`;
        }, 200);
    });

    container.appendChild(fragment);
}

/**
 * Renders viewpoint cards
 */
function renderViewpoints() {
    const container = document.getElementById('viewpoints-grid');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    viewpoints.forEach(point => {
        const card = document.createElement('article');
        card.className = 'viewpoint-card animate-on-scroll';

        const icon = document.createElement('div');
        icon.className = 'viewpoint-icon';
        icon.textContent = point.icon;

        const h4 = document.createElement('h4');
        h4.textContent = point.name;

        const p = document.createElement('p');
        p.textContent = point.description;

        card.appendChild(icon);
        card.appendChild(h4);
        card.appendChild(p);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Renders visible peaks list
 */
function renderPeaksList() {
    const container = document.getElementById('peaks-list');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    visiblePeaks.forEach(peak => {
        const item = document.createElement('div');
        item.className = 'peak-item animate-on-scroll';

        const name = document.createElement('span');
        name.className = 'peak-name';
        name.textContent = peak.name;

        const altitude = document.createElement('span');
        altitude.className = 'peak-altitude';
        altitude.textContent = peak.altitude;

        item.appendChild(name);
        item.appendChild(altitude);
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}

/**
 * Renders campsite cards
 */
function renderCampsites() {
    const container = document.getElementById('campsites-grid');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    campsites.forEach(site => {
        const card = document.createElement('article');
        card.className = 'campsite-card animate-on-scroll';

        const h4 = document.createElement('h4');
        h4.textContent = site.name;

        const meta = document.createElement('div');
        meta.className = 'campsite-meta';
        meta.textContent = `Altitude: ${site.altitude} | ${site.facilities}`;

        const p = document.createElement('p');
        p.textContent = site.description;

        card.appendChild(h4);
        card.appendChild(meta);
        card.appendChild(p);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Renders packing essentials list
 */
function renderPackingList() {
    const container = document.getElementById('packing-list');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    packingEssentials.forEach(item => {
        const div = document.createElement('div');
        div.className = 'packing-item animate-on-scroll';

        const strong = document.createElement('strong');
        strong.textContent = item.category;

        const p = document.createElement('p');
        p.textContent = item.items;

        div.appendChild(strong);
        div.appendChild(p);
        fragment.appendChild(div);
    });

    container.appendChild(fragment);
}

/**
 * Renders nearby attractions grid
 */
function renderNearbyGrid() {
    const container = document.getElementById('nearby-grid');
    if (!container) return;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const fragment = document.createDocumentFragment();

    nearbyAttractions.forEach(attraction => {
        const card = document.createElement('article');
        card.className = 'nearby-card animate-on-scroll';

        const icon = document.createElement('div');
        icon.className = 'nearby-icon';
        icon.textContent = attraction.icon;

        const h4 = document.createElement('h4');
        h4.textContent = attraction.name;

        const p = document.createElement('p');
        p.textContent = attraction.description;

        card.appendChild(icon);
        card.appendChild(h4);
        card.appendChild(p);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Renders the image gallery with lightbox support
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
