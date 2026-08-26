/**
 * chembra-data.js
 * Chembra Peak Trek Dataset — Wayanad, Kerala
 */

const CHEMBRA_TREK_STATS = {
    name: "Chembra Peak Trek",
    localName: "ചെമ്പ്ര കൊടുമുടി",
    location: "Meppadi, Wayanad District, Kerala",
    elevationMeters: 2100,
    elevationFeet: 6890,
    lakeElevationMeters: 1500,
    lakeElevationFeet: 4920,
    difficulty: "Moderate",
    distanceKm: 4.5,
    distanceTotalKm: 9.0,
    durationHours: "3.5 – 4.5 hrs",
    bestSeasons: "September to March",
    startingPoint: "VSS Forest Checkpost, Meppadi (Wayanad)",
    nearestTown: "Meppadi (5 km) / Kalpetta (17 km)",
    permits: "Mandatory Forest Department / VSS Entry Pass at Meppadi Checkpost"
};

const CHEMBRA_HIGHLIGHTS = [
    {
        id: "heart-lake",
        title: "Heart-Shaped Lake (Hridayathadam)",
        category: "Natural Feature",
        icon: "💚",
        description: "A natural, perennial heart-shaped lake situated at ~1,500m elevation. Known in Malayalam as Hridayathadam or Hridaya Saras, it never dries up even during dry summer months."
    },
    {
        id: "shola-grassland",
        title: "Shola-Grassland Ecosystem",
        category: "Ecosystem",
        icon: "🌱",
        description: "The trail passes through rolling montane grasslands interspersed with dense tropical Shola forest patches, home to unique Western Ghats endemic biodiversity."
    },
    {
        id: "tea-estates",
        title: "Lush Tea Plantation Base",
        category: "Landscape",
        icon: "🍃",
        description: "The initial leg winds through emerald tea gardens surrounding Meppadi before entering the protected forest zone maintained by the VSS (Vana Samrakshana Samithi)."
    },
    {
        id: "wayanad-panorama",
        title: "360° Wayanad Valley Vistas",
        category: "Viewpoint",
        icon: "⛰️",
        description: "Panoramic views of the Western Ghats range, Kozhikode border hills, and Banasura peak across the mist-shrouded Wayanad plateau."
    }
];

const CHEMBRA_LAKE_INFO = {
    name: "Hridayathadam (Hridaya Saras)",
    meaning: "Heart-Shaped Lake in Malayalam",
    elevation: "1,500 meters (4,920 ft)",
    perennial: true,
    conservationNote: "To protect the lake ecosystem and wildlife habitat, bathing or stepping into the water is strictly prohibited by the Kerala Forest Department.",
    legends: [
        "Local folklore tells that the lake was carved by ancient celestial beings and has remained filled with crystal-clear water throughout recorded history.",
        "The lake serves as a natural watering site for native birds and high-altitude fauna of the Western Ghats."
    ]
};

const CHEMBRA_ROUTE_STEPS = [
    {
        step: 1,
        title: "Base Checkpost at Meppadi Tea Estates",
        elevation: "950 m",
        distance: "0.0 km",
        time: "0 mins",
        description: "Obtain mandatory VSS forest entry passes at the Chembra Forest Office checkpost. Walk through manicured green tea plantations on a gentle incline."
    },
    {
        step: 2,
        title: "Forest Watchtower & Border Gate",
        elevation: "1,150 m",
        distance: "1.5 km",
        time: "45 mins",
        description: "Reach the Forest Department watchtower offering early valley views. Enter the protected tropical evergreen forest trail with steep rocky steps."
    },
    {
        step: 3,
        title: "Shola Forest & Montane Ridge Trail",
        elevation: "1,350 m",
        distance: "3.0 km",
        time: "1 hr 45 mins",
        description: "Ascend through Shola forest patches. The tree canopy gives way to open montane grasslands with steep grassy slopes and panoramic wind breezes."
    },
    {
        step: 4,
        title: "Heart-Shaped Lake (Hridayathadam)",
        elevation: "1,500 m",
        distance: "4.5 km",
        time: "2 hrs 30 mins",
        description: "Arrive at the famous heart-shaped lake nestled in the grassy saddle. Trekkers rest here, capture photographs, and take in views of surrounding peaks."
    }
];

const CHEMBRA_VIEWPOINTS = [
    {
        title: "Lower Watchtower Deck",
        altitude: "1,150 m",
        description: "Offers wide views over Meppadi tea estates, Chembra peak base, and distant forest valleys."
    },
    {
        title: "Heart-Shaped Lake Viewpoint",
        altitude: "1,500 m",
        description: "The iconic photographic spot overlooking the natural heart-shaped waterbody with the summit ridge rising behind."
    },
    {
        title: "Wayanad Plateau Vista Ridge",
        altitude: "1,520 m",
        description: "Sweeping views of Banasura Sagar dam reservoir, Kozhikode ghat roads, and mist-clad Western Ghats ranges."
    }
];

const CHEMBRA_NEARBY = [
    {
        name: "Soochipara Waterfalls (Sentinel Rock)",
        distance: "15 km",
        category: "Waterfall",
        description: "A three-tiered waterfall cascading into a natural pool surrounded by deciduous and evergreen forests."
    },
    {
        name: "Meenmutty Waterfalls",
        distance: "20 km",
        category: "Waterfall",
        description: "Wayanad's second-largest waterfall, falling in three dramatic tiers through dense jungle terrain."
    },
    {
        name: "Banasura Sagar Dam",
        distance: "38 km",
        category: "Earth Dam & Reservoir",
        description: "India's largest earthen dam, set against the Banasura hills with boating and island views."
    },
    {
        name: "Edakkal Caves",
        distance: "28 km",
        category: "Neolithic Heritage",
        description: "Prehistoric rock shelters featuring ancient petroglyphs and stone-age rock carvings dated to 6,000 BCE."
    }
];

const CHEMBRA_CHECKLIST = [
    {
        id: "boots",
        name: "Trekking Shoes with Good Grip",
        required: true,
        category: "Footwear",
        reason: "Grassland slopes and rocky sections can be slippery, especially post-monsoon."
    },
    {
        id: "water",
        name: "Reusable Water Bottle (2 Liters)",
        required: true,
        category: "Hydration",
        reason: "No drinking water stalls exist beyond the base checkpost. Single-use plastic bottles are restricted."
    },
    {
        id: "leechsocks",
        name: "Leech Socks / Salt",
        required: false,
        category: "Protection",
        reason: "Monsoon and post-monsoon months (June to October) see high leech activity in Shola forest patches."
    },
    {
        id: "raincoat",
        name: "Light Rain Jacket / Windcheater",
        required: true,
        category: "Apparel",
        reason: "Ridge winds are strong and mountain weather in Wayanad can change rapidly."
    },
    {
        id: "sunhat",
        name: "Sun Hat & UV Sunglasses",
        required: true,
        category: "Sun Protection",
        reason: "Upper grassland ridge offers direct sun exposure with minimal tree shade."
    },
    {
        id: "permitcard",
        name: "Valid Photo ID & Permit Receipt",
        required: true,
        category: "Documents",
        reason: "Mandatory verification at the VSS Forest Checkpost before trail entry."
    }
];

const CHEMBRA_GALLERY = [
    {
        id: "img1",
        title: "Heart-Shaped Lake (Hridayathadam)",
        subtitle: "The famous natural heart-shaped lake at ~1,500m elevation on Chembra Peak.",
        alt: "Panoramic view of the heart-shaped lake nestled among green grassy hills on Chembra Peak, Wayanad, Kerala",
        credit: "Photo Credit: Wikimedia Commons / Kerala Tourism (CC BY-SA 4.0)",
        category: "Lake View"
    },
    {
        id: "img2",
        title: "Tea Plantations at Chembra Foothills",
        subtitle: "Lush green tea gardens surrounding the trail start near Meppadi.",
        alt: "Rolling green tea plantation slopes leading up toward the misty base of Chembra Peak in Wayanad",
        credit: "Photo Credit: Wikimedia Commons / Wayanad DTPC (CC BY-SA 3.0)",
        category: "Foothills"
    },
    {
        id: "img3",
        title: "Shola Grassland Mountain Ridge",
        subtitle: "Montane grassland ridge with panoramic vistas of the Wayanad plateau.",
        alt: "Open montane grassland ridge under blue sky with mountain ranges stretching in the background",
        credit: "Photo Credit: Kerala Tourism Official Archive",
        category: "Landscape"
    },
    {
        id: "img4",
        title: "Chembra Peak Silhouette",
        subtitle: "The majestic 2,100m Chembra Peak towering over clouds and rainforests.",
        alt: "Silhouette of Chembra Peak summit emerging through morning mist and forest canopy",
        credit: "Photo Credit: Wikimedia Commons / Public Domain",
        category: "Peak View"
    }
];
