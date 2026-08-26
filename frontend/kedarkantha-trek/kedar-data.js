/**
 * kedar-data.js
 * Comprehensive dataset for Kedarkantha Trek profile (Govind Sanctuary, Uttarakhand)
 */

const KEDAR_TREK_STATS = {
    name: "Kedarkantha Peak Trek",
    altName: "Kedarkantha Summit (3,800m)",
    elevationMeters: 3800,
    elevationFeet: 12467,
    location: "Govind Wildlife Sanctuary, Uttarkashi District, Uttarakhand",
    range: "Garhwal Himalaya Range, Western Himalayas",
    baseVillage: "Sankri (Base checkpost village)",
    distanceFromDehradun: "200 km to Sankri base village",
    difficulty: "Easy to Moderate",
    ascentTimeHrs: "3 to 4 hours (Base Camp to Peak Summit)",
    descentTimeHrs: "3 hours (Peak Summit back to Sankri via Hargaon)",
    trekDistanceKm: "20 km (Total round-trip route from Sankri base)",
    bestSeasons: "December to April (Winter Snow Bloom & Spring)",
    sanctuaryPermit: "Mandatory Govind Wildlife Sanctuary Entry Permit (Sankri Checkpost)"
};

const KEDAR_TREK_TIMELINE = [
    {
        year: "Ancient Era",
        title: "Lord Shiva Mythology",
        badge: "Sacred Legend",
        description: "According to local folklore, Lord Shiva sat on the summit of Kedarkantha to meditate. Hearing a bull's sound (symbol of a demon), he fled to Kedarnath, leaving his neck (Kanth) mark behind. The temple at the summit is dedicated to him."
    },
    {
        year: "1955 CE",
        title: "Notification of Govind Sanctuary",
        badge: "Conservation Bounds",
        description: "The Govind Wildlife Sanctuary was established, protecting 958 square kilometers of pristine deodar and pine forests, sheltering the snow leopards and red pandas around Kedarkantha."
    },
    {
        year: "1990s CE",
        title: "Sankri Gateway Infrastructure",
        badge: "Village Eco-Tourism",
        description: "Sankri village was established as the primary mountaineering and trekking gateway, initiating controlled eco-treks to Har ki Dun and Kedarkantha Peak."
    },
    {
        year: "2010s CE",
        title: "Winter Snow Trekking Boom",
        badge: "Popular Winter Peak",
        description: "Kedarkantha gained national prominence as India's finest winter snow trek, famous for its beginner-friendly climbing slopes and high success rate."
    }
];

const KEDAR_TREK_HIGHLIGHTS = [
    {
        id: "kedar-summit",
        title: "Kedarkantha 3,800m Summit",
        subtitle: "360-Degree Himalayan Panorama",
        icon: "⛰️",
        tag: "Summit View",
        description: "The apex summit marker adorned with a small stone shrine to Lord Shiva, offering spectacular views of Swargarohini, Bandarpoonch, and Black Peak."
    },
    {
        id: "juda-talab",
        title: "Juda Ka Talab Lake",
        subtitle: "Frozen High-Altitude Tarn",
        icon: "🌊",
        tag: "Botanical Wonders",
        description: "A legendary lake at 2,773m nestled inside pine woods. In peak winter, the lake freezes completely, surrounded by snow-covered spruce trees."
    },
    {
        id: "kedar-base-camp",
        title: "Kedarkantha Base Camp",
        subtitle: "Amphitheater Ridge Site",
        icon: "⛺",
        tag: "Base camp",
        description: "The high-altitude camp at 3,429m positioned on an open snow ridge, presenting breathtaking night skies and views of the peak looming above."
    },
    {
        id: "hargaon-meadows",
        title: "Hargaon Alpine Meadows",
        subtitle: "Scenic Pine Wood Clearings",
        icon: "🌿",
        tag: "Botanical Wonders",
        description: "A gorgeous montane clearing at 2,900m used on the descent trail, covered in lush green grass in summer and deep snow blankets in winter."
    },
    {
        id: "govind-forest",
        title: "Govind Wildlife Sanctuary Woods",
        subtitle: "Deodar & Rhododendron Canopy",
        icon: "🌲",
        tag: "Fauna & Wildlife",
        description: "Initial trekking trails passing through dense forests of oak, towering blue pine, maple, and blooming scarlet rhododendrons."
    },
    {
        id: "sankri-village",
        title: "Sankri Base Gateway",
        subtitle: "Traditional Garhwal Culture",
        icon: "🏠",
        tag: "Heritage Landmark",
        description: "The charming wooden-cottage village serving as the starting point, showcasing the unique architecture and culture of the Tons Valley."
    }
];

const KEDAR_TREK_STEPS = [
    {
        step: 1,
        title: "Sankri to Juda Ka Talab",
        duration: "3 to 4 hours",
        terrain: "Pine-shaded dirt trails & gradual climb",
        description: "Hike up a steep forest trail under massive pine and oak canopies, climbing from 1,950m to the pristine lakeside clearing of Juda Ka Talab."
    },
    {
        step: 2,
        title: "Juda Ka Talab to Kedarkantha Base Camp",
        duration: "2 to 3 hours",
        terrain: "Open snow-glades & steep ridge trails",
        description: "Ascend further through snow-draped pine glades and open alpine ridges to reach the wind-swept Kedarkantha Base Camp at 3,429m."
    },
    {
        step: 3,
        title: "Base Camp to Kedarkantha Summit",
        duration: "3 to 4 hours",
        terrain: "Steep snow slopes & final ridge walk",
        description: "Start the final push at 3:00 AM in freezing temperatures. Scramble up the steep snow slopes and final ridge to catch the sunrise at the 3,800m peak."
    },
    {
        step: 4,
        title: "Summit to Hargaon Meadow & Sankri",
        duration: "4 to 5 hours",
        terrain: "Long downhill descent along pine ridges",
        description: "Descend along the Hargaon trail, checking out wide pine meadows before hiking back down into the wooden hamlet of Sankri."
    }
];

const KEDAR_TREK_CHECKLIST = [
    { id: "boots", text: "High-traction waterproof boots (anti-slip rubber sole with deep tread suitable for snow)", category: "Footwear" },
    { id: "spikes", text: "Snow spikes / microspikes & gaiters (essential for winter walks to prevent slipping and snow entering boots)", category: "Gear" },
    { id: "jacket", text: "Heavy down feather jacket & windproof outer shell (vital for summit freezing winds)", category: "Clothing" },
    { id: "thermals", text: "Three-layer thermal innerwear sets (essential for night temperatures dropping below zero)", category: "Clothing" },
    { id: "stick", text: "High-strength telescopic walking pole (helps maintain balance on slippery snow trails)", category: "Gear" },
    { id: "gloves", text: "Fleece gloves & woollen balaclava cap (protects extremities from frostbite)", category: "Protection" }
];

const KEDAR_TREK_GALLERY = [
    {
        id: "gallery-peak",
        title: "Kedarkantha 3,800m Peak",
        emoji: "⛰️",
        caption: "The snow-capped summit ridge offering a breathtaking 360-degree panorama of Garhwal peaks."
    },
    {
        id: "gallery-lake",
        title: "Juda Ka Talab Frozen Tarn",
        emoji: "🌊",
        caption: "The legendary lake nestled inside coniferous pine woods, frozen solid in peak winter."
    },
    {
        id: "gallery-camp",
        title: "Kedarkantha Base Camp",
        emoji: "⛺",
        caption: "High camp positioned on an open snow ridge, presenting scenic views of the summit above."
    },
    {
        id: "gallery-pines",
        title: "Snow-covered Pine Woods",
        emoji: "🌲",
        caption: "Coniferous forests draped in winter snow, creating a winter wonderland scenery."
    },
    {
        id: "gallery-view",
        title: "Swargarohini Range Views",
        emoji: "🏔️",
        caption: "The spectacular multi-peaked Swargarohini massif visible clearly from the summit slopes."
    },
    {
        id: "gallery-sankri",
        title: "Traditional Sankri Gateway",
        emoji: "🏠",
        caption: "The charming wooden-cottage hamlet of Sankri, serving as the trek base village."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KEDAR_TREK_STATS, KEDAR_TREK_TIMELINE, KEDAR_TREK_HIGHLIGHTS, KEDAR_TREK_STEPS, KEDAR_TREK_CHECKLIST, KEDAR_TREK_GALLERY };
}
