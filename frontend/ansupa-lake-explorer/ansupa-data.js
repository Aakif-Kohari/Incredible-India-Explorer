/**
 * Ansupa Lake Explorer — Data Module
 * Comprehensive dataset covering Ramsar Site metadata, oxbow lake hydrology,
 * aquatic flora & birdlife, conservation, map hotspots, and image gallery.
 */

const ANSUPA_INFO = {
    id: "ansupa-lake",
    name: "Ansupa Lake",
    location: "Banki, Cuttack District, Odisha, India",
    state: "Odisha",
    coordinates: { lat: 20.46, lng: 85.60 },
    area: "1.56 km² (156 hectares)",
    ramsarYear: 2022,
    ramsarSiteNo: 2487,
    lakeType: "Freshwater Oxbow Lake",
    climate: "Tropical Monsoonal",
    bestTime: "November to February (Peak Migratory Waterfowl Season)",
    nearestTransport: {
        town: "Banki (15 km) / Cuttack (50 km) / Bhubaneswar (70 km)",
        airport: "Bhubaneswar Biju Patnaik Airport (65 km)",
        railway: "Cuttack Junction (52 km)"
    },
    quickStats: [
        { label: "Odisha's Largest Oxbow Lake", value: "Freshwater", icon: "🏞️" },
        { label: "Ramsar Designated", value: "2022", icon: "💧" },
        { label: "Surface Area", value: "1.56 km²", icon: "🌊" },
        { label: "Fish Species", value: "33+", icon: "🐟" },
        { label: "Migratory Birds", value: "25,000+", icon: "🦩" },
        { label: "Surrounding Hills", value: "Saranda Hills", icon: "⛰️" }
    ]
};

const ECOLOGY_HYDROLOGY = {
    overview: "Ansupa Lake is Odisha's largest freshwater oxbow lake, formed naturally by a meander cutoff of the Mahanadi River in Cuttack district. It is sheltered between the Saranda and Bishnupur hill ranges.",
    oxbowHydrology: "Connected to the Mahanadi River via the Kabula nallah during monsoon inundations. The horseshoe lake traps freshwater and sediment, supporting submerged macrophyte meadows.",
    aquaticFlora: "Famous for dense blooms of Lotus (Nelumbo nucifera), Water Lily (Nymphaea pubescens), Hydrilla verticillata, and Vallisneria spiralis providing oxygen and micro-habitats for fish fingerlings.",
    conservationStatus: "Designated as a Ramsar Site of International Importance in 2022. Integrated management by Odisha Wetland Authority includes de-siltation and invasive water hyacinth removal."
};

const BIRD_FLORA_SPECIES = [
    {
        id: "cotton-pygmy-goose",
        name: "Cotton Pygmy Goose",
        scientificName: "Nettapus coromandelianus",
        category: "resident-waterfowl",
        status: "Least Concern",
        season: "Resident Breeding",
        diet: "Water lily seeds, aquatic vegetation",
        wingspan: "35–40 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Cotton_pygmy_goose_%28Nettapus_coromandelianus%29_male.jpg/800px-Cotton_pygmy_goose_%28Nettapus_coromandelianus%29_male.jpg",
        description: "Smallest wildfowl species in India with white body and metallic green back, nesting in hollow trees around Ansupa Lake."
    },
    {
        id: "indian-lotus",
        name: "Indian Sacred Lotus",
        scientificName: "Nelumbo nucifera",
        category: "aquatic-flora",
        status: "Native Flora",
        season: "Monsoon & Autumn Bloom",
        habitat: "Shallow freshwater lake margins",
        icon: "🪷",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sacred_lotus_Nelumbo_nucifera.jpg/800px-Sacred_lotus_Nelumbo_nucifera.jpg",
        description: "Iconic pink water flower covering large sections of Ansupa Lake, providing cover for water snails and waders."
    },
    {
        id: "northern-pintail",
        name: "Northern Pintail",
        scientificName: "Anas acuta",
        category: "migratory-birds",
        status: "Least Concern",
        season: "November to February",
        diet: "Aquatic tubers, seeds",
        wingspan: "80–95 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Northern-Pintail-Male.jpg/800px-Northern-Pintail-Male.jpg",
        description: "Long-necked migratory duck that winters in thousands on open water reaches of Ansupa."
    },
    {
        id: "bronze-winged-jacana",
        name: "Bronze-winged Jacana",
        scientificName: "Metopidius indicus",
        category: "wading-birds",
        status: "Least Concern",
        season: "Resident",
        diet: "Insects, mollusks, lily seeds",
        wingspan: "45–55 cm",
        icon: "🪶",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Bronze-winged_Jacana_Metopidius_indicus.jpg/800px-Bronze-winged_Jacana_Metopidius_indicus.jpg",
        description: "Elongated-toed wading bird that walks gracefully on floating lily pads across Ansupa."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "saranda-hilltop",
        title: "Saranda Hill Viewpoint",
        lat: 20.463,
        lng: 85.598,
        type: "Panorama Viewpoint",
        description: "Hilltop lookout offering a bird's-eye panoramic view of the horseshoe oxbow lake and Mahanadi floodplains."
    },
    {
        id: "ansupa-eco-park",
        title: "Ansupa Lake Eco-Park & Promenade",
        lat: 20.458,
        lng: 85.604,
        type: "Eco-Tourism",
        description: "Lakeside garden, wooden boardwalk, and pedal boating pier."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Cotton_pygmy_goose_%28Nettapus_coromandelianus%29_male.jpg/800px-Cotton_pygmy_goose_%28Nettapus_coromandelianus%29_male.jpg",
        caption: "Cotton Pygmy Goose swimming amongst floating weeds",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sacred_lotus_Nelumbo_nucifera.jpg/800px-Sacred_lotus_Nelumbo_nucifera.jpg",
        caption: "Sacred Lotus blooming on Ansupa Lake",
        category: "Flora"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Bronze-winged_Jacana_Metopidius_indicus.jpg/800px-Bronze-winged_Jacana_Metopidius_indicus.jpg",
        caption: "Bronze-winged Jacana treading lily pads",
        category: "Fauna"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ANSUPA_INFO, ECOLOGY_HYDROLOGY, BIRD_FLORA_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };
}
