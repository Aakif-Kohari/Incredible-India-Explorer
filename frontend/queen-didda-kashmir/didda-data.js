/**
 * didda-data.js
 * Queen Didda of Kashmir Dataset — Medieval Kashmir (c. 924 – 1003 CE)
 */

const DIDDA_PROFILE_STATS = {
    name: "Queen Didda of Kashmir",
    title: "Sovereign Queen & Regent of Kashmir",
    reignPeriod: "c. 958 – 1003 CE (Regent: 958–980 CE; Direct Sovereign: 980–1003 CE)",
    dynasty: "Bridged Utpala Dynasty & Founded Lohara Succession",
    lineage: "Lohara Royal Family (Father: Simharaja of Lohara; Maternal Grandfather: Bhima Shahi of Kabul/Udabhandapura)",
    spouse: "King Ksemagupta of Kashmir (r. 950–958 CE)",
    capital: "Srinagar / Diddapura, Kashmir Valley",
    numismaticLegacy: "Issued joint 'Di-Ksema' coins and direct 'Sri Didda' copper/silver coinage",
    succession: "Appointed nephew Samgramaraja of Lohara as Yuvaraja, establishing the Lohara Dynasty"
};

const DIDDA_HIGHLIGHTS = [
    {
        id: "sovereign-ruler",
        title: "45 Years of Political Dominance",
        category: "Statecraft",
        icon: "👑",
        description: "Governed Kashmir for over four decades as Regent (958–980 CE) and Direct Sovereign Queen (980–1003 CE), maintaining regional stability during turbulent times."
    },
    {
        id: "lohara-foundation",
        title: "Architect of Lohara Dynasty",
        category: "Dynastic Legacy",
        icon: "🏰",
        description: "Bridged the Utpala line and strategically engineered the peaceful accession of her nephew Samgramaraja, founding Kashmir's famous Lohara Dynasty."
    },
    {
        id: "shahi-ancestry",
        title: "Kabul Shahi & Lohara Bloodline",
        category: "Lineage",
        icon: "🛡️",
        description: "Daughter of King Simharaja of Lohara and granddaughter of King Bhima Shahi of Kabul/Udabhandapura, uniting formidable Northwest Himalayan royal houses."
    },
    {
        id: "numismatics",
        title: "Di-Ksema & Sri Didda Coinage",
        category: "Archeological Evidence",
        icon: "🪙",
        description: "Historical coinage bearing 'Di-Ksema' (joint issue with husband Ksemagupta) and 'Sri Didda' (solo reign) confirms her official royal status."
    }
];

const DIDDA_CHAPTERS = [
    {
        id: "background",
        title: "Who Was Didda? Ancestry & Marriage",
        eyebrow: "Origins & Royal Lineage",
        summary: "Queen Didda was born into the Lohara royal family (Poonch region) around 924 CE. Her mother was the daughter of King Bhima Shahi, the illustrious ruler of the Hindu Shahi dynasty of Kabul and Udabhandapura.",
        details: [
            "Lohara Lineage: Born as princess of Lohara, a hill kingdom guarding western passes into the Kashmir Valley.",
            "Shahi Connection: Her maternal grandfather Bhima Shahi built the sacred Bhimakeshava temple in Kashmir and provided high-prestige Shahi alliances.",
            "Marriage to Ksemagupta: Married King Ksemagupta of Kashmir (Utpala Dynasty) around 950 CE. Ksemagupta was so devoted and politically influenced by her that court mints issued coins inscribed with 'Di-Ksema' (Didda-Ksemagupta)."
        ]
    },
    {
        id: "kashmir-before",
        title: "Kashmir Before Her Rule",
        eyebrow: "10th-Century Geopolitics",
        summary: "Before Didda's rise, 10th-century Kashmir suffered from severe court rivalries, corrupt fiscal officials (diviras), and insubordinate feudal barons (Damaras).",
        details: [
            "Feudal Damara Barons: Landed military chieftains who repeatedly threatened royal authority in the valley.",
            "Court Factions: Corrupt prime ministers and rival royal factions frequently engineered palace coups.",
            "Fragile Economy: Trade routes required firm military governance to protect alpine passes connecting the Punjab plains with Central Asia."
        ]
    },
    {
        id: "rise-and-regency",
        title: "Rise to Power & Three Regencies",
        eyebrow: "Regency Period (958 – 980 CE)",
        summary: "Upon Ksemagupta's death in 958 CE, Didda assumed regency for her young son Abhimanyu II. Over the next 22 years, she crushed minister rebellions and preserved the crown.",
        details: [
            "First Regency (958–972 CE): Governed as regent for her infant son Abhimanyu II. When rival ministers Phalguna and Mahiman revolted, she used diplomacy and military force to secure court control.",
            "Tragic Loss & Continued Regencies (972–980 CE): Following Abhimanyu's early death from fever, Didda served as regent for her young grandsons—Nandigupta, Tribhuvanagupta, and Bhimagupta.",
            "Subduing the Damaras: Neutralised rebellious Damara chieftains by balancing financial incentives with decisive administrative discipline."
        ]
    },
    {
        id: "direct-rule",
        title: "Direct Sovereign Rule (980 – 1003 CE)",
        eyebrow: "Monarchic Sovereign",
        summary: "In 980 CE, Didda formally ascended the throne as Direct Sovereign Queen of Kashmir, ruling with full monarchic authority until her death in 1003 CE.",
        details: [
            "Elevation of Commoners: Promoted capable non-noble administrators, including Prime Minister Tunga (of Khasa origin), who reorganised Kashmir's army.",
            "Civic & Religious Foundations: Built the town of Diddapura, established mathas for scholars, and constructed temples dedicated to Vishnu and Shiva.",
            "Economic & Administrative Stability: Maintained trade security and fiscal order across the Kashmir Valley."
        ]
    },
    {
        id: "lohara-succession",
        title: "Lohara Dynasty Connection & Succession",
        eyebrow: "Dynastic Transition",
        summary: "Recognising the need for a strong successor, Didda tested her nephews and selected Samgramaraja (son of her brother Udayaraja of Lohara) as Yuvaraja (heir-apparent).",
        details: [
            "Testing the Heirs: Kalhana records that Didda evaluated her nephews' composure and judgment under pressure before choosing Samgramaraja.",
            "Peaceful Accession (1003 CE): Upon Didda's death in 1003 CE, Samgramaraja peacefully ascended the throne of Kashmir without civil war.",
            "Lohara Dynasty Resilience: The Lohara Dynasty founded by her succession ruled Kashmir until 1320 CE and successfully repelled the North-Western invasions of Mahmud of Ghazni."
        ]
    }
];

const DIDDA_EVIDENCE_VS_PORTRAYAL = [
    {
        topic: "Physical Impairment",
        historicalEvidence: "Kalhana's Rajatarangini (Book VI) records that Didda had a physical limp/impairment in her leg (referred to as 'khena'), requiring a porter named Valga to carry her during childhood activities.",
        literaryPortrayal: "Later popular fiction and dramatic retellings exaggerate her physical limp into supernatural endurance or villainous physical tropes, contrasting her physical weakness with ruthless political drive."
    },
    {
        topic: "Political Methods & Executions",
        historicalEvidence: "Primary numismatic coins ('Sri Didda') and Rajatarangini confirm she executed or exiled rebel ministers (such as Mahiman and Bhimagupta) and suppressed Damara feudal uprisings to preserve state stability.",
        literaryPortrayal: "Later folklore dramatises her as a dark sorceress or unfeeling monarch, overlooking the context of 10th-century medieval palace coups where survival demanded decisive executive action."
    },
    {
        topic: "Dynastic Succession",
        historicalEvidence: "Archival records confirm she peacefully transitioned power to her nephew Samgramaraja in 1003 CE, founding the Lohara Dynasty that defended Kashmir for over three centuries.",
        literaryPortrayal: "Popular legends focus primarily on court intrigue rather than her strategic statecraft in securing long-term dynastic continuity for Kashmir."
    }
];

const DIDDA_TIMELINE = [
    {
        year: "c. 924 CE",
        title: "Birth of Princess Didda",
        description: "Born to King Simharaja of Lohara (Poonch region) and granddaughter of King Bhima Shahi of Kabul/Udabhandapura."
    },
    {
        year: "c. 950 CE",
        title: "Marriage to King Ksemagupta",
        description: "Marries King Ksemagupta of Kashmir (Utpala Dynasty). Royal mints issue joint 'Di-Ksema' coinage."
    },
    {
        year: "958 CE",
        title: "Death of Ksemagupta & 1st Regency",
        description: "Ksemagupta dies; Didda becomes Regent for infant son Abhimanyu II and suppresses initial minister revolts."
    },
    {
        year: "972 – 980 CE",
        title: "Regency for Grandsons",
        description: "Serves as Regent for grandsons Nandigupta, Tribhuvanagupta, and Bhimagupta after Abhimanyu II's early death."
    },
    {
        year: "980 CE",
        title: "Ascension as Direct Sovereign Queen",
        description: "Formally assumes full monarchic sovereignty over Kashmir. Mints 'Sri Didda' copper and silver coinage."
    },
    {
        year: "c. 985 – 995 CE",
        title: "Reorganisation & Construction",
        description: "Appoints Tunga as Prime Minister; builds Diddapura, mathas, and temples across Kashmir."
    },
    {
        year: "1003 CE",
        title: "Lohara Succession & Peaceful Passing",
        description: "Selects nephew Samgramaraja of Lohara as Yuvaraja; passes away peacefully. Samgramaraja ascends, founding the Lohara Dynasty."
    }
];

const DIDDA_SOURCES = [
    {
        citation: "Kalhana. Rajatarangini: A Chronicle of the Kings of Kasmir. Translated by M.A. Stein. Vol. 1 & 2, Motilal Banarsidass, 1900 (Reprint 1989).",
        notes: "Book VI provides the primary near-contemporary historical account of Didda's regency, direct reign, court politics, and Lohara succession."
    },
    {
        citation: "Cunningham, Alexander. Coins of Medieval India: From the Seventh Century Down to the Muhammadan Conquests. London, 1894.",
        notes: "Documents numismatic evidence including 'Di-Ksema' joint issues and 'Sri Didda' copper coinage from 10th-century Kashmir."
    },
    {
        citation: "Ray, Sunil Chandra. Early History and Culture of Kashmir. Munshiram Manoharlal Publishers, 1970.",
        notes: "Provides scholarly analysis of 10th-century Kashmir social structure, Damara feudal lords, and administrative reorganisation under Queen Didda."
    },
    {
        citation: "Bamzai, P.N.K. Culture and Political History of Kashmir: Volume 1 — Ancient Kashmir. M.D. Publications, 1994.",
        notes: "Detailed historical context on the Utpala-Lohara transition, Shahi matrimonial alliances, and regional trade routes."
    }
];
