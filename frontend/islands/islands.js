/* ================ ISLANDS DATA ================ */
const GROUPS = {
  "Andaman & Nicobar": { gradient: "var(--g-anc)", color: "#ff7e6b", emoji: "🌋" },
  "Lakshadweep":       { gradient: "var(--g-lkd)", color: "#7ed7c1", emoji: "🪸" },
  "River":             { gradient: "var(--g-riv)", color: "#b88a4d", emoji: "🏞️" },
  "Delta":             { gradient: "var(--g-del)", color: "#6ba368", emoji: "🐅" },
  "Coastal":           { gradient: "var(--g-coa)", color: "#7fb4ff", emoji: "🏖️" }
};

const ISLANDS = [
  { id: "havelock", name: "Havelock (Swaraj Dweep)", group: "Andaman & Nicobar",
    location: "South Andaman district", lat: 11.98, lng: 93.00,
    area: "114 km²", bestTime: "Nov–May",
    image: "https://images.unsplash.com/photo-1589171039626-3b468b5a9cbe?w=900&q=70",
    tags: ["Beaches", "Scuba", "Tropical"],
    desc: "Home to Radhanagar — consistently voted among Asia's best beaches — Havelock is the Andamans' resort island, wrapped in mahua and mahogany forest.",
    overview: "Officially renamed Swaraj Dweep, Havelock is a long sliver of land about 57 km from Port Blair. Its western shore offers the famous Radhanagar Beach, while the east is a network of fishing villages and mangrove creeks.",
    wildlife: ["Dugongs in shallow bays", "Saltwater crocodiles in mangroves", "Hornbills, imperial pigeons", "Healthy coral reefs with 40+ hard coral species"],
    culture: "Settled largely by Bengali refugees post-Partition, the island blends Bengali, Tamil and Nicobari influences. The annual Island Tourism Festival celebrates the mix.",
    travel: { how: "Ferry from Port Blair (2.5 hrs) or helicopter", stay: "Mid-range to luxury resorts at Beach 3, 5, 7", tips: "Book dive sessions early — visibility peaks Jan–Mar" }
  },
  { id: "neil", name: "Neil Island (Shaheed Dweep)", group: "Andaman & Nicobar",
    location: "South Andaman district", lat: 11.83, lng: 93.05,
    area: "18 km²", bestTime: "Oct–May",
    image: "https://images.unsplash.com/photo-1586864387789-628af9feedb6?w=900&q=70",
    tags: ["Quiet", "Natural bridges", "Cycling"],
    desc: "The Andamans' quiet cousin — famous for natural rock bridges, coral shallows and cycling-sized lanes.",
    overview: "Named after a British officer, now officially Shaheed Dweep, this tiny island is a 90-minute ferry from Port Blair. Five numbered beaches, each with a different character.",
    wildlife: ["Olive Ridley turtles nest on the beaches", "Reef fish in snorkelling depth", "Mangrove kingfishers"],
    culture: "A quieter, more village-paced life than Havelock. The Sunday market is a small cultural hub.",
    travel: { how: "Ferry from Port Blair or Havelock", stay: "Beach huts and homestays", tips: "Rent a bicycle — the island is flat and small" }
  },
  { id: "barren", name: "Barren Island", group: "Andaman & Nicobar",
    location: "Eastern Andaman Sea", lat: 12.28, lng: 93.86,
    area: "8 km²", bestTime: "Year-round (restricted)",
    image: "https://images.unsplash.com/photo-1600011631984-1f0c9bfb3f0d?w=900&q=70",
    tags: ["Volcano", "No human settlement", "Diving"],
    desc: "South Asia's only confirmed active volcano, and India's only one — erupting periodically since 1991.",
    overview: "Landing is forbidden without a research permit, but boats circle the caldera and dive sites around the cone are considered world-class.",
    wildlife: ["Few land species — mostly seabirds", "Unique hydrothermal vent communities", "Pelagic fish in the drop-offs"],
    culture: "No human habitation — one of India's only truly uninhabited islands.",
    travel: { how: "Liveaboard dive boats from Port Blair", stay: "None — day excursions only", tips: "Check Andaman Tourism permit rules before booking" }
  },
  { id: "ross", name: "Ross Island (Netaji Subhash Chandra Bose Dweep)", group: "Andaman & Nicobar",
    location: "Port Blair harbour", lat: 11.68, lng: 92.76,
    area: "0.3 km²", bestTime: "Year-round",
    image: "https://images.unsplash.com/photo-1587922546307-776227941871?w=900&q=70",
    tags: ["Colonial ruins", "History", "Deer"],
    desc: "The abandoned 'Paris of the East' — British administrative HQ left to forest and deer.",
    overview: "From 1858 to 1941 this was the administrative capital of the Andamans. Earthquake and war left its churches, bakeries and ballrooms to be slowly reclaimed by banyans and spotted deer.",
    wildlife: ["Introduced spotted deer now roam freely", "Peacocks and monitor lizards", "Banyans strangling colonial masonry"],
    culture: "A living monument to the British penal colony — including the Cellular Jail connection on nearby Viper Island.",
    travel: { how: "15-minute ferry from Port Blair", stay: "Day trip only", tips: "Sound-and-light show in the evening tells the island's story" }
  },
  { id: "agatti", name: "Agatti Island", group: "Lakshadweep",
    location: "Lakshadweep archipelago", lat: 10.83, lng: 72.18,
    area: "3.8 km²", bestTime: "Oct–Mid-May",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=70",
    tags: ["Lagoon", "Snorkelling", "Airport"],
    desc: "The gateway island of Lakshadweep — one of the few with an airstrip, sitting inside a perfect turquoise lagoon.",
    overview: "Most visitors land here and ferry onward to Bangaram or Kadmat. The lagoon itself is the draw — shallow, calm and rich in coral.",
    wildlife: ["Green and Hawksbill turtles", "Parrotfish, butterflyfish, morays", "Frigate birds nesting"],
    culture: "Majority Muslim, Malayalam and Mahl-speaking. Alcohol and non-veg food rules apply as per UT norms.",
    travel: { how: "Flight from Kochi (90 min)", stay: "Single government-run resort + homestays", tips: "Permit required — book through licensed operators" }
  },
  { id: "bangaram", name: "Bangaram Atoll", group: "Lakshadweep",
    location: "Northern Lakshadweep", lat: 10.95, lng: 72.05,
    area: "0.6 km²", bestTime: "Oct–May",
    image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=900&q=70",
    tags: ["Atoll", "Bioreserve", "Uninhabited"],
    desc: "A postcard-perfect atoll — a sandbank of white coral ringed by reef and lagoon.",
    overview: "Uninhabited apart from a small resort, Bangaram is reached by boat from Agatti. It is part of a marine bioreserve and is often described as India's most beautiful beach.",
    wildlife: ["Giant clams", "Reef sharks in the drop-off", "Hermit crabs in thousands"],
    culture: "Strict no-alcohol, low-impact tourism — the resort runs on solar and desalination.",
    travel: { how: "Boat from Agatti", stay: "Single eco-resort", tips: "Book well in advance — only 60 beds on the island" }
  },
  { id: "minicoy", name: "Minicoy (Maliku)", group: "Lakshadweep",
    location: "Southernmost Lakshadweep", lat: 8.28, lng: 73.05,
    area: "4.8 km²", bestTime: "Sep–May",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=70",
    tags: ["Lighthouse", "Jahad race boats", "Maldivian link"],
    desc: "The southernmost island — culturally closer to the Maldives, famous for its 1885 lighthouse and long racing boats.",
    overview: "Minicoy is shaped like a crescent, almost entirely ringed by coconut palms. Its culture and language (Mahl) are shared with the Maldives, only 120 km south.",
    wildlife: ["Tuna-rich waters", "Heronies and terns", "Lagoon seagrass beds"],
    culture: "Matrilineal society; the 9-metre jahad race boats are cultural symbols and still sail during festivals.",
    travel: { how: "Ship from Kochi (18 hrs) or flight to Agatti + ferry", stay: "Government guest houses", tips: "Visit the 1885 lighthouse — panoramic views" }
  },
  { id: "majuli", name: "Majuli", group: "River",
    location: "Brahmaputra, Assam", lat: 26.95, lng: 94.17,
    area: "880 km² (shrinking)", bestTime: "Nov–Mar",
    image: "https://images.unsplash.com/photo-1599661046289-326574001573?w=900&q=70",
    tags: ["World's largest river island", "Satras", "Mask-making"],
    desc: "The world's largest river island — a UNESCO-tentative cultural heartland of Assamese Neo-Vaishnavism.",
    overview: "Majuli sits between the Brahmaputra and its tributary Subansiri. Once over 1,200 km², erosion has reduced it sharply, but it remains the cultural soul of Assam with 22 active satras (monasteries).",
    wildlife: ["Migratory Siberian cranes", "Gangetic dolphins", "Rare river turtles"],
    culture: "The satras preserve Sattriya dance, bhaona theatre and the unique mask-making of Samaguri. Every November, the Raas Leela festival draws pilgrims from across India.",
    travel: { how: "Ferry from Jorhat (Nimatighat)", stay: "Satra-run guesthouses and bamboo cottages", tips: "Hire a local guide — many satras require permission" }
  },
  { id: "srirangapatna", name: "Srirangapatna", group: "River",
    location: "Kaveri River, Karnataka", lat: 12.42, lng: 76.69,
    area: "13 km²", bestTime: "Oct–Mar",
    image: "https://images.unsplash.com/photo-1564507592333-c6065734d399?w=900&q=70",
    tags: ["Tipu Sultan", "Ranganathaswamy", "Heritage"],
    desc: "A river island steeped in history — capital of Tipu Sultan, home to one of India's great Vishnu temples.",
    overview: "Formed by a fork of the Kaveri, Srirangapatna has been a strategic and sacred site for centuries. Tipu Sultan made it his capital; the British took it in 1799.",
    wildlife: ["River birds — kingfishers, egrets", "Fish eagles", "Mahseer fish in the Kaveri"],
    culture: "The Sri Ranganathaswamy Temple is one of the Pancharanga Kshetras. Tipu's Summer Palace and the Daria Daulat Bagh garden survive.",
    travel: { how: "15 km from Mysuru by road", stay: "Day trip from Mysuru", tips: "Combine with nearby Ranganathittu Bird Sanctuary" }
  },
  { id: "sundarbans", name: "Sundarbans Delta Islands", group: "Delta",
    location: "Ganges delta, West Bengal", lat: 21.95, lng: 88.95,
    area: "10,000 km² (delta)", bestTime: "Nov–Feb",
    image: "https://images.unsplash.com/photo-1622209336336-3d2c4b3a1cc1?w=900&q=70",
    tags: ["Mangroves", "Royal Bengal Tiger", "UNESCO"],
    desc: "The world's largest mangrove forest — a UNESCO site shared with Bangladesh, home to swimming tigers.",
    overview: "Technically an archipelago of 100+ islets formed by the Ganga-Brahmaputra-Meghna delta. The Indian portion is ~4,200 km² of tidal mangroves, creeks and mudflats.",
    wildlife: ["Royal Bengal Tigers adapted to swim between islands", "Saltwater crocodiles", "Gangetic dolphins", "260+ bird species"],
    culture: "Communities worship Bonbibi (forest goddess) and Dakshin Rai (tiger god) before entering the forest — a unique syncretic tradition.",
    travel: { how: "Road + boat from Kolkata (3-4 hrs)", stay: "Eco-resorts on Gosaba, Bali and Satjelia islands", tips: "Guided boat safaris only — strict forest rules" }
  },
  { id: "divar", name: "Divar Island", group: "Coastal",
    location: "Mandovi River, Goa", lat: 15.52, lng: 73.89,
    area: "9 km²", bestTime: "Oct–May",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=70",
    tags: ["Portuguese heritage", "Paddy fields", "Bonderam"],
    desc: "A quiet river island in the Mandovi — Portuguese-era churches, paddy fields and the famous Bonderam festival.",
    overview: "Connected to Old Goa by a small bridge, Divar is one of Goa's three river islands. Its name derives from the Konkani word for 'small island'.",
    wildlife: ["Otters in the Mandovi", "River terns", "Kingfishers and bee-eaters"],
    culture: "The Bonderam festival (August) reenacts a historical boundary dispute with mock battles and music — unique to Divar.",
    travel: { how: "Road from Panjim (20 min)", stay: "Heritage homestays", tips: "Combine with nearby Chorao island for a full Mandovi trail" }
  },
  { id: "willington", name: "Willingdon Island", group: "Coastal",
    location: "Kochi harbour, Kerala", lat: 9.95, lng: 76.27,
    area: "3.7 km²", bestTime: "Sep–May",
    image: "https://images.unsplash.com/photo-1593693397690-b62723a3d7ed?w=900&q=70",
    tags: ["Man-made", "Port", "Navy"],
    desc: "India's largest man-made island — built from dredged harbour soil in 1936, now hosting the port, navy and Taj hotel.",
    overview: "Named after Lord Willingdon, the British Viceroy, this island was created by deepening the Kochi harbour. Today it houses the Cochin Port, Southern Naval Command and the airport's original runway.",
    wildlife: ["Minimal — urban ecosystem", "Harbour birds and kites", "Mullet and prawns in the backwaters"],
    culture: "A cosmopolitan slice of Kochi — Jewish, Syrian Christian, Muslim and naval families have lived here for generations.",
    travel: { how: "Road from Kochi city centre (15 min)", stay: "Taj Malabar and port guest houses", tips: "Evening walks along the backwaters facing Fort Kochi" }
  },
  { id: "pathiramanal", name: "Pathiramanal", group: "Coastal",
    location: "Vembanad Lake, Kerala", lat: 9.62, lng: 76.41,
    area: "0.03 km²", bestTime: "Aug–Mar",
    image: "https://images.unsplash.com/photo-1602216011830-0a3f4c5d2f06?w=900&q=70",
    tags: ["Tiny", "Birding", "Backwaters"],
    desc: "A 28-acre dot in Vembanad Lake — 'sands of midnight' — famous among birdwatchers and houseboat travellers.",
    overview: "The Malayalam name means 'sands of night' — a small but beloved stop on Kerala's houseboat trails. The island hosts a bird sanctuary.",
    wildlife: ["Migratory Siberian cranes (winter)", "Darters, cormorants, kingfishers", "Bronze-winged jacanas"],
    culture: "Legends say the island rose from the lake when a diving sage threw a clod of earth that landed and stayed.",
    travel: { how: "Houseboat or motorboat from Kumarakom (15 min)", stay: "Day visit only", tips: "Best at sunrise — birds are most active" }
  },
  { id: "st-marys-island", name: "St. Mary's Island Beach", group: "Coastal",
    location: "Udupi, Karnataka", lat: 13.35, lng: 74.75,
    area: "0.5 km²", bestTime: "Oct–May",
    image: "https://images.unsplash.com/photo-1582719428252-bd1a6an446ba?w=900&q=70",
    tags: ["Geological", "Basalt", "Beach", "Formation"],
    desc: "A cluster of picturesque islands off the coast of Karnataka, famous for unique basaltic rock formations.",
    overview: "St. Mary's Island, also known as Coconut Island or Shivalli Island, lies off the coast of Udupi in Karnataka. The island is geologically significant for its pristine hexagonal basaltic rock formations, believed to be formed by sub-surface volcanic activity during the break-up of the Gondwana supercontinent roughly 60 million years ago. The dark basalt columns contrast beautifully with the white sandy beaches and turquoise waters, making it a photographer's and geologist's delight.",
    wildlife: ["Seabirds nesting on cliffs", "Marine life in surrounding waters", "Crabs and shells along the shore"],
    culture: "A popular pilgrimage and tourist site — locals visit the St. Mary's Island church, and the island is named after the Virgin Mary. Coconut palms and casuarina trees provide shade along the coastline.",
    travel: { how: "Drive from Mangalore (60 km) or Udupi (10 km) followed by a short boat ride from Malpe or Udupi harbour", stay: "No overnight accommodation on the island — day visits from Udupi or Malpe; stay in Udupi city ranging from budget to heritage homestays", tips: "Visit during low tide for full beach access; carry drinking water and sun protection; respect the geological formations — do not remove basalt samples" }
  }
];

const ITINERARIES = [
  { name: "Andaman Beach Hopper", days: "7 days", color: "var(--g-anc)",
    summary: "Sun, surf and scuba — the classic A&N loop",
    stops: [
      { n: "Port Blair", sub: "Cellular Jail + Ross Island" },
      { n: "Havelock", sub: "Radhanagar Beach · 2 nights" },
      { n: "Neil Island", sub: "Natural bridges · 1 night" },
      { n: "Baratang", sub: "Limestone caves · day trip" }
    ]},
  { name: "Lakshadweep Reef Run", days: "5 days", color: "var(--g-lkd)",
    summary: "Atolls, lagoons and untouched coral",
    stops: [
      { n: "Agatti", sub: "Landing + lagoon snorkel" },
      { n: "Bangaram", sub: "Uninhabited atoll · 2 nights" },
      { n: "Kadmat", sub: "Quiet beaches · 1 night" },
      { n: "Thinnakara", sub: "Sandbank picnic" }
    ]},
  { name: "Brahmaputra Cultural", days: "4 days", color: "var(--g-riv)",
    summary: "Satras, masks and the mighty river",
    stops: [
      { n: "Nimatighat", sub: "Ferry to Majuli" },
      { n: "Kamalabari Satra", sub: "Sattriya dance" },
      { n: "Samaguri", sub: "Mask-making workshops" },
      { n: "Garamur", sub: "Raas Leela if Nov" }
    ]},
  { name: "Sundarbans Tiger Trail", days: "3 days", color: "var(--g-del)",
    summary: "Mangrove safaris in the tiger's domain",
    stops: [
      { n: "Godkhali", sub: "Board safari boat" },
      { n: "Sajnekhali", sub: "Watchtower + mangrove museum" },
      { n: "Sudhanyakhali", sub: "Sweet-water pool" },
      { n: "Dobanki", sub: "Canopy walk" }
    ]}
];

const FACTS = [
  { text: "Majuli, in Assam's Brahmaputra, is the world's largest inhabited river island — and the first island to become its own district.", source: "Geography of India" },
  { text: "India has 1,382 identified islands and islets, of which only about 100 are inhabited.", source: "Survey of India" },
  { text: "Barren Island is South Asia's only confirmed active volcano. It erupted in 1991, 1994–95, 2005, 2017 and 2018.", source: "Geological Survey of India" },
  { text: "The Andaman's indigenous Sentinelese people remain one of the world's last uncontacted tribes, on North Sentinel Island.", source: "Anthropological Survey" },
  { text: "Lakshadweep's name means 'a hundred thousand islands' in Sanskrit, but it actually has 36 islands, of which only 10 are inhabited.", source: "UT Administration" },
  { text: "The Sundarbans — shared with Bangladesh — is the world's largest mangrove forest and the only place where tigers swim between islands to hunt.", source: "UNESCO" },
  { text: "Willingdon Island in Kochi was built in 1936 from soil dredged while deepening the harbour — it is India's largest man-made island.", source: "Cochin Port Trust" },
  { text: "Agatti's runway is one of the shortest commercial airstrips in India — about 1,200 metres long.", source: "AAI" },
  { text: "The Dhanushkodi tip of Rameswaram island is only 30 km from Sri Lanka — legend says Rama's bridge once connected them.", source: "Ramayana tradition" }
];

const QUIZ = [
  { q: "Pick a vibe:", opts: [
    { text: "🌊 Postcard-perfect beach, turquoise water", tags: { "Lakshadweep": 3, "Andaman & Nicobar": 2 } },
    { text: "🌿 Quiet village life, cycling around", tags: { "River": 2, "Coastal": 2 } },
    { text: "🐯 Wild mangroves and mystery", tags: { "Delta": 4 } },
    { text: "🎭 Deep culture, rituals and history", tags: { "River": 3, "Andaman & Nicobar": 1 } }
  ]},
  { q: "Your ideal morning:", opts: [
    { text: "☕ Sunrise over the ocean, then a snorkel", tags: { "Lakshadweep": 3, "Andaman & Nicobar": 2 } },
    { text: "🚴 Renting a bicycle and wandering", tags: { "Coastal": 2, "River": 2 } },
    { text: "🛶 Silent boat ride through creeks", tags: { "Delta": 4, "Coastal": 1 } },
    { text: "🎭 Visiting a monastery or temple", tags: { "River": 3, "Andaman & Nicobar": 1 } }
  ]},
  { q: "Pick a meal:", opts: [
    { text: "🦞 Fresh grilled catch on the beach", tags: { "Andaman & Nicobar": 3, "Lakshadweep": 2 } },
    { text: "🍚 Traditional banana-leaf thali", tags: { "Coastal": 3, "River": 1 } },
    { text: "🥘 Slow-cooked, spicy, home-style", tags: { "Delta": 3, "River": 1 } },
    { text: "🥥 Coconut-heavy, mild and fresh", tags: { "Lakshadweep": 3, "Coastal": 1 } }
  ]},
  { q: "Crowds:", opts: [
    { text: "👥 Lively — I want cafes and dive shops", tags: { "Andaman & Nicobar": 3 } },
    { text: "🤫 Very quiet — the fewer people the better", tags: { "Lakshadweep": 3, "Coastal": 2 } },
    { text: "👨‍🌾 Authentic locals, no tourist bubble", tags: { "River": 3, "Delta": 2 } },
    { text: "🎉 I want a mix — some hustle, some calm", tags: { "Coastal": 3 } }
  ]},
  { q: "What draws you most:", opts: [
    { text: "🪸 Coral reefs and underwater life", tags: { "Lakshadweep": 4, "Andaman & Nicobar": 2 } },
    { text: "🌋 Volcanoes and raw geology", tags: { "Andaman & Nicobar": 4 } },
    { text: "🐅 Wildlife — big animals, wild spaces", tags: { "Delta": 4, "River": 1 } },
    { text: "🎨 Living culture — dance, crafts, ritual", tags: { "River": 4, "Coastal": 2 } }
  ]}
];

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const STORAGE_KEY = "iie_islands_prefs";

/* ================ STATE ================ */
const state = {
  group: "all",
  query: "",
  compare: new Set(),
  pickA: ISLANDS[0].id,
  pickB: ISLANDS[1].id,
  quizStep: 0,
  quizScores: {},
  factIdx: 0
};

/* ================ HELPERS ================ */
const $ = (id) => document.getElementById(id);
const escapeHtml = (v) => String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function countUp(el, target, duration = 1400) {
  if (REDUCED) { el.textContent = target.toLocaleString("en-IN"); return; }
  const t0 = performance.now();
  (function step(t) {
    const p = Math.min(1, (t - t0) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString("en-IN");
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ================ MAP ================ */
let mapInstance = null, markers = {}, markerGroup = null;

function initMap() {
  if (typeof L === "undefined") return;
  mapInstance = L.map("islands-map", {
    center: [18, 82],
    zoom: 4,
    minZoom: 3,
    maxZoom: 10,
    worldCopyJump: true
  });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
    maxZoom: 19
  }).addTo(mapInstance);

  markerGroup = L.layerGroup().addTo(mapInstance);
  ISLANDS.forEach((isl) => {
    const g = GROUPS[isl.group];
    const icon = L.divIcon({
      className: "custom-marker",
      html: `<span class="marker-pin" style="background:${g.gradient}; border-color:${g.color}">${g.emoji}</span>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36]
    });
    const marker = L.marker([isl.lat, isl.lng], { icon }).addTo(markerGroup);
    marker.bindPopup(`
      <div class="island-popup">
        <strong>${escapeHtml(isl.name)}</strong>
        <small>${escapeHtml(isl.group)} · ${escapeHtml(isl.location)}</small>
        <button data-jump="${isl.id}">View details →</button>
      </div>`);
    marker.on("popupopen", (e) => {
      const btn = e.popup.getElement().querySelector("[data-jump]");
      if (btn) btn.addEventListener("click", () => openModal(isl.id));
    });
    markers[isl.id] = marker;
  });
}

function flyTo(id) {
  const isl = ISLANDS.find((i) => i.id === id);
  if (!isl || !mapInstance) return;
  mapInstance.flyTo([isl.lat, isl.lng], 7, { duration: 1.4 });
  markers[id]?.openPopup();
  $("islands-map-section").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
}

/* ================ CARDS ================ */
function getVisibleIslands() {
  const q = state.query.trim().toLowerCase();
  return ISLANDS.filter((i) => {
    const inGroup = state.group === "all" || i.group === state.group;
    if (!inGroup) return false;
    if (!q) return true;
    const hay = `${i.name} ${i.group} ${i.location} ${i.desc} ${i.tags.join(" ")}`.toLowerCase();
    return hay.includes(q);
  });
}

function renderGrid() {
  const grid = $("islands-grid");
  const visible = getVisibleIslands();
  grid.innerHTML = "";
  $("islands-empty-state").hidden = visible.length > 0;
  $("islands-result-status").textContent =
    visible.length === ISLANDS.length
      ? `Showing all ${visible.length} islands`
      : `Showing ${visible.length} of ${ISLANDS.length} islands`;

  visible.forEach((i) => {
    const g = GROUPS[i.group];
    const card = document.createElement("article");
    card.className = "island-card";
    card.style.setProperty("--gb", g.gradient);
    card.innerHTML = `
      <div class="card-image">
        <span class="card-group-badge">${escapeHtml(i.group)}</span>
        <button class="card-compare ${state.compare.has(i.id) ? "ticked" : ""}" data-compare="${i.id}" aria-label="Add to compare">${state.compare.has(i.id) ? "" : "+"}</button>
        <div class="card-image-inner" style="background-image:url('${i.image}')"></div>
      </div>
      <div class="card-body">
        <h3>${escapeHtml(i.name)}</h3>
        <div class="card-location">📍 ${escapeHtml(i.location)}</div>
        <p class="card-desc">${escapeHtml(i.desc)}</p>
        <div class="card-stats">
          <span class="card-stat">📐 <strong>${escapeHtml(i.area)}</strong></span>
          <span class="card-stat">🌤️ <strong>${escapeHtml(i.bestTime)}</strong></span>
          <span class="card-stat">${g.emoji} <strong>${i.tags[0]}</strong></span>
        </div>
      </div>`;
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-compare]")) return;
      openModal(i.id);
    });
    grid.appendChild(card);
  });

  // compare toggle buttons
  grid.querySelectorAll("[data-compare]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleCompare(btn.dataset.compare);
    });
  });
}

function toggleCompare(id) {
  if (state.compare.has(id)) state.compare.delete(id);
  else {
    if (state.compare.size >= 2) {
      const first = [...state.compare][0];
      state.compare.delete(first);
    }
    state.compare.add(id);
  }
  const arr = [...state.compare];
  if (arr[0]) state.pickA = arr[0];
  if (arr[1]) state.pickB = arr[1];
  renderGrid();
  updateCompareUI();
  renderCompare();
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ compare: [...state.compare] })); } catch {}
}

function updateCompareUI() {
  const ind = $("compare-indicator");
  if (state.compare.size > 0) {
    ind.hidden = false;
    $("compare-count").textContent = state.compare.size;
  } else ind.hidden = true;
}

/* ================ COMPARE ================ */
function renderPickerOptions() {
  ["picker-a", "picker-b"].forEach((id) => {
    const sel = $(id);
    sel.innerHTML = ISLANDS.map((i) => `<option value="${i.id}">${escapeHtml(i.name)} — ${escapeHtml(i.group)}</option>`).join("");
  });
  $("picker-a").value = state.pickA;
  $("picker-b").value = state.pickB;
}

function renderCompare() {
  const a = ISLANDS.find((i) => i.id === state.pickA);
  const b = ISLANDS.find((i) => i.id === state.pickB);
  $("ca-name").textContent = a?.name || "—";
  $("cb-name").textContent = b?.name || "—";
  if (!a || !b) { $("compare-tbody").innerHTML = ""; return; }

  const rows = [
    ["Group", a.group, b.group],
    ["Location", a.location, b.location],
    ["Area", a.area, b.area],
    ["Best time", a.bestTime, b.bestTime],
    ["Vibe", a.tags.join(", "), b.tags.join(", ")],
    ["Overview", a.overview, b.overview]
  ];
  $("compare-tbody").innerHTML = rows
    .map(([label, av, bv]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(av)}</td><td>${escapeHtml(bv)}</td></tr>`)
    .join("");
}

/* ================ ITINERARIES ================ */
function renderItineraries() {
  $("iti-track").innerHTML = ITINERARIES.map((it) => `
    <article class="iti-card" style="--itc:${it.color}">
      <div class="iti-head">
        <span class="iti-days">${it.days}</span>
        <h3>${escapeHtml(it.name)}</h3>
        <p>${escapeHtml(it.summary)}</p>
      </div>
      <ol class="iti-stops">
        ${it.stops.map((s, i) => `<li class="iti-stop"><span class="iti-stop-num">${i + 1}</span><div><strong>${escapeHtml(s.n)}</strong><small>${escapeHtml(s.sub)}</small></div></li>`).join("")}
      </ol>
    </article>`).join("");
}

/* ================ QUIZ ================ */
function renderQuiz() {
  const stage = $("quiz-stage");
  const result = $("quiz-result");
  if (state.quizStep >= QUIZ.length) {
    stage.hidden = true;
    result.hidden = false;
    const scores = state.quizScores;
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    const group = winner[0];
    const match = ISLANDS.filter((i) => i.group === group)[Math.floor(Math.random() * 3)] || ISLANDS[0];
    result.innerHTML = `
      <div class="match-emoji">${GROUPS[group].emoji}</div>
      <h3>Your island vibe is</h3>
      <div class="match-island">${escapeHtml(group)}</div>
      <p>Try <strong>${escapeHtml(match.name)}</strong> — ${escapeHtml(match.desc)}</p>
      <button class="btn-primary" data-restart>Try again</button>
      <button class="btn-ghost" data-explore="${group}">Explore ${escapeHtml(group)}</button>`;
    result.querySelector("[data-restart]").addEventListener("click", restartQuiz);
    result.querySelector("[data-explore]").addEventListener("click", (e) => {
      state.group = e.target.dataset.explore;
      document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.dataset.group === state.group));
      renderGrid();
      $("islands-explorer").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
    });
    return;
  }
  stage.hidden = false;
  result.hidden = true;
  const q = QUIZ[state.quizStep];
  stage.innerHTML = `
    <h3>${escapeHtml(q.q)}</h3>
    <div class="quiz-options">
      ${q.opts.map((o, i) => `<button class="quiz-option" data-opt="${i}">${escapeHtml(o.text)}</button>`).join("")}
    </div>`;
  $("quiz-bar").style.width = ((state.quizStep / QUIZ.length) * 100) + "%";
  stage.querySelectorAll("[data-opt]").forEach((b) => {
    b.addEventListener("click", () => pickQuizOption(+b.dataset.opt));
  });
}

function pickQuizOption(idx) {
  const q = QUIZ[state.quizStep];
  const tags = q.opts[idx].tags;
  Object.entries(tags).forEach(([g, s]) => {
    state.quizScores[g] = (state.quizScores[g] || 0) + s;
  });
  state.quizStep++;
  renderQuiz();
}

function restartQuiz() {
  state.quizStep = 0;
  state.quizScores = {};
  renderQuiz();
}

/* ================ FACTS CAROUSEL ================ */
function renderFact() {
  const f = FACTS[state.factIdx];
  $("fact-text").textContent = f.text;
  $("fact-source").textContent = "— " + f.source;
  $("facts-dots").innerHTML = FACTS.map((_, i) => `<i class="${i === state.factIdx ? "active" : ""}" data-idx="${i}"></i>`).join("");
  $("facts-dots").querySelectorAll("i").forEach((d) => {
    d.addEventListener("click", () => { state.factIdx = +d.dataset.idx; renderFact(); resetFactTimer(); });
  });
}

let factTimer = null;
function startFactTimer() { factTimer = setInterval(() => { state.factIdx = (state.factIdx + 1) % FACTS.length; renderFact(); }, 6500); }
function resetFactTimer() { clearInterval(factTimer); startFactTimer(); }

/* ================ MODAL ================ */
let currentModalId = null, lastFocused = null;

function openModal(id) {
  const isl = ISLANDS.find((i) => i.id === id);
  if (!isl) return;
  currentModalId = id;
  lastFocused = document.activeElement;
  const g = GROUPS[isl.group];

  const modal = $("island-modal");
  modal.querySelector(".modal-card").style.setProperty("--gc", g.gradient);
  $("modal-group").textContent = isl.group;
  $("modal-group").style.background = g.gradient;
  $("modal-title").textContent = isl.name;
  $("modal-location").textContent = isl.location;
  $("modal-img").style.backgroundImage = `url('${isl.image}')`;
  $("modal-tags").innerHTML = isl.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("");

  $("tab-overview").innerHTML = `<p>${escapeHtml(isl.overview)}</p>`;
  $("tab-wildlife").innerHTML = `<h4>Wildlife &amp; ecology</h4><ul>${isl.wildlife.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}</ul>`;
  $("tab-culture").innerHTML = `<p>${escapeHtml(isl.culture)}</p>`;
  $("tab-travel").innerHTML = `
    <h4>Getting there</h4><p>${escapeHtml(isl.travel.how)}</p>
    <h4>Where to stay</h4><p>${escapeHtml(isl.travel.stay)}</p>
    <h4>Traveller tips</h4><p>${escapeHtml(isl.travel.tips)}</p>
    <h4>Best time to visit</h4>
    <div class="climate-row">
      <div class="climate-card"><span class="ccicon">☀️</span><b>Peak</b><small>${escapeHtml(isl.bestTime)}</small></div>
      <div class="climate-card"><span class="ccicon">🌤️</span><b>Area</b><small>${escapeHtml(isl.area)}</small></div>
      <div class="climate-card"><span class="ccicon">📍</span><b>Group</b><small>${escapeHtml(isl.group)}</small></div>
    </div>`;

  selectTab("overview");
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();

  flyTo(id);
}

function closeModal() {
  $("island-modal").hidden = true;
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

function selectTab(name) {
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
  ["overview", "wildlife", "culture", "travel"].forEach((t) => {
    $("tab-" + t).hidden = t !== name;
  });
}

/* ================ THEME ================ */
function setupTheme() {
  const btn = $("theme-toggle");
  if (!btn) return;
  const sync = () => { btn.textContent = document.body.classList.contains("light-theme") ? "🌞" : "🌙"; };
  btn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    try {
      const store = JSON.parse(localStorage.getItem("iie_storage") || "{}");
      store.theme = isLight ? "light" : "dark";
      localStorage.setItem("iie_storage", JSON.stringify(store));
    } catch {}
    sync();
    if (mapInstance) mapInstance.invalidateSize();
  });
  sync();
}

/* ================ REVEAL ================ */
function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll(".group-card, .iti-card, .section-heading, .map-wrap, .quiz-panel, .fact-card").forEach((el) => {
    REDUCED ? el.classList.add("in") : io.observe(el);
  });
}

/* ================ INIT ================ */
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();

  // Hero count-up
  document.querySelectorAll("[data-count]").forEach((el) => countUp(el, +el.dataset.count));

  initMap();

  renderGrid();
  renderPickerOptions();
  renderCompare();
  renderItineraries();
  renderQuiz();
  renderFact();
  startFactTimer();
  setupReveal();

  // Filters
  document.querySelectorAll(".chip").forEach((c) => {
    c.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
      state.group = c.dataset.group;
      renderGrid();
    });
  });

  // Search
  let searchTimer;
  $("islands-search").addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { state.query = e.target.value; renderGrid(); }, 180);
  });

  // Clear filters
  $("islands-clear-filters").addEventListener("click", () => {
    state.group = "all";
    state.query = "";
    $("islands-search").value = "";
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.dataset.group === "all"));
    renderGrid();
  });

  // Compare picker
  $("picker-a").addEventListener("change", (e) => { state.pickA = e.target.value; renderCompare(); });
  $("picker-b").addEventListener("change", (e) => { state.pickB = e.target.value; renderCompare(); });
  $("compare-open")?.addEventListener("click", () => $("compare-tool").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" }));

  // Modal
  $("island-modal").addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => selectTab(t.dataset.tab)));
  addEventListener("keydown", (e) => {
    if ($("island-modal").hidden) return;
    if (e.key === "Escape") closeModal();
  });

  // Facts nav
  document.querySelector(".facts-nav.prev")?.addEventListener("click", () => {
    state.factIdx = (state.factIdx - 1 + FACTS.length) % FACTS.length;
    renderFact(); resetFactTimer();
  });
  document.querySelector(".facts-nav.next")?.addEventListener("click", () => {
    state.factIdx = (state.factIdx + 1) % FACTS.length;
    renderFact(); resetFactTimer();
  });

  // Back to top
  const topBtn = $("btn-top");
  addEventListener("scroll", () => topBtn.classList.toggle("show", scrollY > 600), { passive: true });
  topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }));

  // Leaflet custom marker style
  const markerStyle = document.createElement("style");
  markerStyle.textContent = `
    .custom-marker { background: none; border: 0; }
    .marker-pin {
      display: grid; place-items: center;
      width: 36px; height: 36px; border-radius: 50%;
      font-size: 16px;
      border: 3px solid #fff;
      box-shadow: 0 6px 16px rgba(0,0,0,0.45);
      transition: transform 0.25s;
    }
    .leaflet-marker-icon:hover .marker-pin { transform: scale(1.2) translateY(-4px); }`;
  document.head.appendChild(markerStyle);
});