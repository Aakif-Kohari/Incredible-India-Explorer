/**
 * Vellode Wetland Explorer — Data Module
 * Comprehensive dataset covering Ramsar Site metadata, Tamil Nadu freshwater irrigation tank ecology,
 * bird species catalog, history, map hotspots, and image gallery.
 */

const VELLODE_INFO = {
    id: "vellode-wetland",
    name: "Vellode Wetland Conservation Reserve",
    localName: "Vellode Bird Sanctuary",
    location: "Vadamugam Vellode, Erode District, Tamil Nadu, India",
    state: "Tamil Nadu",
    coordinates: { lat: 11.161, lng: 77.653 },
    area: "0.77 km² (77.18 hectares)",
    establishedYear: 1996,
    ramsarYear: 2022,
    ramsarSiteNo: 2482,
    wetlandType: "Freshwater Irrigation Tank & Bird Sanctuary",
    climate: "Tropical Semi-Arid",
    bestTime: "November to March (Peak Migratory Nesting Season)",
    nearestTransport: {
        town: "Erode (12 km) / Perundurai (10 km)",
        airport: "Coimbatore International Airport (85 km)",
        railway: "Erode Junction Railway Station (14 km)"
    },
    quickStats: [
        { label: "Ramsar Site Designated", value: "2022", icon: "💧" },
        { label: "Sanctuary Area", value: "0.77 km²", icon: "🌾" },
        { label: "Bird Species", value: "110+", icon: "🦅" },
        { label: "Established", value: "1996", icon: "🏛️" },
        { label: "Spot-billed Pelican", value: "Key Breeding Refuge", icon: "🦩" },
        { label: "Central Asian Flyway", value: "Wintering Ground", icon: "🌐" }
    ]
};

const ECOLOGY_HYDROLOGY = {
    overview: "Vellode Wetland (Perundurai Bird Sanctuary) is a freshwater irrigation tank lake located in Erode district of Tamil Nadu. It was constructed in 1996 and designated as a Ramsar Site in August 2022.",
    hydrology: "Fed by rainwater runoff and channels from the Lower Bhavani Project canal system. The shallow water body features earthen bunds and Acacia babul tree mounds that provide prime nesting platforms.",
    history: "Originally constructed as a water storage tank by local farmers in 1996, its rich fish and weed growth attracted thousands of migratory birds, prompting its official notification as a protected bird sanctuary.",
    conservationStatus: "Managed by Tamil Nadu Forest Department with anti-poaching watchtowers, tree planting on bunds, and visitor eco-trails."
};

const INTERESTING_FACTS = [
    {
        title: "Farmer-Initiated Sanctuary",
        fact: "Local farming communities welcomed the arriving migratory birds and worked alongside forest officials to declare the irrigation tank a protected bird sanctuary."
    },
    {
        title: "Pelican & Darter Nursery",
        fact: "Vellode is one of Western Tamil Nadu's primary breeding colonies for the Near Threatened Spot-billed Pelican and Oriental Darter."
    },
    {
        title: "Tree Mounds for Nesting",
        fact: "Submerged Acacia nilotica mounds planted inside the tank provide safe nesting islets protected from land predators."
    }
];

const BIRD_SPECIES = [
    {
        id: "spot-billed-pelican",
        name: "Spot-billed Pelican",
        scientificName: "Pelecanus philippensis",
        category: "wading-birds",
        status: "Near Threatened",
        season: "November to March",
        diet: "Fish",
        wingspan: "140–150 cm",
        icon: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Spot-billed_Pelican_Pelecanus_philippensis.jpg/800px-Spot-billed_Pelican_Pelecanus_philippensis.jpg",
        description: "Large greyish-white pelican with spotted upper bill. Breeds atop acacia tree platforms in Vellode."
    },
    {
        id: "oriental-darter",
        name: "Oriental Darter",
        scientificName: "Anhinga melanogaster",
        category: "water-birds",
        status: "Near Threatened",
        season: "Year-round",
        diet: "Fish",
        wingspan: "115–120 cm",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Oriental_Darter_Anhinga_melanogaster.jpg/800px-Oriental_Darter_Anhinga_melanogaster.jpg",
        description: "Slender waterbird with dagger-like bill and snake-like neck that spearing fish underwater."
    },
    {
        id: "eurasian-spoonbill",
        name: "Eurasian Spoonbill",
        scientificName: "Platalea leucorodia",
        category: "wading-birds",
        status: "Least Concern",
        season: "December to March",
        diet: "Small fish, crustaceans, aquatic insects",
        wingspan: "115–135 cm",
        icon: "🪶",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Eurasian_Spoonbill_Platalea_leucorodia.jpg/800px-Eurasian_Spoonbill_Platalea_leucorodia.jpg",
        description: "White wading bird with spatulate spoon-shaped bill swept side-to-side through shallow water."
    },
    {
        id: "grey-heron",
        name: "Grey Heron",
        scientificName: "Ardea cinerea",
        category: "wading-birds",
        status: "Least Concern",
        season: "Resident",
        diet: "Fish, frogs, small mammals",
        wingspan: "150–195 cm",
        icon: "🪶",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Grey_Heron_Ardea_cinerea.jpg/800px-Grey_Heron_Ardea_cinerea.jpg",
        description: "Tall grey long-legged wading bird stalking fish quietly along tank bunds."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "vellode-tower",
        title: "Vellode Main Watchtower",
        lat: 11.163,
        lng: 77.655,
        type: "Observation Tower",
        description: "Three-tier watchtower equipping birdwatchers with high-magnification spotting scopes."
    },
    {
        id: "bund-walkway",
        title: "Lakeside Bund Eco-Trail",
        lat: 11.159,
        lng: 77.651,
        type: "Walking Track",
        description: "Shaded tree-lined walking track along the perimeter earthen dam."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Spot-billed_Pelican_Pelecanus_philippensis.jpg/800px-Spot-billed_Pelican_Pelecanus_philippensis.jpg",
        caption: "Spot-billed Pelican resting on acacia branch",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Oriental_Darter_Anhinga_melanogaster.jpg/800px-Oriental_Darter_Anhinga_melanogaster.jpg",
        caption: "Oriental Darter drying wings in sunlight",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Eurasian_Spoonbill_Platalea_leucorodia.jpg/800px-Eurasian_Spoonbill_Platalea_leucorodia.jpg",
        caption: "Eurasian Spoonbill wading in shallow water",
        category: "Fauna"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VELLODE_INFO, ECOLOGY_HYDROLOGY, INTERESTING_FACTS, BIRD_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };
}
