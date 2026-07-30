/**
 * Wadhvana Wetland Explorer — Data Module
 * Comprehensive dataset covering Ramsar Site metadata, reservoir hydrology,
 * bird species catalog, map hotspots, and image gallery.
 */

const WADHNAVANA_INFO = {
    id: "wadhvana-wetland",
    name: "Wadhvana Wetland",
    location: "Dabhoi, Vadodara District, Gujarat, India",
    state: "Gujarat",
    coordinates: { lat: 22.174, lng: 73.483 },
    area: "10.3 km² (1,030 hectares)",
    establishedYear: 1910,
    ramsarYear: 2021,
    ramsarSiteNo: 2454,
    reservoirBuilder: "Maharaja Sayajirao Gaekwad III",
    climate: "Tropical Semi-Arid",
    bestTime: "November to March (Peak Migratory Season)",
    nearestTransport: {
        railway: "Dabhoi Junction (10 km) / Vadodara Junction (45 km)",
        airport: "Vadodara Airport (48 km)",
        highway: "SH 11 / NH 48"
    },
    quickStats: [
        { label: "Migratory Waterfowl", value: "80,000+", icon: "🦆" },
        { label: "Bird Species", value: "140+", icon: "🦅" },
        { label: "Ramsar Designated", value: "2021", icon: "💧" },
        { label: "Reservoir Built", value: "1910", icon: "🏛️" },
        { label: "Surface Area", value: "10.3 km²", icon: "🌾" },
        { label: "Central Asian Flyway", value: "Key Stopover", icon: "🌐" }
    ]
};

const ECOLOGY_HYDROLOGY = {
    overview: "Wadhvana Wetland is an century-old man-made irrigation reservoir constructed by Maharaja Sayajirao Gaekwad III in 1910. Located in Dabhoi taluka of Vadodara district, it has evolved into an ecologically vital wetland habitat along the Central Asian Flyway.",
    hydrology: "Fed by canal systems from the Orsang and Narmada river basins, Wadhvana holds water throughout the dry winter months, offering a crucial roosting and feeding oasis for wintering waterfowl.",
    conservationStatus: "Designated as a Ramsar Site of International Importance in August 2021. Managed by the Gujarat State Forest Department with active eco-tourism and bird monitoring watchtowers."
};

const BIRD_SPECIES = [
    {
        id: "ferruginous-duck",
        name: "Ferruginous Duck",
        scientificName: "Aythya nyroca",
        category: "migratory-waterfowl",
        status: "Near Threatened",
        season: "November to February",
        diet: "Aquatic plants, mollusks, insects",
        wingspan: "63–67 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ferruginous_duck_%28Aythya_nyroca%29_male.jpg/800px-Ferruginous_duck_%28Aythya_nyroca%29_male.jpg",
        description: "Deep chestnut-brown diving duck with striking white undertail coverts and yellow eyes in males. Uses Wadhvana as a major wintering ground."
    },
    {
        id: "greylag-goose",
        name: "Greylag Goose",
        scientificName: "Anser anser",
        category: "migratory-waterfowl",
        status: "Least Concern",
        season: "December to February",
        diet: "Grasses, grains, aquatic roots",
        wingspan: "147–180 cm",
        icon: "🪿",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Greylag_Goose_Anser_anser.jpg/800px-Greylag_Goose_Anser_anser.jpg",
        description: "Large grey goose with pink bill and orange legs. Flocks migrate thousands of kilometers from Central Asia to forage at Wadhvana Lake."
    },
    {
        id: "greater-flamingo",
        name: "Greater Flamingo",
        scientificName: "Phoenicopterus roseus",
        category: "wading-birds",
        status: "Least Concern",
        season: "October to March",
        diet: "Algae, small crustaceans, diatoms",
        wingspan: "140–165 cm",
        icon: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Greater_Flamingo_Rann_of_Kutch.jpg/800px-Greater_Flamingo_Rann_of_Kutch.jpg",
        description: "Tall wading bird with pinkish plumage and curved bill. Forages in the shallow shoreline waters of Wadhvana."
    },
    {
        id: "common-pochard",
        name: "Common Pochard",
        scientificName: "Aythya ferina",
        category: "migratory-waterfowl",
        status: "Vulnerable",
        season: "November to March",
        diet: "Aquatic vegetation, seeds, aquatic insects",
        wingspan: "72–82 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Common_Pochard_male.jpg/800px-Common_Pochard_male.jpg",
        description: "Medium-sized diving duck with a rusty red head, black chest, and grey body. Vulnerable species relying on protected wetlands."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "watchtower-1",
        title: "Main Eco-Watchtower",
        lat: 22.176,
        lng: 73.481,
        type: "Observation",
        description: "Panoramic view tower equipped with spotting scopes for observing deep-water diving ducks and geese."
    },
    {
        id: "north-embankment",
        title: "North Embankment Promenade",
        lat: 22.179,
        lng: 73.485,
        type: "Trail",
        description: "Tree-lined walkway providing ideal vantage points for photography and morning bird walks."
    },
    {
        id: "feeder-canal",
        title: "Orsang Feeder Canal Inlet",
        lat: 22.171,
        lng: 73.478,
        type: "Hydrology",
        description: "Inflow canal mouth where shallow marshy vegetation attracts waders, storks, and herons."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ferruginous_duck_%28Aythya_nyroca%29_male.jpg/800px-Ferruginous_duck_%28Aythya_nyroca%29_male.jpg",
        caption: "Ferruginous Duck resting on Wadhvana waters",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Greylag_Goose_Anser_anser.jpg/800px-Greylag_Goose_Anser_anser.jpg",
        caption: "Greylag Geese foraging along the reservoir banks",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Greater_Flamingo_Rann_of_Kutch.jpg/800px-Greater_Flamingo_Rann_of_Kutch.jpg",
        caption: "Greater Flamingos wading in shallow waters",
        category: "Landscape"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WADHNAVANA_INFO, ECOLOGY_HYDROLOGY, BIRD_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };
}
