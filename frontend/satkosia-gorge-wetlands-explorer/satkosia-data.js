/**
 * Satkosia Gorge Wetlands Explorer — Data Module
 * Comprehensive dataset covering Ramsar Site metadata, Mahanadi River gorge hydrology,
 * crocodile conservation, aquatic biodiversity, map hotspots, and image gallery.
 */

const SATKOSIA_INFO = {
    id: "satkosia-gorge-wetland",
    name: "Satkosia Gorge Wetlands",
    location: "Angul, Cuttack, Nayagarh & Boudh Districts, Odisha, India",
    state: "Odisha",
    coordinates: { lat: 20.58, lng: 84.83 },
    area: "425.89 km² (42,589 hectares)",
    ramsarYear: 2022,
    ramsarSiteNo: 2468,
    wetlandType: "Riverine Gorge Wetland",
    climate: "Tropical Moist Deciduous",
    bestTime: "October to April",
    nearestTransport: {
        town: "Angul (60 km) / Nayagarh (55 km) / Cuttack (110 km)",
        airport: "Bhubaneswar Biju Patnaik Airport (125 km)",
        railway: "Angul Railway Station (60 km)"
    },
    quickStats: [
        { label: "Ramsar Site Designated", value: "2022", icon: "💧" },
        { label: "Gorge Length", value: "22 km", icon: "🏞️" },
        { label: "Surface Area", value: "425.89 km²", icon: "🌊" },
        { label: "Crocodile Sanctuary", value: "Gharial & Mugger", icon: "🐊" },
        { label: "River System", value: "Mahanadi River", icon: "🛶" },
        { label: "Deciduous Forest", value: "Eastern Ghats", icon: "🌳" }
    ]
};

const ECOLOGY_HYDROLOGY = {
    overview: "Satkosia Gorge Wetlands is a unique riverine wetland ecosystem where the mighty Mahanadi River cuts through a spectacular 22 km narrow gorge in the Eastern Ghats of Odisha.",
    gorgeHydrology: "The deep, fast-flowing river gorge creates deep pools, sandbars, and rocky rapids. It acts as a vital aquatic refuge connecting Deccan peninsula river fauna with Eastern Ghat hill forests.",
    crocodileConservation: "Satkosia is famous as the southernmost natural refuge for the Critically Endangered Gharial (Gavialis gangeticus) and vulnerable Mugger Crocodile. Pioneered the Gharial Research and Conservation Unit at Tikarpada.",
    conservationStatus: "Designated as a Ramsar Site of International Importance in 2022. Overlaps with Satkosia Tiger Reserve and Sanctuary."
};

const INTERESTING_FACTS = [
    {
        title: "22 km Natural Canyon",
        fact: "The gorge was carved by the Mahanadi River over millions of years through hard metamorphic quartzites of the Eastern Ghats."
    },
    {
        title: "Tikarpada Crocodile Project",
        fact: "In 1975, Tikarpada in Satkosia became one of India's pioneer breeding centers for reintroducing captive-reared Gharial hatchlings into deep river pools."
    },
    {
        title: "Meeting of Bio-Geographic Zones",
        fact: "Satkosia represents the ecological boundary where the Eastern Ghats and Chota Nagpur Plateau biomes meet."
    }
];

const SPECIES_CATALOG = [
    {
        id: "gharial",
        name: "Gharial",
        scientificName: "Gavialis gangeticus",
        category: "reptiles",
        status: "Critically Endangered",
        season: "Year-round",
        diet: "Fish",
        size: "3.5–6 meters",
        icon: "🐊",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gharial_Gavialis_gangeticus.jpg/800px-Gharial_Gavialis_gangeticus.jpg",
        description: "Fish-eating crocodilian with long narrow snout and ghara boss on adult males. Deep pools of Satkosia gorge serve as its southern refuge."
    },
    {
        id: "mugger-crocodile",
        name: "Mugger Crocodile",
        scientificName: "Crocodylus palustris",
        category: "reptiles",
        status: "Vulnerable",
        season: "Year-round",
        diet: "Fish, amphibians, birds, mammals",
        size: "3–4.5 meters",
        icon: "🐊",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Mugger_crocodile_%28Crocodylus_palustris%29.jpg/800px-Mugger_crocodile_%28Crocodylus_palustris%29.jpg",
        description: "Broad-snouted freshwater crocodile basking along the sandy beaches of Satkosia."
    },
    {
        id: "indian-skimmer",
        name: "Indian Skimmer",
        scientificName: "Rynchops albicollis",
        category: "birds",
        status: "Endangered",
        season: "November to March",
        diet: "Small fish, crustaceans",
        wingspan: "108–118 cm",
        icon: "🦅",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Indian_Skimmer_Rynchops_albicollis.jpg/800px-Indian_Skimmer_Rynchops_albicollis.jpg",
        description: "Striking black and white bird with elongated orange lower mandible used to skim water surface for fish on Mahanadi sandbars."
    },
    {
        id: "asian-elephant",
        name: "Asian Elephant",
        scientificName: "Elephas maximus",
        category: "mammals",
        status: "Endangered",
        season: "Year-round",
        diet: "Grasses, bamboo, bark, leaves",
        size: "2.7–3.2 meters tall",
        icon: "🐘",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Elephas_maximus_%28Bandipur%29.jpg/800px-Elephas_maximus_%28Bandipur%29.jpg",
        description: "Elephant herds cross the Mahanadi river within the gorge sanctuary during seasonal migrations."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "tikarpada-gorge",
        title: "Tikarpada Gorge & Crocodile Sanctuary",
        lat: 20.612,
        lng: 84.783,
        type: "Conservation Reserve",
        description: "Central gorge observation point and historic Gharial conservation research center."
    },
    {
        id: "chhotkei-viewpoint",
        title: "Chhotkei Eco-Tourism Village",
        lat: 20.554,
        lng: 84.851,
        type: "Eco-Camp",
        description: "Lush hill camp offering nature trails and panoramic views of the Mahanadi gorge bend."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gharial_Gavialis_gangeticus.jpg/800px-Gharial_Gavialis_gangeticus.jpg",
        caption: "Gharial basking on Mahanadi sandbar",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Mugger_crocodile_%28Crocodylus_palustris%29.jpg/800px-Mugger_crocodile_%28Crocodylus_palustris%29.jpg",
        caption: "Mugger Crocodile in deep river pool",
        category: "Fauna"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Indian_Skimmer_Rynchops_albicollis.jpg/800px-Indian_Skimmer_Rynchops_albicollis.jpg",
        caption: "Indian Skimmer resting on river sand spit",
        category: "Fauna"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SATKOSIA_INFO, ECOLOGY_HYDROLOGY, INTERESTING_FACTS, SPECIES_CATALOG, MAP_HOTSPOTS, GALLERY_IMAGES };
}
