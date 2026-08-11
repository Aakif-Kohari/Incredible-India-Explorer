/**
 * Tampara Lake Explorer — Data Module
 * Comprehensive dataset covering Ramsar Site metadata, coastal freshwater ecology,
 * birdlife & fisheries, map hotspots, and image gallery.
 */

const TAMPARA_INFO = {
    id: "tampara-lake",
    name: "Tampara Lake",
    location: "Chhatrapur, Ganjam District, Odisha, India",
    state: "Odisha",
    coordinates: { lat: 19.35, lng: 85.02 },
    area: "3.0 km² (300 hectares)",
    ramsarYear: 2022,
    ramsarSiteNo: 2488,
    lakeType: "Freshwater Coastal Lagoon Lake",
    climate: "Tropical Coastal",
    bestTime: "October to March",
    nearestTransport: {
        town: "Chhatrapur (2 km) / Berhampur (25 km)",
        airport: "Bhubaneswar Biju Patnaik Airport (145 km)",
        railway: "Chhatrapur Railway Station (3 km)"
    },
    quickStats: [
        { label: "Ramsar Site Designated", value: "2022", icon: "💧" },
        { label: "Lake Area", value: "3.0 km²", icon: "🌊" },
        { label: "Fish Species", value: "60+", icon: "🐟" },
        { label: "Bird Species", value: "50+", icon: "🦅" },
        { label: "Coastal Lagoon", value: "Freshwater", icon: "🏖️" },
        { label: "Eco-Tourism", value: "Boating & Water Sports", icon: "⛵" }
    ]
};

const ECOLOGY_HYDROLOGY = {
    overview: "Tampara Lake is one of the most prominent freshwater coastal lagoon lakes in Odisha, located adjacent to the Rushikulya River basin in Ganjam district. It was designated as a Ramsar Site of International Importance in August 2022.",
    hydrology: "The lake is fed by rain catchment and connected to Rushikulya River overflow canals during monsoons. It maintains freshwater conditions year-round, serving as an oasis amidst coastal brackish zones.",
    fisheriesAndEconomy: "Sustains local artisanal fishing communities with abundant freshwater species including Cyprinus carpio, Labeo rohita, and freshwater prawns.",
    conservationStatus: "Protected under Odisha Forest and Environment Department with regulated eco-tourism, boating zones, and water quality monitoring."
};

const BIRD_FISH_SPECIES = [
    {
        id: "common-pochard",
        name: "Common Pochard",
        scientificName: "Aythya ferina",
        category: "migratory-waterfowl",
        status: "Vulnerable",
        season: "November to February",
        diet: "Aquatic plants, seeds, aquatic insects",
        wingspan: "72–82 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Common_Pochard_male.jpg/800px-Common_Pochard_male.jpg",
        description: "Medium-sized diving duck with rusty head and dark black chest that winter on Tampara Lake."
    },
    {
        id: "labeo-rohita",
        name: "Rohu Fish",
        scientificName: "Labeo rohita",
        category: "fisheries",
        status: "Least Concern",
        season: "Year-round",
        diet: "Phytoplankton, organic detritus",
        size: "30–90 cm",
        icon: "🐟",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Labeo_rohita_Prashanth.jpg/800px-Labeo_rohita_Prashanth.jpg",
        description: "Commercially vital freshwater carp thriving in Tampara's nutrient-rich lake waters."
    },
    {
        id: "great-cormorant",
        name: "Great Cormorant",
        scientificName: "Phalacrocorax carbo",
        category: "water-birds",
        status: "Least Concern",
        season: "Resident & Local Migrant",
        diet: "Freshwater fish",
        wingspan: "121–149 cm",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Great_Cormorant_%28Phalacrocorax_carbo%29_male.jpg/800px-Great_Cormorant_%28Phalacrocorax_carbo%29_male.jpg",
        description: "Large black waterbird that perches on wooden poles and dives deep for fish."
    },
    {
        id: "intermediate-egret",
        name: "Intermediate Egret",
        scientificName: "Ardea intermedia",
        category: "wading-birds",
        status: "Least Concern",
        season: "Year-round",
        diet: "Small fish, frogs, crustaceans",
        wingspan: "105–115 cm",
        icon: "🪶",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Intermediate_Egret_Ardea_intermedia.jpg/800px-Intermediate_Egret_Ardea_intermedia.jpg",
        description: "Pure white wading bird with yellow bill and dark legs, stalking prey along Tampara's shallow marsh edges."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "tampara-boating",
        title: "Tampara Lake Water Sports & Boating Complex",
        lat: 19.352,
        lng: 85.022,
        type: "Eco-Tourism",
        description: "State-of-the-art eco-boating facility providing water activities and lake tours."
    },
    {
        id: "north-bird-bay",
        title: "Northern Quiet Bird Reserve Bay",
        lat: 19.356,
        lng: 85.018,
        type: "Bird Sanctuary",
        description: "Restricted shallow shoreline bay ideal for wintering migratory wildfowl observation."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Common_Pochard_male.jpg/800px-Common_Pochard_male.jpg",
        caption: "Common Pochard swimming in Tampara Lake",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Great_Cormorant_%28Phalacrocorax_carbo%29_male.jpg/800px-Great_Cormorant_%28Phalacrocorax_carbo%29_male.jpg",
        caption: "Great Cormorant sunning wings on lake perches",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Intermediate_Egret_Ardea_intermedia.jpg/800px-Intermediate_Egret_Ardea_intermedia.jpg",
        caption: "Intermediate Egret wading along the shore",
        category: "Fauna"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TAMPARA_INFO, ECOLOGY_HYDROLOGY, BIRD_FISH_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };
}
