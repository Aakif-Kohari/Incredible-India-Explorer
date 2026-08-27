/**
 * Champaner-Pavagadh Explorer — Data Module
 * Comprehensive dataset covering Champaner-Pavagadh Archaeological Park (Gujarat),
 * UNESCO World Heritage Site, Pavagadh Hill, Jama Masjid, stepwells (Vavs), and Indo-Islamic architecture.
 */

const CHAMPANER_INFO = {
    id: "champaner-pavagadh",
    title: "Champaner-Pavagadh Archaeological Park",
    location: "Panchmahal District, Gujarat, India",
    elevation: "800m Volcanic Hill (Pavagadh) rising above fertile plains",
    unescoStatus: "UNESCO World Heritage Site (Inscribed 2004)",
    historicalEra: "8th to 16th Century CE (Chauhan Rajputs & Gujarat Sultanate)",
    architecturalSignificance: "Only complete and unchanged Islamic pre-Mughal city in India",
    quickStats: [
        { label: "UNESCO Status", value: "World Heritage (2004)", icon: "🏛️" },
        { label: "Hill Elevation", value: "800m Pavagadh", icon: "⛰️" },
        { label: "Historical Span", value: "8th–16th Century", icon: "⏳" },
        { label: "Crown Jewel", value: "Jama Masjid (1513)", icon: "🕌" },
        { label: "Water Heritage", value: "Heli & Gebanshah Vavs", icon: "💧" },
        { label: "Location", value: "Panchmahal, Gujarat", icon: "📍" }
    ]
};

const MONUMENTAL_STRUCTURES = [
    {
        name: "Jama Masjid of Champaner",
        builtBy: "Sultan Mahmud Begada (1513 CE)",
        category: "Indo-Islamic Sacred Architecture",
        description: "Considered one of the finest mosques in Western India, featuring a grand central dome, 172 intricately carved pillars, 30m high fluted minarets, and delicate stone jali lattice work.",
        icon: "🕌"
    },
    {
        name: "Kalika Mata Temple (Pavagadh Summit)",
        builtBy: "Ancient Hindu Monarchs (10th–11th Century)",
        category: "Shakti Peetha Temple",
        description: "Ancient hill shrine perched at the apex of Pavagadh Hill (762m), revered as one of the 51 Shakti Peethas where the right toe of Sati is believed to have fallen.",
        icon: "🛕"
    },
    {
        name: "Sahar ki Masjid & Kevada Masjid",
        builtBy: "Gujarat Sultanate (15th–16th Century)",
        category: "Royal Precinct Mosques",
        description: "Private royal mosque complexes situated near the royal citadel featuring five hemispherical domes, lotus bud motifs, and floral mihrab reliefs.",
        icon: "✨"
    },
    {
        name: "Helical Stepwell (Heli Vav)",
        builtBy: "16th Century Sultanate Engineers",
        category: "Hydraulic Engineering",
        description: "A 16-meter diameter spiral stepped well constructed from dressed sandstone, illustrating advanced rain water harvesting in arid terrain.",
        icon: "🌀"
    },
    {
        name: "Citadel & Fortification Gates (Atak & Makai Gate)",
        builtBy: "Khichi Chauhans & Mahmud Begada",
        category: "Defensive Architecture",
        description: "Multi-layered defensive bastions and arched gateways ascending the ridge, including Atak Gate, Makai Gate, and the massive Citadel (Bhadra).",
        icon: "🛡️"
    }
];

const TIMELINE_EVENTS = [
    { year: "8th Century CE", title: "Founding by Vanraj Chavda", description: "King Vanraj Chavda of the Chavda dynasty establishes Champaner, naming it after his general Champa." },
    { year: "1300 CE", title: "Khichi Chauhan Rule on Pavagadh", description: "The Khichi Chauhan Rajputs fortify Pavagadh Hill and build palaces and temples on the summit." },
    { year: "1484 CE", title: "Conquest by Sultan Mahmud Begada", description: "Mahmud Begada captures Pavagadh after a 20-month siege, rechristens the city Muhammadabad, and makes it capital of Gujarat." },
    { year: "1513 CE", title: "Completion of the Grand Jama Masjid", description: "The magnificent Jama Masjid of Champaner is completed, standing as the apex of Gujarat Sultanate architecture." },
    { year: "1535 CE", title: "Mughal Invasion & Abandonment", description: "Emperor Humayun sacks Champaner; the capital shifts back to Ahmedabad, preserving the medieval city in pristine state." },
    { year: "2004 CE", title: "UNESCO World Heritage Inscription", description: "Champaner-Pavagadh Archaeological Park is inscribed as a UNESCO World Heritage Site." }
];

const REFERENCES = [
    { text: "Archaeological Survey of India (ASI) — Champaner-Pavagadh Archaeological Park Guide.", link: "https://asi.nic.in" },
    { text: "UNESCO World Heritage Centre — Champaner-Pavagadh Archaeological Park (No. 1101).", link: "https://whc.unesco.org" },
    { text: "Burton-Page, John (2008). Indian Islamic Architecture: Forms and Typologies. Brill.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CHAMPANER_INFO, MONUMENTAL_STRUCTURES, TIMELINE_EVENTS, REFERENCES };
}
