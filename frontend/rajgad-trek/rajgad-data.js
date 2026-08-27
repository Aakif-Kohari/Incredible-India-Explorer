/**
 * rajgad-data.js
 * Comprehensive dataset for Rajgad Fort Trek profile
 */

const RAJGAD_STATS = {
    name: "Rajgad Fort",
    altName: "Durgaraj (King of Forts)",
    elevationMeters: 1376,
    elevationFeet: 4514,
    location: "Velhe Taluka, Pune District, Maharashtra",
    range: "Sahyadri Mountain Range (Western Ghats)",
    baseVillages: "Gunjavane / Pali Village",
    distanceFromPune: "60 km",
    difficulty: "Moderate to Challenging",
    ascentTimeHrs: "3 to 4.5 hours",
    descentTimeHrs: "2 to 3 hours",
    capitalDuration: "26 years (1647 – 1673 CE)",
    bestSeasons: "Monsoon (July–Sept) & Winter (Oct–Feb)",
    firstCapturedYear: "1647 CE",
    builtBy: "Chhatrapati Shivaji Maharaj & Maratha Engineers"
};

const RAJGAD_TIMELINE = [
    {
        year: "1647 CE",
        title: "Acquisition & Renaming to Rajgad",
        badge: "Empire Capital",
        description: "Shivaji Maharaj captured Murumbadevi Dongar and renamed it 'Rajgad' (King of Forts). Using gold treasure discovered at nearby Torna Fort, he transformed it into the first official capital of the Maratha Empire."
    },
    {
        year: "1647–1673 CE",
        title: "26 Years as the Maratha Capital",
        badge: "Golden Era",
        description: "For over a quarter century, Rajgad served as the strategic brain, royal residence, and military headquarters of Shivaji Maharaj. Major campaigns and diplomatic treaties were executed from this stronghold."
    },
    {
        year: "1659 CE",
        title: "Planning the Afzal Khan Campaign",
        badge: "Military Strategy",
        description: "Shivaji Maharaj formulated his counter-strategy against Bijapuri General Afzal Khan at Rajgad before marching to Pratapgad."
    },
    {
        year: "1665 CE",
        title: "Siege & Treaty of Purandar",
        badge: "Diplomacy",
        description: "Rajgad endured fierce Mughal shelling under Jai Singh I. Queen Saibai (Shivaji Maharaj's first wife) passed away here, and her sacred Samadhi stands on Padmavati Machi."
    },
    {
        year: "1666 CE",
        title: "Return from Agra Escape",
        badge: "Historic Return",
        description: "Following his miraculous escape from Mughal captivity in Agra, Shivaji Maharaj safely returned to Rajgad Fort disguised as a holy ascetic, reuniting with Jijabai and his commanders."
    },
    {
        year: "1674 CE",
        title: "Capital Shifts to Raigad",
        badge: "Coronation",
        description: "Prior to his grand coronation in 1674 CE, Shivaji Maharaj moved the imperial capital from Rajgad to Raigad Fort due to Raigad's larger administrative space."
    }
];

const RAJGAD_HIGHLIGHTS = [
    {
        id: "padmavati-machi",
        title: "Padmavati Machi",
        subtitle: "The Royal Administrative Plateau",
        icon: "🏛️",
        tag: "Royal Residence",
        description: "The primary machi containing the Padmavati Temple, Padmavati Lake, Queen Saibai's Samadhi, royal court ruins, and spacious halls that offer night shelter for trekkers."
    },
    {
        id: "sanjeevani-machi",
        title: "Sanjeevani Machi",
        subtitle: "2.5 km Triple-Layered Fortification",
        icon: "⚔️",
        tag: "Defense Engineering",
        description: "A breathtaking 2.5 km long narrow ridge featuring triple-curtain fortified walls, machicolations, and subterranean bastions engineered to withstand heavy cannon fire."
    },
    {
        id: "suvela-machi",
        title: "Suvela Machi & Nedhe",
        subtitle: "The Natural Needle-Eye Rock Hole",
        icon: "🪨",
        tag: "Natural Formation",
        description: "Extending toward the east, Suvela Machi features a famous natural rock hole called 'Nedhe' (Needle Eye) carved through solid basalt stone by centuries of mountain wind."
    },
    {
        id: "bale-killa",
        title: "Bale Killa (Citadel)",
        subtitle: "1,376m Ultra-Steep Apex",
        icon: "🚩",
        tag: "Summit Citadel",
        description: "The highest, central citadel of Rajgad towering above the three machis. Accessible via near-vertical rock scarp steps with iron rope supports, offering 360-degree views."
    },
    {
        id: "pali-chor-gates",
        title: "Pali & Chor Darwaja",
        subtitle: "Royal & Secret Access Portals",
        icon: "🚪",
        tag: "Basalt Gateways",
        description: "Pali Darwaja features wide stone steps constructed for royal horses and palanquins, while Chor Darwaja is a hidden rock portal used for covert emergency exits."
    },
    {
        id: "padmavati-lake",
        title: "Padmavati Lake & Cisterns",
        subtitle: "Hydro-Engineering Mastery",
        icon: "💧",
        tag: "Water Management",
        description: "A large masonry water lake on Padmavati Machi, supplemented by dozens of rock-cut water tanks (Takis) carved directly into solid mountain rock."
    }
];

const RAJGAD_TREK_STEPS = [
    {
        step: 1,
        title: "Gunjavane Base to Chor Darwaja Approach",
        duration: "60–90 mins",
        terrain: "Rocky mountain trail & shrub slopes",
        description: "The classic trek begins at Gunjavane village. The initial leg climbs steep grassy slopes with scenic views of Gunjavane Dam backwaters."
    },
    {
        step: 2,
        title: "Steep Rock Scramble & Iron Railing",
        duration: "45 mins",
        terrain: "Exposed basalt rock with railings",
        description: "Near the upper cliff band, the trail ascends steep rock steps supported by iron safety cables leading directly into Chor Darwaja (Secret Gate)."
    },
    {
        step: 3,
        title: "Chor Darwaja Entry to Padmavati Machi",
        duration: "30 mins",
        terrain: "Carved stone steps & fort plateau",
        description: "Entering through Chor Darwaja opens onto Padmavati Machi. Here trekkers can rest at Padmavati Temple, refill water from the lake, and set up camp."
    },
    {
        step: 4,
        title: "Bale Killa Citadel Scramble",
        duration: "45–60 mins",
        terrain: "Near-vertical rock scarp with iron supports",
        description: "Climb the formidable central citadel (Bale Killa). High caution is required on steep rock steps. The summit rewards you with 360° views of Torna, Sinhagad, and Raigad."
    },
    {
        step: 5,
        title: "Traversing Sanjeevani & Suvela Machis",
        duration: "90–120 mins",
        terrain: "Fortified ridge walks & stone bastions",
        description: "Explore the long curtain walls of Sanjeevani Machi to the west, and Suvela Machi with its famous Nedhe (Needle Eye rock hole) to the east."
    }
];

const RAJGAD_CHECKLIST = [
    { id: "shoes", text: "High-ankle trekking shoes with deep rubber lug tread", category: "Footwear" },
    { id: "water", text: "3 to 4 Liters of drinking water (electrolytes recommended)", category: "Hydration" },
    { id: "light", text: "Headlamp or strong LED flashlight (mandatory for night stays / early starts)", category: "Safety" },
    { id: "rain", text: "Waterproof poncho / rain jacket & dry bag for electronics (Monsoon)", category: "Clothing" },
    { id: "sleeping", text: "Light sleeping bag / mat (if planning overnight stay in Padmavati Temple)", category: "Camping" },
    { id: "snack", text: "High-energy trail snacks (chikki, dates, dry fruits, energy bars)", category: "Nutrition" },
    { id: "firstaid", text: "First-aid kit (knee bandages, antiseptic cream, salt for leeches)", category: "Safety" },
    { id: "cash", text: "Physical cash (limited mobile connectivity & UPI at base villages)", category: "Essentials" }
];

const RAJGAD_GALLERY = [
    {
        id: "gallery-rajgad-hero",
        title: "Rajgad Citadel & Machis",
        emoji: "🏔️",
        caption: "The commanding profile of Rajgad Fort featuring Bale Killa citadel and surrounding machis."
    },
    {
        id: "gallery-suvela",
        title: "Suvela Machi & Nedhe",
        emoji: "🪨",
        caption: "The natural needle-eye rock hole (Nedhe) on Suvela Machi carved by mountain winds."
    },
    {
        id: "gallery-sanjeevani",
        title: "Sanjeevani Machi Walls",
        emoji: "⚔️",
        caption: "Triple-fortified defense walls of Sanjeevani Machi stretching 2.5 km along the mountain ridge."
    },
    {
        id: "gallery-padmavati",
        title: "Padmavati Temple & Lake",
        emoji: "🏛️",
        caption: "The historic Padmavati Temple and water reservoir on the main administrative plateau."
    },
    {
        id: "gallery-pali-gate",
        title: "Pali Darwaja Royal Gate",
        emoji: "🚪",
        caption: "Royal entrance gate with wide stone steps built for royal palanquins and cavalry."
    },
    {
        id: "gallery-sunset",
        title: "Sahyadri Sunset from Bale Killa",
        emoji: "🌅",
        caption: "Spectacular 360-degree sunset vista from Bale Killa looking toward Torna Fort."
    }
];
