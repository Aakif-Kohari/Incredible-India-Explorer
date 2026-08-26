/**
 * rudrama-data.js
 * Queen Rudrama Devi & Kakatiya Dynasty Dataset — 13th Century Deccan
 */

const RUDRAMA_PROFILE_STATS = {
    name: "Queen Rudrama Devi",
    title: "Sovereign Queen of the Kakatiya Dynasty",
    stateRole: "Designated Rudradeva Maharaja (Sovereign Monarch)",
    dynasty: "Kakatiya Dynasty of Orugallu (Warangal, Telangana)",
    lineage: "Kakatiya Lineage (Daughter of Emperor Ganapati Deva)",
    spouse: "Virabhadra (Eastern Chalukya Prince of Nidadavolu)",
    daughters: "Mummadamma, Rudrama, and Subhadrama",
    successor: "Prataparudra II (Bala Prataparudra, Grandson, r. 1289–1323 CE)",
    opponents: "Mahadeva (Yadavas of Devagiri), Ambadeva (Kayastha Rebel Chief), Pandyas of Madurai",
    outcome: "Decisive defense of Warangal Fort; expansion of the Nayanakara military system; patron of irrigation and international trade."
};

const RUDRAMA_HIGHLIGHTS = [
    {
        id: "sovereign-rule",
        title: "Male Alias: Rudradeva Maharaja",
        category: "Political Legitimacy",
        icon: "👑",
        description: "Formally designated as a son through the Putrika ceremony by her father Ganapati Deva; ruled under the male name Rudradeva Maharaja to command court nobles."
    },
    {
        id: "military-triumph",
        title: "Defeat of the Yadava Invasions",
        category: "Military Command",
        icon: "⚔️",
        description: "Personally led Kakatiya armies to repel the Yadava ruler Mahadeva, besieging his retreating force and extracting a massive financial indemnity."
    },
    {
        id: "nayanakara-system",
        title: "The Nayanakara Administrative System",
        category: "Statecraft & Reforms",
        icon: "🛡️",
        description: "Reorganized local defense by granting revenue rights to loyal military commanders (Nayakas), paving the way for decentralized defense."
    },
    {
        id: "warangal-fortification",
        title: "Fortification of Orugallu (Warangal)",
        category: "Architecture & Heritage",
        icon: "🏰",
        description: "Completed the double-walled fortifications of Warangal, featuring a massive inner stone wall, outer mud rampart, wide moats, and stone gateways."
    }
];

const RUDRAMA_SECTIONS = [
    {
        id: "dynasty-background",
        title: "The Kakatiya Dynasty & Orugallu (Warangal)",
        eyebrow: "Origins & Geopolitics",
        summary: "The Kakatiyas rose from feudatories of the Western Chalukyas to become the dominant sovereign power of the eastern Deccan plateau.",
        details: [
            "Deccan Empire: Governed the Telugu-speaking areas of modern Telangana and Andhra Pradesh from their capital Orugallu (modern Warangal).",
            "Ganapati Deva's Reign: Under Rudrama Devi's father, Emperor Ganapati Deva (r. 1199–1262 CE), the Kakatiyas expanded trade, constructed large irrigation systems, and patronized temple architecture.",
            "Capital Relocation: Ganapati Deva shifted the primary administrative capital from Hanamkonda to Orugallu, initiating the massive defensive fortifications completed by Rudrama Devi."
        ]
    },
    {
        id: "accession-authority",
        title: "Accession to the Throne & Putrika Ceremony",
        eyebrow: "Political Legitimacy & Power",
        summary: "Rudrama Devi's accession represents a unique example of gender-transcending statecraft in medieval South India.",
        details: [
            "Lack of Male Heirs: Having no surviving sons, Ganapati Deva selected his eldest daughter Rudrama Devi to succeed him on the throne.",
            "Putrika Ceremony: The emperor performed the symbolic Putrika ceremony, designating her as a son to legalize her succession.",
            "Gender Representation: She wore male attire during public court, sat on the imperial throne as 'Rudradeva Maharaja', and issued inscriptions in this male persona to secure military allegiance."
        ]
    },
    {
        id: "challenges-woman-ruler",
        title: "Challenges of Governing as a Female Monarch",
        eyebrow: "Deccan Resentment & Rebellions",
        summary: "Ruling a medieval kingdom as a woman meant confronting immediate feudal rebellions and foreign opportunism.",
        details: [
            "Noble Resistance: Stepbrothers Hariharadeva and Murarideva, along with several local chiefs, launched internal rebellions refusing to accept a female ruler.",
            "Foreign Encroachments: Surrounding powers, including the Yadavas of Devagiri and the Pandyas of Madurai, invaded Kakatiya territory early in her reign, expecting a weak defense.",
            "Successful Suppression: Rudrama Devi successfully put down the domestic uprisings and secured the frontiers through strategic alliances and active command."
        ]
    },
    {
        id: "nayanakara-reforms",
        title: "Administrative Roles & The Nayanakara System",
        eyebrow: "Administrative Reforms",
        summary: "Rudrama Devi reformed the military administration to counter traditional noble cliques and secure loyal military backup.",
        details: [
            "Empowering Non-Aristocrats: Recruited capable warriors from ordinary backgrounds as military officers (Nayakas), breaking the monopoly of hereditary Kakatiya nobles.",
            "The Nayanakara System: Institutionalized the granting of land revenue rights (Nayanakaras) to these Nayakas, who maintained designated troops for the sovereign.",
            "Economic Management: Promoted agricultural reclamation through tank irrigation (such as Pakhal and Ramappa Lakes) and protected international maritime trade via the Motupalli port."
        ]
    },
    {
        id: "military-campaigns",
        title: "Military Command & Yadava Campaigns",
        eyebrow: "Defensive Victories",
        summary: "She was a skilled commander who personally organized defensive forces and led military operations.",
        details: [
            "Yadava Rout (c. 1267–1271 CE): Yadava King Mahadeva invaded the Kakatiya kingdom, advancing to Warangal. Rudrama Devi led the counter-offensive, defeated the Yadava forces, and chased them back to Devagiri, forcing a heavy peace treaty.",
            "Ambadeva Rebellion: In her final years, she faced a formidable revolt by the Kayastha chief Ambadeva, who allied with the Yadavas and Pandyas.",
            "Battle of Chandupatla (1289 CE): Inscriptions suggest Rudrama Devi died in battle in late 1289 CE while fighting Ambadeva's forces near Chandupatla."
        ]
    }
];

const RUDRAMA_EVIDENCE_VS_RETELLING = [
    {
        topic: "Titles and State Gender Identity",
        historicalEvidence: "Inscriptions (such as the Tripurantakam inscription of 1262–1263 CE and Malkapuram inscription of 1261 CE) formally refer to her with masculine titles like 'Rudradeva Maharaja' and describe her executing sovereign deeds as a male king would.",
        popularRetelling: "Popular folklore and later movies often present her hiding her gender from the kingdom for most of her life, pretending to be a male prince until a dramatic public revelation. In reality, her gender was known to the court, and the male identity was an official, symbolic state apparatus."
    },
    {
        topic: "The Circumstances of Her Death",
        historicalEvidence: "The Chandupatla inscription (dated November 25, 1289 CE) records a donation by a soldier named Puvvula Mummadi for the spiritual benefit of Rudrama Devi and her general Mallikarjuna Nayaka. This indicates both died in battle on or shortly before this date during the campaign against the rebel Ambadeva.",
        popularRetelling: "Popular narratives and historical novels often depict her surviving the rebellion to retire peacefully, or dying of natural causes at an advanced age, overlooking the epigraphical evidence of her death in military action."
    },
    {
        topic: "Marco Polo's Observations",
        historicalEvidence: "The Venetian traveler Marco Polo visited the Coromandel coast/Deccan region (Motupalli port) around 1292 CE. He noted that the region was ruled by a queen named 'Ruia' (Rudrama Devi) who was a lady of great wisdom, governed with justice, and was deeply beloved by her subjects.",
        popularRetelling: "Dramatized accounts often describe Marco Polo visiting Warangal Fort directly and having direct political consultations with the Queen on foreign diplomacy, which is not supported by his actual travel journals."
    }
];

const RUDRAMA_TIMELINE = [
    {
        year: "c. 1259 CE",
        title: "Joint Regency with Ganapati Deva",
        description: "Emperor Ganapati Deva associates Rudrama Devi with the administration, appointing her as co-regent to secure her transition to power."
    },
    {
        year: "1262 CE",
        title: "Accession and Coronation",
        description: "Ganapati Deva retires/passes away; Rudrama Devi formally ascends the throne, adopting the coronation title Rudradeva Maharaja."
    },
    {
        year: "c. 1267 – 1271 CE",
        title: "Yadava War and Siege of Warangal",
        description: "Yadava King Mahadeva invades the Kakatiya kingdom. Rudrama Devi leads the counter-attack, repels the Yadavas, and extracts a massive indemnity."
    },
    {
        year: "1289 CE",
        title: "Ambadeva's Rebellion & Battle of Chandupatla",
        description: "The Kayastha chief Ambadeva revolts. Rudrama Devi leads her general Mallikarjuna Nayaka to suppress it and dies in action at Chandupatla."
    }
];

const RUDRAMA_SOURCES = [
    {
        citation: "Sastry, P. V. Parabrahma. The Kākatiyas of Warangal. Government of Andhra Pradesh, 1978.",
        notes: "Definitive archaeological and historical study of the Kakatiya political system, dynastic records, and Rudrama Devi's inscriptions."
    },
    {
        citation: "Talbot, Cynthia. Precolonial India in Practice: Society, Region, and Identity in Medieval Andhra. Oxford University Press, 2001.",
        notes: "Examines the Nayanakara administrative system, local epigraphs, gender constructs of Rudradeva Maharaja, and social dynamics in medieval Andhra."
    },
    {
        citation: "Polo, Marco. The Book of Ser Marco Polo, the Venetian, Concerning the Kingdoms and Marvels of the East. Translated by Henry Yule. John Murray, 1903.",
        notes: "Primary 13th-century travel account detailing the trade, administrative order, and reputation of the Kakatiya Queen (referred to as Ruia) at Motupalli."
    },
    {
        citation: "Inscriptional Records of Chandupatla & Tripurantakam, Archaeological Survey of India (ASI).",
        notes: "Primary epigraphical charters documenting the official accession dates (Tripurantakam) and the military demise (Chandupatla) of Rudrama Devi."
    }
];
