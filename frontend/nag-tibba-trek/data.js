/* ==========================================================================
   Nag Tibba Trek Data
   Comprehensive dataset for trail, viewpoints, campsites, and peaks
   ========================================================================== */

/**
 * Elevation profile data points along the trek
 */
const elevationData = [
    { location: 'Pantwari', altitude: 1500, distance: 0 },
    { location: 'Forest Camp', altitude: 1800, distance: 2 },
    { location: 'Rhododendron Zone', altitude: 2100, distance: 4 },
    { location: 'Nag Tibba Base', altitude: 2600, distance: 6 },
    { location: 'Summit', altitude: 3022, distance: 8 }
];

/**
 * Trail segment details with difficulty and descriptions
 */
const trailSegments = [
    {
        name: 'Pantwari to Forest Camp',
        distance: '2 km',
        duration: '1-1.5 hours',
        altitude: '1,500m → 1,800m',
        description: 'The trek begins with a gradual ascent through terraced fields and enters dense oak forests. The trail is well-marked and passes through small hamlets where locals tend to their cattle.'
    },
    {
        name: 'Forest Camp to Rhododendron Zone',
        distance: '2 km',
        duration: '1.5-2 hours',
        altitude: '1,800m → 2,100m',
        description: 'The forest thickens with towering deodar and rhododendron trees. In spring (March-April), the trail is carpeted with red and pink rhododendron flowers. Bird calls echo through the canopy.'
    },
    {
        name: 'Rhododendron Zone to Nag Tibba Base',
        distance: '2 km',
        duration: '2-2.5 hours',
        altitude: '2,100m → 2,600m',
        description: 'The trail becomes steeper as you approach the base camp. The forest thins out, giving way to alpine meadows. First clear views of the surrounding peaks emerge through gaps in the trees.'
    },
    {
        name: 'Nag Tibba Base to Summit',
        distance: '2 km',
        duration: '1.5-2 hours',
        altitude: '2,600m → 3,022m',
        description: 'The final push to the summit is through open grasslands with panoramic views unfolding at every step. The small Nag Devta temple marks the summit, offering 360-degree Himalayan vistas.'
    }
];

/**
 * Difficulty assessment across various parameters
 */
const difficultyAssessment = [
    { parameter: 'Physical Fitness', level: 40, description: 'Moderate fitness required' },
    { parameter: 'Trail Navigation', level: 25, description: 'Well-marked trail' },
    { parameter: 'Altitude Challenge', level: 35, description: 'Moderate altitude gain' },
    { parameter: 'Weather Risk', level: 30, description: 'Generally stable weather' },
    { parameter: 'Technical Difficulty', level: 15, description: 'Non-technical trek' },
    { parameter: 'Experience Required', level: 20, description: 'Beginner-friendly' }
];

/**
 * Scenic viewpoints along the trail
 */
const viewpoints = [
    {
        icon: '🌲',
        name: 'Forest Clearings (2,000m)',
        description: 'First clear views emerge through gaps in the dense forest canopy. On clear days, you can spot distant peaks and the valley below.'
    },
    {
        icon: '⛰️',
        name: 'Rhododendron Meadow (2,300m)',
        description: 'A beautiful meadow surrounded by flowering rhododendrons offers the first unobstructed views of Bandarpoonch and Swargarohini ranges.'
    },
    {
        icon: '🏔️',
        name: 'Base Camp Ridge (2,600m)',
        description: 'The ridge at base camp provides sweeping views across the Garhwal Himalayas. Perfect spot for sunrise and sunset photography.'
    },
    {
        icon: '🗻',
        name: 'Summit (3,022m)',
        description: 'The highest point offers 360-degree panoramic views of major Himalayan peaks spanning across Uttarakhand and into Tibet on clear days.'
    }
];

/**
 * Major peaks visible from Nag Tibba summit
 */
const visiblePeaks = [
    { name: 'Bandarpoonch', altitude: '6,316m' },
    { name: 'Swargarohini', altitude: '6,252m' },
    { name: 'Gangotri Range', altitude: '6,672m' },
    { name: 'Srikanta', altitude: '6,133m' },
    { name: 'Kalanag (Black Peak)', altitude: '6,387m' },
    { name: 'Kedarnath Peak', altitude: '6,940m' },
    { name: 'Chaukhamba', altitude: '7,138m' },
    { name: 'Dunagiri', altitude: '7,068m' }
];

/**
 * Campsite options along the trek
 */
const campsites = [
    {
        name: 'Forest Camp',
        altitude: '1,800m',
        facilities: 'Basic tent sites, water stream nearby',
        description: 'A peaceful camping spot nestled in the oak forest. Ideal for those wanting to break the trek into 3 days. Limited facilities but beautiful natural setting.'
    },
    {
        name: 'Nag Tibba Base Camp',
        altitude: '2,600m',
        facilities: 'Established camps, basic toilets, bonfire area',
        description: 'The most popular camping spot with established tent accommodations. Offers stunning views and is strategically located for the summit push. Several trekking operators maintain camps here.'
    },
    {
        name: 'Summit Camp (Seasonal)',
        altitude: '3,000m',
        facilities: 'Very basic, wind protection only',
        description: 'Only for experienced trekkers and during stable weather. No facilities available. Used by those wanting to catch sunrise from the summit. Requires proper camping gear.'
    }
];

/**
 * Essential packing list for the trek
 */
const packingEssentials = [
    { category: 'Clothing', items: 'Trekking pants, thermal layers, waterproof jacket, warm hat, gloves, 3-4 pairs of socks' },
    { category: 'Footwear', items: 'Sturdy trekking shoes with ankle support, camp sandals, extra shoelaces' },
    { category: 'Gear', items: 'Backpack (40-50L), trekking poles, headlamp with extra batteries, water bottles (2L capacity)' },
    { category: 'Protection', items: 'Sunscreen (SPF 50+), sunglasses, lip balm, insect repellent, personal first aid kit' },
    { category: 'Camping', items: 'Sleeping bag (rated to 0°C), sleeping mat, quick-dry towel, toiletries' },
    { category: 'Food & Water', items: 'Energy bars, nuts, dried fruits, water purification tablets, ORS packets' }
];

/**
 * Nearby villages and attractions
 */
const nearbyAttractions = [
    {
        icon: '🏘️',
        name: 'Pantwari Village',
        description: 'The base village and starting point of the trek. A traditional Garhwali village with warm hospitality. Stay in local homestays to experience authentic mountain life.'
    },
    {
        icon: '🌊',
        name: 'Yamuna River',
        description: 'The sacred Yamuna flows near the base region. Several spots offer opportunities for riverside picnics and short walks along the riverbank.'
    },
    {
        icon: '🛕',
        name: 'Nag Devta Temple',
        description: 'The ancient temple at Nag Tibba summit dedicated to the Snake God. Local legends and folklore are associated with this sacred site.'
    },
    {
        icon: '🏔️',
        name: 'Mussoorie',
        description: 'The "Queen of Hills" is 55 km away. Extend your trip with a visit to this popular hill station with colonial architecture and scenic viewpoints.'
    },
    {
        icon: '🌲',
        name: 'Dehradun',
        description: 'The capital city of Uttarakhand, 90 km away. Gateway to the trek with airport, railway station, and all amenities.'
    },
    {
        icon: '⛩️',
        name: 'Kempty Falls',
        description: 'A popular waterfall near Mussoorie, perfect for a refreshing dip after completing the trek. Beautiful picnic spot with natural pools.'
    }
];

/**
 * Image gallery with proper attribution
 */
const galleryData = [
    { src: 'https://placehold.co/400x400/52B788/fff?text=Summit+View', alt: 'Panoramic view from Nag Tibba summit', caption: 'Breathtaking 360-degree panorama from the summit at 3,022m' },
    { src: 'https://placehold.co/400x400/7EC8E3/fff?text=Rhododendron+Trail', alt: 'Trail through blooming rhododendrons', caption: 'The magical rhododendron forest in full bloom during spring' },
    { src: 'https://placehold.co/400x400/2D6A4F/fff?text=Forest+Camp', alt: 'Camping in the oak forest', caption: 'Peaceful camping spot in the dense oak forest at 1,800m' },
    { src: 'https://placehold.co/400x400/8B7355/fff?text=Base+Camp', alt: 'Nag Tibba base camp with mountain views', caption: 'Base camp at 2,600m with stunning views of the Garhwal Himalayas' },
    { src: 'https://placehold.co/400x400/1A2332/fff?text=Bandarpoonch', alt: 'View of Bandarpoonch peak', caption: 'The majestic Bandarpoonch peak (6,316m) visible from the trail' },
    { src: 'https://placehold.co/400x400/40916C/fff?text=Trail+Path', alt: 'Well-defined trekking trail', caption: 'The well-marked trail through diverse landscapes' },
    { src: 'https://placehold.co/400x400/E9ECEF/000?text=Nag+Temple', alt: 'Nag Devta temple at summit', caption: 'The sacred Nag Devta temple marking the summit' },
    { src: 'https://placehold.co/400x400/4A5568/fff?text=Sunrise', alt: 'Sunrise from Nag Tibba', caption: 'Golden sunrise illuminating the Himalayan peaks' },
    { src: 'https://placehold.co/400x400/2B3A4E/fff?text=Winter+Trek', alt: 'Snow-covered trail in winter', caption: 'The trek transforms into a winter wonderland from December to February' },
    { src: 'https://placehold.co/400x400/A8B0BC/000?text=Pantwari', alt: 'Pantwari village', caption: 'The charming base village of Pantwari with traditional Garhwali architecture' },
    { src: 'https://placehold.co/400x400/1B4332/fff?text=Alpine+Meadow', alt: 'Alpine meadows near summit', caption: 'Beautiful alpine meadows in the final stretch to the summit' },
    { src: 'https://placehold.co/400x400/52B788/fff?text=Valley+View', alt: 'Valley views from trail', caption: 'Stunning views of the valleys and distant peaks from the trail' }
];
