/**
 * Kirti Chakra Explorer — Comprehensive Data Module
 * Dataset covering Kirti Chakra history, silver medal design, eligibility,
 * heroic acts categories, key recipients, timeline, and interactive FAQs.
 */

const KC_INFO = {
    id: "kirti-chakra",
    name: "Kirti Chakra Explorer",
    fullTitle: "India's Second-Highest Peacetime Gallantry Award",
    establishedDate: "4 January 1952 (Instituted as Ashoka Chakra Class II, renamed Kirti Chakra in 1967)",
    totalRecipients: 480,
    posthumousCount: 210,
    designer: "Armed Forces Honours Bureau & India Mint",
    symbolism: "Ashoka Chakra motif surrounded by a lotus wreath on silver disc, honoring conspicuous peacetime bravery",
    ribbonColor: "Green silk ribbon divided into three equal parts by two orange vertical lines (32 mm width)",
    quickStats: [
        { label: "Total Recipients", value: "480 Honorees", icon: "🎖️" },
        { label: "Peacetime Valour Tier", value: "2nd Peacetime Award", icon: "🌿" },
        { label: "Posthumous Awards", value: "210 Citations", icon: "🌹" },
        { label: "Civilian & Police", value: "Open to All", icon: "🏛️" },
        { label: "Medal Metal", value: "Standard Silver", icon: "🛡️" },
        { label: "Ribbon Motif", value: "2 Orange Stripes", icon: "🎗️" }
    ]
};

const KC_HISTORY = {
    overview: "The Kirti Chakra is India's second-highest peacetime gallantry decoration, awarded for conspicuous gallantry other than in the face of the enemy.",
    evolution: "Originally established on 4 January 1952 as the 'Ashoka Chakra, Class II', it was renamed the 'Kirti Chakra' in 1967 to establish distinct identity across the peacetime awards hierarchy.",
    peacetimeSignificance: "It recognizes outstanding valour performed during counter-insurgency operations, anti-naxal actions, civil defense emergency rescues, and internal security duties across India."
};

const KC_ELIGIBILITY = {
    title: "Eligibility Criteria",
    description: "The Kirti Chakra is open to all citizens across military, police, emergency services, and civilian life.",
    categories: [
        { title: "Armed Forces Personnel", detail: "Officers, JCOs, and NCOs of the Army, Navy, Air Force, and Reserve Forces." },
        { title: "Paramilitary & Police Forces", detail: "Members of CRPF, BSF, ITBP, CISF, State Police forces, and Railway Protection Force." },
        { title: "Civilian Personnel", detail: "Men and women from all walks of civilian life who display exceptional courage to save lives or defend property." },
        { title: "Defense Civilians", detail: "Civilian staff working with Armed Forces establishments, Ordnance Factories, and Border Roads Organisation." }
    ]
};

const KC_MEDAL_DESIGN = {
    shape: "Circular silver medal, 1.375 inches in diameter.",
    obverse: "Embossed replica of the Ashoka Chakra in the center, surrounded by a lotus wreath with a raised rim.",
    reverse: "Embossed words 'KIRTI CHAKRA' in both Hindi ('कीर्ति चक्र') and English, separated by two lotus flowers.",
    ribbon: "Green silk ribbon, 32 mm wide, divided into three equal parts by two orange vertical stripes."
};

const KC_HEROIC_ACTS = [
    {
        title: "Counter-Insurgency Operations",
        icon: "⚡",
        description: "Engaging fortified terrorist hideouts in urban centers or forested terrain to protect civilian lives."
    },
    {
        title: "High-Altitude Medical & Rescue",
        icon: "🏔️",
        description: "Executing high-risk medical assistance and fire evacuations at extreme altitudes like Siachen."
    },
    {
        title: "Anti-Naxal & Internal Security",
        icon: "🛡️",
        description: "Defending remote outposts and ambushes against heavy hostile attacks in dense jungle sectors."
    },
    {
        title: "Civilian Rescue & Bravery",
        icon: "🤝",
        description: "Saving fellow citizens during armed dacoit attacks, flood disasters, or industrial fires."
    }
];

const KC_RECIPIENTS = [
    {
        id: "anuj-sood",
        name: "Major Anuj Sood",
        organization: "21st Battalion, Rashtriya Rifles / Brigade of Guards",
        rank: "Major",
        year: 2020,
        posthumous: true,
        citation: "Displayed conspicuous bravery during Handwara operation in J&K, entering a civilian house to rescue civilian hostages held by armed terrorists.",
        famousWords: "'Duty before self.' — Sacrificed his life while shielding civilians from terrorist gunfire inside a residential compound.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Major_Anuj_Sood.jpg/800px-Major_Anuj_Sood.jpg"
    },
    {
        id: "anshuman-singh",
        name: "Captain Anshuman Singh",
        organization: "Army Medical Corps (AMC) / 26 Punjab",
        rank: "Captain",
        year: 2024,
        posthumous: true,
        citation: "Rescued fellow soldiers during a catastrophic ammunition and shelter fire at Siachen Glacier (17,000 ft), going back into burning structures to retrieve medical supplies.",
        famousWords: "Re-entered burning fibreglass shelter at sub-zero temperatures to rescue trapped comrades.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Capt_Anshuman_Singh.jpg/800px-Capt_Anshuman_Singh.jpg"
    },
    {
        id: "prakash-jadhav",
        name: "Sapper Prakash Jadhav",
        organization: "1st Battalion, Engineer Regiment / 55 Rashtriya Rifles",
        rank: "Sapper",
        year: 2019,
        posthumous: true,
        citation: "Neutralized a terrorist at point-blank range in Shopian district, Kashmir. Shielded his buddy soldier while sustaining fatal gunfire wounds.",
        famousWords: "Charged terrorist position to protect his lead assault team partner.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sapper_Prakash_Jadhav.jpg/800px-Sapper_Prakash_Jadhav.jpg"
    },
    {
        id: "sanjeev-kumar-kc",
        name: "Subedar Sanjeev Kumar",
        organization: "4th Battalion, Parachute Regiment (Special Forces)",
        rank: "Subedar",
        year: 2020,
        posthumous: true,
        citation: "Led Special Forces squad in close-quarter battle against infiltrating terrorists in Keran sector along the LOC, engaging in hand-to-hand combat.",
        famousWords: "Eliminated heavily armed infiltrators under heavy snow conditions.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Subedar_Sanjeev_Kumar.jpg/800px-Subedar_Sanjeev_Kumar.jpg"
    },
    {
        id: "pramod-kumar",
        name: "Commandant Pramod Kumar",
        organization: "Central Reserve Police Force (CRPF) 49th Battalion",
        rank: "Commandant",
        year: 2017,
        posthumous: true,
        citation: "Unfurled the Tricolour on Independence Day morning in Srinagar, then immediately rushed to Nowhatta square to engage terrorists attacking security forces.",
        famousWords: "Led CRPF counter-attack minutes after hoisting National Flag on August 15.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Commandant_Pramod_Kumar.jpg/800px-Commandant_Pramod_Kumar.jpg"
    }
];

const KC_TIMELINE = [
    { year: "1952", title: "Instituted as Class II", text: "Established on 4 January 1952 as Ashoka Chakra Class II by President Dr. Rajendra Prasad." },
    { year: "1967", title: "Renamed Kirti Chakra", text: "Formally reclassified as Kirti Chakra alongside Ashoka Chakra and Shaurya Chakra." },
    { year: "2000", title: "Expansion of Police Honors", text: "Increased conferments for CRPF, BSF, and State Police personnel fighting internal security threats." },
    { year: "2020", title: "Handwara Counter-Terror Action", text: "Major Anuj Sood posthumously awarded Kirti Chakra for hostage rescue." },
    { year: "2024", title: "Siachen Heroism Recognized", text: "Captain Anshuman Singh conferred Kirti Chakra for selfless sacrifice at Siachen Glacier." }
];

const KC_FAQS = [
    {
        question: "What is the difference between Kirti Chakra and Shaurya Chakra?",
        answer: "Kirti Chakra is India's second-highest peacetime gallantry award, while Shaurya Chakra is the third-highest. Kirti Chakra is awarded for higher level of conspicuous bravery."
    },
    {
        question: "Are civilians eligible for the Kirti Chakra?",
        answer: "Yes, civilians of all occupations, including women and youth, are fully eligible for the Kirti Chakra for acts of courage in saving lives or defending property."
    },
    {
        question: "Can a recipient win the Kirti Chakra more than once?",
        answer: "Yes, if a recipient again performs an act of gallantry matching the criteria, a Bar is awarded to be attached to the ribbon."
    },
    {
        question: "What are the monetary allowances associated with Kirti Chakra?",
        answer: "Recipients or their surviving spouses receive a monthly pension allowance from the Central Government, along with state government cash rewards and travel benefits."
    },
    {
        question: "How is the ribbon designed?",
        answer: "The ribbon is green silk, 32 mm wide, divided into three equal parts by two orange vertical lines."
    },
    {
        question: "Who presents the award?",
        answer: "The President of India presents the Kirti Chakra at the annual Defence Investiture Ceremony held at Rashtrapati Bhavan."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KC_INFO, KC_HISTORY, KC_ELIGIBILITY, KC_MEDAL_DESIGN, KC_HEROIC_ACTS, KC_RECIPIENTS, KC_TIMELINE, KC_FAQS };
}
