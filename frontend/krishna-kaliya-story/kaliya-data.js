/**
 * Krishna and Kaliya Story Explorer — Data Module
 * Comprehensive dataset covering Krishna and Kaliya (The Serpent of the Yamuna / Kaliya Mardan),
 * the poisoning of the Yamuna at Kaliya Ghat in Vrindavan,
 * Krishna leaping from the Kadamba tree, the cosmic dance upon the 110 hoods of Kaliya,
 * the prayers of the Nagapatnis (Naga Patni Stuti), exile to Ramanaka Island,
 * and ecological river preservation metaphors.
 */

const KALIYA_INFO = {
    id: "krishna-kaliya-story",
    title: "Krishna and Kaliya (The Serpent of the Yamuna)",
    category: "Culture & Literature",
    characters: "Lord Krishna (Gopala), Kaliya (Multi-Headed Naga King), Nagapatnis (Wives of Kaliya), Balarama, Cowherds of Vraja",
    location: "Kaliya Ghat (Banks of River Yamuna, Vrindavan, Mathura)",
    sacredTree: "The Lone Green Kadamba Tree (Only tree spared from serpent venom)",
    coreThemes: "Triumph over Malevolent Ego, Ecological Cleansing of Rivers, Mercy and Surrender (Sharanagati)",
    serpentDestination: "Ramanaka Island (Exiled to deep ocean waters with Krishna's protective footprint)",
    quickStats: [
        { label: "Protagonist", value: "Lord Krishna", icon: "🪈" },
        { label: "Serpent King", value: "Kaliya (110 Hoods)", icon: "🐍" },
        { label: "Sacred River", value: "River Yamuna", icon: "🌊" },
        { label: "Historic Site", value: "Kaliya Ghat, Vrindavan", icon: "🛕" },
        { label: "Cosmic Act", value: "Kaliya Mardan Dance", icon: "💃" },
        { label: "Key Teaching", value: "Subjugation of Ego", icon: "✨" }
    ]
};

const STORY_CHAPTERS = [
    {
        chapter: "Chapter 1: The Venomous Waters of Yamuna",
        title: "Kaliya Takes Refuge at Vrindavan",
        description: "Fleeing the wrath of Garuda, the multi-headed serpent king Kaliya takes shelter in a deep pool of the Yamuna river at Vrindavan. His deadly venom boils the water, withering trees and killing birds that fly overhead.",
        icon: "☠️"
    },
    {
        chapter: "Chapter 2: The Plunge from the Kadamba Tree",
        title: "Young Krishna Dives into the Whirlpool",
        description: "Witnessing his beloved cowherd friends and cows collapse from the poisoned water, young Krishna climbs the solitary living Kadamba tree, tightens his sash, and fearlessly dives into the boiling serpent pool.",
        icon: "🌳"
    },
    {
        chapter: "Chapter 3: The Battle in the Depths",
        title: "Coiled by the Serpent King",
        description: "Enraged by the disturbance, Kaliya coils his massive venomous bodies around Krishna, spitting fire and fumes. Smiling serenely, Krishna expands his divine form, shattering the serpent's grip with effortless ease.",
        icon: "🌊"
    },
    {
        chapter: "Chapter 4: The Cosmic Dance of Kaliya Mardan",
        title: "Dancing upon the 110 Hoods",
        description: "Krishna leaps onto the heads of Kaliya, dancing with the grace of the cosmos. Whenever a hood raises in pride, Krishna strikes it with his lotus foot, playing his flute while heavenly Devas shower flowers and sound celestial drums.",
        icon: "🪈"
    },
    {
        chapter: "Chapter 5: The Prayers of the Nagapatnis & Mercy",
        title: "Surrender and Expatriation to Ramanaka",
        description: "Bleeding and humiliated, Kaliya's wives (Nagapatnis) emerge with folded hands, singing the sublime Naga Patni Stuti. Krishna spares Kaliya, imprinting his holy footprint on Kaliya's brow to protect him from Garuda, and exiles him to Ramanaka Island, cleansing the Yamuna.",
        icon: "🌸"
    }
];

const DID_YOU_KNOW = [
    {
        fact: "The Ancient Kadamba Tree at Kaliya Ghat",
        details: "Surviving Sacred Tree of Vrindavan",
        description: "Pilgrims in Vrindavan still visit the ancient Kadamba tree at Kaliya Ghat, traditionally venerated as the very tree from which Krishna leapt into the Yamuna.",
        icon: "🌿"
    },
    {
        fact: "Ancient Ecological Metaphor for River Cleansing",
        details: "First Recorded Environmental Awakening",
        description: "Modern ecological scholars view the Kaliya Mardan episode as the earliest Indian cultural allegory for purging toxicity and restoring sacred river ecosystems to pristine purity.",
        icon: "💧"
    },
    {
        fact: "Garuda's Curse at Vrindavan",
        details: "Why Kaliya Chose the Yamuna Pool",
        description: "Sage Saubhari had cursed Garuda that he would perish if he ever hunted in the Yamuna near Vrindavan, making the river pool the only sanctuary where Kaliya was safe from the celestial eagle.",
        icon: "🦅"
    }
];

const REFERENCES = [
    { text: "Srimad Bhagavatam (Bhagavata Purana) — Canto 10, Chapters 16–17 (Kaliya Damana).", link: "https://vedabase.io/en/library/sb/10/16/" },
    { text: "Vishnu Purana — Book 5, Chapter 7 (Subjugation of Kaliya).", link: "#" },
    { text: "Haberman, David L. (2006). River of Love in an Age of Pollution: The Yamuna River of Northern India. University of California Press.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KALIYA_INFO, STORY_CHAPTERS, DID_YOU_KNOW, REFERENCES };
}
