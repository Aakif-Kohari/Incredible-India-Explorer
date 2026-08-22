/**
 * torna-data.js
 * Comprehensive dataset for Torna Fort Trek profile
 */

const TORNA_STATS = {
    name: "Torna Fort",
    altName: "Prachandagad (The Massive Fort)",
    elevationMeters: 1403,
    elevationFeet: 4603,
    location: "Velhe Taluka, Pune District, Maharashtra",
    range: "Western Ghats / Sahyadri Range",
    baseVillage: "Velhe",
    distanceFromPune: "60 km",
    difficulty: "Moderate to Challenging",
    ascentTimeHrs: "3 to 4 hours",
    descentTimeHrs: "2 to 2.5 hours",
    trekDistanceKm: "6.5 km (one way)",
    bestSeasons: "Monsoon (July–Sept) & Winter (Oct–Feb)",
    firstCapturedYear: "1646 CE",
    capturedBy: "Chhatrapati Shivaji Maharaj (at age 16)"
};

const TORNA_TIMELINE = [
    {
        year: "1646 CE",
        title: "The First Victory of Hindavi Swarajya",
        badge: "Milestone",
        description: "At just 16 years of age, Chhatrapati Shivaji Maharaj captured Torna Fort from the Adilshahi Sultanate of Bijapur. This historic victory marked the founding spark of Hindavi Swarajya (Self-Rule)."
    },
    {
        year: "1647 CE",
        title: "Renamed to Prachandagad & Treasure Discovery",
        badge: "Architecture",
        description: "Impressed by the vast spread of the fort, Shivaji Maharaj renamed it 'Prachandagad' (The Massive Fort). During fortification repairs, secret pots of hidden gold treasure were unearthed, which financed the construction of Rajgad Fort."
    },
    {
        year: "1665 CE",
        title: "Treaty of Purandar",
        badge: "Diplomacy",
        description: "Under the Treaty of Purandar signed with Mughal General Jai Singh I, Torna was among the 23 forts surrendered to the Mughal Empire, while Shivaji Maharaj retained 12 key strongholds."
    },
    {
        year: "1670 CE",
        title: "Maratha Reconquest",
        badge: "Reconquest",
        description: "Shivaji Maharaj launched a lightning counter-offensive across Maharashtra, recapturing Torna Fort along with Sinhagad, Purandar, and Kalyan, restoring Maratha authority."
    },
    {
        year: "1704 CE",
        title: "Mughal Siege by Aurangzeb",
        badge: "Siege",
        description: "Emperor Aurangzeb personally led a massive Mughal army to besiege Torna. After fierce resistance by Maratha defenders under Amanullah Khan, the fort was captured and renamed Futulghai ('Key of Victory')."
    },
    {
        year: "1707 CE",
        title: "Recaptured by Sarchitnis & Marathas",
        badge: "Restoration",
        description: "Following Aurangzeb's death in Ahmednagar, Maratha commanders under Shankaraji Narayan Sarchitnis recaptured Torna Fort, raising the Maratha saffron flag once again."
    },
    {
        year: "1818 CE",
        title: "British East India Company Period",
        badge: "British Era",
        description: "During the Third Anglo-Maratha War, British forces under Colonel Prother took possession of Torna Fort after bombardment, concluding the military era of the fortress."
    }
];

const TORNA_HIGHLIGHTS = [
    {
        id: "zunjar-machi",
        title: "Zunjar Machi",
        subtitle: "The Warrior's Cliff Edge",
        icon: "⚔️",
        tag: "Military Architecture",
        description: "A narrow, razor-sharp fortified ridge jutting out into the valley like a drawn sword. Accessible via steep rock steps and iron railings, Zunjar Machi offered absolute military dominance over the western valley approach."
    },
    {
        id: "budhla-machi",
        title: "Budhla Machi",
        subtitle: "The Pot-Shaped Bastion Ridge",
        icon: "🏺",
        tag: "Natural Formation",
        description: "Named after its distinct shape resembling an inverted vessel or oil container ('Budhla' in Marathi). This vast eastern plateau features double fortified walls and leads toward the famous Torna-Rajgad ridge trail."
    },
    {
        id: "menghai-temple",
        title: "Menghai Devi Temple",
        subtitle: "Sanctuary & Trekker Haven",
        icon: "🛕",
        tag: "Sacred Landmark",
        description: "Located on the upper plateau near the citadel, this ancient temple dedicated to Goddess Menghai served as an administrative site during Maratha times and now offers overnight shelter for trekkers."
    },
    {
        id: "bini-kothar-gates",
        title: "Bini & Kothar Darwaja",
        subtitle: "Monolithic Basalt Gateways",
        icon: "🚪",
        tag: "Fortification",
        description: "The main historic entry points carved directly into sheer basalt cliffs. Bini Darwaja forms the outer defense gate, while Kothar Darwaja features formidable bastions designed to funnel enemies into crossbow and cannon fire."
    },
    {
        id: "sadayal-peak",
        title: "Sadayal Peak / Flag Point",
        subtitle: "1,403m High Vantage Point",
        icon: "🚩",
        tag: "Summit View",
        description: "The highest point on Torna Fort marked by the Maratha flag post. On clear days, it commands unmatched 360-degree views of Rajgad, Sinhagad, Raigad, Lingana, and the distant Mahabaleshwar plateau."
    },
    {
        id: "water-cisterns",
        title: "Kopard Kothar & Rock-cut Takis",
        subtitle: "Hydro-Engineering Mastery",
        icon: "💧",
        tag: "Water Management",
        description: "Ancient rock-cut water tanks (Takis) carved into solid basalt stone. Rainwater harvested here sustained garrison troops during months-long sieges and continues to provide potable water to trekkers."
    }
];

const TORNA_TREK_STEPS = [
    {
        step: 1,
        title: "Velhe Base Village to Initial Plateau",
        duration: "45–60 mins",
        terrain: "Soil trail & grassy slopes",
        description: "The trek begins from Velhe village, crossing agricultural fields before climbing grassy ridges. Steady upward incline with scenic views of Gunjavani Dam backwaters behind you."
    },
    {
        step: 2,
        title: "Rocky Patch & Railing Section",
        duration: "45 mins",
        terrain: "Exposed rock & iron safety railings",
        description: "The trail steepens significantly near the cliff band. Steel railings and cable supports are fixed along steep basalt steps to help trekkers negotiate exposed rock patches safely."
    },
    {
        step: 3,
        title: "Bini Darwaja & Kothar Darwaja Entry",
        duration: "30 mins",
        terrain: "Carved stone steps & stone bastions",
        description: "Passing through the historic Bini Darwaja (outer gate) leads into the inner defensive corridor leading to Kothar Darwaja. The ancient stonework here showcases classic Maratha military architecture."
    },
    {
        step: 4,
        title: "Menghai Devi Plateau & Citadel Exploration",
        duration: "45 mins",
        terrain: "Flat stone plateau & temple precinct",
        description: "Reaching the main summit plateau, trekkers arrive at the Menghai Devi temple. Here you can rest, refill water, visit historic water cisterns, and prepare for exploring the two machis."
    },
    {
        step: 5,
        title: "Traversing Zunjar Machi & Budhla Machi",
        duration: "60 mins",
        terrain: "Narrow ridge trails & cliffside paths",
        description: "Explore Zunjar Machi to the west for thrilling cliff views, and Budhla Machi to the east. Exercise high caution along narrow ridge sections, especially during monsoon wind gusts."
    }
];

const TORNA_CHECKLIST = [
    { id: "shoes", text: "Sturdy trekking shoes with high ankle support & deep rubber tread", category: "Footwear" },
    { id: "water", text: "At least 3 Liters of drinking water (electrolytes / ORS recommended)", category: "Hydration" },
    { id: "rain", text: "Waterproof poncho / rain jacket & dry bags for electronics (Monsoon)", category: "Clothing" },
    { id: "light", text: "Headlamp or strong LED flashlight with spare batteries", category: "Safety" },
    { id: "snack", text: "High-energy snacks (dates, nuts, energy bars, chikki)", category: "Nutrition" },
    { id: "firstaid", text: "Personal first-aid kit (bandages, antiseptic, knee support, salt for leeches)", category: "Safety" },
    { id: "sun", text: "Sunscreen, sunglasses, and wide-brim hat (Winter / Spring)", category: "Protection" },
    { id: "cash", text: "Sufficient physical cash (limited UPI signal at Velhe base village)", category: "Essentials" }
];

const TORNA_GALLERY = [
    {
        id: "gallery-hero",
        title: "Prachandagad Skyline",
        emoji: "🏔️",
        caption: "The majestic cliff faces and expansive bastions of Torna Fort rising 1,403 meters into Sahyadri clouds."
    },
    {
        id: "gallery-zunjar",
        title: "Zunjar Machi Ridge",
        emoji: "⚔️",
        caption: "The dramatic, narrow fortification wall of Zunjar Machi stretching outward into the abyss."
    },
    {
        id: "gallery-gate",
        title: "Kothar Darwaja Gateway",
        emoji: "🚪",
        caption: "Massive basalt entrance gate carved with protective bastions, standing resilient through centuries."
    },
    {
        id: "gallery-temple",
        title: "Menghai Devi Shrine",
        emoji: "🛕",
        caption: "Ancient sanctuary on the upper plateau, offering solace and shelter to generations of mountain travelers."
    },
    {
        id: "gallery-monsoon",
        title: "Monsoon Waterfalls & Mist",
        emoji: "🌧️",
        caption: "During monsoon months (July-September), green hillsides come alive with rushing waterfalls and cloud cover."
    },
    {
        id: "gallery-sunset",
        title: "Sahyadri Sunset from Summit",
        emoji: "🌅",
        caption: "Panoramic golden hour view from Sadayal Peak looking out over Rajgad Fort and the Western Ghats."
    }
];
