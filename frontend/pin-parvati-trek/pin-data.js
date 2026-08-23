/**
 * pin-data.js
 * Comprehensive dataset for Pin Parvati Pass Trek profile (Kullu to Spiti, Himachal Pradesh)
 */

const PIN_TREK_STATS = {
    name: "Pin Parvati Pass Trek",
    altName: "Pin Parvati Pass Traverse (5,319m)",
    elevationMeters: 5319,
    elevationFeet: 17450,
    location: "Parvati Valley (Kullu) to Pin Valley (Spiti), Himachal Pradesh",
    range: "Pir Panjal & Great Himalayan Ranges",
    baseVillage: "Barsheni (Kullu side) & Mud (Spiti side)",
    distanceFromManali: "100 km to Barsheni / 200 km to Kaza",
    difficulty: "Extremely Challenging",
    ascentTimeHrs: "7 to 8 hours (Base Camp to Pass Summit)",
    descentTimeHrs: "4 to 5 hours (Pass Summit to Pin Base Camp)",
    trekDistanceKm: "110 km (Total traverse distance)",
    bestSeasons: "July to September (Himalayan Summer & Monsoon)",
    sanctuaryPermit: "Mandatory Khirganga & Pin Valley National Park Permits"
};

const PIN_TREK_TIMELINE = [
    {
        year: "1884 CE",
        title: "Louis Dane's Discovery",
        badge: "First Crossing",
        description: "Sir Louis Dane, a British administrator, successfully discovered and crossed the Pin Parvati Pass in 1884 while seeking an alternative route connecting the Kullu and Spiti valleys."
    },
    {
        year: "1958 CE",
        title: "Mountaineering Surveys",
        badge: "Glacial Records",
        description: "Early Indian mountaineering teams documented the snout and crevasses of the Parvati Glacier, charting the climbing routes."
    },
    {
        year: "1987 CE",
        title: "Pin Valley National Park",
        badge: "Conservation Bounds",
        description: "The Pin Valley National Park was established across 675 square kilometers in Spiti, providing a sanctuary for snow leopards and Siberian ibex along the descent route."
    },
    {
        year: "Present Day",
        title: "High-Altitude Wilderness Traverse",
        badge: "Compulsory Guides",
        description: "The trek remains one of India's most challenging expeditions. The state government mandates certified guides, satellite navigation, and physical fitness medical certificates."
    }
];

const PIN_TREK_HIGHLIGHTS = [
    {
        id: "pin-parvati-pass",
        title: "Pin Parvati Pass 5,319m",
        subtitle: "High-Altitude Glaciated Pass",
        icon: "🏔️",
        tag: "Summit View",
        description: "The narrow, wind-swept pass marked by prayer flags, offering a stark contrast between green Kullu slopes and barren Spiti valleys."
    },
    {
        id: "mantalai-lake",
        title: "Mantalai Glacial Lake",
        subtitle: "Parvati River Glacial Source",
        icon: "🌊",
        tag: "Botanical Wonders",
        description: "A sacred lake at 4,116m flanked by moraine walls and ice fields, serving as the source of the Parvati River and a key high-altitude camp."
    },
    {
        id: "parvati-valley",
        title: "Lush Parvati Valley Woods",
        subtitle: "Coniferous Forests & Gorges",
        icon: "🌲",
        tag: "Fauna & Wildlife",
        description: "The scenic first half of the trek traversing through pine woodlands, cascading streams, and rocky gorges of Kheerganga and Tunda Bhuj."
    },
    {
        id: "pin-valley-desert",
        title: "Pin Valley Cold Desert",
        subtitle: "Barren Spiti Geologic Formations",
        icon: "🌵",
        tag: "Fauna & Wildlife",
        description: "The second half of the trek presenting colorful geological rock structures, barren scree slopes, and wide glacial beds of Spiti."
    },
    {
        id: "river-crossings",
        title: "Turbulent River Crossings",
        subtitle: "Adrenaline-filled crossings",
        icon: "💦",
        tag: "Hydrology",
        description: "Navigating swift-flowing mountain rivers over narrow log bridges, pulley systems, or cold early-morning wade crossings."
    },
    {
        id: "mud-village",
        title: "Mud Village Gateway",
        subtitle: "Traditional Spitian Culture",
        icon: "🏠",
        tag: "Heritage Landmark",
        description: "The picturesque terminal settlement in Spiti Valley, featuring whitewashed mud-brick homes and ancient Buddhist monasteries."
    }
];

const PIN_TREK_STEPS = [
    {
        step: 1,
        title: "Barsheni to Tunda Bhuj",
        duration: "6 to 7 hours",
        terrain: "Pine-shaded trails, steep gorges",
        description: "Begin at Barsheni village. Walk past the hot springs of Kheerganga, climbing through pine woodlands and gorges alongside the roaring Parvati River to Tunda Bhuj."
    },
    {
        step: 2,
        title: "Tunda Bhuj to Mantalai Lake",
        duration: "2 Days trek",
        terrain: "High rocky meadows & moraine walls",
        description: "Traverse rocky meadows of Thakur Kuan and high rock bridges. Climb past moraine walls to reach the sacred, serene Mantalai Lake at 4,116m."
    },
    {
        step: 3,
        title: "Mantalai to Pin Parvati Pass Summit",
        duration: "8 to 10 hours",
        terrain: "Glaciated crevasses & steep snow packs",
        description: "Ascend steep moraine slopes to the glaciated Parvati Base Camp. Cross crevassed ice fields to reach the 5,319m Pin Parvati Pass summit."
    },
    {
        step: 4,
        title: "Pass to Mud Village Descent",
        duration: "3 Days trek",
        terrain: "Arid scree slopes & wide river flats",
        description: "Descend down to the dry Pin Valley Base Camp. Walk along wide rocky river flats and subalpine meadows to finish at the Spitian hamlet of Mud Village."
    }
];

const PIN_TREK_CHECKLIST = [
    { id: "boots", text: "Professional mountaineering boots (rigid sole suitable for attaching crampons / microspikes)", category: "Footwear" },
    { id: "harness", text: "Glacial climbing harness & roping gear (compulsory for traversing crevassed glaciers)", category: "Gear" },
    { id: "jacket", text: "Heavy-duty down jacket & high-strength windcheater (summit temperatures drop far below freezing)", category: "Clothing" },
    { id: "oxygen", text: "Portable oxygen cylinder & emergency medical kit (altitude sickness AMS risk is extremely high)", category: "Essentials" },
    { id: "stick", text: "Telescopic walking pole & ice axe (helps negotiate steep scree slopes and hard ice)", category: "Gear" },
    { id: "protection", text: "Waterproof rucksack cover & thermal inner layers (monsoons hit Parvati valley hard)", category: "Protection" }
];

const PIN_TREK_GALLERY = [
    {
        id: "gallery-pass",
        title: "Glaciated Pin Parvati Pass 5,319m",
        emoji: "🏔️",
        caption: "The narrow, wind-swept pass marked by prayer flags, offering a stark contrast between Kullu and Spiti."
    },
    {
        id: "gallery-mantalai",
        title: "Source Lake of Mantalai",
        emoji: "🌊",
        caption: "A sacred lake at 4,116m flanked by moraine walls and ice fields, serving as the source of the Parvati River."
    },
    {
        id: "gallery-gorge",
        title: "Parvati River Gorges",
        emoji: "🌲",
        caption: "The scenic first half of the trek traversing through pine woodlands, cascading streams, and rocky gorges."
    },
    {
        id: "gallery-glacier",
        title: "Crevassed Glacier Fields",
        emoji: "❄️",
        caption: "Navigating crevassed ice sheets under professional guide roping protocols."
    },
    {
        id: "gallery-spiti",
        title: "Barren Pin Valley Desert",
        emoji: "🌵",
        caption: "The second half of the trek presenting colorful geological rock structures in Spiti."
    },
    {
        id: "gallery-mud",
        title: "Charming Mud Village in Spiti",
        emoji: "🏠",
        caption: "The picturesque terminal settlement in Spiti Valley, featuring whitewashed mud-brick homes."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PIN_TREK_STATS, PIN_TREK_TIMELINE, PIN_TREK_HIGHLIGHTS, PIN_TREK_STEPS, PIN_TREK_CHECKLIST, PIN_TREK_GALLERY };
}
