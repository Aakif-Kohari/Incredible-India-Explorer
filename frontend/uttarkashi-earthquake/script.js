(() => {
    window.Journey.registerSearchItems('frontend/uttarkashi-earthquake/index.html', [
        {
            id: 'uttarkashi-earthquake',
            title: '1991 Uttarkashi Earthquake',
            description: 'Document the 1991 Uttarkashi earthquake and Himalayan seismic hazards.',
            link: 'frontend/uttarkashi-earthquake/index.html'
        }
    ]);

    const eventData = {
        magnitude: "M<sub>s</sub> 6.8",
        depth: "15 km",
        epicenter: "Uttarkashi, Garhwal Himalayas",
        time: "08:53:51 IST",
        date: "20 January 1991",
        intensity: "X (Modified Mercalli)",
        fatalities: "1,000+",
        injured: "~5,000+",
        homeless: "~200,000",
        districts: "Uttarkashi, Tehri, Chamoli, Rudraprayag",
        felt_in: "Delhi, Punjab, Haryana, Chandigarh",
        rupture: "10 km",
        aftershocks: "Over 3 months"
    };

    const impactData = {
        houses_damaged: "Over 50,000 fully damaged",
        public_buildings: "Schools, hospitals, temples damaged",
        roads_bridges: "Many destroyed by landslides",
        power_comm: "Severely disrupted in epicentral areas"
    };

    const responseData = {
        army_columns: "20+ deployed",
        ndrf_teams: "10+ stations",
        temporary_shelters: "~50,000 erected",
        medical_camps: "20+ set up",
        air_drops: "Essential supplies to inaccessible villages"
    };

    const lessonsData = [
        "Unreinforced masonry: Highly vulnerable; retrofitting essential",
        "Community training: Search-and-rescue volunteers critical",
        "Building codes: Himalaya-specific requirements needed",
        "Traditional knowledge: Local wisdom on safe construction sites",
        "Early warning systems: Investment in seismic monitoring"
    ];

    const sourcesData = [
        { name: "India Meteorological Department", url: "https://www.imd.gov.in" },
        { name: "Geological Survey of India", url: "https://gsi.gov.in" },
        { name: "National Disaster Response Force", url: "https://ndrf.gov.in" },
        { name: "United States Geological Survey", url: "https://earthquake.usgs.gov" },
        { name: "Indian Institute of Technology Delhi - Himalayan Seismology", url: "https://iitd.ac.in" }
    ];

    // Initialize Leaflet map
    document.addEventListener("DOMContentLoaded", () => {
        initMap();
        initTabs();
        renderSources();
    });

    function initMap() {
        const map = L.map("uttarkashi-map", {
            scrollWheelZoom: false,
            minZoom: 6,
        }).setView([30.73, 78.45], 11);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
            maxZoom: 18,
        }).addTo(map);

        // Epicenter marker
        L.marker([30.73, 78.45], {
            icon: L.icon({
                iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
                shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
                shadowSize: [41, 41],
            }),
        })
            .addTo(map)
            .bindPopup("<strong>Epicenter: Uttarkashi</strong><br>20 January 1991, M 6.8");

        // Affected area circle
        L.circle([30.73, 78.45], {
            radius: 50000,
            color: "#e94560",
            fillColor: "#e94560",
            fillOpacity: 0.1,
        }).addTo(map).bindPopup("Approximate felt area");

        // Map cities marker
        L.marker([28.7041, 77.1025], { icon: L.icon({ iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" }) })
            .addTo(map)
            .bindPopup("<strong>Delhi</strong><br>Felt here>");
    }

    function initTabs() {
        const tabButtons = document.querySelectorAll(".tab-btn");
        const tabPanels = document.querySelectorAll(".tab-panel");

        tabButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const target = btn.getAttribute("data-tab");

                tabButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                tabPanels.forEach((panel) => {
                    panel.classList.toggle("active", panel.id === "tab-" + target);
                });
            });
        });
    }

    function renderSources() {
        const sourcesGrid = document.querySelector(".uttarkashi-sources .three");
        if (!sourcesGrid) return;

        sourcesGrid.innerHTML = "";

        sourcesData.forEach((source, index) => {
            const panel = document.createElement("div");
            panel.className = "panel";
            panel.innerHTML = `
                <h3>${source.name}</h3>
                <ul>
                    <li><a href="${source.url}" target="_blank" rel="noopener">View full report</a></li>
                </ul>
            `;
            sourcesGrid.appendChild(panel);
        });
    }
})();