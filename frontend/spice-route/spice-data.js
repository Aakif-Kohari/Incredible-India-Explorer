// spice-data.js
// Spice data used by the Spice Route Challenge.
// Historical/geographic notes are simplified for gameplay but kept factually
// grounded. Where a spice was introduced from outside India (e.g. chilli),
// that is stated explicitly rather than implying an Indian origin.

const HISTORIC_PORTS = {
  muziris: { name: "Muziris", state: "Kerala", note: "Ancient port near modern Kodungallur; Roman ships sailed here for pepper as early as the 1st century CE." },
  calicut: { name: "Kozhikode (Calicut)", state: "Kerala", note: "Medieval hub of the Arab and later Portuguese spice trade; Vasco da Gama landed near here in 1498." },
  surat:   { name: "Surat", state: "Gujarat", note: "Mughal-era port and one of the busiest trading harbours of 17th-century Asia." },
  masulipatnam: { name: "Masulipatnam", state: "Andhra Pradesh", note: "Coromandel Coast port linking the Deccan to Southeast Asia and beyond." },
  goa: { name: "Old Goa", state: "Goa", note: "Portuguese colonial capital in Asia and entry point for several New World crops into India." }
};

const SPICES = [
  {
    id: "pepper",
    name: "Black Pepper",
    emoji: "🌶️",
    localNames: "Kali Mirch / Karutha Mulaku",
    originState: "Kerala",
    clue: "Known as the 'King of Spices', this berry grows on woody vines in the humid hills of a southwestern coastal state.",
    difficulty: "easy",
    port: "muziris",
    history: "Native to the Malabar Coast, black pepper was so valuable in antiquity that it was literally used as currency — the Latin phrase \"pondus piperis\" (weight of pepper) was even part of Rome's ransom demand from the Visigoths in 410 CE. Muziris became the main gateway for Roman ships riding the monsoon winds to reach Kerala's pepper hills.",
    funFact: "Pepper's trade value once rivaled gold, giving it the nickname 'black gold'."
  },
  {
    id: "cardamom",
    name: "Cardamom",
    emoji: "🫘",
    localNames: "Elaichi / Elakkai",
    originState: "Kerala",
    clue: "Called the 'Queen of Spices', its pods grow wild in the shaded evergreen hills of the Western Ghats.",
    difficulty: "easy",
    port: "muziris",
    history: "True (green) cardamom is native to the evergreen forests of the Western Ghats, particularly the Cardamom Hills of Kerala. It traveled the same ancient sea routes as pepper, reaching Greek and Roman kitchens, and later Arab traders carried it onward to Europe via the Middle East.",
    funFact: "Cardamom is the third most expensive spice in the world by weight, after saffron and vanilla."
  },
  {
    id: "turmeric",
    name: "Turmeric",
    emoji: "🟡",
    localNames: "Haldi / Manjal",
    originState: "Telangana",
    clue: "This golden root has flavored curries and colored fabrics for over 4,000 years, grown widely across the Deccan plateau.",
    difficulty: "medium",
    port: "masulipatnam",
    history: "Turmeric has been cultivated across the Indian subcontinent for millennia, with the Nizamabad belt of Telangana today producing some of the country's largest share. It moved eastward along Coromandel Coast ports toward Southeast Asia and westward via overland caravan routes long before European contact.",
    funFact: "Turmeric contains curcumin, the compound behind its bright yellow-orange color."
  },
  {
    id: "saffron",
    name: "Saffron",
    emoji: "🔴",
    localNames: "Kesar / Zafran",
    originState: "Jammu and Kashmir",
    clue: "The world's most expensive spice by weight, hand-picked from purple crocus flowers in a cool Himalayan valley.",
    difficulty: "medium",
    port: "surat",
    history: "India's saffron is grown almost entirely in the Kashmir Valley, especially around Pampore, in fields known locally as 'saffron karewas'. It likely arrived via Persian traders over a thousand years ago and later moved through Mughal-era trade networks toward the rest of the subcontinent and beyond.",
    funFact: "It takes roughly 150,000 crocus flowers, hand-picked, to produce just one kilogram of saffron."
  },
  {
    id: "ginger",
    name: "Ginger",
    emoji: "🫚",
    localNames: "Adrak / Inji",
    originState: "Kerala",
    clue: "A pungent underground rhizome long grown on the same humid southwestern coast famous for pepper.",
    difficulty: "easy",
    port: "calicut",
    history: "Ginger has been cultivated in India, especially Kerala, for thousands of years and was one of the first Asian spices to reach the Mediterranean via ancient trade routes, referenced by Roman writers well before pepper's peak popularity.",
    funFact: "Dried ginger was so widespread in medieval Europe that a pound of it could be traded for a whole sheep."
  },
  {
    id: "mustard",
    name: "Mustard Seed",
    emoji: "🟤",
    localNames: "Sarson / Kadugu",
    originState: "Rajasthan",
    clue: "Tiny pungent seeds pressed for oil, grown across vast mustard fields in a northwestern desert state.",
    difficulty: "medium",
    port: "surat",
    history: "Mustard has been grown across northern India for centuries, with Rajasthan today among the top producing states. Unlike the maritime spices, mustard moved mainly along inland and overland trade routes connecting to Central Asia.",
    funFact: "Rajasthan's mustard fields turn bright yellow each winter, a sight now popular with tourists and photographers."
  },
  {
    id: "clove",
    name: "Clove",
    emoji: "🟫",
    localNames: "Laung / Krambu",
    originState: "Tamil Nadu",
    clue: "This aromatic flower bud isn't originally Indian — but it now grows in the far southern hills, near Kanyakumari.",
    difficulty: "hard",
    port: "calicut",
    history: "Cloves originally come from the Maluku Islands ('Spice Islands') of Indonesia. Colonial powers transplanted clove cultivation to parts of southern India, including Tamil Nadu's Kanyakumari district, during the 18th–19th centuries, adding a new stop to India's spice map even though the plant is not native here.",
    funFact: "Because cloves originally grew on only a handful of tiny Indonesian islands, European powers fought wars for control of the clove trade.",
    isTransplant: true
  },
  {
    id: "chilli",
    name: "Chilli Pepper",
    emoji: "🌶️",
    localNames: "Mirchi / Molaga",
    originState: "Goa",
    clue: "This fiery pod is originally from the Americas — it entered India through a small coastal territory on the west coast.",
    difficulty: "hard",
    port: "goa",
    history: "Chilli peppers are native to the Americas and were unknown in India before the 15th century. Portuguese traders introduced them through Goa in the late 1400s–1500s, after which chillies spread across the subcontinent so thoroughly that they became central to many regional cuisines within a few generations.",
    funFact: "Before chillies arrived, Indian cooking relied on black pepper and long pepper for heat.",
    isTransplant: true
  }
];

// Neighboring / plausible-confusion states shown as extra map hints for harder rounds
const REGION_HINTS = {
  Kerala: ["Tamil Nadu", "Karnataka"],
  Telangana: ["Andhra Pradesh", "Maharashtra"],
  "Jammu and Kashmir": ["Ladakh", "Himachal Pradesh"],
  Rajasthan: ["Gujarat", "Haryana"],
  "Tamil Nadu": ["Kerala", "Andhra Pradesh"],
  Goa: ["Maharashtra", "Karnataka"]
};
