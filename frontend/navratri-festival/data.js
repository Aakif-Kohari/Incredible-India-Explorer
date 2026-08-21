/* ==========================================================================
   Navratri Festival Data
   Comprehensive dataset of the nine nights, regional traditions, and cultural elements.
   ========================================================================== */

/**
 * The Nine Forms of Durga (Navadurga) with colors, offerings, and significance.
 * Each day is associated with a specific form, color, and set of rituals.
 */
const navratriNights = [
    {
        day: 1,
        name: 'Shailaputri',
        meaning: 'Daughter of the Mountain',
        color: '#FFA500', // Orange
        colorName: 'Orange',
        desc: 'The first manifestation of Durga, born as the daughter of Himalaya. She rides a bull and carries a trident and lotus, representing the root chakra and the beginning of spiritual journey.',
        offering: 'Desi Ghee',
        flower: 'Hibiscus'
    },
    {
        day: 2,
        name: 'Brahmacharini',
        meaning: 'The Ascetic',
        color: '#FFFFFF', // White
        colorName: 'White',
        desc: 'Represents the ascetic form of the Goddess who performed severe penance to attain Lord Shiva. She carries a rosary and water pot, symbolizing discipline and spiritual pursuit.',
        offering: 'Sugar',
        flower: 'Jasmine'
    },
    {
        day: 3,
        name: 'Chandraghanta',
        meaning: 'Bell-Shaped Moon',
        color: '#FF0000', // Red
        colorName: 'Red',
        desc: 'The married form of the Goddess with a half-moon shaped like a bell on her forehead. She rides a tiger and has ten hands, ready to fight evil while radiating peace.',
        offering: 'Milk',
        flower: 'Red Rose'
    },
    {
        day: 4,
        name: 'Kushmanda',
        meaning: 'Creator of the Universe',
        color: '#4169E1', // Royal Blue
        colorName: 'Royal Blue',
        desc: 'Believed to have created the cosmic egg with her smile. She resides in the core of the Sun, providing energy to all creation. She rides a lion and has eight hands.',
        offering: 'Malpua',
        flower: 'Marigold'
    },
    {
        day: 5,
        name: 'Skandamata',
        meaning: 'Mother of Skanda',
        color: '#FFD700', // Yellow
        colorName: 'Yellow',
        desc: 'The motherly form carrying Lord Kartikeya (Skanda) in her lap. She represents maternal love, wisdom, and the power of motherhood. Devotees seek her blessings for children.',
        offering: 'Bananas',
        flower: 'Yellow Rose'
    },
    {
        day: 6,
        name: 'Katyayani',
        meaning: 'Daughter of Sage Katyayana',
        color: '#228B22', // Green
        colorName: 'Green',
        desc: 'Born to sage Katyayana to destroy the demon Mahishasura. She is the warrior goddess, often worshipped by young women seeking good husbands. She rides a lion.',
        offering: 'Honey',
        flower: 'Lotus'
    },
    {
        day: 7,
        name: 'Kalaratri',
        meaning: 'The Dark Night',
        color: '#808080', // Grey
        colorName: 'Grey',
        desc: 'The fiercest form of Durga, dark as night with wild hair. Despite her terrifying appearance, she is known as "Shubhankari" - the one who does good, removing fear and ignorance.',
        offering: 'Jaggery',
        flower: 'Night-blooming Jasmine'
    },
    {
        day: 8,
        name: 'Mahagauri',
        meaning: 'The Great White Goddess',
        color: '#800080', // Purple
        colorName: 'Purple',
        desc: 'The serene, radiant form after her penance. She is fair as a conch, moon, and jasmine. She rides a bull and represents purity, tranquility, and the washing away of past sins.',
        offering: 'Coconut',
        flower: 'Night-blooming Jasmine'
    },
    {
        day: 9,
        name: 'Siddhidatri',
        meaning: 'Giver of Supernatural Powers',
        color: '#00CED1', // Peacock Green
        colorName: 'Peacock Green',
        desc: 'The final form who bestows all eight siddhis (supernatural powers). She sits on a lotus and is worshipped by gods, demons, and humans alike for ultimate spiritual attainment.',
        offering: 'Sesame Seeds',
        flower: 'Champa'
    }
];

/**
 * Regional Navratri traditions across India.
 */
const regionalTraditions = [
    {
        id: 'gujarat',
        region: 'Gujarat',
        title: 'Garba & Dandiya Raas',
        desc: 'The most famous Navratri celebration, featuring nine nights of ecstatic folk dancing. Communities gather in open grounds and perform Garba (circular dance) and Dandiya (stick dance) until dawn.',
        highlights: [
            'Traditional Chaniya Choli attire',
            'Live orchestras with folk music',
            'Fasting during the day, dancing at night',
            'Famous venues: GMDC Ground, Vadodara'
        ]
    },
    {
        id: 'bengal',
        region: 'West Bengal',
        title: 'Durga Puja',
        desc: 'A grand five-day festival (last five days of Navratri) where elaborate temporary structures called Pandals house artistic clay idols of Goddess Durga slaying Mahishasura.',
        highlights: [
            'Artistic Pandals with thematic designs',
            'Dhunuchi Naach (dance with incense)',
            'Sindoor Khela on Vijayadashami',
            'Cultural programs and food stalls'
        ]
    },
    {
        id: 'south',
        region: 'South India (TN, Karnataka, AP)',
        title: 'Golu / Bommai Kolu',
        desc: 'Families display tiered arrangements of dolls (Bommai) on stepped platforms representing gods, humans, and animals. Women visit each other\'s homes to view Golus and exchange gifts.',
        highlights: [
            'Nine-tiered doll displays',
            'Saraswati Puja on the 9th day',
            'Vidyarambham (initiation of learning)',
            'Exchange of tamboolam (betel leaves)'
        ]
    },
    {
        id: 'north',
        region: 'North India (UP, Delhi, MP)',
        title: 'Ramlila & Dussehra',
        desc: 'The nine days feature theatrical re-enactments of the Ramayana (Ramlila), culminating in Dussehra where effigies of Ravana are burnt, symbolizing the victory of good over evil.',
        highlights: [
            'Open-air Ramlila performances',
            'Ravana Dahan (burning of effigies)',
            'Kanya Pujan (worship of 9 young girls)',
            'Fairs and processions'
        ]
    },
    {
        id: 'maharashtra',
        region: 'Maharashtra',
        title: 'Ghatasthapana',
        desc: 'The festival begins with installing a sacred pot (Ghata) symbolizing the Goddess. Families grow barley seeds in the pot over nine days, and women perform daily aartis.',
        highlights: [
            'Ghatasthapana ritual on Day 1',
            'Daily aartis and bhajans',
            'Gondhal folk dance performances',
            'Exchange of Aptyachi Pane (leaves)'
        ]
    }
];

/**
 * Dance forms associated with Navratri.
 */
const danceForms = [
    {
        id: 'garba',
        name: 'Garba',
        desc: 'A graceful circular dance performed primarily by women around a centrally placed lamp (Garbo) or image of the Goddess. The word "Garba" derives from "Garbha Deep" (womb lamp), symbolizing the divine feminine energy.',
        features: [
            'Performed in concentric circles',
            'Clapping and snapping rhythms',
            'Colorful Chaniya Choli attire',
            'Spiral movement patterns',
            'Devotional songs to the Goddess'
        ]
    },
    {
        id: 'dandiya',
        name: 'Dandiya Raas',
        desc: 'A lively stick dance performed by both men and women in pairs. Dancers strike decorated wooden sticks (dandiyas) in rhythm with the music, creating a percussive symphony.',
        features: [
            'Performed with wooden sticks',
            'Partner-based circular patterns',
            'Fast-paced rhythmic beats',
            'Both men and women participate',
            'Often performed after Garba'
        ]
    }
];

/**
 * Traditional fasting foods consumed during Navratri.
 */
const fastingFoods = [
    { name: 'Sabudana Khichdi', desc: 'A popular fasting dish made from tapioca pearls, peanuts, and cumin. Light on the stomach yet energy-rich.' },
    { name: 'Kuttu ki Puri', desc: 'Deep-fried bread made from buckwheat flour, typically served with potato curry during fasts.' },
    { name: 'Singhara Atta', desc: 'Water chestnut flour used to make pakoras and puris. A staple grain during Navratri fasting.' },
    { name: 'Samak Rice', desc: 'Barnyard millet cooked as khichdi or kheer. A nutritious alternative to regular rice during fasts.' },
    { name: 'Makhana (Fox Nuts)', desc: 'Roasted lotus seeds seasoned with ghee and spices. A healthy, crunchy snack during fasts.' }
];

/**
 * Traditional attire worn during Navratri celebrations.
 */
const traditionalAttire = [
    { name: 'Chaniya Choli', desc: 'The iconic three-piece outfit of Gujarat consisting of a flared skirt (chaniya), blouse (choli), and draped scarf (odhani). Adorned with mirror work and embroidery.' },
    { name: 'Kediyu', desc: 'Traditional men\'s attire in Gujarat - a short, flared jacket worn with dhoti or chorno pants. Often heavily embroidered with mirror work.' },
    { name: 'Saree (Nine Yards)', desc: 'In Maharashtra and South India, women wear traditional nine-yard sarees (Nauvari/Kashta) draped in the dhoti style for ease of movement during dances.' },
    { name: 'Lehenga Choli', desc: 'Popular across North India, this ensemble of embroidered skirt and blouse is worn for Garba nights and festive gatherings.' }
];
