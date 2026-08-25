/**
 * Bharata and Rama's Sandals Story Explorer — Data Module
 * Comprehensive dataset covering Bharata and Rama's Sandals (Paduka Rajyam),
 * Kaikeyi's boons, Bharata's refusal of kingship, Chitrakoot meeting,
 * enthronement of the sacred wooden sandals (Charan Paduka) on Ayodhya's throne,
 * and 14 years of ascetic trusteeship governance at Nandigram.
 */

const BHARATA_PADUKA_INFO = {
    id: "bharata-paduka-story",
    title: "Bharata and Rama's Sandals (A Symbol of Duty)",
    category: "Culture & Literature",
    characters: "Prince Bharata, Lord Rama, Queen Kaikeyi, Lakshmana, Shatrughna, Sage Vashistha",
    sacredRelic: "Charan Paduka (Wooden Sandals / Khadau of Lord Rama)",
    seatOfGovernance: "Nandigram (Ascetic hermitage outside Ayodhya)",
    duration: "14 Years of Selfless Trusteeship (Nishkama Seva)",
    coreThemes: "Selfless Duty, Fraternal Love (Bhratru Prem), Moral Sovereignty, Ethical Governance (Ramrajya)",
    philosophicalLesson: "The supreme ideal of ruling not for power or glory, but as a humble custodian of cosmic Dharma",
    quickStats: [
        { label: "Protagonist", value: "Prince Bharata", icon: "👑" },
        { label: "Sacred Relic", value: "Rama's Padukas", icon: "🪵" },
        { label: "Governed From", value: "Nandigram", icon: "🛕" },
        { label: "Tenure", value: "14 Years Asceticism", icon: "⏳" },
        { label: "Key Virtue", value: "Selfless Duty (Dharma)", icon: "⚖️" },
        { label: "Meeting Place", value: "Chitrakoot Hills", icon: "⛰️" }
    ]
};

const STORY_CHAPTERS = [
    {
        chapter: "Chapter 1: The Palace Crisis and Exile",
        title: "Kaikeyi's Boons and Rama's Departure",
        description: "Bound by past promises to Queen Kaikeyi, King Dasharatha is compelled to exile his beloved eldest son Rama to the Dandakaranya forest for 14 years, plunging Ayodhya into grief and leading to the King's passing.",
        icon: "🏛️"
    },
    {
        chapter: "Chapter 2: Bharata's Righteous Renunciation",
        title: "Refusal to Usurp the Throne",
        description: "Returning from his maternal home in Kekeya, Bharata learns of the tragic events. Grief-stricken and furious, he rejects the crown, reprimands his mother, and resolves to bring Rama back as the rightful king.",
        icon: "⚡"
    },
    {
        chapter: "Chapter 3: The Summit at Chitrakoot",
        title: "The Dialogue on Duty and Filial Honor",
        description: "Bharata marches to Chitrakoot with the royal queens, elders, and citizens. In an emotionally charged meeting, Bharata begs Rama to return, but Rama steadfastly upholds their father's sacred word.",
        icon: "⛰️"
    },
    {
        chapter: "Chapter 4: The Bestowal of the Sacred Sandals",
        title: "Padukas as the True Sovereign",
        description: "Recognizing Rama's unshakeable resolve, Bharata asks for Rama's wooden sandals (Charan Paduka). Placing them reverently on his head, Bharata vows to govern solely in the name of the sandals until Rama's return.",
        icon: "🪵"
    },
    {
        chapter: "Chapter 5: 14 Years at Nandigram",
        title: "The Ascetic Ruler and the Triumphant Return",
        description: "Refusing to reside in the palace, Bharata places the sacred Padukas upon the golden throne of Ayodhya and rules from a mud hermitage in Nandigram, dressed in bark cloth, until Rama returns to reclaim the kingdom.",
        icon: "🛕"
    }
];

const SYMBOLIC_THEMES = [
    {
        theme: "Paduka Rajyam (The Rule of the Sandals)",
        concept: "Decoupling Power from Ego",
        description: "The sandals placed on the throne established the enduring Indian political philosophy of trusteeship — that the ruler is only an ethical steward, not an absolute owner of authority.",
        icon: "⚖️"
    },
    {
        theme: "Bhratru Prem (Unconditional Fraternal Bond)",
        concept: "Sacrifice over Ambition",
        description: "Bharata stands as the universal exemplar of brotherly love, willingly renouncing worldly power and matching Rama's forest hardships through voluntary austerity.",
        icon: "🤝"
    },
    {
        theme: "Nandigram Heritage",
        concept: "The Hermitage of Righteous Vigil",
        description: "Located near Ayodhya, the Bharat Kund at Nandigram remains a revered pilgrimage site commemorating fourteen years of unblemished devotion and moral vigilance.",
        icon: "🌸"
    }
];

const REFERENCES = [
    { text: "Valmiki Ramayana — Ayodhya Kanda, Sargas 100–115 (Bharata-Rama Samvada).", link: "https://www.valmikiramayan.net" },
    { text: "Tulsidas. Ramcharitmanas — Ayodhya Kanda, Dohas 'Bharat Charit Haran Kalimal'.", link: "#" },
    { text: "Gandhi, M.K. (1939). Constructive Programme: Its Meaning and Place (Trusteeship Model).", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BHARATA_PADUKA_INFO, STORY_CHAPTERS, SYMBOLIC_THEMES, REFERENCES };
}
