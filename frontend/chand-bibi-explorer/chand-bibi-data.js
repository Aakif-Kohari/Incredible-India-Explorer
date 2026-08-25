/**
 * Chand Bibi Explorer — Data Module
 * Historical dataset covering Chand Bibi (1550–1599 CE) — The Defender of Ahmadnagar,
 * Regent of Bijapur and Ahmadnagar, her defense against Mughal siege, Deccan Sultanate politics,
 * timeline, map sites, and historical sources.
 */

const CHAND_BIBI_INFO = {
    id: "chand-bibi",
    title: "Chand Bibi — The Defender of Ahmadnagar",
    subtitle: "Warrior Queen, Diplomat & Regent of the Deccan Sultanates",
    reignPeriod: "1550 – 1599 CE (16th Century)",
    dynasty: "Nizam Shahi (Ahmadnagar) & Adil Shahi (Bijapur)",
    titles: "Chand Khatun, Regent of Bijapur & Ahmadnagar, Defender of Ahmadnagar",
    languages: "Persian, Dakhni Urdu, Marathi, Arabic, Kannada",
    quickStats: [
        { label: "Lifespan", value: "1550 – 1599 CE", icon: "👑" },
        { label: "Dynastic Ties", value: "Nizam & Adil Shahi", icon: "🏛️" },
        { label: "Regencies", value: "Bijapur & Ahmadnagar", icon: "⚖️" },
        { label: "Historic Defense", value: "Mughal Siege 1595–96", icon: "⚔️" },
        { label: "Polyglot & Scholar", value: "5 Languages & Sitar", icon: "🎨" },
        { label: "Epicenter", value: "Ahmadnagar Fort", icon: "🏰" }
    ]
};

const CHAND_BIBI_SECTIONS = [
    {
        id: "early-life",
        title: "Early Life & Royal Lineage",
        icon: "👑",
        summary: "Born into the ruling Nizam Shahi dynasty of Ahmadnagar, educated in statecraft, military strategy, arts, and languages.",
        details: [
            "Born in 1550 CE as the daughter of Hussain Nizam Shah I, Sultan of Ahmadnagar, and Queen Khunza Humayun.",
            "Educated extensively in Persian, Dakhni, Marathi, Arabic, and Kannada, as well as calligraphy, sitar playing, and falconry.",
            "Witnessed early political leadership through her mother Khunza Humayun, who served as regent of Ahmadnagar for Murtaza Nizam Shah."
        ]
    },
    {
        id: "bijapur-connection",
        title: "Bijapur Alliance & Regency",
        icon: "💍",
        summary: "Strategic matrimonial alliance connecting Ahmadnagar and Bijapur, followed by courageous regency over the Adil Shahi Sultanate.",
        details: [
            "Married Sultan Ali Adil Shah I of Bijapur in 1565 as part of a grand diplomatic alliance uniting the Deccan Sultanates against Vijayanagara (Battle of Talikota).",
            "Accompanied Ali Adil Shah on military campaigns, advising on state policy and patronage of Deccan arts and miniature painting.",
            "Following Ali Adil Shah's assassination in 1580, she acted as regent for the minor nephew Ibrahim Adil Shah II.",
            "Successfully thwarted palace coups led by ambitious regents (Kamal Khan and Kishwar Khan) and allied with generals like Dilawar Khan and Ikhlas Khan to maintain stability in Bijapur."
        ]
    },
    {
        id: "ahmadnagar-politics",
        title: "Return to Ahmadnagar & Deccan Politics",
        icon: "🏛️",
        summary: "Navigating deep-seated factionalism between Deccanis, Habshis (Africans), and Western foreigners (Afaquis).",
        details: [
            "In 1595, following internal dynastic crisis in Ahmadnagar after the death of Burhan Nizam Shah II, rival nobles backed competing claimants for the throne.",
            "Chand Bibi returned to Ahmadnagar to install Bahadur Nizam Shah (infant grand-nephew) and proclaimed herself regent.",
            "Opposing faction leader Miyun Manjhu invited Mughal Prince Murad (son of Emperor Akbar) to intervene, precipitating the imperial Mughal invasion of the Deccan."
        ]
    },
    {
        id: "mughal-siege",
        title: "The Mughal Siege of Ahmadnagar (1595–1596)",
        icon: "🛡️",
        summary: "One of the most celebrated military sieges in medieval Indian history, where Chand Bibi personally directed defensive operations.",
        details: [
            "In December 1595, Mughal forces led by Prince Murad and Abdur Rahim Khan-i-Khanan surrounded the formidable Ahmadnagar Fort.",
            "Chand Bibi united previously warring Deccani, Habshi, and Afaqui factions inside the fort under a shared banner of resistance.",
            "She appealed to Ibrahim Adil Shah II of Bijapur and Muhammad Quli Qutb Shah of Golconda to send allied relief forces to break the siege."
        ]
    },
    {
        id: "fort-defence",
        title: "Heroic Defence of the Fort",
        icon: "⚔️",
        summary: "Personal courage under fire: donning armor, repairing breached walls, and repelling Mughal mine assaults.",
        details: [
            "Mughal sappers dug five major subterranean mines beneath the fort bastions; Chand Bibi's scouts successfully counter-mined and deactivated several.",
            "When one mine detonated creating a massive breach in the fort curtain wall, Chand Bibi rushed to the frontline in full armor, wielding a sword and commanding artillery.",
            "Through non-stop overnight labor under her personal oversight, the garrison rebuilt the breached wall with stone, mortar, and sandbags before dawn.",
            "Impressed and exhausted by the fierce defense, Prince Murad negotiated a peace treaty in March 1596, recognizing Bahadur Shah as ruler in exchange for the cession of Berar."
        ]
    },
    {
        id: "legend-vs-history",
        title: "Contemporary History vs. Later Legends",
        icon: "📜",
        summary: "Distinguishing primary historical chronicles from colorful folk traditions and romantic folklore.",
        details: [
            "Contemporary Accounts: Recorded by historian Muhammad Qasim Firishta (Tarikh-i-Firishta) and Mughal chronicler Abu'l-Fazl (Akbarnama), both praising her extraordinary strategic mind, eloquence, and fortitude.",
            "Folklore & Legends: Popular folklore claims she fired silver and gold coins or copper kitchen utensils from cannons when ammunition was exhausted; historical chronicles confirm conventional ammunition and gunpowder defense.",
            "Tragic Demise: In 1599, when Mughal forces renewed hostilities under Daniyal Mirza, internal treason led by Hamid Khan spread false rumors of betrayal, resulting in her assassination by a mob inside the fort moments before the second siege concluded."
        ]
    }
];

const DECCAN_MAP_SITES = [
    {
        name: "Ahmadnagar Fort",
        state: "Maharashtra",
        role: "Nizam Shahi Citadel & Epicenter of 1595–96 Defense",
        desc: "One of the strongest land forts in India with deep moats and 22 bastions, where Chand Bibi repelled Prince Murad's army."
    },
    {
        name: "Bijapur (Vijayapura)",
        state: "Karnataka",
        role: "Adil Shahi Capital & First Regency",
        desc: "Seat of Sultan Ali Adil Shah I and Ibrahim Adil Shah II, where Chand Bibi patronized arts, music, and governed as regent."
    },
    {
        name: "Golconda (Hyderabad)",
        state: "Telangana",
        role: "Qutb Shahi Allied Sultanate",
        desc: "Allied kingdom that dispatched cavalry reinforcements to assist Chand Bibi during the allied Deccan confederacy."
    },
    {
        name: "Berar Province",
        state: "Maharashtra",
        role: "Ceded Territory (1596 Treaty)",
        desc: "Northern frontier territory ceded to the Mughals as part of the negotiated truce in March 1596."
    }
];

const CHAND_BIBI_TIMELINE = [
    {
        year: "1550 CE",
        title: "Birth in Ahmadnagar",
        desc: "Born to Hussain Nizam Shah I and Queen Khunza Humayun of the Nizam Shahi dynasty."
    },
    {
        year: "1565 CE",
        title: "Matrimonial Alliance with Bijapur",
        desc: "Marries Sultan Ali Adil Shah I; the combined Deccan alliance wins the Battle of Talikota."
    },
    {
        year: "1580 CE",
        title: "First Regency in Bijapur",
        desc: "Assumes regency for minor nephew Ibrahim Adil Shah II and deftly overcomes court conspiracies."
    },
    {
        year: "1595 CE",
        title: "Return to Ahmadnagar & Regency",
        desc: "Returns to Ahmadnagar amidst succession turmoil to protect the infant heir Bahadur Nizam Shah."
    },
    {
        year: "1595 – 1596 CE",
        title: "Historic Defense of Ahmadnagar Fort",
        desc: "Leads fort garrison in full armor against Prince Murad's siege; negotiates treaty preserving sovereignty."
    },
    {
        year: "1599 CE",
        title: "Second Mughal Siege & Martyrdom",
        desc: "Mughal armies renew campaign; Chand Bibi is assassinated due to palace treason, immortalized as a Deccan hero."
    }
];

const CHAND_BIBI_SOURCES = [
    {
        author: "Firishta (Muhammad Qasim)",
        work: "Tarikh-i-Firishta (Gulshan-i-Ibrahimi)",
        year: "c. 1606–1611",
        note: "Primary contemporary Persian chronicle providing eyewitness and near-contemporary details of Deccan court politics and the siege."
    },
    {
        author: "Abu'l-Fazl ibn Mubarak",
        work: "Akbarnama",
        year: "c. 1596–1602",
        note: "Official Mughal imperial record praising Chand Bibi's courage and diplomatic skill from the adversary's perspective."
    },
    {
        author: "Radhey Shyam",
        work: "The Kingdom of Ahmadnagar",
        year: "1966",
        note: "Comprehensive modern historiographical study on Nizam Shahi administration, fortress architecture, and military campaigns."
    },
    {
        author: "Richard M. Eaton",
        work: "A Social History of the Deccan, 1300–1761: Eight Indian Lives",
        year: "2005",
        note: "In-depth chapter dedicated to Chand Bibi examining Deccan Sultanate factionalism, gender, and regional resistance."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CHAND_BIBI_INFO,
        CHAND_BIBI_SECTIONS,
        DECCAN_MAP_SITES,
        CHAND_BIBI_TIMELINE,
        CHAND_BIBI_SOURCES
    };
}
