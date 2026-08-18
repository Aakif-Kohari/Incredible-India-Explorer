/**
 * Vembanad Lake Explorer — Data Module
 * Comprehensive dataset covering India's longest lake, Ramsar Site #1215, Kumarakom Bird Sanctuary,
 * Thanneermukkom saltwater bund, backwater tourism, snake boat races, and interesting facts.
 */

const VEMBANAD_LAKE_INFO = {
    id: "vembanad-lake-explorer",
    name: "Vembanad Lake & Backwaters Explorer",
    location: "Alappuzha, Kottayam & Ernakulam Districts, Kerala, India",
    state: "Kerala",
    coordinates: { lat: 9.600, lng: 76.400 },
    area: "2,033 km² (Ramsar Wetland Area)",
    establishedYear: 2002,
    ramsarYear: 2002,
    ramsarSiteNo: 1215,
    wetlandType: "Estuarine Lagoon & Coastal Wetland Complex",
    climate: "Tropical Wet Monsoon",
    bestTime: "September to March (Peak Backwater & Birding Season)",
    nearestTransport: {
        town: "Alappuzha (5 km) / Kottayam (15 km) / Kochi (30 km)",
        airport: "Cochin International Airport (70 km)",
        railway: "Alappuzha Railway Station (6 km) / Ernakulam Junction (35 km)"
    },
    quickStats: [
        { label: "India's Longest Lake", value: "96.5 km", icon: "🌊" },
        { label: "Largest Ramsar Site in India", value: "2,033 km²", icon: "💧" },
        { label: "Kumarakom Sanctuary Area", value: "14 Acres", icon: "🦩" },
        { label: "Annual Snake Boat Races", value: "Vallam Kali", icon: "🛶" },
        { label: "Kuttanad Below Sea Level", value: "-2.2 Meters", icon: "🌾" },
        { label: "State Fish Habitat", value: "Pearl Spot (Karimeen)", icon: "🐟" }
    ]
};

const ECOLOGY_HYDROLOGY = {
    geography: "Vembanad is India's longest lake (96.5 km) and second-largest Ramsar site, spanning three coastal districts. It features the famous Thanneermukkom Salt Water Barrier/Bund that separates brackish tidal waters from fresh river inflow.",
    ramsarSite: "Declared a Ramsar Wetland of International Importance (#1215) in November 2002, protecting four major river estuaries (Meenachil, Achankovil, Pamba, and Manimala).",
    kumarakomSanctuary: "Located on the eastern banks, Kumarakom Bird Sanctuary (14 acres) is a world-renowned haven for migratory waterfowl including Siberian Cranes, egrets, darters, and teals.",
    backwaterTourism: "The heart of Kerala backwater tourism. Thousands of travelers glide along palm-fringed canals aboard traditional thatched Kettuvallam houseboats.",
    houseboats: "Historic wooden cargo barges transformed into eco-friendly floating hotels offering authentic Keralan meals and serene backwater navigation.",
    mangroves: "Supports dense mangrove fringes (Avicennia & Bruguiera) protecting fragile delta islands like Pathiramanal (Sands of Midnight).",
    fisheries: "Supports over 20,000 fisher families dependent on Pearl Spot (Karimeen — Kerala's state fish), freshwater giant prawns (Attu Konju), and black clam harvesting.",
    interestingFacts: [
        "Longest lake in India stretching 96.5 km from Kochi to Alappuzha.",
        "Kuttanad region along Vembanad is one of the few places on Earth where farming is carried out below sea level (-1.2 to -2.2 meters).",
        "Hosts the world-famous Nehru Trophy Boat Race (Vallam Kali) on Punnamada Lake on the second Saturday of every August.",
        "Thanneermukkom Bund (1,400m long) is India's largest mud regulator structure built to prevent saltwater intrusion into paddy fields."
    ]
};

const WILDLIFE_SPECIES = [
    {
        id: "pearl-spot",
        name: "Pearl Spot (Karimeen)",
        scientificName: "Etroplus suratensis",
        category: "fish",
        status: "State Fish of Kerala",
        season: "Year-round",
        diet: "Algae, detritus, small mollusks",
        wingspan: "Length: 20–30 cm",
        icon: "🐟",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Pearlspot.jpg/800px-Pearlspot.jpg",
        description: "Kerala's official state fish. Oval cichlid species with pearl-like white spots that thrives in Vembanad's brackish waters."
    },
    {
        id: "oriental-darter",
        name: "Oriental Darter (Snakebird)",
        scientificName: "Anhinga melanogaster",
        category: "bird",
        status: "Near Threatened",
        season: "Winter Migratory / Resident",
        diet: "Fish, aquatic reptiles",
        wingspan: "115–120 cm",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Oriental_Darter_%28Anhinga_melanogaster%29.jpg/800px-Oriental_Darter_%28Anhinga_melanogaster%29.jpg",
        description: "Slender waterbird with long snake-like neck that spears fish underwater in Kumarakom Sanctuary."
    },
    {
        id: "white-throated-kingfisher",
        name: "White-throated Kingfisher",
        scientificName: "Halcyon smyrnensis",
        category: "bird",
        status: "Least Concern",
        season: "Year-round",
        diet: "Fish, frogs, large insects",
        wingspan: "40–43 cm",
        icon: "🪶",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/White-throated_kingfisher_%28Halcyon_smyrnensis_fusca%29.jpg/800px-White-throated_kingfisher_%28Halcyon_smyrnensis_fusca%29.jpg",
        description: "Vibrant kingfisher with bright blue wings, chocolate brown body, and stark white throat perching on houseboat mooring ropes."
    },
    {
        id: "spot-billed-duck",
        name: "Indian Spot-billed Duck",
        scientificName: "Anas poecilorhyncha",
        category: "waterfowl",
        status: "Least Concern",
        season: "Year-round",
        diet: "Submerged vegetation, seeds",
        wingspan: "83–95 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Indian_spot-billed_duck_%28Anas_poecilorhyncha%29.jpg/800px-Indian_spot-billed_duck_%28Anas_poecilorhyncha%29.jpg",
        description: "Dabbling duck with distinctive yellow tip on black bill, residing in large numbers around Kumarakom reed beds."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "kumarakom-bird-sanctuary",
        title: "Kumarakom Bird Sanctuary",
        lat: 9.625,
        lng: 76.430,
        type: "Avian Sanctuary",
        description: "14-acre bird sanctuary on the eastern bank of Vembanad Lake with watchtowers and canopy trails."
    },
    {
        id: "thanneermukkom-bund",
        title: "Thanneermukkom Salt Water Barrier",
        lat: 9.670,
        lng: 76.395,
        type: "Hydrological Engineering",
        description: "1,400-meter regulator bund dividing Vembanad Lake into freshwater south and brackish north basins."
    },
    {
        id: "punnamada-lake-finish-line",
        title: "Punnamada Lake Nehru Trophy Course",
        lat: 9.510,
        lng: 76.345,
        type: "Cultural Heritage",
        description: "Water stadium site of the historic annual Nehru Trophy Snake Boat Race (Vallam Kali)."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Pearlspot.jpg/800px-Pearlspot.jpg",
        caption: "Pearl Spot (Karimeen) — State Fish of Kerala",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Oriental_Darter_%28Anhinga_melanogaster%29.jpg/800px-Oriental_Darter_%28Anhinga_melanogaster%29.jpg",
        caption: "Oriental Darter perching in Kumarakom",
        category: "Birdlife"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/White-throated_kingfisher_%28Halcyon_smyrnensis_fusca%29.jpg/800px-White-throated_kingfisher_%28Halcyon_smyrnensis_fusca%29.jpg",
        caption: "White-throated Kingfisher over Vembanad backwaters",
        category: "Birdlife"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VEMBANAD_LAKE_INFO, ECOLOGY_HYDROLOGY, WILDLIFE_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };
}
