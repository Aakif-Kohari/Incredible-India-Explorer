/* ==========================================================================
   Ganesh Chaturthi Data
   Comprehensive dataset of pandals, 10-day timeline, and foods.
   ========================================================================== */

/**
 * Famous Ganesh Pandals across India with historical significance.
 */
const famousPandals = [
    {
        id: 'lalbaugcha-raja',
        name: 'Lalbaugcha Raja',
        city: 'Mumbai, Maharashtra',
        since: 1893,
        desc: 'Mumbai\'s most iconic Ganesha idol, installed at Lalbaug Sarvajanik Ganeshotsav Mandal. Standing over 15 feet tall, it was among the first public pandals started by Lokmanya Tilak.',
        visitors: '500K+ daily',
        height: '15+ feet'
    },
    {
        id: 'dagdusheth',
        name: 'Dagdusheth Halwai Ganpati',
        city: 'Pune, Maharashtra',
        since: 1893,
        desc: 'Pune\'s most revered Ganesh, housed in a magnificent temple. The original idol dates back to the 18th century. Known for elaborate decorations and massive crowds.',
        visitors: '300K+ daily',
        height: '10 feet'
    },
    {
        id: 'khairatabad',
        name: 'Khairatabad Ganesh',
        city: 'Hyderabad, Telangana',
        since: 1954,
        desc: 'Hyderabad\'s largest Ganesha idol, growing taller each year. The 2023 idol stood at 60 feet. Famous for its grand decorations and celebrity visits.',
        visitors: '200K+ daily',
        height: '40-60 feet'
    },
    {
        id: 'mumbaicha-raja',
        name: 'Mumbaicha Raja',
        city: 'Mumbai, Maharashtra',
        since: 1928,
        desc: 'Located in Lalbaug, this mandal is known for its thematic decorations that address social issues. Each year\'s decoration tells a story relevant to contemporary society.',
        visitors: '100K+ daily',
        height: '12 feet'
    },
    {
        id: 'gaurishankar',
        name: 'Gaurishankar Mandal',
        city: 'Pune, Maharashtra',
        since: 1949,
        desc: 'Known for eco-friendly celebrations and community service. One of Pune\'s oldest mandals promoting sustainable festival practices.',
        visitors: '50K+ daily',
        height: '8 feet'
    },
    {
        id: 'kasba-ganpati',
        name: 'Kasba Ganpati',
        city: 'Pune, Maharashtra',
        since: 1893,
        desc: 'The first pandal in the procession during Pune\'s visarjan, holding the "Manacha Ganpati" (honored Ganesha) status since Tilak\'s time.',
        visitors: '75K+ daily',
        height: '7 feet'
    }
];

/**
 * The 10-day timeline of Ganesh Chaturthi celebrations.
 */
const festivalTimeline = [
    {
        day: 1,
        title: 'Pranapratishtha (Installation)',
        desc: 'The idol is brought home or to the pandal with great fanfare. A sacred ritual infuses the divine presence (chaitanya) into the idol. The first aarti and modak offering are performed.'
    },
    {
        day: 2,
        title: 'Daily Aartis & Bhajans',
        desc: 'Morning and evening aartis (prayer rituals) are performed. Devotees visit to offer prayers, flowers, and modaks. Community bhajans (devotional songs) fill the air.'
    },
    {
        day: 3,
        title: 'Community Feasts',
        desc: 'Many mandals organize annadan (food donation) serving thousands of devotees. Traditional Maharashtrian thalis and prasad are distributed.'
    },
    {
        day: 4,
        title: 'Cultural Programs',
        desc: 'Pandals host cultural events including classical music concerts, dance performances, plays, and talent competitions to celebrate art and culture.'
    },
    {
        day: 5,
        title: 'Social Service Day',
        desc: 'Many mandals dedicate this day to social causes - blood donation drives, medical camps, educational support, and environmental awareness campaigns.'
    },
    {
        day: 6,
        title: 'Grand Decorations Unveiled',
        desc: 'Elaborate thematic decorations are completed. Pandals compete for best decoration awards. LED lights, flowers, and artistic installations create spectacular displays.'
    },
    {
        day: 7,
        title: 'Peak Darshan Days',
        desc: 'Crowds reach their maximum as devotees rush for darshan (viewing) before visarjan. Long queues form at major pandals. Special aartis are performed.'
    },
    {
        day: 8,
        title: 'Gauri Ganpati',
        desc: 'In Maharashtra, Goddess Gauri (Parvati) idols are installed alongside Ganesha, symbolizing the divine couple. Special rituals honor the mother-son bond.'
    },
    {
        day: 9,
        title: 'Anant Chaturdashi Eve',
        desc: 'The final night of celebration. Emotional farewell aartis are performed. Devotees spend the night in prayer and preparation for tomorrow\'s visarjan.'
    },
    {
        day: 10,
        title: 'Visarjan (Immersion)',
        desc: 'The grand finale. Idols are carried in massive processions with dhol-tasha drums, dancing, and gulal (colored powder). The chant "Ganapati Bappa Morya" echoes as idols are immersed in water, symbolizing Ganesha\'s return to Mount Kailash with the promise to return next year.'
    }
];

/**
 * Traditional foods offered to Lord Ganesha (Naivedya).
 */
const traditionalFoods = [
    {
        name: 'Modak',
        icon: '🥟',
        desc: 'The beloved sweet dumpling, Ganesha\'s favorite. Steamed rice flour shells filled with coconut, jaggery, and cardamom. Available in steamed (ukdiche) and fried varieties.'
    },
    {
        name: 'Karanji',
        icon: '🥟',
        desc: 'Crescent-shaped fried pastries filled with sweet coconut, nuts, and poppy seeds. A Maharashtrian specialty offered during Ganesh Chaturthi.'
    },
    {
        name: 'Puran Poli',
        icon: '🫓',
        desc: 'Sweet flatbread stuffed with chana dal (split chickpeas), jaggery, and cardamom. Served with ghee and milk as prasad.'
    },
    {
        name: 'Ladoo',
        icon: '🟠',
        desc: 'Round sweet balls made from besan (gram flour), semolina, or coconut. Motichoor ladoo and besan ladoo are popular offerings.'
    },
    {
        name: 'Sundal',
        icon: '🥜',
        desc: 'Seasoned chickpeas or legumes tempered with mustard seeds, curry leaves, and coconut. A South Indian offering, especially in Tamil Nadu.'
    },
    {
        name: 'Fruits & Panchamrit',
        icon: '🍌',
        desc: 'A sacred mixture of milk, yogurt, ghee, honey, and sugar (panchamrit) along with seasonal fruits like bananas, apples, and coconuts.'
    }
];

