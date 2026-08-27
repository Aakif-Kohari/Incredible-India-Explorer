/**
 * durgavati-data.js
 * Rani Durgavati & Gond Kingdom of Garha-Katanga Dataset — 16th Century Central India
 */

const DURGAVATI_PROFILE_STATS = {
    name: "Rani Durgavati",
    title: "Regent Queen of the Gond Kingdom of Garha-Katanga",
    reignPeriod: "c. 1550 – 1564 CE",
    capital: "Singorgarh Fort & Chauragarh Fort (Madhya Pradesh)",
    lineage: "Chandel Rajput Dynasty (Daughter of King Salbahan of Kalinjar)",
    spouse: "Dalpat Shah (Gond Prince, Son of King Sangram Shah)",
    son: "Bir Narayan (Minor Sovereign King of Garha-Katanga)",
    opponents: "Baz Bahadur (Sultan of Malwa), Asaf Khan (Mughal Governor of Kara-Manikpur)",
    outcome: "Decisive defense of Gondwana; repelled Malwa invasions; constructed Jabalpur public reservoirs; chose death over surrender at Narrai Valley."
};

const DURGAVATI_HIGHLIGHTS = [
    {
        id: "chandel-gond-alliance",
        title: "Chandel-Gond Royal Alliance",
        category: "Dynastic Marriage",
        icon: "👑",
        description: "Married Dalpat Shah in 1542 CE, uniting the ancient Chandel Rajput dynasty of Kalinjar with the Gond rulers of Garha-Katanga."
    },
    {
        id: "public-reservoirs",
        title: "Civic Reservoirs of Jabalpur",
        category: "Civic Architecture",
        icon: "💧",
        description: "Commissioned major public water management systems near Jabalpur, including the famous Ranital, Cherital, and Adhartal reservoirs."
    },
    {
        id: "repelling-baz-bahadur",
        title: "Defeat of Baz Bahadur of Malwa",
        category: "Military Defense",
        icon: "⚔️",
        description: "Successfully organized the defense of Gondwana against the cavalry invasions launched by Baz Bahadur, the Sultan of neighboring Malwa."
    },
    {
        id: "narrai-stand",
        title: "Final Stand at Narrai Valley",
        category: "Valiant Sacrifice",
        icon: "🛡️",
        description: "Led her troops in armor on her elephant Sarman against Asaf Khan's Mughal artillery; committed suicide to avoid imperial capture."
    }
];

const DURGAVATI_SECTIONS = [
    {
        id: "early-life",
        title: "Early Life & Chandel Rajput Ancestry",
        eyebrow: "Origins & Lineage",
        summary: "Rani Durgavati was born on October 5, 1524 CE at the famous Kalinjar Fort, a member of the Chandel Rajput clan.",
        details: [
            "Kalinjar Birth: Born to King Salbahan of Kalinjar, the ruler of a Chandel clan famed for building the Khajuraho temples.",
            "Martial Education: Trained in archery, horse riding, swordsmanship, and political diplomacy at Kalinjar.",
            "Marriage to Dalpat Shah: Married Dalpat Shah, the eldest son of Gond King Sangram Shah, in 1542 CE. This marriage cemented a strategic alliance between Rajput and Gond rulers."
        ]
    },
    {
        id: "garha-katanga",
        title: "The Gond Kingdom of Garha-Katanga",
        eyebrow: "Kingdom & Wealth",
        summary: "Garha-Katanga (or Garha-Mandla) was a prosperous and powerful Gond kingdom in central India.",
        details: [
            "Sangram Shah's Empire: Dalpat Shah's father, Sangram Shah (r. c. 1480–1541 CE), had expanded the kingdom to include 52 forts (garhs) across Central India.",
            "Commercial Wealth: The kingdom sat on major trade routes. According to Mughal accounts, it was exceptionally wealthy, with taxes paid in gold, silver, and valuable elephants.",
            "Capital Relocation: Dalpat Shah established Singorgarh Fort as his primary seat, which Rani Durgavati later fortified."
        ]
    },
    {
        id: "administration-rule",
        title: "Rule, Regency & Administrative Achievements",
        eyebrow: "Governance & Statecraft",
        summary: "Following Dalpat Shah's death in 1550 CE, Rani Durgavati assumed the regency on behalf of her young son Bir Narayan.",
        details: [
            "Strategic Capitals: She shifted the capital from Singorgarh to Chauragarh Fort on the Satpura Range to improve defense against border invasions.",
            "Water Management: Built public reservoirs including Ranital, Cherital, and Adhartal near Jabalpur to secure irrigation and city water supplies.",
            "Religious Patronage: Maintained religious harmony and patronized scholars, granting lands to temples and sponsoring educational academies."
        ]
    },
    {
        id: "mughal-expansion",
        title: "Mughal Ambitions & The Asaf Khan Campaign",
        eyebrow: "Imperial Threat",
        summary: "In 1564 CE, Mughal Emperor Akbar ordered the annexation of Garha-Katanga to secure its wealth and strategic elephants.",
        details: [
            "Asaf Khan's Force: General Asaf Khan, the Mughal governor of Kara-Manikpur, marched south with a massive imperial vanguard.",
            "Gond Mobilization: Refusing to submit to imperial vassalage, Rani Durgavati called upon her feudal chiefs and mobilized her defensive lines.",
            "Counsel of Ministers: Despite warnings of Mughal military superiority, she declared that dying with honor was preferable to living under subjugation."
        ]
    },
    {
        id: "battle-narrai",
        title: "The Battle of Narrai & Final Resistance",
        eyebrow: "The Last Stand",
        summary: "The final battle was fought in 1564 CE in the Narrai Valley, a narrow pass near Jabalpur.",
        details: [
            "First Day Success: Rani Durgavati positioned her forces in the narrow valley bounded by the Narmada River. Her local troops successfully repelled the first Mughal vanguard charge.",
            "Imperial Artillery: On the second day, Asaf Khan brought up heavy artillery. Her young son, Crown Prince Bir Narayan, fought bravely but was severely wounded and carried to Chauragarh Fort.",
            "Sacrifice for Honor: Struck by arrows in the ear and neck, and facing imminent capture, Rani Durgavati drew her own dagger and took her life on June 24, 1564 CE."
        ]
    }
];

const DURGAVATI_EVIDENCE_VS_RETELLING = [
    {
        topic: "Tactical Command and Leadership",
        historicalEvidence: "Contemporary Mughal logs in the Akbarnama record that Rani Durgavati actively planned the defense, chose the bottlenecked Narrai defile to neutralize Mughal numbers, and rode her elephant Sarman in full armor directly into battle.",
        popularRetelling: "Popular legends and theater plays portray her wielding magical weapons, executing single-handed duels against Asaf Khan, and single-handedly routing entire Mughal battalions with minor peasant forces."
    },
    {
        topic: "Wealth of the Garha-Katanga Realm",
        historicalEvidence: "Abul Fazl's Akbarnama states that the kingdom of Garha-Katanga was extremely prosperous, containing about 70,000 inhabited villages, and that the victorious Mughal army took an immense booty of gold, coins, jewelry, and over a thousand elephants.",
        popularRetelling: "Later bardic traditions exaggerate the kingdom's wealth, claiming that the streets of Jabalpur and Chauragarh were paved with gold and that domestic pots were made entirely of solid silver."
    },
    {
        topic: "The Siege of Chauragarh Fort",
        historicalEvidence: "Following Rani Durgavati's death, Asaf Khan marched to the strategic fortress of Chauragarh. The young prince Bir Narayan defended the fort but died in battle, after which the inhabitants performed Jauhar.",
        popularRetelling: "Some romanticized modern retellings omit the subsequent siege of Chauragarh, presenting Rani Durgavati's death as the immediate end of the conflict, or claiming she survived to retake the fort later."
    }
];

const DURGAVATI_TIMELINE = [
    {
        year: "October 5, 1524 CE",
        title: "Birth at Kalinjar Fort",
        description: "Born to the Chandel Rajput King Salbahan of Kalinjar in modern-day Uttar Pradesh."
    },
    {
        year: "1542 CE",
        title: "Marriage to Dalpat Shah",
        description: "Married Dalpat Shah, the eldest son of Gond King Sangram Shah, uniting the Rajput and Gond royal houses."
    },
    {
        year: "c. 1550 CE",
        title: "Ascension to Regency",
        description: "Dalpat Shah passes away; Rani Durgavati assumes the regency of Garha-Katanga on behalf of minor son Bir Narayan."
    },
    {
        year: "c. 1556 CE",
        title: "Repelled Malwa Invasions",
        description: "Defeated Sultan Baz Bahadur of Malwa's forces when they attempted to invade the Gondwana frontier."
    },
    {
        year: "June 24, 1564 CE",
        title: "Battle of Narrai and Demise",
        description: "Faced the Mughal army under Asaf Khan at the Narrai Valley. Died in battle, preferring death to surrender."
    }
];

const DURGAVATI_SOURCES = [
    {
        citation: "Abu'l-Fazl ibn Mubarak. The Akbarnama (History of Akbar). Translated by Henry Beveridge. Asiatic Society of Bengal, 1897-1921.",
        notes: "Primary Mughal account recording the imperial campaign of Asaf Khan against Garha-Katanga, detailing the wealth of Gondwana and Rani Durgavati's final defense."
    },
    {
        citation: "Tripathi, K. B. History of Gondwana: Political and Cultural Study of the Gond Dynasty of Garha-Mandla. Central Historical Society, 1982.",
        notes: "Detailed historical volume on the Gond rulers, their forts (Singorgarh, Chauragarh), and administrative reforms."
    },
    {
        citation: "Archaeological Survey of India (ASI). Reports on Singorgarh Fort (Damoh) and Chauragarh Fort (Narsinghpur) Excavations.",
        notes: "Archaeological documentation of Gond fortifications, structural layout of defensive walls, and reservoir remains."
    },
    {
        citation: "Russell, R. V., and Hira Lal. The Tribes and Castes of the Central Provinces of India. Macmillan and Co., 1916.",
        notes: "Provides sociological and historical context on the Gond kingdoms of Central India, including regional folk legends and commemorative traditions."
    }
];
