/**
 * Nokrek National Park Explorer — Data Module
 * Comprehensive dataset covering the UNESCO Biosphere Reserve, Red Panda,
 * wild Citrus indica gene sanctuary, forests, wildlife, biodiversity,
 * map hotspots, and photo gallery.
 */

const NOKREK_INFO = {
    id: "nokrek",
    name: "Nokrek National Park",
    aka: "Nokrek Biosphere Reserve",
    location: "West Garo Hills District, Meghalaya, India",
    state: "Meghalaya",
    coordinates: { lat: 25.47, lng: 90.30 },
    area: "47.48 km² (Core Zone), ~820 km² (Full Biosphere Reserve)",
    establishedYear: 1986,
    biosphereReserveYear: 1988,
    unescoRecognitionYear: 2009,
    ecosystem: "Subtropical Broadleaf & Tropical Semi-Evergreen Forest, Garo Hills Range",
    climate: "Subtropical Monsoon with heavy seasonal rainfall",
    bestTime: "October to April (drier, cooler months)",
    entryFees: "₹50 (Indian Nationals), ₹300 (Foreigners)",
    nearestTransport: {
        railway: "Guwahati Railway Station (~220 km)",
        airport: "Guwahati (LGBI) Airport (~220 km) / Tura Airstrip (nearest, limited service)",
        gatewayTown: "Tura, West Garo Hills"
    },
    quickStats: [
        { label: "Core Zone Area", value: "47.5 km²", icon: "🏞️" },
        { label: "Highest Peak", value: "1,412 m", icon: "⛰️" },
        { label: "UNESCO Status Since", value: "2009", icon: "🌍" },
        { label: "Wild Citrus Origin Site", value: "Yes", icon: "🍊" },
        { label: "Established Year", value: "1986", icon: "🏛️" },
        { label: "Core Habitat", value: "Red Panda", icon: "🐼" }
    ]
};

const BIOSPHERE_OVERVIEW = {
    title: "A UNESCO Biosphere Reserve",
    overview: "Nokrek sits atop the Garo Hills of Meghalaya, crowned by Nokrek Peak — the highest point in the range. Declared a Biosphere Reserve by India in 1988, it earned international recognition under UNESCO's Man and Biosphere Programme in 2009, placing it among a select network of ecosystems valued for both conservation and scientific research.",
    zoning: "The reserve follows the classic biosphere model: a strictly protected core zone (the National Park itself) surrounded by buffer and transition zones where local Garo communities continue traditional, sustainable livelihoods."
};

const RED_PANDA_INFO = {
    name: "Red Panda",
    scientificName: "Ailurus fulgens",
    status: "Endangered",
    icon: "🐼",
    significance: "Nokrek's core zone protects one of the westernmost-documented Red Panda populations in Northeast India, far from its better-known Eastern Himalayan strongholds.",
    adaptation: "A reclusive, largely arboreal mammal that favours dense bamboo understorey within cool, moist broadleaf forest — habitat conditions Nokrek's elevation and rainfall pattern reliably provide.",
    behavior: "Elusive and mostly crepuscular, Red Pandas are rarely sighted directly; their presence is more often confirmed through camera traps and indirect field signs."
};

const WILD_CITRUS_INFO = {
    title: "Birthplace of the Wild Orange",
    localName: "Memang Narang (\"Spirit Orange\" in Garo)",
    overview: "Nokrek is globally significant as the presumed center of origin for Citrus indica, the wild ancestor believed to underlie most cultivated citrus varieties grown today — oranges, mandarins, and their relatives worldwide.",
    conservation: "A dedicated Citrus Gene Sanctuary was established within the park specifically to conserve this and other wild citrus relatives in situ, preserving genetic diversity that could prove vital for future citrus breeding and disease resistance.",
    significance: "Researchers and botanists consider this citrus gene pool one of the most important reasons for the park's UNESCO designation, alongside its wildlife."
};

const FOREST_ZONES = [
    {
        title: "Tropical Semi-Evergreen Belt",
        description: "Lower elevations are cloaked in dense semi-evergreen forest with a closed canopy, supporting climbing lianas, ferns, and a rich understorey of shade-tolerant shrubs."
    },
    {
        title: "Subtropical Broadleaf Forest",
        description: "Higher up the slopes, oak and laurel-dominated broadleaf forest takes over — cooler, mistier, and structurally more open, forming the primary habitat band for the Red Panda."
    },
    {
        title: "Citrus Gene Sanctuary",
        description: "A specially demarcated conservation zone within the core area, set aside to protect wild Citrus indica and related species from genetic erosion and habitat loss."
    }
];

const NOKREK_WILDLIFE = [
    {
        id: "red-panda",
        name: "Red Panda",
        scientificName: "Ailurus fulgens",
        status: "Endangered",
        icon: "🐼",
        description: "The park's flagship species — a small, bamboo-dependent mammal found in the cooler broadleaf forest belt of the core zone."
    },
    {
        id: "clouded-leopard",
        name: "Clouded Leopard",
        scientificName: "Neofelis nebulosa",
        status: "Vulnerable",
        icon: "🐆",
        description: "An elusive, tree-adapted big cat that ranges across Nokrek's dense forest cover, rarely seen but confirmed through camera-trap surveys."
    },
    {
        id: "asian-elephant",
        name: "Asian Elephant",
        scientificName: "Elephas maximus",
        status: "Endangered",
        icon: "🐘",
        description: "Elephant herds move seasonally through the Garo Hills forest corridors surrounding the park's buffer zone."
    },
    {
        id: "hoolock-gibbon",
        name: "Hoolock Gibbon",
        scientificName: "Hoolock hoolock",
        status: "Endangered",
        icon: "🐒",
        description: "India's only ape species, found in the reserve's evergreen canopy, known for its loud, far-carrying morning calls."
    },
    {
        id: "marbled-cat",
        name: "Marbled Cat",
        scientificName: "Pardofelis marmorata",
        status: "Near Threatened",
        icon: "🐈",
        description: "A small, arboreal wild cat with a strikingly patterned coat, adapted to dense forest hunting in the park's mid-elevation zones."
    }
];

const BIODIVERSITY_STATS = [
    { label: "Wild Citrus Species Protected", value: "Multiple", icon: "🍊" },
    { label: "Recorded Mammal Species", value: "40+", icon: "🐾" },
    { label: "Forest Types", value: "3 Zones", icon: "🌳" },
    { label: "Elevation Range", value: "Up to 1,412 m", icon: "⛰️" }
];

const MAP_HOTSPOTS = [
    {
        id: "spot-nokrek-entry",
        name: "Park Entry & Buffer Zone",
        category: "gate",
        x: 20,
        y: 60,
        description: "Main approach through community-managed buffer forest surrounding the core reserve."
    },
    {
        id: "spot-citrus-sanctuary",
        name: "Citrus Gene Sanctuary",
        category: "citrus",
        x: 42,
        y: 45,
        description: "Protected zone conserving wild Citrus indica and related citrus relatives in their native habitat."
    },
    {
        id: "spot-nokrek-peak",
        name: "Nokrek Peak (1,412 m)",
        category: "peak",
        x: 58,
        y: 30,
        description: "The highest point in the Garo Hills, capped in cool broadleaf forest — prime Red Panda habitat."
    },
    {
        id: "spot-core-forest",
        name: "Core Zone Forest Trail",
        category: "forest",
        x: 72,
        y: 50,
        description: "Dense subtropical broadleaf forest forming the strictly protected heart of the biosphere reserve."
    }
];

const GALLERY_IMAGES = [
    {
        title: "Red Panda in the Canopy",
        caption: "Nokrek protects one of the westernmost known Red Panda populations in Northeast India.",
        icon: "🐼"
    },
    {
        title: "Clouded Leopard on the Move",
        caption: "A rarely-seen big cat adapted to Nokrek's dense forest cover.",
        icon: "🐆"
    },
    {
        title: "Elephant Corridor",
        caption: "Seasonal elephant movement through the Garo Hills buffer forest.",
        icon: "🐘"
    },
    {
        title: "Garo Hills Forest Stream",
        caption: "A cool forest stream winding through the reserve's broadleaf belt.",
        icon: "💧"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NOKREK_INFO,
        BIOSPHERE_OVERVIEW,
        RED_PANDA_INFO,
        WILD_CITRUS_INFO,
        FOREST_ZONES,
        NOKREK_WILDLIFE,
        BIODIVERSITY_STATS,
        MAP_HOTSPOTS,
        GALLERY_IMAGES
    };
}