/**
 * sinhagad-data.js
 * Comprehensive dataset for Sinhagad Trek profile
 */

const SINHAGAD_STATS = {
    name: "Sinhagad Fort",
    altName: "Kondhana (The Lion's Fort)",
    elevationMeters: 1312,
    elevationFeet: 4304,
    location: "Donje / Atekarwadi, Pune District, Maharashtra",
    range: "Sahyadri Mountain Range (Western Ghats)",
    baseVillage: "Atekarwadi / Donje Village",
    distanceFromPune: "30 km",
    difficulty: "Easy to Moderate",
    ascentTimeHrs: "1.5 to 2.5 hours",
    descentTimeHrs: "1 to 1.5 hours",
    trekDistanceKm: "3.5 km (from Atekarwadi base)",
    bestSeasons: "Monsoon (July–Sept) & Winter (Oct–Feb)",
    historicBattleYear: "1670 CE",
    hero: "Subedar Tanaji Malusare"
};

const SINHAGAD_TIMELINE = [
    {
        year: "1328 CE",
        title: "Earliest Recorded Siege",
        badge: "Ancient Era",
        description: "Muhammad bin Tughlaq captured Kondhana from Koli chieftain Nag Naik after an eight-month siege, demonstrating the fort's strategic control over the Pune valley."
    },
    {
        year: "1647 CE",
        title: "Shivaji Maharaj Takes Kondhana",
        badge: "Swarajya",
        description: "A young Shivaji Maharaj acquired Kondhana through strategic negotiations with Siddi Amber, the Adilshahi governor, securing a critical fortress guarding the approach to Pune."
    },
    {
        year: "1665 CE",
        title: "Treaty of Purandar Surrender",
        badge: "Diplomacy",
        description: "Following Rajput General Mirza Raja Jai Singh's invasion, Kondhana was surrendered to Mughal forces led by commander Udaybhan Rathore under the terms of the Purandar Treaty."
    },
    {
        year: "1670 CE",
        title: "The Glorious Battle of Sinhagad",
        badge: "Legendary Battle",
        description: "In a legendary night assault, Subedar Tanaji Malusare led 300 Maratha Mavalas scaling the sheer cliff of Tanaji Kada using rope ladders. Tanaji defeated Udaybhan but died in battle. Shivaji Maharaj famously grieved: 'Gad ala pan sinha gela' ('The fort is won, but the lion is lost'), renaming Kondhana to Sinhagad."
    },
    {
        year: "1700 CE",
        title: "Passing of Chhatrapati Rajaram Maharaj",
        badge: "Maratha Royalty",
        description: "Chhatrapati Rajaram Maharaj, younger son of Shivaji Maharaj, passed away at Sinhagad Fort in 1700 CE. A grand memorial (Samadhi) stands at the fort in his honor."
    },
    {
        year: "1818 CE",
        title: "British Conquest",
        badge: "British Era",
        description: "British East India Company forces under General Pritzler bombarded Sinhagad Fort for three days before capturing it, marking the end of Maratha sovereignty over the fortress."
    }
];

const SINHAGAD_HIGHLIGHTS = [
    {
        id: "tanaji-kada",
        title: "Tanaji Kada Cliff",
        subtitle: "The Steep Night-Scalers' Precipice",
        icon: "🧗",
        tag: "Historical Site",
        description: "The vertical, near-90-degree basalt cliff face on the western side of Sinhagad. This is where Tanaji Malusare and his Maratha warriors made their impossible night climb in 1670 CE."
    },
    {
        id: "kalyan-darwaja",
        title: "Kalyan Darwaja",
        subtitle: "The Ancient Trekker Entrance",
        icon: "🚪",
        tag: "Architecture",
        description: "The double-bastioned stone gateway facing southwest toward Kalyan village. This serves as the historic entrance portal for trekkers ascending from Atekarwadi base."
    },
    {
        id: "pune-darwaja",
        title: "Pune Darwaja",
        subtitle: "North-Facing Strategic Gate",
        icon: "🏰",
        tag: "Fortification",
        description: "The primary vehicle and foot entry gateway on the north face, comprising three sequential gates built with heavy wooden doors studded with iron spikes to deter war elephants."
    },
    {
        id: "tanaji-samadhi",
        title: "Tanaji Malusare Memorial",
        subtitle: "Braveheart's Eternal Rest",
        icon: "🗡️",
        tag: "Memorial",
        description: "A consecrated stone shrine dedicated to Subedar Tanaji Malusare, housing a life-sized statue of the Maratha warrior adorned with saffron flags and flower garlands."
    },
    {
        id: "dev-taki",
        title: "Dev Taki Water Tank",
        subtitle: "Sweet Rock-Cut Spring",
        icon: "💧",
        tag: "Natural Spring",
        description: "A famous natural rock-cut cistern containing crystal-clear, sweet mountain spring water that remains cool year-round and has sustained travelers for centuries."
    },
    {
        id: "kanda-bhajji-culture",
        title: "Kanda Bhajji & Mattha Hub",
        subtitle: "Sahyadri Culinary Heritage",
        icon: "🍲",
        tag: "Gastronomy",
        description: "Sinhagad is world-renowned among foodies for its piping hot Kanda Bhajji (onion fritters), fresh Pithla Bhakri (gram flour curry with millet flatbread), and sweet Mattha (spiced buttermilk) served in clay pots."
    }
];

const SINHAGAD_TREK_STEPS = [
    {
        step: 1,
        title: "Atekarwadi Base to Muddy Trail Incline",
        duration: "30 mins",
        terrain: "Earthen trail & rocky steps",
        description: "The trek starts at Atekarwadi village (near Donje). The initial leg is a moderate climb along red soil paths flanked by local shrubs and seasonal wildflower patches."
    },
    {
        step: 2,
        title: "Mid-Mountain Ridge & Viewpoint",
        duration: "30 mins",
        terrain: "Rocky mountain ridge",
        description: "The trail opens onto a breezy ridge line offering panoramic views of Khadakwasla Dam backwaters, Donje valley, and distant Pune city skyline."
    },
    {
        step: 3,
        title: "Steep Rock Steps to Kalyan Darwaja",
        duration: "30 mins",
        terrain: "Carved basalt stone stairs",
        description: "The final ascent negotiates steep stone stairs carved into basalt rock, passing through the historic arches of Kalyan Darwaja into the main fort enclosure."
    },
    {
        step: 4,
        title: "Fort Exploration & Food Stalls",
        duration: "60–90 mins",
        terrain: "Flat stone plateau",
        description: "Explore Tanaji Kada cliff, Tanaji Samadhi, Rajaram Maharaj Samadhi, Dev Taki, TV Tower point, and savor fresh village delicacies at the summit food stalls."
    }
];

const SINHAGAD_CHECKLIST = [
    { id: "shoes", text: "Sturdy trekking shoes or sneakers with good rubber grip", category: "Footwear" },
    { id: "water", text: "2 Liters of drinking water (Dev Taki spring water also available at top)", category: "Hydration" },
    { id: "rain", text: "Windcheater / raincoat or poncho (Monsoon season)", category: "Clothing" },
    { id: "sun", text: "Cap / Hat & Sunscreen (Winter / Sun protection)", category: "Protection" },
    { id: "cash", text: "Small cash notes for local food stalls & entry ticket", category: "Essentials" },
    { id: "camera", text: "Camera or smartphone for Khadakwasla & Sahyadri valley views", category: "Gear" }
];

const SINHAGAD_GALLERY = [
    {
        id: "gallery-sinhagad-hero",
        title: "Sinhagad Ramparts & Valley",
        emoji: "⛰️",
        caption: "The commanding summit of Sinhagad Fort overlooking Khadakwasla backwaters."
    },
    {
        id: "gallery-kalyan-gate",
        title: "Kalyan Darwaja Entry",
        emoji: "🚪",
        caption: "Trekkers passing through the ancient stone portals of Kalyan Darwaja."
    },
    {
        id: "gallery-tanaji-kada",
        title: "Tanaji Kada Cliff Face",
        emoji: "🧗",
        caption: "The sheer basalt wall climbed by Tanaji Malusare during the 1670 CE battle."
    },
    {
        id: "gallery-food",
        title: "Hot Pithla Bhakri & Dahi",
        emoji: "🍲",
        caption: "Traditional Maharashtrian mountain feast served fresh at summit food stalls."
    },
    {
        id: "gallery-monsoon",
        title: "Monsoon Fog & Waterfalls",
        emoji: "🌧️",
        caption: "Thick fog blanket and lush greenery enveloping Sinhagad during monsoon."
    },
    {
        id: "gallery-sunset",
        title: "Golden Sunset from Fort Wall",
        emoji: "🌅",
        caption: "Sunset view over the Western Ghats from the northern bastions."
    }
];
