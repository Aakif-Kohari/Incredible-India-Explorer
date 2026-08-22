/* ==========================================================================
   Tarkarli Beach Data
   Comprehensive dataset for Konkan features, activities, culture, and gallery.
   ========================================================================== */

/**
 * Konkan coast characteristics.
 */
const konkanFeatures = [
    {
        icon: '🌊',
        title: 'Crystal Clear Waters',
        desc: 'Tarkarli boasts visibility up to 20 feet, making it ideal for scuba diving and snorkeling - rare for mainland Indian beaches.'
    },
    {
        icon: '🐠',
        title: 'Coral Reefs',
        desc: 'Shallow coral reefs host diverse marine life including clownfish, parrotfish, sea turtles, and occasional reef sharks.'
    },
    {
        icon: '🥥',
        title: 'Coconut Groves',
        desc: 'The coastline is fringed with coconut palms, providing shade and supporting the local coconut-based economy and cuisine.'
    },
    {
        icon: '⛵',
        title: 'Karli River Estuary',
        desc: 'The Karli River meets the Arabian Sea here, creating a unique estuarine ecosystem with mangroves and diverse birdlife.'
    },
    {
        icon: '🏝️',
        title: 'Pristine Beaches',
        desc: 'White sand beaches stretch for kilometers, relatively uncrowded compared to Goa, offering peaceful coastal walks.'
    },
    {
        icon: '🐬',
        title: 'Dolphin Sightings',
        desc: 'Indo-Pacific humpback dolphins are frequently spotted in the bay, with boat tours offering dolphin watching experiences.'
    }
];

/**
 * Marine and coastal activities.
 */
const activitiesData = [
    {
        icon: '🤿',
        title: 'Scuba Diving',
        desc: 'PADI-certified dive centers offer courses from beginner to advanced. Explore coral reefs, shipwrecks, and underwater caves with visibility up to 20 feet.'
    },
    {
        icon: '🏊',
        title: 'Snorkeling',
        desc: 'Shallow reefs accessible from the beach allow snorkeling without certification. Spot colorful fish, sea urchins, and occasional sea turtles.'
    },
    {
        icon: '🚤',
        title: 'Backwater Kayaking',
        desc: 'Paddle through the Karli River backwaters, exploring mangrove forests, spotting kingfishers, and visiting traditional fishing villages.'
    },
    {
        icon: '🐬',
        title: 'Dolphin Watching',
        desc: 'Early morning boat tours offer chances to see Indo-Pacific humpback dolphins playing in the bay, especially during October-March.'
    },
    {
        icon: '🏄',
        title: 'Parasailing',
        desc: 'Soar above the Arabian Sea with parasailing, offering panoramic views of the Konkan coastline and the confluence of river and sea.'
    },
    {
        icon: '🎣',
        title: 'Deep Sea Fishing',
        desc: 'Join local fishermen for deep sea fishing expeditions targeting kingfish, tuna, and barracuda in the Arabian Sea.'
    }
];

/**
 * Nearby attractions.
 */
const nearbyData = [
    {
        icon: '🏰',
        title: 'Sindhudurg Fort',
        desc: 'A 17th-century Maratha sea fort built by Chhatrapati Shivaji Maharaj on an island 2 km offshore. Accessible by ferry, it features massive walls and historical cannons.'
    },
    {
        icon: '🛕',
        title: 'Rameshwar Temple',
        desc: 'An ancient Shiva temple in Malvan with intricate carvings and peaceful atmosphere, reflecting the spiritual heritage of the Konkan coast.'
    },
    {
        icon: '🏝️',
        title: 'Tsunami Island',
        desc: 'A small island formed after the 2004 tsunami, now a popular spot for water sports, beach shacks, and sunset views.'
    },
    {
        icon: '🌴',
        title: 'Devbag Beach',
        desc: 'A quieter beach 5 km from Tarkarli, known for its casuarina groves, pristine sands, and the confluence of the Karli River and Arabian Sea.'
    }
];

/**
 * Malvani cuisine specialties.
 */
const malvaniFoods = [
    { name: 'Sol Kadhi', desc: 'A refreshing pink drink made from kokum and coconut milk, served as a digestive after spicy meals. The signature beverage of Konkan cuisine.' },
    { name: 'Fish Curry Rice', desc: 'The staple meal - fresh catch cooked in coconut-based curry with kokum, served with steamed rice. Each family has its secret spice blend.' },
    { name: 'Kombdi Vade', desc: 'Spicy chicken curry served with vade (puffed fried bread). A celebratory dish prepared during festivals and family gatherings.' },
    { name: 'Surmai Fry', desc: 'Kingfish marinated in Malvani masala (a blend of 15+ spices) and shallow fried to crispy perfection. A coastal delicacy.' },
    { name: 'Modak', desc: 'Sweet dumplings filled with coconut and jaggery, especially prepared during Ganesh Chaturthi. The Konkan version uses rice flour.' }
];

/**
 * Cultural traditions of the Konkan coast.
 */
const culturalTraditions = [
    { name: 'Narali Purnima', desc: 'Coconut day festival marking the end of monsoon and beginning of fishing season. Fishermen offer coconuts to the sea god Varuna for safe voyages.' },
    { name: 'Dashavtar', desc: 'Traditional folk theater depicting ten avatars of Lord Vishnu, performed during festivals with elaborate costumes and live music.' },
    { name: 'Jagran', desc: 'All-night devotional singing sessions during festivals, featuring traditional Konkani bhajans and spiritual discourses.' },
    { name: 'Haldi Kumkum', desc: 'Women\'s festival where married women visit each other, exchange gifts, and apply turmeric and vermillion as symbols of marital bliss.' },
    { name: 'Ganesh Chaturthi', desc: 'The most important festival in Konkan, with elaborate pandals, processions, and immersion ceremonies lasting 10 days.' }
];

/**
 * Image gallery data.
 */
const galleryData = [
    { src: 'https://placehold.co/400x400/FF7F50/fff?text=Scuba+Diving', alt: 'Scuba diving in Tarkarli', caption: 'Exploring coral reefs with 20-foot visibility' },
    { src: 'https://placehold.co/400x400/40E0D0/fff?text=Clear+Waters', alt: 'Crystal clear Arabian Sea', caption: 'Crystal clear waters of the Konkan coast' },
    { src: 'https://placehold.co/400x400/1A4B7F/fff?text=Sindhudurg+Fort', alt: 'Sindhudurg sea fort', caption: 'The historic 17th-century Sindhudurg Fort' },
    { src: 'https://placehold.co/400x400/FF6347/fff?text=Malvani+Cuisine', alt: 'Traditional Malvani thali', caption: 'Authentic Malvani fish curry rice thali' },
    { src: 'https://placehold.co/400x400/87CEEB/fff?text=Dolphins', alt: 'Dolphins in Arabian Sea', caption: 'Indo-Pacific humpback dolphins in the bay' },
    { src: 'https://placehold.co/400x400/2C5282/fff?text=Backwaters', alt: 'Karli River backwaters', caption: 'Kayaking through Karli River backwaters' },
    { src: 'https://placehold.co/400x400/E53E3E/fff?text=Sunset', alt: 'Sunset over Arabian Sea', caption: 'Spectacular sunset over the Arabian Sea' },
    { src: 'https://placehold.co/400x400/C53030/fff?text=Coconut+Groves', alt: 'Coconut palm groves', caption: 'Coconut groves along the Konkan coastline' }
];
