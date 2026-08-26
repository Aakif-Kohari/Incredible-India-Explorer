/**
 * Dzongri Trek Explorer — Data Module
 * Comprehensive dataset covering the Dzongri Trek (West Sikkim),
 * 4,250m Dzongri Top sunrise viewpoint, 360-degree Himalayan panorama (Kanchenjunga, Pandim, Kabru),
 * and Khangchendzonga National Park alpine trail.
 */

const DZONGRI_INFO = {
    id: "dzongri-trek",
    title: "Dzongri Trek (Sikkim's Alpine Meadow Trail)",
    region: "West Sikkim, India (Khangchendzonga National Park)",
    maxAltitude: "4,250 Meters (13,940 Feet) at Dzongri Top",
    trekDistance: "Approx. 50 km (Round Trip)",
    duration: "5 to 6 Days",
    difficulty: "Moderate",
    baseCamp: "Yuksom (1,780m / 5,840 ft)",
    bestSeasons: "March to May (Rhododendrons) & September to November (Clear Views)",
    unescoStatus: "Khangchendzonga National Park (UNESCO Mixed World Heritage Site)",
    quickStats: [
        { label: "Max Altitude", value: "4,250m (13,940 ft)", icon: "🏔️" },
        { label: "Difficulty", value: "Moderate", icon: "🥾" },
        { label: "Duration", value: "5–6 Days (50 km)", icon: "⏱️" },
        { label: "Sunrise View", value: "Dzongri Top (360°)", icon: "🌅" },
        { label: "Base Camp", value: "Yuksom, Sikkim", icon: "📍" },
        { label: "Flora", value: "Rhododendron Canopy", icon: "🌸" }
    ]
};

const TRAIL_CAMPSITES = [
    {
        day: "Day 1: Yuksom to Sachen",
        altitude: "Yuksom (1,780m) to Sachen (2,200m) — 8 km",
        description: "Trail winds through moist tropical and temperate forests of oak, birch, and ferns, crossing suspension bridges over the Rathong Chu river.",
        icon: "🌲"
    },
    {
        day: "Day 2: Sachen to Bakhim & Tshoka",
        altitude: "Sachen (2,200m) to Tshoka (2,960m) — 7 km",
        description: "Steep ascent passing the forest rest house at Bakhim, arriving at the picturesque Tibetan refugee settlement of Tshoka with views of Pandim.",
        icon: "🏘️"
    },
    {
        day: "Day 3: Tshoka to Phedang & Dzongri",
        altitude: "Tshoka (2,960m) to Dzongri (4,030m) — 9 km",
        description: "Climbing through wooden boardwalks under a dense rhododendron forest (Deorali Dara) before breaking into the sweeping high-altitude pastures of Dzongri.",
        icon: "🌸"
    },
    {
        day: "Day 4: Dawn Ascent to Dzongri Top & Exploration",
        altitude: "Dzongri Top (4,250m / 13,940 ft)",
        description: "Early morning hike to Dzongri Top witnessing golden alpenglow illuminating the Kanchenjunga massif, Pandim, Kabru, Simvo, and Narsing in a 360° vista.",
        icon: "🌅"
    },
    {
        day: "Day 5: Dzongri to Tshoka & Yuksom Descent",
        altitude: "Dzongri (4,030m) to Yuksom (1,780m) — 24 km",
        description: "Continuous descent through alpine pastures and lush forest trails retracing steps back to Yuksom base camp.",
        icon: "🥾"
    }
];

const MOUNTAIN_VISTAS = [
    {
        peak: "Mt. Kanchenjunga (Main & South)",
        height: "8,586m (28,169 ft)",
        significance: "Sikkim's sacred apex towering majestic over the Great Himalayan Range.",
        icon: "👑"
    },
    {
        peak: "Mt. Pandim & Narsing",
        height: "6,691m & 5,825m",
        significance: "Intimidating granite spires creating the eastern wall of the Dzongri amphitheatre.",
        icon: "⚡"
    },
    {
        peak: "Mt. Kabru & Forked Peak",
        height: "7,412m & 6,108m",
        significance: "Snow-crowned ridgeline separating Sikkim from the eastern Himalayas of Nepal.",
        icon: "🏔️"
    }
];

const REFERENCES = [
    { text: "Sikkim Tourism Development Corporation (STDC) — Dzongri High Altitude Trek Guide.", link: "https://www.sikkimtourism.gov.in" },
    { text: "Khangchendzonga Conservation Committee (KCC) — Yuksom Eco-Trekking Manual.", link: "https://www.kccsikkim.org" },
    { text: "UNESCO World Heritage Centre — Khangchendzonga National Park (No. 1513).", link: "https://whc.unesco.org" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DZONGRI_INFO, TRAIL_CAMPSITES, MOUNTAIN_VISTAS, REFERENCES };
}
