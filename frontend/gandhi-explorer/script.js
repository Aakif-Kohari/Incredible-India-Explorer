/**
 * Mahatma Gandhi Explorer - Interactive Script
 * Handles tab navigation, theme toggle, smooth scroll, mobile menu, count-up stats, and interactive routes.
 */

// Global reference for Gandhi Journeys data
window.GANDHI_JOURNEYS = [
    {
        id: "return-india",
        title: "Return to India (1915)",
        period: "January – May 1915",
        distance: "1,450 km",
        description: "After over two decades in South Africa, Mahatma Gandhi returned to India on January 9, 1915, landing at Apollo Bunder in Bombay. Under the guidance of Gopal Krishna Gokhale, he embarked on a nationwide tour to understand the conditions of the Indian people, visiting Rajkot, Ahmedabad, and Delhi.",
        stops: [
            { name: "Bombay (Apollo Bunder)", coords: [18.9220, 72.8347], event: "Landed on Jan 9, 1915; received a hero's welcome by the public.", role: "start" },
            { name: "Rajkot", coords: [22.3039, 70.8022], event: "Visited his family home and childhood town to meet relatives.", role: "stop" },
            { name: "Ahmedabad", coords: [23.0225, 72.5714], event: "Established the Kochrab Ashram, his first ashram in India.", role: "stop" },
            { name: "Delhi", coords: [28.6139, 77.2090], event: "Met with political leaders to discuss the state of the national movement.", role: "end" }
        ]
    },
    {
        id: "champaran",
        title: "Champaran Satyagraha (1917)",
        period: "April – May 1917",
        distance: "210 km",
        description: "Gandhi's first major Satyagraha campaign in India. He was persuaded by local peasant leader Raj Kumar Shukla to visit Champaran in Bihar, where farmers were being exploited under the oppressive Tinkathia system, forced to grow indigo instead of food crops.",
        stops: [
            { name: "Patna", coords: [25.5941, 85.1376], event: "Arrived on April 10, 1917; met Raj Kumar Shukla and local lawyers.", role: "start" },
            { name: "Muzaffarpur", coords: [26.1197, 85.3910], event: "Stayed with J.B. Kripalani and met with teachers and students.", role: "stop" },
            { name: "Motihari (Champaran)", coords: [26.6536, 84.9126], event: "Faced trial, refused to leave, and launched the nonviolent inquiry.", role: "end" }
        ]
    },
    {
        id: "ahmedabad-strike",
        title: "Ahmedabad Mill Strike (1918)",
        period: "March 1918",
        distance: "8 km",
        description: "Gandhi intervened in a dispute between Ahmedabad textile mill owners and workers. He launched his first hunger strike in India to support workers demanding a 35% wage increase as compensation for the plague epidemic and inflation.",
        stops: [
            { name: "Sabarmati Ashram", coords: [23.0605, 72.5808], event: "Gandhi's home base and starting point of the daily walks.", role: "start" },
            { name: "Ahmedabad Mill District", coords: [23.0180, 72.5950], event: "Site of the strike and Gandhi's fast, leading to a compromise.", role: "end" }
        ]
    },
    {
        id: "kheda",
        title: "Kheda Satyagraha (1918)",
        period: "March – June 1918",
        distance: "32 km",
        description: "When crops failed in Kheda district due to famine and cholera, the British administration refused to suspend land revenue collections. Gandhi, along with Sardar Vallabhbhai Patel, organized a peasant strike demanding total revenue suspension.",
        stops: [
            { name: "Nadiad", coords: [22.6916, 72.8634], event: "Satyagraha headquarters where Gandhi and Patel coordinated volunteers.", role: "start" },
            { name: "Kheda", coords: [22.7516, 72.6852], event: "The administration capitulated, agreeing to suspend revenue for poor peasants.", role: "end" }
        ]
    },
    {
        id: "non-cooperation",
        title: "Non-Cooperation Tour (1920-1922)",
        period: "August 1920 – February 1922",
        distance: "4,300 km",
        description: "To galvanize the nation for Swaraj (self-rule) and protest the Jallianwala Bagh massacre, Gandhi toured extensive parts of India. He urged citizens to boycott foreign goods, British courts, and educational institutions, before calling it off after the Chauri Chaura incident.",
        stops: [
            { name: "Bombay", coords: [18.9220, 72.8347], event: "Launched the movement, calling for bonfire bonfires of foreign cloths.", role: "start" },
            { name: "Madras", coords: [13.0827, 80.2707], event: "Addressed massive crowds on the beach, strengthening southern support.", role: "stop" },
            { name: "Calcutta", coords: [22.5726, 88.3639], event: "Passed the formal Non-Cooperation resolution at the special Congress session.", role: "stop" },
            { name: "Amritsar", coords: [31.6340, 74.8723], event: "Visited the Golden Temple and paid homage at Jallianwala Bagh.", role: "stop" },
            { name: "Chauri Chaura (Gorakhpur)", coords: [26.6438, 83.5878], event: "Site of violent clash; prompted Gandhi to suspend the movement on Feb 12, 1922.", role: "end" }
        ]
    },
    {
        id: "dandi-march",
        title: "Dandi March (1930)",
        period: "12 March – 6 April 1930",
        distance: "385 km",
        description: "The Salt Satyagraha was a direct action campaign of tax resistance and nonviolent protest against the British salt monopoly in colonial India. Gandhi led 78 satyagrahis on a 240-mile march from Sabarmati to Dandi, sparking a massive civil disobedience movement.",
        stops: [
            { name: "Sabarmati Ashram", coords: [23.0605, 72.5808], event: "Began the march on March 12, 1930, with 78 volunteers.", role: "start" },
            { name: "Aslali", coords: [22.8837, 72.6136], event: "First night stop; Gandhi addressed a gathering of over 10,000 people.", role: "stop" },
            { name: "Nadiad", coords: [22.6916, 72.8634], event: "Walked through cheering crowds; spoke on local self-reliance.", role: "stop" },
            { name: "Anand", coords: [22.5645, 72.9289], event: "Stayed in the Charotar region, urging farmers to join the boycott.", role: "stop" },
            { name: "Jambusar", coords: [22.0519, 72.7981], event: "Crossed the Mahi River by boat at night, a critical logistical feat.", role: "stop" },
            { name: "Surat", coords: [21.1702, 72.8311], event: "Addressed a crowd of over 30,000 people on the banks of Tapi river.", role: "stop" },
            { name: "Navsari", coords: [20.9467, 72.9276], event: "Nearing the coast; declared his resolve to return only with independence.", role: "stop" },
            { name: "Dandi", coords: [20.8879, 72.7844], event: "Arrived on April 5; broke the Salt Law at 6:30 AM on April 6, 1930.", role: "end" }
        ]
    },
    {
        id: "round-table",
        title: "Round Table Conference (1931)",
        period: "August – December 1931",
        distance: "8,100 km",
        description: "Gandhi sailed to London aboard the SS Rajputana to attend the Second Round Table Conference as the sole representative of the Indian National Congress. Though the conference yielded little constitutional progress, it established Gandhi on the world stage.",
        stops: [
            { name: "Bombay Harbor", coords: [18.9220, 72.8347], event: "Boarded the SS Rajputana on August 29, 1931.", role: "start" },
            { name: "Aden", coords: [12.7855, 45.0186], event: "Port call; presented with an address by local Indian residents.", role: "stop" },
            { name: "Marseilles", coords: [43.2965, 5.3698], event: "Landed in Europe; met by French journalists and supporters.", role: "stop" },
            { name: "London", coords: [51.5074, -0.1278], event: "Attended the conference; stayed at Kingsley Hall in East London.", role: "end" }
        ]
    },
    {
        id: "noakhali",
        title: "Noakhali Peace Mission (1946-1947)",
        period: "November 1946 – January 1948",
        distance: "2,400 km",
        description: "In response to severe communal violence, Gandhi spent months walking barefoot through the villages of Noakhali (East Bengal) and Bihar, preaching peace, religious unity, and nonviolence, before returning to Delhi in his final months.",
        stops: [
            { name: "Calcutta", coords: [22.5726, 88.3639], event: "Worked to quell the Direct Action Day riots before heading east.", role: "start" },
            { name: "Noakhali", coords: [22.8724, 91.0973], event: "Spent 4 months walking village-to-village to restore communal harmony.", role: "stop" },
            { name: "Patna (Bihar)", coords: [25.5941, 85.1376], event: "Visited riot-affected areas, organizing relief and prayer meetings.", role: "stop" },
            { name: "New Delhi (Birla House)", coords: [28.6125, 77.2099], event: "Returned to Delhi; conducted fasts for peace until his martyrdom on Jan 30, 1948.", role: "end" }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initThemeToggle();
    initSmoothScroll();
    initMobileMenu();
    initCountUp();
    initJourneysMap();
});

/**
 * Activate a tab section by its id (shared by tab bar and hash links)
 */
function activateTab(targetTab) {
    const tabs = document.querySelectorAll('.gandhi-tab');
    const sections = document.querySelectorAll('.gandhi-section');
    if (!tabs.length || !sections.length) return;

    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    const tab = document.querySelector(`.gandhi-tab[data-tab="${targetTab}"]`);
    const section = document.getElementById(targetTab);
    if (tab) tab.classList.add('active');
    if (section) {
        section.classList.add('active');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // If journeys tab is selected, let Leaflet invalidate size to render properly
        if (targetTab === 'journeys' && window.gandhiMapInstance) {
            setTimeout(() => {
                window.gandhiMapInstance.invalidateSize();
                if (window.activePolyline) {
                    window.gandhiMapInstance.fitBounds(window.activePolyline.getBounds(), { padding: [40, 40] });
                }
            }, 300);
        }
    }
}

/**
 * Initialize tab navigation for the explorer sections
 */
function initTabNavigation() {
    const tabs = document.querySelectorAll('.gandhi-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab.dataset.tab));
    });

    // Activate tab from hash if present (e.g. #timeline)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const valid = ['biography', 'timeline', 'journeys', 'movements', 'quotes', 'legacy', 'gallery', 'references'];
        if (valid.includes(hash)) activateTab(hash);
    }
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const body = document.body;
        const isLight = body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';

        if (isLight) {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        }

        // Sync Leaflet map tile layer if map is active
        if (window.updateMapTileLayer) {
            window.updateMapTileLayer(newTheme);
        }
    });
}

/**
 * Update theme toggle icon based on the active theme
 */
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

/**
 * Initialize smooth scroll for internal anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!isExpanded));
            navMenu.classList.toggle('active');
        });
    }
}

/**
 * Animate numeric statistics on the hero banner
 */
function initCountUp() {
    const counters = document.querySelectorAll('.gandhi-count');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                if (isNaN(target)) return;

                let current = 0;
                const increment = Math.max(1, Math.floor(target / 60));
                const update = () => {
                    current += increment;
                    if (current > target) current = target;
                    el.textContent = current;
                    if (current < target) requestAnimationFrame(update);
                };
                update();
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(c => observer.observe(c));
}

/**
 * Initialize Interactive Map Visualizing Gandhi's Journeys
 */
function initJourneysMap() {
    const mapElement = document.getElementById('gandhi-map');
    const dropdown = document.getElementById('journey-select');
    if (!mapElement || typeof L === 'undefined') return;

    // 1. Setup Dropdown Options
    dropdown.innerHTML = window.GANDHI_JOURNEYS.map(j => 
        `<option value="${j.id}">${j.title}</option>`
    ).join('');

    // 2. Initialize Leaflet Map
    const initialViewCoords = [22.9734, 78.6569]; // Center of India
    const map = L.map('gandhi-map', {
        scrollWheelZoom: false,
        zoomControl: true
    }).setView(initialViewCoords, 5);

    window.gandhiMapInstance = map;

    // 3. Define and Manage Tile Layers
    let tileLayer;
    window.updateMapTileLayer = function(theme) {
        if (tileLayer) map.removeLayer(tileLayer);

        const url = theme === 'light' 
            ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

        tileLayer = L.tileLayer(url, { attribution, maxZoom: 19 }).addTo(map);
    };

    const initialTheme = localStorage.getItem('theme') || 'dark';
    window.updateMapTileLayer(initialTheme);

    // 4. Layers Management
    let markerGroup = L.layerGroup().addTo(map);
    window.activePolyline = null;
    let animationIntervals = [];

    // Helper to generate custom icons
    const createCustomMarker = (role, stopName) => {
        let color = '#22c55e'; // Green for normal stops
        if (role === 'start') color = '#ef4444'; // Red for start
        if (role === 'end') color = '#eab308'; // Yellow for end

        return L.divIcon({
            className: 'gandhi-map-marker',
            html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.5);" title="${stopName}"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });
    };

    // Render Active Journey
    function selectJourney(journeyId, animate = false) {
        const journey = window.GANDHI_JOURNEYS.find(j => j.id === journeyId);
        if (!journey) return;

        // Clear animations and current layers
        animationIntervals.forEach(clearInterval);
        animationIntervals = [];
        markerGroup.clearLayers();
        if (window.activePolyline) {
            map.removeLayer(window.activePolyline);
            window.activePolyline = null;
        }

        // Update Info Card
        document.getElementById('journey-title').textContent = journey.title;
        document.getElementById('journey-period').querySelector('.meta-value').textContent = journey.period;
        document.getElementById('journey-distance').querySelector('.meta-value').textContent = journey.distance;
        document.getElementById('journey-description').textContent = journey.description;

        // Update Stops List Sidebar
        const stopsList = document.getElementById('journey-stops-list');
        stopsList.innerHTML = journey.stops.map((stop, i) => `
            <li class="journey-stop-item" data-index="${i}">
                <div class="stop-badge ${stop.role}">${i + 1}</div>
                <div class="stop-info">
                    <strong>${stop.name}</strong>
                    <p>${stop.event}</p>
                </div>
            </li>
        `).join('');

        // Extract coordinates
        const latlngs = journey.stops.map(s => s.coords);

        // Fit Bounds to the Route coordinates
        if (latlngs.length > 0) {
            map.fitBounds(L.latLngBounds(latlngs), { padding: [55, 55] });
        }

        // Trace path animation
        if (animate && latlngs.length > 1) {
            let currentPath = [latlngs[0]];
            window.activePolyline = L.polyline(currentPath, {
                color: '#eab308',
                weight: 4,
                opacity: 0.85,
                dashArray: '5, 8'
            }).addTo(map);

            let index = 1;
            const duration = 1200;
            const intervalTime = duration / latlngs.length;

            const drawInterval = setInterval(() => {
                if (index >= latlngs.length) {
                    clearInterval(drawInterval);
                    window.activePolyline.setLatLngs(latlngs);
                    window.activePolyline.setStyle({ dashArray: null });
                    
                    // Add markers after route drawing is complete
                    addMarkers(journey);
                    return;
                }
                currentPath.push(latlngs[index]);
                window.activePolyline.setLatLngs(currentPath);
                index++;
            }, intervalTime);

            animationIntervals.push(drawInterval);
        } else {
            // Draw static line immediately
            window.activePolyline = L.polyline(latlngs, {
                color: '#eab308',
                weight: 4,
                opacity: 0.9
            }).addTo(map);
            addMarkers(journey);
        }

        // Setup click/hover handlers for sidebar list items
        document.querySelectorAll('.journey-stop-item').forEach(item => {
            const index = parseInt(item.dataset.index, 10);
            const stop = journey.stops[index];

            item.addEventListener('mouseenter', () => {
                map.panTo(stop.coords);
            });

            item.addEventListener('click', () => {
                map.setView(stop.coords, 8);
                // Find corresponding marker in markerGroup and open its popup
                markerGroup.eachLayer(layer => {
                    if (layer.getLatLng().lat === stop.coords[0] && layer.getLatLng().lng === stop.coords[1]) {
                        layer.openPopup();
                    }
                });
            });
        });
    }

    function addMarkers(journey) {
        journey.stops.forEach((stop) => {
            const marker = L.marker(stop.coords, {
                icon: createCustomMarker(stop.role, stop.name)
            });

            marker.bindPopup(`
                <div class="map-popup-content">
                    <strong style="color: var(--gandhi-gold); font-size: 1.1rem; display: block; margin-bottom: 4px;">${stop.name}</strong>
                    <span class="popup-role-tag ${stop.role}">${stop.role.toUpperCase()}</span>
                    <p style="margin: 6px 0 0 0; font-size: 0.9rem; line-height: 1.4; color: var(--gandhi-text-primary);">${stop.event}</p>
                </div>
            `);

            markerGroup.addLayer(marker);
        });
    }

    // Initialize with first journey
    selectJourney(dropdown.value, false);

    // Event listener for Dropdown Selection change
    dropdown.addEventListener('change', (e) => {
        selectJourney(e.target.value, false);
    });

    // Trace Route button click listener
    document.getElementById('btn-play-route').addEventListener('click', () => {
        selectJourney(dropdown.value, true);
    });

    // Invalidate map size on window resize
    window.addEventListener('resize', () => {
        map.invalidateSize();
    });
}