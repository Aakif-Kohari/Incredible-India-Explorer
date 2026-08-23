/**
 * kheerganga-data.js
 * Comprehensive dataset for Kheerganga Trek profile (Parvati Valley, Himachal Pradesh)
 */

const KHEERGANGA_TREK_STATS = {
    name: "Kheerganga Trek",
    altName: "Kheerganga Sacred Hot Springs",
    elevationMeters: 2960,
    elevationFeet: 9711,
    location: "Parvati Valley, Kullu District, Himachal Pradesh",
    range: "Pir Panjal Range, Western Himalayas",
    baseVillage: "Barsheni Village (Base point near Tosh/Kasol)",
    distanceFromKasol: "22 km from Kasol to Barsheni",
    difficulty: "Easy to Moderate",
    ascentTimeHrs: "4 to 5 hours (Barsheni to Kheerganga Top)",
    descentTimeHrs: "3 hours (Kheerganga Top to Barsheni)",
    trekDistanceKm: "24 km (Round-trip route from Barsheni)",
    bestSeasons: "April to June & September to November",
    sanctuaryPermit: "No special forest permit required; local register entry at checkpost"
};

const KHEERGANGA_TREK_TIMELINE = [
    {
        year: "Ancient Mythology",
        title: "Lord Shiva & Kartikeya",
        badge: "Sacred Penance",
        description: "According to Hindu legends, Kartikeya, the son of Lord Shiva and Goddess Parvati, spent thousands of years in deep meditation at Kheerganga. Shiva created a river of milk (Kheer) to feed him, which is said to have turned into the white sulphur springs."
    },
    {
        year: "18th Century",
        title: "Nath Sect Pilgrimage",
        badge: "Spiritual Sanctuary",
        description: "Followers of the Nath sect and Hindu saints established a small ashram and shrines near the hot springs, making it a sacred pilgrimage retreat."
    },
    {
        year: "1990s CE",
        title: "Hippie Culture Peak",
        badge: "International Hub",
        description: "Backpackers and international travelers discovered the tranquil hot springs, leading to Kasol and Kheerganga becoming legendary hubs of the hippie trail in India."
    },
    {
        year: "Present Day",
        title: "Eco-Cleanup & Regulation",
        badge: "Nature Preservation",
        description: "Following environmental concerns, the Himachal Pradesh High Court banned permanent commercial tents on the top meadow, restoring the natural beauty and encouraging responsible day-trekking and eco-camping."
    }
];

const KHEERGANGA_TREK_HIGHLIGHTS = [
    {
        id: "hot-springs",
        title: "Parvati Kund Springs",
        subtitle: "Natural Warm Sulphur Bath",
        icon: "♨️",
        tag: "Botanical Wonders",
        description: "A sacred hot water spring pool at the top, offering a therapeutic, steaming bath surrounded by snow-dusted mountains."
    },
    {
        id: "rudranag-temple",
        title: "Rudranag Temple",
        subtitle: "Historic Shiva Pilgrimage",
        icon: "🛕",
        tag: "Heritage Landmark",
        description: "A holy temple enroute named after the serpent-like waterfall shape, where pilgrims stop to offer prayers and drink cold mountain water."
    },
    {
        id: "rudranag-falls",
        title: "Rudranag Waterfall",
        subtitle: "Rushing Glacial Cascade",
        icon: "🌊",
        tag: "Hydrology",
        description: "A spectacular, roaring waterfall along the trekking trail, cascading over giant rock slabs into the Parvati valley gorge."
    },
    {
        id: "nakthan-village",
        title: "Nakthan Wooden Hamlet",
        subtitle: "Traditional Himachali Culture",
        icon: "🏠",
        tag: "Heritage Landmark",
        description: "A traditional Himachali village passed midway, featuring wood-and-stone architecture, apple orchards, and local tea stalls."
    },
    {
        id: "pine-canopy",
        title: "Parvati Valley Canopy",
        subtitle: "Pine & Oak Woodlands",
        icon: "🌲",
        tag: "Fauna & Wildlife",
        description: "Traversing through dense, mist-laden pine, fir, and oak woodlands, with the Parvati River roaring far below."
    },
    {
        id: "tosh-valley",
        title: "Tosh Village Views",
        subtitle: "Panoramic Alpine Outlook",
        icon: "🏔️",
        tag: "Fauna & Wildlife",
        description: "Captivating vistas of the adjacent Tosh river valley, Tosh village slopes, and the high snow peaks of the Parvati region."
    }
];

const KHEERGANGA_TREK_STEPS = [
    {
        step: 1,
        title: "Barsheni to Nakthan Village",
        duration: "1.5 hours",
        terrain: "Apple orchards, gradual stone path",
        description: "Begin at Barsheni dam site. Hike along a wide, gradual path passing apple orchards and traditional wooden homes of Nakthan village."
    },
    {
        step: 2,
        title: "Nakthan to Rudranag Temple",
        duration: "1.5 hours",
        terrain: "Dirt trail along Parvati River gorge",
        description: "Continue along the Parvati River stream. Cross a wooden bridge to reach the holy Rudranag Temple and view the serpent-shaped waterfall."
    },
    {
        step: 3,
        title: "Rudranag to Kheerganga Top Ascent",
        duration: "2 hours",
        terrain: "Steep forest climb, rocky terrain",
        description: "Cross the suspension bridge. The trail gets steep, climbing through thick pine and oak forests alongside roaring streams to the meadow top."
    },
    {
        step: 4,
        title: "Relax at Parvati Kund springs",
        duration: "Flexible stay",
        terrain: "Green alpine meadow top",
        description: "Arrive at the beautiful 2,960m meadow. Soak in the therapeutic sulphur hot springs of Parvati Kund and enjoy panoramic views of the valley."
    }
];

const KHEERGANGA_TREK_CHECKLIST = [
    { id: "boots", text: "Comfortable trekking shoes (good grip for muddy forest sections and wet rocks near waterfalls)", category: "Footwear" },
    { id: "swimwear", text: "Towel & swimwear (essential for bathing in the Parvati Kund hot springs)", category: "Clothing" },
    { id: "jacket", text: "Warm fleece or light down jacket (temperatures drop significantly in the evening at the top meadow)", category: "Clothing" },
    { id: "poncho", text: "Rain poncho / waterproof cover (afternoon showers are common in Kullu valley forests)", category: "Clothing" },
    { id: "daypack", text: "Small daypack (perfect for a 1-night stay or day hike from Barsheni)", category: "Gear" },
    { id: "soap", text: "Personal toiletries & biodegradable soap (to preserve the natural water quality of the hot springs area)", category: "Essentials" }
];

const KHEERGANGA_TREK_GALLERY = [
    {
        id: "gallery-springs",
        title: "Therapeutic Hot Springs of Parvati Kund",
        emoji: "♨️",
        caption: "The hot water sulphur pools at the top of Kheerganga, believed to have healing properties."
    },
    {
        id: "gallery-waterfall",
        title: "Roaring Rudranag Waterfall",
        emoji: "🌊",
        caption: "The majestic serpent-shaped waterfall cascading through Kullu mountains."
    },
    {
        id: "gallery-temple",
        title: "Sacred Rudranag Temple",
        emoji: "🛕",
        caption: "A quiet, holy Hindu temple enroute where trekkers stop for blessings and mountain water."
    },
    {
        id: "gallery-nakthan",
        title: "Nakthan Alpine Village",
        emoji: "🏠",
        caption: "Traditional wooden homes and lush green apple orchards of Nakthan village."
    },
    {
        id: "gallery-forest",
        title: "Pine Canopy Trails",
        emoji: "🌲",
        caption: "Hiking through dense, misty pine and oak woodlands of the Parvati valley."
    },
    {
        id: "gallery-meadow",
        title: "Kheerganga Summit Meadow",
        emoji: "🏔️",
        caption: "The wide grassy clearing at 2,960m presenting stunning views of surrounding peaks."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KHEERGANGA_TREK_STATS, KHEERGANGA_TREK_TIMELINE, KHEERGANGA_TREK_HIGHLIGHTS, KHEERGANGA_TREK_STEPS, KHEERGANGA_TREK_CHECKLIST, KHEERGANGA_TREK_GALLERY };
}
