// Desertification Components

function renderRegionCards(regions, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    regions.forEach(region => {
        const card = document.createElement('div');
        card.className = 'region-card';
        card.setAttribute('data-region-id', region.id);

        card.innerHTML = `
            <span class="severity ${region.severity}">${region.severity.toUpperCase()} (${region.percentage}%)</span>
            <h3>${region.name}</h3>
            <p><strong>Degraded Area:</strong> ${region.area}</p>
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
        marker.setAttribute('aria-label', `${region.name} - ${region.percentage}% degraded`);
        marker.setAttribute('role', 'button');
        marker.setAttribute('tabindex', '0');

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

function showRegionModal(region) {
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <h3>${region.name}</h3>
        <p><strong>Degradation:</strong> <span class="severity ${region.severity}">${region.severity.toUpperCase()} (${region.percentage}%)</span></p>
        <p><strong>Degraded Area:</strong> ${region.area}</p>
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

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.focus();
}

function renderIndiaOutline(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const svgContent = `
        <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
            <path d="M 150 50 Q 200 60 220 80 L 240 100 L 260 120 L 280 150 L 300 180 L 310 220 L 320 260 L 310 300 L 300 340 L 280 380 L 260 420 L 240 450 L 220 470 L 200 480 L 180 470 L 160 450 L 140 420 L 120 380 L 110 340 L 100 300 L 90 260 L 100 220 L 110 180 L 120 150 L 130 120 L 140 100 L 150 80 Z"
                  fill="rgba(210, 180, 140, 0.3)"
                  stroke="rgba(139, 69, 19, 0.6)"
                  stroke-width="2"/>
        </svg>
    `;

    container.innerHTML = svgContent;
}

function filterMapMarkers(filter) {
    const markers = document.querySelectorAll('.map-marker');

    markers.forEach(marker => {
        const regionId = marker.getAttribute('data-region-id');
        const region = desertificationData.regions.find(r => r.id === regionId);

        if (!region) return;

        let shouldShow = false;

        switch (filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'severe':
                shouldShow = region.severity === 'severe';
                break;
            case 'moderate':
                shouldShow = region.severity === 'moderate';
                break;
            case 'west':
                shouldShow = region.region === 'west';
                break;
            case 'central':
                shouldShow = region.region === 'central';
                break;
            case 'south':
                shouldShow = region.region === 'south';
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
        renderRegionCards,
        renderMapMarkers,
        showRegionModal,
        renderIndiaOutline,
        filterMapMarkers,
        setupModalHandlers,
        setupMapFilters
    };
}
