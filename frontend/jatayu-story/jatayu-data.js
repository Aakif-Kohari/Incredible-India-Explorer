/**
 * Jatayu Story Explorer — Data Module
 * Comprehensive dataset covering Jatayu (The Divine Bird Who Stood Against Ravana),
 * connection with King Dasharatha, heroic aerial battle against Ravana to defend Sita,
 * guiding Rama & Lakshmana to the southern trail, sacred final rites by Rama,
 * and cultural landmarks at Chadayamangalam (Kerala) and Lepakshi (Andhra Pradesh).
 */

const JATAYU_INFO = {
    id: "jatayu-story",
    title: "Jatayu (The Bird Who Stood Against Ravana)",
    category: "Culture & Literature",
    lineage: "Son of Aruna (Charioteer of Surya) & Brother of Sampati",
    identity: "Noble Vulture King (Gridhra Raja) and Devoted Friend of King Dasharatha",
    battleLocation: "Mid-air over Dandakaranya forest skies (intercepting Pushpaka Vimana)",
    restingPlace: "Chadayamangalam (Kollam, Kerala) / Lepakshi (Sri Sathya Sai, Andhra Pradesh)",
    coreThemes: "Courage against Injustice, Supreme Sacrifice, Protective Chivalry, Moksha",
    modernMonument: "Jatayu Earth's Center (Chadayamangalam, Kerala — World's Largest Bird Sculpture)",
    quickStats: [
        { label: "Hero", value: "Jatayu (Gridhra Raja)", icon: "🦅" },
        { label: "Opponent", value: "Ravana (King of Lanka)", icon: "👑" },
        { label: "Lineage", value: "Son of Aruna", icon: "☀️" },
        { label: "Sacred Rites", value: "Performed by Rama", icon: "🔥" },
        { label: "Virtue", value: "Supreme Valor", icon: "⚔️" },
        { label: "Memorial", value: "Jatayu Earth's Center", icon: "🏛️" }
    ]
};

const STORY_CHAPTERS = [
    {
        chapter: "Chapter 1: The Noble Lineage and Royal Bond",
        title: "Friendship with King Dasharatha",
        description: "Son of Aruna and nephew of Garuda, the mighty vulture king Jatayu forged a deep friendship with King Dasharatha of Ayodhya, pledging to protect Dasharatha's sons whenever they dwelt in the Dandakaranya forest.",
        icon: "🦅"
    },
    {
        chapter: "Chapter 2: The Abduction of Sita from Panchavati",
        title: "The Cry for Help in the Sky",
        description: "Having lured Rama and Lakshmana away through the illusory golden deer (Maricha), Ravana abducts Queen Sita in the aerial chariot Pushpaka Vimana. Hearing Sita's despairing cries, the elderly Jatayu rises into the heavens.",
        icon: "☁️"
    },
    {
        chapter: "Chapter 3: The Epic Aerial Duel",
        title: "Shattering the Demon King's Chariot",
        description: "Despite overwhelming odds and his aged body, Jatayu fearlessly attacks Ravana, destroying his chariot, killing the celestial mules, breaking his bow, and tearing into the demon king with sharp talons and beak.",
        icon: "⚔️"
    },
    {
        chapter: "Chapter 4: The Severing of Wings and Final Breath",
        title: "Clinging to Life for Rama",
        description: "Ravana draws his celestial Chandrahas sword and slices off Jatayu's wings. Mortally wounded, Jatayu falls to the earth but gathers all his remaining life-force, waiting patiently for Rama to arrive.",
        icon: "🩸"
    },
    {
        chapter: "Chapter 5: The Final Message and Moksha",
        title: "Filial Last Rites Performed by Lord Rama",
        description: "Rama and Lakshmana find the dying bird. Jatayu reveals that Ravana has taken Sita southward towards Lanka. Overcome with tears, Rama performs the sacred funeral rites (Moksha) for Jatayu as if for his own father.",
        icon: "🌸"
    }
];

const CULTURAL_MONUMENTS = [
    {
        name: "Jatayu Earth's Center (Chadayamangalam, Kerala)",
        feature: "World's Largest Functional Bird Sculpture (200 ft length)",
        description: "Perched atop a 1,000-ft rock hill where Jatayu is believed to have fallen, symbolizing woman safety, honor, and environmental conservation.",
        icon: "🗿"
    },
    {
        name: "Lepakshi Temple (Andhra Pradesh)",
        feature: "Sacred Phrase 'Le Pakshi' (Rise, O Bird!)",
        description: "16th-century Vijayanagara architectural marvel built at the spot where Rama uttered 'Le Pakshi' to the fallen Jatayu, featuring the hanging pillar and giant monolithic Nandi.",
        icon: "🛕"
    },
    {
        name: "Ethical Ideal of Active Resistance",
        feature: "Courage to Resist Even in Certain Defeat",
        description: "Jatayu is venerated in Indian philosophy as the symbol of righteous resistance — proving that standing up against oppression is an imperative duty regardless of personal victory.",
        icon: "🛡️"
    }
];

const REFERENCES = [
    { text: "Valmiki Ramayana — Aranya Kanda, Sargas 50–52 & 67–68 (Jatayu Moksha).", link: "https://www.valmikiramayan.net" },
    { text: "Kerala Tourism — Jatayu Earth's Center, Chadayamangalam.", link: "https://www.keralatourism.org" },
    { text: "Archaeological Survey of India (ASI) — Veerabhadra Temple, Lepakshi.", link: "https://asi.nic.in" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JATAYU_INFO, STORY_CHAPTERS, CULTURAL_MONUMENTS, REFERENCES };
}
