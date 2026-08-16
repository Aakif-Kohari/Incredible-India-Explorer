// nepali-data.js
// Linguistic and cultural data for the Nepali Language Explorer (नेपाली)

const NEPALI_STATS = [
    { label: "Speakers in India", value: "~2.92 Million", detail: "2011 Census of India" },
    { label: "Language Family", value: "Indo-Aryan", detail: "Northern Zone (Pahari)" },
    { label: "Writing Script", value: "Devanagari (देवनागरी)", detail: "Left-to-right phonetic script" },
    { label: "8th Schedule Recognition", value: "1992", detail: "71st Constitutional Amendment" },
    { label: "Official Status in India", value: "Sikkim & GTA (WB)", detail: "State & District Official Language" }
];

const NEPALI_GREETINGS = [
    {
        nepali: "नमस्ते",
        transliteration: "Namaste",
        ipa: "[nʌmʌsˈte]",
        meaning: "The most universal, respectful greeting meaning 'I bow to the divine in you'. Accompanied by joining palms together (Anjali Mudra).",
        tag: "Universal Greeting",
        audioText: "नमस्ते"
    },
    {
        nepali: "नमस्कार",
        transliteration: "Namaskār",
        ipa: "[nʌmʌsˈkaːr]",
        meaning: "A slightly more formal, reverent greeting used in public forums, formal gatherings, and when addressing elders or dignitaries.",
        tag: "Formal Greeting",
        audioText: "नमस्कार"
    },
    {
        nepali: "तपाईंलाई कस्तो छ?",
        transliteration: "Tapāī̃lāī kasto chha?",
        ipa: "[tʌpaĩlaːi kʌsto tsʰʌ]",
        meaning: "'How are you?' (Polite/Formal) — Used respectfully when greeting friends, colleagues, elders, and acquaintances.",
        tag: "Polite Inquiry",
        audioText: "तपाईंलाई कस्तो छ?"
    },
    {
        nepali: "हजुर, म सञ्चै छु",
        transliteration: "Hajur, ma sañcai chhu",
        ipa: "[hʌdzuɾ mʌ sʌɲtsʌi tsʰu]",
        meaning: "'Yes/Respectfully, I am fine.' — 'Hajur' adds an elegant layer of courteous politeness.",
        tag: "Courteous Response",
        audioText: "हजुर, म सञ्चै छु"
    },
    {
        nepali: "शुभ प्रभात",
        transliteration: "Śubha Prabhāt",
        ipa: "[subʰʌ pɾʌbʰaːt]",
        meaning: "'Good Morning' — A formal, auspicious wish for a fruitful day ahead.",
        tag: "Time-Specific Greeting",
        audioText: "शुभ प्रभात"
    }
];

const NEPALI_WORDS = [
    {
        nepali: "धन्यवाद",
        translit: "Dhanyavād",
        ipa: "[dʱʌnjʌbaːd]",
        meaning: "Thank you",
        category: "Courtesy",
        note: "Used to express sincere gratitude in formal and everyday speech, originating from classical Sanskrit."
    },
    {
        nepali: "हजुर",
        translit: "Hajur",
        ipa: "[hʌdzuɾ]",
        meaning: "Yes (Respectful) / Pardon / Sir / Madam",
        category: "Honorific",
        note: "A quintessential Nepali honorific particle expressing deep respect, acknowledgement, or asking someone to repeat."
    },
    {
        nepali: "राम्रो",
        translit: "Rāmro",
        ipa: "[ɾaːmɾo]",
        meaning: "Good / Beautiful / Nice",
        category: "Adjective",
        note: "One of the most versatile adjectives in Nepali, used for aesthetics, quality, character, and weather."
    },
    {
        nepali: "पानी",
        translit: "Pānī",
        ipa: "[paːni]",
        meaning: "Water",
        category: "Essential",
        note: "Shared across Indo-Aryan sister languages, originating from Sanskrit 'Pānīya'."
    },
    {
        nepali: "खाना",
        translit: "Khānā",
        ipa: "[kʰaːnaː]",
        meaning: "Food / Meal / To eat",
        category: "Essential",
        note: "Refers broadly to cooked meals, especially Dal-Bhat-Tarkari, the staple Himalayan food."
    },
    {
        nepali: "घर",
        translit: "Ghar",
        ipa: "[ɡʱʌɾ]",
        meaning: "House / Home",
        category: "Everyday",
        note: "Common Indo-Aryan word carrying deep cultural warmth of ancestral homeland and hearth."
    },
    {
        nepali: "साथी",
        translit: "Sāthī",
        ipa: "[saːtʰi]",
        meaning: "Friend / Companion",
        category: "Social",
        note: "Denotes friendship and camaraderie, widely used across age groups throughout the hills."
    },
    {
        nepali: "धेरै",
        translit: "Dherai",
        ipa: "[dʱeɾʌi]",
        meaning: "Much / Many / Very",
        category: "Quantity",
        note: "Essential modifier used to intensify descriptions (e.g., 'Dherai ramro' = very good)."
    },
    {
        nepali: "माया",
        translit: "Māyā",
        ipa: "[maːjaː]",
        meaning: "Love / Affection / Compassion",
        category: "Emotion",
        note: "Central theme in Nepali folk songs, poetry, and interpersonal warmth across Himalayan communities."
    },
    {
        nepali: "मिठो",
        translit: "Miṭho",
        ipa: "[miʈʰo]",
        meaning: "Sweet / Delicious / Pleasant",
        category: "Adjective",
        note: "Used for delicious cuisine, melodious music, or pleasant speaking manners."
    },
    {
        nepali: "हो / होइन",
        translit: "Ho / Hoina",
        ipa: "[ho / ho.inʌ]",
        meaning: "Yes (It is) / No (It is not)",
        category: "Conversational",
        note: "Fundamental identification verbs in everyday Nepali dialogue."
    },
    {
        nepali: "बिस्तारै",
        translit: "Bistārai",
        ipa: "[bistaːɾʌi]",
        meaning: "Slowly / Gently / Softly",
        category: "Conversational",
        note: "Often spoken warmly in mountain trails and daily life ('Bistārai jānos' = go gently/safely)."
    }
];

const NEPALI_SCRIPT_DATA = {
    name: "Devanagari (देवनागरी)",
    type: "Abugida (Alphasyllabary)",
    direction: "Left-to-Right with Shirorekha (Top horizontal line)",
    overview: "Nepali is written in the Devanagari script, which is inherently phonetic where each character maps directly to a specific sound. Unlike English, consonants carry an inherent 'a' vowel unless modified by matras (vowel signs) or a halanta (virama).",
    vowels: [
        { char: "अ", rom: "a", ipa: "[ʌ]" },
        { char: "आ", rom: "ā", ipa: "[aː]" },
        { char: "इ", rom: "i", ipa: "[i]" },
        { char: "ई", rom: "ī", ipa: "[iː]" },
        { char: "उ", rom: "u", ipa: "[u]" },
        { char: "ऊ", rom: "ū", ipa: "[uː]" },
        { char: "ऋ", rom: "ṛ", ipa: "[ri]" },
        { char: "ए", rom: "e", ipa: "[e]" },
        { char: "ऐ", rom: "ai", ipa: "[ʌi]" },
        { char: "ओ", rom: "o", ipa: "[o]" },
        { char: "औ", rom: "au", ipa: "[ʌu]" },
        { char: "अं", rom: "aṁ", ipa: "[ʌ̃]" },
        { char: "अः", rom: "aḥ", ipa: "[ʌh]" }
    ],
    features: [
        {
            title: "Shirorekha (Top Hanging Line)",
            description: "The distinct horizontal line connecting letters in a word, giving Devanagari its graceful, structured appearance."
        },
        {
            title: "Elaborate Honorific Tiering",
            description: "Nepali syntax encodes social respect into verb conjugations across 4 primary tiers: Hajur (highest), Tapāī̃ (formal), Timi (familiar), and Tā̃ (intimate)."
        },
        {
            title: "Phonetic Regularity",
            description: "Words are pronounced exactly as spelled, making reading consistent once individual letters and diacritics are understood."
        },
        {
            title: "Rich Conjuncts (Samyuktākṣara)",
            description: "Complex consonant clusters like क्ष (kṣa), त्र (tra), and ज्ञ (gya) elegantly merge individual phonemes into single glyphs."
        }
    ]
};

const NEPALI_CLASSIFICATION = {
    familyTree: "Indo-European ➔ Indo-Iranian ➔ Indo-Aryan ➔ Northern Zone (Pahari) ➔ Eastern Pahari",
    description: "Nepali belongs to the Indo-Aryan branch of the Indo-European language family. Within Indo-Aryan, it is classified under the Northern Zone (Pahari subgroup), historically originating from Khas Prakrit and sharing deep etymological ties with Sanskrit.",
    sisterLanguages: [
        { name: "Sanskrit", relation: "Classical Ancestral Root" },
        { name: "Kumaoni & Garhwali", relation: "Central Pahari Sister Languages" },
        { name: "Hindi", relation: "Major Indo-Aryan Sister Language" },
        { name: "Bengali & Assamese", relation: "Eastern Indo-Aryan Neighbors" },
        { name: "Maithili & Bhojpuri", relation: "Bihari Group Relatives" }
    ],
    linguisticTraits: [
        "Subject-Object-Verb (SOV) default word order",
        "Ergative-absolutive case marking in perfective transitive constructions",
        "Rich postpositional system rather than prepositions",
        "Extensive causative and passive verbal morphology"
    ]
};

const NEPALI_INDIAN_REGIONS = [
    {
        state: "Sikkim",
        role: "Official State Language & Lingua Franca",
        highlights: "Nepali is the predominant spoken language across all districts of Sikkim (Gangtok, Gyalshing, Namchi, Mangan, Soreng, Pakyong). It bridges diverse Himalayan communities and is used in state governance, media, and school curricula.",
        badge: "State Official Language"
    },
    {
        state: "West Bengal (Darjeeling & Kalimpong)",
        role: "Official Language of the Hill Subdivisions",
        highlights: "Recognized as an official language in Darjeeling, Kalimpong, and Kurseong under the Gorkhaland Territorial Administration (GTA). Darjeeling is historically celebrated as a cradle of modern Indian Nepali literature and music.",
        badge: "District Official Status"
    },
    {
        state: "Assam & Northeast India",
        role: "Vibrant Heritage Communities",
        highlights: "Home to substantial Nepali/Gorkha populations settled for generations in Sonitpur, Tinsukia, Udalguri, Karbi Anglong, as well as in Meghalaya (Shillong), Manipur, and Mizoram.",
        badge: "Historical Cultural Presence"
    },
    {
        state: "Uttarakhand & Himachal Pradesh",
        role: "Historic Foothill Settlements",
        highlights: "Substantial communities in Dehradun, Nainital, Shimla, Dharamshala, and Bakloh with deep civil, military, and educational institutions dating back two centuries.",
        badge: "Pahari Continuum"
    }
];

const NEPALI_LITERATURE_CULTURE = [
    {
        title: "Adikavi Bhanubhakta Acharya & Bhanu Jayanti",
        category: "Literary Foundations",
        description: "Bhanubhakta Acharya (1814–1868) translated the epic Ramayana into accessible, rhythmic Nepali verse (Bhanubhakta Ramayana), democratizing literacy and literature. Every July 13th, 'Bhanu Jayanti' is grandly celebrated with poetry recitals, floral tributes, and cultural processions as an official holiday in Sikkim and Darjeeling."
    },
    {
        title: "Sahitya Akademi Recognition (Since 1975)",
        category: "Indian Literary Eminence",
        description: "The Sahitya Akademi recognized Nepali as a major literary language of India in 1975. Indian Nepali literature has flourished through literary stalwarts like Agam Singh Giri (poet of Himalayan consciousness), Indra Bahadur Rai (pioneer of the 'Tesro Aayam' / Third Dimension movement), Parijat, and Tulsi Ghimire."
    },
    {
        title: "Dashain & Tihar (The Himalayan Festive Soul)",
        category: "Festivals & Traditions",
        description: "Dashain (दशैं) is the longest and most revered festival, celebrated with elder blessings, red rice Tika, and yellow Jamara barley sprouts. Tihar (तिहार) spans five days honoring animals (Kag Tihar, Kukur Tihar, Gai Tihar), Laxmi Puja, and Bhai Tika, enriched by the midnight Deusi-Bhailo singing traditions."
    },
    {
        title: "Traditional Music, Instruments & Folk Dances",
        category: "Performing Arts",
        description: "Nepali folklore comes alive through the beats of the two-headed Madal drum, the soulful bowing of the Sarangi, and the high-pitched flute (Bansuri). Traditional dances like Maruni, Chabrung, Tamang Selo, and Sangini depict harvest, romance, and spiritual lore across the tea gardens and hill villages."
    }
];

const NEPALI_SOURCES = [
    {
        title: "Eighth Schedule to the Constitution of India",
        description: "Incorporation of Nepali in the 8th Schedule via the 71st Constitutional Amendment Act, 1992.",
        link: "https://www.mha.gov.in/"
    },
    {
        title: "Census of India — Language & Mother Tongue Reports",
        description: "Demographic data on Nepali speakers across Sikkim, West Bengal, Assam, and other Indian states.",
        link: "https://censusindia.gov.in/"
    },
    {
        title: "Sahitya Akademi — Nepali Language Division",
        description: "Official repository of Sahitya Akademi Award winners and historical developments in Indian Nepali literature.",
        link: "http://sahitya-akademi.gov.in/"
    },
    {
        title: "People's Linguistic Survey of India (PLSI)",
        description: "Comprehensive survey of the languages of Sikkim and North Bengal edited by Prof. G.N. Devy.",
        link: "https://peopleslinguisticsurvey.org/"
    }
];
