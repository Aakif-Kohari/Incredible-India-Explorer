/**
 * Pala Wetland Explorer — Data Module
 * Comprehensive dataset covering Mizoram's first Ramsar Site, freshwater ecology,
 * aquatic flora, fish & bird diversity, Mara folk legend, map hotspots, and gallery.
 */

const PALA_INFO = {
    id: "pala-wetland",
    name: "Pala Wetland",
    localName: "Pala Tipa",
    location: "Phura Village, Saiha District, Mizoram, India",
    state: "Mizoram",
    coordinates: { lat: 22.203, lng: 92.906 },
    area: "1.85 km² (185 hectares)",
    ramsarYear: 2021,
    ramsarSiteNo: 2460,
    lakeType: "Natural Freshwater Lake",
    climate: "Subtropical Monsoon with high rainfall",
    bestTime: "October to March",
    nearestTransport: {
        town: "Phura Village (5 km) / Saiha (85 km)",
        airport: "Lengpui Airport, Aizawl (350 km)",
        highway: "NH 54 / Saiha-Phura Road"
    },
    quickStats: [
        { label: "Mizoram's First Ramsar Site", value: "2021", icon: "💧" },
        { label: "Surface Area", value: "1.85 km²", icon: "🌊" },
        { label: "Freshwater Lake", value: "Natural", icon: "🏞️" },
        { label: "Forest Surrounding", value: "Tropical Evergreen", icon: "🌳" },
        { label: "Endemic Fish & Flora", value: "Rich Diversity", icon: "🐟" },
        { label: "Mara Tribal Heritage", value: "Pala Tipa Legend", icon: "📜" }
    ]
};

const ECOLOGY_HYDROLOGY = {
    overview: "Pala Wetland (Pala Tipa in local Mara language) is the largest natural lake in Mizoram. Nestled within the Indo-Burma biodiversity hotspot in Saiha district, it is completely enclosed by primary tropical wet evergreen forests.",
    freshwaterEcology: "The lake ecosystem is sustained by rainfall and hill streams. It provides habitat for endangered mammals, amphibians, endemic fishes, and rare waterfowl such as the White-winged Wood Duck.",
    legend: "According to Mara tribal folklore, a giant serpent once inhabited the valley. When villagers killed the serpent, a devastating flood submerged the ancient village, forming Pala Tipa ('Swallowed Lake').",
    conservationStatus: "Designated as a Ramsar Site of International Importance in 2021. Managed under the Mizoram Environment, Forests & Climate Change Department."
};

const BIRD_FISH_SPECIES = [
    {
        id: "white-winged-wood-duck",
        name: "White-winged Wood Duck",
        scientificName: "Asarcornis scutulata",
        category: "birdlife",
        status: "Endangered",
        season: "Resident",
        diet: "Aquatic plants, seeds, small fish, snails",
        wingspan: "70–85 cm",
        icon: "🦆",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/White-winged_duck_Asarcornis_scutulata.jpg/800px-White-winged_duck_Asarcornis_scutulata.jpg",
        description: "Rare forest-dwelling duck with distinctive white wing patch and dark speckled head. State bird of Assam and rare resident in Pala's secluded waters."
    },
    {
        id: "great-hornbill",
        name: "Great Hornbill",
        scientificName: "Buceros bicornis",
        category: "birdlife",
        status: "Vulnerable",
        season: "Resident",
        diet: "Figs, small mammals, reptiles",
        wingspan: "150–152 cm",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Great-hornbill.jpg/800px-Great-hornbill.jpg",
        description: "Iconic canopy bird with massive yellow casque and bill. Inhabits the dense tropical rainforest surrounding Pala Lake."
    },
    {
        id: "badis-tuivaiei",
        name: "Mizoram Chameleon Fish",
        scientificName: "Badis tuivaiei",
        category: "fish-diversity",
        status: "Least Concern",
        season: "Year-round",
        diet: "Small crustaceans, insect larvae",
        size: "5–7 cm",
        icon: "🐟",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Badis_badis.jpg/800px-Badis_badis.jpg",
        description: "Small freshwater fish species endemic to North East hill streams and lakes, changing color rapidly based on mood."
    },
    {
        id: "emerald-dove",
        name: "Asian Emerald Dove",
        scientificName: "Chalcophaps indica",
        category: "birdlife",
        status: "Least Concern",
        season: "Resident",
        diet: "Seeds, fallen fruits",
        wingspan: "43–48 cm",
        icon: "🕊️",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Asian_Emerald_Dove.jpg/800px-Asian_Emerald_Dove.jpg",
        description: "Solitary forest dove featuring bright metallic emerald green wings and coral red bill."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "viewpoint-hill",
        title: "Pala Lake Hilltop Viewpoint",
        lat: 22.205,
        lng: 92.908,
        type: "Viewpoint",
        description: "Panoramic lookout point offering clear views of the oval lake framed by dense rainforest canopy."
    },
    {
        id: "phura-trail",
        title: "Phura Eco-Forest Trail",
        lat: 22.201,
        lng: 92.903,
        type: "Trekking",
        description: "Guided jungle path through tropical dipterocarp forest leads to the quiet lake shore."
    },
    {
        id: "inflow-stream",
        title: "Southern Hill Stream Inlet",
        lat: 22.198,
        lng: 92.905,
        type: "Hydrology",
        description: "Freshwater stream entry point rich in riparian flora, orchids, and aquatic dragonflies."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/White-winged_duck_Asarcornis_scutulata.jpg/800px-White-winged_duck_Asarcornis_scutulata.jpg",
        caption: "White-winged Wood Duck in lush wetland habitat",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Great-hornbill.jpg/800px-Great-hornbill.jpg",
        caption: "Great Hornbill perched in canopy around Pala Lake",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Asian_Emerald_Dove.jpg/800px-Asian_Emerald_Dove.jpg",
        caption: "Asian Emerald Dove resting in tropical forest understory",
        category: "Fauna"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PALA_INFO, ECOLOGY_HYDROLOGY, BIRD_FISH_SPECIES, MAP_HOTSPOTS, GALLERY_IMAGES };
}
