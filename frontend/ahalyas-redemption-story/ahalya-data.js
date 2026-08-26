/**
 * Ahalya's Redemption Story Explorer — Data Module
 * Comprehensive dataset covering Ahalya's redemption (Ahalya Moksha / Uddhar),
 * Sage Gautama's hermitage near Mithila, Sage Vishwamitra's guidance,
 * Rama's compassionate grace, and multi-textual literary traditions (Valmiki, Tulsidas, Kamban).
 */

const AHALYA_INFO = {
    id: "ahalyas-redemption-story",
    title: "Ahalya's Redemption (A Story of Transformation)",
    category: "Culture & Literature",
    characters: "Ahalya, Sage Gautama Maharishi, Prince Rama, Lakshmana, Brahmarshi Vishwamitra, Indra",
    location: "Gautama Ashram (near Mithila / Janakpur realm)",
    coreThemes: "Spiritual Transformation, Divine Compassion, Moral Redemption, Deliverance (Moksha)",
    literaryTraditions: "Valmiki Ramayana (Bala Kanda), Ramcharitmanas of Tulsidas, Kamba Ramayanam, Adhyatma Ramayana",
    distinction: "Traditional allegorical epic narrative exploring ethical restoration and divine grace",
    quickStats: [
        { label: "Protagonist", value: "Ahalya", icon: "✨" },
        { label: "Sage Consort", value: "Gautama Maharishi", icon: "🧘" },
        { label: "Redeemer", value: "Prince Rama", icon: "🏹" },
        { label: "Guide", value: "Sage Vishwamitra", icon: "📜" },
        { label: "Locale", value: "Mithila Outskirts", icon: "🛕" },
        { label: "Theme", value: "Moksha & Grace", icon: "🌸" }
    ]
};

const STORY_CHAPTERS = [
    {
        chapter: "Chapter 1: The Creation and Ashram Life",
        title: "Pristine Hermitage of Sage Gautama",
        description: "Created by Brahma as a paragon of grace, Ahalya lives a life of quiet austerity alongside her husband, Sage Gautama, in their serene hermitage on the outskirts of Mithila.",
        icon: "🌿"
    },
    {
        chapter: "Chapter 2: The Deception and the Curse",
        title: "The Violation of Cosmic Order",
        description: "King Indra assumes Gautama's guise to deceive Ahalya. Upon discovering the breach of Dharma, Gautama curses Indra and sentences Ahalya to long penance — invisible and sustained by air until the arrival of Rama.",
        icon: "⚡"
    },
    {
        chapter: "Chapter 3: The Centuries of Penance",
        title: "Solitary Austerity in the Deserted Grove",
        description: "For centuries, the hermitage remains silent, overgrown, and untrodden by mortal beings as Ahalya endures deep meditative purification, awaiting the promised divine dawn.",
        icon: "🪨"
    },
    {
        chapter: "Chapter 4: The Arrival of Vishwamitra and Rama",
        title: "Footsteps of Compassion at Mithila",
        description: "Brahmarshi Vishwamitra guides young princes Rama and Lakshmana to the sacred grove, narrating Ahalya's history and requesting Rama to enter the hermitage and redeem the noble soul.",
        icon: "🏹"
    },
    {
        chapter: "Chapter 5: Redemption, Forgiveness and Reunion",
        title: "Ahalya Moksha and Restoration",
        description: "As Rama steps into the hermitage, his divine aura and compassionate dust of feet release Ahalya from the curse. Reappearing in radiant splendor, she worships Rama, and Gautama returns to welcome her home.",
        icon: "🌸"
    }
];

const LITERARY_INTERPRETATIONS = [
    {
        tradition: "Valmiki Ramayana (Bala Kanda)",
        focus: "Invisible Penance & Ascetic Cleansing",
        description: "Ahalya remains invisible to all beings, subsisting on air and ashes until Rama's presence renders her visible again in full spiritual splendor.",
        icon: "📜"
    },
    {
        tradition: "Ramcharitmanas by Goswami Tulsidas",
        focus: "The Touch of Rama's Lotus Feet (Charan Chhoovat)",
        description: "Popularized the iconic image of Ahalya turning to stone (Shila) and re-emerging into human form the instant Rama's sacred dust touches the rock.",
        icon: "🪷"
    },
    {
        tradition: "Kamba Ramayanam (Tamil Tradition)",
        focus: "Philosophical Allegory of Ignorance to Illumination",
        description: "Kamban depicts the transformation as the illumination of consciousness where Rama's grace dissolves the inertia of accumulated karma.",
        icon: "🪔"
    }
];

const REFERENCES = [
    { text: "Valmiki Ramayana — Bala Kanda, Sargas 48–49.", link: "https://www.valmikiramayan.net" },
    { text: "Tulsidas. Ramcharitmanas — Bala Kanda, Chaupai 'Gautam Nari Tari'.", link: "#" },
    { text: "Bhattacharji, Sukumari (1988). The Indian Theogony: A History of Indian Mythology. Cambridge University Press.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AHALYA_INFO, STORY_CHAPTERS, LITERARY_INTERPRETATIONS, REFERENCES };
}
