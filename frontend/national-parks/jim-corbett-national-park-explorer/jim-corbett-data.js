/**
 * Jim Corbett National Park Explorer — Data Module
 */

const CORBETT_INFO = {
    id: "jim-corbett",
    name: "Jim Corbett National Park",
    aka: "Formerly Hailey National Park / Ramganga National Park",
    location: "Nainital & Pauri Garhwal Districts, Uttarakhand, India",
    state: "Uttarakhand",
    coordinates: { lat: 29.53, lng: 78.77 },
    area: "1,318 km² (Core: 520 km², Buffer: 798 km²)",
    establishedYear: 1936,
    tigerReserveYear: 1973,
    etymology: "Originally 'Hailey National Park' (1936), renamed 'Ramganga National Park' in 1954, then renamed again in 1957 in honour of hunter-turned-conservationist Jim Corbett.",
    climate: "Subtropical — hot summers, monsoon rains, cool winters",
    bestTime: "November to June (Dhikala zone closed mid-June to mid-November for monsoon)",
    entryFees: "₹200 (Indian Nationals), ₹1,000 (Foreigners), Jeep Safari: ₹3,000–5,000/vehicle, Canter Safari: ₹700–1,200/person",
    nearestTransport: {
        railway: "Ramnagar Railway Station (adjacent to the park)",
        airport: "Pantnagar Airport (75 km) / Delhi IGI Airport (260 km)",
        gatewayTown: "Ramnagar"
    },
    quickStats: [
        { label: "India's First National Park", value: "Est. 1936", icon: "🏞️" },
        { label: "Project Tiger Launch Site", value: "1973", icon: "🐅" },
        { label: "Total Area", value: "1,318 km²", icon: "📐" },
        { label: "Safari Zones", value: "6", icon: "🚙" },
        { label: "Bird Species", value: "600+", icon: "🦅" },
        { label: "Bengal Tigers", value: "260+", icon: "🐾" }
    ]
};

const CORBETT_HISTORY = [
    { year: "1936", title: "Hailey National Park Founded", description: "India's first national park is established along the Ramganga river valley, named after Sir Malcolm Hailey, then Governor of the United Provinces." },
    { year: "1954–55", title: "Renamed Ramganga National Park", description: "Following independence, the park is renamed after the Ramganga River that flows through it." },
    { year: "1957", title: "Renamed Corbett National Park", description: "The park is renamed a second time in honour of Jim Corbett, the British-Indian hunter-turned-conservationist who championed its creation and famously tracked man-eating tigers in the region." },
    { year: "1973", title: "Birthplace of Project Tiger", description: "India's flagship tiger conservation programme, Project Tiger, is launched from Corbett, marking a turning point for Bengal Tiger conservation nationwide." }
];

const CORBETT_GEOGRAPHY = {
    description: "Corbett straddles the foothills of the Himalayas and the Shivalik range, with elevations ranging from 360 m to 1,040 m. The Ramganga River and its reservoir cut through the park, feeding riverine belts, ravines, and the Patli Dun valley — creating a striking mix of hills, marshy depressions (chaurs), and dense forest.",
    riverSystem: "Ramganga River & Ramganga Reservoir",
    terrain: ["Shivalik hills", "Riverine belts", "Patli Dun valley", "Chaur grasslands", "Ramganga Reservoir wetlands"]
};

const CORBETT_FLORA = [
    { name: "Sal Forest", description: "Covers roughly 73% of the park; tall Sal (Shorea robusta) stands dominate the lower hill slopes." },
    { name: "Chaur Grasslands", description: "Riverine grasslands and marshy depressions that support high densities of deer and grazing wildlife." },
    { name: "Khair-Sissoo Forest", description: "Found along riverbanks and floodplains of the Ramganga, providing cover for elephants and deer." },
    { name: "Pine & Mixed Forest", description: "Chir Pine forests appear at higher elevations in the park's northern reaches." }
];

const CORBETT_WILDLIFE = [
    { name: "Bengal Tiger", scientificName: "Panthera tigris tigris", status: "Endangered", description: "Corbett's flagship predator and the site where Project Tiger began in 1973; the reserve now holds one of India's highest tiger densities.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Royal_Bengal_Tiger_at_Nandankanan.jpg/800px-Royal_Bengal_Tiger_at_Nandankanan.jpg" },
    { name: "Asian Elephant", scientificName: "Elephas maximus", status: "Endangered", description: "Large herds move between Corbett and neighbouring Rajaji National Park along traditional elephant corridors.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/800px-Elephant_safari_in_Kaziranga.jpg" },
    { name: "Leopard", scientificName: "Panthera pardus fusca", status: "Vulnerable", description: "Shares the forest with tigers, generally favouring denser cover and higher terrain to avoid direct competition.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Indian_leopard.jpg/800px-Indian_leopard.jpg" },
    { name: "Gharial", scientificName: "Gavialis gangeticus", status: "Critically Endangered", description: "This slender-snouted crocodilian basks along the Ramganga River, one of its few remaining strongholds.", image: "https://upload.wikimedia.org/wikipedia/commons/5/54/Jim_Corbett_National_Park_%28India%29.jpg" },
    { name: "Chital (Spotted Deer)", scientificName: "Axis axis", status: "Least Concern", description: "The most commonly sighted deer species, grazing in large herds across the chaur grasslands.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jim_Corbett_National_Park_%28India%29.jpg/960px-Jim_Corbett_National_Park_%28India%29.jpg" }
];

const TIGER_INFO = {
    title: "The Bengal Tiger of Corbett",
    scientificName: "Panthera tigris tigris",
    conservationStatus: "Endangered (IUCN Red List)",
    population: "260+ tigers — one of the highest densities of any tiger reserve in India",
    description: "Corbett is inseparable from the story of Indian tiger conservation. It was here that Project Tiger was launched in 1973 in response to alarming population declines nationwide. Dense Sal forests, riverine cover, and abundant prey along the Ramganga floodplains make it prime tiger habitat.",
    significance: "As the pilot reserve for Project Tiger, Corbett's conservation model — anti-poaching camps, core-buffer zoning, and relocation of villages from core habitat — became the template later applied across dozens of other Indian tiger reserves."
};

const SAFARI_ZONES = [
    { title: "Dhikala Zone", description: "The largest and most famous zone, bordering the Ramganga Reservoir with sweeping grasslands.", duration: "Full-day / Overnight", timing: "6:00 AM – 6:00 PM", cost: "₹4,500 (Jeep, approx.)", capacity: "6 persons/jeep", zones: "Ramganga floodplain, Reservoir", highlights: ["Best tiger sighting zone", "Elephant herds", "Overnight forest lodges"] },
    { title: "Bijrani Zone", description: "Known as a 'mini Dhikala', open year-round and popular for its accessibility from Ramnagar.", duration: "3–4 hours", timing: "6:00 AM – 5:00 PM", cost: "₹3,500 (Jeep, approx.)", capacity: "6 persons/jeep", zones: "Sal forest, grasslands", highlights: ["Great for first-time visitors", "Rich birdlife"] },
    { title: "Jhirna Zone", description: "The only zone open through the monsoon, offering safaris even when Dhikala is closed.", duration: "3–4 hours", timing: "6:00 AM – 5:00 PM", cost: "₹3,000 (Jeep, approx.)", capacity: "6 persons/jeep", zones: "Dry deciduous forest", highlights: ["Open all year", "Good leopard sightings"] },
    { title: "Dhela Zone", description: "A community-run buffer zone that eases pressure on the core area while supporting local livelihoods.", duration: "3–4 hours", timing: "6:00 AM – 5:00 PM", cost: "₹2,500 (Jeep, approx.)", capacity: "6 persons/jeep", zones: "Buffer forest", highlights: ["Eco-tourism model", "Village-forest interface"] },
    { title: "Durga Devi Zone", description: "A birder's favourite along the Mandal and Palain rivers, in the park's more rugged terrain.", duration: "3–4 hours", timing: "6:00 AM – 5:00 PM", cost: "₹3,000 (Jeep, approx.)", capacity: "6 persons/jeep", zones: "Mandal-Palain confluence", highlights: ["Excellent birdwatching", "Mahseer fish habitat"] },
    { title: "Sonanadi Zone", description: "Part of the wider Corbett Tiger Reserve buffer, known for elephant corridors along the Sonanadi river.", duration: "Full-day", timing: "6:00 AM – 5:00 PM", cost: "₹3,500 (Jeep, approx.)", capacity: "6 persons/jeep", zones: "Sonanadi river belt", highlights: ["Elephant migration corridor", "Quieter, less-visited zone"] }
];

const MAP_HOTSPOTS = [
    { id: "dhikala", name: "Dhikala Zone", x: 55, y: 35, category: "wildlife", description: "The park's premier zone bordering the Ramganga Reservoir grasslands." },
    { id: "bijrani", name: "Bijrani Zone", x: 25, y: 55, category: "gate", description: "Popular, easily accessible zone close to Ramnagar." },
    { id: "jhirna", name: "Jhirna Zone", x: 20, y: 75, category: "gate", description: "The only zone that stays open year-round through the monsoon." },
    { id: "ramganga", name: "Ramganga River", x: 60, y: 55, category: "water", description: "The lifeline river of the park, home to gharials, mugger crocodiles, and mahseer fish." },
    { id: "durgadevi", name: "Durga Devi Zone", x: 80, y: 30, category: "wildlife", description: "A quiet, birder-favourite zone at the Mandal-Palain confluence." },
    { id: "corbettfalls", name: "Corbett Falls", x: 45, y: 80, category: "landmark", description: "A scenic waterfall near Kaladhungi, close to Jim Corbett's former residence." }
];

const GALLERY_IMAGES = [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jim_Corbett_National_Park_%28India%29.jpg/960px-Jim_Corbett_National_Park_%28India%29.jpg", title: "Corbett Landscape", caption: "Sal forests along the Ramganga valley" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Royal_Bengal_Tiger_at_Nandankanan.jpg/960px-Royal_Bengal_Tiger_at_Nandankanan.jpg", title: "Bengal Tiger", caption: "A Bengal Tiger, Corbett's flagship species" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elephant_safari_in_Kaziranga.jpg/960px-Elephant_safari_in_Kaziranga.jpg", title: "Elephant Safari", caption: "Elephant safari through the grasslands" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Indian_leopard.jpg/960px-Indian_leopard.jpg", title: "Leopard", caption: "A leopard resting in dense cover" }
];

const CORBETT_FACTS = [
    "Jim Corbett National Park is India's first and oldest national park, established in 1936.",
    "Project Tiger, India's national tiger conservation programme, was launched from Corbett in 1973.",
    "The park is named after Jim Corbett, a British-Indian hunter who later became a dedicated wildlife conservationist and author.",
    "Corbett has one of the highest densities of Bengal Tigers of any reserve in India.",
    "The Ramganga River, which flows through the park, is home to gharials, mugger crocodiles, and mahseer fish.",
    "Dhikala zone, the park's most famous area, is only accessible by pre-booked forest lodges or day-safari permits."
];