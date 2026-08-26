/**
 * brahmagiri-data.js
 * Comprehensive dataset for Brahmagiri Trek profile (Coorg / Wayanad, Western Ghats)
 */

const BRAHMAGIRI_STATS = {
    name: "Brahmagiri Peak",
    altName: "Brahmagiri Wildlife Sanctuary",
    elevationMeters: 1608,
    elevationFeet: 5276,
    location: "Kodagu (Coorg), Karnataka & Wayanad, Kerala Border",
    range: "Brahmagiri Range, Western Ghats (UNESCO World Heritage)",
    baseVillage: "Iruppu / Kurchi (Coorg) & Thirunelli (Wayanad)",
    distanceFromMadikeri: "60 km (Coorg)",
    difficulty: "Moderate",
    ascentTimeHrs: "3 to 4 hours",
    descentTimeHrs: "2 to 3 hours",
    trekDistanceKm: "6 km (one way from Iruppu Base)",
    bestSeasons: "October to March (Post-Monsoon & Winter)",
    sanctuaryPermit: "Mandatory Forest Dept Entry Permit & Escort Guard"
};

const BRAHMAGIRI_TIMELINE = [
    {
        year: "Ancient Era",
        title: "Puranic & Sacred Origins",
        badge: "Sacred Mythology",
        description: "According to Hindu mythology, Lord Brahma created this peak and Lord Rama visited the foothills. The Lakshmana Tirtha River originates here, cascading down as Iruppu Falls."
    },
    {
        year: "3,000 Years Ago",
        title: "Thirunelli Temple Foundations",
        badge: "Heritage",
        description: "The ancient Thirunelli Temple at the southern base of Brahmagiri was built, known as the 'Kashi of the South', dedicated to Lord Vishnu and surrounded by dense primeval forest."
    },
    {
        year: "1974 CE",
        title: "Establishment of Wildlife Sanctuary",
        badge: "Conservation",
        description: "The Brahmagiri Wildlife Sanctuary was officially notified across 181 sq km of Western Ghats tropical evergreen forests, preserving vital wildlife corridors between Nagarahole and Wayanad."
    },
    {
        year: "2012 CE",
        title: "UNESCO World Heritage Recognition",
        badge: "UNESCO",
        description: "Brahmagiri Range was inscribed as part of the Western Ghats UNESCO World Heritage site, recognized globally as one of the world's 8 'hottest hotspots' of biological diversity."
    },
    {
        year: "Present Day",
        title: "Controlled Forest Eco-Trekking",
        badge: "Eco-Tourism",
        description: "Managed strictly by Karnataka & Kerala Forest Departments with mandatory eco-guards to protect shola ecosystems, wild elephant herds, and endemic bird species."
    }
];

const BRAHMAGIRI_HIGHLIGHTS = [
    {
        id: "brahmagiri-summit",
        title: "Brahmagiri 1,608m Summit",
        subtitle: "Panoramic Western Ghats Viewpoint",
        icon: "⛰️",
        tag: "Summit View",
        description: "The 1,608m apex peak offering breathtaking 360-degree vistas across endless green forest canopies of Coorg, Wayanad Wildlife Sanctuary, and Nagarhole National Park."
    },
    {
        id: "iruppu-falls",
        title: "Iruppu Waterfalls",
        subtitle: "Origin of Lakshmana Tirtha River",
        icon: "🌊",
        tag: "Sacred Cascade",
        description: "A magnificent 60-meter freshwater cascade tumbling down sacred rocks near the trek starting point, surrounded by lush fern groves and vibrant butterflies."
    },
    {
        id: "pakshipathalam-cave",
        title: "Pakshipathalam Cave Complex",
        subtitle: "Subterranean Bird Sanctuary",
        icon: "🦇",
        tag: "Cave Ecosystem",
        description: "Located on the Kerala side of the range, this mysterious subterranean boulder cave complex houses ancient rock formations, bats, and rare Edible-nest Swiftlet birds."
    },
    {
        id: "shola-grasslands",
        title: "Shola Forest & High Grassland Mosaic",
        subtitle: "Endemic Tropical Ecosystem",
        icon: "🌿",
        tag: "Biodiversity",
        description: "Classic high-altitude Western Ghats forest mosaic comprising stunted evergreen Shola woods nestled in valley folds and wind-swept montane grasslands on hilltops."
    },
    {
        id: "wildlife-spotting",
        title: "Rich Wildlife & Fauna",
        subtitle: "Elephant & Malabar Squirrel Habitat",
        icon: "🐘",
        tag: "Fauna",
        description: "Home to Asian Elephants, Gaurs (Indian Bison), Lion-tailed Macaques, Malabar Giant Squirrels, Nilgiri Langurs, and endemic Western Ghats birds."
    },
    {
        id: "thirunelli-temple",
        title: "Thirunelli Temple & Papanasini",
        subtitle: "3,000-Year Foothill Shrine",
        icon: "🛕",
        tag: "Foothill Shrine",
        description: "An ancient granite temple nestled in valley greenery at the southern foot of Brahmagiri, famous for the sacred Papanasini stream believed to cleanse all sins."
    }
];

const BRAHMAGIRI_TREK_STEPS = [
    {
        step: 1,
        title: "Iruppu Base to Forest Department Checkpost",
        duration: "30 mins",
        terrain: "Paved path near Iruppu Falls",
        description: "Start at the Iruppu Falls entrance in Coorg. Obtain official Forest Department entry permits, meet your assigned forest guide, and cross the Lakshmana Tirtha stream."
    },
    {
        step: 2,
        title: "Dense Evergreen Forest Canopy Ascent",
        duration: "60–90 mins",
        terrain: "Shaded forest floor & tree root trails",
        description: "Ascend through dense tropical evergreen forest. Shaded canopy, bamboo clusters, mossy tree trunks, and bird calls line the trail. Watch for elephant tracks."
    },
    {
        step: 3,
        title: "Emerging onto Shola Grassland Ridge",
        duration: "45 mins",
        terrain: "Open mountain grasslands & wind ridge",
        description: "The thick tree canopy opens up onto sweeping montane grasslands. Breezy uphill trail with expansive valley views looking back toward Nagarahole forests."
    },
    {
        step: 4,
        title: "Final Peak Scramble to Brahmagiri Summit",
        duration: "30–45 mins",
        terrain: "Grassy peak slope & summit marker",
        description: "The final climb follows a grassy ridge to the 1,608m summit marker. Enjoy 360-degree panorama of Karnataka-Kerala Western Ghats before descending back with your guide."
    }
];

const BRAHMAGIRI_CHECKLIST = [
    { id: "shoes", text: "High-traction trekking shoes (anti-slip rubber soles for wet forest soil)", category: "Footwear" },
    { id: "permit", text: "Physical ID proof & Forest Department entry fee cash (mandatory for permits)", category: "Essentials" },
    { id: "water", text: "3 Liters of drinking water (no plastic littering allowed inside sanctuary)", category: "Hydration" },
    { id: "leeches", text: "Leech socks or salt / eucalyptus oil (for monsoon & post-monsoon treks)", category: "Protection" },
    { id: "jacket", text: "Light windcheater or jacket (breezy and cool temperatures at summit)", category: "Clothing" },
    { id: "snack", text: "Energy snacks (dry fruits, nuts, energy bars — pack out all trash)", category: "Nutrition" }
];

const BRAHMAGIRI_GALLERY = [
    {
        id: "gallery-brahmagiri-hero",
        title: "Brahmagiri 1,608m Summit",
        emoji: "⛰️",
        caption: "The lush green summit ridge of Brahmagiri overlooking Western Ghats valleys."
    },
    {
        id: "gallery-iruppu",
        title: "Iruppu Waterfalls",
        emoji: "🌊",
        caption: "The sacred 60-meter cascade of Iruppu Falls near the trek starting point."
    },
    {
        id: "gallery-shola",
        title: "Shola Forest Canopy",
        emoji: "🌿",
        caption: "Dense high-altitude Shola forest patch nestled between mountain grasslands."
    },
    {
        id: "gallery-wildlife",
        title: "Wild Elephants & Fauna",
        emoji: "🐘",
        caption: "Asian elephants roaming the protected Brahmagiri Wildlife Sanctuary forests."
    },
    {
        id: "gallery-pakshipathalam",
        title: "Pakshipathalam Caves",
        emoji: "🦇",
        caption: "The mysterious subterranean boulder cave complex on the Kerala side of the range."
    },
    {
        id: "gallery-thirunelli",
        title: "Thirunelli Temple Foothills",
        emoji: "🛕",
        caption: "Ancient granite temple nestled in the southern foothills of Wayanad."
    }
];
