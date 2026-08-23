/**
 * valley-data.js
 * Comprehensive dataset for Valley of Flowers Trek profile (Chamoli, Uttarakhand)
 */

const VALLEY_TREK_STATS = {
    name: "Valley of Flowers Peak & Meadow Trek",
    altName: "Valley of Flowers National Park (UNESCO)",
    elevationMeters: 3650,
    elevationFeet: 11975,
    location: "Chamoli District, Garhwal Himalayas, Uttarakhand",
    range: "Zanskar/Garhwal Himalaya Range (UNESCO World Heritage)",
    baseVillage: "Govindghat / Pulna (Base checkposts)",
    distanceFromJoshimath: "22 km to Govindghat, then 14 km trek to Ghangaria",
    difficulty: "Moderate",
    ascentTimeHrs: "3 to 4 hours (Ghangaria to Valley center)",
    descentTimeHrs: "2 to 3 hours (Valley center back to Ghangaria)",
    trekDistanceKm: "14 km (Govindghat to Ghangaria) + 4 km (Ghangaria to Valley Gate)",
    bestSeasons: "July to September (Peak Monsoon Bloom)",
    sanctuaryPermit: "Mandatory Forest Department Checkpost Permit (Joshimath/Ghangaria)"
};

const VALLEY_TREK_TIMELINE = [
    {
        year: "1931 CE",
        title: "Frank Smythe's Discovery",
        badge: "Discovery",
        description: "British mountaineers Frank Smythe, Eric Shipton, and R.L. Holdsworth accidentally stumbled upon the valley while returning from their successful expedition of Mt. Kamet, naming it the 'Valley of Flowers'."
    },
    {
        year: "1939 CE",
        title: "Joan Margaret Legge's Cataloging",
        badge: "Scientific Expedition",
        description: "The Royal Botanic Gardens, Kew, deputed botanist Joan Margaret Legge to study the flora. Tragically, she slipped on rocky scree and died. Her sister later erected a memorial grave in the valley."
    },
    {
        year: "1982 CE",
        title: "Declaration of National Park",
        badge: "Conservation",
        description: "The region was officially declared a National Park. To preserve the delicate alpine turf, local cattle grazing was banned, allowing the native wildflowers to fully regenerate."
    },
    {
        year: "2005 CE",
        title: "UNESCO World Heritage Site",
        badge: "UNESCO",
        description: "The Valley of Flowers National Park was inscribed as a UNESCO World Heritage Site, extending the existing Nanda Devi National Park site to form the Nanda Devi and Valley of Flowers Biosphere Reserve."
    },
    {
        year: "Present Day",
        title: "Strict Eco-Tourism Regulations",
        badge: "Protection",
        description: "The Uttarakhand Forest Department strictly manages entry. Overnight stay inside the core valley is banned; all trekkers must return to Ghangaria base camp before nightfall."
    }
];

const VALLEY_TREK_HIGHLIGHTS = [
    {
        id: "valley-bloom",
        title: "Endemic Alpine Wildflowers",
        subtitle: "Monsoon Carpet of 500+ Species",
        icon: "🌸",
        tag: "Botanical Wonders",
        description: "During July and August, the valley floor transforms into a spectacular natural carpet of alpine flowers. Rare blooms include the Himalayan Blue Poppy, Cobra Lily, and Brahma Kamal."
    },
    {
        id: "pushpawati-river",
        title: "Pushpawati River Basin",
        subtitle: "Glacier-fed Mountain Stream",
        icon: "🌊",
        tag: "Hydrology",
        description: "Fed by meltwater streams and the Tipra Glacier, the Pushpawati River flows right through the center of the valley, cutting through rocky gorges and nourishing the alpine meadows."
    },
    {
        id: "legge-memorial",
        title: "Joan Margaret Legge Memorial",
        subtitle: "Botanist's Historical Grave Marker",
        icon: "🪦",
        tag: "Heritage Landmark",
        description: "A simple stone memorial grave dedicated to Kew Gardens botanist Joan Margaret Legge, inscribed with the verse: 'I will lift up mine eyes unto the hills from whence cometh my help.'"
    },
    {
        id: "ghangaria-base",
        title: "Ghangaria Gateway Settlement",
        subtitle: "Picturesque Trekker Base Camp (3,048 m)",
        icon: "⛺",
        tag: "Base camp",
        description: "The last inhabited hamlet on the trail. Nestled at the confluence of Pushpawati and Hemganga rivers, it serves as the mandatory overnight resting point before entering the valley."
    },
    {
        id: "hemkund-sahib",
        title: "Sacred Hemkund Sahib Lake",
        subtitle: "Himalayan Pilgrimage at 4,329 m",
        icon: "🛕",
        tag: "Nearby Shrine",
        description: "Located along a split trail from Ghangaria, this high-altitude Sikh Gurudwara sits beside a crystal-clear glacial lake surrounded by seven snow-capped mountain peaks."
    },
    {
        id: "alpine-wildlife",
        title: "Protected Subalpine Fauna",
        subtitle: "Snow Leopard & Musk Deer Range",
        icon: "🐆",
        tag: "Fauna & Wildlife",
        description: "Part of the Nanda Devi Biosphere, the area shelters highly endangered fauna like the Snow Leopard, Himalayan Musk Deer, Red Panda, Asiatic Black Bear, and Himalayan Monal pheasant."
    }
];

const VALLEY_TREK_STEPS = [
    {
        step: 1,
        title: "Govindghat to Ghangaria base camp",
        duration: "5 to 6 hours",
        terrain: "Gradual uphill, rocky trails along Laxman Ganga",
        description: "Start at Govindghat checkpost (accessible via road from Joshimath). Ascend 14 km (a shared taxi goes up to Pulna village to skip initial 4 km) following the roaring Laxman Ganga river up to Ghangaria village."
    },
    {
        step: 2,
        title: "Ghangaria to Valley Entry Gate Checkpoint",
        duration: "30 mins",
        terrain: "Forest trail & iron suspension bridge",
        description: "Obtain early morning entry permits at the Ghangaria Forest Checkpost. Cross the iron bridge over the Pushpawati River and proceed along a pine-shaded mountain slope."
    },
    {
        step: 3,
        title: "Pushpawati Gorge to Alpine Meadows",
        duration: "1.5 to 2 hours",
        terrain: "Steep rocky trail & high-altitude moraine",
        description: "Trek up a steep, narrow gorge alongside the cascading Pushpawati River. As the tree line recedes, the trail opens up into the wide, flat, flower-strewn alpine valley floor at 3,500m."
    },
    {
        step: 4,
        title: "Valley Meadow Exploration to Legge Memorial",
        duration: "2 hours",
        terrain: "Flat grassy tracks & river beds",
        description: "Walk deep into the valley meadows along the main trail. Discover dense beds of Blue Poppies and Brahma Kamals. Visit the Joan Margaret Legge grave before making the mandatory return journey to Ghangaria before 5:00 PM."
    }
];

const VALLEY_TREK_CHECKLIST = [
    { id: "boots", text: "Water-resistant trekking boots (high-grip anti-slip rubber soles for muddy monsoon trails)", category: "Footwear" },
    { id: "poncho", text: "Heavy-duty rain poncho or waterproof jacket (essential for the peak monsoon blooming months)", category: "Clothing" },
    { id: "pack", text: "Waterproof backpack cover & ziplock bags (to protect phones, cameras, and permits from constant drizzle)", category: "Gear" },
    { id: "permit", text: "Physical photo ID & permit fee cash (required at Ghangaria Forest Checkpost)", category: "Essentials" },
    { id: "stick", text: "Telescopic trekking pole (aids balance on slippery rock paths and steep climbs)", category: "Gear" },
    { id: "insect", text: "Leech protection socks or insect repellent spray (monsoon trails are prone to leeches and bugs)", category: "Protection" }
];

const VALLEY_TREK_GALLERY = [
    {
        id: "gallery-meadows",
        title: "Himalayan Alpine Meadows",
        emoji: "🌸",
        caption: "Spectacular sweeps of seasonal alpine flowers covering the valley floor in the Chamoli region."
    },
    {
        id: "gallery-blue-poppy",
        title: "Himalayan Blue Poppy",
        emoji: "🌺",
        caption: "The iconic sky-blue Meconopsis flower blooming on high-altitude rocky scree slopes."
    },
    {
        id: "gallery-brahma-kamal",
        title: "Sacred Brahma Kamal",
        emoji: "🪷",
        caption: " Uttarakhand's state flower Saussurea obvallata, nested among high mountain ridges."
    },
    {
        id: "gallery-river",
        title: "Pushpawati River Stream",
        emoji: "🌊",
        caption: "The glacier-fed Pushpawati river meandering through the center of the alpine meadows."
    },
    {
        id: "gallery-memorial",
        title: "Joan Legge Memorial Grave",
        emoji: "🪦",
        caption: "The historic stone grave of botanist Joan Margaret Legge, who died here in 1939."
    },
    {
        id: "gallery-hemkund",
        title: "Foothill Base of Ghangaria",
        emoji: "⛺",
        caption: "The coniferous pine forests surrounding Ghangaria, the base camp gateway village."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VALLEY_TREK_STATS, VALLEY_TREK_TIMELINE, VALLEY_TREK_HIGHLIGHTS, VALLEY_TREK_STEPS, VALLEY_TREK_CHECKLIST, VALLEY_TREK_GALLERY };
}
