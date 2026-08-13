/**
 * East Kolkata Wetlands Explorer — Data Module
 * Comprehensive dataset covering UNESCO recognized ecological model, Ramsar Site #1208,
 * natural wastewater recycling, Bheri fisheries, biodiversity, and local livelihoods.
 */

const EAST_KOLKATA_INFO = {
    id: "east-kolkata-wetlands-explorer",
    name: "East Kolkata Wetlands Explorer",
    location: "Eastern Fringes of Kolkata, West Bengal, India",
    state: "West Bengal",
    coordinates: { lat: 22.518, lng: 88.435 },
    area: "125 km² (12,500 hectares)",
    establishedYear: 2002,
    ramsarYear: 2002,
    ramsarSiteNo: 1208,
    wetlandType: "Intertidal Salt Marshes & Sewage-Fed Aquaculture Bheris",
    climate: "Tropical Wet-and-Dry Monsoon",
    bestTime: "October to March (Pleasant weather & winter birds)",
    nearestTransport: {
        town: "Kolkata Metropolitan Area (Adjacent)",
        airport: "Netaji Subhash Chandra Bose International Airport (12 km)",
        railway: "Sealdah Railway Station (8 km) / Howrah Station (15 km)"
    },
    quickStats: [
        { label: "Ramsar Site Declared", value: "2002", icon: "💧" },
        { label: "Daily Wastewater Treated", value: "750 Million L", icon: "♻️" },
        { label: "Annual Fish Production", value: "13,000 Tonnes", icon: "🐟" },
        { label: "Daily Vegetable Yield", value: "150 Tonnes", icon: "🥬" },
        { label: "Livelihoods Supported", value: "100,000+", icon: "👥" },
        { label: "Bheri Ponds Count", value: "250+ Ponds", icon: "🛶" }
    ]
};

const ECOLOGY_HYDROLOGY = {
    unescoRecognition: "Acclaimed internationally by UNESCO, UN-Habitat, and environmental scientists as the world's largest organic sewage management ecosystem, serving as a global benchmark for nature-based urban waste recycling.",
    ramsarSite: "Notified as a Ramsar Site (#1208) in 2002. It acts as the natural green lungs and flood buffer for the city of Kolkata.",
    wastewaterManagement: "Processes 750 million liters of raw municipal sewage daily without artificial energy or chemicals. Uses solar radiation, algae photosynthesis, and bacteria symbiosis to break down organic waste into nutrients.",
    fisheries: "Features over 250 shallow aquaculture ponds known as 'Bheris', where nutrient-rich treated sewage feeds plankton, yielding 13,000+ tonnes of fresh commercial fish (Rohu, Katla, Tilapia) annually.",
    biodiversity: "Provides sanctuary to Asian Small-clawed Otters, Marsh Mongooses, Fishing Cats, water hyacinths, reed beds, and over 40 species of wintering migratory birds.",
    localLivelihood: "Sustains over 100,000 local working families, including traditional fishermen, garbage farmers cultivating vegetables on compost knolls (garbage farms), and waste recyclers."
};

const WILDLIFE_SPECIES = [
    {
        id: "fishing-cat",
        name: "Fishing Cat",
        scientificName: "Prionailurus viverrinus",
        category: "mammal",
        status: "Vulnerable",
        season: "Year-round (Nocturnal)",
        diet: "Fish, frogs, crustaceans",
        wingspan: "Body: 57–78 cm",
        icon: "🐾",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Fishing_cat_in_Phils_01.jpg/800px-Fishing_cat_in_Phils_01.jpg",
        description: "West Bengal's state animal. Expert swimmer and hunter prowling the densely vegetated Bheri reed beds."
    },
    {
        id: "marsh-mongoose",
        name: "Small Indian Mongoose",
        scientificName: "Urva auropunctata",
        category: "mammal",
        status: "Least Concern",
        season: "Year-round",
        diet: "Insects, crabs, small rodents",
        wingspan: "Body: 25–40 cm",
        icon: "🦦",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Small_Asian_mongoose_%28Herpestes_javanicus%29_1.jpg/800px-Small_Asian_mongoose_%28Herpestes_javanicus%29_1.jpg",
        description: "Agile wetland predator frequenting the raised bunds between fishponds."
    },
    {
        id: "bronze-winged-jacana",
        name: "Bronze-winged Jacana",
        scientificName: "Metopidius indicus",
        category: "wader",
        status: "Least Concern",
        season: "Year-round",
        diet: "Aquatic insects, seeds, snails",
        wingspan: "50–55 cm",
        icon: "🪶",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bronze-winged_jacana_%28Metopidius_indicus%29.jpg/800px-Bronze-winged_jacana_%28Metopidius_indicus%29.jpg",
        description: "Striking wader with elongated toes that allow it to walk effortlessly across floating lotus leaves."
    },
    {
        id: "lesser-whistling-duck",
        name: "Lesser Whistling Duck",
        scientificName: "Dendrocygna javanica",
        category: "waterfowl",
        status: "Least Concern",
        season: "Year-round / Winter Peak",
        diet: "Plant shoots, seeds, small snails",
        wingspan: "65–75 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Lesser_Whistling_Duck_Dendrocygna_javanica.jpg/800px-Lesser_Whistling_Duck_Dendrocygna_javanica.jpg",
        description: "Gregarious nocturnal feeding duck that roosts in large trees around the aquaculture ponds."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "nalban-fishery-complex",
        title: "Nalban Bheri Eco Complex",
        lat: 22.570,
        lng: 88.425,
        type: "Aquaculture & Ecotourism",
        description: "Demonstration fish farm and boating lake illustrating traditional sewage-fed Bheri aquaculture."
    },
    {
        id: "dhapa-garbage-farms",
        title: "Dhapa Agriculture Knolls",
        lat: 22.540,
        lng: 88.410,
        type: "Organic Farming",
        description: "Unique urban farming system where solid organic waste and silt produce fresh vegetables for Kolkata."
    },
    {
        id: "bantala-lock-gate",
        title: "Bantala Wastewater Canal Lock",
        lat: 22.505,
        lng: 88.460,
        type: "Hydrological Engineering",
        description: "Feeder canal sluice gate regulating sewage inflow into fish ponds using gravity flow."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Fishing_cat_in_Phils_01.jpg/800px-Fishing_cat_in_Phils_01.jpg",
        caption: "Fishing Cat in wetland habitat",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bronze-winged_jacana_%28Metopidius_indicus%29.jpg/800px-Bronze-winged_jacana_%28Metopidius_indicus%29.jpg",
        caption: "Bronze-winged Jacana on floating lily pad",
        category: "Birdlife"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Lesser_Whistling_Duck_Dendrocygna_javanica.jpg/800px-Lesser_Whistling_Duck_Dendrocygna_javanica.jpg",
        caption: "Lesser Whistling Ducks resting near Bheri bank",
        category: "Birdlife"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EAST_KOLKATA_INFO, ECOLOGY_HYDROLOGY, WILDLIFE_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };
}
