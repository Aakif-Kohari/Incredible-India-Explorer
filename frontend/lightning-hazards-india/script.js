/**
 * Explore Lightning Hazards Across India
 * Core Interactive Logic & Atmospheric Data System
 * Incredible India Explorer
 */

export const LIGHTNING_DATA = {
    title: "Explore Lightning Hazards Across India",
    subtitle: "Understanding Cloud Electrification, Convective Updrafts, Regional Hotspots, IITM Damini Early Warnings, and Life-Saving Safety Protocols",
    annualFatalities: "2,500+ Deaths/Yr",
    annualStrikesIndia: "18.5 Million+",
    peakReturnStrokeTemp: "30,000 Kelvin",
    daminiWarningLeadTime: "30–45 Minutes",

    mechanics: [
        {
            id: "cloud-electrification",
            title: "Graupel & Ice Electrification",
            icon: "⚡",
            summary: "Collisions between falling graupel (soft hail) and rising ice crystals in updrafts separate electrical charges.",
            description: "Deep inside convective thunderclouds (cumulonimbus) extending above the freezing level (-10°C to -20°C), supercooled water droplets freeze onto ice crystals to form graupel. Collisions between heavy falling graupel and light rising ice crystals strip electrons, charging graupel negatively and ice crystals positively."
        },
        {
            id: "charge-dipole",
            title: "Cloud-Ground Charge Dipole",
            icon: "🌩️",
            summary: "Positive charges gather at cloud tops, negative charges concentrate at cloud bases, inducing ground charge.",
            description: "Updrafts carry light positive ice crystals to the upper cloud anvil, while heavier negative graupel settles in the lower-middle cloud layers. This concentrated negative layer at the cloud base induces a shadow of strong positive charge on the ground surface below."
        },
        {
            id: "stepped-leader",
            title: "Stepped Leader & Streamer",
            icon: "📉",
            summary: "An invisible channel of ionized air steps downward from the cloud to meet an upward ground streamer.",
            description: "When electrical potential exceeds air insulation (~3 million volts per meter), a stepped leader of ionized air branches downward from the cloud in discrete 50-meter jumps. As it approaches the ground, positive upward streamers rise from tall structures or ground points to meet it."
        },
        {
            id: "return-stroke",
            title: "Return Stroke Superheating",
            icon: "🔥",
            summary: "Connecting the circuit releases a massive current pulse reaching 30,000 K—5x hotter than the Sun's surface.",
            description: "Once the leader and streamer connect, a massive pulse of positive charge surges upward to the cloud (the return stroke). Peak electrical currents reach 30,000 to 100,000 Amperes, superheating the air channel to 30,000 K in microseconds and causing explosive thermal expansion (thunder)."
        },
        {
            id: "strike-modes",
            title: "Mechanisms of Injury & Damage",
            icon: "⚠️",
            summary: "Direct strikes, side flashes, ground step potential, and conduction through conductors.",
            description: "While direct strikes account for 3-5% of human injuries, over 50% of rural casualties in India result from 'Ground Current / Step Potential'—where lightning current spreads outward through the soil between a person's feet or under livestock herds."
        }
    ],

    hotspots: [
        {
            id: "odisha",
            name: "Odisha (Mayurbhanj, Keonjhar, Sundargarh)",
            region: "Eastern India (Chota Nagpur Fringe)",
            riskLevel: "Critical Risk",
            riskColor: "#ef4444",
            lat: 21.50,
            lng: 85.80,
            annualStrokeDensity: "45–65 flashes/km²/year",
            peakSeason: "April – June (Pre-Monsoon) & Sept – Oct",
            keyDrivers: "Collision of moist Bay of Bengal air with hot Chota Nagpur plateau continental air masses.",
            description: "Odisha consistently records India's highest annual lightning stroke density and fatalities. Intense solar heating over mineral-rich plateau terrain triggers violent convective Nor'wester thunderstorms."
        },
        {
            id: "chota-nagpur",
            name: "Jharkhand & Chhattisgarh (Chota Nagpur Plateau)",
            region: "Eastern Peninsular India",
            riskLevel: "Critical Risk",
            riskColor: "#ef4444",
            lat: 23.35,
            lng: 85.33,
            annualStrokeDensity: "40–60 flashes/km²/year",
            peakSeason: "Pre-Monsoon (April – June)",
            keyDrivers: "High surface temperatures, elevated rocky terrain, low-level wind convergence.",
            description: "High elevation plateau surfaces heat rapidly during summer afternoons, creating powerful convective updrafts reaching 25-35 m/s that generate severe thunderstorm cells across mining and farming belts."
        },
        {
            id: "meghalaya",
            name: "Meghalaya & Southern Assam (Cherrapunji/Shillong)",
            region: "Northeast India",
            riskLevel: "Critical Risk",
            riskColor: "#ef4444",
            lat: 25.30,
            lng: 91.70,
            annualStrokeDensity: "50–75 flashes/km²/year",
            peakSeason: "March – May & June – Sept",
            keyDrivers: "Steep Khasi-Jaintia hill slope orographic lift of moisture-laden Bay of Bengal winds.",
            description: "The abrupt 1,500m vertical rise of the Meghalaya plateau forces warm moist Bay of Bengal air into extreme vertical updrafts, creating some of the highest lightning flash densities on Earth."
        },
        {
            id: "west-bengal",
            name: "Gangetic West Bengal & Sundarbans",
            region: "Eastern India",
            riskLevel: "Very High",
            riskColor: "#f97316",
            lat: 22.98,
            lng: 87.85,
            annualStrokeDensity: "35–50 flashes/km²/year",
            peakSeason: "Pre-Monsoon Kalbaishakhi (April – May)",
            keyDrivers: "Severe squall lines ('Nor'westers') moving southeast from Bihar/Jharkhand.",
            description: "Violent pre-monsoon convective squalls known locally as *Kalbaishakhi* move rapidly across the delta, producing high-frequency cloud-to-ground lightning strikes and severe wind squalls."
        },
        {
            id: "andhra-pradesh",
            name: "Andhra Pradesh & Rayalaseema",
            region: "Southern Peninsular India",
            riskLevel: "Very High",
            riskColor: "#f97316",
            lat: 15.82,
            lng: 78.03,
            annualStrokeDensity: "30–45 flashes/km²/year",
            peakSeason: "April – May & October – November",
            keyDrivers: "Pre-monsoon heat lows combined with sea breeze front convergence.",
            description: "Collision between inland dry desert heat and humid sea breezes from the Bay of Bengal triggers localized supercell convective storms across rural agricultural districts."
        },
        {
            id: "maharashtra-vidarbha",
            name: "Vidarbha & Marathwada (Maharashtra)",
            region: "Central India",
            riskLevel: "High",
            riskColor: "#eab308",
            lat: 20.70,
            lng: 77.00,
            annualStrokeDensity: "25–35 flashes/km²/year",
            peakSeason: "May – June & September",
            keyDrivers: "Extreme summer heat (45°C+) creating strong thermal instability.",
            description: "Inland central India experiences extreme pre-monsoon surface temperatures exceeding 45°C. Moist monsoonal incursions trigger explosive afternoon convective lightning strikes."
        },
        {
            id: "western-ghats",
            name: "Western Ghats Foothills (Karnataka & Kerala)",
            region: "Southwestern Coast",
            riskLevel: "High",
            riskColor: "#eab308",
            lat: 12.97,
            lng: 75.60,
            annualStrokeDensity: "20–35 flashes/km²/year",
            peakSeason: "October – November (Retreating Monsoon)",
            keyDrivers: "Orographic slope lift combined with land-sea breeze front interaction.",
            description: "During the onset and withdrawal phases of the monsoon, intense afternoon convective thunderstorms form along the windward slopes of the Western Ghats."
        }
    ],

    regionalComparison: {
        easternIndia: {
            title: "Eastern India (Odisha, Jharkhand, WB, Bihar)",
            peakSeason: "Pre-Monsoon (April – June) & Post-Monsoon (Sept – Oct)",
            lightningType: "Severe Squall Lines (Nor'westers / Kalbaishakhi)",
            avgFlashDensity: "40–65 flashes/km²/year",
            primaryDriver: "Thermal heating over mineral plateaus colliding with Bay of Bengal moisture",
            vulnerability: "Extremely High (Rural farmers, paddy field laborers, open thatched housing)"
        },
        northeastIndia: {
            title: "Northeast India (Meghalaya, Assam, Tripura)",
            peakSeason: "March – May & Full Monsoon Season",
            lightningType: "Orographic Convective Thunderstorms",
            avgFlashDensity: "50–75 flashes/km²/year",
            primaryDriver: "Abrupt vertical hill slope lifting of moist Bay of Bengal air masses",
            vulnerability: "High (High strike frequency offset by hilly terrain and forest canopy)"
        },
        southernPeninsula: {
            title: "Southern Peninsular (AP, Telangana, Karnataka)",
            peakSeason: "Pre-Monsoon (April – May) & Retreating Monsoon (Oct – Nov)",
            lightningType: "Localized Sea-Breeze Front Supercells",
            avgFlashDensity: "25–45 flashes/km²/year",
            primaryDriver: "Heat low convergence with Bay of Bengal & Arabian Sea breezes",
            vulnerability: "High (Agricultural workers during pre-monsoon sowing season)"
        }
    },

    earlyWarningSystem: [
        {
            title: "IITM Damini Warning Mobile App",
            category: "Public Early Warning",
            icon: "📱",
            description: "Developed by the Indian Institute of Tropical Meteorology (IITM Pune) and IMD, the Damini app provides GPS-based real-time lightning location tracking and issues automated warning alerts 30 to 45 minutes in advance for a 20–40 km radius."
        },
        {
            title: "Lightning Location Networks (LLN)",
            category: "Sensor Technology",
            icon: "📡",
            description: "A nationwide network of over 80 ground-based electromagnetic sensor towers operated by IITM Pune detects VLF/LF radio waves emitted by lightning strokes, triangulating strike coordinates in real time."
        },
        {
            title: "CROPC Lightning Resilient India Campaign",
            category: "National Mitigation Initiative",
            icon: "🛡️",
            description: "A joint initiative by Climate Resilient Observing Systems Promotion Council (CROPC) and IMD aimed at reducing lightning fatalities by 80% through community awareness, early warning dissemination, and rural shelter earthing."
        },
        {
            title: "Structural Protection & Earthing Rods",
            category: "Engineering Solution",
            icon: "⚡",
            description: "Installation of Franklin air terminals (lightning rods) and proper chemical earthing ground pits on rural schools, community centers, and houses channels strike energy safely into the earth."
        }
    ],

    quizQuestions: [
        {
            question: "Why does Eastern India (Odisha & Jharkhand) experience extremely high lightning activity during April–June?",
            options: [
                "Because of cold arctic winds from the north",
                "Because intense solar heating over the plateau collides with moist Bay of Bengal maritime air masses",
                "Because there are no trees in the region",
                "Because of high ocean tides in the Bay of Bengal"
            ],
            correct: 1,
            explanation: "Extreme pre-monsoon land heating over the mineral-rich Chota Nagpur plateau collides with humid maritime air from the Bay of Bengal, producing explosive convective thunderstorms (Nor'westers)."
        },
        {
            question: "What is 'Ground Current / Step Potential', which causes over 50% of lightning casualties in rural India?",
            options: [
                "A direct strike hitting a person's head",
                "Electrical current spreading outward through the soil from a nearby strike point, passing through a person's feet",
                "Lightning passing through telephone wires",
                "A flash jumping horizontally from a tree"
            ],
            correct: 1,
            explanation: "When lightning strikes a tree or ground, electrical current radiates outward through the soil. The voltage difference between a person's feet (step potential) drives dangerous current through the body."
        },
        {
            question: "What is the '30/30 Rule' for lightning safety?",
            options: [
                "Drink 30 ml of water every 30 minutes during a storm",
                "If time between lightning flash and thunder is under 30 seconds, seek shelter; stay indoors for 30 minutes after the last thunder",
                "Run 30 meters away within 30 seconds",
                "Wait 30 minutes before calling emergency services"
            ],
            correct: 1,
            explanation: "If thunder sounds within 30 seconds of a flash (indicating storm is within 10 km), take cover immediately. Wait 30 minutes after the last thunder before resuming outdoor activity."
        },
        {
            question: "Which official mobile application developed by IITM Pune provides real-time 30-45 minute advance lightning alerts in India?",
            options: [
                "Damini App",
                "Mausam App",
                "Umang App",
                "Bhuvan App"
            ],
            correct: 0,
            explanation: "The Damini app developed by IITM Pune and IMD provides location-specific advance warnings for impending lightning strikes within a 20–40 km radius."
        }
    ]
};

// Application State & Interactive Logic Initialization
document.addEventListener("DOMContentLoaded", () => {
    initSimulator();
    initMap();
    renderHotspots("all");
    initTabs();
    initQuiz();
    initThemeToggle();
    initMobileNav();
});

// Interactive Convective Lightning Simulator
function initSimulator() {
    const tempInput = document.getElementById("sim-temp");
    const humidityInput = document.getElementById("sim-humidity");
    const elevInput = document.getElementById("sim-elev");

    const tempValSpan = document.getElementById("val-temp");
    const humidityValSpan = document.getElementById("val-humidity");
    const elevValSpan = document.getElementById("val-elev");

    const updraftResultElem = document.getElementById("updraft-speed-result");
    const flashDensityResultElem = document.getElementById("flash-density-result");
    const stormTypeResultElem = document.getElementById("storm-type-result");
    const riskBadgeElem = document.getElementById("lightning-risk-badge");
    const advisoryElem = document.getElementById("lightning-advisory");

    if (!tempInput || !humidityInput || !elevInput) return;

    function calculateLightning() {
        const tempC = parseInt(tempInput.value, 10); // 20 to 45
        const humidity = parseInt(humidityInput.value, 10); // 30 to 95
        const elevationM = parseInt(elevInput.value, 10); // 0 to 2500

        tempValSpan.textContent = `${tempC}°C`;
        humidityValSpan.textContent = `${humidity}%`;
        elevValSpan.textContent = `${elevationM} m`;

        // CAPE / Updraft approximation formula:
        // Higher temp + high humidity + elevation lift = strong updrafts
        const thermalEnergy = Math.max(0, tempC - 20) * 1.8;
        const moistureFactor = (humidity / 100) * 2.2;
        const orographicLiftFactor = 1 + (elevationM / 1200);

        const updraftVelocityMs = Math.round((thermalEnergy * moistureFactor * orographicLiftFactor * 0.75) + 5);
        const flashDensity = Math.min(85, Math.round(Math.pow(updraftVelocityMs / 8, 2.4) * 1.8));

        let stormType = "Weak Convective Cell";
        if (updraftVelocityMs >= 30) stormType = "Severe Supercell / Nor'wester";
        else if (updraftVelocityMs >= 20) stormType = "Multicell Thunderstorm";
        else if (updraftVelocityMs >= 12) stormType = "Moderate Convective Storm";

        updraftResultElem.textContent = `${updraftVelocityMs} m/s`;
        flashDensityResultElem.textContent = `${flashDensity} /km²/yr`;
        stormTypeResultElem.textContent = stormType;

        if (flashDensity >= 50) {
            riskBadgeElem.textContent = "CRITICAL / SEVERE LIGHTNING HAZARD";
            riskBadgeElem.className = "risk-pill critical";
            advisoryElem.innerHTML = "<strong>Extreme Lightning Warning:</strong> Violent convective updrafts generating dangerous high-frequency Cloud-to-Ground strikes. All outdoor agricultural and construction work must cease immediately. Take refuge in sturdy enclosed structures.";
        } else if (flashDensity >= 25) {
            riskBadgeElem.textContent = "HIGH LIGHTNING HAZARD";
            riskBadgeElem.className = "risk-pill high";
            advisoryElem.innerHTML = "<strong>High Alert Level:</strong> Severe thunderstorm active. Avoid open fields, tall isolated trees, water bodies, and metal fences. Check Damini App for real-time alerts.";
        } else if (flashDensity >= 10) {
            riskBadgeElem.textContent = "MODERATE LIGHTNING RISK";
            riskBadgeElem.className = "risk-pill moderate";
            advisoryElem.innerHTML = "<strong>Moderate Hazard Level:</strong> Scattered lightning strikes possible. Monitor weather conditions if working outdoors.";
        } else {
            riskBadgeElem.textContent = "LOW LIGHTNING ACTIVITY";
            riskBadgeElem.className = "risk-pill low";
            advisoryElem.innerHTML = "<strong>Low Hazard:</strong> Weak atmospheric instability; minimal ground stroke risk.";
        }
    }

    tempInput.addEventListener("input", calculateLightning);
    humidityInput.addEventListener("input", calculateLightning);
    elevInput.addEventListener("input", calculateLightning);

    calculateLightning();
}

// Leaflet Map Initialization
function initMap() {
    const mapElem = document.getElementById("lightning-map");
    if (!mapElem || typeof L === "undefined") return;

    const map = L.map("lightning-map", {
        center: [21.5, 82.5],
        zoom: 5,
        scrollWheelZoom: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    LIGHTNING_DATA.hotspots.forEach(spot => {
        const marker = L.circleMarker([spot.lat, spot.lng], {
            radius: spot.riskLevel === "Critical Risk" ? 13 : (spot.riskLevel === "Very High" ? 11 : 9),
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
                <p><strong>Flash Density:</strong> ⚡ ${spot.annualStrokeDensity}</p>
                <p><strong>Peak Season:</strong> ${spot.peakSeason}</p>
                <p class="popup-desc">${spot.description}</p>
            </div>
        `;
        marker.bindPopup(popupContent);
    });
}

// Hotspot Renderer & Filtering
function renderHotspots(filterRegion) {
    const container = document.getElementById("hotspot-cards-container");
    if (!container) return;

    container.innerHTML = "";

    const spotsToDisplay = LIGHTNING_DATA.hotspots.filter(spot => {
        if (filterRegion === "all") return true;
        if (filterRegion === "east") return spot.region.includes("Eastern");
        if (filterRegion === "northeast") return spot.region.includes("Northeast");
        if (filterRegion === "south") return spot.region.includes("Southern") || spot.region.includes("Southwestern");
        return true;
    });

    spotsToDisplay.forEach(spot => {
        const card = document.createElement("div");
        card.className = "timeline-card";

        let badgeClass = "badge-info";
        if (spot.riskLevel === "Critical Risk") badgeClass = "badge-critical";
        if (spot.riskLevel === "Very High") badgeClass = "badge-warning";

        card.innerHTML = `
            <div class="timeline-header">
                <span class="event-year" style="font-size: 1.1rem;">⚡ ${spot.annualStrokeDensity}</span>
                <span class="badge ${badgeClass}">${spot.riskLevel}</span>
            </div>
            <h3 class="event-name">${spot.name}</h3>
            <div class="event-meta">
                <span>📍 Region: <strong>${spot.region}</strong></span>
                <span>📅 Peak Season: ${spot.peakSeason}</span>
                <span>🔍 Main Driver: ${spot.keyDrivers}</span>
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
            renderHotspots(e.target.dataset.filter);
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

    LIGHTNING_DATA.quizQuestions.forEach((q, qIndex) => {
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
        const qData = LIGHTNING_DATA.quizQuestions[qIndex];
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
