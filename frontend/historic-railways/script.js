/**
 * Indian Railways Historic Routes Module
 * Handles SVG interactive map, accessible route buttons, and dynamic route data injection.
 */

(function () {
    "use strict";

    const routes = [
        {
            id: "darjeeling-himalayan",
            name: "Darjeeling Himalayan Railway",
            region: "West Bengal",
            origin: "New Jalpaiguri",
            destination: "Darjeeling",
            significance: "Built between 1879 and 1881, it is an outstanding example of a hill passenger railway. Known affectionately as the 'Toy Train', it climbs through highly scenic mountain landscapes using ingenious engineering solutions like loops and zig-zags.",
            facts: [
                "Declared a UNESCO World Heritage Site in 1999.",
                "Operates on a 2 ft (610 mm) narrow-gauge track.",
                "Reaches an elevation of 2,258 metres at Ghum, India's highest railway station."
            ],
            image: "assets/darjeeling.png",
            pathD: "M 600 200 Q 620 180 630 160", // Fictional stylized path
            markerCx: 630,
            markerCy: 160
        },
        {
            id: "palace-on-wheels",
            name: "Palace on Wheels",
            region: "Rajasthan",
            origin: "New Delhi",
            destination: "Rajasthan Circuit",
            significance: "Introduced in 1982 to promote tourism in Rajasthan, it uses historic saloons of erstwhile Maharajas, providing a royal, luxurious experience through the desert landscapes.",
            facts: [
                "Voted as the 4th luxurious train in the world.",
                "Original carriages were used by Rajput kings and the Viceroy of India.",
                "Takes guests on a 7-night, 8-day journey through Jaipur, Jaisalmer, Jodhpur, and Agra."
            ],
            image: "assets/palace.png",
            pathD: "M 320 200 L 280 250 L 250 280 L 300 320 L 350 280 L 320 200", // Fictional stylized path
            markerCx: 280,
            markerCy: 250
        },
        {
            id: "kalka-shimla",
            name: "Kalka–Shimla Railway",
            region: "Himachal Pradesh",
            origin: "Kalka",
            destination: "Shimla",
            significance: "Built in 1903 to connect Shimla, the summer capital of British India, this narrow-gauge railway represents a masterpiece of mountain railway engineering.",
            facts: [
                "UNESCO World Heritage Site since 2008.",
                "Features 102 tunnels, 864 bridges, and 919 stunning curves.",
                "The longest tunnel on the route is the Barog tunnel at 1,143 metres."
            ],
            image: "assets/kalka.png",
            pathD: "M 310 160 Q 320 140 330 120", // Fictional stylized path
            markerCx: 330,
            markerCy: 120
        }
    ];

    // DOM Elements
    const buttonsContainer = document.getElementById('railway-buttons-container');
    const pathsGroup = document.getElementById('railway-paths-group');
    const markersGroup = document.getElementById('railway-markers-group');
    const infoCard = document.getElementById('railway-info-card');

    /**
     * Initializes the UI by rendering buttons and SVG paths.
     */
    function initialize() {
        if (!buttonsContainer || !pathsGroup || !infoCard) return;

        routes.forEach(route => {
            // Render Button
            const btn = document.createElement('button');
            btn.className = 'railway-route-button';
            btn.textContent = route.name;
            btn.setAttribute('data-id', route.id);
            btn.addEventListener('click', () => selectRoute(route.id));
            buttonsContainer.appendChild(btn);

            // Render SVG Path
            const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathEl.setAttribute('d', route.pathD);
            pathEl.setAttribute('class', 'railway-route');
            pathEl.setAttribute('data-id', route.id);
            pathEl.setAttribute('tabindex', '0');
            pathEl.setAttribute('role', 'button');
            pathEl.setAttribute('aria-label', `Explore ${route.name} route`);

            // Path Event Listeners
            pathEl.addEventListener('click', () => selectRoute(route.id));
            pathEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectRoute(route.id);
                }
            });
            pathsGroup.appendChild(pathEl);

            // Render Station Marker (optional visual cue)
            const markerEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            markerEl.setAttribute('cx', route.markerCx);
            markerEl.setAttribute('cy', route.markerCy);
            markerEl.setAttribute('r', '5');
            markerEl.setAttribute('class', 'railway-marker');
            markerEl.setAttribute('data-id', route.id);
            markersGroup.appendChild(markerEl);
        });
    }

    /**
     * Handles route selection, updates active states, and re-renders the info panel.
     * @param {string} routeId 
     */
    function selectRoute(routeId) {
        // Clear active states
        document.querySelectorAll('.railway-route-button').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.railway-route').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.railway-marker').forEach(el => el.classList.remove('active'));

        // Set active states
        const activeBtn = document.querySelector(`.railway-route-button[data-id="${routeId}"]`);
        const activePath = document.querySelector(`.railway-route[data-id="${routeId}"]`);
        const activeMarker = document.querySelector(`.railway-marker[data-id="${routeId}"]`);

        if (activeBtn) activeBtn.classList.add('active');
        if (activePath) activePath.classList.add('active');
        if (activeMarker) activeMarker.classList.add('active');

        // Find and render data
        const routeData = routes.find(r => r.id === routeId);
        if (routeData) {
            renderRoute(routeData);
        }
    }

    /**
     * Renders the dynamic content into the information panel.
     * @param {Object} route 
     */
    function renderRoute(route) {
        infoCard.classList.remove('default-state');

        // Generate facts list
        const factsHtml = route.facts.map(fact => `<li>${fact}</li>`).join('');

        infoCard.innerHTML = `
            <div class="railway-details-header animate-fade">
                <h2 class="railway-name">${route.name}</h2>
                <div class="railway-region">📍 ${route.region}</div>
            </div>
            
            <div class="railway-image-container animate-fade" style="animation-delay: 0.1s;">
                <img src="${route.image}" alt="Historic ${route.name} train" class="railway-image">
            </div>

            <div class="railway-stats animate-fade" style="animation-delay: 0.2s;">
                <div class="railway-stat">
                    <p class="stat-label">Origin</p>
                    <p class="stat-val">${route.origin}</p>
                </div>
                <div class="railway-stat">
                    <p class="stat-label">Destination</p>
                    <p class="stat-val">${route.destination}</p>
                </div>
            </div>
            
            <div class="railway-significance animate-fade" style="animation-delay: 0.3s;">
                <strong>Significance:</strong> ${route.significance}
            </div>

            <div class="animate-fade" style="animation-delay: 0.4s;">
                <h4 style="color: var(--text-muted); margin-bottom: 0.5rem;">Key Facts</h4>
                <ul class="railway-facts">
                    ${factsHtml}
                </ul>
            </div>
        `;
    }

    // Initialize on load
    document.addEventListener('DOMContentLoaded', initialize);

})();
