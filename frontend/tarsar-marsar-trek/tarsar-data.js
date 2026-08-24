/**
 * tarsar-data.js
 * Comprehensive dataset for Tarsar Marsar Trek profile (Aru Valley, Jammu & Kashmir)
 */

const TARSAR_TREK_STATS = {
    name: "Tarsar Marsar Trek",
    altName: "Tarsar & Marsar Twin Alpine Lakes",
    elevationMeters: 4100,
    elevationFeet: 13451,
    location: "Aru Valley, Pahalgam, Anantnag District, Jammu & Kashmir",
    range: "Kolahoi Range, Western Himalayas",
    baseVillage: "Aru Valley (Base checkpost village)",
    distanceFromPahalgam: "12 km to Aru base village",
    difficulty: "Moderate",
    ascentTimeHrs: "5 to 6 hours (Lidderwat to Tarsar Lake)",
    descentTimeHrs: "4 hours (Sundersar back to Lidderwat)",
    trekDistanceKm: "48 km (Total round-trip route from Aru base)",
    bestSeasons: "July to September (Himalayan Summer & Meadows Bloom)",
    sanctuaryPermit: "Mandatory Aru Wildlife Sanctuary Entry Registration"
};

const TARSAR_TREK_TIMELINE = [
    {
        year: "Ancient Era",
        title: "Kashmiri Nomad Trails",
        badge: "Heritage Trails",
        description: "For centuries, local Gujjar and Bakarwal nomadic shepherds have used the high passes and meadows surrounding Tarsar and Marsar lakes to graze their livestock during the peak summer months."
    },
    {
        year: "1910s CE",
        title: "Early Botanical Explorations",
        badge: "Flora Mapping",
        description: "British botanists and geographers mapped the Lidder valley, documenting the unique subalpine flora, gentians, and primulas growing around the twin glacial lakes."
    },
    {
        year: "1970s CE",
        title: "Mountaineering Pioneers",
        badge: "Pahalgam Climbing Hub",
        description: "The establishment of trekking routes by early Indian alpine groups made Pahalgam a premier hiking hub, introducing the Tarsar Marsar route as a classic Kashmir lake traverse."
    },
    {
        year: "Present Day",
        title: "Eco-Tourism & Conservation",
        badge: "Lidder Watershed Protection",
        description: "The J&K Tourism and Forest Departments manage the trail under strict environmental regulations to protect the delicate Lidder river watershed and alpine lake ecosystem."
    }
];

const TARSAR_TREK_HIGHLIGHTS = [
    {
        id: "tarsar-lake",
        title: "Tarsar Glacial Lake",
        subtitle: "Almond-shaped Turquoise Tarn",
        icon: "🌊",
        tag: "Botanical Wonders",
        description: "A spectacular almond-shaped glacial lake at 3,790m, famous for its changing colors and the rare privilege of camping directly on its grassy shores."
    },
    {
        id: "marsar-lake",
        title: "Marsar Glacial Lake",
        subtitle: "Mist-Shrouded Hidden Tarn",
        icon: "🌫️",
        tag: "Botanical Wonders",
        description: "Located just across the ridge from Tarsar, this elusive lake at 3,800m is often hidden in swirling clouds, feeding the Dagwan River."
    },
    {
        id: "sundersar-lake",
        title: "Sundersar Glacial Lake",
        subtitle: "High-Altitude Meadow Tarn",
        icon: "🪷",
        tag: "Botanical Wonders",
        description: "A smaller but exceptionally beautiful lake at 3,800m nestled below towering ridges, covered in wildflower fields in summer."
    },
    {
        id: "lidderwat-meadow",
        title: "Lidderwat Grasslands",
        subtitle: "Coniferous Valley Clearing",
        icon: "🌲",
        tag: "Base camp",
        description: "A breathtaking clearing at 2,780m at the confluence of the Lidder streams, surrounded by dense pine forests and rolling green turf."
    },
    {
        id: "shekwas-pastures",
        title: "Shekwas Grasslands",
        subtitle: "Nomad Grazing Pastures",
        icon: "🌿",
        tag: "Base camp",
        description: "Wide alpine pastures at 3,360m populated by nomadic Gujjar mud-huts, offering panoramic views of the surrounding peaks."
    },
    {
        id: "aru-valley",
        title: "Aru Valley Base",
        subtitle: "Scenic Gateway of Pahalgam",
        icon: "🏠",
        tag: "Heritage Landmark",
        description: "The picturesque start village of Aru, famous for its lush meadows, wooden architecture, and peaceful Lidder river trails."
    }
];

const TARSAR_TREK_STEPS = [
    {
        step: 1,
        title: "Aru Valley to Lidderwat",
        duration: "6 hours",
        terrain: "Pine-shaded dirt trails, gradual climb along Lidder river",
        description: "Start from Aru village. Hike along the roaring Lidder River, passing through dense pine forests and wide clearings up to the grassy meadows of Lidderwat."
    },
    {
        step: 2,
        title: "Lidderwat to Shekwas",
        duration: "4 to 5 hours",
        terrain: "Gradual uphill forest exit, open pastures",
        description: "Ascend gradually along the stream. The pine forests thin out, opening up to the wide nomadic pastures of Shekwas at 3,360m."
    },
    {
        step: 3,
        title: "Shekwas to Tarsar Lake",
        duration: "4 hours",
        terrain: "Steep rocky trail & high moraine slopes",
        description: "Hike up a steep, rocky ridge. The trail opens up to the magnificent almond-shaped Tarsar Lake at 3,790m. Pitch tents right by the turquoise shore."
    },
    {
        step: 4,
        title: "Tarsar to Sundersar & Marsar Ridge",
        duration: "6 to 7 hours",
        terrain: "High alpine pass & grassy ridges",
        description: "Cross the high Tarsar pass (4,000m) to reach Sundersar Lake. Climb the ridge to view the hidden, mist-shrouded Marsar Lake before descending back to Zachmarg."
    }
];

const TARSAR_TREK_CHECKLIST = [
    { id: "boots", text: "Water-resistant trekking boots (rubber sole with deep treads for slippery grassy meadows and moraine trails)", category: "Footwear" },
    { id: "poncho", text: "Rain poncho / waterproof jacket (highly unpredictable summer showers in Kashmir valleys)", category: "Clothing" },
    { id: "glasses", text: "UV-protection sunglasses (essential for the bright glacial glare around high lakes)", category: "Gear" },
    { id: "jacket", text: "Warm fleece layers & windproof jacket (night temperatures drop significantly near 3,800m)", category: "Clothing" },
    { id: "stick", text: "Telescopic trekking pole (aids balance on steep meadow slopes and stream crossings)", category: "Gear" },
    { id: "firstaid", text: "Personal first-aid & water purification tablets (ensures safe hydration from glacial streams)", category: "Protection" }
];

const TARSAR_TREK_GALLERY = [
    {
        id: "gallery-tarsar",
        title: "Turquoise Shore of Tarsar Lake",
        emoji: "🌊",
        caption: "The magnificent almond-shaped Tarsar Lake, surrounded by green subalpine pastures."
    },
    {
        id: "gallery-marsar",
        title: "Mist-shrouded Marsar Lake",
        emoji: "🌫️",
        caption: "The elusive Marsar Lake, frequently hidden in low-hanging mountain clouds."
    },
    {
        id: "gallery-sudersar",
        title: "Wildflowers of Sundersar",
        emoji: "🪷",
        caption: "High subalpine meadows surrounding Sundersar Lake, blooming with summer wildflowers."
    },
    {
        id: "gallery-lidderwat",
        title: "Pine Forests of Lidderwat",
        emoji: "🌲",
        caption: "Dense pine and fir forests lining the initial trekking route near the Lidder River."
    },
    {
        id: "gallery-shekwas",
        title: "Nomadic Pastures of Shekwas",
        emoji: "🌿",
        caption: "Rolling grasslands populated by nomadic Gujjar shepherds during the summer season."
    },
    {
        id: "gallery-aru",
        title: "Meadows of Aru Valley Base",
        emoji: "🏠",
        caption: "The beautiful start village of Aru, famous for its traditional wooden architecture."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TARSAR_TREK_STATS, TARSAR_TREK_TIMELINE, TARSAR_TREK_HIGHLIGHTS, TARSAR_TREK_STEPS, TARSAR_TREK_CHECKLIST, TARSAR_TREK_GALLERY };
}
