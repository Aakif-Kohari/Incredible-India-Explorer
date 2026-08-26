/**
 * Shabari and Rama Story Explorer — Data Module
 * Comprehensive dataset covering Shabari and Lord Rama (A Story of Devotion),
 * disciple of Sage Matanga at Matanga Ashram near Lake Pampa (Kishkindha),
 * elderly devotee offering sweet wild berries (Ber / Jujube), Navadha Bhakti,
 * and the destruction of caste/social boundaries in Indian spiritual thought.
 */

const SHABARI_INFO = {
    id: "shabari-rama-story",
    title: "Shabari and Rama (A Story of Devotion)",
    category: "Culture & Literature",
    characters: "Shabari (Devoted Ascetic), Lord Rama, Lakshmana, Sage Matanga",
    community: "Nishada / Bhil (Indigenous Forest Community)",
    hermitage: "Matanga Ashram (Near Pampa Sarovar, Kishkindha / Modern Hampi Region)",
    coreThemes: "Pure Devotion (Bhakti), Spiritual Equality, Egoless Hospitality, Navadha Bhakti",
    sacredOffering: "Wild Ber (Jujube Fruits) tasted with maternal devotion",
    spiritualDiscourse: "The Discourse on Ninefold Devotion (Navadha Bhakti Samvada)",
    quickStats: [
        { label: "Protagonist", value: "Shabari", icon: "👵" },
        { label: "Divine Guest", value: "Lord Rama", icon: "🏹" },
        { label: "Ashram", value: "Matanga Hermitage", icon: "🛕" },
        { label: "Offering", value: "Sweet Wild Ber", icon: "🍒" },
        { label: "Locale", value: "Pampa Sarovar", icon: "🌊" },
        { label: "Discourse", value: "Navadha Bhakti", icon: "🌸" }
    ]
};

const STORY_CHAPTERS = [
    {
        chapter: "Chapter 1: The Devoted Disciple in the Forest",
        title: "Life at Sage Matanga's Hermitage",
        description: "Born into an indigenous forest clan, Shabari chooses a life of spiritual contemplation, serving Sage Matanga and fellow ascetics with tireless selflessness at their hermitage near Lake Pampa.",
        icon: "🌿"
    },
    {
        chapter: "Chapter 2: The Guru's Promise of Rama's Arrival",
        title: "Decades of Patient Anticipation",
        description: "Before departing this earthly realm, Sage Matanga assures the faithful Shabari that Lord Rama will visit her hermitage during his forest journey, sparking decades of daily loving preparation.",
        icon: "⏳"
    },
    {
        chapter: "Chapter 3: The Daily Forest Rituals",
        title: "Sweeping Paths and Gathering Ripe Berries",
        description: "Every morning for decades, the aging Shabari cleans the forest pathways with flower petals and handpicks the sweetest wild berries (Ber), tasting each to ensure only the sweetest are offered to her Lord.",
        icon: "🍒"
    },
    {
        chapter: "Chapter 4: The Sacred Encounter at Pampa",
        title: "Tasting the Berries with Unconditional Grace",
        description: "Rama and Lakshmana arrive at the hermitage. Overjoyed, Shabari washes their feet and offers the berries. Rama eats each tasted fruit with heartfelt delight, dissolving all notions of caste, birth, and ritual purity.",
        icon: "🌸"
    },
    {
        chapter: "Chapter 5: Navadha Bhakti and Supreme Liberation",
        title: "The Ninefold Devotion and Yogic Ascendance",
        description: "Rama imparts the profound teaching of Navadha Bhakti (Nine forms of true devotion) to Shabari, praises her purity, and seeks her counsel to find Sugriva at Mount Rishyamukha before Shabari attains Moksha in yogic flame.",
        icon: "🔥"
    }
];

const DEVOTIONAL_THEMES = [
    {
        theme: "Navadha Bhakti (The 9 Forms of Devotion)",
        significance: "Spiritual Path for Every Soul",
        description: "Lord Rama outlines the ninefold path — ranging from companionship with the wise (Satsang) to simple unhypocritical faith and seeing the divine in all beings.",
        icon: "📜"
    },
    {
        theme: "Destruction of Social Hierarchies",
        significance: "Bhakti Over Caste and Ritual",
        description: "The story is the cornerstone of Indian reformist and egalitarian thought, proving that love and sincerity transcend social status, lineage, and orthodox ritual barriers.",
        icon: "🤝"
    },
    {
        theme: "Pampa Sarovar & Kishkindha Geography",
        significance: "Sacred Landscape in Modern Karnataka",
        description: "The pristine Pampa Lake and Matanga Hill near Hampi (Karnataka) remain eternal pilgrimage sites where pilgrims celebrate Shabari's pure devotion.",
        icon: "🏞️"
    }
];

const REFERENCES = [
    { text: "Valmiki Ramayana — Aranya Kanda, Sargas 73–74 (Shabari Darshana).", link: "https://www.valmikiramayan.net" },
    { text: "Tulsidas. Ramcharitmanas — Aranya Kanda, Chaupai 'Navadha Bhakti Kahau Tohi Pahi'.", link: "#" },
    { text: "Karnataka Tourism — Pampa Sarovar and Matanga Hill, Hampi World Heritage.", link: "https://www.karnatakatourism.org" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SHABARI_INFO, STORY_CHAPTERS, DEVOTIONAL_THEMES, REFERENCES };
}
