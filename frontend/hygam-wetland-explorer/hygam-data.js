/**
 * Hygam Wetland Explorer — Data Module
 * Comprehensive dataset covering Ramsar Site metadata, Kashmir floodplain hydrology,
 * migratory birds, aquatic flora, conservation facts, map hotspots, and image gallery.
 */

const HYGAM_INFO = {
    id: "hygam-wetland",
    name: "Hygam Wetland Conservation Reserve",
    location: "Baramulla District, Jammu & Kashmir, India",
    state: "Jammu & Kashmir",
    coordinates: { lat: 34.238, lng: 74.521 },
    area: "8.02 km² (802 hectares)",
    ramsarYear: 2022,
    ramsarSiteNo: 2489,
    wetlandType: "Floodplain Marshland",
    climate: "Sub-Mediterranean Alpine / Cold Temperate",
    bestTime: "October to March (Peak Migratory Season)",
    nearestTransport: {
        town: "Sopore (10 km) / Baramulla (20 km) / Srinagar (45 km)",
        airport: "Srinagar International Airport (52 km)",
        railway: "Sopore Railway Station (8 km)"
    },
    quickStats: [
        { label: "Ramsar Designated", value: "2022", icon: "💧" },
        { label: "Surface Area", value: "8.02 km²", icon: "🌾" },
        { label: "Migratory Birds", value: "100,000+", icon: "🦆" },
        { label: "Central Asian Flyway", value: "Vital Stopover", icon: "🌐" },
        { label: "Aquatic Flora", value: "Phragmites & Typha", icon: "🌿" },
        { label: "Jhelum Flood Basin", value: "Natural Buffer", icon: "🛡️" }
    ]
};

const ECOLOGY_HYDROLOGY = {
    overview: "Hygam Wetland Conservation Reserve is a major floodplain wetland in the Jhelum River basin in Kashmir Valley. Situated downstream of Wular Lake, it acts as a critical natural sponge absorb excess floodwaters during spring snowmelt.",
    hydrology: "Fed by the Ningli nallah and overflow streams from the Jhelum. Shallow marsh beds support dense reed beds and submergent macrophyte vegetation crucial for wildfowl shelter.",
    conservationStatus: "Designated as a Ramsar Site of International Importance in August 2022. Wildlife Department of J&K manages habitat restoration, anti-poaching patrols, and silt removal."
};

const BIRD_SPECIES = [
    {
        id: "mallard",
        name: "Mallard",
        scientificName: "Anas platyrhynchos",
        category: "migratory-waterfowl",
        status: "Least Concern",
        season: "October to March",
        diet: "Aquatic plants, seeds, invertebrates",
        wingspan: "81–98 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/bf/Mallard_drake_at_St_James%27s_Park.jpg/800px-Mallard_drake_at_St_James%27s_Park.jpg",
        description: "Dabbling duck with iridescent green head on males. Arrives in vast flocks at Hygam during winter months."
    },
    {
        id: "gadwall",
        name: "Gadwall",
        scientificName: "Mareca strepera",
        category: "migratory-waterfowl",
        status: "Least Concern",
        season: "November to March",
        diet: "Submerged aquatic vegetation, seeds",
        wingspan: "78–90 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Gadwall_male_RWD2.jpg/800px-Gadwall_male_RWD2.jpg",
        description: "Elegant grey dabbling duck with white speculum feather patch. Commonly feeds in shallow reed edges."
    },
    {
        id: "northern-pintail",
        name: "Northern Pintail",
        scientificName: "Anas acuta",
        category: "migratory-waterfowl",
        status: "Least Concern",
        season: "October to February",
        diet: "Seeds, aquatic tubers, invertebrates",
        wingspan: "80–95 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Northern-Pintail-Male.jpg/800px-Northern-Pintail-Male.jpg",
        description: "Slender duck with long pointed central tail feathers and chocolate-brown head. High-speed flier across the Central Asian Flyway."
    },
    {
        id: "common-teal",
        name: "Common Teal",
        scientificName: "Anas crecca",
        category: "migratory-waterfowl",
        status: "Least Concern",
        season: "November to March",
        diet: "Seeds, benthic organisms",
        wingspan: "53–59 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Eurasian_Teal_Anas_crecca.jpg/800px-Eurasian_Teal_Anas_crecca.jpg",
        description: "Smallest migratory duck with chestnut head and green eye stripe, forming dense agile winter flocks."
    }
];

const INTERESTING_FACTS = [
    {
        title: "Natural Flood Regulator",
        fact: "Hygam absorbs millions of gallons of peak flood runoff from the Jhelum River during snowmelt, protecting Sopore and Baramulla towns."
    },
    {
        title: "Traditional Water Chestnut Harvest",
        fact: "Local Kashmiri communities sustainably harvest 'Singhara' (Water Chestnut - Trapa natans) from open water patches during autumn."
    },
    {
        title: "From Hunting Preserve to Sanctuary",
        fact: "Originally managed as a royal wildfowl shooting reserve by the Dogra rulers, Hygam was converted into a protected conservation reserve."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "watchtower-hygam",
        title: "Hygam Central Watchtower",
        lat: 34.240,
        lng: 74.523,
        type: "Observation Tower",
        description: "Elevated vantage tower providing wide panoramic views over open water channels and dense reed beds."
    },
    {
        id: "ningli-inlet",
        title: "Ningli Nallah Confluence",
        lat: 34.234,
        lng: 74.518,
        type: "Hydrology",
        description: "Stream inlet bringing nutrient-rich silt and fresh water from the surrounding snow-fed catchment."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/bf/Mallard_drake_at_St_James%27s_Park.jpg/800px-Mallard_drake_at_St_James%27s_Park.jpg",
        caption: "Mallard drake swimming in winter marshland",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Gadwall_male_RWD2.jpg/800px-Gadwall_male_RWD2.jpg",
        caption: "Gadwall feeding along shallow reed edges",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Northern-Pintail-Male.jpg/800px-Northern-Pintail-Male.jpg",
        caption: "Northern Pintail in flight over Jhelum valley",
        category: "Fauna"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HYGAM_INFO, ECOLOGY_HYDROLOGY, BIRD_SPECIES, INTERESTING_FACTS, MAP_HOTSPOTS, GALLERY_IMAGES };
}
