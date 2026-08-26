/**
 * Hanuman and Sanjeevani Story Explorer — Data Module
 * Comprehensive dataset covering Hanuman's quest for the life-saving Sanjeevani herb,
 * Lakshmana's wounding by Indrajit's Shakti spear, Sushena's prescription,
 * the flight to Dronagiri / Gandhamadana mountain in the Himalayas,
 * lifting the entire mountain peak, and the pre-dawn revival of the army in Lanka.
 */

const SANJEEVANI_INFO = {
    id: "hanuman-sanjeevani-story",
    title: "Hanuman and Sanjeevani (The Search for the Life-Saving Herb)",
    category: "Culture & Literature",
    characters: "Lord Hanuman, Lakshmana, Lord Rama, Royal Physician Sushena, Indrajit, Prince Bharata",
    herbsPrescribed: "Mrita Sanjeevani (Life-Restoring), Vishalyakarani (Arrow-Extracting), Sandhanakarani (Bone-Joining), Savarnakarani (Skin-Restoring)",
    mountainSource: "Mount Dronagiri / Gandhamadana (High Garhwal Himalayas / Uttarakhand)",
    coreThemes: "Selfless Service, Impossibility Made Possible, Healing & Ayurveda, Devotion",
    battleground: "Lanka Battlefield (Before Sunrise Deadline)",
    quickStats: [
        { label: "Hero", value: "Lord Hanuman (Mahavira)", icon: "🚩" },
        { label: "Sacred Herb", value: "Mrita Sanjeevani", icon: "🌿" },
        { label: "Mountain Lifted", value: "Dronagiri Peak", icon: "🏔️" },
        { label: "Physician", value: "Acharya Sushena", icon: "🩺" },
        { label: "Urgency", value: "Pre-Dawn Deadline", icon: "⏳" },
        { label: "Result", value: "Lakshmana Revived", icon: "✨" }
    ]
};

const STORY_CHAPTERS = [
    {
        chapter: "Chapter 1: The Crisis on the Lanka Battlefield",
        title: "Lakshmana Struck by the Shakti Weapon",
        description: "During the fierce nocturnal battle in Lanka, Ravana's son Indrajit unleashes the celestial Veeraghatini Shakti spear, striking Lakshmana unconscious and plunging Lord Rama and the Vanara army into deep despair.",
        icon: "⚡"
    },
    {
        chapter: "Chapter 2: The Diagnosis of Royal Physician Sushena",
        title: "The Four Luminescent Herbs of the North",
        description: "Physician Sushena examines Lakshmana and declares that only four divine glowing herbs — especially Mrita Sanjeevani — atop the distant Himalayan Dronagiri mountain can restore his life before the morning sun rises.",
        icon: "🩺"
    },
    {
        chapter: "Chapter 3: The Swift Transcontinental Flight",
        title: "Leaping Across the Length of Bharatvarsha",
        description: "Hanuman assumes his colossal form and flies at supersonic speed across forests, rivers, and plains from the southern tip of Lanka all the way to the snow-capped Himalayan summits.",
        icon: "💨"
    },
    {
        chapter: "Chapter 4: The Mystery of the Luminescent Flora",
        title: "Lifting the Entire Dronagiri Mountain",
        description: "Arriving at Dronagiri, Hanuman finds the entire peak glowing with radiant flora. Unable to identify which exact herb is Sanjeevani in the darkness, Hanuman uproots the entire mountain summit and balances it on his palm.",
        icon: "🏔️"
    },
    {
        chapter: "Chapter 5: Pre-Dawn Revival and Triumph",
        title: "Restoration of Lakshmana and the Vanaras",
        description: "Hanuman lands in Lanka before sunrise. Sushena crushes the Sanjeevani herbs, and their celestial fragrance revives Lakshmana and countless fallen Vanara warriors, filling the camp with ecstatic cheers of victory.",
        icon: "✨"
    }
];

const CULTURAL_SIGNIFICANCE = [
    {
        title: "Symbol of Unwavering Resourcefulness",
        concept: "When in Doubt, Bring the Mountain",
        description: "Hanuman lifting the mountain has become the universal cultural metaphor for overcoming seemingly impossible obstacles through unwavering devotion and bold problem-solving.",
        icon: "💪"
    },
    {
        title: "The Botanical & Ayurvedic Legacy of Sanjeevani",
        concept: "Selaginella Bryopteris & Himalayan Flora",
        description: "Indian botanical and Ayurvedic science connects the legendary Sanjeevani herb to resuscitation-capable plants such as Selaginella bryopteris found in the Garhwal Himalayas.",
        icon: "🌱"
    },
    {
        title: "Dronagiri Village & Himalayan Folklore",
        concept: "Sacred Peaks in Chamoli District",
        description: "The residents of Dronagiri village in Uttarakhand still preserve ancient oral traditions surrounding the mountain and its celestial botanical wealth.",
        icon: "🛕"
    }
];

const REFERENCES = [
    { text: "Valmiki Ramayana — Yuddha Kanda, Sargas 74 & 101–102 (The Sanjeevani Quest).", link: "https://www.valmikiramayan.net" },
    { text: "Tulsidas. Ramcharitmanas — Lanka Kanda, Chaupais on 'Lachhiman Moorachha aur Ram Bilap'.", link: "#" },
    { text: "Sah, N. K. et al. (2005). Indian herb 'Sanjeevani' (Selaginella bryopteris) can promote cell survival. Journal of Biosciences.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SANJEEVANI_INFO, STORY_CHAPTERS, CULTURAL_SIGNIFICANCE, REFERENCES };
}
