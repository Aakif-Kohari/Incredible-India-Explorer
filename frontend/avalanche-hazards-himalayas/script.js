/**
 * Explore Avalanche Hazards of the Indian Himalayas
 * Core Interactive Logic & Alpine Data System
 * Incredible India Explorer
 */

export const AVALANCHE_DATA = {
    title: "Explore Avalanche Hazards of the Indian Himalayas",
    subtitle: "Understanding Snowpack Stratigraphy, Shear Failure, DRDO-DGRE Hazard Forecasting, Alpine Engineering, and High-Altitude Survival",
    criticalSlopeRange: "30° – 45°",
    hazardAltitudeZone: "3,000m – 6,000m",
    dgreDangerLevels: "5-Stage Bulletin",
    survivalWindow: "< 15 Minutes",

    mechanics: [
        {
            id: "snowpack-weak-layer",
            title: "Weak Layer Formation (Depth Hoar)",
            icon: "❄️",
            summary: "Temperature gradients across the snowpack transform cohesive grains into fragile cup-shaped depth hoar crystals.",
            description: "When large temperature differences exist between the warm ground (0°C) and freezing alpine surface air (-20°C), water vapor migrates upward through the snowpack. This recrystallizes buried snow into brittle, non-cohesive 'depth hoar' crystals—creating a persistent weak layer underneath heavy snow slabs."
        },
        {
            id: "slab-avalanche",
            title: "Slab Avalanche Shear Failure",
            icon: "🏔️",
            summary: "A cohesive upper snow slab fractures along a weak layer and slides rapidly downhill as a single unit.",
            description: "Slab avalanches account for over 90% of avalanche fatalities. They occur when a cohesive slab of wind-packed or fresh snow loses bonding with an underlying weak layer. Once shear stress exceeds shear strength, a sharp crown fracture propagates across hundreds of meters in milliseconds."
        },
        {
            id: "critical-slope",
            title: "Critical Slope Gradient (30°–45°)",
            icon: "📐",
            summary: "Slopes between 30° and 45° represent the prime avalanche zone where gravity and friction collide.",
            description: "On gentle slopes (<30°), gravity is insufficient to overcome friction. On steep cliffs (>50°), snow sluffs off continuously in small amounts. Slopes between 30° and 45° are steep enough to slide powerfully yet gentle enough to accumulate thick, unstable snow slabs."
        },
        {
            id: "powder-blast",
            title: "Powder Snow Air Blast",
            icon: "💨",
            summary: "Massive dry snow slabs accelerate to 130–300 km/h, generating destructive hurricane-force air pressure waves.",
            description: "During a large dry-slab avalanche, airborne snow particles mix with air to create a high-velocity turbulent powder cloud. The advancing air blast ahead of the snow mass can reach wind pressures capable of snapping mature trees and destroying concrete structures."
        },
        {
            id: "wet-snow-avalanche",
            title: "Wet Spring Avalanches",
            icon: "☀️",
            summary: "Solar warming and rain-on-snow events melt ice bonds, releasing heavy wet snow masses.",
            description: "As spring temperatures rise above 0°C, liquid water percolates downward through the snowpack, lubricating weak layers and destroying grain bonds. Wet avalanches move slower (20–40 km/h) but carry immense density, crushing everything in their path."
        }
    ],

    passes: [
        {
            id: "siachen-glacier",
            name: "Siachen Glacier & Karakoram Range",
            region: "Ladakh (Extreme Altitude)",
            altitude: "5,400 m – 6,700 m",
            riskLevel: "Critical Risk (Level 5)",
            riskColor: "#ef4444",
            lat: 35.42,
            lng: 77.10,
            primaryHazard: "Extreme wind slabs, depth hoar, crevasses, sub-zero powder blasts.",
            description: "The world's highest battlefield features extreme avalanche hazards. Military posts and supply routes along the Saltoro Ridge face persistent depth hoar instability and wind-deposited slabs."
        },
        {
            id: "zoji-la",
            name: "Zoji La Pass (Srinagar-Leh Highway)",
            region: "Jammu & Kashmir (Great Himalayas)",
            altitude: "3,528 m",
            riskLevel: "Critical Risk (Level 4-5)",
            riskColor: "#ef4444",
            lat: 34.28,
            lng: 75.48,
            primaryHazard: "Heavy Western Disturbance snowfall, steep gully chutes, massive slab slides.",
            description: "A vital strategic mountain pass linking Kashmir Valley to Ladakh. Notorious for massive avalanche chutes that bury the highway under 10-20 meters of snow every winter."
        },
        {
            id: "gulmarg-pirpanjal",
            name: "Gulmarg & Pir Panjal Range",
            region: "Jammu & Kashmir",
            altitude: "2,690 m – 4,390 m (Apharwat Peak)",
            riskLevel: "High Risk (Level 3-4)",
            riskColor: "#f97316",
            lat: 34.05,
            lng: 74.38,
            primaryHazard: "Backcountry storm slabs, wind-loaded bowls, skier-triggered slides.",
            description: "Renowned for deep powder snow, Apharwat Peak's steep backcountry bowls experience frequent storm slab avalanches triggered by heavy Western Disturbances and off-piste skiing."
        },
        {
            id: "rohtang-lahaul",
            name: "Rohtang Pass & Lahaul Valley",
            region: "Himachal Pradesh",
            altitude: "3,978 m",
            riskLevel: "High Risk (Level 4)",
            riskColor: "#f97316",
            lat: 32.37,
            lng: 77.24,
            primaryHazard: "Heavy fresh snowfall, steep valley slopes, spring wet-slab slides.",
            description: "Connecting Kullu Valley to Lahaul, Rohtang Pass is prone to violent blizzards and spring avalanches. Construction of the Atal Tunnel below the pass bypasses major avalanche corridors."
        },
        {
            id: "chamoli-garhwal",
            name: "Chamoli & Nanda Devi Basin",
            region: "Uttarakhand (Garhwal Himalayas)",
            altitude: "3,200 m – 5,500 m",
            riskLevel: "Critical Risk (Level 4-5)",
            riskColor: "#ef4444",
            lat: 30.55,
            lng: 79.58,
            primaryHazard: "Hanging glacier ice-rock avalanches, outburst floods, steep terrain.",
            description: "Site of the 2021 Rishi Ganga disaster where a massive rock-and-ice detachment from Raunthi Peak triggered a catastrophic flash flood down the Dhauliganga river valley."
        },
        {
            id: "nathu-la",
            name: "Nathu La Pass & Tsomgo Lake",
            region: "Sikkim (Eastern Himalayas)",
            altitude: "4,310 m",
            riskLevel: "High Risk (Level 3-4)",
            riskColor: "#f97316",
            lat: 27.39,
            lng: 88.83,
            primaryHazard: "High moisture wet snow slabs, sudden blizzards, road blockages.",
            description: "Located on the Indo-China border, Nathu La experiences heavy moist snowfall from Bay of Bengal weather systems. In April 2023, a massive wet-slab avalanche struck tourist vehicles near Mile 15."
        }
    ],

    historicalEvents: [
        {
            year: "2021",
            name: "Chamoli Rock-Ice Avalanche & Outburst",
            location: "Rishi Ganga / Dhauliganga Valley, Uttarakhand",
            impact: "A massive 27-million-cubic-meter block of rock and hanging glacier ice detached from Raunthi Peak (Garhwal), triggering a high-velocity debris flow that destroyed the Rishi Ganga and Tapovan Vishnugad hydro projects, claiming over 200 lives.",
            category: "Rock-Ice Glacier Avalanche",
            badgeColor: "critical"
        },
        {
            year: "2012",
            name: "Gayari & Siachen Battalion Disasters",
            location: "Siachen Glacier / Saltoro Range",
            impact: "A massive ice-and-snow wall detached at 4,900m, burying a major military base under 25 meters of compressed ice and rock. Highlighted extreme cold-desert avalanche hazards in the high Karakoram.",
            category: "Ice-Slab Avalanche",
            badgeColor: "critical"
        },
        {
            year: "2022",
            name: "Draupadi Ka Danda II Trainee Disaster",
            location: "Nehru Institute of Mountaineering (NIM), Uttarkashi",
            impact: "A massive wind-slab avalanche struck a 41-member mountaineering team at 4,900m near the summit ridge of Draupadi Ka Danda II peak, killing 29 trainee mountaineers and instructors.",
            category: "Wind-Slab Avalanche",
            badgeColor: "critical"
        },
        {
            year: "2023",
            name: "Nathu La Pass Tourist Avalanche",
            location: "Mile 15, Gangtok-Nathu La Highway, Sikkim",
            impact: "A sudden wet-snow slab avalanche triggered by rapid spring warming swept over 30 tourist vehicles parked along the highway, killing 7 tourists and trapping dozens before Army rescue.",
            category: "Wet-Slab Avalanche",
            badgeColor: "warning"
        }
    ],

    regionalSectors: {
        western: {
            title: "Western Himalayas (Ladakh & Karakoram)",
            altitudeZone: "4,000m – 6,700m (High-Altitude Cold Desert)",
            snowType: "Dry, cold powder, persistent depth hoar weak layers, wind slabs",
            peakDangerMonths: "November – April (Extreme winter sub-zero temperatures)",
            forecastingFocus: "Military supply corridors, high mountain passes (Khardung La, Siachen)",
            primaryThreat: "Persistent slab instability due to extreme temperature gradients (-30°C)"
        },
        northWestern: {
            title: "North-Western Himalayas (J&K & Himachal Pradesh)",
            altitudeZone: "2,500m – 5,000m (Maritime-Continental Transition)",
            snowType: "Heavy, high-density snow, storm slabs, wet spring slabs",
            peakDangerMonths: "December – March (Western Disturbances) & April (Spring Melt)",
            forecastingFocus: "National highways (NH-44, Zoji La, Rohtang), ski resorts (Gulmarg)",
            primaryThreat: "Heavy fresh snowfall (1-2 meters in 24h) generating massive storm slabs"
        },
        centralEastern: {
            title: "Central & Eastern Himalayas (Uttarakhand & Sikkim)",
            altitudeZone: "3,000m – 6,000m (Monsoonal High Moisture)",
            snowType: "High moisture content, hanging glacier ice-rock mixtures, wet slabs",
            peakDangerMonths: "February – April (Pre-Monsoon Melt) & Monsoon Glacier Outbursts",
            forecastingFocus: "Pilgrimage routes (Char Dham), hydro projects, border passes (Nathu La)",
            primaryThreat: "Hanging glacier ice detachments & high-moisture spring wet slabs"
        }
    },

    earlyWarningTech: [
        {
            title: "DRDO-DGRE Avalanche Forecasting Bulletins",
            category: "National Forecasting Agency",
            icon: "🛰️",
            description: "The Defence Geoinformatics Research Establishment (DGRE / DRDO) operates a network of high-altitude Automatic Weather Stations (AWS) and observatories across J&K, Ladakh, HP, and Uttarakhand, issuing daily 5-stage avalanche danger level bulletins to the Armed Forces and civil administration."
        },
        {
            title: "Avalanche Galleries & Engineered Defenses",
            category: "Structural Mitigation",
            icon: "🏛️",
            description: "Engineered concrete avalanche sheds (galleries) built over mountain highways (e.g. Jawahar Tunnel approaches, Zoji La, Rohtang) allow sliding snow masses to pass harmlessly over traffic into valley bottoms below."
        },
        {
            title: "Snow Fences, Nets & Retarders",
            category: "Slope Stabilization",
            icon: "🥅",
            description: "Steel snow bridges, flexible wire nets, and avalanche dams installed in starting zones restrict snow slab movement and prevent initial fracture propagation along steep mountain faces."
        },
        {
            title: "RECCO & Avalanche Beacons (AVD)",
            category: "Search & Rescue",
            icon: "📟",
            description: "High-altitude patrols and mountaineers carry 457 kHz Avalanche Victim Detectors (AVDs) and RECCO reflectors, enabling search teams equipped with directional detectors to pinpoint buried victims through meters of snow."
        }
    ],

    quizQuestions: [
        {
            question: "On which slope angle gradient range do over 90% of destructive slab avalanches occur?",
            options: [
                "Gentle slopes under 20°",
                "Critical slopes between 30° and 45°",
                "Vertical cliffs over 60°",
                "Flat valley floors under 10°"
            ],
            correct: 1,
            explanation: "Slopes between 30° and 45° are steep enough to slide with gravity yet gentle enough to accumulate thick, cohesive snow slabs."
        },
        {
            question: "What is 'Depth Hoar' and why is it extremely dangerous in snowpack physics?",
            options: [
                "Heavy wet slush on the snow surface",
                "Fragile, cup-shaped ice crystals formed near the warm ground that create persistent weak layers beneath slabs",
                "Hard ice crust created by sun exposure",
                "Fresh powder snow blown by wind"
            ],
            correct: 1,
            explanation: "Depth hoar forms when large temperature gradients cause water vapor to recrystallize into coarse, non-bonding grains near the ground, creating a hidden, unstable weak layer."
        },
        {
            question: "Which Indian organization under DRDO is responsible for Himalayan avalanche hazard mapping and daily danger bulletins?",
            options: [
                "ISRO",
                "DGRE (Defence Geoinformatics Research Establishment / erstwhile SASE)",
                "IMD",
                "NDRF"
            ],
            correct: 1,
            explanation: "DGRE (formerly SASE) in Chandigarh operates high-altitude observatories to forecast avalanche danger levels across the Indian Himalayas."
        },
        {
            question: "What is the critical survival time window for an avalanche victim buried under snow before suffocation rises drastically?",
            options: [
                "Under 15 minutes",
                "2 hours",
                "6 hours",
                "24 hours"
            ],
            correct: 0,
            explanation: "Over 80% of buried avalanche victims survive if excavated within the first 15 minutes; survival rates plunge rapidly after 18-20 minutes due to asphyxiation."
        }
    ]
};

// Application State & Interactive Logic Initialization
document.addEventListener("DOMContentLoaded", () => {
    initSimulator();
    initMap();
    renderPasses("all");
    initTabs();
    initQuiz();
    initThemeToggle();
    initMobileNav();
});

// Interactive Avalanche Slope Instability Simulator
function initSimulator() {
    const slopeInput = document.getElementById("sim-slope");
    const snowInput = document.getElementById("sim-snow");
    const crystalSelect = document.getElementById("sim-crystal");
    const windInput = document.getElementById("sim-wind");

    const slopeValSpan = document.getElementById("val-slope");
    const snowValSpan = document.getElementById("val-snow");
    const crystalValSpan = document.getElementById("val-crystal");
    const windValSpan = document.getElementById("val-wind");

    const shearResultElem = document.getElementById("shear-stress-result");
    const instabilityResultElem = document.getElementById("instability-index-result");
    const dangerLevelResultElem = document.getElementById("danger-level-result");
    const riskBadgeElem = document.getElementById("avalanche-risk-badge");
    const advisoryElem = document.getElementById("avalanche-advisory");

    if (!slopeInput || !snowInput || !crystalSelect || !windInput) return;

    function calculateAvalanche() {
        const slopeDeg = parseInt(slopeInput.value, 10); // 15 to 55
        const snowCm = parseInt(snowInput.value, 10); // 0 to 150
        const crystalType = crystalSelect.value; // 'hoar', 'surface_hoar', 'wet_snow', 'packed'
        const windKmH = parseInt(windInput.value, 10); // 0 to 100

        slopeValSpan.textContent = `${slopeDeg}°`;
        snowValSpan.textContent = `${snowCm} cm`;
        windValSpan.textContent = `${windKmH} km/h`;

        let crystalLabel = "Depth Hoar (Persistent Weak Layer)";
        let weakLayerFactor = 2.4;
        if (crystalType === "surface_hoar") {
            crystalLabel = "Surface Hoar (Feathery Ice)";
            weakLayerFactor = 2.1;
        } else if (crystalType === "wet_snow") {
            crystalLabel = "Wet Spring Melt Slush";
            weakLayerFactor = 1.8;
        } else if (crystalType === "packed") {
            crystalLabel = "Cohesive Wind-Packed Slab";
            weakLayerFactor = 1.2;
        }
        crystalValSpan.textContent = crystalLabel;

        // Slope Factor Bell Curve Peak at 38°
        const slopeRadian = (slopeDeg * Math.PI) / 180;
        const slopeFactor = Math.sin(slopeRadian) * Math.cos(slopeRadian) * 2.1;

        // Shear Stress (kPa)
        const loadKgM2 = snowCm * 1.6 + (windKmH * 0.8);
        const shearStressKPa = (loadKgM2 * 9.81 * Math.sin(slopeRadian) / 1000).toFixed(2);

        // Instability % Index
        const instabilityPct = Math.min(99, Math.max(5, Math.round(
            (slopeFactor * (snowCm / 60) * weakLayerFactor * (1 + windKmH / 80)) * 24
        )));

        let dgreLevel = "Level 1 (Yellow / Low)";
        if (instabilityPct >= 80) dgreLevel = "Level 5 (Red / Extreme)";
        else if (instabilityPct >= 60) dgreLevel = "Level 4 (Red / High)";
        else if (instabilityPct >= 40) dgreLevel = "Level 3 (Orange / Medium)";
        else if (instabilityPct >= 20) dgreLevel = "Level 2 (Yellow / Low-Medium)";

        shearResultElem.textContent = `${shearStressKPa} kPa`;
        instabilityResultElem.textContent = `${instabilityPct}%`;
        dangerLevelResultElem.textContent = dgreLevel;

        if (instabilityPct >= 75) {
            riskBadgeElem.textContent = "CRITICAL / CATASTROPHIC SLAB HAZARD";
            riskBadgeElem.className = "risk-pill critical";
            advisoryElem.innerHTML = "<strong>DGRE Level 5 Extreme Danger:</strong> Widespread natural and human-triggered slab avalanches certain on critical slopes (>30°). High-altitude highway travel and foot patrols must suspend immediately.";
        } else if (instabilityPct >= 50) {
            riskBadgeElem.textContent = "HIGH AVALANCHE RISK";
            riskBadgeElem.className = "risk-pill high";
            advisoryElem.innerHTML = "<strong>DGRE Level 4 High Danger:</strong> Unstable snowpack. Large natural avalanches likely; human triggering very easy. Avoid steep avalanche corridors and backcountry slopes.";
        } else if (instabilityPct >= 25) {
            riskBadgeElem.textContent = "MODERATE AVALANCHE HAZARD";
            riskBadgeElem.className = "risk-pill moderate";
            advisoryElem.innerHTML = "<strong>DGRE Level 3 Medium Alert:</strong> Triggering possible on specific wind-loaded slopes and weak layer zones. Exercise caution around backcountry bowls.";
        } else {
            riskBadgeElem.textContent = "LOW AVALANCHE ACTIVITY";
            riskBadgeElem.className = "risk-pill low";
            advisoryElem.innerHTML = "<strong>DGRE Level 1-2 Low Hazard:</strong> Generally stable snowpack; avalanches isolated to extreme terrain.";
        }
    }

    slopeInput.addEventListener("input", calculateAvalanche);
    snowInput.addEventListener("input", calculateAvalanche);
    crystalSelect.addEventListener("change", calculateAvalanche);
    windInput.addEventListener("input", calculateAvalanche);

    calculateAvalanche();
}

// Leaflet Map Initialization
function initMap() {
    const mapElem = document.getElementById("avalanche-map");
    if (!mapElem || typeof L === "undefined") return;

    const map = L.map("avalanche-map", {
        center: [32.5, 77.5],
        zoom: 6,
        scrollWheelZoom: false
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    AVALANCHE_DATA.passes.forEach(pass => {
        const marker = L.circleMarker([pass.lat, pass.lng], {
            radius: pass.riskLevel.includes("Level 5") ? 13 : (pass.riskLevel.includes("Level 4") ? 11 : 9),
            fillColor: pass.riskColor,
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85
        }).addTo(map);

        const popupContent = `
            <div class="map-popup-card">
                <span class="popup-badge" style="background:${pass.riskColor}">${pass.riskLevel}</span>
                <h3>${pass.name}</h3>
                <p><strong>Region:</strong> ${pass.region}</p>
                <p><strong>Altitude:</strong> 🏔️ ${pass.altitude}</p>
                <p><strong>Primary Hazard:</strong> ${pass.primaryHazard}</p>
                <p class="popup-desc">${pass.description}</p>
            </div>
        `;
        marker.bindPopup(popupContent);
    });
}

// Pass Cards Renderer & Filtering
function renderPasses(filterRegion) {
    const container = document.getElementById("pass-cards-container");
    if (!container) return;

    container.innerHTML = "";

    const passesToDisplay = AVALANCHE_DATA.passes.filter(pass => {
        if (filterRegion === "all") return true;
        if (filterRegion === "western") return pass.region.includes("Ladakh") || pass.region.includes("Karakoram");
        if (filterRegion === "northwestern") return pass.region.includes("Jammu") || pass.region.includes("Himachal");
        if (filterRegion === "eastern") return pass.region.includes("Uttarakhand") || pass.region.includes("Sikkim");
        return true;
    });

    passesToDisplay.forEach(pass => {
        const card = document.createElement("div");
        card.className = "timeline-card";

        let badgeClass = "badge-info";
        if (pass.riskLevel.includes("Level 5") || pass.riskLevel.includes("Level 4-5")) badgeClass = "badge-critical";
        if (pass.riskLevel.includes("Level 4") || pass.riskLevel.includes("Level 3-4")) badgeClass = "badge-warning";

        card.innerHTML = `
            <div class="timeline-header">
                <span class="event-year" style="font-size: 1.1rem;">🏔️ ${pass.altitude}</span>
                <span class="badge ${badgeClass}">${pass.riskLevel}</span>
            </div>
            <h3 class="event-name">${pass.name}</h3>
            <div class="event-meta">
                <span>📍 Region: <strong>${pass.region}</strong></span>
                <span>⚠️ Primary Hazard: ${pass.primaryHazard}</span>
            </div>
            <p class="event-impact">${pass.description}</p>
        `;
        container.appendChild(card);
    });

    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderPasses(e.target.dataset.filter);
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

    AVALANCHE_DATA.quizQuestions.forEach((q, qIndex) => {
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
        const qData = AVALANCHE_DATA.quizQuestions[qIndex];
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
