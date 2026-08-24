/**
 * Tarabai Explorer — Data Module
 * Comprehensive historical dataset covering Maharani Tarabai Bhonsle (1675–1761 CE),
 * Queen Regent of the Maratha Empire, leader of the 27-year War of 27-Year Maratha Independence
 * against Mughal Emperor Aurangzeb (1700–1707), Kolhapur branch founder, military commander,
 * timeline, territory map, and scholarly sources.
 */

const TARABAI_INFO = {
    id: "tarabai-maratha-regent",
    title: "Maharani Tarabai — The Maratha Regent Who Continued the Resistance",
    subtitle: "Commander of the Maratha War of Independence & Architect of Deccani Survival",
    reignPeriod: "1700 – 1707 CE (Regent of Maratha Empire) & 1709–1761 CE (Kolhapur / Satara)",
    dynasty: "Bhonsle Dynasty (Maratha Empire / Kolhapur Royal House)",
    father: "Hambirrao Mohite (Senapati / Commander-in-Chief of Chhatrapati Shivaji Maharaj)",
    spouse: "Chhatrapati Rajaram I (son of Chhatrapati Shivaji Maharaj)",
    son: "Shivaji II (later founder of the Kolhapur throne)",
    titles: "Maharani, Regent of the Maratha Empire, Senapati-Putri",
    quickStats: [
        { label: "Lifespan", value: "1675 – 1761 CE (86 yrs)", icon: "👑" },
        { label: "War Regency", value: "1700 – 1707 CE", icon: "⚔️" },
        { label: "Mughal Foes", value: "Repelled Aurangzeb", icon: "🛡️" },
        { label: "Capitals", value: "Panhala, Satara, Kolhapur", icon: "🏰" },
        { label: "Military Tactics", value: "Offensive Cavalry Raids", icon: "🐎" },
        { label: "Royal Lineage", value: "Mohite & Bhonsle", icon: "🚩" }
    ]
};

const TARABAI_SECTIONS = [
    {
        id: "early-life",
        title: "Early Life & Martial Heritage",
        icon: "🌱",
        summary: "Daughter of Chhatrapati Shivaji's Commander-in-Chief Hambirrao Mohite; trained in cavalry tactics, swordplay, and statecraft.",
        details: [
            "Born in 1675 to Hambirrao Mohite, the legendary Senapati (Commander-in-Chief) of Chhatrapati Shivaji Maharaj who martyred in the Battle of Wai (1687).",
            "Raised in military encampments with rigorous training in horsemanship, archery, fort logistics, civil records, and diplomacy.",
            "Married Chhatrapati Rajaram I in 1682, becoming Queen Consort alongside Rajasbai."
        ]
    },
    {
        id: "political-context",
        title: "Maratha Political Crisis (1689–1700)",
        icon: "📜",
        summary: "Navigating the 27-Year Mughal-Maratha War following Sambhaji's execution and Rajaram's retreat to Gingee.",
        details: [
            "Following Chhatrapati Sambhaji's capture and brutal execution by Mughal Emperor Aurangzeb in 1689, the Maratha kingdom faced existential annihilation.",
            "Supported Rajaram's government-in-exile at Gingee Fort (Tamil Nadu) while Santaji Ghorpade and Dhanaji Jadhav waged relentless guerrilla warfare across Maharashtra.",
            "Upon Rajaram's sudden demise at Sinhagad Fort in March 1700, senior nobles feared the collapse of the state."
        ]
    },
    {
        id: "regency",
        title: "Assumption of the Regency (1700)",
        icon: "👑",
        summary: "Crowned her infant son Shivaji II at Panhala Fort and assumed supreme executive, financial, and military command.",
        details: [
            "Acted with swift political resolve, proclaiming her four-year-old son Shivaji II as Chhatrapati and herself as Regent.",
            "Reorganized the central Ashta Pradhan council, managed the war treasury, and coordinated military commanders with decisive authority.",
            "Mughal court historian Khafi Khan recorded: 'She was a clever, intelligent woman, and had obtained a great reputation for her management of civil and military affairs in the lifetime of her husband.'"
        ]
    },
    {
        id: "mughal-conflict",
        title: "Counter-Offensive Against Aurangzeb (1700–1707)",
        icon: "⚔️",
        summary: "Reversing Mughal siege warfare by launching daring counter-invasions into Mughal provinces (Malwa, Gujarat, Khandesh).",
        details: [
            "While the octogenarian Emperor Aurangzeb spent years and massive resources capturing individual Sahyadri hill forts (Satara, Panhala, Sinhagad), Tarabai ordered commanders Dhanaji Jadhav, Nemaji Shinde, and Parsoji Bhonsle to bypass the imperial camp.",
            "Maratha cavalry swarmed across the Narmada and Tapti rivers, collecting Chauth and Sardeshmukhi taxes in Berar, Khandesh, Gujarat, and Malwa.",
            "As Aurangzeb captured a hill fort at heavy cost, Tarabai's forces promptly bribed or stormed it back as soon as the imperial army marched away.",
            "Aurangzeb's grand army disintegrated under disease, bankruptcy, and morale collapse; Aurangzeb died in despair at Ahmednagar in 1707 without conquering the Deccan."
        ]
    },
    {
        id: "leadership-strategy",
        title: "Military Strategy & Administrative Genius",
        icon: "🐎",
        summary: "Pioneered mobile warfare doctrine and institutional decentralization that preserved the Maratha state.",
        details: [
            "Maintained strict personal supervision over fort garrisons (kiledars), grain stocks, gunpowder mills, and revenue audit accounts.",
            "Integrated diverse Deccani warrior bands under a unified nationalist cause of Swarajya.",
            "Historian Jadunath Sarkar observed: 'Her administrative genius and strength of character saved the nation in that awful crisis.'"
        ]
    },
    {
        id: "later-career",
        title: "Later Political Career & Kolhapur Branch",
        icon: "🏛️",
        summary: "Civil war with Shahu I, establishment of the Kolhapur Gaddi, and kingmaker influence in 18th-century Satara politics.",
        details: [
            "Following Aurangzeb's death, the Mughals released Sambhaji's son Shahu I to divide Maratha loyalties, leading to the Battle of Khed (1707).",
            "Tarabai retreated south and formally established the independent junior Bhonsle seat at Panhala/Kolhapur (1709).",
            "Later reconciled with Chhatrapati Shahu I in her elder years, living at Satara where she remained a formidable political arbiter until her passing in 1761 at age 86."
        ]
    }
];

const TARABAI_TERRITORY_MAP_SITES = [
    {
        name: "Panhala Fort (Wartime Capital)",
        region: "Kolhapur, Maharashtra",
        role: "Headquarters of Regency & Kolhapur Seat",
        desc: "Massive Sahyadri fortress where Tarabai crowned Shivaji II in 1700 and governed her realm."
    },
    {
        name: "Satara Fort (Azamtara)",
        region: "Western Maharashtra",
        role: "Capital of the Maratha Chhatrapatis",
        desc: "Besieged by Aurangzeb for months; later where Tarabai spent her final decades as grand matriarch."
    },
    {
        name: "Sinhagad & Raigad Forts",
        region: "Pune & Konkan, Maharashtra",
        role: "Bastions of Maratha Sovereignty",
        desc: "Key mountain citadels repeatedly defended, recaptured, and garrisoned during the 27-year war."
    },
    {
        name: "Malwa & Khandesh Frontier",
        region: "Central India (MP & North Maharashtra)",
        role: "Counter-Offensive Expeditionary Zones",
        desc: "Territories raided by Tarabai's cavalry commanders to collect Chauth and exhaust Mughal revenue streams."
    }
];

const TARABAI_TIMELINE = [
    {
        year: "1675 CE",
        title: "Birth into the Mohite Clan",
        desc: "Born to Hambirrao Mohite, Commander-in-Chief of Chhatrapati Shivaji Maharaj."
    },
    {
        year: "1682 CE",
        title: "Marriage to Prince Rajaram",
        desc: "Enters the royal Bhonsle house as daughter-in-law of Shivaji Maharaj."
    },
    {
        year: "1689 – 1698 CE",
        title: "Gingee Defense & Maratha War of Independence",
        desc: "Supports Rajaram during the 8-year Mughal siege of Gingee Fort in Tamil Nadu."
    },
    {
        year: "March 1700 CE",
        title: "Rajaram's Demise & Assumption of Regency",
        desc: "Crowns infant son Shivaji II at Panhala and assumes supreme command of the Maratha Empire."
    },
    {
        year: "1700 – 1707 CE",
        title: "All-Out Counter-Invasions & Repulsion of Aurangzeb",
        desc: "Directs cavalry offensives into Malwa and Gujarat; Aurangzeb dies defeated at Ahmednagar in 1707."
    },
    {
        year: "1709 – 1714 CE",
        title: "Foundation of the Kolhapur Gaddi",
        desc: "Establishes the independent sovereign Kolhapur branch of the Bhonsle dynasty."
    },
    {
        year: "9 Dec 1761 CE",
        title: "Demise at Satara Fort",
        desc: "Passes away at age 86 after living through the reigns of Shivaji, Sambhaji, Rajaram, Shahu, and the Peshwa expansion."
    }
];

const TARABAI_SOURCES = [
    {
        author: "Khafi Khan (Muhammad Hashim)",
        work: "Muntakhab-ul Lubab",
        year: "c. 1730s CE",
        note: "Contemporary Mughal official chronicle praising Tarabai's administrative intellect, vigilance, and cavalry warfare orchestration."
    },
    {
        author: "Sir Jadunath Sarkar",
        work: "History of Aurangzib (Vol. V: The Last Phase, 1689–1707)",
        year: "1924 / 1952",
        note: "Pivotal academic analysis detailing how Tarabai's strategic leadership and decentralized guerrilla warfare broke the Mughal military machine."
    },
    {
        author: "G. S. Sardesai",
        work: "New History of the Marathas (Vol. I & II)",
        year: "1946",
        note: "Exhaustive Marathi and English historiography documenting state correspondence, revenue sanads, and military dispatches."
    },
    {
        author: "Stewart Gordon",
        work: "The Marathas 1600–1818 (New Cambridge History of India)",
        year: "1993",
        note: "Scholarly exploration of 18th-century Deccani political economy and Tarabai's role in institutional survival."
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TARABAI_INFO,
        TARABAI_SECTIONS,
        TARABAI_TERRITORY_MAP_SITES,
        TARABAI_TIMELINE,
        TARABAI_SOURCES
    };
}
