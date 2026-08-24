/**
 * beas-data.js
 * Comprehensive dataset for Beas Kund Trek profile (Solang Valley, Himachal Pradesh)
 */

const BEAS_TREK_STATS = {
    name: "Beas Kund Glacial Lake Trek",
    altName: "Vipasha Kund (Source of River Beas)",
    elevationMeters: 3700,
    elevationFeet: 12139,
    location: "Solang Valley, Manali, Kullu District, Himachal Pradesh",
    range: "Pir Panjal & Dhauladhar Ranges, Western Himalayas",
    baseVillage: "Dhundi / Solang Valley (Base checkposts)",
    distanceFromManali: "21 km to Dhundi base via Solang Valley",
    difficulty: "Moderate",
    ascentTimeHrs: "3 to 4 hours (Bakarthach camp to Beas Kund)",
    descentTimeHrs: "2 to 3 hours (Beas Kund back to Bakarthach)",
    trekDistanceKm: "8 km (Solang to Dhundi by road) + 7 km (Dhundi to Beas Kund one way)",
    bestSeasons: "May to October (except heavy monsoon in July/August)",
    sanctuaryPermit: "No special forest permit required for Indian nationals, but local checkpost entry fees apply"
};

const BEAS_TREK_TIMELINE = [
    {
        year: "Ancient Era",
        title: "Sage Vyasa Heritage",
        badge: "Sacred Mythology",
        description: "Beas Kund is named after Sage Vyasa (Veda Vyasa), the author of the Mahabharata. It is believed he bathed in this lake while performing penance. The river is named Beas (Vipasha) after him."
    },
    {
        year: "1850s CE",
        title: "British Exploration of Kullu",
        badge: "Geographical Survey",
        description: "Early European explorers mapped the Upper Kullu Valley, documenting Beas Kund as the primary hydrological source of the Beas River."
    },
    {
        year: "1961 CE",
        title: "Establishment of WHMI Manali",
        badge: "Climbing Hub",
        description: "The Western Himalayan Mountaineering Institute (now ABIMAS) was established in Manali, making the Solang Valley and Beas Kund meadows a premier training base for alpine climbing."
    },
    {
        year: "2000s CE",
        title: "Solang Valley Adventure Boom",
        badge: "Popular Eco-Tourism",
        description: "Solang Valley emerged as a major adventure sports destination, boosting popularity of the Beas Kund trail as a classic Himalayan weekend trek."
    }
];

const BEAS_TREK_HIGHLIGHTS = [
    {
        id: "beas-kund-lake",
        title: "Beas Kund Glacial Lake",
        subtitle: "Sacred Alpine Tarn",
        icon: "🌊",
        tag: "Botanical Wonders",
        description: "The pristine high-altitude glacial lake at 3,700m, considered the sacred source of the Beas River, surrounded by slate mountains and wild flowers."
    },
    {
        id: "bakarthach-meadow",
        title: "Bakarthach Meadows",
        subtitle: "Shepherds High Grassland",
        icon: "🌿",
        tag: "Base camp",
        description: "A spectacular subalpine meadow at 3,270m where local Gaddi shepherds graze their flocks, offering a stunning campsite flanked by mountains."
    },
    {
        id: "peaks-view",
        title: "Towering Alpine Peaks",
        subtitle: "Hanuman Tibba & Friendship Peak",
        icon: "⛰️",
        tag: "Summit View",
        description: "Spectacular panoramic views of towering peaks including Hanuman Tibba (5,982m), Friendship Peak (5,289m), Shitidhar, and Ladakhi Peak."
    },
    {
        id: "dhundi-forest",
        title: "Dhundi Coniferous Forest",
        subtitle: "Oak & Deodar Woodlands",
        icon: "🌲",
        tag: "Fauna & Wildlife",
        description: "The trail starts through dense oak, pine, and deodar woodlands in Solang Valley before crossing the tree line into glacial valleys."
    },
    {
        id: "solang-valley",
        title: "Solang Valley Base",
        subtitle: "Adventure Hub of Manali",
        icon: "⛺",
        tag: "Nearby Shrine",
        description: "The start point of the journey, famous for paragliding, zorbing, and scenic ski slopes."
    },
    {
        id: "solang-streams",
        title: "Glacial Streams & Waterfalls",
        subtitle: "Hydrological Feeder Gorges",
        icon: "💦",
        tag: "Hydrology",
        description: "Dozens of crystal-clear mountain streams and cascades tumbling down from hanging glaciers, feeding the nascent Beas River."
    }
];

const BEAS_TREK_STEPS = [
    {
        step: 1,
        title: "Solang Valley / Dhundi to Bakarthach",
        duration: "3 to 4 hours",
        terrain: "Gradual uphill, silver birch forests",
        description: "Start from Dhundi checkpost (following a drive from Solang Valley). Hike through silver birch and oak forests up to the grassy camping ground of Bakarthach."
    },
    {
        step: 2,
        title: "Bakarthach to Beas Kund Ascent",
        duration: "3 to 4 hours",
        terrain: "Steep rocky trail & high-altitude moraine",
        description: "Cross the Beas River stream over a temporary bridge or rocky crossing. Climb a steep, rocky ridge of glacial moraine to emerge at the Beas Kund lake basin."
    },
    {
        step: 3,
        title: "Exploration at Beas Kund Tarn",
        duration: "1 to 2 hours",
        terrain: "Flat grassy tracks & river beds",
        description: "Discover the sacred circle lake, capture views of Hanuman Tibba and Shitidhar peaks, and explore the alpine terminal moraine."
    },
    {
        step: 4,
        title: "Return Descent to Dhundi",
        duration: "3 hours",
        terrain: "Descent over moraine & meadows",
        description: "Retrace your path along the moraine ridge and Bakarthach meadows back to the Dhundi road head for transport back to Manali."
    }
];

const BEAS_TREK_CHECKLIST = [
    { id: "boots", text: "Sturdy trekking shoes (rubber sole with deep treads for rocky moraines)", category: "Footwear" },
    { id: "jacket", text: "Light fleece layers & windproof jacket (winds get very cold near the glacier lake)", category: "Clothing" },
    { id: "stick", text: "Telescopic walking stick (essential for crossing rocky glacial streams)", category: "Gear" },
    { id: "water", text: "2 Liters of reusable water bottle (help keep the alpine lake plastic-free)", category: "Hydration" },
    { id: "poncho", text: "Waterproof jacket or poncho (quick weather shifts in Upper Solang)", category: "Clothing" },
    { id: "insect", text: "Personal first-aid & sunscreen (high UV exposure at 3,700m)", category: "Protection" }
];

const BEAS_TREK_GALLERY = [
    {
        id: "gallery-lake",
        title: "Pristine Beas Kund Glacial Lake",
        emoji: "🌊",
        caption: "The high-altitude glacial lake at 3,700m, considered the sacred source of the Beas River."
    },
    {
        id: "gallery-bakarthach",
        title: "Lush Meadows of Bakarthach",
        emoji: "🌿",
        caption: "High subalpine pastures where Gaddi shepherds camp with their sheep during summer."
    },
    {
        id: "gallery-hanuman",
        title: "Hanuman Tibba Peak View",
        emoji: "⛰️",
        caption: "The soaring Hanuman Tibba (5,982m) peak overlooking the Beas Kund glacial basin."
    },
    {
        id: "gallery-conifers",
        title: "Deodar Woods in Solang",
        emoji: "🌲",
        caption: "Lush coniferous forests flanking the initial trekking route near Solang Valley."
    },
    {
        id: "gallery-stream",
        title: "Glacial River Crossing",
        emoji: "💦",
        caption: "Tributary streams flowing from Shitidhar glaciers into the main Beas riverbed."
    },
    {
        id: "gallery-friendship",
        title: "Friendship Peak Summit Glare",
        emoji: "❄️",
        caption: "A popular climbing peak standing at 5,289m, visible from the Beas Kund meadows."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BEAS_TREK_STATS, BEAS_TREK_TIMELINE, BEAS_TREK_HIGHLIGHTS, BEAS_TREK_STEPS, BEAS_TREK_CHECKLIST, BEAS_TREK_GALLERY };
}
