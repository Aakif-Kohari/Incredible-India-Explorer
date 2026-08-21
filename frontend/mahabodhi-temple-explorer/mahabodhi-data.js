/**
 * Mahabodhi Temple Explorer — Data Module
 * Comprehensive dataset covering Mahabodhi Temple Complex (Bodh Gaya, Bihar),
 * Gautama Buddha's Enlightenment, Sacred Bodhi Tree, Vajrasana (Diamond Throne),
 * 55m brick shikhara architecture, and the Seven Sacred Weeks (Sapta Saptaha).
 */

const MAHABODHI_INFO = {
    id: "mahabodhi-temple",
    title: "Mahabodhi Temple (Sacred Site of Buddha's Enlightenment)",
    location: "Bodh Gaya, Gaya District, Bihar, India",
    spiritualSignificance: "The Navel of the Earth — Exact Site of Gautama Buddha's Enlightenment (c. 531 BCE)",
    unescoStatus: "UNESCO World Heritage Site (Inscribed 2002)",
    templeHeight: "55 Meters (180 Feet) Grand Brick Pyramidal Shikhara",
    primaryRelics: "Sacred Bodhi Tree (Ficus religiosa) & Ashokan Vajrasana (Diamond Throne)",
    quickStats: [
        { label: "Significance", value: "Buddha's Enlightenment", icon: "☸️" },
        { label: "UNESCO Status", value: "World Heritage (2002)", icon: "🏛️" },
        { label: "Temple Height", value: "55m Brick Shikhara", icon: "🛕" },
        { label: "Sacred Tree", value: "Bodhi Tree (Ficus)", icon: "🌳" },
        { label: "Diamond Throne", value: "Vajrasana (Ashokan)", icon: "💎" },
        { label: "Location", value: "Bodh Gaya, Bihar", icon: "📍" }
    ]
};

const SACRED_COMPONENTS = [
    {
        name: "Sacred Bodhi Tree (Ficus religiosa)",
        category: "Sacred Natural Relic",
        description: "Direct descendant of the original Peepal tree under which Siddhartha Gautama sat in deep meditation and attained Supreme Enlightenment (Bodhi) on the full moon of Vaisakha.",
        icon: "🌳"
    },
    {
        name: "Vajrasana (The Diamond Throne)",
        category: "Ashokan Monolithic Relic",
        description: "A polished grey Chunar sandstone slab installed by Mauryan Emperor Ashoka in 250 BCE marking the exact meditative seat of the Buddha; decorated with floral and honeysuckle carvings.",
        icon: "💎"
    },
    {
        name: "Grand 55m Brick Shikhara",
        category: "Classical Architecture",
        description: "One of the oldest surviving monumental brick structures in India (Gupta era), rising 55 meters with multi-tiered niches, gilded stupa finial, and four corner miniature towers.",
        icon: "🛕"
    },
    {
        name: "Ancient Stone Railings (Vedika)",
        category: "Shunga & Gupta Epigraphy",
        description: "Sandstone and granite railings with carved medallions depicting lotus rosettes, centaurs, zodiac signs, and Ashokan pillar representations.",
        icon: "🛡️"
    },
    {
        name: "Mucalinda Sarovar (Serpent Lake)",
        category: "Sacred Meditation Site",
        description: "A serene lake housing a central bronze statue of the Buddha sheltered by the multi-headed serpent king Mucalinda during a fierce storm during the sixth week after enlightenment.",
        icon: "🌊"
    }
];

const SEVEN_WEEKS_TIMELINE = [
    { week: "Week 1: Bodhi Tree & Vajrasana", title: "Attainment of Bodhi", description: "Buddha sits under the Bodhi tree experiencing the bliss of Nirvana and contemplating the Twelve Links of Dependent Origination (Paticcasamuppada)." },
    { week: "Week 2: Animeshlocha Stupa", title: "The Unblinking Gaze", description: "Buddha stands northeast of the Bodhi tree, gazing at it without blinking for seven continuous days in deep gratitude." },
    { week: "Week 3: Cankamana (Jewel Walk)", title: "Walking Meditation", description: "Buddha paces back and forth along an 18-step promenade; lotus flowers miraculously bloom beneath his feet." },
    { week: "Week 4: Ratanaghara (Jewel Chamber)", title: "Emanation of the Six Rays", description: "Buddha meditates on the Abhidharma; his aura radiates the six sacred colors of the Buddhist flag (Blue, Yellow, Red, White, Orange, and Radiance)." },
    { week: "Week 5: Ajapala Nigrodha Tree", title: "Brahma's Request", description: "Under the Banyan tree, Buddha responds to the Brahmin's questions on true holiness and is implored by Brahma Sahampati to teach the Dhamma to the world." },
    { week: "Week 6: Mucalinda Lake", title: "Shelter of the Serpent King", description: "Mucalinda, the serpent king, spreads his vast hood over Buddha to shield him from torrential rains." },
    { week: "Week 7: Rajayatana Tree", title: "First Disciples", description: "Under the Rajayatana tree, merchants Tapussa and Bhallika offer rice cakes and honey, becoming Buddha's first lay followers." }
];

const TIMELINE_EVENTS = [
    { year: "c. 531 BCE", title: "Supreme Enlightenment of the Buddha", description: "Siddhartha Gautama attains Nirvana under the Bodhi Tree at Bodh Gaya." },
    { year: "c. 250 BCE", title: "Emperor Ashoka's Pilgrimage", description: "Ashoka visits Bodh Gaya, erects the Vajrasana (Diamond Throne) and constructs the first shrine." },
    { year: "5th–6th Century CE", title: "Construction of Grand Brick Temple", description: "Gupta monarchs reconstruct Mahabodhi Temple into the 55-meter grand pyramidal brick tower." },
    { year: "637 CE", title: "Visit of Chinese Master Xuanzang", description: "Xuanzang visits Bodh Gaya, documenting the temple, Bodhi tree, and international monasteries in detailed travelogue." },
    { year: "1880s", title: "Restoration by Cunningham & Beglar", description: "British archaeologist Sir Alexander Cunningham and J. D. Beglar comprehensively restore the temple." },
    { year: "2002 CE", title: "UNESCO World Heritage Recognition", description: "Mahabodhi Temple Complex is officially declared a UNESCO World Heritage Site." }
];

const REFERENCES = [
    { text: "Archaeological Survey of India (ASI) — Mahabodhi Temple Complex Bodh Gaya.", link: "https://asi.nic.in" },
    { text: "Cunningham, Alexander (1892). Mahabodhi, or the Great Buddhist Temple Under the Bodhi Tree at Buddha-Gaya. London: W. H. Allen & Co.", link: "#" },
    { text: "UNESCO World Heritage Centre — Mahabodhi Temple Complex at Bodh Gaya (No. 1056).", link: "https://whc.unesco.org" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MAHABODHI_INFO, SACRED_COMPONENTS, SEVEN_WEEKS_TIMELINE, TIMELINE_EVENTS, REFERENCES };
}
