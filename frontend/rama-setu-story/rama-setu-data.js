/**
 * Rama Setu Story Explorer — Data Module
 * Comprehensive dataset covering Rama Setu (The Legendary Journey to Lanka / Adam's Bridge),
 * gathering of the Vanara army at Dhanushkodi, penance to Samudra Deva,
 * engineering leadership of Nala and Nila (sons of Vishwakarma),
 * floating stones inscribed with 'RAMA', the legend of the squirrel's contribution,
 * and the 5-day construction across the 100-yojana ocean strait.
 */

const RAMA_SETU_INFO = {
    id: "rama-setu-story",
    title: "Rama Setu (The Legendary Journey to Lanka)",
    category: "Culture & Literature",
    characters: "Lord Rama, Lakshmana, Chief Engineers Nala & Nila, Sugriva, Lord Hanuman, Samudra Deva",
    startingPoint: "Dhanushkodi / Rameshwaram (Tamil Nadu coast)",
    destination: "Talaimannar / Mount Suvela (Lanka coast)",
    length: "100 Yojanas (Approx. 48 Kilometers across Palk Strait)",
    constructionSpeed: "Built in 5 Days by Millions of Vanaras and Bears",
    sacredPhenomenon: "Floating boulders inscribed with the sacred name of 'RAMA'",
    fableOfHumility: "The Tiny Squirrel (Gilaihri) blessed with three divine stripes for rolling in sand",
    quickStats: [
        { label: "Bridge Span", value: "48 km (100 Yojanas)", icon: "🌊" },
        { label: "Engineers", value: "Nala & Nila", icon: "📐" },
        { label: "Duration", value: "5 Days Construction", icon: "⏱️" },
        { label: "Origin", value: "Dhanushkodi", icon: "📍" },
        { label: "Sacred Stones", value: "Floating Boulders", icon: "🪨" },
        { label: "Fable", value: "The Devoted Squirrel", icon: "🐿️" }
    ]
};

const STORY_CHAPTERS = [
    {
        chapter: "Chapter 1: The Assembly at the Southern Shores",
        title: "The Vanara Army Reaches the Ocean",
        description: "Leading millions of Vanaras and bears, Lord Rama and Sugriva reach the roaring southern ocean at Dhanushkodi. Facing the impassable sea, Rama performs a three-day fast and penance to Samudra Deva.",
        icon: "🌊"
    },
    {
        chapter: "Chapter 2: Samudra Deva's Counsel & Divine Engineers",
        title: "The Heritage of Nala and Nila",
        description: "The Ocean Deity appears before Rama, offering safe passage and revealing that brothers Nala and Nila — sons of the divine architect Vishwakarma — possess the engineering boons to construct a floating bridge.",
        icon: "📐"
    },
    {
        chapter: "Chapter 3: The Floating Stones Inscribed with 'RAMA'",
        title: "The Miracle of Buoyancy and Faith",
        description: "Under Nala's architectural guidance, Vanaras uproot massive cliffs and trees, inscribing 'RAMA' on each boulder. Upon touching the water, the heavy stones float effortlessly, forming a solid highway.",
        icon: "🪨"
    },
    {
        chapter: "Chapter 4: The Legend of the Devoted Squirrel",
        title: "Every Effort Blessed in the Eyes of the Divine",
        description: "A tiny squirrel rolls in the sea and dust, shaking grains of sand between rocks. Mocked by monkeys, Rama gently lifts the squirrel and strokes its back with three fingers, leaving the iconic three stripes as a symbol of pure devotion.",
        icon: "🐿️"
    },
    {
        chapter: "Chapter 5: Completion and Crossing to Lanka",
        title: "The Five-Day Wonder Across the Palk Strait",
        description: "Spanning 14 yojana on Day 1 to reaching the full 100 yojanas by Day 5, the bridge connects Bharatvarsha to Lanka, enabling the army to march across with triumphant battle cries.",
        icon: "⚔️"
    }
];

const GEOGRAPHICAL_AND_CULTURAL_HERITAGE = [
    {
        aspect: "Marine Archaeology & Palk Strait Shoals",
        details: "Chain of Limestone Shoals (Dhanushkodi to Mannar)",
        description: "Modern satellite imagery reveals the 48-km underwater chain of limestone shoals between Pamban Island and Mannar Island, deeply revered as Rama Setu.",
        icon: "🛰️"
    },
    {
        aspect: "Setubandhasana & Pilgrimage Heritage",
        details: "Rameshwaram Jyotirlinga Consecration",
        description: "Before embarking upon the bridge, Rama consecrated the Ramanathaswamy Shiva Lingam at Rameshwaram, establishing one of the four Char Dham pilgrimage centers.",
        icon: "🛕"
    },
    {
        aspect: "Metaphor of Collective Purpose",
        details: "From Giants to Squirrels",
        description: "The construction of Rama Setu represents the quintessential Indian social ideal: monumental societal achievements succeed through the harmonious contribution of every individual, big or small.",
        icon: "🤝"
    }
];

const REFERENCES = [
    { text: "Valmiki Ramayana — Yuddha Kanda, Sarga 22 (Construction of the Setu).", link: "https://www.valmikiramayan.net" },
    { text: "Tulsidas. Ramcharitmanas — Sundara Kanda & Lanka Kanda (Setu Bandhan).", link: "#" },
    { text: "Archaeological Survey of India (ASI) — Rameshwaram and Palk Strait Heritage Surveys.", link: "https://asi.nic.in" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RAMA_SETU_INFO, STORY_CHAPTERS, GEOGRAPHICAL_AND_CULTURAL_HERITAGE, REFERENCES };
}
