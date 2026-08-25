/**
 * kalsubai-data.js
 * Comprehensive dataset for Kalsubai Trek profile (Highest Peak of Maharashtra)
 */

const KALSUBAI_TREK_STATS = {
    name: "Kalsubai Trek",
    altName: "Kalsubai Peak Summit (1,646m)",
    elevationMeters: 1646,
    elevationFeet: 5400,
    location: "Bhandardara, Ahmednagar District, Maharashtra",
    range: "Kalsubai Harishchandragad Wildlife Sanctuary, Sahyadri Range (Western Ghats)",
    baseVillage: "Bari Village (Trek start base)",
    distanceFromMumbai: "150 km via NH160",
    difficulty: "Moderate",
    ascentTimeHrs: "3 to 4 hours (Bari Village to Kalsubai Summit)",
    descentTimeHrs: "2.5 hours (Kalsubai Summit to Bari Village)",
    trekDistanceKm: "13 km (Total round-trip traverse)",
    bestSeasons: "June to August (Monsoon greenery & waterfalls) & September to November",
    sanctuaryPermit: "Forest Entry fee collected by local village committee checkpost"
};

const KALSUBAI_TREK_TIMELINE = [
    {
        year: "Historical Era",
        title: "Kalsubai Legend",
        badge: "Sacred Devotion",
        description: "Local legends tell of a housemaid named Kalsubai who fled to the summit to escape societal pressure and disappeared. The Kalsubai temple was built on the highest rock to honor her spirit."
    },
    {
        year: "1940s CE",
        title: "Bhandardara Reservoir Development",
        badge: "Arthur Lake Vistas",
        description: "The construction of Wilson Dam and Bhandardara reservoir transformed the surrounding region, creating panoramic lake and mountain vistas visible from the peak."
    },
    {
        year: "1990s CE",
        title: "Sahyadri Ladder Installations",
        badge: "Safety Reinforcements",
        description: "To assist trekkers in navigating the vertical, sheer basalt rock cliffs near the summit, the local administration and trekking clubs installed heavy steel ladders."
    },
    {
        year: "Present Day",
        title: "Western Ghats Eco-Tourism",
        badge: "Highest Peak Challenge",
        description: "Kalsubai remains the most visited monsoon trek in Maharashtra. Local committees regulate waste disposal and tourism to conserve the sanctuary's rich biodiversity."
    }
];

const KALSUBAI_TREK_HIGHLIGHTS = [
    {
        id: "kalsubai-temple",
        title: "Kalsubai Temple Summit",
        subtitle: "Highest Point of Sahyadris",
        icon: "🛕",
        tag: "Summit View",
        description: "A small, revered temple dedicated to the deity Kalsubai at 1,646m, offering a spectacular 360-degree view of Bhandardara Arthur Lake and neighboring forts."
    },
    {
        id: "steel-ladders",
        title: "Vertical Steel Ladders",
        subtitle: "Thrilling Cliffside Steps",
        icon: "🪜",
        tag: "Heritage Landmark",
        description: "Four sets of sturdy steel ladders fixed onto vertical rock steps, providing a safe but adrenaline-pumping climb to the summit."
    },
    {
        id: "arthur-lake",
        title: "Arthur Lake Views",
        subtitle: "Bhandardara Dam Vistas",
        icon: "🌊",
        tag: "Hydrology",
        description: "Panoramic bird's-eye views of the sparkling Arthur Lake reservoir nestled among the towering Western Ghats."
    },
    {
        id: "monsoon-cascades",
        title: "Monsoon Waterfalls",
        subtitle: "Seasonal Sahyadri Cascades",
        icon: "🌧️",
        tag: "Fauna & Wildlife",
        description: "Dozens of temporary waterfalls and mist-veiled streams lining the trail during the monsoon months."
    },
    {
        id: "bari-hamlet",
        title: "Bari Village Farmfields",
        subtitle: "Agricultural Start Trail",
        icon: "🏠",
        tag: "Base camp",
        description: "The scenic initial walk passing through paddy fields, local mud homes, and streams of Bari village."
    },
    {
        id: "ratangad-outlook",
        title: "Ratangad & Alang Peak Views",
        subtitle: "Sahyadri Mountain Forts",
        icon: "🏔️",
        tag: "Fauna & Wildlife",
        description: "Views of ancient mountain forts like Ratangad, Harishchandragad, and the formidable Alang-Madan-Kulang (AMK) ridge line."
    }
];

const KALSUBAI_TREK_STEPS = [
    {
        step: 1,
        title: "Bari Village to Temple Base",
        duration: "1 hour",
        terrain: "Flat paddy fields, gradual trail entrance",
        description: "Walk through the flat paddy fields of Bari village. Start ascending gradually past small local stalls, entering the deciduous forest cover."
    },
    {
        step: 2,
        title: "Temple Base to First Ladder",
        duration: "1 hour",
        terrain: "Steep rocky dirt trails under forest cover",
        description: "Climb steeper rocky trails under green tree canopies. Cross small seasonal streams and reach the first basalt rock ladder."
    },
    {
        step: 3,
        title: "Ladder Sections to Summit Ridge",
        duration: "1 hour",
        terrain: "Vertical steel ladders on sheer basalt cliffs",
        description: "Negotiate the four steep steel ladder sections fixed to vertical cliffs, offering spectacular views of the Bhandardara valley below."
    },
    {
        step: 4,
        title: "Final Ascent to Kalsubai Temple",
        duration: "30 minutes",
        terrain: "Wind-swept rocky ridge and stone steps",
        description: "Cross the wind-swept summit ridge, climbing the final stone steps to reach the Kalsubai Temple at 1,646m."
    }
];

const KALSUBAI_TREK_CHECKLIST = [
    { id: "shoes", text: "High-grip trekking shoes (compulsory for wet, slippery basalt rocks and muddy forest slopes)", category: "Footwear" },
    { id: "raincoat", text: "Full rain gear / poncho (Sahyadri monsoons are extremely heavy and wind-swept)", category: "Clothing" },
    { id: "drybag", text: "Extra set of dry clothes & waterproof dry bag (keeps personal items dry inside rucksack)", category: "Protection" },
    { id: "water", text: "Sturdy water bottle & energy snacks (stiff climb requires constant hydration and quick energy)", category: "Essentials" },
    { id: "windcheater", text: "Light windcheater jacket (summit winds are very strong and chilly even during monsoons)", category: "Clothing" },
    { id: "cash", text: "Cash for local parking & snacks (network is poor at Bari village; digital payments may fail)", category: "Essentials" }
];

const KALSUBAI_TREK_GALLERY = [
    {
        id: "gallery-temple",
        title: "Kalsubai Summit Temple",
        emoji: "🛕",
        caption: "The small Kalsubai Temple marking the absolute highest point of Maharashtra state."
    },
    {
        id: "gallery-ladders",
        title: "Steel Ladders on Basalt Cliff",
        emoji: "🪜",
        caption: "One of the steel ladder sections built to negotiate vertical Sahyadri rock faces."
    },
    {
        id: "gallery-arthurlake",
        title: "Arthur Lake Outlook",
        emoji: "🌊",
        caption: "Spectacular view of Bhandardara Arthur Lake reservoir from the summit ridge."
    },
    {
        id: "gallery-monsoon",
        title: "Misty Monsoon Sahyadris",
        emoji: "🌧️",
        caption: "Swirling clouds and lush green valleys characteristic of the monsoon trekking season."
    },
    {
        id: "gallery-bari",
        title: "Paddy Fields of Bari Village",
        emoji: "🏠",
        caption: "The picturesque Bari village serving as the starting base of the Kalsubai trek."
    },
    {
        id: "gallery-amk",
        title: "Alang-Madan-Kulang Fort Views",
        emoji: "🏔️",
        caption: "Stunning look at the nearby AMK ridge line, famous for its technical climbs."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KALSUBAI_TREK_STATS, KALSUBAI_TREK_TIMELINE, KALSUBAI_TREK_HIGHLIGHTS, KALSUBAI_TREK_STEPS, KALSUBAI_TREK_CHECKLIST, KALSUBAI_TREK_GALLERY };
}
