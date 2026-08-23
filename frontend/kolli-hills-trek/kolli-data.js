/**
 * kolli-data.js
 * Comprehensive dataset for Kolli Hills Trek profile (Eastern Ghats, Tamil Nadu)
 */

const KOLLI_TREK_STATS = {
    name: "Kolli Hills Trek",
    altName: "Kolli Malai / Agasagangai Falls",
    elevationMeters: 1300,
    elevationFeet: 4265,
    location: "Namakkal District, Tamil Nadu",
    range: "Kolli Hills Range, Eastern Ghats",
    baseVillage: "Arapaleeswarar Temple checkpost, Semmedu",
    distanceFromTrichy: "90 km from Trichy to Namakkal / Kolli Hills",
    difficulty: "Easy to Moderate",
    ascentTimeHrs: "1.5 to 2 hours (Waterfall base climb-up)",
    descentTimeHrs: "1 hour (Down to Waterfall base)",
    trekDistanceKm: "10 km (Total round-trip trail circuits)",
    bestSeasons: "September to December (Post-Monsoon green forests)",
    sanctuaryPermit: "No special forest permit required; checkpost entry at the hills foothill"
};

const KOLLI_TREK_TIMELINE = [
    {
        year: "Ancient Sangam Era",
        title: "Valvil Ori's Reign",
        badge: "Historical Valour",
        description: "Kolli Hills were ruled by King Valvil Ori in 200 CE, one of the seven great patrons of ancient Tamil literature, renowned for his archery skills. The hills are mentioned in classic Sangam poetry."
    },
    {
        year: "1st Century CE",
        title: "Arapaleeswarar Temple Construction",
        badge: "Sacred Shiva Shrine",
        description: "The ancient Arapaleeswarar Temple was built near the Agasagangai waterfalls, dedicated to Lord Shiva and representing early Dravidian spiritual architecture."
    },
    {
        year: "Colonial Period",
        title: "Herbal Haven Mapping",
        badge: "Medicinal Cataloging",
        description: "British botanists explored the unique microclimate of Kolli Hills, cataloging over 500 species of medicinal herbs, earning the hills the title of 'Medicinal Mountain'."
    },
    {
        year: "Present Day",
        title: "Eco-Tourism & Spice Farms",
        badge: "Responsible Travel",
        description: "The Tamil Nadu Tourism and local tribal co-operatives promote organic spice farming (black pepper, cardamom, pineapple) and eco-friendly trekking routes to preserve the delicate Eastern Ghats biosphere."
    }
];

const KOLLI_TREK_HIGHLIGHTS = [
    {
        id: "agasagangai-falls",
        title: "Agasagangai Waterfalls",
        subtitle: "300-Foot Glacial Cascade",
        icon: "🌊",
        tag: "Hydrology",
        description: "The spectacular 300-foot waterfall located in a deep valley gorge, reached by descending 1,028 steep stone steps."
    },
    {
        id: "arapaleeswarar-temple",
        title: "Arapaleeswarar Temple",
        subtitle: "Ancient Dravidian Shiva Shrine",
        icon: "🛕",
        tag: "Heritage Landmark",
        description: "A historic temple from the Sangam period (built in the 1st century CE), showcasing classical stone carvings and sacred spring pools."
    },
    {
        id: "herbal-forest",
        title: "Medicinal Evergreen Forests",
        subtitle: "Sub-tropical Herb Haven",
        icon: "🌿",
        tag: "Botanical Wonders",
        description: "Trailing through rich sub-tropical evergreen woodlands packed with rare medicinal herbs, wild pepper, and ancient banyan root bridges."
    },
    {
        id: "seekuparai-view",
        title: "Seekuparai Viewpoint",
        subtitle: "Valley Outlook & Pine Trails",
        icon: "🏔️",
        tag: "Fauna & Wildlife",
        description: "A beautiful viewpoint overlooking deep valleys and pine forests, developed by the Forest Department for sunrise views."
    },
    {
        id: "masila-falls",
        title: "Masila Waterfalls",
        subtitle: "Gentle Family Cascade",
        icon: "💦",
        tag: "Hydrology",
        description: "A scenic, multi-tiered cascade located near Semmedu, ideal for a refreshing shower and family picnics."
    },
    {
        id: "selur-outlook",
        title: "Selur Nadu Viewpoint",
        subtitle: "Sahyadri-like Green Vistas",
        icon: "🏠",
        tag: "Fauna & Wildlife",
        description: "A high-altitude viewpoint presenting panoramic green mountain vistas, pineapple orchards, and terraced spice gardens."
    }
];

const KOLLI_TREK_STEPS = [
    {
        step: 1,
        title: "Arapaleeswarar Temple to steps entrance",
        duration: "15 minutes",
        terrain: "Flat paved walking, village shops",
        description: "Walk from the ancient temple entrance path, passing local tribal shops and entering the dense forest gateway."
    },
    {
        step: 2,
        title: "1,028 Steps descent to waterfall",
        duration: "1 hour",
        terrain: "Very steep concrete and stone steps",
        description: "Carefully climb down the 1,028 concrete and stone steps built into the vertical gorge wall, surrounded by thick foliage."
    },
    {
        step: 3,
        title: "Agasagangai Falls Basin",
        duration: "1.5 hours",
        terrain: "Wet rocks and river pool base",
        description: "Arrive at the base basin. Soak in the mist and spray of the majestic 300-foot waterfall. Bathe safely in the designated river pool."
    },
    {
        step: 4,
        title: "Climb back up to Arapaleeswarar Temple",
        duration: "1.5 hours",
        terrain: "Steep uphill stairs",
        description: "Climb the steep steps back to the temple base. The steep ascent is physically demanding and serves as the core test of endurance."
    }
];

const KOLLI_TREK_CHECKLIST = [
    { id: "shoes", text: "Sturdy trekking shoes (good grip for steep concrete steps and wet, mossy rocks near waterfalls)", category: "Footwear" },
    { id: "swimwear", text: "Towel & extra set of clothes (essential for taking a bath in the waterfall pool)", category: "Clothing" },
    { id: "water", text: "Sturdy water bottle & ORS energy drinks (climbing up the 1,000 steps requires high stamina)", category: "Essentials" },
    { id: "raincoat", text: "Rain cover / waterproof pouch (for protecting phones and cameras from waterfall mist and spray)", category: "Protection" },
    { id: "stick", text: "High-grip walking stick (helps distribute weight when climbing up/down steep stairs)", category: "Gear" },
    { id: "mosquito", text: "Mosquito repellent & sunscreen (essential for hiking inside dense evergreen sub-tropical forests)", category: "Essentials" }
];

const KOLLI_TREK_GALLERY = [
    {
        id: "gallery-falls",
        title: "Agasagangai Waterfalls Cascade",
        emoji: "🌊",
        caption: "The majestic 300-foot Agasagangai waterfall located in a deep forest gorge."
    },
    {
        id: "gallery-temple",
        title: "Arapaleeswarar Temple Architecture",
        emoji: "🛕",
        caption: "The ancient Arapaleeswarar Shiva Temple showcasing early Dravidian structural heritage."
    },
    {
        id: "gallery-steps",
        title: "The 1028 Stone Steps Gorge",
        emoji: "🪜",
        caption: "Steep stairs built into the cliff face, leading down to the waterfall basin."
    },
    {
        id: "gallery-forest",
        title: "Evergreen Medicinal Woodlands",
        emoji: "🌿",
        caption: "Thick evergreen sub-tropical forests covering the hills, famous for organic spice farming."
    },
    {
        id: "gallery-seekuparai",
        title: "Seekuparai Valley Lookout",
        emoji: "🏔️",
        caption: "A panoramic viewpoint offering a scenic outlook over the deep Eastern Ghats gorges."
    },
    {
        id: "gallery-spices",
        title: "Pineapple & Spice Terraces",
        emoji: "🏠",
        caption: "Local tribal agriculture terraces cultivating organic spices, pineapples, and black pepper."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KOLLI_TREK_STATS, KOLLI_TREK_TIMELINE, KOLLI_TREK_HIGHLIGHTS, KOLLI_TREK_STEPS, KOLLI_TREK_CHECKLIST, KOLLI_TREK_GALLERY };
}
