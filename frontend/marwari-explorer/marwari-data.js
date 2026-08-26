// marwari-data.js
// Data for the Marwari Language Explorer

const MARWARI_STATS = [
    { label: "Speakers Worldwide", value: "~13 Million" },
    { label: "Language Family", value: "Indo-Aryan" },
    { label: "Script", value: "Devanagari" },
    { label: "Primary Region", value: "Marwar, Rajasthan" },
];

const MARWARI_GREETING = {
    deva: "खम्मा घणी",
    transliteration: "Khamma Ghani",
    meaning: "The standard Marwari greeting, traditionally offered with folded hands and a slight bow. 'Khamma' traces to the Sanskrit for protection and respect (kṣamā), while 'ghaṇī' means 'a lot' — together forming 'many greetings' or 'much respect to you.'",
    folkVariant: {
        deva: "घणी खम्मा",
        transliteration: "Ghaṇī Khammā",
        meaning: "The customary reply to Khamma Ghani, simply reversing the two words — a small linguistic courtesy exchanged between speaker and listener.",
    },
    note: "A dedicated Marwari voice is not yet common in most browsers' Text-to-Speech engines. Playback will use the closest available Hindi (hi-IN, Devanagari-script) voice as an approximation.",
};

const MARWARI_WORDS = [
    { deva: "पाणी", translit: "Pāṇī", meaning: "Water", note: "Shares its Indo-Aryan root with Hindi 'pani' and most other regional languages of North India." },
    { deva: "रोटी", translit: "Roṭī", meaning: "Bread / Flatbread", note: "A staple word across the Thar desert region, used identically to its Hindi cognate." },
    { deva: "घर", translit: "Ghar", meaning: "House / Home", note: "Common Indo-Aryan vocabulary inherited from Sanskrit 'gṛha'." },
    { deva: "हां", translit: "Hāṅ", meaning: "Yes", note: "Pronounced with a nasalized vowel, used the same way across most Rajasthani dialects." },
    { deva: "कोनी", translit: "Konī", meaning: "No", note: "A distinctly Marwari negation, quite different from the Hindi 'nahi' — one of the clearest markers of Marwari speech." },
    { deva: "बाईसा", translit: "Bāīsā", meaning: "Respectful term for a lady or daughter of noble household", note: "A traditional honorific from Marwar's courtly and Rajput heritage, still used respectfully today." },
    { deva: "भलो", translit: "Bhalo", meaning: "Good / Fine", note: "Commonly heard in everyday Marwari conversation to express approval or wellbeing." },
    { deva: "सा", translit: "Sā", meaning: "Respectful suffix added after a name or greeting", note: "Marks politeness and social respect, similar in function to 'ji' in Hindi." },
    { deva: "कांई", translit: "Kāṅī", meaning: "What", note: "A signature Marwari question word, distinct from the Hindi 'kya'." },
    { deva: "मायड़ भाषा", translit: "Māyaḍ Bhāṣā", meaning: "Mother tongue", note: "A term of deep affection Marwari speakers use for their own language, literally 'mother's language.'" },
];

const MARWARI_SCRIPT = {
    intro: "Marwari is written today primarily in the Devanagari script, the same script used for Hindi and Sanskrit. Historically, however, Marwari merchants and traders across India and beyond kept their accounts and correspondence in the Mahajani (or Modiya) script — a fast, cursive mercantile script developed specifically for commerce, distinct from the more formal Devanagari used for religious and literary texts.",
    facts: [
        { title: "Mahajani / Modiya Script", detail: "For centuries, Marwari traders used the cursive Mahajani script to record ledgers and business correspondence, allowing rapid handwriting suited to commercial life across India's trade routes." },
        { title: "Modern Devanagari Standard", detail: "In contemporary print, education, and digital media, Marwari is almost universally written in Devanagari, the same script shared with Hindi and Sanskrit." },
        { title: "Dingal Literary Script", detail: "Classical Marwari bardic poetry, known as Dingal, was historically recorded in a distinct literary register of Devanagari used by the Charan poet-bard community of Rajasthan." },
    ],
};

const MARWARI_CLASSIFICATION = {
    family: "Indo-European → Indo-Iranian → Indo-Aryan → Western Indo-Aryan → Rajasthani",
    siblings: ["Dhundhari", "Mewari", "Hadauti", "Shekhawati", "Gujarati"],
    note: "Marwari belongs to the Rajasthani group of Western Indo-Aryan languages. It is the most widely spoken Rajasthani variety and functions as the de facto lingua franca of the Rajasthani-speaking world, closely related to Dhundhari, Mewari, and other Rajasthani dialects, and more distantly to Gujarati.",
};

const MARWARI_REGIONS = {
    intro: "Marwari is the majority language of the historic Marwar region of western Rajasthan, and is also spoken by large trading-community diasporas across India and beyond, owing to the Marwari community's long history of commerce and migration.",
    areas: ["Jodhpur", "Bikaner", "Jaisalmer", "Barmer", "Nagaur", "Pali", "Kutch (Gujarat, border areas)", "Marwari diaspora (Kolkata, Mumbai, Chennai & beyond)"],
};

const MARWARI_CULTURE = [
    { title: "Manganiyar & Langa Folk Musicians", desc: "The hereditary Manganiyar and Langa musician communities of the Thar desert perform Marwari folk songs at weddings, festivals, and courtly gatherings, using instruments like the kamaicha and sarangi." },
    { title: "Dingal Bardic Poetry", desc: "The Charan community's classical Dingal poetic tradition celebrates Rajput valor, genealogy, and courtly history in a distinctive Marwari literary register still studied today." },
    { title: "Maand Folk Singing Style", desc: "Maand is a distinctive Rajasthani vocal style, closely associated with Marwari folk and courtly music, known for its emotive, ornamented melodic phrasing." },
    { title: "Marwar Festival, Jodhpur", desc: "An annual celebration in Jodhpur honoring Marwar's warrior-poets and folk heroes through music, dance, and traditional Marwari performance art." },
];

const MARWARI_REFERENCES = [
    { text: "Marwari language — Wikipedia", url: "https://en.wikipedia.org/wiki/Marwari_language" },
    { text: "Rajasthani languages — Wikipedia", url: "https://en.wikipedia.org/wiki/Rajasthani_languages" },
    { text: "Census of India — Statement of Language and Mother Tongue Strength.", url: "https://censusindia.gov.in/" },
    { text: "People's Linguistic Survey of India (PLSI) — Rajasthani Volume.", url: "https://peopleslinguisticsurvey.org/" },
    { text: "Khamma Ghani: Origins and Significance — Linguistica Indica", url: "https://avtans.com/2026/03/17/khamma-ghani-origins-and-significance-explored/" },
];