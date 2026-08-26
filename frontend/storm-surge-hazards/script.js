/**
 * Explore Storm-Surge Hazards Along India's Coast
 * Core Interactive Logic & Oceanographic Data System
 * Incredible India Explorer
 */

export const STORM_SURGE_DATA = {
    title: "Explore Storm-Surge Hazards Along India's Coast",
    subtitle: "Understanding Bathymetry, Tidal Funneling, Cyclonic Surges, and Coastal Protection Infrastructure Across India's 7,516 km Coastline",
    coastlineLength: "7,516 km",
    bayOfBengalShare: "80%+",
    maxHistoricalSurge: "10.0 meters",
    vulnerablePopulation: "~250 Million",

    mechanics: [
        {
            id: "wind-stress",
            title: "Wind Stress & Setup",
            icon: "💨",
            summary: "Extreme cyclonic winds push massive surface water volumes toward the shore.",
            description: "As tropical cyclones intensify over open ocean waters, high-velocity sustained winds transfer massive mechanical momentum to the sea surface. As the storm approaches shallow coastal waters, this ocean volume has nowhere to descend, piling up into a water wall pushed onshore."
        },
        {
            id: "barometric-pressure",
            title: "Inverse Barometric Effect",
            icon: "📉",
            summary: "Drop in atmospheric pressure causes sea levels to bulge beneath storm center.",
            description: "For every 1 millibar (hPa) drop in atmospheric pressure below normal sea-level pressure (1013 hPa), the sea surface rises approximately 1 centimeter. In intense super cyclones with central pressures dropping below 920 hPa, this effect alone raises sea level by nearly 1 meter."
        },
        {
            id: "bathymetry-shelf",
            title: "Continental Shelf Bathymetry",
            icon: "🏖️",
            summary: "Shallow, gently sloping seabeds dramatically amplify surge heights.",
            description: "A shallow, wide continental shelf (such as in the Bay of Bengal off West Bengal and Odisha) restricts water from escaping downward or sideways, forcing sea levels to surge higher onto land. Steeper shelves (like India's West Coast) allow ocean energy to dissipate downward."
        },
        {
            id: "astronomical-tide",
            title: "Tidal Phase Funneling",
            icon: "🌕",
            summary: "Coincidence with Spring High Tide creates devastating 'Storm Tides'.",
            description: "When a storm surge landfall coincides with a astronomical Spring High Tide (during full or new moon), the resulting combined water level—termed a Storm Tide—can reach catastrophic heights of 5 to 10 meters above mean sea level."
        },
        {
            id: "coastal-geometry",
            title: "Estuarine & Bay Geometry",
            icon: "🗾",
            summary: "V-shaped bays and river estuaries squeeze water upward.",
            description: "Concave coastlines, shallow river estuaries (e.g., Hooghly, Mahanadi, Godavari deltas), and narrow inlets funnel incoming surge water, progressively compressing the wave volume and forcing peak heights higher as the water drives inland."
        }
    ],

    coastalZones: [
        {
            id: "west-bengal",
            state: "West Bengal & Sundarbans",
            region: "East Coast (Bay of Bengal)",
            riskLevel: "Very High",
            riskColor: "#ef4444",
            lat: 21.70,
            lng: 88.35,
            avgShelfDepth: "< 20 m (Extremely Shallow)",
            peakHistoricalSurge: "10.0 m (1737 / 1970)",
            keyFactors: "Vast tidal mangrove mudflats, shallow Bay head, Hooghly estuarine funneling.",
            description: "The head of the Bay of Bengal features one of the shallowest continental shelves on Earth. Coupled with complex river networks in the Sundarbans delta, surges penetrate tens of kilometers inland, inundating freshwater ecosystems and island habitations."
        },
        {
            id: "odisha",
            state: "Odisha (Paradip & Balasore)",
            region: "East Coast (Bay of Bengal)",
            riskLevel: "Very High",
            riskColor: "#ef4444",
            lat: 20.27,
            lng: 86.67,
            avgShelfDepth: "15–30 m (Shallow)",
            peakHistoricalSurge: "7.0–10.0 m (1999 Odisha Super Cyclone)",
            keyFactors: "Frequent landfalling severe cyclones, wide shelf, low-lying coastal plains.",
            description: "Odisha's coastal stretch from Balasore to Ganjam bears the brunt of Bay of Bengal cyclones. The 1999 Super Cyclone submerged coastal belts up to 20 km inland, prompting Odisha to create India's most advanced disaster management authority (OSDMA)."
        },
        {
            id: "andhra-pradesh",
            state: "Andhra Pradesh (Diviseema & Kakinada)",
            region: "East Coast (Bay of Bengal)",
            riskLevel: "Very High",
            riskColor: "#ef4444",
            lat: 16.15,
            lng: 81.13,
            avgShelfDepth: "20–40 m (Shallow to Moderate)",
            peakHistoricalSurge: "5.0–6.0 m (1977 Diviseema Cyclone)",
            keyFactors: "Krishna-Godavari deltas, low elevation coastal barrier spits.",
            description: "The Krishna and Godavari deltaic coastlines are highly susceptible to severe storm surge inundation. In 1977, a 5-meter surge swept over Diviseema island, resulting in over 10,000 casualties and reshaping coastal safety policies."
        },
        {
            id: "tamil-nadu",
            state: "Tamil Nadu & Puducherry",
            region: "East Coast (Bay of Bengal)",
            riskLevel: "High",
            riskColor: "#f97316",
            lat: 11.93,
            lng: 79.83,
            avgShelfDepth: "30–50 m (Moderate)",
            peakHistoricalSurge: "3.5–4.5 m (1964 Rameswaram / 2018 Gaja)",
            keyFactors: "Coromandel coast vulnerability, Cauvery delta lowlands, Palk Strait dynamics.",
            description: "Stretching along the Coromandel coast, northern Tamil Nadu and Puducherry experience severe surges during the North-East Monsoon season (October–December), threatening dense coastal settlements and historic port towns."
        },
        {
            id: "gujarat",
            state: "Gujarat (Gulf of Kutch & Khambhat)",
            region: "West Coast (Arabian Sea)",
            riskLevel: "High",
            riskColor: "#f97316",
            lat: 22.47,
            lng: 70.06,
            avgShelfDepth: "Shallow in Gulfs (10–30 m)",
            peakHistoricalSurge: "3.0–5.0 m (1998 Kandla / 2023 Biparjoy)",
            keyFactors: "Extreme astronomical tide ranges (up to 11m in Khambhat), shallow gulfs.",
            description: "While the Arabian Sea experiences fewer tropical cyclones than the Bay of Bengal, Gujarat's unique gulf geometry (Kutch and Khambhat) acts as a tidal amplifier, producing severe surges when storms enter the narrow waterways."
        },
        {
            id: "maharashtra",
            state: "Maharashtra & Mumbai",
            region: "West Coast (Arabian Sea)",
            riskLevel: "Moderate",
            riskColor: "#eab308",
            lat: 18.96,
            lng: 72.82,
            avgShelfDepth: "40–70 m (Moderate to Steeper)",
            peakHistoricalSurge: "1.5–2.5 m (2020 Nisarga / 2021 Tauktae)",
            keyFactors: "High urban population density, sea-level rise, urban estuarine flooding.",
            description: "The Konkan coastline features steeper continental slopes that limit extreme offshore surge heights, but dense urban coastal infrastructure in Mumbai makes even moderate surges (1.5-2.5m) coupled with extreme rainfall high-impact events."
        },
        {
            id: "kerala",
            state: "Kerala (Malabar Coast)",
            region: "West Coast (Arabian Sea)",
            riskLevel: "Moderate",
            riskColor: "#eab308",
            lat: 9.93,
            lng: 76.26,
            avgShelfDepth: "50–80 m (Steep Slope)",
            peakHistoricalSurge: "1.0–2.0 m (2017 Ockhi / 2021 Tauktae)",
            keyFactors: "Coastal erosion, seawall degradation, high coastal residential density.",
            description: "Kerala's steep continental shelf prevents massive storm surges, but high swell waves, sea erosion, and climate-driven monsoon surges cause significant damage to fishing villages and coastal roads."
        }
    ],

    historicalEvents: [
        {
            year: "1970",
            name: "Bhola Cyclone",
            basin: "Bay of Bengal",
            maxSurge: "6.0 – 10.0 meters",
            windSpeed: "225 km/h",
            landfall: "Ganges-Brahmaputra Delta (West Bengal / Bangladesh)",
            impact: "World's deadliest tropical cyclone on record, claiming 300,000–500,000 lives across the low-lying delta due to massive wall of water driven at high spring tide.",
            category: "Super Cyclone",
            badgeColor: "critical"
        },
        {
            year: "1977",
            name: "Andhra Pradesh Cyclone",
            basin: "Bay of Bengal",
            maxSurge: "5.0 – 6.0 meters",
            windSpeed: "230 km/h",
            landfall: "Diviseema, Krishna District, Andhra Pradesh",
            impact: "Swept over 100 coastal villages in Diviseema. Over 10,000 human casualties and massive livestock losses led to early warning modernization in South India.",
            category: "Super Cyclone",
            badgeColor: "critical"
        },
        {
            year: "1998",
            name: "Kandla Cyclone",
            basin: "Arabian Sea",
            maxSurge: "3.5 – 5.0 meters",
            windSpeed: "195 km/h",
            landfall: "Kandla Port, Gulf of Kutch, Gujarat",
            impact: "Surge inundated Kandla port and salt pans, causing over 3,000 fatalities among port workers and residents. Highlighted Arabian Sea surge risks.",
            category: "Very Severe Cyclonic Storm",
            badgeColor: "warning"
        },
        {
            year: "1999",
            name: "Odisha Super Cyclone",
            basin: "Bay of Bengal",
            maxSurge: "7.0 – 10.0 meters",
            windSpeed: "260 km/h",
            landfall: "Paradip, Jagatsinghpur, Odisha",
            impact: "Penetrated 20 km inland, flooding 12 coastal districts and killing ~10,000 people. Accelerated creation of Odisha State Disaster Management Authority (OSDMA).",
            category: "Super Cyclone",
            badgeColor: "critical"
        },
        {
            year: "2013",
            name: "Cyclone Phailin",
            basin: "Bay of Bengal",
            maxSurge: "3.0 – 3.5 meters",
            windSpeed: "215 km/h",
            landfall: "Ganjam, Odisha",
            impact: "Landmark evacuation success: over 1 million people safely evacuated to multipurpose shelters, drastically minimizing surge mortality to under 50.",
            category: "Very Severe Cyclonic Storm",
            badgeColor: "success"
        },
        {
            year: "2020",
            name: "Super Cyclone Amphan",
            basin: "Bay of Bengal",
            maxSurge: "4.0 – 5.0 meters",
            windSpeed: "240 km/h",
            landfall: "Bakkhali, Sundarbans, West Bengal",
            impact: "Costliest storm in North Indian Ocean ($13B+). Inundated Sundarbans island communities, breached river embankments, and flooded coastal Kolkata.",
            category: "Super Cyclone",
            badgeColor: "critical"
        },
        {
            year: "2021",
            name: "Cyclone Tauktae",
            basin: "Arabian Sea",
            maxSurge: "3.0 – 4.0 meters",
            windSpeed: "185 km/h",
            landfall: "Una / Diu, Saurashtra, Gujarat",
            impact: "Rare high-intensity Arabian Sea storm that battered the western seaboard from Kerala to Gujarat, causing major industrial and coastal port surge damage.",
            category: "Extremely Severe Cyclonic Storm",
            badgeColor: "warning"
        },
        {
            year: "2023",
            name: "Cyclone Biparjoy",
            basin: "Arabian Sea",
            maxSurge: "2.5 – 3.5 meters",
            windSpeed: "140 km/h",
            landfall: "Jakhau, Kutch, Gujarat",
            impact: "Longest-lasting cyclone in Arabian Sea history. High astronomical tide synchronization flooded low-lying coastal ports and salt flats in Kutch.",
            category: "Very Severe Cyclonic Storm",
            badgeColor: "info"
        }
    ],

    quizQuestions: [
        {
            question: "Why is the Bay of Bengal significantly more prone to devastating storm surges than the Arabian Sea?",
            options: [
                "Because the Bay of Bengal has higher water temperature only",
                "Because of its shallow continental shelf, funneling concave geometry, and high astronomical tides",
                "Because the Arabian Sea never experiences tropical cyclones",
                "Because the East Coast has no coastal mountains"
            ],
            correct: 1,
            explanation: "The Bay of Bengal combines a very shallow continental shelf, a concave V-shaped coastal shape that funnels water, and high astronomical tides, resulting in extreme surge amplification."
        },
        {
            question: "What is a 'Storm Tide'?",
            options: [
                "A normal high tide caused by the full moon",
                "The combined total water height of an atmospheric storm surge and astronomical tide",
                "A tsunami caused by underwater sea earthquakes",
                "A river flood caused purely by monsoon rain"
            ],
            correct: 1,
            explanation: "A Storm Tide occurs when the storm surge generated by cyclonic winds and low pressure coincides with the regular astronomical high tide, leading to maximum water levels onshore."
        },
        {
            question: "How does dense mangrove vegetation buffer coastal villages against storm surges?",
            options: [
                "By heating up sea water to stop storm winds",
                "By physically attenuating wave energy and dissipating water momentum through dense root networks",
                "By creating rain clouds over the ocean",
                "By changing the atmospheric barometric pressure"
            ],
            correct: 1,
            explanation: "Dense stilt root structures of mangroves create hydraulic resistance, reducing wave heights by up to 66% across a 100m mangrove belt."
        },
        {
            question: "Which Indian organization is responsible for ocean state and storm surge inundation modeling forecasts?",
            options: [
                "ISRO (Indian Space Research Organisation)",
                "INCOIS (Indian National Centre for Ocean Information Services)",
                "NDRF (National Disaster Response Force)",
                "CSIR (Council of Scientific and Industrial Research)"
            ],
            correct: 1,
            explanation: "INCOIS in Hyderabad operates India's operational storm surge and coastal inundation prediction models (ADCIRC & SCHISM)."
        }
    ]
};

// Application State & Interactive Logic Initialization
document.addEventListener("DOMContentLoaded", () => {
    initSimulator();
    initMap();
    renderTimeline("all");
    initTabs();
    initQuiz();
    initThemeToggle();
    initMobileNav();
});

// Interactive Surge Simulator Functionality
function initSimulator() {
    const windInput = document.getElementById("sim-wind");
    const shelfInput = document.getElementById("sim-shelf");
    const tideInput = document.getElementById("sim-tide");

    const windValSpan = document.getElementById("val-wind");
    const shelfValSpan = document.getElementById("val-shelf");
    const tideValSpan = document.getElementById("val-tide");

    const surgeResultElem = document.getElementById("surge-height-result");
    const inundationResultElem = document.getElementById("inundation-result");
    const riskBadgeElem = document.getElementById("surge-risk-badge");
    const advisoryElem = document.getElementById("surge-advisory");

    if (!windInput || !shelfInput || !tideInput) return;

    function calculateSurge() {
        const windKmH = parseInt(windInput.value, 10);
        const shelfType = shelfInput.value;
        const tideType = tideInput.value;

        windValSpan.textContent = `${windKmH} km/h`;

        let shelfLabel = "Shallow (<25m)";
        let shelfFactor = 1.6;
        if (shelfType === "moderate") {
            shelfLabel = "Moderate (25-60m)";
            shelfFactor = 1.0;
        } else if (shelfType === "steep") {
            shelfLabel = "Steep (>60m)";
            shelfFactor = 0.55;
        }
        shelfValSpan.textContent = shelfLabel;

        let tideLabel = "Neap Low (+0.5m)";
        let tideAddition = 0.5;
        if (tideType === "mean") {
            tideLabel = "Mean Tide (+1.8m)";
            tideAddition = 1.8;
        } else if (tideType === "spring") {
            tideLabel = "Spring High (+3.8m)";
            tideAddition = 3.8;
        }
        tideValSpan.textContent = tideLabel;

        const baseSurge = Math.pow(windKmH / 100, 2.1) * 0.95 * shelfFactor;
        const totalStormTide = Math.min(11.5, baseSurge + tideAddition);
        const estimatedInundationKm = Math.min(25, (totalStormTide * 1.8 * (shelfType === 'shallow' ? 1.4 : 0.8))).toFixed(1);

        surgeResultElem.textContent = `${totalStormTide.toFixed(1)} m`;
        inundationResultElem.textContent = `~${estimatedInundationKm} km`;

        if (totalStormTide >= 6.5) {
            riskBadgeElem.textContent = "CRITICAL / CATASTROPHIC SURGE RISK";
            riskBadgeElem.className = "risk-pill critical";
            advisoryElem.innerHTML = "<strong>Mandatory Evacuation Level:</strong> Catastrophic inundation likely to submerge entire coastal islands and 2-storey structures. Immediate evacuation inland to elevated shelters required.";
        } else if (totalStormTide >= 3.8) {
            riskBadgeElem.textContent = "HIGH SURGE HAZARD";
            riskBadgeElem.className = "risk-pill high";
            advisoryElem.innerHTML = "<strong>High Evacuation Level:</strong> Surge water will breach sea embankments, flooding low-lying coastal villages, roads, and port infrastructure up to several kilometers.";
        } else if (totalStormTide >= 2.0) {
            riskBadgeElem.textContent = "MODERATE SURGE HAZARD";
            riskBadgeElem.className = "risk-pill moderate";
            advisoryElem.innerHTML = "<strong>Coastal Alert:</strong> Moderate wave setup and tidal flooding along beaches, low bunds, and fishing harbors. Small craft should remain harbored.";
        } else {
            riskBadgeElem.textContent = "LOW SURGE IMPACT";
            riskBadgeElem.className = "risk-pill low";
            advisoryElem.innerHTML = "<strong>Minor Surge Level:</strong> Minimal sea inundation confined to immediate intertidal beaches.";
        }
    }

    windInput.addEventListener("input", calculateSurge);
    shelfInput.addEventListener("change", calculateSurge);
    tideInput.addEventListener("change", calculateSurge);

    calculateSurge();
}

// Leaflet Map Initialization
function initMap() {
    const mapElem = document.getElementById("surge-map");
    if (!mapElem || typeof L === "undefined") return;

    const map = L.map("surge-map", {
        center: [18.5, 80.5],
        zoom: 5,
        scrollWheelZoom: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    STORM_SURGE_DATA.coastalZones.forEach(zone => {
        const marker = L.circleMarker([zone.lat, zone.lng], {
            radius: zone.riskLevel === "Very High" ? 12 : (zone.riskLevel === "High" ? 10 : 8),
            fillColor: zone.riskColor,
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85
        }).addTo(map);

        const popupContent = `
            <div class="map-popup-card">
                <span class="popup-badge" style="background:${zone.riskColor}">${zone.riskLevel} Risk</span>
                <h3>${zone.state}</h3>
                <p><strong>Region:</strong> ${zone.region}</p>
                <p><strong>Shelf Depth:</strong> ${zone.avgShelfDepth}</p>
                <p><strong>Peak Historic Surge:</strong> ${zone.peakHistoricalSurge}</p>
                <p class="popup-desc">${zone.description}</p>
            </div>
        `;
        marker.bindPopup(popupContent);
    });
}

// Historical Timeline Renderer
function renderTimeline(filterCategory) {
    const container = document.getElementById("timeline-cards-container");
    if (!container) return;

    container.innerHTML = "";

    const eventsToDisplay = STORM_SURGE_DATA.historicalEvents.filter(ev => {
        if (filterCategory === "all") return true;
        if (filterCategory === "bay") return ev.basin.includes("Bay of Bengal");
        if (filterCategory === "arabian") return ev.basin.includes("Arabian Sea");
        if (filterCategory === "super") return ev.category === "Super Cyclone";
        return true;
    });

    eventsToDisplay.forEach(ev => {
        const card = document.createElement("div");
        card.className = "timeline-card";

        let badgeClass = "badge-info";
        if (ev.badgeColor === "critical") badgeClass = "badge-critical";
        if (ev.badgeColor === "warning") badgeClass = "badge-warning";
        if (ev.badgeColor === "success") badgeClass = "badge-success";

        card.innerHTML = `
            <div class="timeline-header">
                <span class="event-year">${ev.year}</span>
                <span class="badge ${badgeClass}">${ev.category}</span>
            </div>
            <h3 class="event-name">${ev.name}</h3>
            <div class="event-meta">
                <span>📍 ${ev.landfall}</span>
                <span>🌊 Max Surge: <strong>${ev.maxSurge}</strong></span>
                <span>💨 Winds: ${ev.windSpeed}</span>
            </div>
            <p class="event-impact">${ev.impact}</p>
        `;
        container.appendChild(card);
    });

    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderTimeline(e.target.dataset.filter);
        });
    });
}

// Interactive Tabs Logic
function initTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove("active"));
            tabPanes.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.classList.add("active");
        });
    });
}

// Interactive Quiz Module
function initQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    if (!quizContainer) return;

    quizContainer.innerHTML = "";

    STORM_SURGE_DATA.quizQuestions.forEach((q, qIndex) => {
        const qCard = document.createElement("div");
        qCard.className = "quiz-card";

        let optionsHtml = "";
        q.options.forEach((opt, optIndex) => {
            optionsHtml += `
                <button class="quiz-option" data-q="${qIndex}" data-opt="${optIndex}">
                    ${opt}
                </button>
            `;
        });

        qCard.innerHTML = `
            <h4>Q${qIndex + 1}: ${q.question}</h4>
            <div class="quiz-options">${optionsHtml}</div>
            <div class="quiz-feedback hidden" id="feedback-${qIndex}"></div>
        `;
        quizContainer.appendChild(qCard);
    });

    quizContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("quiz-option")) return;

        const btn = e.target;
        const qIndex = parseInt(btn.dataset.q, 10);
        const optIndex = parseInt(btn.dataset.opt, 10);
        const qData = STORM_SURGE_DATA.quizQuestions[qIndex];
        const feedbackElem = document.getElementById(`feedback-${qIndex}`);

        const siblingBtns = btn.parentElement.querySelectorAll(".quiz-option");
        siblingBtns.forEach(b => {
            b.disabled = true;
            b.classList.remove("selected", "correct", "wrong");
        });

        if (optIndex === qData.correct) {
            btn.classList.add("correct");
            feedbackElem.className = "quiz-feedback success";
            feedbackElem.innerHTML = `<strong>Correct!</strong> ${qData.explanation}`;
        } else {
            btn.classList.add("wrong");
            siblingBtns[qData.correct].classList.add("correct");
            feedbackElem.className = "quiz-feedback error";
            feedbackElem.innerHTML = `<strong>Incorrect.</strong> ${qData.explanation}`;
        }
        feedbackElem.classList.remove("hidden");
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-theme");
        const newTheme = isLight ? "light" : "dark";
        localStorage.setItem("theme", newTheme);

        try {
            const iieStorage = JSON.parse(localStorage.getItem("iie_storage") || "{}");
            iieStorage.theme = newTheme;
            localStorage.setItem("iie_storage", JSON.stringify(iieStorage));
        } catch (e) {}

        toggleBtn.setAttribute("aria-label", `Switch to ${isLight ? 'dark' : 'light'} mode`);
    });
}

// Mobile Navigation Toggle
function initMobileNav() {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const expanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !expanded);
            navMenu.classList.toggle("active");
        });
    }
}
