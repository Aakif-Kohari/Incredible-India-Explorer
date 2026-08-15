/**
 * Sambhar Lake Explorer — Data Module
 * Comprehensive dataset covering India's largest inland salt lake, Ramsar Site #464,
 * salt production, flamingo wintering grounds, geography, history & mythology, and wildlife.
 */

const SAMBHAR_LAKE_INFO = {
    id: "sambhar-lake-explorer",
    name: "Sambhar Salt Lake Explorer",
    location: "Jaipur & Nagaur Districts, Rajasthan, India",
    state: "Rajasthan",
    coordinates: { lat: 26.908, lng: 75.022 },
    area: "190–230 km² (Seasonal variation)",
    establishedYear: 1990,
    ramsarYear: 1990,
    ramsarSiteNo: 464,
    wetlandType: "Inland Saline Lake & Endorheic Salt Basin",
    climate: "Semi-Arid Desert with high summer evaporation",
    bestTime: "November to March (Flamingo & Waterfowl Season)",
    nearestTransport: {
        town: "Sambhar Lake Town (2 km) / Phulera (15 km)",
        airport: "Jaipur International Airport (80 km)",
        railway: "Sambhar Lake Railway Station (3 km) / Phulera Junction (15 km)"
    },
    quickStats: [
        { label: "India's Largest Salt Lake", value: "230 km²", icon: "🧂" },
        { label: "Ramsar Site Declared", value: "1990", icon: "💧" },
        { label: "Wintering Flamingos", value: "50,000+", icon: "🦩" },
        { label: "National Salt Output", value: "9%", icon: "🏗️" },
        { label: "Salinity Level", value: "Up to 30%", icon: "🌊" },
        { label: "Avian Species", value: "140+", icon: "🦅" }
    ]
};

const ECOLOGY_HYDROLOGY = {
    saltProduction: "Sambhar Lake produces over 196,000 tonnes of clean salt annually (9% of India's total salt production). Salt brine is evaporated in solar pans operated by Sambhar Salts Ltd.",
    flamingos: "Key winter breeding and feeding site in North-Central India for Greater and Lesser Flamingos, attracted by dense blooms of red halophilic algae (Dunaliella salina) and Spirulina plankton.",
    ramsarSite: "Designated as a Ramsar Wetland of International Importance (#464) in 1990 due to its unique saline aquatic ecosystem and international waterfowl habitat value.",
    history: "According to Hindu mythology, goddess Shakambhari Devi transformed dense forests into a plain of precious metals, later turning them to salt to avoid human greed. Historically ruled by Chauhan Rajputs and Mughal emperors before British salt monopoly leases.",
    geography: "An endorheic lake basin surrounded by Aravali hills, receiving runoff from four rivers: Medtha, Samod, Mantha, and Rupangarh, with no outlets to the ocean.",
    wildlife: "Home to specialized saline fauna including brine shrimp, avocets, black-winged stilts, Kentish plovers, pelicans, Nilgai, and desert foxes along peripheral scrub forests."
};

const WILDLIFE_SPECIES = [
    {
        id: "greater-flamingo",
        name: "Greater Flamingo",
        scientificName: "Phoenicopterus roseus",
        category: "flamingo",
        status: "Least Concern",
        season: "November to April",
        diet: "Halophilic algae, brine shrimp, aquatic larvae",
        wingspan: "140–165 cm",
        icon: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Greater_Flamingo_%28Phoenicopterus_roseus%29.jpg/800px-Greater_Flamingo_%28Phoenicopterus_roseus%29.jpg",
        description: "Tallest flamingo species with pale pink plumage. Tens of thousands wade through Sambhar's shallow pinkish brine pans."
    },
    {
        id: "lesser-flamingo",
        name: "Lesser Flamingo",
        scientificName: "Phoeniconaias minor",
        category: "flamingo",
        status: "Near Threatened",
        season: "Winter Migratory",
        diet: "Microscopic blue-green algae (Spirulina)",
        wingspan: "95–105 cm",
        icon: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Lesser_Flamingo_%28Phoeniconaias_minor%29.jpg/800px-Lesser_Flamingo_%28Phoeniconaias_minor%29.jpg",
        description: "Smaller flamingo with deep carmine-pink feathers and dark bill, feeding on algae in hypersaline pans."
    },
    {
        id: "black-winged-stilt",
        name: "Black-winged Stilt",
        scientificName: "Himantopus himantopus",
        category: "wader",
        status: "Least Concern",
        season: "Year-round",
        diet: "Aquatic insects, small crustaceans",
        wingspan: "65–75 cm",
        icon: "🪶",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Black-winged_Stilt_%28Himantopus_himantopus%29.jpg/800px-Black-winged_Stilt_%28Himantopus_himantopus%29.jpg",
        description: "Slender wader with extremely long pink legs, foraging in saline mudflats around salt evaporation bunds."
    },
    {
        id: "pied-avocet",
        name: "Pied Avocet",
        scientificName: "Recurvirostra avosetta",
        category: "wader",
        status: "Least Concern",
        season: "Winter Migratory",
        diet: "Brine shrimp, aquatic invertebrates",
        wingspan: "77–80 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Pied_Avocet_%28Recurvirostra_avosetta%29.jpg/800px-Pied_Avocet_%28Recurvirostra_avosetta%29.jpg",
        description: "Distinctive black and white wader with upward-curved bill, sweeping side to side through brine water."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "salt-lake-viewpoint",
        title: "Main Salt Lake Pan Viewpoint",
        lat: 26.912,
        lng: 75.015,
        type: "Panoramic Observation",
        description: "Vast white salt crust field offering breathtaking sunrise views of feeding flamingo flocks."
    },
    {
        id: "shakambhari-mata-temple",
        title: "Shakambhari Devi Temple",
        lat: 26.890,
        lng: 74.980,
        type: "Historical & Pilgrimage",
        description: "Ancient 2,500-year-old temple complex situated on the southern bank of the salt lake."
    },
    {
        id: "historic-salt-train",
        title: "Historic Sambhar Salt Railway",
        lat: 26.905,
        lng: 75.030,
        type: "Industrial Heritage",
        description: "19th-century narrow-gauge wooden salt railway track used to transport harvested salt blocks."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Greater_Flamingo_%28Phoenicopterus_roseus%29.jpg/800px-Greater_Flamingo_%28Phoenicopterus_roseus%29.jpg",
        caption: "Flamingo flock feeding in Sambhar Salt Lake",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Black-winged_Stilt_%28Himantopus_himantopus%29.jpg/800px-Black-winged_Stilt_%28Himantopus_himantopus%29.jpg",
        caption: "Black-winged Stilt wading in salt brine pan",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Pied_Avocet_%28Recurvirostra_avosetta%29.jpg/800px-Pied_Avocet_%28Recurvirostra_avosetta%29.jpg",
        caption: "Pied Avocet on saline mudflats",
        category: "Birdlife"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SAMBHAR_LAKE_INFO, ECOLOGY_HYDROLOGY, WILDLIFE_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };
}
