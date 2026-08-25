/**
 * Lava and Kusha Story Explorer — Data Module
 * Comprehensive dataset covering Lava and Kusha (The Young Princes of Ayodhya),
 * Valmiki's hermitage upbringing, singing of the Ramayana, the Ashwamedha challenge,
 * and the foundational history of Lavapuri and Kushavati.
 */

const LAVA_KUSHA_INFO = {
    id: "lava-kusha-story",
    title: "Lava and Kusha (The Young Princes of Ayodhya)",
    category: "Culture & Literature",
    characters: "Lava, Kusha, Sita (Janaki), Rama, Maharishi Valmiki, Lakshmana",
    birthplace: "Valmiki Ashram (Banks of Tamsa River / Bithoor)",
    lineage: "Suryavansha (Solar Dynasty) of Ayodhya",
    mentor: "Maharishi Valmiki (The Adi Kavi / First Poet)",
    coreThemes: "Filial Devotion, Musical Epic Storytelling, Martial Mastery, Family Reunion",
    historicCities: "Lavapuri (Modern Lahore) founded by Lava & Kushavati (Kasur) founded by Kusha",
    quickStats: [
        { label: "Princes", value: "Lava & Kusha", icon: "👑" },
        { label: "Hermitage", value: "Valmiki Ashram", icon: "🛕" },
        { label: "Guru", value: "Maharishi Valmiki", icon: "📜" },
        { label: "Epic Recited", value: "The Ramayana", icon: "🎶" },
        { label: "Horse Captured", value: "Ashwamedha Stallion", icon: "🐎" },
        { label: "Dynasty", value: "Suryavansha", icon: "☀️" }
    ]
};

const STORY_CHAPTERS = [
    {
        chapter: "Chapter 1: Birth and Childhood in Valmiki's Hermitage",
        title: "The Twins of the Forest Ashram",
        description: "Following Queen Sita's exile, Sage Valmiki provides shelter at his peaceful hermitage on the banks of the Tamsa River, where twin princes Lava and Kusha are born and raised in simplicity.",
        icon: "🌿"
    },
    {
        chapter: "Chapter 2: Education under the Adi Kavi",
        title: "Mastery of Scripture, Archery and Song",
        description: "Valmiki trains the young princes in the Vedas, celestial archery (Dhanurveda), statecraft, and music, teaching them to sing the 24,000 verses of the Ramayana set to melodic veena rhythms.",
        icon: "🏹"
    },
    {
        chapter: "Chapter 3: The Singing of the Epic in Ayodhya",
        title: "Melodies that Moved the Royal Court",
        description: "Lava and Kusha travel to Ayodhya and sing the Ramayana before King Rama, courtiers, and citizens, stirring profound emotions and bringing tears to their father's eyes without revealing their identity.",
        icon: "🎶"
    },
    {
        chapter: "Chapter 4: The Ashwamedha Challenge",
        title: "Capturing the Royal Sacrificial Steed",
        description: "When the sacrificial horse of King Rama's Ashwamedha Yajna wanders near the ashram, the brave twins capture it, defeating royal armies and formidable warriors with divine archery skills.",
        icon: "🐎"
    },
    {
        chapter: "Chapter 5: Revelation, Sita's Return & Legacy",
        title: "Reunion and Founding of Ancient Kingdoms",
        description: "Rama arrives on the battlefield to discover the twins are his own sons. Sita calls upon Mother Earth (Bhoomi Devi) to receive her, while Lava and Kusha inherit their royal destiny, later establishing the kingdoms of Lavapuri and Kushavati.",
        icon: "✨"
    }
];

const CULTURAL_SIGNIFICANCE = [
    {
        title: "The Oral Tradition of Epics (Kushilava)",
        description: "The name 'Kushilava' became synonymous in classical Sanskrit with bardic minstrels and oral preservers of sacred poetry.",
        icon: "📖"
    },
    {
        title: "Dharmic Ideal of Youth and Valor",
        description: "Lava and Kusha exemplify the synthesis of intellectual wisdom (Brahma Tejas) and martial courage (Kshatra Tejas).",
        icon: "⚔️"
    },
    {
        title: "Architectural and Regional Heritage",
        description: "Historical landmarks from Bithoor in Uttar Pradesh to Ram Tirth in Amritsar preserve the sacred memory of Valmiki's ashram.",
        icon: "🏛️"
    }
];

const REFERENCES = [
    { text: "Valmiki Ramayana — Uttara Kanda (Critical Edition, Oriental Institute, Baroda).", link: "https://www.valmikiramayan.net" },
    { text: "Goldman, Robert P. & Goldman, Sally J. (2018). The Ramayana of Valmiki: Uttarakanda. Princeton University Press.", link: "#" },
    { text: "Bhavabhuti (c. 8th Century CE). Uttaramacharita (The Later Story of Rama).", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LAVA_KUSHA_INFO, STORY_CHAPTERS, CULTURAL_SIGNIFICANCE, REFERENCES };
}
