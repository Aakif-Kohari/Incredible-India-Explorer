/**
 * Hanuman's Leap to Lanka Story Explorer — Data Module
 * Comprehensive dataset covering Hanuman's legendary 100-yojana leap across the ocean to Lanka,
 * Jambavan awakening his dormant strength at Mount Mahendra,
 * encounters with Mount Mainaka, Surasa (Mother of Nagas), and Simhika (Shadow-Snatcher),
 * and landing upon Mount Suvela in Lanka.
 */

const HANUMAN_LEAP_INFO = {
    id: "hanumans-leap-to-lanka",
    title: "Hanuman's Leap to Lanka (The Journey Across the Ocean)",
    category: "Culture & Literature",
    hero: "Lord Hanuman (Sundara / Pavanasuta)",
    launchPoint: "Mount Mahendra (Southern coast of Tamil Nadu / Bharatvarsha)",
    landingPoint: "Mount Suvela / Trikuta (Lanka)",
    distance: "100 Yojanas (Vast Oceanic Expanse)",
    mentorAwakener: "King Jambavan (The Wise Bear King)",
    coreThemes: "Selfless Courage, Intellectual Agility, Devotion, Overcoming Cosmic Tests",
    ramayanaBook: "Sundara Kanda (The Beautiful Book of the Epic)",
    quickStats: [
        { label: "Hero", value: "Lord Hanuman", icon: "🚩" },
        { label: "Launch Mountain", value: "Mount Mahendra", icon: "⛰️" },
        { label: "Ocean Span", value: "100 Yojanas", icon: "🌊" },
        { label: "Awakener", value: "King Jambavan", icon: "🐻" },
        { label: "Book of Epic", value: "Sundara Kanda", icon: "📖" },
        { label: "Landing Peak", value: "Mount Suvela", icon: "🏝️" }
    ]
};

const JOURNEY_STAGES = [
    {
        stage: "Stage 1: Mount Mahendra & The Awakening",
        title: "Jambavan Reminds Hanuman of His Cosmic Prowess",
        description: "Stranded at the edge of the roaring ocean, the Vanara search party is gripped with despair. The elder Jambavan reminds Hanuman of his divine birth and dormant powers, prompting Hanuman to expand into a colossal golden form (Mahakaya).",
        icon: "⚡"
    },
    {
        stage: "Stage 2: The Mighty Takeoff across the Sky",
        title: "Launching Like a Blazing Comet",
        description: "Pressing his feet deep into Mount Mahendra until rocks tremor, Hanuman leaps into the sky with the speed of wind, his shadow casting a giant trail across the oceanic waves.",
        icon: "💨"
    },
    {
        stage: "Stage 3: Encounter with Mount Mainaka",
        title: "The Golden Mountain Rising from the Waters",
        description: "The golden Mount Mainaka rises out of the ocean, offering Hanuman hospitality and a resting peak. Hanuman respectfully touches the mountain with his fingertips but declines rest, prioritizing Rama's mission.",
        icon: "⛰️"
    },
    {
        stage: "Stage 4: Outsmarting Surasa, Mother of Nagas",
        title: "The Test of Wit and Humility",
        description: "Sent by the Devas to test his intellect, Surasa opens her jaws wider and wider to swallow Hanuman. In a flash of genius, Hanuman expands massively, then suddenly shrinks to the size of a thumb, slips in and out of her mouth, earning her divine blessings.",
        icon: "🐉"
    },
    {
        stage: "Stage 5: Slaying the Shadow-Snatcher Simhika",
        title: "Destroying the Phantom of the Depths",
        description: "The demoness Simhika traps Hanuman by capturing his reflection/shadow on the water. Recognizing the threat, Hanuman dives straight into her mouth, tears through her vitals from within, and destroys her before soaring onward.",
        icon: "⚔️"
    },
    {
        stage: "Stage 6: Arrival on Mount Suvela in Lanka",
        title: "Gazing Upon the Golden Citadel",
        description: "Hanuman safely completes the 100-yojana flight, landing upon the green slopes of Mount Suvela overlooking Lanka, where he shrinks into a small monkey to begin his search for Sita.",
        icon: "🏝️"
    }
];

const CULTURAL_PERSPECTIVES = [
    {
        dimension: "Sundara Kanda Recitation Tradition",
        focus: "Removing Obstacles & Cultivating Resilience",
        description: "Sundara Kanda, which narrates the ocean leap, is widely chanted across India as a spiritual remedy to banish fear, doubt, and seemingly insurmountable crises.",
        icon: "📜"
    },
    {
        dimension: "Philosophy of Three Tests",
        focus: "Overcoming Temptation, Ego, and Obstruction",
        description: "Mainaka represents the temptation of premature rest, Surasa represents challenges to be resolved through wit, and Simhika represents malice to be decisively destroyed.",
        icon: "🧠"
    },
    {
        dimension: "Classical Art & Iconography",
        focus: "Hanuman Soaring Over the Seas",
        description: "From classical temple sculptures in Hampi to miniature paintings across Rajasthan and Kangra, Hanuman leaping over waves is one of the most celebrated motifs in Indian art.",
        icon: "🎨"
    }
];

const REFERENCES = [
    { text: "Valmiki Ramayana — Sundara Kanda, Sarga 1 (The Leaping of the Ocean).", link: "https://www.valmikiramayan.net" },
    { text: "Tulsidas. Ramcharitmanas — Sundara Kanda, Chaupai 'Jaamavanta ke Bachana Suhaaye'.", link: "#" },
    { text: "Lutgendorf, Philip (2007). Hanuman's Tale: The Messages of a Divine Monkey. Oxford University Press.", link: "#" }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HANUMAN_LEAP_INFO, JOURNEY_STAGES, CULTURAL_PERSPECTIVES, REFERENCES };
}
