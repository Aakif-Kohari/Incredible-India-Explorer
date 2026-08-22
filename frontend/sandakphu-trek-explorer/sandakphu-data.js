/**
 * Sandakphu Trek Explorer — Data Module
 * Comprehensive dataset covering the Sandakphu-Phalut Trek (Singalila Ridge, West Bengal),
 * 3,636m highest peak in West Bengal, the iconic 'Sleeping Buddha' panorama of 4 8000ers
 * (Everest, Kanchenjunga, Lhotse, Makalu), and Singalila National Park.
 */

const SANDAKPHU_INFO = {
    id: "sandakphu-trek",
    title: "Sandakphu Trek (West Bengal's Highest Peak)",
    region: "Darjeeling District, West Bengal (Singalila Ridge / Indo-Nepal Border)",
    maxAltitude: "3,636 Meters (11,930 Feet) — Highest Summit in West Bengal",
    trekDistance: "Approx. 45 to 65 km (Trail Variant Dependent)",
    duration: "5 to 6 Days",
    difficulty: "Easy to Moderate",
    baseCamp: "Manebhanjan / Chitrey (2,134m / 7,000 ft)",
    bestSeasons: "October to December (Crystal Clear 8000er Views) & March to May (Rhododendrons & Magnolias)",
    biodiversityPark: "Singalila National Park (Protected Red Panda & Himalayan Black Bear Habitat)",
    quickStats: [
        { label: "Highest Point", value: "3,636m (11,930 ft)", icon: "🏔️" },
        { label: "Difficulty", value: "Easy–Moderate", icon: "🥾" },
        { label: "Duration", value: "5–6 Days", icon: "⏱️" },
        { label: "Four 8000ers", value: "Everest & Kanchenjunga", icon: "⭐" },
        { label: "Base Town", value: "Manebhanjan, WB", icon: "📍" },
        { label: "Wildlife", value: "Red Panda Habitat", icon: "🐾" }
    ]
};

const TRAIL_CAMPSITES = [
    {
        day: "Day 1: Manebhanjan to Chitrey & Tumling",
        altitude: "Manebhanjan (2,134m) to Tumling (2,970m) — 11 km",
        description: "Trail ascends through old monastery trails at Chitrey and fir woodlands along the winding Indo-Nepal border road to Tumling village.",
        icon: "🌲"
    },
    {
        day: "Day 2: Tumling to Kalipokhri via Singalila Checkpost",
        altitude: "Tumling (2,970m) to Kalipokhri (3,108m) — 14 km",
        description: "Entering Singalila National Park through Gairibas and Kaiyakatta, reaching the sacred high-altitude black-water lake of Kalipokhri.",
        icon: "💧"
    },
    {
        day: "Day 3: Kalipokhri to Sandakphu Summit",
        altitude: "Kalipokhri (3,108m) to Sandakphu (3,636m) — 6 km",
        description: "Steep final switchbacks (Bikkevbhanjan) leading to the highest peak in West Bengal with unobstructed views of the Sleeping Buddha.",
        icon: "🏔️"
    },
    {
        day: "Day 4: Sandakphu to Phalut (The Singalila Ridge Walk)",
        altitude: "Sandakphu (3,636m) to Phalut (3,600m) — 21 km",
        description: "One of the most exhilarating ridge walks in the world with rolling alpine meadows and the colossal Kanchenjunga massif right in front.",
        icon: "🌅"
    },
    {
        day: "Day 5: Phalut to Gorkhey & Srikhola",
        altitude: "Phalut (3,600m) to Gorkhey/Srikhola (1,900m) — 15 km",
        description: "Descent through virgin chestnut, pine, and bamboo forests along gushing mountain streams and picturesque Himalayan hamlets.",
        icon: "🏡"
    }
];

const THE_FOUR_8000ERS = [
    {
        peak: "Mt. Everest",
        height: "8,848m (#1 World)",
        cluster: "Everest Cluster (with Lhotse 8,516m & Makalu 8,485m)",
        description: "The pyramid peak of Everest stands distinct on the western horizon accompanied by its sister giants.",
        icon: "👑"
    },
    {
        peak: "The Sleeping Buddha (Kanchenjunga)",
        height: "8,586m (#3 World)",
        cluster: "Kanchenjunga Massif (Kumbhakarna, Pandim, Kabru, Simvo)",
        description: "The arrangement of peaks resembles the serene reclining silhouette of Lord Buddha.",
        icon: "☸️"
    },
    {
        peak: "Mt. Makalu & Lhotse",
        height: "8,485m & 8,516m",
        cluster: "Eastern Nepal Himalayas",
        description: "Makalu's sheer four-sided pyramid and Lhotse's imposing southern face visible crystal-clear at sunrise.",
        icon: "✨"
    }
];

const REFERENCES = [
    { text: "West Bengal Tourism Development Corporation (WBTDC) — Singalila Ridge Trek.", link: "https://www.wbtourism.gov.in" },
    { text: "Directorate of Forests, Government of West Bengal — Singalila National Park Management.", link: "https://www.westbengalforest.gov.in" },
    { text: "O'Malley, L.S.S. (1907). Bengal District Gazetteers: Darjeeling. The Bengal Secretariat Book Depot.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SANDAKPHU_INFO, TRAIL_CAMPSITES, THE_FOUR_8000ERS, REFERENCES };
}
