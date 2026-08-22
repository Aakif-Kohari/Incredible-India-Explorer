/**
 * Surinsar-Mansar Lakes Explorer — Data Module
 * Comprehensive dataset covering the twin Ramsar-designated freshwater lakes
 * in Jammu & Kashmir — metadata, twin lake ecosystem, Ramsar details,
 * religious importance, wildlife, birdlife, local legends, map hotspots
 * and image gallery.
 */

const SM_INFO = {
    id: "surinsar-mansar-lakes",
    name: "Surinsar-Mansar Lakes",
    location: "Samba District, Jammu & Kashmir, India",
    state: "Jammu & Kashmir",
    coordinates: { lat: 32.720, lng: 75.170 },
    area: "350 ha (composite Ramsar site)",
    ramsarYear: 2005,
    ramsarSiteNo: 1573,
    wetlandType: "Freshwater Composite Lake (Twin Lakes)",
    designation: "Ramsar Site & Wildlife Sanctuary",
    bestTime: "October to March",
    quickStats: [
        { label: "Ramsar Site No.", value: "1573", icon: "💧" },
        { label: "Designated", value: "2005", icon: "🪷" },
        { label: "Composite Area", value: "350 ha", icon: "🌊" },
        { label: "Twin Lakes", value: "Mansar + Surinsar", icon: "🪞" },
        { label: "Sanctuary Area", value: "3.5 km²", icon: "🏞️" },
        { label: "CITES Species", value: "2 Turtles + Medusa", icon: "🐢" }
    ]
};

const TWIN_LAKE_ECOSYSTEM = {
    overview: "Surinsar and Mansar are twin freshwater lakes lying in the Siwalik foothills of Jammu, about 9 km apart, yet treated as a single composite wetland of exceptional ecological value. Despite sitting on high ground with no visible surface feeder channel, both lakes remain perennial, sustained by groundwater conditions and a small catchment.",
    surinsarProfile: "Surinsar Lake is the smaller twin — an oval, rain-fed water body about 20 ha with a maximum depth of 24 m and a small central island. Its alkaline waters (pH 7.2–8.9) support a complete belt of varied aquatic vegetation along its banks. Mythology says it was born where Arjuna's son shot an arrow and a spring gushed forth.",
    mansarProfile: "Mansar Lake is the larger twin — a semi-oval lake of about 329 ha, roughly 1.6 km long and 645 m wide, with a maximum depth of about 38 m and a water volume of 12.37 million m³. Fringed by forest-covered hills, it is rich in aquatic flora with 86 algal genera spanning 207 species in its shallow littoral zone.",
    hydrology: "Surinsar is rain-fed with no permanent outlet, while Mansar is fed primarily by surface run-off and partially by mineralised water passing through surrounding paddy fields, with inflows rising sharply in the rainy season. Subterranean springs and artesian-like groundwater conditions keep both lakes perennial through the dry months."
};

const RAMSAR_DETAILS = {
    summary: "Surinsar-Mansar Lakes were designated as a Ramsar Site of International Importance on 8 November 2005 (Ramsar Site No. 1573, 350 ha). The site also forms the core of the Surinsar-Mansar Wildlife Sanctuary (3.5 km²), established in 2005 under the Wildlife Protection Act, 1972.",
    criteria: [
        "Criterion 2 — Supports vulnerable and endangered species including the Indian Softshell Turtle and Indian Flapshell Turtle listed under CITES and the IUCN Red List.",
        "Criterion 3 — Sustains unique biodiversity, notably the rare freshwater medusa Mansariella lacustris and rich macrophyte growth.",
        "Criterion 4 — Provides an ideal breeding, nursery and wintering habitat for migratory waterfowl along the Central Asian Flyway."
    ],
    threats: [
        "Rising tourist inflow and unplanned development around the lake shore",
        "Agricultural runoff and siltation from the catchment",
        "Bathing, ritual offerings and cremation activities at sacred sites",
        "Introduction of common carp, altering native fish ecology"
    ],
    conservation: "Managed by the Jammu & Kashmir Wildlife Department under the Chief Wildlife Warden. Conservation efforts focus on awareness-raising, catchment protection, water quality monitoring and regulated eco-tourism."
};

const RELIGIOUS_IMPORTANCE = [
    {
        icon: "🐍",
        title: "Sheshnag Temple",
        description: "A temple dedicated to Sheshnag, the serpent king of Hindu mythology, stands on the banks of Mansar Lake. It is central to the lake's sanctity and a major destination for pilgrims in the Jammu region."
    },
    {
        icon: "🛕",
        title: "Sacred Shoreline Temples",
        description: "Numerous temples line the lakes' shores. Pilgrims perform a ritual circumambulation (parikrama) of the lake, bathe in its waters, and offer prayers on occasions such as Maha Shivratri."
    },
    {
        icon: "💍",
        title: "Marriage & Rite-of-Passage Rituals",
        description: "Newly married couples circumambulate the lake seeking marital harmony, and families bring infants for mundan (first hair-cut) ceremonies — living traditions that keep the sacred landscape active."
    },
    {
        icon: "🎉",
        title: "Annual Fair",
        description: "A well-known annual fair is held by the lake, drawing devotees and visitors from across the region and blending religious observance with local cultural celebrations."
    }
];

const WILDLIFE_SPECIES = [
    {
        id: "indian-flapshell-turtle",
        name: "Indian Flapshell Turtle",
        scientificName: "Lissemys punctata",
        status: "CITES Appendix II",
        category: "Reptile",
        icon: "🐢",
        description: "A soft-shelled freshwater turtle that shelters in the lake's muddy shallows; listed under CITES and valued in the site's turtle fauna."
    },
    {
        id: "indian-softshell-turtle",
        name: "Indian Softshell Turtle",
        scientificName: "Aspideretes gangeticus",
        status: "CITES Appendix I · IUCN Vulnerable",
        category: "Reptile",
        icon: "🐢",
        description: "A large, vulnerable freshwater turtle whose presence in Mansar Lake contributed to the site's Ramsar Criterion 2 designation."
    },
    {
        id: "mansariella-medusa",
        name: "Freshwater Medusa",
        scientificName: "Mansariella lacustris",
        status: "Rare & Site-Endemic",
        category: "Invertebrate",
        icon: "🪼",
        description: "An exceptionally rare freshwater jellyfish found in Mansar Lake — a biodiversity highlight unique among Indian wetlands."
    },
    {
        id: "rohu",
        name: "Rohu",
        scientificName: "Labeo rohita",
        status: "Common Lake Fish",
        category: "Fish",
        icon: "🐟",
        description: "A major carp of the lake, accompanied by Puntius, Channa, Rasbora, Trichogaster and other native fish species; fishing is discouraged for religious reasons."
    },
    {
        id: "siwalik-mammals",
        name: "Siwalik Foothill Mammals",
        scientificName: "Sanctuary Fauna",
        status: "Wildlife Sanctuary",
        category: "Mammal",
        icon: "🦌",
        description: "The surrounding sanctuary protects forested hills harbouring wild boar, Indian crested porcupine, rhesus macaque, jackal and, in the denser cover, the common leopard."
    },
    {
        id: "macrophyte-flora",
        name: "Aquatic Flora",
        scientificName: "Nelumbo · Typha · Potamogeton",
        status: "207 Algal Species",
        category: "Flora",
        icon: "🪷",
        description: "Emergent cattails and reeds, floating lotus (Nelumbo nucifera) and submerged pondweeds create the nursery habitat that makes the composite lake so productive."
    }
];

const BIRD_SPECIES = [
    {
        id: "common-coot",
        name: "Common Coot",
        scientificName: "Fulica atra",
        status: "Winter Visitor",
        season: "October–March",
        count: "497 recorded (1989–90)",
        icon: "🦆",
        description: "The lake's most abundant wintering waterfowl, rafts of coots dot the open water of Mansar."
    },
    {
        id: "common-moorhen",
        name: "Common Moorhen",
        scientificName: "Gallinula chloropus",
        status: "Winter Visitor",
        season: "October–March",
        count: "114 recorded (1989–90)",
        icon: "🦆",
        description: "Slate-black rail with a red bill that picks its way through the reed fringes."
    },
    {
        id: "black-necked-grebe",
        name: "Black-necked Grebe",
        scientificName: "Podiceps nigricollis",
        status: "Winter Visitor",
        season: "October–March",
        count: "56 recorded (1989–90)",
        icon: "🦆",
        description: "A small diving grebe with elegant golden ear tufts that winters on the open lake."
    },
    {
        id: "common-pochard",
        name: "Common Pochard",
        scientificName: "Aythya ferina",
        status: "Winter Visitor",
        season: "November–February",
        count: "38 recorded (1989–90)",
        icon: "🦆",
        description: "Rusty-headed diving duck that joins the wintering flocks of the Central Asian Flyway."
    },
    {
        id: "tufted-duck",
        name: "Tufted Duck",
        scientificName: "Aythya fuligula",
        status: "Winter Visitor",
        season: "November–February",
        count: "26 recorded (1989–90)",
        icon: "🦆",
        description: "Black-and-white diving duck recognised by its distinctive crest."
    },
    {
        id: "cormorant-herons",
        name: "Cormorants & Herons",
        scientificName: "Phalacrocorax · Ardea",
        status: "Resident & Wintering",
        season: "Year-round",
        count: "Large Cormorant, Grey Heron, Night Heron",
        icon: "🦢",
        description: "Darters and cormorants fish the deep water while herons and egrets stalk the marshy margins."
    }
];

const LOCAL_LEGENDS = [
    {
        icon: "🏹",
        title: "The Arrow of Arjuna's Son",
        description: "Legend holds that Arjuna's son shot a miraculous arrow into the ground at Mansar and a spring gushed forth, filling the basin that became Surinsar Lake — originally known as 'Surang Sar'."
    },
    {
        icon: "🐍",
        title: "Arjuna, Ulupi & Babar Vahan",
        description: "Regional lore links the lakes to the Mahabharata. After the Kurukshetra war, during the Ashwamedha Yajna, Arjuna was slain by his own son Babar Vahan, born of the Naga princess Ulupi. To revive his father, Babar Vahan journeyed to the realm of Sheshnag for a magical jewel — the entrance to that underworld is associated with Surinsar Lake and the emergence point with Mansar Lake."
    },
    {
        icon: "🏔️",
        title: "Sanctity of Mansarovar",
        description: "Mansar shares its name and veneration with the high-altitude Mansarovar (Manasarovar) of Tibet. Many devotees believe the lake carries the sanctity of Mansarovar, and a ritual dip here is considered highly meritorious."
    },
    {
        icon: "🪞",
        title: "The Twin-Born Lakes",
        description: "Believed to originate from the Mahabharata period, the two lakes are regarded as inseparable twins — one composite sacred wetland whose fortunes and legends are told together in the folk memory of the Jammu region."
    }
];

const MAP_HOTSPOTS = [
    {
        id: "mansar-lake",
        title: "Mansar Lake",
        lat: 32.696,
        lng: 75.147,
        type: "Ramsar Component Lake",
        description: "The larger twin (~329 ha) — sacred lake, Sheshnag Temple and migratory waterfowl habitat."
    },
    {
        id: "surinsar-lake",
        title: "Surinsar Lake",
        lat: 32.740,
        lng: 75.165,
        type: "Ramsar Component Lake",
        description: "The smaller oval twin (~20 ha) with a central island, about 9 km from Mansar."
    },
    {
        id: "sheshnag-temple",
        title: "Sheshnag Temple",
        lat: 32.693,
        lng: 75.149,
        type: "Sacred Site",
        description: "Temple of the serpent king on the banks of Mansar Lake — a hub of pilgrimage and ritual."
    },
    {
        id: "wildlife-sanctuary",
        title: "Surinsar-Mansar Wildlife Sanctuary",
        lat: 32.720,
        lng: 75.170,
        type: "Protected Area",
        description: "3.5 km² sanctuary established in 2005 protecting the twin lakes and their forested catchment."
    }
];

const GALLERY_IMAGES = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/2/28/Dr_harleen_Kaur_mansar_lake_near_udhampur.jpg",
        caption: "Mansar Lake fringed by forest-covered hills",
        category: "Lake"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/8/82/Mansar_lake_footpath.png",
        caption: "Footpath skirting the sacred lake",
        category: "Lake"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Keoladeo_Ghana_Bird_Sanctuary.jpg/960px-Keoladeo_Ghana_Bird_Sanctuary.jpg",
        caption: "Wetland habitat for wintering waterfowl",
        category: "Wetland"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Chilika_Lake_Boat.jpg/960px-Chilika_Lake_Boat.jpg",
        caption: "Freshwater lake ecosystem and boating",
        category: "Lake"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Common_Pochard_male.jpg/800px-Common_Pochard_male.jpg",
        caption: "Common Pochard — a wintering visitor",
        category: "Birdlife"
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Loktak_lake_Manipur.jpg/960px-Loktak_lake_Manipur.jpg",
        caption: "Lacustrine wetland with aquatic vegetation",
        category: "Wetland"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SM_INFO,
        TWIN_LAKE_ECOSYSTEM,
        RAMSAR_DETAILS,
        RELIGIOUS_IMPORTANCE,
        WILDLIFE_SPECIES,
        BIRD_SPECIES,
        LOCAL_LEGENDS,
        MAP_HOTSPOTS,
        GALLERY_IMAGES
    };
}
