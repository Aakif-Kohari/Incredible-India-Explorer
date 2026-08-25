/* script.js */

/*
 * ROUTES DATA
 * Add a new Garib Rath service here to have it appear automatically in the
 * explorer, including filter dropdown options and the expandable station timeline.
 * Required fields: id, name, origin, destination, majorStations (array), regions (array), description.
 */
const garibRathRoutes = [
    {
        id: "saharsa-amritsar",
        name: "Saharsa – Amritsar Garib Rath Express",
        origin: "Saharsa Junction",
        destination: "Amritsar Junction",
        majorStations: ["Patna", "Lucknow", "Delhi", "Ambala"],
        regions: ["Bihar", "Uttar Pradesh", "Delhi", "Punjab"],
        description: "India's first Garib Rath Express, launched in October 2006, connecting Bihar to Punjab across the Gangetic plain."
    },
    {
        id: "delhi-bikaner",
        name: "Delhi Sarai Rohilla – Bikaner Garib Rath Express",
        origin: "Delhi Sarai Rohilla",
        destination: "Bikaner",
        majorStations: ["Rewari", "Sikar", "Churu"],
        regions: ["Delhi", "Haryana", "Rajasthan"],
        description: "A shorter route linking the national capital with Bikaner in western Rajasthan."
    },
    {
        id: "kolkata-yesvantpur",
        name: "Kolkata – Yesvantpur Garib Rath Express",
        origin: "Kolkata",
        destination: "Yesvantpur (Bengaluru)",
        majorStations: ["Bhubaneswar", "Vijayawada", "Chennai"],
        regions: ["West Bengal", "Odisha", "Andhra Pradesh", "Tamil Nadu", "Karnataka"],
        description: "Connects eastern India to Bengaluru, one of the longest Garib Rath routes in the network."
    },
    {
        id: "chennai-nizamuddin",
        name: "Chennai – Hazrat Nizamuddin Garib Rath Express",
        origin: "Chennai Egmore",
        destination: "Hazrat Nizamuddin (Delhi)",
        majorStations: ["Vijayawada", "Nagpur", "Jhansi"],
        regions: ["Tamil Nadu", "Andhra Pradesh", "Maharashtra", "Madhya Pradesh", "Delhi"],
        description: "A superfast link between Tamil Nadu's capital and the national capital, cutting through central India."
    },
    {
        id: "bandra-amritsar",
        name: "Bandra – Amritsar Garib Rath Express",
        origin: "Bandra Terminus",
        destination: "Amritsar Junction",
        majorStations: ["Surat", "Vadodara", "Kota", "Delhi"],
        regions: ["Maharashtra", "Gujarat", "Rajasthan", "Delhi", "Punjab"],
        description: "Connects Mumbai's western suburbs directly with Punjab, serving passengers across five states."
    }
];

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.getElementById('route-explorer-grid');
    const noResults = document.getElementById('no-results');
    const filterStatus = document.getElementById('filter-status');
    const searchInput = document.getElementById('filter-search');
    const originSelect = document.getElementById('filter-origin');
    const destinationSelect = document.getElementById('filter-destination');
    const regionSelect = document.getElementById('filter-region');
    const clearButton = document.getElementById('clear-filters');

    // Populate filter dropdowns from the routes data
    function populateFilters() {
        const origins = [...new Set(garibRathRoutes.map(r => r.origin))].sort();
        const destinations = [...new Set(garibRathRoutes.map(r => r.destination))].sort();
        const regions = [...new Set(garibRathRoutes.flatMap(r => r.regions))].sort();

        origins.forEach(origin => {
            const opt = document.createElement('option');
            opt.value = origin;
            opt.textContent = origin;
            originSelect.appendChild(opt);
        });

        destinations.forEach(destination => {
            const opt = document.createElement('option');
            opt.value = destination;
            opt.textContent = destination;
            destinationSelect.appendChild(opt);
        });

        regions.forEach(region => {
            const opt = document.createElement('option');
            opt.value = region;
            opt.textContent = region;
            regionSelect.appendChild(opt);
        });
    }

    // Render a set of route cards
    function renderRoutes(routes) {
        if (routes.length === 0) {
            grid.innerHTML = '';
            noResults.hidden = false;
            filterStatus.textContent = 'No services found.';
            return;
        }

        noResults.hidden = true;
        filterStatus.textContent = `Showing ${routes.length} of ${garibRathRoutes.length} Garib Rath service${garibRathRoutes.length === 1 ? '' : 's'}.`;

        grid.innerHTML = routes.map(route => `
            <div class="route-explorer-card" id="card-${route.id}">
                <h3>${route.name}</h3>
                <div class="route-od">${route.origin} <span aria-hidden="true">→</span> ${route.destination}</div>
                <p class="route-explorer-desc">${route.description}</p>
                <div class="region-badges">
                    ${route.regions.map(region => `<span class="region-badge">${region}</span>`).join('')}
                </div>
                <button type="button" class="btn-expand-route" data-route-id="${route.id}" aria-expanded="false" aria-controls="timeline-${route.id}">
                    Show major stations ▾
                </button>
                <div class="route-station-timeline" id="timeline-${route.id}">
                    <div class="station-stop"><strong>${route.origin}</strong> (Origin)</div>
                    ${route.majorStations.map(station => `<div class="station-stop">${station}</div>`).join('')}
                    <div class="station-stop"><strong>${route.destination}</strong> (Destination)</div>
                </div>
            </div>
        `).join('');

        // Wire up expand/collapse buttons
        grid.querySelectorAll('.btn-expand-route').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = document.getElementById(`card-${btn.dataset.routeId}`);
                const isExpanded = card.classList.toggle('expanded');
                btn.setAttribute('aria-expanded', String(isExpanded));
                btn.textContent = isExpanded ? 'Hide major stations ▴' : 'Show major stations ▾';
            });
        });
    }

    // Apply current filter values
    function applyFilters() {
        const query = searchInput.value.trim().toLowerCase();
        const origin = originSelect.value;
        const destination = destinationSelect.value;
        const region = regionSelect.value;

        const filtered = garibRathRoutes.filter(route => {
            const matchesQuery = !query ||
                route.name.toLowerCase().includes(query) ||
                route.origin.toLowerCase().includes(query) ||
                route.destination.toLowerCase().includes(query) ||
                route.majorStations.some(station => station.toLowerCase().includes(query));

            const matchesOrigin = !origin || route.origin === origin;
            const matchesDestination = !destination || route.destination === destination;
            const matchesRegion = !region || route.regions.includes(region);

            return matchesQuery && matchesOrigin && matchesDestination && matchesRegion;
        });

        renderRoutes(filtered);
    }

    // Event listeners — filtering updates live, no page reload
    searchInput.addEventListener('input', applyFilters);
    originSelect.addEventListener('change', applyFilters);
    destinationSelect.addEventListener('change', applyFilters);
    regionSelect.addEventListener('change', applyFilters);

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        originSelect.value = '';
        destinationSelect.value = '';
        regionSelect.value = '';
        applyFilters();
        searchInput.focus();
    });

    // Prevent accidental form submission (Enter key in search field)
    document.getElementById('filter-form').addEventListener('submit', (e) => e.preventDefault());

    // Initialize
    populateFilters();
    renderRoutes(garibRathRoutes);
});