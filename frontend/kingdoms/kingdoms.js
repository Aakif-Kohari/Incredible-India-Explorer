/* ================= DATA ================= */
const ERAS = {
  "ancient":   { label: "Ancient",   color: "#c65d3a", range: [-2600, 300] },
  "classical": { label: "Classical", color: "#d4a64a", range: [300, 700] },
  "medieval":  { label: "Medieval",  color: "#3d7a5f", range: [700, 1526] },
  "earlymodern": { label: "Early Modern", color: "#2a3a6b", range: [1526, 1858] }
};

const KINGDOMS = [
  { id: "ivc", name: "Indus Valley Civilisation", era: "ancient", region: "North-West",
    period: "c. 2600 – 1900 BCE", tagline: "The cradle of urban India — cities of baked brick and planned drainage.",
    image: "https://images.unsplash.com/photo-1609151941355-12a5309d6b61?w=900&q=70",
    desc: "One of the world's three earliest urban civilisations, alongside Mesopotamia and Egypt. Spanned over a million square kilometres across what is now Pakistan and north-west India.",
    overview: "Harappa and Mohenjo-daro were cities of extraordinary planning — grid streets, covered drains, standardised weights and bricks. Trade with Mesopotamia brought Indian goods to the Persian Gulf. The undeciphered Indus script remains one of archaeology's great puzzles.",
    rulers: [{ n: "Unknown priest-kings", r: "—", d: "A famous steatite bust suggests ritual authority, but no royal inscriptions survive." }],
    legacy: ["Standardised weights and measures", "Advanced urban sanitation", "Bead-making and metallurgy", "The undeciphered Indus script"],
    architecture: ["The Great Bath of Mohenjo-daro", "Granaries and dockyards of Lothal", "Dholavira's water reservoirs and signboards"],
    tags: ["Urban", "Trade", "Bronze Age"] },

  { id: "mahajanapadas", name: "The Mahajanapadas", era: "ancient", region: "North",
    period: "c. 600 – 345 BCE", tagline: "Sixteen great republics and kingdoms that shaped early Indian philosophy.",
    image: "https://images.unsplash.com/photo-1599661046289-326574001573?w=900&q=70",
    desc: "A constellation of sixteen major states — Magadha, Kosala, Vajji, Kuru and others — in which the Buddha and Mahavira preached, and republics coexisted with monarchies.",
    overview: "The late Vedic period saw the rise of territorial states with standing armies, coinage and fortified capitals. This was also the age of the Upanishads, the Buddha and Mahavira — all reacting to the same social transformation.",
    rulers: [
      { n: "Bimbisara", r: "c. 558–491 BCE", d: "First great king of Magadha; patron of the Buddha." },
      { n: "Ajatashatru", r: "c. 492–460 BCE", d: "Conquered the Vajji republic and fortified Pataliputra." }
    ],
    legacy: ["First Indian punch-marked coins", "Birth of Buddhism and Jainism", "Early republican governance (Vajji, Malla)"],
    architecture: ["Rajgir's cyclopean walls", "Early stupas and monasteries", "Fortified capitals at Kaushambi, Shravasti"],
    tags: ["Republics", "Philosophy", "Iron Age"] },

  { id: "maurya", name: "Maurya Empire", era: "ancient", region: "Pan-Indian",
    period: "322 – 185 BCE", tagline: "India's first great empire — unified from Afghanistan to the Deccan.",
    image: "https://images.unsplash.com/photo-1564507592333-c6065734d399?w=900&q=70",
    desc: "Founded by Chandragupta with Chanakya's strategy, and immortalised by Ashoka's edicts and the Sanchi and Sarnath stupas.",
    overview: "The Mauryas unified most of the subcontinent for the first time. Chandragupta overthrew the Nandas and checked Seleucus Nicator; Bindusara held the empire; Ashoka, after the bloody Kalinga war, embraced dhamma and sent missions across Asia.",
    rulers: [
      { n: "Chandragupta Maurya", r: "322–298 BCE", d: "Founder — student of Chanakya; later became a Jain ascetic." },
      { n: "Ashoka the Great", r: "268–232 BCE", d: "Conquered Kalinga, then renounced war and propagated dhamma across Asia." }
    ],
    legacy: ["Arthashastra — treatise on statecraft", "Edicts of Ashoka across the subcontinent", "Buddhism's spread to Sri Lanka and Central Asia", "The Lion Capital — now India's national emblem"],
    architecture: ["Sanchi Stupa", "Sarnath Lion Capital", "Barabar rock-cut caves", "Polished sandstone pillars"],
    tags: ["Empire", "Buddhism", "Statecraft"] },

  { id: "shunga", name: "Shunga Dynasty", era: "ancient", region: "North",
    period: "185 – 73 BCE", tagline: "A Brahmanical revival that nurtured early Indian art.",
    image: "https://images.unsplash.com/photo-1609151941355-12a5309d6b61?w=900&q=70",
    desc: "Founded when Pushyamitra Shunga assassinated the last Maurya king. A brief but artistically brilliant era.",
    overview: "Though short-lived, the Shungas presided over some of India's finest early art. The Bharhut and Sanchi gateways, and Patanjali's Mahabhashya, belong to this period.",
    rulers: [{ n: "Pushyamitra Shunga", r: "185–149 BCE", d: "General-turned-king; performed two ashvamedha sacrifices." }],
    legacy: ["Bharhut stupa sculptures", "Patanjali's Mahabhashya (grammar)", "Revival of Vedic rituals"],
    architecture: ["Bharhut toranas (gateways)", "Early Sanchi stupa renovations", "Rock-cut shrines at Udayagiri"],
    tags: ["Art", "Brahmanical", "Grammar"] },

  { id: "satavahana", name: "Satavahana Dynasty", era: "ancient", region: "Deccan",
    period: "c. 230 BCE – 220 CE", tagline: "Lords of the Deccan — bridging north and south India.",
    image: "https://images.unsplash.com/photo-1609151941355-12a5309d6b61?w=900&q=70",
    desc: "A long-lived dynasty that controlled the Deccan, fostered Prakrit literature and opened Roman trade routes.",
    overview: "The Satavahanas, also called Andhras, were great patrons of Buddhism and Prakrit. They minted lead and potin coins and maintained diplomatic and trade links with Rome.",
    rulers: [{ n: "Gautamiputra Satakarni", r: "c. 103–127 CE", d: "Defeated the Shakas; his mother's Nashik inscription is a historical landmark." }],
    legacy: ["Prakrit literature (Gaha Sattasai)", "Roman trade via western ports", "Land grants to Brahmins (early feudalism)"],
    architecture: ["Amaravati stupa sculptures", "Karla and Bhaja rock-cut caves", "Nashik inscriptions"],
    tags: ["Trade", "Prakrit", "Deccan"] },

  { id: "kushan", name: "Kushan Empire", era: "ancient", region: "North-West",
    period: "c. 30 – 375 CE", tagline: "The Silk Road empire that blended Greek, Persian and Indian cultures.",
    image: "https://images.unsplash.com/photo-1564507592333-c6065734d399?w=900&q=70",
    desc: "A Central Asian dynasty that ruled from Bactria to the Ganga, spreading Mahayana Buddhism along the Silk Road.",
    overview: "The Kushans, of Yuezhi origin, created a cosmopolitan empire straddling the Silk Road. Their court used Greek, Bactrian and Sanskrit. Kanishka convened the great Buddhist council that shaped Mahayana.",
    rulers: [{ n: "Kanishka the Great", r: "c. 127–150 CE", d: "Convened the 4th Buddhist council; his empire stretched to Central Asia." }],
    legacy: ["Spread of Mahayana Buddhism to China", "Silk Road cultural synthesis", "Gandhara and Mathura art schools"],
    architecture: ["Gandhara Buddha sculptures", "Kanishka's stupa at Peshawar", "Mathura school sculptures"],
    tags: ["Silk Road", "Buddhism", "Cosmopolitan"] },


    

  { id: "gupta", name: "Gupta Empire", era: "classical", region: "North",
    period: "c. 320 – 550 CE", tagline: "India's Classical Age — the 'Golden Age' of art, science and literature.",
    image: "https://images.unsplash.com/photo-1609151941355-12a5309d6b61?w=900&q=70",
    desc: "The age of Kalidasa, Aryabhata, the Ajanta caves and the first iron pillar that has not rusted.",
    overview: "Often called India's Golden Age. Sanskrit literature flowered under Kalidasa, astronomy advanced with Aryabhata and Varahamihira, and the Ajanta murals reached their peak. Hindu temple architecture began its classical evolution.",
    rulers: [
      { n: "Chandragupta I", r: "c. 320–335 CE", d: "Founded the Gupta era; married Licchavi princess." },
      { n: "Samudragupta", r: "c. 335–375 CE", d: "The 'Napoleon of India' — conquered north, received southern homage." },
      { n: "Chandragupta II (Vikramaditya)", r: "c. 375–415 CE", d: "Patron of Kalidasa and the 'nine gems' of his court." }
    ],
    legacy: ["Aryabhata's zero and heliocentric hints", "Kalidasa's plays (Abhijnanasakuntalam)", "Varahamihira's astronomy", "Iron Pillar of Delhi"],
    architecture: ["Ajanta cave murals", "Dashavatara temple, Deogarh", "Brick temples at Bhitargaon"],
    tags: ["Golden Age", "Sanskrit", "Science"] },

  { id: "vakataka", name: "Vakataka Dynasty", era: "classical", region: "Deccan",
    period: "c. 250 – 500 CE", tagline: "The patrons behind the Ajanta cave masterpieces.",
    image: "https://images.unsplash.com/photo-1609151941355-12a5309d6b61?w=900&q=70",
    desc: "Allies and contemporaries of the Guptas, their court funded the finest phase of Ajanta's paintings.",
    overview: "The Vakatakas ruled the central Deccan and married into the Gupta family. Under Harishena, Ajanta's most celebrated caves (1, 2, 16, 17) were painted — now UNESCO World Heritage.",
    rulers: [{ n: "Harishena", r: "c. 475–500 CE", d: "His minister Varahadeva commissioned Ajanta Cave 16." }],
    legacy: ["Ajanta's finest murals", "Sanskrit patronage (Pravarasena II)", "Bridge between north and south traditions"],
    architecture: ["Ajanta Caves 16, 17, 19, 26", "Rock-cut vihara complexes", "Nardeshwar temple"],
    tags: ["Art", "Ajanta", "Patronage"] },

  { id: "pallava", name: "Pallava Dynasty", era: "classical", region: "South",
    period: "c. 275 – 897 CE", tagline: "Pioneers of Dravidian temple architecture and Tamil bhakti.",
    image: "https://images.unsplash.com/photo-1587922546307-776227941871?w=900&q=70",
    desc: "From their capital Kanchipuram, the Pallavas carved shore temples, birthed Dravidian architecture and fostered Tamil bhakti saints.",
    overview: "The Pallavas transformed Mahabalipuram into a workshop of rock-cut architecture. The Nayanars and Alvars composed their devotional hymns under Pallava patronage, shaping Tamil Hinduism.",
    rulers: [
      { n: "Mahendravarman I", r: "c. 600–630 CE", d: "Started the rock-cut tradition; playwright and Jain-turned-Shaiva." },
      { n: "Narasimhavarman I (Mamalla)", r: "c. 630–668 CE", d: "Defeated the Chalukyas; Mamallapuram is named after him." },
      { n: "Narasimhavarman II (Rajasimha)", r: "c. 700–728 CE", d: "Built the Shore Temple and Kailasanathar at Kanchi." }
    ],
    legacy: ["Birth of Dravidian temple style", "Tamil bhakti movement (Nayanars, Alvars)", "Sanskrit-Tamil literary synthesis"],
    architecture: ["Shore Temple, Mahabalipuram", "Pancha Rathas", "Kailasanathar Temple, Kanchipuram"],
    tags: ["Temples", "Bhakti", "Tamil"] },

  { id: "chalukya", name: "Chalukyas of Badami", era: "classical", region: "Deccan",
    period: "c. 543 – 753 CE", tagline: "Rock-cut pioneers who fused Nagara and Dravida styles.",
    image: "https://images.unsplash.com/photo-1564507592333-c6065734d399?w=900&q=70",
    desc: "From the red sandstone cliffs of Badami, the Chalukyas created a hybrid temple style that shaped Deccan architecture.",
    overview: "Pulakeshin II famously defeated Harshavardhana on the Narmada. Their cave temples at Badami, and structural temples at Aihole and Pattadakal, mark the birth of 'Vesara' (mixed) architecture.",
    rulers: [{ n: "Pulakeshin II", r: "c. 610–642 CE", d: "Defeated Harsha; his Aihole inscription is a key historical source." }],
    legacy: ["Vesara architectural style", "Aihole inscription (court poet Ravikirti)", "Defeat of Harshavardhana"],
    architecture: ["Badami cave temples", "Aihole's 70+ experimental temples", "Pattadakal UNESCO complex"],
    tags: ["Vesara", "Architecture", "Deccan"] },

  { id: "rashtrakuta", name: "Rashtrakuta Empire", era: "medieval", region: "Deccan",
    period: "c. 753 – 982 CE", tagline: "Builders of the world's largest monolithic monument.",
    image: "https://images.unsplash.com/photo-1564507592333-c6065734d399?w=900&q=70",
    desc: "A Deccan superpower that ruled from the Narmada to the Kaveri and carved the Kailasa temple at Ellora.",
    overview: "The Rashtrakutas displaced the Chalukyas and became the dominant power of peninsular India. Their court was multilingual, their reach diplomatic (embassies to Baghdad).",
    rulers: [
      { n: "Dantidurga", r: "c. 735–756 CE", d: "Founder — overthrew Chalukya overlordship." },
      { n: "Krishna I", r: "c. 756–774 CE", d: "Commissioned the Kailasa temple at Ellora." },
      { n: "Amoghavarsha I", r: "c. 814–878 CE", d: "Author of Kavirajamarga, earliest Kannada literary work." }
    ],
    legacy: ["Kailasa temple (monolithic marvel)", "Kavirajamarga (Kannada literature)", "Embassies to the Abbasid Caliphate"],
    architecture: ["Kailasa Temple, Ellora", "Elephanta cave sculptures", "Jain temples at Malkhed"],
    tags: ["Monolith", "Kannada", "Ellora"] },

  { id: "pala", name: "Pala Empire", era: "medieval", region: "East",
    period: "c. 750 – 1174 CE", tagline: "Buddhist Bengal's last great imperial dynasty.",
    image: "https://images.unsplash.com/photo-1609151941355-12a5309d6b61?w=900&q=70",
    desc: "A Buddhist dynasty that ruled Bengal and Bihar for four centuries and built the great universities of Nalanda and Vikramashila.",
    overview: "The Palas were elected by regional chiefs after a period of anarchy (matsyanyaya). They revived Nalanda and founded Vikramashila, sending Buddhist scholars to Tibet.",
    rulers: [
      { n: "Gopala I", r: "c. 750–770 CE", d: "Elected king; ended Bengal's anarchy." },
      { n: "Dharmapala", r: "c. 770–810 CE", d: "Founded Vikramashila University." },
      { n: "Devapala", r: "c. 810–850 CE", d: "Empire's zenith — defeated Pratiharas and Rashtrakutas." }
    ],
    legacy: ["Vikramashila University", "Buddhist transmission to Tibet (Atisha)", "Proto-Bengali language"],
    architecture: ["Somapura Mahavihara (UNESCO)", "Vikramashila ruins", "Pala bronze sculptures"],
    tags: ["Buddhist", "Universities", "Bengal"] },

  { id: "pratihara", name: "Gurjara-Pratihara Empire", era: "medieval", region: "North",
    period: "c. 730 – 1036 CE", tagline: "The doorkeepers of India — blocking Arab expansion eastward.",
    image: "https://images.unsplash.com/photo-1564507592333-c6065734d399?w=900&q=70",
    desc: "A tripartite struggle with the Palas and Rashtrakutas for Kannauj defined early medieval north India.",
    overview: "The Pratiharas blocked Arab armies from Sindh for three centuries. Their court at Kannauj patronised the great Sanskrit poet Rajashekhara.",
    rulers: [
      { n: "Nagabhata I", r: "c. 730–760 CE", d: "Repelled Arab invasions." },
      { n: "Mihira Bhoja", r: "c. 836–885 CE", d: "Empire's zenith; a great Vaishnava devotee." }
    ],
    legacy: ["Check on Arab expansion into India", "Kannauj as imperial capital", "Khajuraho temples (by feudatory Chandelas)"],
    architecture: ["Teli-ka-Mandir, Gwalior", "Bateshwar temple complex", "Early Nagara-style temples"],
    tags: ["Imperial", "Nagara", "Kannauj"] },

  { id: "chola", name: "Chola Empire", era: "medieval", region: "South",
    period: "c. 848 – 1279 CE", tagline: "India's greatest maritime empire — ships that reached Southeast Asia.",
    image: "https://images.unsplash.com/photo-1587922546307-776227941871?w=900&q=70",
    desc: "From Thanjavur, the Cholas ruled peninsular India, conquered Sri Lanka and sent naval expeditions to Srivijaya (Indonesia).",
    overview: "The Imperial Cholas were master builders, administrators and sailors. They instituted village self-governance (the Uttiramerur inscriptions) and erected the tallest temple towers of their age.",
    rulers: [
      { n: "Rajaraja Chola I", r: "985–1014 CE", d: "Built the Brihadisvara Temple at Thanjavur." },
      { n: "Rajendra Chola I", r: "1014–1044 CE", d: "Conquered Srivijaya; founded Gangaikondacholapuram." }
    ],
    legacy: ["Village self-governance (Uttiramerur)", "Naval expeditions to Southeast Asia", "Bronze Nataraja sculptures", "Spread of Hinduism to Southeast Asia"],
    architecture: ["Brihadisvara Temple, Thanjavur (UNESCO)", "Gangaikondacholapuram temple", "Airavatesvara, Darasuram"],
    tags: ["Maritime", "Naval", "Dravidian"] },

  { id: "hoysala", name: "Hoysala Empire", era: "medieval", region: "South",
    period: "c. 1026 – 1343 CE", tagline: "Soapstone sculptors whose temples read like carved encyclopaedias.",
    image: "https://images.unsplash.com/photo-1564507592333-c6065734d399?w=900&q=70",
    desc: "A Kannada dynasty whose star-shaped temples at Belur, Halebidu and Somnathpur are pinnacles of Indian sculpture.",
    overview: "The Hoysalas ruled the Karnataka plateau and produced a uniquely ornate style of temple architecture. Every surface of their temples is carved with deities, musicians, dancers and animals.",
    rulers: [{ n: "Vishnuvardhana", r: "c. 1108–1152 CE", d: "Commissioned the Chennakeshava Temple at Belur." }],
    legacy: ["Star-shaped temple plans", "Pinnacle of soapstone carving", "Patronage to both Jainism and Vaishnavism"],
    architecture: ["Chennakeshava Temple, Belur (UNESCO)", "Hoysaleswara Temple, Halebidu", "Kesava Temple, Somnathpur"],
    tags: ["Sculpture", "Kannada", "Temples"] },

  { id: "kakatiya", name: "Kakatiya Dynasty", era: "medieval", region: "South",
    period: "c. 1163 – 1323 CE", tagline: "Telugu warrior-queens and engineers of tank-irrigation.",
    image: "https://images.unsplash.com/photo-1564507592333-c6065734d399?w=900&q=70",
    desc: "From Warangal, the Kakatiyas built irrigation tanks, diamond-trade networks and the Thousand-Pillar Temple.",
    overview: "The Kakatiyas transformed the dry Telangana plateau with an extraordinary network of irrigation tanks. Rudrama Devi, one of India's rare ruling queens, defended the kingdom against the Yadavas and Pandyas.",
    rulers: [
      { n: "Ganapatideva", r: "1199–1262 CE", d: "Longest reign; expanded trade and irrigation." },
      { n: "Rudrama Devi", r: "1262–1289 CE", d: "One of India's few reigning queens." }
    ],
    legacy: ["Tank-irrigation network (still in use)", "Koh-i-Noor diamond's earliest traces", "Rudrama Devi — rare female ruler"],
    architecture: ["Thousand-Pillar Temple, Hanamkonda", "Ramappa Temple (UNESCO)", "Warangal Fort's kakatiya toranas"],
    tags: ["Irrigation", "Telugu", "Warrior queens"] },

  { id: "vijayanagara", name: "Vijayanagara Empire", era: "earlymodern", region: "South",
    period: "1336 – 1646 CE", tagline: "The City of Victory — Hindu south's bulwark and jewel.",
    image: "https://images.unsplash.com/photo-1564507592333-c6065734d399?w=900&q=70",
    desc: "From Hampi's boulders, Vijayanagara ruled the Deccan and south — a cosmopolitan market city visited by travellers from Europe and Arabia.",
    overview: "Founded by Harihara and Bukka, Vijayanagara became one of the largest cities in the world by the 1500s. Portuguese and Persian travellers described its wealth, markets and temple festivals. The 1565 Battle of Talikota ended its golden age.",
    rulers: [
      { n: "Krishnadevaraya", r: "1509–1529 CE", d: "The empire's greatest king; poet, conqueror and patron of Telugu literature." }
    ],
    legacy: ["Peak of south Indian temple architecture", "Telugu literary golden age", "International diamond and spice trade"],
    architecture: ["Hampi (UNESCO city ruins)", "Vitthala Temple's musical pillars", "Virupaksha and Hazara Rama temples"],
    tags: ["Hampi", "Trade", "Telugu"] },

  { id: "mughal", name: "Mughal Empire", era: "earlymodern", region: "Pan-Indian",
    period: "1526 – 1857 CE", tagline: "The empire that built the Taj, and the miniature painting.",
    image: "https://images.unsplash.com/photo-1564507592333-c6065734d399?w=900&q=70",
    desc: "From Babur's victory at Panipat to Shah Jahan's marble poetry, the Mughals unified much of India and created a syncretic court culture.",
    overview: "Babur founded the dynasty; Akbar built its institutions (mansabdari, sulh-i-kul); Jahangir patronised painting; Shah Jahan built in marble; Aurangzeb expanded but strained. The empire fragmented after 1707, formally ending in 1857.",
    rulers: [
      { n: "Akbar the Great", r: "1556–1605 CE", d: "Instituted religious tolerance (sulh-i-kul) and the mansabdari system." },
      { n: "Shah Jahan", r: "1628–1658 CE", d: "Builder of the Taj Mahal, Red Fort, Jama Masjid." },
      { n: "Aurangzeb", r: "1658–1707 CE", d: "Expanded the empire to its greatest extent; orthodox policies strained it." }
    ],
    legacy: ["Mughal miniature painting", "Urdu language synthesis", "Mansabdari administration", "Indo-Persian court culture"],
    architecture: ["Taj Mahal (UNESCO)", "Red Fort & Jama Masjid, Delhi", "Fatehpur Sikri", "Humayun's Tomb"],
    tags: ["Taj Mahal", "Urdu", "Miniature"] } ]