/**
 * Nalanda Mahavihara Explorer — Data Module
 * Comprehensive dataset covering the ancient Nalanda Mahavihara university (Bihar),
 * Gupta & Pala patrons, the legendary Dharmaganja library, celebrated scholars (Xuanzang, Aryabhata, Nagarjuna),
 * and archaeological remains (Stupa No. 3, Viharas).
 */

const NALANDA_INFO = {
    id: "nalanda-mahavihara",
    title: "Nalanda Mahavihara (Ancient India's Centre of Learning)",
    location: "Nalanda District, Bihar, India",
    operationalEra: "5th Century CE to 1200 CE (Over 700 Years of Scholarship)",
    unescoStatus: "UNESCO World Heritage Site (Inscribed 2016)",
    scale: "Over 10,000 Students & 2,000 Teachers from Across Asia",
    legendaryLibrary: "Dharmaganja (Ratnasagara, Ratnodadhi, Ratnaranjaka)",
    quickStats: [
        { label: "Founded Era", value: "5th Century (Guptas)", icon: "🏛️" },
        { label: "UNESCO Status", value: "World Heritage (2016)", icon: "📜" },
        { label: "Campus Scale", value: "10,000+ Scholars", icon: "🎓" },
        { label: "Grand Library", value: "Dharmaganja (9-Storey)", icon: "📚" },
        { label: "Global Reach", value: "China, Tibet, Korea, Java", icon: "🌏" },
        { label: "Location", value: "Nalanda, Bihar", icon: "📍" }
    ]
};

const CAMPUS_COMPONENTS = [
    {
        name: "Dharmaganja (The Grand Library)",
        category: "Ancient Knowledge Treasury",
        description: "A nine-storey library complex housing hundreds of thousands of sacred manuscripts on philosophy, astronomy, medicine, logic, and mathematics in three massive buildings: Ratnasagara, Ratnodadhi, and Ratnaranjaka.",
        icon: "📚"
    },
    {
        name: "Sariputra Stupa (Temple Site 3)",
        category: "Monumental Architecture",
        description: "The most iconic imposing brick stupa on the campus, built in seven successive layers with corner towers, stucco Buddha figures, and votive stupas honoring Buddha's chief disciple Sariputra.",
        icon: "🛕"
    },
    {
        name: "Monastic Viharas (11 Excavated Monasteries)",
        category: "Residential Architecture",
        description: "Standardized double-storey brick viharas featuring central pillared courtyards, monk study cells with stone beds, drainage channels, lecture podiums, and community kitchens.",
        icon: "🧱"
    },
    {
        name: "Chaitya Temples & Meditation Shrines",
        category: "Sacred Academic Shrines",
        description: "Magnificent prayer halls and brick chaityas decorated with terracotta plaques, granite doorframes, and stone statues of Avalokiteshvara, Manjushri, and Tara.",
        icon: "☸️"
    }
];

const CELEBRATED_SCHOLARS = [
    {
        name: "Xuanzang (Hiuen Tsang)",
        origin: "Tang Dynasty China",
        contribution: "Spent five years studying logic, Sanskrit, and Yogacara Buddhism under Chancellor Shilabhadra; transported 657 sacred Sanskrit manuscripts back to China.",
        icon: "📜"
    },
    {
        name: "Aryabhata",
        origin: "Ancient India (Pataliputra)",
        contribution: "Pioneering mathematician and astronomer who served as the head (Kulapati) of Nalanda; formulated trigonometric functions and heliocentric planetary models.",
        icon: "🌌"
    },
    {
        name: "Nagarjuna",
        origin: "Ancient India (South/Central)",
        contribution: "Founder of the Madhyamaka school of Mahayana Buddhism and master alchemist who expounded the doctrine of Sunyata (Emptiness).",
        icon: "🧘"
    },
    {
        name: "Padmasambhava (Guru Rinpoche)",
        origin: "Oddiyana / Nalanda",
        contribution: "Master of Tantric Buddhism who transmitted Buddhist philosophy from Nalanda to Tibet, establishing the first Tibetan Buddhist monastery at Samye.",
        icon: "⛰️"
    }
];

const TIMELINE_EVENTS = [
    { year: "5th Century CE", title: "Foundation by Kumaragupta I", description: "Gupta Emperor Kumaragupta I (Shakraditya) establishes the first Buddhist monastic college at Nalanda." },
    { year: "7th Century CE", title: "Harsha's Golden Era & Xuanzang", description: "Emperor Harshavardhana provides royal revenue of 100 villages to maintain the university; Xuanzang visits and teaches." },
    { year: "8th–12th Century CE", title: "Pala Imperial Patronage", description: "Pala emperors (Dharampala, Devapala) expand Nalanda, establishing diplomatic ties with Srivijaya Empire of Sumatra." },
    { year: "c. 1200 CE", title: "Destruction by Bakhtiyar Khilji", description: "The vast monastic university and its Dharmaganja library are ransacked and burned, ending seven centuries of continuous academic life." },
    { year: "1915–1937 CE", title: "ASI Archaeological Excavations", description: "Systematic scientific excavations unearth 11 monasteries, 6 temples, and thousands of bronze and stone artifacts." },
    { year: "2016 CE", title: "UNESCO World Heritage Recognition", description: "The Archaeological Site of Nalanda Mahavihara is inscribed as a UNESCO World Heritage Site." }
];

const REFERENCES = [
    { text: "Archaeological Survey of India (ASI) — Nalanda Mahavihara Excavations Guide.", link: "https://asi.nic.in" },
    { text: "Sankalia, H. D. (1934). The University of Nalanda. B. G. Paul & Co., Madras.", link: "#" },
    { text: "UNESCO World Heritage Centre — Archaeological Site of Nalanda Mahavihara at Nalanda, Bihar (No. 1502).", link: "https://whc.unesco.org" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NALANDA_INFO, CAMPUS_COMPONENTS, CELEBRATED_SCHOLARS, TIMELINE_EVENTS, REFERENCES };
}
