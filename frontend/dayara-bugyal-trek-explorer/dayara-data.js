/**
 * Dayara Bugyal Trek Explorer — Data Module
 * Comprehensive dataset covering Dayara Bugyal (Uttarkashi, Uttarakhand),
 * 3,700m Bakaria Top, 28 sq km vast alpine meadows, Bandarpoonch & Gangotri panoramas,
 * seasonal transformations, and the traditional Butter Festival (Anduri Utsav).
 */

const DAYARA_INFO = {
    id: "dayara-bugyal-trek",
    title: "Dayara Bugyal Trek (Uttarakhand's Alpine Meadow)",
    region: "Uttarkashi District, Garhwal Himalayas, Uttarakhand",
    maxAltitude: "3,700 Meters (12,140 Feet) at Bakaria Top",
    trekDistance: "Approx. 22 km (Round Trip)",
    duration: "4 to 5 Days",
    difficulty: "Easy to Moderate",
    baseCamp: "Raithal Village (2,250m / 7,400 ft) — Ancient Heritage Hamlet",
    meadowArea: "Sprawling across 28 sq km of rolling high-altitude grasslands",
    culturalHighlight: "Anduri Utsav (Traditional Butter Festival on Bhadrapada Sankranti)",
    quickStats: [
        { label: "Summit Point", value: "3,700m Bakaria Top", icon: "🏔️" },
        { label: "Difficulty", value: "Easy–Moderate", icon: "🥾" },
        { label: "Duration", value: "4–5 Days (22 km)", icon: "⏱️" },
        { label: "Crown Peak", value: "Bandarpoonch (6,316m)", icon: "⭐" },
        { label: "Base Village", value: "Raithal, Uttarkashi", icon: "📍" },
        { label: "Culture", value: "Anduri Butter Festival", icon: "🧈" }
    ]
};

const TRAIL_CAMPSITES = [
    {
        day: "Day 1: Raithal Base Village to Gui Campsite",
        altitude: "Raithal (2,250m) to Gui (2,900m) — 5 km",
        description: "Gradual forest trail ascending through ancient deodar, green oak, and blooming rhododendron trees to the serene clearing of Gui.",
        icon: "🌲"
    },
    {
        day: "Day 2: Gui to Chilapada & Barnala Lake",
        altitude: "Gui (2,900m) to Chilapada (3,200m) — 3.5 km",
        description: "Trail crosses natural forest streams, opening into the Barnala meadows and the sacred reflection pond of Barnala Tal with Nag Devta temple.",
        icon: "💧"
    },
    {
        day: "Day 3: Chilapada to Dayara Bugyal Meadows & Bakaria Top",
        altitude: "Chilapada to Dayara Bugyal (3,400m) & Bakaria Top (3,700m) — 6 km",
        description: "Climbing out of the tree line into the colossal velvet meadows of Dayara, culminating at the panoramic crest of Bakaria Top.",
        icon: "🏔️"
    },
    {
        day: "Day 4: Dayara Bugyal to Raithal Village Descent",
        altitude: "Dayara Bugyal to Raithal (2,250m) — 7.5 km",
        description: "Leisurely descent through the golden oak and maple forest canopy directly into the historic wooden architecture village of Raithal.",
        icon: "🏡"
    }
];

const MOUNTAIN_PANORAMAS = [
    {
        peak: "Mt. Bandarpoonch (I & II)",
        height: "6,316m & 6,102m",
        significance: "Garhwal's iconic 'Tail of the Monkey' massif standing in breathtaking proximity.",
        icon: "🐒"
    },
    {
        peak: "Black Peak (Kalanag)",
        height: "6,387m (20,955 ft)",
        significance: "Intimidating black rock horn resembling the hood of a cobra (Kalanag).",
        icon: "⚡"
    },
    {
        peak: "Gangotri I, II, III & Srikantha",
        height: "6,672m & 6,133m",
        significance: "Sacred glaciated peaks flanking the Bhagirathi river source basin.",
        icon: "🏔️"
    },
    {
        peak: "Draupadi Ka Danda & Jaonli",
        height: "5,710m & 6,632m",
        significance: "Snow ridge peaks featured in Himalayan mountaineering training routes.",
        icon: "❄️"
    }
];

const REFERENCES = [
    { text: "Uttarakhand Tourism Development Board (UTDB) — Dayara Bugyal Trek Profile.", link: "https://uttarakhandtourism.gov.in" },
    { text: "Garhwal Mandal Vikas Nigam (GMVN) — Trekking in Garhwal Himalayas Guide.", link: "https://gmvnonline.com" },
    { text: "Atkinson, Edwin T. (1882). The Himalayan Gazetteer. Government Press, Allahabad.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DAYARA_INFO, TRAIL_CAMPSITES, MOUNTAIN_PANORAMAS, REFERENCES };
}
