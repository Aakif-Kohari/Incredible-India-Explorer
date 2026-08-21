/**
 * Udhwa Wetlands Explorer — Data Module
 * Comprehensive dataset covering Ramsar Site metadata, Jharkhand's only wetland sanctuary,
 * Patauda & Berhale oxbow lakes hydrology, bird diversity, map hotspots, and gallery.
 */

const UDHWA_INFO = {
    id: "udhwa-wetlands",
    name: "Udhwa Lake Bird Sanctuary & Wetlands",
    location: "Sahibganj District, Jharkhand, India",
    state: "Jharkhand",
    coordinates: { lat: 24.972, lng: 87.838 },
    area: "5.65 km² (565 hectares)",
    establishedYear: 1978,
    ramsarYear: 2024,
    ramsarSiteNo: 2510,
    wetlandType: "Interconnected Freshwater Oxbow Lakes",
    climate: "Subtropical Monsoonal",
    bestTime: "November to March (Peak Winter Migratory Season)",
    nearestTransport: {
        town: "Rajmahal (10 km) / Sahibganj (42 km) / Farakka (30 km)",
        airport: "Kazi Nazrul Islam Airport, Durgapur (180 km) / Patna Airport (290 km)",
        railway: "Bonidanga Railway Station (5 km) / Sahibganj Junction (42 km)"
    },
    quickStats: [
        { label: "Jharkhand's Only Ramsar Site", value: "Ramsar Site", icon: "💧" },
        { label: "Interconnected Lakes", value: "Patauda & Berhale", icon: "🏞️" },
        { label: "Total Sanctuary Area", value: "5.65 km²", icon: "🌾" },
        { label: "Established", value: "1978", icon: "🏛️" },
        { label: "Migratory Birds", value: "20,000+", icon: "🦅" },
        { label: "Ganges Floodplain", value: "Riverine Oasis", icon: "🌊" }
    ]
};

const ECOLOGY_HYDROLOGY = {
    overview: "Udhwa Lake Bird Sanctuary is Jharkhand's sole notified Ramsar wetland sanctuary. Situated in Sahibganj district near the Ganges river floodplain, it consists of two interconnected natural oxbow lakes — Patauda Lake and Berhale Lake.",
    lakesHydrology: "Patauda Lake (155 ha) is relatively shallow and choked with aquatic macrophytes, while Berhale Lake (410 ha) is deeper with open water channels. A natural canal connects the twin lakes during high monsoon floods.",
    biodiversity: "Serves as an essential winter staging and roosting refuge on the Central Asian Flyway for thousands of migratory wildfowl arriving from Siberian and Central Asian breeding grounds.",
    conservationStatus: "Managed under the Wildlife Division of Jharkhand Forest Department with active anti-poaching squads and lake boundary demarcation."
};

const BIRD_SPECIES = [
    {
        id: "tufted-duck",
        name: "Tufted Duck",
        scientificName: "Aythya fuligula",
        category: "migratory-waterfowl",
        status: "Least Concern",
        season: "November to February",
        diet: "Mollusks, aquatic insects, submerged plants",
        wingspan: "67–73 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tufted_Duck_male.jpg/800px-Tufted_Duck_male.jpg",
        description: "Medium-sized diving duck with glossy black head, thin drooping crest tuft, and bright yellow eye."
    },
    {
        id: "northern-pintail",
        name: "Northern Pintail",
        scientificName: "Anas acuta",
        category: "migratory-waterfowl",
        status: "Least Concern",
        season: "October to March",
        diet: "Aquatic tubers, seeds, invertebrates",
        wingspan: "80–95 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Northern-Pintail-Male.jpg/800px-Northern-Pintail-Male.jpg",
        description: "Slender duck with long needle-like central tail feathers, arriving in large numbers at Berhale Lake."
    },
    {
        id: "red-crested-pochard",
        name: "Red-crested Pochard",
        scientificName: "Netta rufina",
        category: "migratory-waterfowl",
        status: "Least Concern",
        season: "November to February",
        diet: "Submerged aquatic roots and stems",
        wingspan: "84–90 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Netta_rufina_m2.jpg/800px-Netta_rufina_m2.jpg",
        description: "Large diving duck with striking rounded orange-chestnut head and bright coral red bill on males."
    },
    {
        id: "pheasant-tailed-jacana",
        name: "Pheasant-tailed Jacana",
        scientificName: "Hydrophasianus chirurgus",
        category: "wading-birds",
        status: "Least Concern",
        season: "Resident",
        diet: "Aquatic seeds, insects, snails",
        wingspan: "39–58 cm",
        icon: "🪶",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Pheasant-tailed_Jacana_%28Hydrophasianus_chirurgus%29_male.jpg/800px-Pheasant-tailed_Jacana_%28Hydrophasianus_chirurgus%29_male.jpg",
        description: "Elegant wetland wader featuring extremely long toes and a long curved tail in breeding season."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "patauda-watchtower",
        title: "Patauda Lake Watchtower",
        lat: 24.974,
        lng: 87.835,
        type: "Observation Tower",
        description: "Observation tower overlooking Patauda's shallow aquatic plant beds."
    },
    {
        id: "berhale-open-waters",
        title: "Berhale Deep Water Channel",
        lat: 24.968,
        lng: 87.842,
        type: "Deep Water Zone",
        description: "Deeper lake area hosting large winter rafts of diving ducks and pochards."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tufted_Duck_male.jpg/800px-Tufted_Duck_male.jpg",
        caption: "Tufted Duck drake resting on Berhale lake",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Netta_rufina_m2.jpg/800px-Netta_rufina_m2.jpg",
        caption: "Red-crested Pochard swimming in open water",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Pheasant-tailed_Jacana_%28Hydrophasianus_chirurgus%29_male.jpg/800px-Pheasant-tailed_Jacana_%28Hydrophasianus_chirurgus%29_male.jpg",
        caption: "Pheasant-tailed Jacana on floating lily pad",
        category: "Fauna"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UDHWA_INFO, ECOLOGY_HYDROLOGY, BIRD_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };
}
