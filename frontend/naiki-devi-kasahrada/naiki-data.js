/**
 * naiki-data.js
 * Queen Naiki Devi & Battle of Kasahrada Dataset — Chaulukya Dynasty, 12th Century Gujarat
 */

const NAIKI_PROFILE_STATS = {
    name: "Queen Naiki Devi",
    title: "Queen Regent of the Chaulukya (Solanki) Dynasty",
    battleEvent: "Battle of Kasahrada (1178 CE)",
    battleLocation: "Kasahrada (modern Kayadra / Gadaraghatta Pass, near Mount Abu, Sirohi district, Rajasthan/Gujarat border)",
    dynasty: "Chaulukya (Solanki) Dynasty of Anahilavada (Patan, Gujarat)",
    lineage: "Kadamba Royal Lineage (Daughter of Kadamba Chief Paramardin of Goa/Banavasi)",
    spouse: "King Ajayapala of Gujarat (r. 1171–1175 CE)",
    son: "King Mularaja II (Bala Mularaja, r. 1175–1178/1179 CE)",
    opponent: "Shihab ad-Din Muhammad Ghori (Ghurid Invader)",
    outcome: "Decisive Chaulukya victory; Ghori's forces repelled and forced to retreat across Thar Desert to Multan"
};

const NAIKI_HIGHLIGHTS = [
    {
        id: "kasahrada-victory",
        title: "Defeat of Ghori at Kasahrada (1178 CE)",
        category: "Military Triumph",
        icon: "🛡️",
        description: "Organised the Chaulukya resistance at Gadaraghatta pass near Mount Abu, inflicting one of Muhammad Ghori's earliest major defeats in India."
    },
    {
        id: "queen-regent",
        title: "Regency for Mularaja II",
        category: "Statecraft",
        icon: "👑",
        description: "Assumed regency upon the death of King Ajayapala in 1175 CE, governing on behalf of her young minor son King Mularaja II (Bala Mularaja)."
    },
    {
        id: "rajput-coalition",
        title: "Rajput Alliance Coalition",
        category: "Diplomacy",
        icon: "🤝",
        description: "Assembled a powerful regional defensive coalition including the Chahamanas of Naddula and Jalor, and Paramaras of Chandravati."
    },
    {
        id: "kadamba-heritage",
        title: "Kadamba Royal Heritage",
        category: "Lineage",
        icon: "🏰",
        description: "Princess of the ancient Kadamba family of Goa/Banavasi, bringing strong maritime and southern royal alliances to Anahilavada."
    }
];

const NAIKI_SECTIONS = [
    {
        id: "background",
        title: "Naiki Devi & The Chaulukyas of Anahilavada",
        eyebrow: "Origins & Dynasty",
        summary: "Naiki Devi was a Kadamba princess who married King Ajayapala of the Chaulukya (Solanki) dynasty of Gujarat.",
        details: [
            "Kadamba Lineage: Daughter of Paramardin, a chief of the Kadamba dynasty of Goa/Banavasi.",
            "Marriage to Ajayapala: Married Chaulukya King Ajayapala (r. 1171–1175 CE), who ruled the affluent kingdom of Anahilavada (modern Patan, Gujarat).",
            "Mother of Mularaja II: Gave birth to Mularaja II. Upon Ajayapala's death in 1175 CE, Mularaja II ascended the throne as a child, with Naiki Devi becoming Queen Regent."
        ]
    },
    {
        id: "political-context",
        title: "Political Background: 12th-Century Gujarat",
        eyebrow: "Geopolitics & Invasion",
        summary: "In 1178 CE, Ghurid ruler Muhammad Ghori launched an invasion aimed at conquering the rich kingdom of Gujarat by bypassing the Ghaznavid Punjab routes.",
        details: [
            "Desert March: Ghori led his cavalry through Multan and Uch, crossing the formidable Thar Desert to strike northern Gujarat.",
            "Strategic Target: Anahilavada was a prosperous commercial capital linked to international maritime trade ports like Khambhat and Bharuch.",
            "Chaulukya Preparedness: Under Queen Regent Naiki Devi, the Chaulukya court refused to capitulate and mobilized regional feudatory lords."
        ]
    },
    {
        id: "battle-kasahrada",
        title: "The Battle of Kasahrada (1178 CE)",
        eyebrow: "Mountain Defile Encounter",
        summary: "The Chaulukya army engaged Ghori's invasion force at Kasahrada (Kayadra village, Gadaraghatta pass near the base of Mount Abu).",
        details: [
            "Terrain Advantage: The Chaulukya leadership selected the narrow mountain defile near Mount Abu (Chandravati region) to break Ghori's heavy cavalry charge.",
            "Coalition Forces: Joined by feudatory commanders including Kelhanadeva (Chahamana of Naddula), Kirtipala (Chahamana of Jalor), and Dharavarsha (Paramara of Chandravati).",
            "Decisive Outcome: Ghori's forces suffered heavy casualties and retreated back across the Thar desert to Multan. Ghori avoided southern desert invasion routes into India for years thereafter."
        ]
    },
    {
        id: "historical-role",
        title: "Her Historical Role & Statecraft",
        eyebrow: "Regency & Leadership",
        summary: "Historical records credit Naiki Devi with effective statecraft and strategic coalition assembly during her minor son's reign.",
        details: [
            "Executive Authority: Managed the Chaulukya kingdom during a critical political transition following Ajayapala's sudden demise.",
            "Feudatory Alignment: Maintained the loyalty of regional vassal chiefs across southern Rajasthan and northern Gujarat.",
            "Guardian of the Realm: Secured the throne for Mularaja II, who ruled until his death in 1178/1179 CE, succeeded by his brother Bhima II."
        ]
    },
    {
        id: "gujarat-12th-century",
        title: "Gujarat in the 12th Century",
        eyebrow: "Cultural & Economic Golden Age",
        summary: "12th-century Solanki Gujarat was a major center of architecture, Jain literature, and international trade.",
        details: [
            "Architectural Monuments: Age of grand Solanki temple architecture, stepwells (Rani ki Vav), and fortified gateways.",
            "Commercial Prosperity: Wealth generated from overseas trade at ports like Stambhatirtha (Khambhat) supported defensive armies.",
            "Intellectual Center: Scholars like Hemachandra contributed to Sanskrit and Prakrit literature under royal patronage."
        ]
    }
];

const NAIKI_EVIDENCE_VS_RETELLING = [
    {
        topic: "Command of the Battle",
        historicalEvidence: "Near-contemporary texts (Merutunga's Prabandhachintamani, Minhaj-i Siraj's Tabaqat-i Nasiri) and Chaulukya inscriptions (e.g. Kadi copper plates) record that the infant King Mularaja II and his mother/regent defeated the 'Garjanakas' (Ghurid invaders) at the foot of Mount Abu.",
        popularRetelling: "Later bardic legends and modern retellings portray Queen Naiki Devi riding into battle at the head of the army with infant Mularaja II strapped to her back, personally dueling Ghori with sword in hand."
    },
    {
        topic: "Nature of the Forces",
        historicalEvidence: "Primary inscriptions establish that the victory was achieved by a united coalition of Chaulukya troops and regional Rajput feudatories (Paramaras of Chandravati, Chahamanas of Naddula and Jalor).",
        popularRetelling: "Popular fiction frequently depicts the battle as a solitary duel between Naiki Devi and Ghori, downplaying the broader regional Rajput alliance."
    },
    {
        topic: "Tactical Execution",
        historicalEvidence: "Historical geography confirms the battle occurred in the narrow mountain defile of Gadaraghatta near Mount Abu (Kasahrada/Kayadra), forcing Ghori's cavalry into bottlenecked terrain.",
        literaryPortrayal: "Later stories add dramatic flourishes such as war elephants ambushing Ghori's vanguard in mountain caves and Ghori fleeing disguised in civilian robes."
    }
];

const NAIKI_TIMELINE = [
    {
        year: "1171 – 1175 CE",
        title: "Reign of King Ajayapala",
        description: "King Ajayapala rules the Chaulukya kingdom of Anahilavada (Patan); Naiki Devi serves as Queen Consort."
    },
    {
        year: "1175 CE",
        title: "Ascension of Mularaja II & Regency",
        description: "Ajayapala dies; minor son Mularaja II ascends throne with Queen Naiki Devi assuming full regency."
    },
    {
        year: "Early 1178 CE",
        title: "Ghurid March Across Thar Desert",
        description: "Muhammad Ghori invades Multan and Uch, advancing across the desert toward northern Gujarat."
    },
    {
        year: "Late 1178 CE",
        title: "Battle of Kasahrada",
        description: "Chaulukya forces and allied feudatories under Naiki Devi & Mularaja II defeat Ghori at Gadaraghatta pass near Mount Abu."
    },
    {
        year: "1178 – 1179 CE",
        title: "Ghurid Retreat & Succession",
        description: "Ghori retreats to Multan. Young Mularaja II passes away; succeeded by his brother Bhima II."
    }
];

const NAIKI_SOURCES = [
    {
        citation: "Merutunga. Prabandhachintamani (Wishing-Stone of Narratives). Translated by C.H. Tawney. Asiatic Society of Bengal, 1901.",
        notes: "Contains near-contemporary 14th-century Jain historical accounts of the Chaulukya kings of Gujarat, including Mularaja II and Queen Naiki Devi."
    },
    {
        citation: "Minhaj-i Siraj. Tabaqat-i Nasiri: A General History of the Muhammadan Dynasties of Asia. Translated by H.G. Raverty. Asiatic Society of Bengal, 1881.",
        notes: "13th-century Ghurid chronicle recording Muhammad Ghori's defeat at the foot of Mount Abu by the ruler of Nahrwala (Anahilavada) and his mother."
    },
    {
        citation: "Majumdar, Asoke Kumar. Chaulukyas of Gujarat: A Survey of the History and Culture of Gujarat from the Middle of the Tenth to the End of the Thirteenth Century. Bharatiya Vidya Bhavan, 1956.",
        notes: "Definitive modern historical research on Solanki dynasty political history, Mularaja II's regency, and the Battle of Kasahrada."
    },
    {
        citation: "Epigraphia Indica. Archaeological Survey of India (ASI). Various Volumes.",
        notes: "Numismatic and copper-plate inscriptions (including Kadi copper plates of Bhima II) documenting Chaulukya genealogical records."
    }
];
