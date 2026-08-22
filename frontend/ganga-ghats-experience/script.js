// ---------- Ghats Data ----------
const allGhats = [
  {
    id: "dashashwamedh",
    name: "Dashashwamedh Ghat",
    icon: "🪔",
    location: "Varanasi",
    description: "The most iconic ghat in Varanasi, famous for the grand evening Ganga Aarti that draws thousands of devotees and visitors every single day.",
    history: "According to legend, this ghat marks the spot where Lord Brahma performed a ten-horse sacrifice to welcome Lord Shiva to the sacred city. The current stone structure was rebuilt in the 18th century under royal patronage, and it sits close to the Kashi Vishwanath Temple.",
    experience: "Every evening at sunset, a synchronised ritual unfolds — priests standing on raised platforms wave large flaming lamps in rhythmic patterns, accompanied by chanting and devotional music, while crowds gather on the steps and in boats on the river to witness the spectacle.",
    timing: "Evening Aarti begins around sunset and continues for roughly 45 minutes — best experienced from a boat on the river."
  },
  {
    id: "assi",
    name: "Assi Ghat",
    icon: "🌅",
    location: "Varanasi",
    description: "The southernmost of Varanasi's major ghats, best known as the finest spot to witness sunrise over the Ganga and the lively morning cultural gathering held here.",
    history: "Assi Ghat sits at the confluence of the Assi stream and the Ganga, a meeting point considered sacred in Hindu tradition. It has long been associated with scholarly and spiritual life, given its proximity to Banaras Hindu University.",
    experience: "At dawn, the ghat comes alive with a morning cultural programme featuring yoga sessions, devotional music, and a smaller sunrise Aarti — a calmer, more reflective counterpart to the famous evening ceremony downstream.",
    timing: "Best visited around sunrise, typically between 5:00–6:00 AM depending on the season.",
    detailedPage: "../assi-ghat/index.html"
  },
  {
    id: "manikarnika",
    name: "Manikarnika Ghat",
    icon: "🔥",
    location: "Varanasi",
    description: "One of the oldest and most sacred cremation grounds in India, where funeral rites have been continuously performed for centuries, symbolising the Hindu belief in liberation from the cycle of rebirth.",
    history: "Manikarnika is regarded in Hindu tradition as a site connected to both Lord Vishnu and Lord Shiva, and cremation here is believed to grant moksha, or spiritual liberation. The sacred fires at this ghat are said to have burned continuously for generations.",
    experience: "Visitors are asked to observe this ghat with quiet respect and discretion — photography is discouraged here. Many choose to view it from a passing boat, taking in its solemn atmosphere as part of a broader journey along the riverfront.",
    timing: "Active throughout the day and night; visitors are encouraged to observe respectfully from a distance.",
    detailedPage: "../manikarnika-ghat/index.html"
  },
  {
    id: "sangam",
    name: "Prayagraj Sangam",
    icon: "🌊",
    location: "Prayagraj",
    description: "The sacred confluence where the Ganga, Yamuna, and the mythical, invisible Saraswati river are believed to meet — one of the most revered pilgrimage sites in India.",
    history: "The Sangam has been a centre of pilgrimage for millennia and is the site of the Kumbh Mela, one of the largest peaceful religious gatherings in the world, drawing tens of millions of pilgrims once every twelve years.",
    experience: "Pilgrims take boat rides out to the exact point of confluence to bathe in the mingled waters, believed to cleanse sins and bring spiritual merit, while priests perform rituals along the riverbanks throughout the day.",
    timing: "Open year-round, with the atmosphere most vibrant during the Magh Mela and Kumbh Mela festival periods."
  },
  {
    id: "rajendra-prasad",
    name: "Rajendra Prasad Ghat",
    icon: "🇮🇳",
    location: "Varanasi",
    description: "A prominent ghat serving as a bridge between Varanasi's ancient riverfront traditions and India's modern national history, named after the country's first President.",
    history: "Originally part of Dashashwamedh Ghat and known as Ghoda Ghat, it was renamed in 1979 in honor of Dr. Rajendra Prasad, India's first President, who used to stay here during his visits.",
    experience: "Today, it hosts vibrant cultural performances, light programs, and serves as a major boarding point for boating, offering scenic views adjacent to Dashashwamedh Ghat.",
    timing: "Best visited in the evening between 6:00–8:00 PM to see the cultural activities and neighboring Aarti lights.",
    detailedPage: "../rajendra-prasad-ghat/index.html"
  },
  {
    id: "dandi",
    name: "Dandi Ghat",
    icon: "🧘‍♂️",
    location: "Varanasi",
    description: "A tranquil riverfront dedicated to the Dandi Sannyasis, embodying Advaita Vedanta philosophy, monastic austerity, and timeless stone ashram architecture.",
    history: "Rebuilt in 1911 by Lalooji Agarwal for the Dandi sannyasi order of Dashanami Sampradaya (founded by Adi Shankaracharya), Dandi Ghat remains a secluded sanctuary for monk meditation, scriptural study, and Dandi Vinayaka worship.",
    experience: "Witness the quiet dignity of saffron-clad ascetics carrying sacred wooden staves (danda), performing sunrise riverfront meditation, Upanishadic recitations, and peaceful Ganga ablutions.",
    timing: "Best visited during quiet early morning hours (5:30–8:00 AM) for a serene spiritual atmosphere.",
    detailedPage: "../dandi-ghat/index.html"
  },
  {
    id: "daraganj",
    name: "Daraganj Ghat",
    icon: "🌊",
    location: "Prayagraj",
    description: "One of Prayagraj's oldest riverfronts, famous for Prince Dara Shikoh's legacy, the sacred Beni Madhav and Nag Vasuki temples, and modern Hindi literary history.",
    history: "Named after Prince Dara Shikoh who studied Upanishadic philosophy here, Daraganj is home to Veni Madhava (presiding deity of Prayag) and was the riverside residence of legendary poet Suryakant Tripathi 'Nirala'.",
    experience: "Explore stone temple spires, historic boatmen cultures, winter Siberian gull feeding, and Kalpwasi tent encampments during Magh Mela near Triveni Sangam.",
    timing: "Best visited at dawn for morning river views or during Nag Panchami and Magh Mela for vibrant traditions.",
    detailedPage: "../daraganj-ghat/index.html"
  },
  {
    id: "munshi",
    name: "Munshi Ghat",
    icon: "🏛️",
    location: "Varanasi",
    description: "A majestic palatial riverfront famous for its 1912 stone architecture, Greco-Roman columns, connection to Darbhanga Palace, and breathtaking Dev Deepawali light displays.",
    history: "Constructed in 1912 by Sridhara Narayana Munshi (Finance Minister of Nagpur State), the northern portion was acquired in 1915 by the Royal Family of Darbhanga to build their grand riverfront palace.",
    experience: "Admire classical stone colonnades, carved jharokhas, sunrise boating panoramas, and thousands of glowing lamps during Dev Deepawali adjacent to Dashashwamedh Ghat.",
    timing: "Best visited at sunrise for golden palace reflections or at dusk during Ganga Aarti and Dev Deepawali.",
    detailedPage: "../munshi-ghat/index.html"
  },
  {
    id: "causatthi",
    name: "Causatthi Ghat",
    icon: "🌺",
    location: "Varanasi",
    description: "A sacred Shakta riverfront dedicated to the sixty-four Yoginis, famous for its steep cliffside Chausath Yogini Temple, Puranic legend of King Divodasa, and Navratri festivals.",
    history: "Associated with the Skanda Purana legend where Shiva sent the 64 Yoginis to Kashi, the ghat was rebuilt in 1670 CE by Raja Digpatia of Bengal, becoming a sanctuary for Bengali pilgrims and saint Swami Bhaskarananda Saraswati.",
    experience: "Climb the extraordinarily steep sandstone steps to the cliffside Chausath Yogini Temple, witness Navratri Badi Gaura rites, and explore 17th-century Bengali ashram architecture.",
    timing: "Best visited during Chaitra and Ashwin Navratri for vibrant Shakti rites or early morning for quiet Ganga dips.",
    detailedPage: "../causatthi-ghat/index.html"
  },
  {
    id: "naya",
    name: "Naya Ghat",
    icon: "🧱",
    location: "Varanasi",
    description: "A spacious riverfront documenting Varanasi's modern architectural evolution from 18th-century Phota Ghat into a active boat docking and bathing hub.",
    history: "Recorded in 18th-century surveys as Phota Ghat, it was systematically rebuilt in the 19th century with reinforced sandstone terraces, taking the name Naya Ghat (New Ghat) while preserving traditional bathing and temple rites.",
    experience: "Walk broad stone platforms, observe morning Surya Arghya rituals, watch traditional boat repair along the lower steps, and take ferry rides near Ram Ghat.",
    timing: "Best visited at dawn for morning river baths or during Chhath Puja for vibrant festival crowds.",
    detailedPage: "../naya-ghat/index.html"
  }
];

// ---------- DOM References ----------
const ghatScene = document.getElementById("ghatScene");
const dayNightToggle = document.getElementById("dayNightToggle");
const ghatGrid = document.getElementById("ghatGrid");

const ghatModalOverlay = document.getElementById("ghatModalOverlay");
const ghatModalClose = document.getElementById("ghatModalClose");
const modalGhatIcon = document.getElementById("modalGhatIcon");
const modalGhatLocation = document.getElementById("modalGhatLocation");
const modalGhatTitle = document.getElementById("modalGhatTitle");
const modalGhatDesc = document.getElementById("modalGhatDesc");
const modalGhatHistory = document.getElementById("modalGhatHistory");
const modalGhatExperience = document.getElementById("modalGhatExperience");
const modalGhatTiming = document.getElementById("modalGhatTiming");

let lastFocusedElement = null;

// ---------- Day / Night Toggle ----------
dayNightToggle.addEventListener("click", (e) => {
  const btn = e.target.closest(".toggle-option");
  if (!btn) return;

  dayNightToggle.querySelectorAll(".toggle-option").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const mode = btn.dataset.mode;
  if (mode === "night") {
    ghatScene.classList.add("night");
  } else {
    ghatScene.classList.remove("night");
  }
});

// ---------- Build Ghat Cards ----------
function buildGhatGrid() {
  allGhats.forEach(ghat => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "ghat-card";
    card.setAttribute("aria-label", `View details about ${ghat.name}`);
    card.innerHTML = `
      <span class="ghat-card-icon">${ghat.icon}</span>
      <span class="ghat-card-location">${ghat.location}</span>
      <h3 class="ghat-card-name">${ghat.name}</h3>
      <p class="ghat-card-desc">${ghat.description}</p>
      <span class="ghat-card-cta">Tap to explore &rarr;</span>
    `;
    card.addEventListener("click", () => openModal(ghat, card));
    ghatGrid.appendChild(card);
  });
}

// ---------- Modal ----------
function openModal(ghat, triggerEl) {
  lastFocusedElement = triggerEl;

  modalGhatIcon.textContent = ghat.icon;
  modalGhatLocation.textContent = ghat.location;
  modalGhatTitle.textContent = ghat.name;
  modalGhatDesc.textContent = ghat.description;
  modalGhatHistory.textContent = ghat.history;
  modalGhatExperience.textContent = ghat.experience;
  modalGhatTiming.textContent = ghat.timing;

  const linkEl = document.getElementById("modalGhatLink");
  const actionContainer = document.getElementById("modalGhatActionContainer");
  if (ghat.detailedPage) {
    linkEl.href = ghat.detailedPage;
    actionContainer.style.display = "block";
  } else {
    actionContainer.style.display = "none";
  }

  ghatModalOverlay.classList.add("active");
  ghatModalClose.focus();
}

function closeModal() {
  ghatModalOverlay.classList.remove("active");
  if (lastFocusedElement) lastFocusedElement.focus();
}

ghatModalClose.addEventListener("click", closeModal);
ghatModalOverlay.addEventListener("click", (e) => {
  if (e.target === ghatModalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && ghatModalOverlay.classList.contains("active")) closeModal();
});

// ---------- Init ----------
buildGhatGrid();