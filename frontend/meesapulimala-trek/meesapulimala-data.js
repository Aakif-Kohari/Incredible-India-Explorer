/**
 * meesapulimala-data.js
 * Meesapulimala Trek Dataset — Munnar, Idukki District, Kerala
 */

const MEESAPULIMALA_TREK_STATS = {
    name: "Meesapulimala Trek",
    localName: "മീശപ്പുലിമല",
    location: "Silent Valley / Rhodo Valley, Munnar, Idukki District, Kerala",
    elevationMeters: 2640,
    elevationFeet: 8661,
    rank: "2nd Highest Peak in Western Ghats & South India (after Anamudi)",
    difficulty: "Moderate to Strenuous",
    distanceKm: 8.0,
    distanceTotalKm: 16.0,
    durationDays: "1 to 2 Days (~6 – 8 hrs trekking time)",
    bestSeasons: "September to May (Post-monsoon, Winter & Spring)",
    startingPoint: "Silent Valley Estate / Rhodo Valley Base Camp, Munnar",
    nearestTown: "Munnar (24 km) / Adimali (54 km)",
    permits: "KFDC (Kerala Forest Development Corporation) Trekking Permit & Rhodo Mansion/Sky Cottage Booking"
};

const MEESAPULIMALA_HIGHLIGHTS = [
    {
        id: "second-highest",
        title: "2nd Highest South Indian Peak",
        category: "Elevation",
        icon: "⛰️",
        description: "At 2,640 meters (8,661 ft), Meesapulimala is South India's second-highest summit, offering unmatched high-altitude mountain vistas."
    },
    {
        id: "shola-grassland",
        title: "High Montane Shola Grasslands",
        category: "Ecosystem",
        icon: "🌾",
        description: "Expansive high-altitude montane grasslands dotted with Rhododendron trees and ancient tropical Shola forest pockets."
    },
    {
        id: "rhododendron",
        title: "Rhododendron Valley Blooms",
        category: "Flora",
        icon: "🌺",
        description: "Famous for native red Rhododendron blooms (Rhododendron arboreum ssp. nilagiricum) flourishing across Rhodo Valley during spring."
    },
    {
        id: "cloud-sea",
        title: "Sea of Clouds Panorama",
        category: "Viewpoint",
        icon: "☁️",
        description: "Early morning trekkers witness breathtaking cloud seas rolling over the Tamil Nadu border ridges and Anamudi peak massif."
    }
];

const MEESAPULIMALA_ECOSYSTEM = {
    title: "High Montane Grassland & Shola Forest Ecosystem",
    description: "Meesapulimala represents the classic high-altitude montane ecosystem of the Western Ghats, characterized by vast grassy ridges, damp Shola forest valleys, and endemic biodiversity.",
    features: [
        "Montane Grassland Mosaic: High-altitude undulating grasslands resilient to strong ridge winds and seasonal frosts.",
        "Shola Forest Pockets: Stunted tropical evergreen forests growing in mountain folds, serving as water catchments.",
        "Rhododendron Groves: Wild red Rhododendron arboreum (Nilgiri Rhododendron) flowering across Rhodo Valley.",
        "Neelakurinji Habitat: Regions of the ridge experience the rare 12-year Neelakurinji (Strobilanthes kunthiana) mass bloom.",
        "Wildlife Sanctuary Habitat: Sanctuary corridor for Nilgiri Tahr, wild elephants, gaur, sambar deer, and Nilgiri langur."
    ]
};

const MEESAPULIMALA_VIEWPOINTS = [
    {
        title: "Rhodo Valley Base Ridge Viewpoint",
        altitude: "2,200 m",
        description: "Overlooks the vast Rhododendron valley, pine forests, and Silent Valley tea garden slopes."
    },
    {
        title: "Kolukkumalai Crossover Ridge",
        altitude: "2,400 m",
        description: "Offers views down toward Kolukkumalai—the highest organic tea estate in the world—and the Tamil Nadu plains."
    },
    {
        title: "Meesapulimala Summit Crest (2,640m)",
        altitude: "2,640 m",
        description: "The 360° summit panorama showcasing Anamudi Peak (2,695m), Mattupetty Dam reservoir, Kundala Lake, and infinite cloud carpets."
    }
];

const MEESAPULIMALA_ROUTE_STEPS = [
    {
        step: 1,
        title: "Munnar to Silent Valley Base Camp",
        elevation: "1,900 m",
        distance: "0.0 km",
        time: "7:00 AM",
        description: "Drive from Munnar town (24 km) through tea gardens to Silent Valley Estate / KFDC Floriculture Centre check-in point."
    },
    {
        step: 2,
        title: "Silent Valley to Rhodo Valley Base Camp",
        elevation: "2,200 m",
        distance: "4.0 km",
        time: "9:30 AM",
        description: "Trek through pine plantations, mountain streams, and Rhododendron groves to reach KFDC Rhodo Mansion base camp."
    },
    {
        step: 3,
        title: "Rhodo Valley Grassland Ridge Climb",
        elevation: "2,450 m",
        distance: "6.5 km",
        time: "11:30 AM",
        description: "Ascend steep montane grassland ridges with windswept trails offering views over cloud valleys and surrounding tea estates."
    },
    {
        step: 4,
        title: "Meesapulimala Summit Peak Crest",
        elevation: "2,640 m",
        distance: "8.0 km",
        time: "1:00 PM",
        description: "Reach the 2,640m summit peak. Trekkers rest, photograph the 360° Western Ghats panorama, and begin the return descent."
    }
];

const MEESAPULIMALA_NEARBY = [
    {
        name: "Kolukkumalai Tea Estate",
        distance: "12 km",
        category: "Heritage Tea Estate",
        description: "World's highest organic tea plantation (2,170m), famous for traditional orthodox tea processing and sunrise views."
    },
    {
        name: "Mattupetty Dam & Lake",
        distance: "20 km",
        category: "Reservoir & Boating",
        description: "Picturesque storage dam near Munnar surrounded by tea gardens and elephant visiting corridors."
    },
    {
        name: "Anamudi Peak & Eravikulam National Park",
        distance: "30 km",
        category: "Highest Peak & Sanctuary",
        description: "South India's highest summit (2,695m) and primary sanctuary habitat for the endangered Nilgiri Tahr."
    },
    {
        name: "Top Station",
        distance: "32 km",
        category: "Viewpoint & Historical Gateway",
        description: "Historic upper railway terminal point offering panoramic views of Tamil Nadu's Theni valley."
    }
];

const MEESAPULIMALA_CHECKLIST = [
    {
        id: "boots",
        name: "Ankle-Support Trekking Shoes",
        required: true,
        category: "Footwear",
        reason: "Grassland slopes and steep rocky summit trails require strong rubber traction."
    },
    {
        id: "windcheater",
        name: "Windproof & Warm Fleece Jacket",
        required: true,
        category: "Apparel",
        reason: "Ridge winds are strong and temperatures at 2,640m summit drop sharply."
    },
    {
        id: "water",
        name: "Reusable Water Bottle (2 Liters)",
        required: true,
        category: "Hydration",
        reason: "Hydration is critical during high-altitude grassland ascents. Single-use plastic is banned."
    },
    {
        id: "permit",
        name: "KFDC Trekking Booking Receipt & ID",
        required: true,
        category: "Documents",
        reason: "Mandatory check at Silent Valley KFDC checkpost."
    },
    {
        id: "sun protection",
        name: "Sun Hat, UV Sunglasses & Sunscreen",
        required: true,
        category: "Protection",
        reason: "Montane grassland ridges have minimal tree canopy shade under direct sun."
    },
    {
        id: "raincoat",
        name: "Light Poncho / Rain Cover",
        required: true,
        category: "Rain Wear",
        reason: "Mountain weather around Munnar ridges can bring sudden mist and rain showers."
    }
];

const MEESAPULIMALA_GALLERY = [
    {
        id: "img1",
        title: "Meesapulimala 2,640m Summit Panorama",
        subtitle: "Rolling grassland ridges and cloud oceans seen from South India's 2nd highest peak.",
        alt: "Panoramic view of green mountain grassland ridges and cloud sea under blue sky at Meesapulimala summit",
        credit: "Photo Credit: Kerala Forest Development Corporation (KFDC) / Kerala Tourism (CC BY-SA 4.0)",
        category: "Summit View"
    },
    {
        id: "img2",
        title: "Rhodo Valley Base & Rhododendron Groves",
        subtitle: "Rhododendron trees blooming across high valley pastures in spring.",
        alt: "Red Rhododendron blossoms blooming on trees in a misty mountain valley near Munnar",
        credit: "Photo Credit: Wikimedia Commons / Public Domain",
        category: "Flora & Valley"
    },
    {
        id: "img3",
        title: "High Montane Shola Grasslands",
        subtitle: "The classic Shola-grassland landscape characteristic of the high Western Ghats.",
        alt: "Rolling green grassland slopes with dark green Shola forest patches in mountain gullies",
        credit: "Photo Credit: Kerala Tourism Official Archive",
        category: "Grassland"
    },
    {
        id: "img4",
        title: "Silent Valley Tea Estate Approach",
        subtitle: "Lush tea plantation slopes leading toward the Rhodo Valley trekking trail.",
        alt: "Emerald tea plantation gardens stretching across rolling hills in Silent Valley near Munnar",
        credit: "Photo Credit: Wikimedia Commons / Munnar Tourism Archive",
        category: "Tea Estates"
    }
];
