// Coastal Erosion Components

/**
 * Render region cards in the regions grid
 * @param {Array} regions - Array of region data objects
 * @param {string} containerId - ID of container element
 */
function renderRegionCards(regions, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    regions.forEach(region => {
        const card = document.createElement('div');
        card.className = 'region-card';
        card.setAttribute('data-region-id', region.id);

        card.innerHTML = `
            <span class="severity ${region.severity}">${region.severity.toUpperCase()}</span>
            <h3>${region.name}</h3>
            <p><strong>State:</strong> ${region.state}</p>
            <p><strong>Erosion Rate:</strong> ${region.erosionRate}</p>
            <p>${region.description}</p>
            <div class="region-details">
                <h4>Causes:</h4>
                <ul>
                    ${region.causes.map(cause => `<li>${cause}</li>`).join('')}
                </ul>
                <h4>Impacts:</h4>
                <ul>
                    ${region.impacts.map(impact => `<li>${impact}</li>`).join('')}
                </ul>
            </div>
        `;

        container.appendChild(card);
    });
}

/**
 * Render map markers on the interactive map
 * @param {Array} regions - Array of region data objects
 * @param {string} containerId - ID of markers container
 */
function renderMapMarkers(regions, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    regions.forEach(region => {
        const marker = document.createElement('div');
        marker.className = `map-marker ${region.severity}`;
        marker.setAttribute('data-region-id', region.id);
        marker.style.left = `${region.mapPosition.x}%`;
        marker.style.top = `${region.mapPosition.y}%`;
        marker.setAttribute('aria-label', `${region.name} - ${region.severity} erosion`);
        marker.setAttribute('role', 'button');
        marker.setAttribute('tabindex', '0');

        // Add click handler
        marker.addEventListener('click', () => showRegionModal(region));
        marker.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showRegionModal(region);
            }
        });

        container.appendChild(marker);
    });
}

/**
 * Show modal with region details
 * @param {Object} region - Region data object
 */
function showRegionModal(region) {
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <h3>${region.name}</h3>
        <p><strong>State:</strong> ${region.state}</p>
        <p><strong>Severity:</strong> <span class="severity ${region.severity}">${region.severity.toUpperCase()}</span></p>
        <p><strong>Erosion Rate:</strong> ${region.erosionRate}</p>
        <p>${region.description}</p>

        <h4>Causes:</h4>
        <ul>
            ${region.causes.map(cause => `<li>${cause}</li>`).join('')}
        </ul>

        <h4>Impacts:</h4>
        <ul>
            ${region.impacts.map(impact => `<li>${impact}</li>`).join('')}
        </ul>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    // Focus trap
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.focus();
}

/**
 * Render case studies
 * @param {Array} caseStudies - Array of case study objects
 * @param {string} containerId - ID of container element
 */
function renderCaseStudies(caseStudies, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    caseStudies.forEach(study => {
        const card = document.createElement('div');
        card.className = 'case-study-card';

        card.innerHTML = `
            <h3>${study.title}</h3>
            <p><strong>Location:</strong> ${study.location}</p>
            <p><strong>Period:</strong> ${study.year}</p>
            <p>${study.summary}</p>
            <p>${study.details}</p>
        `;

        container.appendChild(card);
    });
}

/**
 * Render India outline SVG on the map
 * @param {string} containerId - ID of container element
 */
function renderIndiaOutline(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Simplified India outline SVG
    const svgContent = `
        <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
            <path d="M 150 50 Q 200 60 220 80 L 240 100 L 260 120 L 280 150 L 300 180 L 310 220 L 320 260 L 310 300 L 300 340 L 280 380 L 260 420 L 240 450 L 220 470 L 200 480 L 180 470 L 160 450 L 140 420 L 120 380 L 110 340 L 100 300 L 90 260 L 100 220 L 110 180 L 120 150 L 130 120 L 140 100 L 150 80 Z"
                  fill="rgba(255, 255, 255, 0.3)"
                  stroke="white"
                  stroke-width="2"/>
        </svg>
    `;

    container.innerHTML = svgContent;
}

/**
 * Filter map markers based on filter criteria
 * @param {string} filter - Filter type (all, severe, moderate, arabian, bengal)
 */
function filterMapMarkers(filter) {
    const markers = document.querySelectorAll('.map-marker');

    markers.forEach(marker => {
        const regionId = marker.getAttribute('data-region-id');
        const region = erosionData.regions.find(r => r.id === regionId);

        if (!region) return;

        let shouldShow = false;

        switch(filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'severe':
                shouldShow = region.severity === 'severe';
                break;
            case 'moderate':
                shouldShow = region.severity === 'moderate';
                break;
            case 'arabian':
                shouldShow = ['kerala-coast', 'goa-coast', 'maharashtra-coast', 'karnataka-coast', 'gujarat-coast'].includes(regionId);
                break;
            case 'bengal':
                shouldShow = ['tamil-nadu-coast', 'andhra-coast', 'odisha-coast', 'west-bengal-coast'].includes(regionId);
                break;
            default:
                shouldShow = true;
        }

        marker.style.display = shouldShow ? 'block' : 'none';
    });
}

/**
 * Setup modal close handlers
 */
function setupModalHandlers() {
    const modal = document.getElementById('info-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });
}

/**
 * Setup map filter controls
 */
function setupMapFilters() {
    const filterButtons = document.querySelectorAll('.control-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Apply filter
            const filter = button.getAttribute('data-filter');
            filterMapMarkers(filter);
        });
    });
}

// Export functions for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderRegionCards,
        renderMapMarkers,
        showRegionModal,
        renderCaseStudies,
        renderIndiaOutline,
        filterMapMarkers,
        setupModalHandlers,
        setupMapFilters
    };
}
