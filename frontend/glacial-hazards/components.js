// Glacial Hazards Components

function renderMapMarkers(features, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    features.forEach(feature => {
        const marker = document.createElement('div');
        marker.className = `map-marker ${feature.type}`;
        marker.setAttribute('data-feature-id', feature.id);
        marker.style.left = `${feature.mapPosition.x}%`;
        marker.style.top = `${feature.mapPosition.y}%`;
        marker.setAttribute('aria-label', `${feature.name} - ${feature.type}`);
        marker.setAttribute('role', 'button');
        marker.setAttribute('tabindex', '0');

        marker.addEventListener('click', () => showFeatureModal(feature));
        marker.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showFeatureModal(feature);
            }
        });

        container.appendChild(marker);
    });
}

function showFeatureModal(feature) {
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <h3>${feature.name}</h3>
        <p><strong>State:</strong> ${feature.state}</p>
        <p><strong>Elevation:</strong> ${feature.elevation}</p>
        <p><strong>Type:</strong> <span class="severity-label" style="background: var(--${feature.type === 'critical' ? 'critical-red' : feature.type === 'disaster' ? 'warning-orange' : 'primary-blue'}); color: white; padding: 4px 8px; border-radius: 4px;">${feature.type.toUpperCase()}</span></p>
        <p>${feature.description}</p>

        <h4>Hazards:</h4>
        <ul>
            ${feature.hazards.map(h => `<li>${h}</li>`).join('')}
        </ul>

        <h4>Historical Context:</h4>
        <p>${feature.history}</p>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.focus();
}

function renderHimalayaOutline(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const svgContent = `
        <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50 150 L 150 80 L 250 120 L 350 60 L 450 100 L 550 70 L 650 90 L 750 110"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.6)"
                  stroke-width="3"
                  stroke-linecap="round"/>
            <path d="M 50 150 L 150 80 L 250 120 L 350 60 L 450 100 L 550 70 L 650 90 L 750 110 L 750 200 L 50 200 Z"
                  fill="rgba(255, 255, 255, 0.1)" />
            <text x="400" y="30" text-anchor="middle" fill="rgba(255, 255, 255, 0.8)" font-size="16" font-weight="bold">HIMALAYAN RANGE</text>
        </svg>
    `;

    container.innerHTML = svgContent;
}

function filterMapMarkers(filter) {
    const markers = document.querySelectorAll('.map-marker');

    markers.forEach(marker => {
        const featureId = marker.getAttribute('data-feature-id');
        const feature = glacialData.features.find(f => f.id === featureId);

        if (!feature) return;

        let shouldShow = false;

        switch (filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'critical':
                shouldShow = feature.type === 'critical';
                break;
            case 'retreating':
                shouldShow = feature.type === 'retreating';
                break;
            case 'uttarakhand':
                shouldShow = feature.region === 'uttarakhand';
                break;
            case 'himachal':
                shouldShow = feature.region === 'himachal';
                break;
            case 'sikkim':
                shouldShow = feature.region === 'sikkim';
                break;
            default:
                shouldShow = true;
        }

        marker.style.display = shouldShow ? 'block' : 'none';
    });
}

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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });
}

function setupMapFilters() {
    const filterButtons = document.querySelectorAll('.control-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            filterMapMarkers(filter);
        });
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderMapMarkers,
        showFeatureModal,
        renderHimalayaOutline,
        filterMapMarkers,
        setupModalHandlers,
        setupMapFilters
    };
}
