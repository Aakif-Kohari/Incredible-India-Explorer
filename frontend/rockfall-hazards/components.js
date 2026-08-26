// Rockfall Hazards Components

function renderMapMarkers(zones, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    zones.forEach(zone => {
        const marker = document.createElement('div');
        marker.className = `map-marker ${zone.risk}`;
        marker.setAttribute('data-zone-id', zone.id);
        marker.style.left = `${zone.mapPosition.x}%`;
        marker.style.top = `${zone.mapPosition.y}%`;
        marker.setAttribute('aria-label', `${zone.name} - ${zone.risk} risk`);
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
        <p><strong>Region:</strong> ${zone.region === 'himalayas' ? 'Himalayan Region' : 'Western Ghats'}</p>
        <p><strong>Risk Level:</strong> <span class="severity ${zone.risk}">${zone.risk.toUpperCase()}</span></p>
        <p><strong>Elevation:</strong> ${zone.elevation}</p>
        <p>${zone.description}</p>

        <h4>Triggers:</h4>
        <ul>
            ${zone.triggers.map(trigger => `<li>${trigger}</li>`).join('')}
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

function renderMountainOutline(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const svgContent = `
        <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 250 L 50 180 L 100 220 L 150 150 L 200 190 L 250 140 L 300 170 L 350 130 L 400 160 L 450 120 L 500 150 L 550 110 L 600 140 L 650 100 L 700 130 L 750 90 L 800 120 L 850 80 L 900 110 L 900 300 L 0 300 Z"
                  fill="rgba(255, 255, 255, 0.2)"
                  stroke="rgba(255, 255, 255, 0.6)"
                  stroke-width="2"/>
            <text x="450" y="50" text-anchor="middle" fill="rgba(255, 255, 255, 0.8)" font-size="18" font-weight="bold">INDIA'S MOUNTAIN RANGES</text>
            <text x="250" y="80" text-anchor="middle" fill="rgba(255, 255, 255, 0.7)" font-size="14">HIMALAYAS</text>
            <text x="700" y="80" text-anchor="middle" fill="rgba(255, 255, 255, 0.7)" font-size="14">WESTERN GHATS</text>
        </svg>
    `;

    container.innerHTML = svgContent;
}

function filterMapMarkers(filter) {
    const markers = document.querySelectorAll('.map-marker');

    markers.forEach(marker => {
        const zoneId = marker.getAttribute('data-zone-id');
        const zone = rockfallData.zones.find(z => z.id === zoneId);

        if (!zone) return;

        let shouldShow = false;

        switch (filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'himalayas':
                shouldShow = zone.region === 'himalayas';
                break;
            case 'western-ghats':
                shouldShow = zone.region === 'western-ghats';
                break;
            case 'high':
                shouldShow = zone.risk === 'high';
                break;
            case 'moderate':
                shouldShow = zone.risk === 'moderate';
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
        renderMountainOutline,
        filterMapMarkers,
        setupModalHandlers,
        setupMapFilters
    };
}

