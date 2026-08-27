/**
 * national-wrestling-championships.js
 * National Wrestling Championships — Interactive archive of India's wrestling legacy.
 * Dataset, helpers, and browser engine. Pure vanilla JavaScript with ESM exports
 * for Vitest unit testing.
 */

// ---------------------------------------------------------------------------
// Wrestling Styles
// ---------------------------------------------------------------------------

export const wrestlingStyles = [
  {
    id: "freestyle",
    name: "Freestyle Wrestling",
    icon: "\u{1F93C}",
    origin: "Codified in the late 19th century and contested at the modern Olympic Games since 1904 (for men); open to women since 2004.",
    rules: [
      "Athletes may attack the opponent's entire body, including the legs.",
      "Victory comes by pin (fall), technical superiority, or on points.",
      "Bouts are decided across periods with aggressive pace rewarded."
    ],
    indiaNote: "Freestyle is India's strongest international discipline and the style in which all eight of India's Olympic wrestling medals have been won."
  },
  {
    id: "greco-roman",
    name: "Greco-Roman Wrestling",
    icon: "\u{1F3EF}",
    origin: "Revived as an amateur discipline in 19th-century Europe and part of the first modern Olympic Games in 1896.",
    rules: [
      "All holds must target the upper body; attacking the legs is not allowed.",
      "Emphasis on throws, body locks, and lifts such as the suplex.",
      "Par terre (ground) positioning produces many decisive turns."
    ],
    indiaNote: "Indian Greco-Roman wrestlers compete regularly at the Asian and World level, and the style features alongside freestyle at the Senior National Championships."
  },
  {
    id: "kushti",
    name: "Kushti (Pehlwani)",
    icon: "\u{1F3D6}\uFE0F",
    origin: "Traditional Indian wrestling practised for centuries in earthen pits called akharas, blending indigenous malla-yuddha roots with Persian influence.",
    rules: [
      "Bouts take place on soft mud or clay (the houd) prepared with water and oil.",
      "A bout is won by pressing the opponent's shoulders to the ground.",
      "Wrestlers (pehlwans) follow a disciplined regimen of diet, massage, and training."
    ],
    indiaNote: "Kushti remains the cultural heartbeat of Indian wrestling, and most modern champions began their journeys in village and city akharas before moving to the mat."
  },
  {
    id: "malla-yuddha",
    name: "Malla-yuddha",
    icon: "\u{1F4DC}",
    origin: "Ancient Indian combat wrestling referenced in the Mahabharata and other classical texts, dating back well over two thousand years.",
    rules: [
      "Historic forms ranged from sport grappling to battlefield combat.",
      "Epics describe legendary bouts such as Bhima's duel with Jarasandha.",
      "Its techniques survive in folk traditions and influenced later kushti."
    ],
    indiaNote: "Malla-yuddha gives Indian wrestling one of the oldest documented lineages of any combat sport in the world."
  }
];

// ---------------------------------------------------------------------------
// Weight Categories (UWW / Olympic Games)
// ---------------------------------------------------------------------------

export const weightCategories = {
  note: "At the Olympic Games, six weight categories are contested in each discipline. United World Wrestling (UWW) sanctions additional categories at the World and Continental Championships.",
  source: "United World Wrestling \u2014 Olympic weight categories (Paris 2024).",
  divisions: [
    {
      id: "mens-freestyle",
      name: "Men's Freestyle",
      gender: "Men",
      style: "Freestyle",
      weights: [57, 65, 74, 86, 97, 125],
      unit: "kg"
    },
    {
      id: "womens-freestyle",
      name: "Women's Freestyle",
      gender: "Women",
      style: "Freestyle",
      weights: [50, 53, 57, 62, 68, 76],
      unit: "kg"
    },
    {
      id: "greco-roman",
      name: "Greco-Roman",
      gender: "Men",
      style: "Greco-Roman",
      weights: [60, 67, 77, 87, 97, 130],
      unit: "kg"
    }
  ]
};

// ---------------------------------------------------------------------------
// Major Champions
// ---------------------------------------------------------------------------

export const champions = [
  {
    id: "kd-jadhav",
    name: "Khashaba Dadasaheb Jadhav",
    shortName: "K. D. Jadhav",
    tags: ["olympic-medallists"],
    style: "Freestyle",
    category: "Bantamweight",
    era: "1940s\u20131950s",
    headline: "Independent India's first individual Olympic medallist.",
    achievements: [
      "Won bronze in men's freestyle bantamweight at the Helsinki 1952 Olympics.",
      "First athlete from independent India to win an individual Olympic medal.",
      "Honoured when New Delhi's CWG wrestling venue was renamed K. D. Jadhav Stadium in 2010."
    ]
  },
  {
    id: "satpal-singh",
    name: "Satpal Singh",
    shortName: "Satpal",
    tags: ["coaching-legends"],
    style: "Freestyle",
    category: "Heavyweight",
    era: "1970s\u20131980s",
    headline: "Asian Games champion who became India's most celebrated wrestling guru.",
    achievements: [
      "Won freestyle heavyweight gold at the 1982 Asian Games in New Delhi.",
      "Completed an Asian Games medal set with bronze (Tehran 1974) and silver (Bangkok 1978).",
      "Coached Olympic medallists Sushil Kumar and Ravi Kumar Dahiya at Delhi's Chhatrasal Stadium.",
      "Decorated with the Arjuna Award (1974), Padma Shri (1983), and Dronacharya Award (2009)."
    ]
  },
  {
    id: "sushil-kumar",
    name: "Sushil Kumar",
    shortName: "Sushil",
    tags: ["olympic-medallists", "world-champions"],
    style: "Freestyle",
    category: "66 kg",
    era: "2000s\u20132010s",
    headline: "India's only wrestler with two individual Olympic medals.",
    achievements: [
      "Won bronze at the Beijing 2008 Olympics \u2014 India's first wrestling medal in 56 years.",
      "Improved to silver at the London 2012 Olympics in the 66 kg event.",
      "Became the first Indian world wrestling champion with 66 kg gold at Moscow 2010.",
      "Trained at Delhi's Chhatrasal Stadium under Satpal Singh."
    ]
  },
  {
    id: "yogeshwar-dutt",
    name: "Yogeshwar Dutt",
    shortName: "Yogeshwar",
    tags: ["olympic-medallists"],
    style: "Freestyle",
    category: "60\u201365 kg",
    era: "2000s\u20132010s",
    headline: "London 2012 bronze medallist and Asian Games champion.",
    achievements: [
      "Won bronze in men's freestyle 60 kg at the London 2012 Olympics.",
      "Claimed freestyle gold at the 2014 Asian Games in Incheon.",
      "A mainstay of India's golden generation trained at the Chhatrasal akhara."
    ]
  },
  {
    id: "geeta-phogat",
    name: "Geeta Phogat",
    shortName: "Geeta",
    tags: ["womens-wrestling"],
    style: "Women's Freestyle",
    category: "55 kg",
    era: "2000s\u20132010s",
    headline: "Pioneer of women's wrestling in India.",
    achievements: [
      "First Indian woman wrestler to win a Commonwealth Games gold (Delhi 2010, 55 kg).",
      "First Indian woman wrestler to qualify for the Olympic Games (London 2012)."
    ]
  },
  {
    id: "babita-kumari",
    name: "Babita Kumari",
    shortName: "Babita",
    tags: ["womens-wrestling"],
    style: "Women's Freestyle",
    category: "53\u201355 kg",
    era: "2010s",
    headline: "Two-time Commonwealth Games champion.",
    achievements: [
      "Won Commonwealth Games gold at Glasgow 2014.",
      "Defended her Commonwealth crown at Gold Coast 2018.",
      "Part of the Phogat family that transformed women's wrestling in Haryana and India."
    ]
  },
  {
    id: "sakshi-malik",
    name: "Sakshi Malik",
    shortName: "Sakshi",
    tags: ["olympic-medallists", "womens-wrestling"],
    style: "Women's Freestyle",
    category: "58 kg",
    era: "2010s",
    headline: "First Indian woman wrestler to win an Olympic medal.",
    achievements: [
      "Won bronze in women's freestyle 58 kg at the Rio 2016 Olympics.",
      "Famously rallied from behind in her bronze-medal bout to seal the medal on the mat."
    ]
  },
  {
    id: "bajrang-punia",
    name: "Bajrang Punia",
    shortName: "Bajrang",
    tags: ["olympic-medallists", "world-champions"],
    style: "Freestyle",
    category: "65 kg",
    era: "2010s\u20132020s",
    headline: "World champion and Tokyo 2020 bronze medallist.",
    achievements: [
      "Won 65 kg gold at the 2019 World Wrestling Championships in Nur-Sultan.",
      "Won bronze in men's freestyle 65 kg at the Tokyo 2020 Olympics.",
      "Won Asian Games gold in the 65 kg class at Jakarta 2018."
    ]
  },
  {
    id: "ravi-dahiya",
    name: "Ravi Kumar Dahiya",
    shortName: "Ravi",
    tags: ["olympic-medallists", "world-champions"],
    style: "Freestyle",
    category: "57 kg",
    era: "2010s\u20132020s",
    headline: "Tokyo 2020 silver medallist and reigning world champion of his era.",
    achievements: [
      "Won silver in men's freestyle 57 kg at the Tokyo 2020 Olympics.",
      "Crowned 57 kg world champion at the 2021 World Championships in Oslo.",
      "Another product of Delhi's Chhatrasal wrestling stable."
    ]
  },
  {
    id: "vinesh-phogat",
    name: "Vinesh Phogat",
    shortName: "Vinesh",
    tags: ["womens-wrestling"],
    style: "Women's Freestyle",
    category: "50\u201353 kg",
    era: "2010s\u20132020s",
    headline: "First Indian woman wrestler to win an Asian Games gold.",
    achievements: [
      "Won women's wrestling gold at the 2018 Asian Games in Jakarta.",
      "A multi-time Commonwealth Games champion across her career."
    ]
  },
  {
    id: "antim-panghal",
    name: "Antim Panghal",
    shortName: "Antim",
    tags: ["womens-wrestling", "world-champions"],
    style: "Women's Freestyle",
    category: "53 kg",
    era: "2020s",
    headline: "Two-time U20 world champion who broke through on the senior stage.",
    achievements: [
      "Won back-to-back U20 World Championship titles (2022 and 2023) at 53 kg.",
      "Claimed a senior World Championship bronze at Belgrade 2023 in the 53 kg class."
    ]
  },
  {
    id: "aman-sehrawat",
    name: "Aman Sehrawat",
    shortName: "Aman",
    tags: ["olympic-medallists", "world-champions"],
    style: "Freestyle",
    category: "57 kg",
    era: "2020s",
    headline: "Youngest Indian ever to win an Olympic medal.",
    achievements: [
      "Won bronze in men's freestyle 57 kg at the Paris 2024 Olympics \u2014 India's eighth Olympic wrestling medal.",
      "Became the youngest Indian Olympic medallist at 21 years and 24 days.",
      "First Indian wrestler to win an U23 World Championship title (2022).",
      "Trained at the Chhatrasal Stadium, following the path of Sushil Kumar and Ravi Dahiya."
    ]
  }
];

// ---------------------------------------------------------------------------
// Historic Venues
// ---------------------------------------------------------------------------

export const historicVenues = [
  {
    id: "kd-jadhav-stadium",
    name: "K. D. Jadhav Indoor Stadium",
    city: "New Delhi",
    icon: "\u{1F3DF}\uFE0F",
    capacity: "6,000 seats",
    facts: [
      "Built within the Indira Gandhi Arena complex, India's largest indoor sports facility.",
      "Hosted the wrestling events of the 2010 Commonwealth Games.",
      "Renamed in July 2010 in honour of Olympic bronze medallist K. D. Jadhav.",
      "Hosted the Asian Wrestling Championships in 2010 and again in February 2020."
    ],
    significance: "The modern showpiece of Indian wrestling, staging continental championships and national selection events under one roof."
  },
  {
    id: "chhatrasal-stadium",
    name: "Chhatrasal Stadium",
    city: "Delhi",
    icon: "\u{1F94B}",
    capacity: "Historic akhara complex",
    facts: [
      "Home of the legendary Guru Hanuman akhara tradition and Satpal Singh's academy.",
      "Produced Olympic medallists Sushil Kumar, Yogeshwar Dutt, Ravi Kumar Dahiya, Bajrang Punia, and Aman Sehrawat.",
      "Wrestlers still train before dawn in its earthen pits alongside modern mats."
    ],
    significance: "The most productive wrestling nursery in Indian history, linking the akhara tradition to Olympic success."
  },
  {
    id: "khasbaug-maidan",
    name: "Rajarshi Shahu Khasbaug Kusti Maidan",
    city: "Kolhapur, Maharashtra",
    icon: "\u{1F3D7}\uFE0F",
    capacity: "Around 30,000 spectators",
    facts: [
      "Constructed during the reign of Rajarshi Shahu Maharaj of Kolhapur in the early 20th century.",
      "Among the largest purpose-built traditional wrestling arenas in India.",
      "Circular seating surrounds the central mud ring (houd) so every spectator can view the bout.",
      "Recognised as a heritage structure and a symbol of social harmony in Kolhapur."
    ],
    significance: "The grand temple of kushti, built by a maharaja who opened wrestling to athletes of every caste and creed."
  }
];

// ---------------------------------------------------------------------------
// Olympic Connections
// ---------------------------------------------------------------------------

export const olympicMedals = [
  { games: "Helsinki 1952", wrestler: "K. D. Jadhav", event: "Men's freestyle bantamweight", medal: "Bronze" },
  { games: "Beijing 2008", wrestler: "Sushil Kumar", event: "Men's freestyle 66 kg", medal: "Bronze" },
  { games: "London 2012", wrestler: "Sushil Kumar", event: "Men's freestyle 66 kg", medal: "Silver" },
  { games: "London 2012", wrestler: "Yogeshwar Dutt", event: "Men's freestyle 60 kg", medal: "Bronze" },
  { games: "Rio 2016", wrestler: "Sakshi Malik", event: "Women's freestyle 58 kg", medal: "Bronze" },
  { games: "Tokyo 2020", wrestler: "Ravi Kumar Dahiya", event: "Men's freestyle 57 kg", medal: "Silver" },
  { games: "Tokyo 2020", wrestler: "Bajrang Punia", event: "Men's freestyle 65 kg", medal: "Bronze" },
  { games: "Paris 2024", wrestler: "Aman Sehrawat", event: "Men's freestyle 57 kg", medal: "Bronze" }
];

// ---------------------------------------------------------------------------
// Wrestler Timeline
// ---------------------------------------------------------------------------

export const timeline = [
  {
    sortKey: 1,
    label: "Ancient Era",
    title: "Malla-yuddha and the Akhara Tradition",
    description: "Wrestling is woven into India's oldest stories. The epics celebrate legendary grapplers such as Bhima and Hanuman, and village akharas kept the tradition alive for millennia.",
    person: "Bhima, Hanuman and generations of pehlwans"
  },
  {
    sortKey: 1900,
    label: "Early 1900s",
    title: "Royal Patronage of Kushti",
    description: "Rajarshi Shahu Maharaj of Kolhapur builds the Khasbaug Kusti Maidan, giving traditional wrestling a grand permanent home and opening the sport to wrestlers of every background.",
    person: "Rajarshi Shahu Maharaj"
  },
  {
    sortKey: 1952,
    label: "1952",
    title: "K. D. Jadhav Wins Bronze at Helsinki",
    description: "Khashaba Dadasaheb Jadhav claims freestyle bantamweight bronze at the Helsinki Olympics, becoming the first athlete from independent India to win an individual Olympic medal.",
    person: "K. D. Jadhav"
  },
  {
    sortKey: 1967,
    label: "1967",
    title: "Wrestling Federation of India Constituted",
    description: "The Wrestling Federation of India (WFI) is constituted on 27 January 1967, unifying the sport's governance and organising annual Senior, Junior, and Sub-Junior National Championships under UWW rules.",
    person: "Wrestling Federation of India"
  },
  {
    sortKey: 1982,
    label: "1982",
    title: "Satpal Singh Golden in New Delhi",
    description: "Satpal Singh wins freestyle heavyweight gold at the 1982 Asian Games in front of a home crowd, capping an Asian Games set of bronze, silver, and gold.",
    person: "Satpal Singh"
  },
  {
    sortKey: 2008,
    label: "2008",
    title: "Sushil Kumar Ends the Long Wait",
    description: "Sushil Kumar wins 66 kg bronze at the Beijing Olympics, securing India's first Olympic wrestling medal since K. D. Jadhav's feat 56 years earlier.",
    person: "Sushil Kumar"
  },
  {
    sortKey: 2010,
    label: "2010",
    title: "World Gold and a Women's Breakthrough",
    description: "Sushil Kumar becomes India's first world wrestling champion in Moscow while Geeta Phogat wins India's first women's Commonwealth wrestling gold in Delhi, where the new K. D. Jadhav Stadium hosts the CWG tournament.",
    person: "Sushil Kumar & Geeta Phogat"
  },
  {
    sortKey: 2012,
    label: "2012",
    title: "London Double on the Mat",
    description: "India enjoys its richest Olympic wrestling haul yet as Sushil Kumar takes silver and Yogeshwar Dutt bronze at the London Games.",
    person: "Sushil Kumar & Yogeshwar Dutt"
  },
  {
    sortKey: 2016,
    label: "2016",
    title: "Sakshi Malik Makes History in Rio",
    description: "Sakshi Malik battles back in her bronze-medal bout to become the first Indian woman wrestler to win an Olympic medal.",
    person: "Sakshi Malik"
  },
  {
    sortKey: 2019,
    label: "2019",
    title: "Bajrang Punia Rules the World",
    description: "Bajrang Punia wins 65 kg gold at the World Championships in Nur-Sultan, confirming his place as the world's leading light welterweight of the period.",
    person: "Bajrang Punia"
  },
  {
    sortKey: 2021,
    label: "2021",
    title: "Tokyo Silver and World Glory",
    description: "Ravi Kumar Dahiya storms to 57 kg silver at the Tokyo Olympics and follows up with world championship gold in Oslo, while Bajrang Punia adds Tokyo bronze at 65 kg.",
    person: "Ravi Kumar Dahiya & Bajrang Punia"
  },
  {
    sortKey: 2023,
    label: "2023",
    title: "Antim Panghal Breaks Through",
    description: "Two-time U20 world champion Antim Panghal adds a senior World Championship bronze at Belgrade, signalling the arrival of India's next generation of women wrestlers.",
    person: "Antim Panghal"
  },
  {
    sortKey: 2024,
    label: "2024",
    title: "Aman Sehrawat Shines in Paris",
    description: "Aman Sehrawat wins 57 kg bronze at the Paris Olympics, becoming the youngest Indian Olympic medallist ever and delivering India's eighth Olympic wrestling medal.",
    person: "Aman Sehrawat"
  }
];

// ---------------------------------------------------------------------------
// Sources / References
// ---------------------------------------------------------------------------

export const referenceSources = [
  {
    name: "United World Wrestling (UWW)",
    url: "https://uww.org/",
    note: "International federation \u2014 rules, weight categories, and championship records."
  },
  {
    name: "Olympics.com \u2014 International Olympic Committee",
    url: "https://www.olympics.com/",
    note: "Official Olympic athlete profiles, results, and Paris 2024 wrestling coverage."
  },
  {
    name: "Wrestling Federation of India \u2014 Constitution",
    url: "https://wrestlingfederationofindia.org/",
    note: "National federation charter covering the annual Senior, Junior, and Sub-Junior National Championships."
  },
  {
    name: "Olympedia \u2014 Satpal Singh profile",
    url: "https://www.olympedia.org/athletes/58719",
    note: "Documented competitive record and honours of the 1982 Asian Games champion."
  },
  {
    name: "Indira Gandhi Arena / K. D. Jadhav Indoor Hall",
    url: "https://en.wikipedia.org/wiki/Indira_Gandhi_Arena",
    note: "Venue history including the 2010 Commonwealth Games wrestling events and stadium naming."
  },
  {
    name: "Rajarshi Shahu Khasbag Wrestling Stadium, Kolhapur",
    url: "https://en.wikipedia.org/wiki/Khasbag_Wrestling_Stadium",
    note: "Heritage traditional wrestling arena built during the reign of Shahu Maharaj."
  }
];

// ---------------------------------------------------------------------------
// Helper Functions (exported for testing)
// ---------------------------------------------------------------------------

/**
 * Get a wrestling style record by ID.
 */
export function getStyleById(id, list = wrestlingStyles) {
  if (!id || !Array.isArray(list)) return undefined;
  return list.find(style => style.id === id);
}

/**
 * Get a weight division record by ID.
 */
export function getWeightDivisionById(id, list = weightCategories.divisions) {
  if (!id || !Array.isArray(list)) return undefined;
  return list.find(division => division.id === id);
}

/**
 * Get a champion record by ID.
 */
export function getChampionById(id, list = champions) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = String(id).trim().toLowerCase();
  return list.find(champ =>
    champ.id.toLowerCase() === target ||
    champ.name.toLowerCase() === target ||
    champ.shortName.toLowerCase() === target
  );
}

/**
 * Filter champions by free-text query and/or tag.
 */
export function filterChampions(query = "", tag = "all", list = champions) {
  if (!Array.isArray(list)) return [];
  let result = list;

  if (tag && tag !== "all") {
    result = result.filter(champ => Array.isArray(champ.tags) && champ.tags.includes(tag));
  }

  const q = String(query).trim().toLowerCase();
  if (q) {
    result = result.filter(champ => {
      const haystack = [
        champ.name,
        champ.shortName,
        champ.style,
        champ.category,
        champ.headline,
        ...(Array.isArray(champ.achievements) ? champ.achievements : [])
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }

  return result;
}

/**
 * Return timeline milestones sorted chronologically by sortKey.
 */
export function getSortedTimeline(list = timeline) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => a.sortKey - b.sortKey);
}

/**
 * Get a single timeline milestone by its sortKey.
 */
export function getTimelineMilestone(sortKey, list = timeline) {
  const key = Number(sortKey);
  if (Number.isNaN(key)) return undefined;
  return list.find(milestone => milestone.sortKey === key);
}

/**
 * Summarise India's Olympic wrestling medals.
 */
export function summariseOlympicMedals(list = olympicMedals) {
  if (!Array.isArray(list)) return { total: 0, byMedal: {} };
  const byMedal = list.reduce((acc, entry) => {
    acc[entry.medal] = (acc[entry.medal] || 0) + 1;
    return acc;
  }, {});
  return { total: list.length, byMedal };
}

/* ==========================================================================
   BROWSER DOM & PAGE ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {

  document.addEventListener("DOMContentLoaded", () => {
    const sortedTimeline = getSortedTimeline();

    // --- Animated hero counters -------------------------------------------
    function animateCounter(el, target, suffix = "") {
      let current = 0;
      const step = Math.max(1, Math.floor(target / 50));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current.toLocaleString("en-IN") + suffix;
      }, 22);
    }

    document.querySelectorAll("[data-nwc-counter]").forEach(el => {
      const target = parseInt(el.dataset.nwcCounter, 10);
      if (!Number.isNaN(target)) {
        animateCounter(el, target, el.dataset.nwcSuffix || "");
      }
    });

    // --- Wrestling styles ---------------------------------------------------
    const stylesGrid = document.getElementById("nwc-styles-grid");
    if (stylesGrid) {
      wrestlingStyles.forEach(style => {
        const card = document.createElement("article");
        card.className = "nwc-style-card";
        card.innerHTML = `
          <div class="nwc-style-head">
            <span class="nwc-style-icon" aria-hidden="true">${style.icon}</span>
            <h3>${style.name}</h3>
          </div>
          <p class="nwc-style-origin">${style.origin}</p>
          <ul class="nwc-style-rules">
            ${style.rules.map(rule => `<li>${rule}</li>`).join("")}
          </ul>
          <p class="nwc-style-india"><strong>India connection:</strong> ${style.indiaNote}</p>
        `;
        stylesGrid.appendChild(card);
      });
    }

    // --- Weight categories --------------------------------------------------
    const weightsGrid = document.getElementById("nwc-weights-grid");
    if (weightsGrid) {
      weightCategories.divisions.forEach(division => {
        const card = document.createElement("article");
        card.className = "nwc-weight-card";
        card.innerHTML = `
          <h3>${division.name}</h3>
          <p class="nwc-weight-sub">${division.style} \u00b7 ${division.gender}'s events</p>
          <ul class="nwc-weight-chips" aria-label="${division.name} weight categories">
            ${division.weights.map(w => `<li class="nwc-weight-chip">${w} ${division.unit}</li>`).join("")}
          </ul>
        `;
        weightsGrid.appendChild(card);
      });
      const noteEl = document.getElementById("nwc-weights-note");
      if (noteEl) noteEl.textContent = weightCategories.note;
    }

    // --- Champions ----------------------------------------------------------
    const championsGrid = document.getElementById("nwc-champions-grid");
    const championSearch = document.getElementById("nwc-champion-search");
    const filterBar = document.getElementById("nwc-champion-filters");
    const emptyMsg = document.getElementById("nwc-champions-empty");
    const liveRegion = document.getElementById("nwc-live-region");

    function announce(message) {
      if (liveRegion) liveRegion.textContent = message;
    }

    function renderChampions() {
      if (!championsGrid) return;
      const activeBtn = filterBar ? filterBar.querySelector(".nwc-filter-btn[aria-pressed=\"true\"]") : null;
      const tag = activeBtn ? activeBtn.dataset.tag : "all";
      const query = championSearch ? championSearch.value : "";
      const filtered = filterChampions(query, tag);

      championsGrid.innerHTML = "";
      if (emptyMsg) emptyMsg.hidden = filtered.length > 0;

      filtered.forEach(champ => {
        const card = document.createElement("article");
        card.className = "nwc-champion-card";
        card.innerHTML = `
          <div class="nwc-champion-top">
            <span class="nwc-champion-avatar" aria-hidden="true">${champ.shortName.charAt(0)}</span>
            <div>
              <h3>${champ.name}</h3>
              <p class="nwc-champion-meta">${champ.style} \u00b7 ${champ.category} \u00b7 ${champ.era}</p>
            </div>
          </div>
          <p class="nwc-champion-headline">${champ.headline}</p>
          <button type="button" class="nwc-btn nwc-btn-outline" data-champion-id="${champ.id}">
            View achievements
          </button>
        `;
        championsGrid.appendChild(card);
      });

      announce(`${filtered.length} champion${filtered.length === 1 ? "" : "s"} found.`);
    }

    // Champion detail modal ----------------------------------------------------
    const modal = document.getElementById("nwc-champion-modal");
    const modalBody = document.getElementById("nwc-modal-body");
    const modalClose = document.getElementById("nwc-modal-close");
    let releaseFocusTrap = null;
    let lastFocusedElement = null;

    function openChampionModal(id) {
      const champ = getChampionById(id);
      if (!champ || !modal || !modalBody) return;

      lastFocusedElement = document.activeElement;
      modalBody.innerHTML = `
        <span class="nwc-modal-badge">${champ.style}</span>
        <h3 id="nwc-modal-title">${champ.name}</h3>
        <p class="nwc-champion-meta">${champ.category} \u00b7 ${champ.era}</p>
        <p class="nwc-champion-headline">${champ.headline}</p>
        <h4>Career Achievements</h4>
        <ul class="nwc-modal-list">
          ${champ.achievements.map(item => `<li>${item}</li>`).join("")}
        </ul>
      `;
      modal.hidden = false;
      document.body.classList.add("nwc-modal-open");

      if (typeof window.setupFocusTrap === "function") {
        releaseFocusTrap = window.setupFocusTrap(modal);
      }
      if (modalClose) modalClose.focus();
    }

    function closeChampionModal() {
      if (!modal || modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove("nwc-modal-open");
      if (typeof releaseFocusTrap === "function") {
        releaseFocusTrap();
        releaseFocusTrap = null;
      }
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    }

    if (championsGrid) {
      championsGrid.addEventListener("click", event => {
        const btn = event.target.closest("[data-champion-id]");
        if (btn) openChampionModal(btn.dataset.championId);
      });
    }
    if (modalClose) modalClose.addEventListener("click", closeChampionModal);
    if (modal) {
      modal.addEventListener("click", event => {
        if (event.target === modal) closeChampionModal();
      });
    }
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeChampionModal();
    });

    if (championSearch) {
      championSearch.addEventListener("input", renderChampions);
    }
    if (filterBar) {
      filterBar.addEventListener("click", event => {
        const btn = event.target.closest(".nwc-filter-btn");
        if (!btn) return;
        filterBar.querySelectorAll(".nwc-filter-btn").forEach(b =>
          b.setAttribute("aria-pressed", b === btn ? "true" : "false")
        );
        renderChampions();
      });
    }
    renderChampions();

    // --- Venues ---------------------------------------------------------------
    const venuesGrid = document.getElementById("nwc-venues-grid");
    if (venuesGrid) {
      historicVenues.forEach(venue => {
        const card = document.createElement("article");
        card.className = "nwc-venue-card";
        card.innerHTML = `
          <div class="nwc-venue-head">
            <span class="nwc-venue-icon" aria-hidden="true">${venue.icon}</span>
            <div>
              <h3>${venue.name}</h3>
              <p class="nwc-champion-meta">${venue.city} \u00b7 ${venue.capacity}</p>
            </div>
          </div>
          <ul class="nwc-style-rules">
            ${venue.facts.map(fact => `<li>${fact}</li>`).join("")}
          </ul>
          <p class="nwc-style-india"><strong>Why it matters:</strong> ${venue.significance}</p>
        `;
        venuesGrid.appendChild(card);
      });
    }

    // --- Olympic medals table ---------------------------------------------------
    const medalsTableBody = document.getElementById("nwc-medals-body");
    const summary = summariseOlympicMedals();
    const totalEl = document.getElementById("nwc-medal-total");
    if (totalEl) totalEl.textContent = String(summary.total);

    if (medalsTableBody) {
      olympicMedals.forEach(entry => {
        const row = document.createElement("tr");
        row.className = `nwc-medal-row nwc-medal-${entry.medal.toLowerCase()}`;
        row.innerHTML = `
          <th scope="row">${entry.wrestler}</th>
          <td>${entry.games}</td>
          <td>${entry.event}</td>
          <td><span class="nwc-medal-pill">${entry.medal}</span></td>
        `;
        medalsTableBody.appendChild(row);
      });
    }

    // --- Sources / References ---------------------------------------------------
    const sourcesList = document.getElementById("nwc-sources-list");
    if (sourcesList) {
      referenceSources.forEach(source => {
        const item = document.createElement("li");
        item.innerHTML = `
          <a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.name}</a>
          <span>${source.note}</span>
        `;
        sourcesList.appendChild(item);
      });
    }

    // --- Interactive timeline -----------------------------------------------------
    const rail = document.getElementById("nwc-timeline-rail");
    const detailPanel = document.getElementById("nwc-timeline-detail");
    const btnPrev = document.getElementById("nwc-timeline-prev");
    const btnNext = document.getElementById("nwc-timeline-next");
    const stepIndicator = document.getElementById("nwc-timeline-step");
    let currentIndex = 0;

    function renderTimelineDetail(index) {
      const milestone = sortedTimeline[index];
      if (!milestone || !detailPanel) return;

      detailPanel.innerHTML = `
        <span class="nwc-timeline-year">${milestone.label}</span>
        <h3>${milestone.title}</h3>
        <p>${milestone.description}</p>
        <p class="nwc-timeline-person"><strong>Spotlight:</strong> ${milestone.person}</p>
      `;

      if (stepIndicator) {
        stepIndicator.textContent = `Milestone ${index + 1} of ${sortedTimeline.length}`;
      }
      if (btnPrev) btnPrev.disabled = index === 0;
      if (btnNext) btnNext.disabled = index === sortedTimeline.length - 1;

      if (rail) {
        rail.querySelectorAll(".nwc-timeline-node").forEach(node => {
          const isActive = Number(node.dataset.sortKey) === milestone.sortKey;
          node.classList.toggle("active", isActive);
          if (isActive) {
            node.setAttribute("aria-current", "true");
            node.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          } else {
            node.removeAttribute("aria-current");
          }
        });
      }
    }

    if (rail) {
      sortedTimeline.forEach((milestone, index) => {
        const node = document.createElement("button");
        node.type = "button";
        node.className = "nwc-timeline-node";
        node.dataset.sortKey = String(milestone.sortKey);
        node.textContent = milestone.label;
        node.setAttribute("aria-label", `${milestone.label}: ${milestone.title}`);
        node.addEventListener("click", () => {
          currentIndex = index;
          renderTimelineDetail(currentIndex);
        });
        rail.appendChild(node);
      });

      rail.addEventListener("keydown", event => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        const nodes = Array.from(rail.querySelectorAll(".nwc-timeline-node"));
        const activeIndex = nodes.findIndex(node => node.getAttribute("aria-current") === "true");
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = Math.min(nodes.length - 1, Math.max(0, activeIndex + direction));
        nodes[nextIndex].focus();
        currentIndex = nextIndex;
        renderTimelineDetail(currentIndex);
        event.preventDefault();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex -= 1;
          renderTimelineDetail(currentIndex);
        }
      });
    }
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (currentIndex < sortedTimeline.length - 1) {
          currentIndex += 1;
          renderTimelineDetail(currentIndex);
        }
      });
    }
    renderTimelineDetail(0);
  });
}
