/**
 * hampta-data.js
 * Data model for Hampta Pass Trek — Himachal Pradesh.
 *
 * Image sources:
 * - Wikimedia Commons, "Hampta pass.jpg" — Kunalsvnit, CC BY-SA 4.0
 * - Wikimedia Commons, "Way to hampta pass.jpg" — Kunalsvnit, CC BY-SA 4.0
 * - Wikimedia Commons, "Hampta Pass Himachal Pradesh India.jpg" — Raja Selvaraj, CC BY 2.0
 * Source pages are linked from the gallery captions in index.html.
 */

const HAMPTA_TREK_STATS = {
    name: 'Hampta Pass Trek',
    altName: 'Kullu Valley to Lahaul Crossover',
    elevationMeters: 4270,
    elevationFeet: 14010,
    location: 'Kullu Valley to Lahaul Valley, Himachal Pradesh',
    range: 'Pir Panjal Range, Western Himalayas',
    baseCamp: 'Manali',
    startingPoint: 'Jobra, reached by road from Manali',
    trekDistanceKm: 'About 24 km (standard 5-day itinerary)',
    duration: '5 days / 4 nights',
    difficulty: 'Moderate',
    bestSeasons: 'June to September',
    passAltitude: '4,270 m / about 14,010 ft'
};

const HAMPTA_TREK_ROUTE = [
    {
        day: 1,
        title: 'Manali → Jobra → Chika',
        altitude: 'Jobra ~2,800 m → Chika ~3,100 m',
        distance: 'About 2 km trekking after the drive',
        terrain: 'Forest, meadow and stream-side trail',
        description:
            'Drive from Manali to Jobra, then walk through pine and mixed mountain forest toward the Chika meadow beside Rani Nallah.'
    },
    {
        day: 2,
        title: 'Chika → Balu Ka Ghera',
        altitude: 'About 3,100 m → 3,600 m',
        distance: 'About 7–8 km',
        terrain: 'Meadows, boulder sections and river crossings',
        description:
            'Follow the Hampta/Rani Nallah corridor through alpine meadows, with changing views of the surrounding ridges and waterfalls.'
    },
    {
        day: 3,
        title: 'Balu Ka Ghera → Hampta Pass → Shea Goru',
        altitude: 'About 3,600 m → 4,270 m → 3,900 m',
        distance: 'About 9–10 km',
        terrain: 'Steep snow or moraine ascent and loose descent',
        description:
            'The key crossover day. Climb toward Hampta Pass, cross the high saddle, then descend into the drier Lahaul landscape toward Shea Goru.'
    },
    {
        day: 4,
        title: 'Shea Goru → Chatru',
        altitude: 'About 3,900 m → 3,300 m',
        distance: 'About 5–6 km',
        terrain: 'Dry valley, scree and riverbed',
        description:
            'Descend through the stark Lahaul side of the pass to Chatru, where the green Kullu landscapes give way to a high-altitude cold-desert setting.'
    },
    {
        day: 5,
        title: 'Chatru → Chandratal (weather permitting) → Manali',
        altitude: 'Chandratal ~4,300 m',
        distance: 'Road journey with optional lake excursion',
        terrain: 'Mountain road and high-altitude lake basin',
        description:
            'Use the road connection for the return journey. A Chandratal visit can be included when road and weather conditions allow.'
    }
];

const HAMPTA_TREK_HIGHLIGHTS = [
    {
        icon: '🏔️',
        tag: 'Crossover',
        title: 'Two Valleys, One Pass',
        subtitle: 'Kullu → Lahaul',
        description:
            'The route changes dramatically from green, stream-fed Kullu landscapes to the dry, rugged Lahaul side after crossing the pass.'
    },
    {
        icon: '❄️',
        tag: 'High Point',
        title: 'Hampta Pass',
        subtitle: 'About 4,270 m',
        description:
            'The high saddle is the defining point of the trek, with conditions that can include snowfields, loose moraine and steep terrain.'
    },
    {
        icon: '🌼',
        tag: 'Landscape',
        title: 'Alpine Meadows',
        subtitle: 'Chika & Balu Ka Ghera',
        description:
            'Lower camps combine open meadows, mountain streams and seasonal wildflowers before the trail becomes more austere.'
    },
    {
        icon: '🏜️',
        tag: 'Contrast',
        title: "Lahaul's Cold Desert",
        subtitle: 'Shea Goru & Chatru',
        description:
            'The descent opens into a dry, rocky landscape that looks strikingly different from the lush Kullu side.'
    },
    {
        icon: '💧',
        tag: 'Water',
        title: 'Rani Nallah',
        subtitle: 'River crossings',
        description:
            'Streams and snowmelt shape the route. Crossing conditions can change quickly with weather and season.'
    },
    {
        icon: '🌌',
        tag: 'Nearby',
        title: 'Chandratal Option',
        subtitle: 'High-altitude lake',
        description:
            'Many itineraries add a visit to Chandratal Lake when road access, weather and local conditions permit.'
    }
];

const HAMPTA_TREK_CHECKLIST = [
    { id: 'boots', text: 'Sturdy trekking shoes with reliable grip', category: 'Footwear' },
    { id: 'layers', text: 'Warm insulating layers and a waterproof shell', category: 'Clothing' },
    { id: 'rain', text: 'Rain protection for the Kullu-side monsoon conditions', category: 'Weather' },
    { id: 'water', text: 'Reusable water bottles or hydration system', category: 'Hydration' },
    { id: 'poles', text: 'Trekking poles for steep and loose sections', category: 'Gear' },
    { id: 'sun', text: 'Sunscreen, sunglasses and sun protection', category: 'Protection' },
    { id: 'firstaid', text: 'Personal first-aid kit and prescribed medicines', category: 'Safety' },
    { id: 'power', text: 'Power bank and headlamp', category: 'Essentials' }
];

const HAMPTA_TREK_GALLERY = [
    {
        id: 'pass',
        title: 'Hampta Pass',
        image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hampta%20pass.jpg',
        source: 'Wikimedia Commons — Kunalsvnit',
        license: 'CC BY-SA 4.0',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hampta_pass.jpg'
    },
    {
        id: 'way',
        title: 'Way to Hampta Pass',
        image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Way%20to%20hampta%20pass.jpg',
        source: 'Wikimedia Commons — Kunalsvnit',
        license: 'CC BY-SA 4.0',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Way_to_hampta_pass.jpg'
    },
    {
        id: 'himalayas',
        title: 'Hampta Pass, Himachal Pradesh',
        image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hampta%20Pass%20Himachal%20Pradesh%20India.jpg',
        source: 'Wikimedia Commons — Raja Selvaraj',
        license: 'CC BY 2.0',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hampta_Pass_Himachal_Pradesh_India.jpg'
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HAMPTA_TREK_STATS,
        HAMPTA_TREK_ROUTE,
        HAMPTA_TREK_HIGHLIGHTS,
        HAMPTA_TREK_CHECKLIST,
        HAMPTA_TREK_GALLERY
    };
}
