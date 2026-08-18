const VOCAB = [
  { word: "Khulumkha", ipa: "/kʰu.lum.kʰa/", meaning: "Hello / Greetings", example: "Khulumkha! Nwng kaham?", cat: "greetings", audio: "khulumkha.mp3" },
  { word: "Kaham", ipa: "/ka.ɦam/", meaning: "Good / Fine", example: "Ang kaham deo.", cat: "greetings", audio: "kaham.mp3" },
  { word: "Nwng", ipa: "/nʊŋ/", meaning: "You", example: "Nwng mwichwi?", cat: "essentials", audio: "nwng.mp3" },
  { word: "Ang", ipa: "/aŋ/", meaning: "I / Me", example: "Ang Tripura-yao.", cat: "essentials", audio: "ang.mp3" },
  { word: "Nok", ipa: "/nɔk/", meaning: "House", example: "Ang-no nok-ha.", cat: "essentials", audio: "nok.mp3" },
  { word: "Twi", ipa: "/twi/", meaning: "Water", example: "Twi thak-nai?", cat: "nature", audio: "twi.mp3" },
  { word: "Huk", ipa: "/ɦuk/", meaning: "Fire", example: "Huk mwk-nai.", cat: "nature", audio: "huk.mp3" },
  { word: "Boro", ipa: "/bɔ.ɾo/", meaning: "Big / Large", example: "Boro nok-ha.", cat: "essentials", audio: "boro.mp3" },
  { word: "Gwran", ipa: "/gʷɾan/", meaning: "Small / Little", example: "Gwran twi.", cat: "essentials", audio: "gwran.mp3" },
  { word: "Hachuk", ipa: "/ɦa.tʃuk/", meaning: "Mountain", example: "Hachuk-yao boro.", cat: "nature", audio: "hachuk.mp3" },
  { word: "Dung", ipa: "/duŋ/", meaning: "Tree", example: "Dung-ha gwran.", cat: "nature", audio: "dung.mp3" },
  { word: "Bisi", ipa: "/bi.si/", meaning: "Garia Festival", example: "Bisi-yao thang-nai.", cat: "culture", audio: "bisi.mp3" },
  { word: "Lebang", ipa: "/le.baŋ/", meaning: "Traditional Dance", example: "Lebang-bo mani-nai.", cat: "culture", audio: "lebang.mp3" },
  { word: "Risa", ipa: "/ɾi.sa/", meaning: "Traditional Cloth", example: "Risa-ha thwi-nai.", cat: "culture", audio: "risa.mp3" }
];

const SCRIPTS = [
  {
    name: "Koloma Script",
    icon: "📜",
    period: "Ancient (Royal Era)",
    desc: "The indigenous script used by Tripuri royalty for centuries. Now primarily ceremonial and historical.",
    sample: "𑰏𑰲𑰩𑰲𑰦𑰏𑰯",
    status: "Historical"
  },
  {
    name: "Bengali Script",
    icon: "অ",
    period: "Modern Official",
    desc: "Eastern Nagari (Bengali) script adopted for official and educational purposes in Tripura state.",
    sample: "খুলুমখা",
    status: "Official"
  },
  {
    name: "Roman Script",
    icon: "Aa",
    period: "Contemporary",
    desc: "Latin alphabet widely used for digital communication, social media, and youth literature.",
    sample: "Khulumkha",
    status: "Common"
  }
];

const FEATURES = [
  { title: "Tonal Language", desc: "Kokborok uses pitch variations to distinguish word meanings — a hallmark of Tibeto-Burman languages." },
  { title: "SOV Word Order", desc: "Subject-Object-Verb structure, unlike Indo-European SVO pattern. Example: 'Ang (I) twi (water) thak (drink).'" },
  { title: "Agglutinative", desc: "Words formed by stringing morphemes together — each affix adds specific grammatical meaning." },
  { title: "Rich Oral Tradition", desc: "Centuries of folk tales, songs, and poetry transmitted orally before modern literacy campaigns." }
];

const DISTRICTS = [
  { name: "West Tripura", x: 45, y: 55, speakers: "320,000", note: "Highest concentration in Agartala and surrounding areas" },
  { name: "Sipahijala", x: 50, y: 60, speakers: "180,000", note: "Mixed Kokborok-Bengali speaking region" },
  { name: "Gomati", x: 55, y: 65, speakers: "150,000", note: "Strong traditional practices and festivals" },
  { name: "South Tripura", x: 60, y: 70, speakers: "140,000", note: "Border region with Bangladesh influence" },
  { name: "Khowai", x: 40, y: 50, speakers: "120,000", note: "Hilly terrain with distinct dialect features" },
  { name: "Dhalai", x: 55, y: 45, speakers: "95,000", note: "Forest communities with traditional lifestyle" },
  { name: "North Tripura", x: 50, y: 35, speakers: "85,000", note: "Proximity to Assam and Mizoram" },
  { name: "Unakoti", x: 45, y: 30, speakers: "70,000", note: "Ancient archaeological sites" }
];

const DIALECTS = [
  { name: "Debbarma", region: "Royal clan", note: "Considered the prestige dialect, basis for standard Kokborok" },
  { name: "Jamatia", region: "Central Tripura", note: "Distinct vocabulary related to agriculture and forest" },
  { name: "Noatia", region: "Southern areas", note: "Influenced by Bengali and neighboring languages" },
  { name: "Reang/Bru", region: "Northern hills", note: "Significant phonological differences from standard Kokborok" }
];

const CULTURE = [
  { icon: "🎭", title: "Garia & Buisu Festivals", desc: "Annual harvest celebrations with traditional music, Lebang dance, and community feasts honoring nature's bounty." },
  { icon: "🧵", title: "Risa & Rignai Textiles", desc: "Handwoven fabrics with geometric patterns — each motif carries clan identity and cultural symbolism." },
  { icon: "🎵", title: "Lebang Dance & Music", desc: "Traditional folk dance performed during festivals, accompanied by drums (kham), flute (sumui), and cymbals." },
  { icon: "🍚", title: "Culinary Traditions", desc: "Fermented foods, bamboo shoots, and fish preparations — cuisine reflects forest and river ecology." },
  { icon: "🏹", title: "Oral Literature", desc: "Epic tales, proverbs, and riddles transmitted across generations — now being documented and digitized." },
  { icon: "🎨", title: "Bamboo & Cane Crafts", desc: "Intricate basket-weaving, furniture, and architectural elements — sustainable craft traditions." }
];

const QUIZ = [
  { q: "What does 'Khulumkha' mean?", opts: ["Goodbye", "Hello / Greetings", "Thank you", "Please"], correct: 1 },
  { q: "Which script is historically used by Tripuri royalty?", opts: ["Devanagari", "Bengali", "Koloma", "Roman"], correct: 2 },
  { q: "Kokborok belongs to which language family?", opts: ["Indo-European", "Dravidian", "Sino-Tibetan", "Austroasiatic"], correct: 2 },
  { q: "What is the word order in Kokborok?", opts: ["SVO", "SOV", "VSO", "OVS"], correct: 1 },
  { q: "Which festival is celebrated with Lebang dance?", opts: ["Diwali", "Garia/Buisu", "Holi", "Christmas"], correct: 1 },
  { q: "How many speakers does Kokborok have approximately?", opts: ["100,000", "500,000", "1.1 million", "5 million"], correct: 2 }
];

const STATS = [
  { label: "Speakers", value: "1.1M+", suffix: "" },
  { label: "Official Status", value: "Tripura", suffix: "" },
  { label: "Scripts", value: "3", suffix: "" },
  { label: "Dialects", value: "4+", suffix: "" }
];