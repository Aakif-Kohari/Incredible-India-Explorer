/**
 * Explore Landslide Hazards of the Himalayas
 * Core Interactive Logic & Geotectonic Data System
 * Incredible India Explorer
 */

export const LANDSLIDE_DATA = {
    title: "Explore Landslide Hazards of the Himalayas",
    subtitle: "Understanding Active Tectonic Thrust Faults, Pore Water Pressure Physics, GSI Susceptibility Mapping, Bio-Engineering, and Early Warnings",
    himalayanShare: "~66% of India's Total Landslides",
    susceptibleLandArea: "12.6% of India (~4.2 Lakh km²)",
    gsiMappingScale: "1:50,000 NLSM",
    annualFatalities: "~300+ Deaths/Yr",

    mechanics: [
        {
            id: "tectonic-thrusting",
            title: "Active Tectonic Thrust Faults",
            icon: "🌋",
            summary: "Active crustal shortening (~5 mm/yr) along the MFT, MBT, and MCT crushes and fractures Himalayan rock strata.",
            description: "The northward collision of the Indian Plate into the Eurasian Plate drives active mountain building. Major fault boundaries—Main Frontal Thrust (MFT), Main Boundary Thrust (MBT), and Main Central Thrust (MCT)—continuously shear, crush, and fracture bedded rocks (phyllites, shales, schists), creating inherently unstable steep slopes."
        },
        {
            id: "pore-water-pressure",
            title: "Pore Water Pressure Saturation",
            icon: "🌧️",
            summary: "Heavy monsoon rain infiltrates soil pores, reducing effective normal stress and causing shear failure.",
            description: "During intense monsoonal downpours and cloudbursts, rain water rapidly infiltrates un-drained slope soils and rock fractures. Rising pore water pressure ($u$) counteracts grain-to-grain friction, drastically reducing effective shear strength ($\tau = c + (\sigma - u)\tan\phi$) until gravity triggers mass slope collapse."
        },
        {
            id: "debris-flows-slumps",
            title: "Types of Mass Movement",
            icon: "🏔️",
            summary: "Debris flows, rockfalls, rotational slumps, block slides, and Landslide Dam Outburst Floods (LDOFs).",
            description: "Himalayan slope failures range from rapid, liquid debris flows (slurry of mud, boulders, and trees moving at 40-60 km/h) to massive rockfalls, rotational soil slumps, and catastrophic river damming events (LDOFs) where landslide debris blocks mountain rivers until the dam breaches."
        },
        {
            id: "toe-undercutting",
            title: "Toe Undercutting & Anthropogenic Triggers",
            icon: "🏗️",
            summary: "Unplanned road cutting, river scour, and deforestation destabilize the toe support of steep slopes.",
            description: "Sub-cutting the base (toe) of steep slopes for highway widening or building construction removes crucial mechanical support. Combined with river bank scour during monsoon floods and loss of root-binding cohesion due to deforestation, slope failure becomes inevitable."
        },
        {
            id: "seismic-shaking",
            title: "Seismic Ground Shaking",
            icon: "📉",
            summary: "Earthquake ground accelerations loosen fractured rock masses, triggering widespread co-seismic landslides.",
            description: "Moderate to strong earthquakes along Himalayan faults impart dynamic horizontal accelerations that instantly exceed slope shear limits. Co-seismic landslides can destabilize thousands of mountain slopes simultaneously, blocking river channels and road networks."
        }
    ],

    corridors: [
        {
            id: "joshimath",
            name: "Joshimath & Alaknanda Valley",
            region: "Uttarakhand (Garhwal Himalayas)",
            altitude: "1,890 m",
            riskLevel: "Critical Risk (Very High)",
            riskColor: "#ef4444",
            lat: 30.55,
            lng: 79.57,
            primaryGeology: "Re-consolidated ancient landslide debris over Main Central Thrust (MCT).",
            description: "Gateway to Badrinath and Hemkund Sahib. The town is built on ancient scree and landslide deposits. Unplanned slope cutting, lack of drainage, and toe erosion by the Alaknanda River led to severe land subsidence and structural cracking in 2023."
        },
        {
            id: "ramban-nh44",
            name: "Ramban-Banihal Stretch (NH-44)",
            region: "Jammu & Kashmir (Pir Panjal Range)",
            altitude: "1,150 m – 1,700 m",
            riskLevel: "Critical Risk (Very High)",
            riskColor: "#ef4444",
            lat: 33.24,
            lng: 75.24,
            primaryGeology: "Highly fractured, weathered shales and phyllites along the Panjal Thrust.",
            description: "The sole land arterial highway linking Jammu to Kashmir Valley. Notorious for frequent debris flows, mudslides, and shooting stones at Panthial, Marog, and Seri that block national logistics for days during rains."
        },
        {
            id: "kinnaur-nigulsari",
            name: "Kinnaur & Sutlej Valley (NH-5)",
            region: "Himachal Pradesh",
            altitude: "2,300 m",
            riskLevel: "Critical Risk (Very High)",
            riskColor: "#ef4444",
            lat: 31.57,
            lng: 78.10,
            primaryGeology: "Vertical gneiss and schist cliffs subjected to severe frost wedging.",
            description: "Known as the Hindustan-Tibet Road, vertical mountain cuts along the Sutlej gorge suffer massive rockfalls. In August 2021, a devastating rockslide at Nigulsari crushed vehicles, killing 28 people."
        },
        {
            id: "kedarnath-mandakini",
            name: "Kedarnath & Mandakini Valley",
            region: "Uttarakhand",
            altitude: "1,900 m – 3,580 m",
            riskLevel: "Critical Risk (Very High)",
            riskColor: "#ef4444",
            lat: 30.73,
            lng: 79.06,
            primaryGeology: "Moraine debris and glacial outwash deposits in steep river valleys.",
            description: "Site of the 2013 catastrophe where extreme cloudburst rainfall triggered massive debris flows from Chorabari Lake and surrounding valley walls, obliterating Rambara and damaging Kedarnath town."
        },
        {
            id: "shimla-urban",
            name: "Shimla & Solan Hill Slope Belt",
            region: "Himachal Pradesh (Outer Himalayas)",
            altitude: "2,200 m",
            riskLevel: "High Risk (High)",
            riskColor: "#f97316",
            lat: 31.10,
            lng: 77.17,
            primaryGeology: "Weathered Jutogh phyllites and mica schists on steep urban slopes.",
            description: "Dense multi-storey urban construction on steep phyllite slopes lacking stormwater drainage led to catastrophic slope collapses during the 2023 monsoon, including the Shiv Temple landslide."
        },
        {
            id: "teesta-valley",
            name: "Teesta River Valley & Darjeeling",
            region: "Sikkim & West Bengal (Eastern Himalayas)",
            riskLevel: "High Risk (High)",
            riskColor: "#f97316",
            lat: 27.04,
            lng: 88.26,
            primaryGeology: "Sheared Daling series phyllites and heavy monsoonal moisture.",
            description: "Receives extreme annual rainfall (>3,000 mm). Steep cuts along the Gangtok-Siliguri NH-10 experience recurring debris flows and mudslides that isolate Sikkim during peak monsoon."
        }
    ],

    historicalEvents: [
        {
            year: "1998",
            name: "Malpa Rockfall Tragedy",
            location: "Malpa, Pithoragarh District, Uttarakhand",
            impact: "A massive rockfall of over 1 million m³ crushed the village of Malpa along the Kailash-Mansarovar Yatra route, killing 220 people including noted dancer Protima Bedi.",
            category: "Catastrophic Rockfall",
            badgeColor: "critical"
        },
        {
            year: "2013",
            name: "Kedarnath Disaster & Mandakini Debris Flows",
            location: "Kedarnath & Mandakini River Valley, Uttarakhand",
            impact: "Extreme cloudburst rainfall triggered hundreds of simultaneous debris flows and a glacial lake breach, killing over 5,700 people and destroying valley infrastructure.",
            category: "Cloudburst Debris Flow",
            badgeColor: "critical"
        },
        {
            year: "2021",
            name: "Kinnaur Nigulsari Rockslide Disaster",
            location: "Nigulsari, Kinnaur District, Himachal Pradesh",
            impact: "A vertical cliff face along NH-5 collapsed without warning, burying an HP Roadways bus and several light vehicles under thousands of tons of rock, claiming 28 lives.",
            category: "Vertical Rock Mass Failure",
            badgeColor: "critical"
        },
        {
            year: "2023",
            name: "Joshimath Land Subsidence & Cracking Crisis",
            location: "Joshimath, Chamoli District, Uttarakhand",
            impact: "Widespread slope creep and land subsidence caused structural cracks in over 860 buildings, forcing evacuation of entire wards built on ancient landslide debris.",
            category: "Deep-Seated Slope Subsidence",
            badgeColor: "warning"
        }
    ],

    regionalSectors: {
        western: {
            title: "Western Himalayas (Jammu & Kashmir)",
            geology: "Fractured shales, sandstones, Panjal volcanics along active thrusts",
            rainfallPattern: "Heavy winter snow & monsoon rain (NH-44 Ramban corridor)",
            vulnerability: "Critical Risk — Frequent shooting stones, mudslides, and road blockages",
            primaryDriver: "Seismic weakness, dip-slope rock cutting, and intense monsoonal pore pressure"
        },
        northWestern: {
            title: "North-Western Himalayas (Himachal Pradesh)",
            geology: "Weathered phyllites, schists, gneisses in steep river gorges (Sutlej/Beas)",
            rainfallPattern: "Severe monsoonal downpours & cloudbursts (July – August)",
            vulnerability: "High Risk — Vertical rockfalls, urban hill slope collapse (Shimla, Kinnaur)",
            primaryDriver: "Unplanned urban construction, toe river erosion, and intense cloudburst rainfall"
        },
        centralEastern: {
            title: "Central & Eastern Himalayas (Uttarakhand, Sikkim, Darjeeling)",
            geology: "Crushed MCT phyllites, moraines, Daling slate series",
            rainfallPattern: "Extreme annual monsoon rainfall (>2,500 – 3,500 mm)",
            vulnerability: "Critical Risk — Deep-seated landslides, land subsidence (Joshimath, Teesta)",
            primaryDriver: "Ancient landslide debris loading, toe river scour, and cloudburst saturation"
        }
    },

    earlyWarningTech: [
        {
            title: "GSI National Landslide Susceptibility Mapping (NLSM)",
            category: "National Hazard Mapping",
            icon: "🗺️",
            description: "The Geological Survey of India (GSI) completed 1:50,000 scale NLSM mapping across 4.2 lakh km² of hill areas, classifying slope zones into High, Moderate, and Low susceptibility."
        },
        {
            title: "Rainfall Threshold Early Warning Systems (EWS)",
            category: "Real-Time Forecasting",
            icon: "📡",
            description: "Developed by GSI and IIT Roorkee, regional EWS models correlate real-time rainfall data with slope saturation limits to issue automated 24-to-48 hour landslide warnings."
        },
        {
            title: "Bio-Engineering & Vetiver Grass Planting",
            category: "Nature-Based Solution",
            icon: "🌿",
            description: "Deep-rooting Vetiver grass planted along terrace slopes forms dense root networks penetrating 3-4 meters into soil, binding loose topsoil and reducing rain infiltration."
        },
        {
            title: "Rock Bolting, Shotcreting & Sub-Surface Drains",
            category: "Engineering Mitigation",
            icon: "🏗️",
            description: "High-tensile wire mesh netting, steel rock anchor bolts, pneumatically sprayed concrete (shotcrete), and perforated sub-surface drain pipes relieve pore pressure and anchor loose rock masses."
        }
    ],

    quizQuestions: [
        {
            question: "What physical mechanism causes monsoon rainfall to trigger massive Himalayan landslides?",
            options: [
                "Rain water freezes on the rocks",
                "Rising pore water pressure inside soil/rock pores counteracts friction, drastically reducing shear strength",
                "Rain water changes the chemical color of rocks",
                "Rain water creates magnetic fields in the soil"
            ],
            correct: 1,
            explanation: "Rain water infiltrating loose slope soil increases internal pore water pressure, which reduces effective normal stress and grain-to-grain friction, causing gravity to collapse the slope."
        },
        {
            question: "Why was the town of Joshimath in Uttarakhand severely affected by land subsidence in 2023?",
            options: [
                "It was struck by a volcanic eruption",
                "It is built on ancient, unconsolidated landslide debris subjected to toe river erosion and lack of drainage",
                "It has no mountains around it",
                "Because of heavy snowfall only"
            ],
            correct: 1,
            explanation: "Joshimath sits on ancient re-consolidated landslide deposits. Over-construction, lack of proper drainage, and toe river erosion by the Alaknanda destabilized the ancient debris foundation."
        },
        {
            question: "Which primary government agency in India is responsible for National Landslide Susceptibility Mapping (NLSM)?",
            options: [
                "GSI (Geological Survey of India)",
                "ISRO",
                "NDRF",
                "IMD"
            ],
            correct: 0,
            explanation: "The Geological Survey of India (GSI) has mapped over 4.2 lakh km² of hill areas under its NLSM initiative to identify landslide hazard zones."
        },
        {
            question: "What is a 'Factor of Safety ($F_s$)' value that indicates an unstable slope on the verge of failure?",
            options: [
                "Fs > 3.0",
                "Fs < 1.0",
                "Fs = 10.0",
                "Fs = 5.0"
            ],
            correct: 1,
            explanation: "The Factor of Safety ($F_s$) is the ratio of resisting shear strength to driving shear stress. An $F_s$ less than 1.0 means driving forces exceed resisting strength, resulting in slope failure."
        }
    ]
};

// Application State & Interactive Logic Initialization
document.addEventListener("DOMContentLoaded", () => {
    initSimulator();
    initMap();
    renderCorridors("all");
    initTabs();
    initQuiz();
    initThemeToggle();
    initMobileNav();
});

// Interactive Factor of Safety Slope Stability Simulator
function initSimulator() {
    const slopeInput = document.getElementById("sim-slope");
    const rainInput = document.getElementById("sim-rain");
    const rockSelect = document.getElementById("sim-rock");
    const undercutInput = document.getElementById("sim-undercut");

    const slopeValSpan = document.getElementById("val-slope");
    const rainValSpan = document.getElementById("val-rain");
    const rockValSpan = document.getElementById("val-rock");
    const undercutValSpan = document.getElementById("val-undercut");

    const poreResultElem = document.getElementById("pore-pressure-result");
    const fsResultElem = document.getElementById("fs-value-result");
    const hazardLevelResultElem = document.getElementById("hazard-level-result");
    const riskBadgeElem = document.getElementById("landslide-risk-badge");
    const advisoryElem = document.getElementById("landslide-advisory");

    if (!slopeInput || !rainInput || !rockSelect || !undercutInput) return;

    function calculateSlopeStability() {
        const slopeDeg = parseInt(slopeInput.value, 10); // 15 to 50
        const rainMm = parseInt(rainInput.value, 10); // 0 to 250
        const rockType = rockSelect.value; // 'fresh', 'moderate', 'weathered', 'debris'
        const undercutM = parseInt(undercutInput.value, 10); // 0 to 10

        slopeValSpan.textContent = `${slopeDeg}°`;
        rainValSpan.textContent = `${rainMm} mm/24h`;
        undercutValSpan.textContent = `${undercutM} m`;

        let cohesionKPa = 45;
        let frictionDeg = 35;
        let rockLabel = "Fresh Granite / Gneiss (Cohesive)";

        if (rockType === "moderate") {
            cohesionKPa = 28;
            frictionDeg = 28;
            rockLabel = "Moderately Weathered Sandstone/Schist";
        } else if (rockType === "weathered") {
            cohesionKPa = 14;
            frictionDeg = 20;
            rockLabel = "Highly Weathered Fractured Phyllite/Shale";
        } else if (rockType === "debris") {
            cohesionKPa = 6;
            frictionDeg = 16;
            rockLabel = "Unconsolidated Ancient Landslide Debris";
        }
        rockValSpan.textContent = rockLabel;

        // Pore Water Pressure Calculation (kPa)
        const porePressureKPa = Math.min(180, Math.round(rainMm * 0.72));

        // Factor of Safety Formula: Fs = (Cohesion + (NormalStress - PorePressure)*tan(Friction)) / DrivingStress
        const slopeRad = (slopeDeg * Math.PI) / 180;
        const frictionRad = (frictionDeg * Math.PI) / 180;
        const normalStressKPa = 160 * Math.cos(slopeRad);
        const effectiveStressKPa = Math.max(2, normalStressKPa - porePressureKPa);

        const resistingStrengthKPa = cohesionKPa + (effectiveStressKPa * Math.tan(frictionRad));
        const drivingStressKPa = (160 + (undercutM * 12)) * Math.sin(slopeRad);

        const factorOfSafety = Math.max(0.3, Math.min(3.5, resistingStrengthKPa / drivingStressKPa)).toFixed(2);
        const fsNum = parseFloat(factorOfSafety);

        poreResultElem.textContent = `${porePressureKPa} kPa`;
        fsResultElem.textContent = factorOfSafety;

        let hazardText = "Stable Slope (GSI Low)";
        if (fsNum < 0.85) hazardText = "Critical Collapse (GSI Very High)";
        else if (fsNum < 1.15) hazardText = "Unstable Slope (GSI High)";
        else if (fsNum < 1.5) hazardText = "Marginal Stability (GSI Moderate)";

        hazardLevelResultElem.textContent = hazardText;

        if (fsNum < 0.85) {
            riskBadgeElem.textContent = "CRITICAL / IMMINENT SLOPE COLLAPSE";
            riskBadgeElem.className = "risk-pill critical";
            advisoryElem.innerHTML = "<strong>Factor of Safety Fs &lt; 0.85 (Critical):</strong> Driving shear forces exceed resisting rock mass strength due to extreme pore pressure and toe undercut. Immediate evacuation of downslope buildings and suspension of highway traffic mandatory.";
        } else if (fsNum < 1.15) {
            riskBadgeElem.textContent = "HIGH LANDSLIDE HAZARD";
            riskBadgeElem.className = "risk-pill high";
            advisoryElem.innerHTML = "<strong>Factor of Safety Fs ≈ 1.0 (High Danger):</strong> Slope is on the verge of shear failure. Debris flows, shooting stones, and rockfalls highly likely during continued rain. Monitor cracks and hillside springs.";
        } else if (fsNum < 1.5) {
            riskBadgeElem.textContent = "MODERATE LANDSLIDE RISK";
            riskBadgeElem.className = "risk-pill moderate";
            advisoryElem.innerHTML = "<strong>Factor of Safety Fs 1.15–1.5 (Moderate):</strong> Slope exhibits marginal stability. Minor rockfalls or slumps possible along steep highway cuts.";
        } else {
            riskBadgeElem.textContent = "STABLE SLOPE CONDITION";
            riskBadgeElem.className = "risk-pill low";
            advisoryElem.innerHTML = "<strong>Factor of Safety Fs &gt; 1.5 (Stable):</strong> Resisting rock mass cohesion is sufficient to prevent major failure under current loading.";
        }
    }

    slopeInput.addEventListener("input", calculateSlopeStability);
    rainInput.addEventListener("input", calculateSlopeStability);
    rockSelect.addEventListener("change", calculateSlopeStability);
    undercutInput.addEventListener("input", calculateSlopeStability);

    calculateSlopeStability();
}

// Leaflet Map Initialization
function initMap() {
    const mapElem = document.getElementById("landslide-map");
    if (!mapElem || typeof L === "undefined") return;

    const map = L.map("landslide-map", {
        center: [30.5, 78.5],
        zoom: 6,
        scrollWheelZoom: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    LANDSLIDE_DATA.corridors.forEach(spot => {
        const marker = L.circleMarker([spot.lat, spot.lng], {
            radius: spot.riskLevel.includes("Critical") ? 13 : 10,
            fillColor: spot.riskColor,
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85
        }).addTo(map);

        const popupContent = `
            <div class="map-popup-card">
                <span class="popup-badge" style="background:${spot.riskColor}">${spot.riskLevel}</span>
                <h3>${spot.name}</h3>
                <p><strong>Region:</strong> ${spot.region}</p>
                <p><strong>Altitude:</strong> 🏔️ ${spot.altitude}</p>
                <p><strong>Geology:</strong> ${spot.primaryGeology}</p>
                <p class="popup-desc">${spot.description}</p>
            </div>
        `;
        marker.bindPopup(popupContent);
    });
}

// Corridor Cards Renderer & Filtering
function renderCorridors(filterRegion) {
    const container = document.getElementById("corridor-cards-container");
    if (!container) return;

    container.innerHTML = "";

    const spotsToDisplay = LANDSLIDE_DATA.corridors.filter(spot => {
        if (filterRegion === "all") return true;
        if (filterRegion === "western") return spot.region.includes("Jammu");
        if (filterRegion === "northwestern") return spot.region.includes("Himachal");
        if (filterRegion === "eastern") return spot.region.includes("Uttarakhand") || spot.region.includes("Sikkim");
        return true;
    });

    spotsToDisplay.forEach(spot => {
        const card = document.createElement("div");
        card.className = "timeline-card";

        let badgeClass = "badge-info";
        if (spot.riskLevel.includes("Critical")) badgeClass = "badge-critical";
        if (spot.riskLevel.includes("High Risk")) badgeClass = "badge-warning";

        card.innerHTML = `
            <div class="timeline-header">
                <span class="event-year" style="font-size: 1.1rem;">🏔️ ${spot.altitude}</span>
                <span class="badge ${badgeClass}">${spot.riskLevel}</span>
            </div>
            <h3 class="event-name">${spot.name}</h3>
            <div class="event-meta">
                <span>📍 Region: <strong>${spot.region}</strong></span>
                <span>🪨 Geology: ${spot.primaryGeology}</span>
            </div>
            <p class="event-impact">${spot.description}</p>
        `;
        container.appendChild(card);
    });

    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderCorridors(e.target.dataset.filter);
        });
    });
}

// Tabs Navigation Logic
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

    LANDSLIDE_DATA.quizQuestions.forEach((q, qIndex) => {
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
        const qData = LANDSLIDE_DATA.quizQuestions[qIndex];
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
