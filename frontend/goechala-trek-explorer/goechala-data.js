/**
 * Goechala Trek Explorer — Data Module
 * Comprehensive dataset covering the Goechala Trek (West Sikkim),
 * 4,600m Goecha La Pass, close-up Mt. Kanchenjunga vistas, Samiti Lake,
 * Khangchendzonga National Park (UNESCO Site), and day-by-day trail route.
 */

const GOECHALA_INFO = {
    id: "goechala-trek",
    title: "Goechala Trek (Sikkim's Grand Himalayan Pass)",
    region: "West Sikkim, India (Khangchendzonga National Park)",
    maxAltitude: "4,600 Meters (15,100 Feet) at Goecha La ViewPoint",
    trekDistance: "Approx. 90 km (Round Trip)",
    duration: "10 to 11 Days",
    difficulty: "Moderate to Difficult",
    baseCamp: "Yuksom (1,780m / 5,840 ft) — Historic Capital of Sikkim",
    bestSeasons: "Spring (Apr–May Rhododendrons) & Autumn (Oct–Nov Clear Skies)",
    unescoStatus: "Khangchendzonga National Park (UNESCO Mixed World Heritage Site)",
    quickStats: [
        { label: "Max Altitude", value: "4,600m (15,100 ft)", icon: "🏔️" },
        { label: "Difficulty", value: "Moderate–Difficult", icon: "🥾" },
        { label: "Duration", value: "10–11 Days (90 km)", icon: "⏱️" },
        { label: "Crown Peak", value: "Mt. Kanchenjunga", icon: "⭐" },
        { label: "Base Camp", value: "Yuksom, Sikkim", icon: "📍" },
        { label: "Sacred Lake", value: "Samiti Lake", icon: "💧" }
    ]
};

const TRAIL_CAMPSITES = [
    {
        day: "Day 1–2: Base Camp Yuksom to Sachen & Tshoka",
        altitude: "Yuksom (1,780m) -> Sachen (2,200m) -> Tshoka (2,960m)",
        description: "Trail crosses suspension bridges over the raging Rathong Chu river, ascending through dense temperate oak, bamboo, and pine forests.",
        icon: "🌲"
    },
    {
        day: "Day 3–4: Tshoka to Phedang & Dzongri",
        altitude: "Tshoka (2,960m) -> Phedang (3,690m) -> Dzongri (4,030m)",
        description: "Steep wooden log trail through enchanting scarlet and pink rhododendron canopy opening up into the high-altitude alpine meadow of Dzongri.",
        icon: "🌸"
    },
    {
        day: "Day 5: Dzongri Top Sunrise Panorama",
        altitude: "Dzongri Top (4,250m / 13,940 ft)",
        description: "Pre-dawn climb yielding a breathtaking 360-degree sunrise view illuminating Kanchenjunga, Pandim, Kabru, Simvo, and Rathong.",
        icon: "🌅"
    },
    {
        day: "Day 6–7: Dzongri to Thansing & Lamuney",
        altitude: "Dzongri (4,030m) -> Kokchurang -> Thansing (3,930m) -> Lamuney (4,160m)",
        description: "Descent to Prek Chu river followed by a vast tundra valley walk flanked by the towering vertical wall of Mount Pandim.",
        icon: "🏞️"
    },
    {
        day: "Day 8: Summit Push to Samiti Lake & Goecha La Pass",
        altitude: "Lamuney (4,160m) -> Samiti Lake (4,300m) -> Goecha La (4,600m)",
        description: "Night push reaching the turquoise emerald Samiti Lake, followed by sunrise at ViewPoint 1 gazing into Kanchenjunga's southeast face.",
        icon: "🏔️"
    },
    {
        day: "Day 9–10: Descent to Tshoka and Yuksom",
        altitude: "Lamuney -> Thansing -> Phedang -> Tshoka -> Yuksom",
        description: "Swift retracing through high alpine meadows and rhododendron forest reserves down to historic Yuksom town.",
        icon: "🏘️"
    }
];

const MOUNTAIN_VISTAS = [
    {
        peak: "Mt. Kanchenjunga",
        height: "8,586m (28,169 ft)",
        significance: "3rd highest mountain in the world; sacred guardian deity of Sikkim.",
        icon: "👑"
    },
    {
        peak: "Mt. Pandim",
        height: "6,691m (21,952 ft)",
        significance: "Dramatic sharp granite pyramid peak guarding the Prek Chu river valley.",
        icon: "⚡"
    },
    {
        peak: "Mt. Kabru (North & South)",
        height: "7,412m (24,318 ft)",
        significance: "Colossal snow wall forming the ridge border between India and Nepal.",
        icon: "🏔️"
    },
    {
        peak: "Simvo & Rathong Peaks",
        height: "6,812m & 6,678m",
        significance: "Glaciated peaks flanking the Goecha La pass corridor.",
        icon: "❄️"
    }
];

const REFERENCES = [
    { text: "Forest and Environment Department, Government of Sikkim — Khangchendzonga Trekking Guidelines.", link: "https://sikkimforest.gov.in" },
    { text: "UNESCO World Heritage Centre — Khangchendzonga National Park (No. 1513).", link: "https://whc.unesco.org" },
    { text: "Hooker, Joseph Dalton (1854). Himalayan Journals: Notes of a Naturalist in Bengal, the Sikkim and Nepal Himalayas.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GOECHALA_INFO, TRAIL_CAMPSITES, MOUNTAIN_VISTAS, REFERENCES };
}
