/**
 * rajmachi-data.js
 * Rajmachi Fort Trek Dataset — Sahyadri Mountains, Maharashtra
 */

const RAJMACHI_TREK_STATS = {
    name: "Rajmachi Fort Trek",
    localName: "राजमाची किल्ला",
    location: "Udhewadi, Lonavala / Karjat Region, Pune District, Maharashtra",
    elevationMeters: 825,
    elevationFeet: 2710,
    twinForts: "Shrivardhan Fort (higher citadel) & Manaranjan Fort (lower citadel)",
    difficulty: "Easy to Moderate (Easy from Lonavala / Moderate climb from Kondhane)",
    distanceLonavalaKm: 15.0,
    distanceKondhaneKm: 6.0,
    durationDays: "1 to 2 Days (3 – 5 hrs one-way trek)",
    bestSeasons: "June to September (Monsoon) & October to March (Post-monsoon & Winter)",
    startingPoints: "Lonavala (Tungarli/Valvan base) OR Kondhane Village (near Karjat)",
    nearestRailway: "Lonavala Railway Station (15 km) / Karjat Railway Station (16 km)",
    heritageSignificance: "Strategic Maratha fort controlling Borghat trade route; expanded by Chhatrapati Shivaji Maharaj in 1657"
};

const RAJMACHI_HIGHLIGHTS = [
    {
        id: "twin-citadels",
        title: "Shrivardhan & Manaranjan Twin Forts",
        category: "Fortress Architecture",
        icon: "🏰",
        description: "Two strategic hill citadels rising above the central Machi plateau village of Udhewadi, built to safeguard the historical Borghat trade pass."
    },
    {
        id: "monsoon-cascades",
        title: "Monsoon Waterfalls & Green Hills",
        category: "Seasonal Landscape",
        icon: "🌧️",
        description: "During monsoons, the Sahyadri hills transform into lush green landscapes with roaring waterfalls like Kataldhar and Kondhane cascades."
    },
    {
        id: "dual-routes",
        title: "Two Distinct Trek Approaches",
        category: "Trail Choice",
        icon: "🥾",
        description: "Choose between a flat scenic 15km walk from Lonavala or a steeper, lush 6km jungle climb from Kondhane village passing ancient caves."
    },
    {
        id: "fireflies-season",
        title: "Pre-Monsoon Fireflies Festival",
        category: "Natural Phenomenon",
        icon: "✨",
        description: "In late May and early June, millions of fireflies illuminate the forest canopy around Udhewadi village before heavy rains start."
    }
];

const RAJMACHI_FORT_HISTORY = {
    title: "Heritage & Military History of Rajmachi Fort",
    period: "Satavahana Era to Maratha & British Rule",
    overview: "Rajmachi fort played a pivotal strategic role in ancient and medieval Maharashtra owing to its position commanding the Borghat trade highway connecting the Deccan plateau with Konkan sea ports.",
    milestones: [
        "Satavahana Era (1st Century BCE): Early fortifications constructed to guard trade routes passing near Kondhane Buddhist Caves.",
        "1657 CE — Maratha Acquisition: Chhatrapati Shivaji Maharaj captured Rajmachi fort along with Kalyangad and fortified the twin citadels of Shrivardhan and Manaranjan.",
        "1704 CE — Mughal Siege: Briefly occupied by Mughal forces under Aurangzeb before being recaptured by the Marathas under Kanhoji Angre.",
        "1818 CE — British Control: The British East India Company took control of the fort complex after the fall of the Peshwas."
    ]
};

const RAJMACHI_ROUTES = [
    {
        name: "Route 1: Lonavala to Udhewadi Trail (Easy)",
        distance: "15.0 km",
        time: "3.5 – 4.5 hrs",
        terrain: "Flat dirt road & wide plateau trail",
        startingPoint: "Tungarli Dam / Valvan, Lonavala",
        description: "A long, scenic, gentle walk across the plateau from Lonavala. Popular among beginners, bikers, and overnight campers. Ideal during monsoon and winter."
    },
    {
        name: "Route 2: Kondhane Village / Karjat Trail (Moderate)",
        distance: "6.0 km",
        time: "2.5 – 3.5 hrs",
        terrain: "Steep forest incline & rocky steps",
        startingPoint: "Kondhane Village (near Karjat)",
        description: "A shorter but steeper climb through dense jungle from Karjat side. Passes the ancient 1st-century BCE Kondhane Buddhist Caves and monsoon streams."
    }
];

const RAJMACHI_MONSOON_INFO = {
    title: "Monsoon Scenery & Sahyadri Climate",
    highlights: [
        "Lush Greenery: The entire Sahyadri landscape turns deep emerald with misty clouds hovering over Shrivardhan peak.",
        "Waterfalls: Roaring streams create spectacular cascades including Kataldhar Falls falling into the Ulhas valley.",
        "Udhewadi Plateau Camping: Udhewadi village offers traditional Maharashtrian hospitality, local pithla bhakri, and rustic homestays."
    ],
    safetyNote: "During peak monsoons (July–August), stream currents can be strong. Trekkers should wear footwear with strong rubber grip and avoid standing near cliff edges."
};

const RAJMACHI_NEARBY = [
    {
        name: "Kondhane Buddhist Caves",
        distance: "3 km from Kondhane base",
        category: "Archaeological Site",
        description: "1st-century BCE rock-cut Buddhist cave complex featuring a grand chaitya hall, stupa, and intricate stone carvings."
    },
    {
        name: "Kataldhar Waterfall",
        distance: "7 km from trail",
        category: "Monsoon Waterfall",
        description: "A dramatic horseshoe-shaped waterfall falling into a deep jungle gorge near the Lonavala-Rajmachi trail."
    },
    {
        name: "Lonavala & Khandala Hill Stations",
        distance: "15 km",
        category: "Hill Station",
        description: "Famous Sahyadri hill station destination known for chikki sweets, viewpoints, and monsoon lakes."
    },
    {
        name: "Visapur & Lohagad Forts",
        distance: "25 km",
        category: "Neighboring Maratha Forts",
        description: "Twin historical hill forts near Malavli featuring massive iron doors and monsoon waterfall staircases."
    }
];

const RAJMACHI_CHECKLIST = [
    {
        id: "shoes",
        name: "Trekking Shoes with Strong Grip",
        required: true,
        category: "Footwear",
        reason: "Essential for slippery mud, wet rocks, and steep fort climbs during monsoon."
    },
    {
        id: "raincover",
        name: "Rain Poncho / Waterproof Jacket & Bag Cover",
        required: true,
        category: "Rainwear",
        reason: "Heavy monsoon showers are frequent in the Sahyadris from June to September."
    },
    {
        id: "water",
        name: "Reusable Water Bottle (2 Liters)",
        required: true,
        category: "Hydration",
        reason: "Hydration is essential on the long 15km Lonavala trail walk or steep Karjat climb."
    },
    {
        id: "torch",
        name: "Headlamp / Flashlight with Extra Batteries",
        required: true,
        category: "Lighting",
        reason: "Crucial for overnight camping in Udhewadi village or night fireflies walks."
    },
    {
        id: "powerbank",
        name: "Portable Power Bank",
        required: false,
        category: "Electronics",
        reason: "Limited charging points exist in remote Udhewadi village."
    },
    {
        id: "firstaid",
        name: "Personal First Aid & Ointment",
        required: true,
        category: "Health",
        reason: "For minor scratches, muscle relief, and insect repellent."
    }
];

const RAJMACHI_GALLERY = [
    {
        id: "img1",
        title: "Shrivardhan & Manaranjan Twin Forts",
        subtitle: "The majestic twin citadels of Rajmachi rising above mist-covered Sahyadri plateau.",
        alt: "Panoramic view of Shrivardhan and Manaranjan twin forts on green mountain plateau under misty sky",
        credit: "Photo Credit: Wikimedia Commons / Maharashtra Tourism (CC BY-SA 4.0)",
        category: "Fort View"
    },
    {
        id: "img2",
        title: "Monsoon Waterfalls & Sahyadri Valleys",
        subtitle: "Lush green mountain slopes cascading with monsoon streams near Rajmachi.",
        alt: "Green Sahyadri hills with waterfalls cascading down rocky slopes under cloudy monsoon sky",
        credit: "Photo Credit: Wikimedia Commons / Public Domain",
        category: "Monsoon Scenery"
    },
    {
        id: "img3",
        title: "Ancient Kondhane Buddhist Caves",
        subtitle: "1st-century BCE rock-cut caves along the Karjat trekking route.",
        alt: "Rock-cut ancient Buddhist cave facade with carved pillars and stone stupa in green forest setting",
        credit: "Photo Credit: Archaeological Survey of India (ASI) / Wikimedia Commons",
        category: "Heritage"
    },
    {
        id: "img4",
        title: "Udhewadi Machi Village Trail",
        subtitle: "The peaceful central plateau village nestled between the twin forts.",
        alt: "Narrow trail leading through rustic village houses toward green mountain fort peaks",
        credit: "Photo Credit: Maharashtra Tourism Official Archive",
        category: "Village Trail"
    }
];
