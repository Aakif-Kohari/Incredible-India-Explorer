// mewari-data.js
// Data for the Mewari Language Explorer

const MEWARI_STATS = [
    { label: "Speakers Worldwide", value: "~5 Million" },
    { label: "Language Family", value: "Indo-Aryan" },
    { label: "Script", value: "Devanagari" },
    { label: "Primary Region", value: "Mewar, Rajasthan" },
];

const MEWARI_GREETING = {
    deva: "खम्मा घणी",
    transliteration: "Khamma Ghani",
    meaning: "The customary greeting across Rajasthan, including the Mewar region, traditionally offered with folded hands and a slight bow. 'Khamma' derives from Sanskrit for protection and respect (kṣamā), while 'ghaṇī' means 'a lot' — together forming 'many greetings' or 'much respect to you.'",
    folkVariant: {
        deva: "घणी खम्मा",
        transliteration: "Ghaṇī Khammā",
        meaning: "The customary reply to Khamma Ghani, reversing the two words — exchanged as a small courtesy between speaker and listener across Mewar.",
    },
    note: "A dedicated Mewari voice is not yet common in most browsers' Text-to-Speech engines. Playback will use the closest available Hindi (hi-IN, Devanagari-script) voice as an approximation.",
};

const MEWARI_WORDS = [
    { deva: "पाणी", translit: "Pāṇī", meaning: "Water", note: "Shared Indo-Aryan root with Hindi 'pani', used identically across Mewar." },
    { deva: "रोटी", translit: "Roṭī", meaning: "Bread / Flatbread", note: "A staple household word, consistent across Rajasthani dialects including Mewari." },
    { deva: "घर", translit: "Ghar", meaning: "House / Home", note: "Common Indo-Aryan vocabulary inherited from Sanskrit 'gṛha'." },
    { deva: "हां", translit: "Hāṅ", meaning: "Yes", note: "Pronounced with a nasalized vowel, used the same way across most Rajasthani dialects." },
    { deva: "कोनी", translit: "Konī", meaning: "No", note: "A Rajasthani negation shared with Marwari, quite different from the Hindi 'nahi'." },
    { deva: "अन्नदाता", translit: "Annadātā", meaning: "Respectful term for a provider/protector, historically used for rulers", note: "Reflects Mewar's courtly heritage under the Sisodia Rajput rulers of Udaipur and Chittorgarh." },
    { deva: "मायड़", translit: "Māyaḍ", meaning: "Mother", note: "An affectionate term shared across Rajasthani varieties, root of 'māyaḍ bhāṣā' — mother tongue." },
    { deva: "साजन", translit: "Sājan", meaning: "Beloved / Dear one", note: "A term frequently found in Mewari and broader Rajasthani folk songs and poetry." },
];

const MEWARI_SCRIPT = {
    intro: "Mewari is written today in the Devanagari script, the same script used for Hindi and Sanskrit. Historically, the Mewar court and its scribes also used regional variants of Devanagari for administrative records, temple inscriptions, and the region's rich manuscript-painting tradition, in which text and miniature art were often combined on a single folio.",
    facts: [
        { title: "Devanagari in the Mewar Court", detail: "Royal edicts, land grants, and chronicles from the Sisodia court of Udaipur and Chittorgarh were recorded in regional Devanagari hands, preserving centuries of Mewar's administrative and literary history." },
        { title: "Illustrated Manuscript Tradition", detail: "Mewar miniature painting frequently paired Devanagari text with illustration — most famously in richly illustrated Ragamala and Ramayana manuscripts produced in the Udaipur court workshops." },
        { title: "Modern Devanagari Standard", detail: "In contemporary print, education, and digital media, Mewari is written in standard Devanagari, shared with Hindi and the wider Rajasthani language family." },
    ],
};

const MEWARI_CLASSIFICATION = {
    family: "Indo-European → Indo-Iranian → Indo-Aryan → Western Indo-Aryan → Rajasthani",
    siblings: ["Marwari", "Dhundhari", "Hadauti", "Shekhawati", "Gujarati"],
    note: "Mewari belongs to the Rajasthani group of Western Indo-Aryan languages. It is closely related to Marwari and the other Rajasthani varieties, and has traditionally been described as having distinct hill (pahadi) and plains (maidani) forms across the Mewar region.",
};

const MEWARI_REGIONS = {
    intro: "Mewari is spoken across the historic Mewar region of southern Rajasthan, centered on the former Sisodia Rajput kingdom whose capitals included Chittorgarh and later Udaipur. It shows dialectal variation between the hilly Aravalli tracts and the plains around Udaipur.",
    areas: ["Udaipur", "Chittorgarh", "Rajsamand", "Bhilwara", "Pratapgarh", "Aravalli hill tracts (pahadi Mewari)", "Udaipur plains (maidani Mewari)"],
};

const MEWARI_CULTURE = [
    { title: "Mewar Miniature Painting", desc: "The Udaipur court fostered a distinctive school of Rajput miniature painting, illustrating epics, court life, and devotional themes alongside Devanagari inscriptions on the same folios." },
    { title: "Folk Ballads of Maharana Pratap", desc: "Mewari oral tradition preserves heroic ballads and folk songs celebrating Maharana Pratap and the region's long resistance during the Mughal era, still sung at local gatherings today." },
    { title: "Gangaur & Mewar Festivals", desc: "The Gangaur festival, especially prominent in Udaipur, is marked by Mewari folk songs, processions, and traditional attire celebrating marital devotion and the arrival of monsoon." },
    { title: "Kathputli & Folk Theatre", desc: "Rajasthani puppetry (Kathputli) and folk theatre traditions performed in and around Mewar frequently use Mewari dialogue and folk songs to narrate regional legends." },
];

const MEWARI_REFERENCES = [
    { text: "Mewari language — Wikipedia", url: "https://en.wikipedia.org/wiki/Mewari_language" },
    { text: "Rajasthani languages — Wikipedia", url: "https://en.wikipedia.org/wiki/Rajasthani_languages" },
    { text: "Census of India — Statement of Language and Mother Tongue Strength.", url: "https://censusindia.gov.in/" },
    { text: "People's Linguistic Survey of India (PLSI) — Rajasthani Volume.", url: "https://peopleslinguisticsurvey.org/" },
    { text: "Khamma Ghani: Origins and Significance — Linguistica Indica", url: "https://avtans.com/2026/03/17/khamma-ghani-origins-and-significance-explored/" },
];