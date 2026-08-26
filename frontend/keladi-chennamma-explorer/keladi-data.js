/**
 * Keladi Chennamma Explorer — Data Module
 * Comprehensive historical dataset covering Rani Keladi Chennamma (reign 1671–1696 CE)
 * of the Keladi Nayaka Dynasty (Ikkeri/Bednore), her shelter to Chhatrapati Rajaram,
 * successful guerrilla resistance against Aurangzeb's Mughal army, coastal Karnataka administration,
 * trade, timeline, kingdom map, and scholarly sources.
 */

const KELADI_CHENNAMMA_INFO = {
    id: "keladi-chennamma",
    title: "Keladi Chennamma — The Queen Who Defended the Keladi Kingdom",
    subtitle: "Fearless Queen of Bednore, Protector of Rajaram & Defender of Karnataka",
    reignPeriod: "1671 – 1696 CE (25-Year Reign)",
    dynasty: "Keladi Nayaka Dynasty (Ikkeri / Bednore Kingdom)",
    capital: "Bednore (Bidanur / Nagara) & Ikkeri (Shimoga, Karnataka)",
    titles: "Rani of Keladi, Protector of Dharma, Defier of Aurangzeb",
    realmExtent: "Malenadu, Coastal Kanara (Karwar to Kasaragod), Western Ghats",
    quickStats: [
        { label: "Reign as Queen", value: "1671 – 1696 CE (25 yrs)", icon: "👑" },
        { label: "Dynastic Capital", value: "Bednore & Ikkeri", icon: "🏰" },
        { label: "Historic Defense", value: "Defeated Mughals (1689–90)", icon: "⚔️" },
        { label: "Chhatrapati Ally", value: "Sheltered Rajaram", icon: "🛡️" },
        { label: "Maritime Coast", value: "Kanara Ports & Bekal", icon: "⚓" },
        { label: "State Religion", value: "Veerashaivism & Pluralism", icon: "🕉️" }
    ]
};

const KELADI_CHENNAMMA_SECTIONS = [
    {
        id: "who-was-chennamma",
        title: "Who Was Keladi Chennamma?",
        icon: "👑",
        summary: "Daughter of Siddappa Setti of Kotepura; married King Somashekara Nayaka and rose to become one of South India's greatest warrior queens.",
        details: [
            "Born in the mid-17th century at Kotepura (near Kundapura in coastal Karnataka) into a Lingayat merchant family of Siddappa Setti.",
            "Known for her exceptional intellect, martial training in archery, swordplay, horse-riding, and mastery of statecraft from an early age.",
            "Married King Somashekara Nayaka of the Keladi Nayaka kingdom; actively co-ruled and studied political treaties, treasury management, and military garrisons."
        ]
    },
    {
        id: "keladi-kingdom",
        title: "The Keladi Nayaka Kingdom & Realm",
        icon: "🏰",
        summary: "Successors to Vijayanagara authority in Malenadu and coastal Kanara, ruling a prosperous spice-trading empire.",
        details: [
            "The Keladi Nayakas (originally feudatories of the Vijayanagara Empire) established sovereign rule after Talikota, spanning the Sahyadri mountains (Shimoga, Chikmagalur) and coastal Kanara (Uttara Kannada, Dakshina Kannada, Udupi, and north Kerala).",
            "Capitals shifted from Keladi to Ikkeri and finally to the impenetrable jungle fortress of Bednore (Bidanur/Nagara).",
            "Maintained flourishing coastal ports at Honnavar, Bhatkal, Kundapura, and Mangalore, dominating the global black pepper, cardamom, and rice trade with Portuguese, Dutch, and Arab merchants."
        ]
    },
    {
        id: "rise-to-power",
        title: "Rise to Sovereign Power & Regency",
        icon: "⚖️",
        summary: "Navigating dynastic intrigue following King Somashekara's death, overcoming corrupt ministers to secure the throne.",
        details: [
            "When King Somashekara was murdered in 1671 by conspiring court factions led by minister Thimmanna Nayaka, Chennamma acted with decisive bravery.",
            "Crushed the court rebellion, eliminated the conspirators, and assumed supreme sovereign authority over the kingdom in 1671.",
            "Adopted Basavappa Nayaka as her heir and educated him in administration, law, and military arts while personally governing the state."
        ]
    },
    {
        id: "political-leadership",
        title: "Political Leadership & Internal Governance",
        icon: "📜",
        summary: "Administrative excellence, agricultural expansion, religious tolerance, and public infrastructure.",
        details: [
            "Instituted efficient revenue surveys, constructed check-posts, roads, and grain storage granaries across the rugged Western Ghats passes.",
            "Patronized literature and arts; court scholar Shadaksharadeva composed renowned classical Kannada epics (Rajshekhara Vilasa, Vrishabhendra Vijaya).",
            "Upheld pluralistic religious harmony, endowing Veerashaiva mathas (monasteries), Sringeri Sharada Peetham, Jain basadis, and allowing Christian and Muslim subjects freedom of worship and commerce."
        ]
    },
    {
        id: "mughal-resistance",
        title: "Resistance Against Mughal Expansion & Shelter to Rajaram",
        icon: "⚔️",
        summary: "Courageously sheltering Maratha Chhatrapati Rajaram in 1689 and defeating Aurangzeb's invading army in the dense jungles of Bednore.",
        details: [
            "In 1689, following the execution of Chhatrapati Sambhaji by Aurangzeb, his brother Chhatrapati Rajaram escaped from Raigad heading toward Gingee Fort in Tamil Nadu.",
            "Knowing the immense risk of Mughal wrath, Rani Chennamma granted Rajaram royal sanctuary and safe escort through her territory.",
            "Mughal Emperor Aurangzeb dispatched a massive imperial army commanded by Matabar Khan and General Jan Nisar Khan to capture Rajaram and annex Bednore.",
            "Chennamma deployed classic guerrilla tactics in the treacherous rain-soaked Sahyadri rainforests, cutting off Mughal supply lines and ambushing their forces at the Battle of Bednore.",
            "The demoralized Mughal generals sued for peace, signing a treaty that recognized Keladi's independence, while Rajaram safely reached Gingee."
        ]
    },
    {
        id: "coastal-heritage",
        title: "Coastal Karnataka Heritage & Maritime Power",
        icon: "⚓",
        summary: "Controlling Arabian Sea trade, coastal fortresses like Bekal and Mirjan, and diplomatic parity with European maritime powers.",
        details: [
            "Maintained strict oversight on European trading posts; regulated Portuguese factory treaties and Dutch spice quotas without yielding territorial sovereignty.",
            "Strengthened coastal defenses across Mirjan Fort, Honnavar, and Bekal Fort, ensuring safe passage for domestic merchant fleets.",
            "Documented in contemporary factory records of the English East India Company and Portuguese archives as a resolute and wise sovereign ruler."
        ]
    }
];

const KELADI_TERRITORY_MAP_SITES = [
    {
        name: "Bednore / Nagara (Imperial Capital)",
        region: "Western Ghats, Shimoga, Karnataka",
        role: "Impregnable Forest Citadel",
        desc: "Capital of Rani Chennamma surrounded by deep jungles and hills, where the Mughal assault was crushed."
    },
    {
        name: "Ikkeri & Keladi (Ancestral Seats)",
        region: "Sagar, Shimoga, Karnataka",
        role: "Dynastic Heartland & Temples",
        desc: "Home to the magnificent Aghoreshwara Temple at Ikkeri and Rameshwara Temple at Keladi."
    },
    {
        name: "Honnavar & Bhatkal (Maritime Ports)",
        region: "Uttara Kannada Coast",
        role: "International Spice Trade Hubs",
        desc: "Major ocean ports trading black pepper and rice with Portuguese, Dutch, and Persian merchants."
    },
    {
        name: "Mirjan & Bekal Forts",
        region: "Coastal Karnataka & North Malabar",
        role: "Coastal Strongholds",
        desc: "Key fortifications safeguarding Keladi's southern and coastal frontiers from naval raids."
    }
];

const KELADI_CHENNAMMA_TIMELINE = [
    {
        year: "c. 1650 CE",
        title: "Birth at Kotepura",
        desc: "Born to Siddappa Setti at Kotepura in coastal Karnataka; trained in martial arts and statecraft."
    },
    {
        year: "1667 CE",
        title: "Marriage to Somashekara Nayaka",
        desc: "Enters the royal Keladi family as Queen Consort, co-administering state affairs."
    },
    {
        year: "1671 CE",
        title: "Accession to the Throne of Bednore",
        desc: "Quells internal palace conspiracies following Somashekara's death and takes sovereign command as reigning Queen."
    },
    {
        year: "1689 CE",
        title: "Sheltering Chhatrapati Rajaram",
        desc: "Grants safe asylum and armed escort to Rajaram during his escape from Aurangzeb's Mughal forces."
    },
    {
        year: "1689 – 1690 CE",
        title: "Defeat of the Mughal Army",
        desc: "Deploys guerrilla warfare in the Western Ghats rainforests, repelling Aurangzeb's invasion and forcing a peace treaty."
    },
    {
        year: "1696 CE",
        title: "Peaceful Transition & Legacy",
        desc: "Concludes 25 glorious years of reign, handing over a secure and prosperous kingdom to her adopted son Basavappa Nayaka I."
    }
];

const KELADI_CHENNAMMA_SOURCES = [
    {
        author: "Linganna Kavi",
        work: "Keladinripavijaya (Victory of the Keladi Kings)",
        year: "c. 1763–1800",
        note: "Primary classical Kannada champu kavya chronicle detailing the genealogy, administrative reigns, and military exploits of the Keladi Nayakas."
    },
    {
        author: "K. D. Swaminathan",
        work: "The Nayakas of Ikkeri",
        year: "1957",
        note: "Comprehensive scholarly monograph published by the P. Varadachary & Co., detailing administrative institutions and foreign relations."
    },
    {
        author: "B. S. Shastry",
        work: "Studies in Indo-Portuguese History",
        year: "1981",
        note: "Documents diplomatic treaties, naval policies, and commercial exchanges between the Keladi Nayaka court and Portuguese Goa."
    },
    {
        author: "Stewart Gordon",
        work: "The Marathas 1600–1818",
        year: "1993",
        note: "Covers the escape of Chhatrapati Rajaram to Gingee and Rani Chennamma's critical strategic intervention against Mughal armies."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        KELADI_CHENNAMMA_INFO,
        KELADI_CHENNAMMA_SECTIONS,
        KELADI_TERRITORY_MAP_SITES,
        KELADI_CHENNAMMA_TIMELINE,
        KELADI_CHENNAMMA_SOURCES
    };
}
