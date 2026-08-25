/* ==========================================================================
   Chandipur Beach Data
   Comprehensive dataset for tidal data, ecology, activities, and gallery.
   ========================================================================== */

/**
 * Tidal phenomenon data explaining the vanishing sea.
 */
const tidalData = [
    {
        id: 'low-tide',
        title: 'Low Tide (Exposed Sea Bed)',
        desc: 'During low tide, the Bay of Bengal retreats up to 5 kilometers, exposing a vast, firm sand bed. Visitors can walk, cycle, or even drive vehicles on the exposed ocean floor - a rare phenomenon globally.',
        img: 'https://placehold.co/400x250/FCD34D/0A1929?text=Low+Tide+5km+Walk'
    },
    {
        id: 'high-tide',
        title: 'High Tide (Submerged Coast)',
        desc: 'Within hours, the sea returns dramatically, submerging the same area under 10-15 feet of water. The tidal variation is one of the most extreme on India\'s eastern coastline.',
        img: 'https://placehold.co/400x250/38BDF8/fff?text=High+Tide+Returns'
    }
];

/**
 * 24-hour tidal cycle data.
 */
const tidalCycle = [
    { hour: '00:00', tide: 50, phase: 'Mid' },
    { hour: '03:00', tide: 90, phase: 'High' },
    { hour: '06:00', tide: 30, phase: 'Low' },
    { hour: '09:00', tide: 10, phase: 'Extreme Low' },
    { hour: '12:00', tide: 60, phase: 'Mid' },
    { hour: '15:00', tide: 95, phase: 'High' },
    { hour: '18:00', tide: 40, phase: 'Mid' },
    { hour: '21:00', tide: 15, phase: 'Low' }
];

/**
 * Coastal ecology of Chandipur.
 */
const ecologyData = [
    {
        icon: '🌊',
        title: 'Intertidal Zone',
        desc: 'The exposed sand flats host diverse marine invertebrates including crabs, mollusks, and sand dollars. The firm substrate allows for unique intertidal exploration.'
    },
    {
        icon: '🌴',
        title: 'Casuarina Groves',
        desc: 'Dense casuarina plantations line the beach, providing wind breaks, shade, and habitat for coastal birds. These trees stabilize the sand dunes against erosion.'
    },
    {
        icon: '🐦',
        title: 'Coastal Avifauna',
        desc: 'The beach attracts migratory shorebirds, sandpipers, plovers, and terns. The exposed mudflats during low tide provide rich feeding grounds.'
    },
    {
        icon: '🐟',
        title: 'Marine Life',
        desc: 'Fishing communities harvest prawns, crabs, and small fish from the retreating waters. Horseshoe crabs are occasionally spotted on the sand flats.'
    },
    {
        icon: '🌿',
        title: 'Coastal Vegetation',
        desc: 'Salt-tolerant plants like Ipomoea pes-caprae (beach morning glory) and Spinifex (beach grass) stabilize the sand dunes and prevent erosion.'
    },
    {
        icon: '🦀',
        title: 'Red Crab Migration',
        desc: 'During specific lunar phases, thousands of red crabs emerge from burrows in the sand, creating a spectacular natural display.'
    }
];

/**
 * Activities and experiences at Chandipur.
 */
const activitiesData = [
    {
        icon: '🚶',
        title: 'Sea Bed Walking',
        desc: 'Walk up to 5 km into the Bay of Bengal during low tide. The firm sand allows easy walking on what is normally ocean floor.'
    },
    {
        icon: '🚴',
        title: 'Cycling on Sand',
        desc: 'Rent bicycles and ride across the exposed sea bed - a unique cycling experience you can\'t find anywhere else in India.'
    },
    {
        icon: '📸',
        title: 'Sunrise Photography',
        desc: 'The eastern orientation makes Chandipur ideal for sunrise photography, with dramatic silhouettes against the Bay of Bengal.'
    },
    {
        icon: '🐚',
        title: 'Shell Collecting',
        desc: 'The exposed sand flats reveal a variety of seashells, sand dollars, and marine fossils for collectors and naturalists.'
    },
    {
        icon: '🚗',
        title: 'Beach Driving',
        desc: 'Unlike most beaches, the firm sand at low tide allows 4WD vehicles to drive directly on the sea bed - a rare experience.'
    },
    {
        icon: '🎣',
        title: 'Beach Fishing',
        desc: 'Join local fishermen as they cast nets in the shallow retreating waters, a traditional practice unchanged for generations.'
    }
];

/**
 * Nearby attractions.
 */
const nearbyData = [
    {
        icon: '🚀',
        title: 'DRDO Integrated Test Range',
        desc: 'The missile testing facility where India\'s Prithvi, Akash, and Agni missiles are tested. A visitor center showcases India\'s defense achievements.'
    },
    {
        icon: '🛕',
        title: 'Panchalingeswar Temple',
        desc: 'Located 30 km away, this Shiva temple sits atop a hill with five naturally occurring Shiva lingams and panoramic views.'
    },
    {
        icon: '🏛️',
        title: 'Balasore Town',
        desc: 'The historic town (16 km) features colonial architecture, the 16th-century Jagannath Temple, and traditional Odia culture.'
    },
    {
        icon: '🌊',
        title: 'Talsari Beach',
        desc: 'A quieter beach 40 km north with casuarina groves, fishing villages, and pristine coastline away from tourist crowds.'
    }
];

/**
 * Image gallery data.
 */
const galleryData = [
    { src: 'https://placehold.co/400x400/FCD34D/0A1929?text=Sea+Bed+Walk', alt: 'Walking on exposed sea bed', caption: 'Visitors walking 5 km into the Bay of Bengal during low tide' },
    { src: 'https://placehold.co/400x400/38BDF8/fff?text=Tidal+Retreat', alt: 'Tidal retreat phenomenon', caption: 'The dramatic tidal retreat exposing vast sand flats' },
    { src: 'https://placehold.co/400x400/F59E0B/fff?text=Sunrise', alt: 'Sunrise over Bay of Bengal', caption: 'Spectacular sunrise over the eastern coastline' },
    { src: 'https://placehold.co/400x400/10B981/fff?text=Casuarina+Groves', alt: 'Casuarina tree groves', caption: 'Dense casuarina plantations along the shore' },
    { src: 'https://placehold.co/400x400/EF4444/fff?text=Red+Crabs', alt: 'Red crabs on sand', caption: 'Red crab migration on the exposed sand flats' },
    { src: 'https://placehold.co/400x400/8B5CF6/fff?text=Fishing+Village', alt: 'Local fishing village', caption: 'Traditional fishing communities of Chandipur' },
    { src: 'https://placehold.co/400x400/EC4899/fff?text=Sand+Dollars', alt: 'Sand dollars collected', caption: 'Sand dollars and shells found during low tide' },
    { src: 'https://placehold.co/400x400/14B8A6/fff?text=Beach+Cycling', alt: 'Cycling on sand bed', caption: 'Visitors cycling across the exposed sea bed' }
];

