// Sinkholes & Subsidence Components

function renderMapMarkers(zones, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    zones.forEach(zone => {
        const marker = document.createElement('div');
        marker.className = `map-marker ${zone.type}`;
        if (zone.severity === 'severe') {
            marker.classList.add('severe');
        }
        marker.setAttribute('data-zone-id', zone.id);
        marker.style.left = `${zone.mapPosition.x}%`;
        marker.style.top = `${zone.mapPosition.y}%`;
        marker.setAttribute('aria-label', `${zone.name} - ${zone.type}`);
        marker.setAttribute('role', 'button');
        marker.setAttribute('tabindex', '0');

        marker.addEventListener('click', () => showZoneModal(zone));
        marker.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showZoneModal(zone);
            }
        });

        container.appendChild(marker);
    });
}

function showZoneModal(zone) {
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <h3>${zone.name}</h3>
        <p><strong>State:</strong> ${zone.state}</p>
        <p><strong>Type:</strong> <span class="severity ${zone.type}">${zone.type.toUpperCase()}</span></p>
        <p><strong>Severity:</strong> ${zone.severity.toUpperCase()}</p>
        <p>${zone.description}</p>

        <h4>Causes:</h4>
        <ul>
            ${zone.causes.map(cause => `<li>${cause}</li>`).join('')}
        </ul>

        <h4>Impacts:</h4>
        <ul>
            ${zone.impacts.map(impact => `<li>${impact}</li>`).join('')}
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
                  fill="rgba(141, 110, 99, 0.3)"
                  stroke="rgba(109, 76, 65, 0.6)"
                  stroke-width="2"/>
        </svg>
    `;

    container.innerHTML = svgContent;
}

function filterMapMarkers(filter) {
    const markers = document.querySelectorAll('.map-marker');

    markers.forEach(marker => {
        const zoneId = marker.getAttribute('data-zone-id');
        const zone = subsidenceData.zones.find(z => z.id === zoneId);

        if (!zone) return;

        let shouldShow = false;

        switch (filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'sinkhole':
                shouldShow = zone.type === 'sinkhole';
                break;
            case 'subsidence':
                shouldShow = zone.type === 'subsidence';
                break;
            case 'mining':
                shouldShow = zone.type === 'mining';
                break;
            case 'severe':
                shouldShow = zone.severity === 'severe';
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
        showZoneModal,
        renderIndiaOutline,
        filterMapMarkers,
        setupModalHandlers,
        setupMapFilters
    };
}
