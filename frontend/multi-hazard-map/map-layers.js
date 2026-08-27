/**
 * Map Layers Module
 * Handles the initialization and management of Leaflet map layers and markers.
 */

/**
 * Initializes the Leaflet map instance.
 * @returns {Object} The Leaflet map instance.
 */
function initializeHazardMap() {
    const mapContainer = document.getElementById('hazard-map');
    if (!mapContainer) return null;

    // Initialize map centered on India
    const map = L.map('hazard-map', {
        center: [20.5937, 78.9629],
        zoom: 5,
        minZoom: 4,
        maxZoom: 10,
        scrollWheelZoom: true
    });

    // Add dark mode tile layer by default
    const isLightTheme = document.body.classList.contains('light-theme');
    const tileUrl = isLightTheme
        ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Store map instance globally for other modules to access
    window.hazardMapInstance = map;

    // Add initial hazard markers
    addHazardMarkersToMap(map, 'all');

    return map;
}

/**
 * Adds markers to the map based on the selected hazard filter.
 * @param {Object} map - The Leaflet map instance.
 * @param {string} filterId - The ID of the hazard to filter by, or 'all'.
 */
function addHazardMarkersToMap(map, filterId) {
    // Clear existing markers (in a real app, we'd manage layer groups)
    // For this implementation, we clear the map and re-add relevant markers
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
            map.removeLayer(layer);
        }
    });

    const hazardsToAdd = filterId === 'all'
        ? HAZARD_CATEGORIES
        : HAZARD_CATEGORIES.filter(h => h.id === filterId);

    hazardsToAdd.forEach(hazard => {
        hazard.coordinates.forEach(coord => {
            // Create custom icon based on hazard
            const customIcon = L.divIcon({
                className: 'custom-hazard-marker',
                html: `<div style="background-color: ${hazard.color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 12px;">${hazard.icon}</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            const marker = L.marker([coord.lat, coord.lng], { icon: customIcon }).addTo(map);

            const popupContent = `
                <div style="text-align: center;">
                    <h4 style="margin: 0 0 5px 0; color: ${hazard.color};">${hazard.name}</h4>
                    <p style="margin: 0; font-size: 14px;"><strong>${coord.name}</strong></p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Severity: <span style="color: ${coord.severity === 'high' ? 'red' : (coord.severity === 'medium' ? 'orange' : 'green')}; text-transform: uppercase;">${coord.severity}</span></p>
                </div>
            `;

            marker.bindPopup(popupContent);

            // Add a circle to indicate the affected area radius
            const radius = coord.severity === 'high' ? 50000 : (coord.severity === 'medium' ? 30000 : 15000);
            L.circle([coord.lat, coord.lng], {
                color: hazard.color,
                fillColor: hazard.color,
                fillOpacity: 0.1,
                radius: radius,
                weight: 1
            }).addTo(map);
        });
    });
}

/**
 * Updates the sidebar content with hazard or state information.
 * @param {string} title - The title to display.
 * @param {string} description - The description text.
 * @param {Array} resources - Array of resource strings.
 */
function updateSidebar(title, description, resources) {
    const titleEl = document.getElementById('sidebar-title');
    const descEl = document.getElementById('sidebar-description');
    const resourcesEl = document.getElementById('sidebar-resources');

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.innerHTML = description;

    if (resourcesEl) {
        resourcesEl.innerHTML = '';
        if (resources && resources.length > 0) {
            const heading = document.createElement('h4');
            heading.textContent = 'Disaster Preparedness Resources:';
            heading.style.marginTop = '1.5rem';
            heading.style.marginBottom = '0.75rem';
            heading.style.color = 'var(--hazard-text)';
            resourcesEl.appendChild(heading);

            resources.forEach(resource => {
                const li = document.createElement('li');
                li.textContent = resource;
                resourcesEl.appendChild(li);
            });
        }
    }
}
