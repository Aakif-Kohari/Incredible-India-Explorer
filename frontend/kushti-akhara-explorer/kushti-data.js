// kushti-data.js
// Data for the Kushti: The Akhara Tradition Explorer

const KUSHTI_STATS = [
    { label: "Roots Traced To", value: "Vedic Era" },
    { label: "Training Equipment", value: "6 Types" },
    { label: "Regional Traditions", value: "5" },
    { label: "Wrestling Surface", value: "Sacred Clay Pit" },
];

const KUSHTI_OVERVIEW = {
    intro: "Pehlwani, commonly known as Kushti, is India's traditional form of wrestling — not merely a sport but a complete way of life practiced in earthen-pit training schools called akharas. Wrestling on the subcontinent traces back to at least the Vedic period, with references appearing in the Mahabharata and Ramayana, and the modern discipline blends indigenous Indian grappling with wrestling styles introduced during the Mughal era.",
    facts: [
        { title: "Sacred Clay Pit", detail: "A traditional akhara centers on a pit filled with red clay soil, softened, tilled, and mixed with turmeric, ghee, buttermilk, and oil. The soil is considered sacred, and wrestlers perform rituals before entering it, then rub it over their bodies to improve grip." },
        { title: "Guru-Shishya System", detail: "Disciples, called shishya, typically join an akhara around age seven under a guru or 'ustad', often living, training, and eating together at the school for years under a strict apprenticeship system." },
        { title: "Way of Life, Not Just Sport", detail: "Serious pehlwans (wrestlers) traditionally follow strict vegetarian diets, celibacy (brahmacharya), and abstain from alcohol, treating training as a total lifestyle commitment rather than one part of a broader life." },
    ],
};

const KUSHTI_EQUIPMENT = [
    {
        id: "gada",
        name: "Gada (Mace)",
        icon: "🏋️",
        desc: "A heavy round stone or wooden head attached to the end of a long bamboo or wooden shaft, swung behind the back in various patterns to build grip strength and shoulder endurance.",
        significance: "Associated with the Hindu god Hanuman, patron deity of wrestlers, whose gada is said to have been the largest in the world. The legendary wrestler Gama Pehlwan was known for extensive gada training, and winners of kushti contests are traditionally awarded a gada trophy in silver or gold.",
    },
    {
        id: "mugdar",
        name: "Mugdar / Jori (Indian Clubs)",
        icon: "🪵",
        desc: "Paired wooden clubs, often bottle-shaped, swung in coordinated patterns to build shoulder mobility, forearm strength, and grip endurance.",
        significance: "Introduced into akhara training during the Mughal era, mugdar exercises later influenced Western 'Indian club' fitness routines and are still a core part of daily akhara conditioning today.",
    },
    {
        id: "nal",
        name: "Nal (Stone Cylinder)",
        icon: "⚫",
        desc: "A hollow stone cylinder fitted with an internal handle, lifted and pressed in various patterns as a core strength-training implement.",
        significance: "One of the most fundamental pieces of akhara equipment, used to build the raw functional strength needed for grappling and throws.",
    },
    {
        id: "gar-nal",
        name: "Gar Nal (Neck Weight)",
        icon: "🔵",
        desc: "A circular stone ring worn around the neck to add resistance during squats (bethak) and push-up-style exercises (danda).",
        significance: "Adds progressive resistance to bodyweight training, allowing wrestlers to build the neck and core strength critical for defending against throws and holds.",
    },
    {
        id: "danda-baithak",
        name: "Danda & Baithak (Push-ups & Squats)",
        icon: "💪",
        desc: "Traditional bodyweight exercises: danda, a wrestling-style push-up performed in a sweeping arc, and baithak (or bethak), a deep squat performed in high repetitions.",
        significance: "Considered the foundation of a pehlwan's conditioning; the modern 'Hindu squat' fitness exercise traces its name and form directly to the akhara's baithak training.",
    },
    {
        id: "mallakhamb",
        name: "Mallakhamb (Wrestling Pole)",
        icon: "🪢",
        desc: "A fixed wooden pole or hanging rope used for gymnastic and aerial exercises to build core strength, flexibility, and body control.",
        significance: "So central to wrestling conditioning that Mallakhamb has since developed into its own recognized sport in India, with dedicated Mallakhamb competitions and federations.",
    },
];

const KUSHTI_TECHNIQUES = {
    intro: "Kushti bouts take place on a soft clay surface rather than modern mats, with contests known as dangal held in villages across India. Matches are won by pinning both of an opponent's shoulders to the ground, and technique is built through years of drilling throws, locks, and ground control.",
    points: [
        "Wrestlers wear only a langot (a traditional loincloth), similar in function to a sumo wrestler's mawashi.",
        "The clay pit is deliberately kept soft enough to cushion falls but firm enough not to impede movement, watered and re-tilled every few days.",
        "Massage (malish) with mustard oil is considered an essential daily part of a wrestler's recovery and conditioning routine, not an optional extra.",
        "Training typically begins before dawn, combining bodyweight conditioning (danda-baithak), weighted implements (gada, nal, mugdar), and live grappling practice with training partners.",
    ],
};

const KUSHTI_REGIONS = [
    { region: "Haryana & Punjab", note: "Home to India's most competitive modern akhara scene, producing a large share of the country's Olympic and international wrestlers; dangal contests here are often tied to village fairs and festivals." },
    { region: "Uttar Pradesh", note: "Varanasi in particular retains a strong akhara culture, with wrestling schools dating back generations along the banks of the Ganges." },
    { region: "Maharashtra", note: "Kolhapur is historically renowned as a wrestling hub, home to some of India's oldest and most respected akharas and the traditional Maharashtrian style of Kushti called 'Hatti'." },
    { region: "Rajasthan", note: "Towns like Nathdwara maintain multiple functioning akharas, several centered around temples to Hanuman, continuing centuries-old training traditions alongside modern gym equipment." },
    { region: "Sindh / Pakistan", note: "Malakhra, a traditional Sindhi wrestling form practiced across Sindh and parts of Pakistan, shares deep historical roots with Kushti from the pre-Partition subcontinent." },
];

const KUSHTI_WRESTLERS = [
    {
        name: "The Great Gama (Ghulam Mohammad Baksh)",
        era: "Early 20th century",
        note: "Widely regarded as one of the greatest wrestlers in history, undefeated across a career spanning decades; famed for his extraordinary gada training regimen and daily conditioning routine.",
    },
    {
        name: "Dara Singh",
        era: "1950s – 1980s",
        note: "A national wrestling champion who became internationally famous, later crossing over into professional wrestling and Indian cinema, helping bring akhara-style wrestling to mainstream popularity.",
    },
    {
        name: "K.D. Jadhav",
        era: "1950s",
        note: "Trained in the traditional akhara system before winning bronze at the 1952 Helsinki Olympics — the first individual Olympic medal for independent India.",
    },
    {
        name: "Sushil Kumar",
        era: "2000s – 2010s",
        note: "Rose through India's traditional akhara training system to win Olympic bronze (2008) and silver (2012), helping trigger a modern resurgence of interest in competitive Indian wrestling.",
    },
];

const KUSHTI_REFERENCES = [
    { text: "Traditional Games Federation of India — Kushti: history, equipment, and rules.", url: "https://www.traditionalgamesindia.com/games-list/kushti/" },
    { text: "Before The Mat — 'Exploring The Traditional Indian Wrestling Styles: Kushti & More.'", url: "https://beforethemat.com/exploring-the-traditional-indian-wrestling-styles-kushti-more/" },
    { text: "Unsanctioned Fights — 'Pehlwani/Kushti: India's Traditional Wrestling.'", url: "https://www.unsanctionedfights.com/guides/pehlwani-kushti-india" },
    { text: "Wikipedia — Pehlwani (history, technique, and equipment overview).", url: "https://en.wikipedia.org/wiki/Pehlwani" },
];