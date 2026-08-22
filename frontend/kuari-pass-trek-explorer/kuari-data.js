/**
 * Kuari Pass Trek Explorer — Data Module
 * Comprehensive dataset covering Kuari Pass (Chamoli, Uttarakhand),
 * 3,876m Curzon Trail, close-up Mt. Nanda Devi (India's 2nd highest peak) & Dronagiri vistas,
 * pristine oak and deodar forest belts, and Tali-Khullara alpine campsites.
 */

const KUARI_INFO = {
    id: "kuari-pass-trek",
    title: "Kuari Pass Trek (The Lord Curzon Trail)",
    region: "Chamoli District, Garhwal Himalayas, Uttarakhand",
    maxAltitude: "3,876 Meters (12,516 Feet) at Kuari Pass Summit",
    trekDistance: "Approx. 33 km (Round Trip)",
    duration: "5 to 6 Days",
    difficulty: "Moderate",
    baseCamp: "Dhak Village / Joshimath (1,875m / 6,150 ft)",
    historicalName: "The Curzon Trail (Explored by Lord Curzon in 1905)",
    crownMountain: "Mt. Nanda Devi (7,816m — India's 2nd Highest Peak)",
    quickStats: [
        { label: "Pass Altitude", value: "3,876m (12,516 ft)", icon: "🏔️" },
        { label: "Difficulty", value: "Moderate", icon: "🥾" },
        { label: "Duration", value: "5–6 Days (33 km)", icon: "⏱️" },
        { label: "Crown Peak", value: "Nanda Devi (7,816m)", icon: "👑" },
        { label: "Base Town", value: "Joshimath / Dhak", icon: "📍" },
        { label: "Historical Route", value: "The Curzon Trail (1905)", icon: "📜" }
    ]
};

const TRAIL_CAMPSITES = [
    {
        day: "Day 1: Dhak Base Village to Gulling Top",
        altitude: "Dhak (2,050m) to Gulling Top (2,900m) — 6 km",
        description: "Trail winds past step farming terraces of Tugasi village, climbing into fragrant pine and silver birch forests.",
        icon: "🌲"
    },
    {
        day: "Day 2: Gulling Top to Tali Forest Campsite",
        altitude: "Gulling Top (2,900m) to Tali (3,370m) — 5 km",
        description: "Enchanting canopy walk through dense, ancient oak and rhododendron woodlands with crystal streams emerging at Tali.",
        icon: "🍂"
    },
    {
        day: "Day 3: Tali to Kuari Pass Summit & Khullara",
        altitude: "Tali (3,370m) to Kuari Pass (3,876m) to Khullara (3,395m) — 8 km",
        description: "Traversing the high-altitude ridge with sweeping vistas of Nanda Devi sanctuary, Dronagiri, and Kamet at the Kuari Pass crest.",
        icon: "🏔️"
    },
    {
        day: "Day 4: Khullara to Tali Lake & Auli Meadows",
        altitude: "Khullara to Tali Lake (3,500m) to Auli (2,590m) — 8 km",
        description: "Ridge trek past high alpine Tali lake descending into the world-famous bugyals and ski slopes of Auli overlooking Neelkanth.",
        icon: "🎿"
    },
    {
        day: "Day 5: Auli to Joshimath",
        altitude: "Auli (2,590m) to Joshimath (1,875m) — 6 km / Cable Car",
        description: "Descent into the sacred pilgrimage and mountaineering gateway hub of Joshimath.",
        icon: "🏘️"
    }
];

const HIMALAYAN_GIANTS = [
    {
        peak: "Mt. Nanda Devi & Nanda Devi East",
        height: "7,816m & 7,434m",
        significance: "India's highest peak located entirely within the country; the revered 'Bliss-Giving Goddess'.",
        icon: "👑"
    },
    {
        peak: "Mt. Dronagiri (Dunagiri)",
        height: "7,066m (23,182 ft)",
        significance: "The mythological herb mountain associated with the Sanjeevani booti in the Ramayana.",
        icon: "🌿"
    },
    {
        peak: "Mt. Kamet & Trishul",
        height: "7,756m & 7,120m",
        significance: "Colossal glaciated spires dominating the northern Zanskar and Garhwal horizon.",
        icon: "⚡"
    },
    {
        peak: "Hathi-Ghodi Parvat & Chaukhamba",
        height: "6,727m & 7,138m",
        significance: "Striking geological twin formations shaped like an elephant and a horse.",
        icon: "🐘"
    }
];

const REFERENCES = [
    { text: "Uttarakhand Tourism Development Board (UTDB) — Kuari Pass Trek Profile.", link: "https://uttarakhandtourism.gov.in" },
    { text: "Smythe, Frank S. (1938). The Valley of Flowers. Hodder & Stoughton, London.", link: "#" },
    { text: "Nanda Devi Biosphere Reserve Management Plan — Forest Department of Uttarakhand.", link: "https://forest.uk.gov.in" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KUARI_INFO, TRAIL_CAMPSITES, HIMALAYAN_GIANTS, REFERENCES };
}
