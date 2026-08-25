/**
 * Lalitaditya Muktapida Explorer — Comprehensive Data Module
 * 
 * This module contains the structured historical dataset covering Emperor Lalitaditya 
 * Muktapida of the Karkota Dynasty, including Martand Sun Temple architecture, 
 * Parihaspore capital, military campaigns, cultural patronage, and Kalhana's 
 * Rajatarangini chronicle accounts.
 * 
 * Designed for seamless injection into the DOM via lalitaditya.js
 */

'use strict';

/**
 * Core biographical and dynastic information
 */
const LALITADITYA_INFO = {
    id: "lalitaditya-muktapida",
    title: "Lalitaditya Muktapida",
    subtitle: "The Alexander of Kashmir (Karkota Emperor)",
    reignPeriod: "c. 724 – 760 CE (8th Century)",
    dynasty: "Karkota Dynasty of Kashmir",
    predecessor: "Tarapida",
    successor: "Kuvlayapida",
    capital: "Parihaspore (Parihaspur) & Srinagar",
    monumentalLegacy: "Martand Sun Temple (Anantnag)",
    primaryChronicle: "Rajatarangini (River of Kings) by Kalhana (1148 CE)",
    quickStats: [
        { label: "Reign Period", value: "c. 724 – 760 CE", icon: "👑" },
        { label: "Dynasty", value: "Karkota Dynasty", icon: "⛰️" },
        { label: "Crown Temple", value: "Martand Sun Temple", icon: "☀️" },
        { label: "Imperial Capital", value: "Parihaspore", icon: "🏛️" },
        { label: "Historical Source", value: "Rajatarangini", icon: "📜" },
        { label: "Region of Influence", value: "Kashmir to Gangetic Plains", icon: "📍" }
    ]
};

/**
 * Detailed architectural and historical data on the Martand Sun Temple
 */
const MARTAND_SUN_TEMPLE = {
    title: "Martand Sun Temple (Anantnag, Kashmir)",
    builtYear: "c. 750 CE",
    architecturalStyle: "Kashmiri Classical Architecture (Greco-Roman, Gandhara, & Gupta Fusion)",
    deity: "Surya (The Sun God)",
    location: "Mattan, Anantnag district, Jammu & Kashmir",
    currentStatus: "Protected Monument of National Importance (ASI)",
    highlights: [
        "Built atop a 'Karewa' (elevated plateau) offering panoramic views of the Kashmir Valley.",
        "Features a colossal stone courtyard measuring 220 feet by 142 feet, enclosed by a colonnaded peristyle of 84 fluted columns.",
        "The central sanctuary (Garbhagriha) is flanked by arched niches (Devangana) housing exquisite reliefs of Surya, Vishnu, and Ganga.",
        "Masterfully blends Gandharan trefoil arches with indigenous Gupta stone-carving traditions.",
        "Constructed using massive, precisely cut limestone blocks without the use of mortar (dry masonry technique)."
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Martand_Sun_Temple_Ruins.jpg/800px-Martand_Sun_Temple_Ruins.jpg",
    imageAlt: "Ruins of the Martand Sun Temple showcasing the grand colonnaded peristyle and central sanctum against a mountain backdrop."
};

/**
 * Military campaigns and historical accounts, distinguishing between verified history and chronicler lore
 */
const CAMPAIGNS_AND_HISTORIOGRAPHY = [
    {
        title: "Tang China Alliance & Northern Diplomacy",
        category: "Historically Verified",
        detail: "In 733 CE, a Kashmiri embassy reached the Tang imperial capital Chang'an. Emperor Xuanzong granted the envoy a title, indicating a strategic diplomatic alignment against the expanding Tibetan Empire."
    },
    {
        title: "Campaign against Yashovarman of Kannauj",
        category: "Historically Verified",
        detail: "Lalitaditya formed an initial alliance with Yashovarman to subdue common enemies, but later clashed with him. Kalhana notes Lalitaditya's victory, which brought North Indian scholars and artisans into the Kashmiri court."
    },
    {
        title: "Subjugation of Mountain Chiefs (Bhutas & Daradas)",
        category: "Archaeological & Textual Evidence",
        detail: "Secured the northern and western frontiers of the valley by subduing the Bhutas (inhabitants of modern-day Himachal/Ladakh) and Daradas (Dards of Gilgit-Baltistan), ensuring trade route security."
    },
    {
        title: "Trans-Himalayan Expeditions",
        category: "Chronicler Accounts (Kalhana's Lore)",
        detail: "The Rajatarangini describes vast, almost mythical marches into Central Asia, Kamboja, and even encounters with the Arabs (Tayikas). Historians view this as a mix of actual frontier skirmishes and epic chronicle idealization to magnify the king's glory."
    }
];

/**
 * Granular chronological timeline of the reign
 */
const TIMELINE_EVENTS = [
    { 
        year: "c. 724 CE", 
        title: "Accession to the Throne", 
        description: "Succeeds his father Tarapida to become the 5th and most powerful monarch of the Karkota dynasty." 
    },
    { 
        year: "c. 730 CE", 
        title: "Consolidation of the Valley", 
        description: "Subdues rebellious mountain chiefs (Daradas and Bhutas) to secure the northern frontiers and trade routes of the Kashmir Valley." 
    },
    { 
        year: "733 CE", 
        title: "Embassy to the Tang Court", 
        description: "A Kashmiri diplomatic mission reaches Chang'an, securing recognition from Tang Emperor Xuanzong amid Tibetan expansionism." 
    },
    { 
        year: "c. 740 CE", 
        title: "The Gangetic March & Kannauj Campaign", 
        description: "Marches south, defeats King Yashovarman of Kannauj, and absorbs North Indian scholars, elevating Kashmir's cultural prestige." 
    },
    { 
        year: "c. 750 CE", 
        title: "Consecration of Martand & Parihaspore", 
        description: "Completes the grand Martand Sun Temple and establishes the new, magnificent capital city of Parihaspore." 
    },
    { 
        year: "c. 760 CE", 
        title: "Concluding Reign & Golden Age Legacy", 
        description: "Ends a legendary 36-year reign, leaving behind a unified, prosperous Kashmir recognized as a premier center of art, philosophy, and architecture." 
    }
];

/**
 * Cultural and religious patronage (New Section for expanded HTML)
 */
const CULTURAL_PATRONAGE = [
    {
        icon: "🕉️",
        title: "Hindu Temple Architecture",
        description: "Commissioned numerous Shaiva and Vaishnava temples, including the grand Parihasakesava (a colossal Vishnu temple) and the Pandrethan temple precursor, establishing a distinct 'Kashmiri' architectural idiom."
    },
    {
        icon: "☸️",
        title: "Buddhist Viharas",
        description: "Despite being a devout Hindu monarch, he generously patronized Buddhism, constructing the monumental Parihasapura Vihara and inviting scholars from across Asia, fostering remarkable religious syncretism."
    },
    {
        icon: "🏛️",
        title: "Urban Planning of Parihaspore",
        description: "Founded the new capital, Parihaspore, featuring advanced water management systems, wide paved avenues, monumental gates, and dedicated zones for religious and civic life."
    }
];

/**
 * Academic and primary source references
 */
const REFERENCES = [
    { 
        text: "Kalhana (c. 1148 CE). Rajatarangini: A Chronicle of the Kings of Kashmir. Translated by Sir M. A. Stein (1900). Westminster: Archibald Constable & Co.", 
        link: "https://archive.org/details/rajatarangini00kalhuoft" 
    },
    { 
        text: "Kak, R. C. (1933). Ancient Monuments of Kashmir. London: Kegan Paul, Trench, Trubner & Co. (Provides foundational architectural analysis of Martand).", 
        link: "#" 
    },
    { 
        text: "Goetz, Hermann (1969). Studies in the History and Art of Kashmir and the Indian Himalaya. Wiesbaden: Otto Harrassowitz.", 
        link: "#" 
    },
    { 
        text: "Majumdar, R. C. (1977). Ancient India. Motilal Banarsidass. (Contextualizes Lalitaditya's campaigns within broader 8th-century Indian geopolitics).", 
        link: "#" 
    },
    { 
        text: "Witzel, Michael (1985). 'The Case of the Shattered Head'. Studien zur Indologie und Iranistik, 10, 363-400. (Critical analysis of Rajatarangini's historical reliability).", 
        link: "#" 
    }
];

// Export for Node.js environments (if used in build tools), 
// while remaining globally accessible in the browser via <script> tag.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        LALITADITYA_INFO, 
        MARTAND_SUN_TEMPLE, 
        CAMPAIGNS_AND_HISTORIOGRAPHY, 
        TIMELINE_EVENTS,
        CULTURAL_PATRONAGE,
        REFERENCES 
    };
}