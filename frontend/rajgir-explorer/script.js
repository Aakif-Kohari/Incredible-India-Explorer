/**
 * script.js - Rajgir Sacred Landscape Explorer
 * Interactive features: map, timeline, layer filter, theme sync
 */

/* ─── Data ──────────────────────────────────────────────────────────────── */
const SITES = [
  {
    id: "gridhrakuta",
    name: "Gridhrakuta (Vulture Peak)",
    icon: "🦅",
    layer: "buddhist",
    desc: "The hill where the Buddha delivered the Lotus Sutra and other major Mahayana discourses. Pilgrims have ascended this rocky promontory for over 2,500 years.",
    facts: {
      "ASI Status": "Protected Monument",
      "Religion": "Buddhism",
      "Key Event": "Prajnaparamita & Lotus Sutra discourses",
      "Access": "Ropeway or footpath from New Rajgir"
    }
  },
  {
    id: "son-bhandar",
    name: "Son Bhandar Caves",
    icon: "🪨",
    layer: "jain",
    desc: "Two rock-cut chambers carved into a sheer quartzite cliff. The west chamber bears Brahmi inscriptions associated with Jain traditions; local legend links the eastern chamber to a hidden Mauryan treasury.",
    facts: {
      "ASI Status": "Protected Monument",
      "Material": "Quartzite rock, cut without mortar",
      "Script": "Brahmi inscription (Jain references)",
      "Period": "c. 3rd–4th century CE"
    }
  },
  {
    id: "bimbisara-jail",
    name: "Bimbisara's Prison",
    icon: "⛓️",
    layer: "political",
    desc: "The traditional site where King Bimbisara, ally of the Buddha, was imprisoned by his own son Ajatashatru. The plateau commands a panoramic view of the inner valley — chosen so the king could see the Buddha walking on Gridhrakuta.",
    facts: {
      "ASI Status": "Protected Site",
      "Ruler": "King Bimbisara of Magadha (c. 558–491 BCE)",
      "Significance": "Buddhist historiography, royal succession",
      "Location": "Vaibhara Hill plateau"
    }
  },
  {
    id: "saptaparni",
    name: "Saptaparni Cave",
    icon: "🪔",
    layer: "buddhist",
    desc: "The cave on Vaibhara Hill where the First Buddhist Council (Prathamik Sangiti) was convened in 483 BCE after the Mahaparinirvana of the Buddha. Elder Mahakassapa presided, codifying the Vinaya and Sutta Pitaka.",
    facts: {
      "Event": "First Buddhist Council, 483 BCE",
      "Chaired By": "Venerable Mahakassapa",
      "Outcome": "Oral codification of Vinaya & Dhamma",
      "Heritage Status": "Pilgrimage site"
    }
  },
  {
    id: "maniyar-math",
    name: "Maniyar Math",
    icon: "🐍",
    layer: "political",
    desc: "A circular brick temple mound, excavated by the ASI, revealing superimposed structures spanning Mauryan to Gupta periods. Terracotta snake figurines found here link it to a naga (serpent deity) cult, unique in Magadha.",
    facts: {
      "Excavated By": "Archaeological Survey of India",
      "Period": "Mauryan to Gupta (c. 3rd century BCE – 6th century CE)",
      "Finds": "Terracotta naga figurines, brick platforms",
      "Shape": "Circular brick mound"
    }
  },
  {
    id: "cyclopean-wall",
    name: "Cyclopean Wall of Rajgir",
    icon: "🧱",
    layer: "political",
    desc: "One of India's oldest surviving stone fortifications, encircling the outer Rajgir hills for approximately 40 km. Massive undressed stone blocks fitted without mortar form a wall up to 5 m high and 5 m wide — a feat of Magadhan engineering.",
    facts: {
      "Total Length": "~40 km (outer circuit)",
      "Construction": "Undressed megalithic stones, dry-stone method",
      "Period": "c. 6th–5th century BCE",
      "ASI Status": "Protected Monument"
    }
  }
];

const TIMELINE = [
  {
    id: "t1",
    era: "c. 1000 BCE – 700 BCE",
    color: "hsl(28,100%,55%)",
    title: "Girivraj — The Walled Valley",
    layer: "political",
    summary: "Ancient texts name this valley city Girivraj ('King of Mountains'). Fortified by early Magadha rulers, it already held strategic importance in Late Vedic and early Mahajanapada politics.",
    detail: "The Atharvaveda and later Puranic texts reference Girivraj as a pre-Magadhan settlement, home to the Brihadratha dynasty. The five surrounding hills — Vaibhara, Ratnagiri, Udayagiri, Sonagiri, and Vipulgiri — formed a natural fortress augmented by the Cyclopean stone wall."
  },
  {
    id: "t2",
    era: "c. 558–491 BCE",
    color: "hsl(36,95%,50%)",
    title: "The Kingdom of Bimbisara",
    layer: "political",
    summary: "Haryanka king Bimbisara made Rajgir (then Rajagriha) the thriving Magadhan capital, building palaces, roads, and hosting both the Buddha and Mahavira in his court.",
    detail: "Bimbisara exchanged diplomatic envoys with Avanti and Kosala, expanding Magadha's power. He granted the Bamboo Grove (Venuvana) to the Sangha — Buddhism's first monastery. He was eventually imprisoned and died, reportedly of grief, under his son Ajatashatru."
  },
  {
    id: "t3",
    era: "c. 491–461 BCE",
    color: "hsl(16,80%,46%)",
    title: "Ajatashatru & Military Expansion",
    layer: "political",
    summary: "Ajatashatru usurped power, imprisoned Bimbisara, and waged 16-year wars against Kosala and Vajji, introducing new war machines that transformed Magadhan military strategy.",
    detail: "Ancient sources describe Ajatashatru deploying a 'rathamushala' (a chariot with a mace) and a stone-throwing catapult (mahashilakantaka) against the Lichhavi confederacy. He also participated in the First Buddhist Council and is said to have built a new city at Pataliputra (modern Patna)."
  },
  {
    id: "t4",
    era: "c. 483 BCE",
    color: "hsl(158,58%,40%)",
    title: "First Buddhist Council",
    layer: "buddhist",
    summary: "Months after the Buddha's Mahaparinirvana, 500 arhants convened at Saptaparni Cave to recite and preserve the oral Dhamma and Vinaya under the leadership of Mahakassapa.",
    detail: "According to Pali sources, Ananda recited the Suttas and Upali recited the Vinaya during this council. The recitation codified the oral tradition and established the scriptural authority of the Theravada canon."
  },
  {
    id: "t5",
    era: "c. 5th century BCE",
    color: "hsl(265,60%,58%)",
    title: "Mahavira at Rajagriha",
    layer: "jain",
    summary: "The 24th Tirthankara, Vardhamana Mahavira, visited Rajagriha multiple times, preaching to King Bimbisara and gaining significant following during his 12 years of ascetic wandering.",
    detail: "Jain canonical texts describe Mahavira receiving King Bimbisara's homage and delivering discourses near Nalanda and Rajagriha. The Jain tradition regards Rajgir as a sacred landscape deeply linked to the Tirthankaras."
  },
  {
    id: "t6",
    era: "c. 4th century BCE",
    color: "hsl(43,96%,56%)",
    title: "Capital Moves to Pataliputra",
    layer: "political",
    summary: "Under the Nanda and Maurya dynasties, the capital shifted from Rajagriha to Pataliputra, transforming Rajgir into a sacred pilgrimage destination rather than a political center.",
    detail: "Emperor Ashoka is believed to have visited Rajgir on his pilgrimage tours. Chinese pilgrims Fa Hien (5th century CE) and Xuanzang (7th century CE) later documented the extensive ruins, hot springs, and active monasteries that still attracted devotees."
  },
  {
    id: "t7",
    era: "5th–7th century CE",
    color: "hsl(211,86%,59%)",
    title: "Chinese Pilgrims Document Rajgir",
    layer: "buddhist",
    summary: "Faxian (Fa Hien) and later Xuanzang visited Rajgir as Buddhist scholars, documenting its sacred sites and lamenting the gradual decline of its monasteries.",
    detail: "Xuanzang's Si-Yu-Ki ('Records of the Western World', 629–645 CE) provides detailed descriptions of Gridhrakuta, Saptaparni Cave, the Bamboo Grove, and several monasteries. His accounts remain a crucial primary source for the archaeology of Bihar."
  }
];

/* ─── State ─────────────────────────────────────────────────────────────── */
let activeLayer = "all";
let activeTimelineId = null;
let activeMapSiteId = null;

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function themeClass(el, dark, light) {
  const isLight = document.body.classList.contains("light-theme");
  el.className = isLight ? light : dark;
}

/* ─── Layer Filter ──────────────────────────────────────────────────────── */
function initLayerFilter() {
  const btns = document.querySelectorAll(".rj-layer-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeLayer = btn.dataset.layer;
      applyLayerFilter();
    });
  });
}

function applyLayerFilter() {
  // Sites cards
  document.querySelectorAll(".rj-site-card").forEach(card => {
    const layer = card.dataset.layer;
    if (activeLayer === "all" || layer === activeLayer) {
      card.classList.remove("hidden");
      card.style.animation = "rj-fadein 0.35s ease";
    } else {
      card.classList.add("hidden");
    }
  });
  // Timeline items
  document.querySelectorAll(".rj-timeline-item").forEach(item => {
    const layer = item.dataset.layer;
    if (activeLayer === "all" || layer === activeLayer) {
      item.style.opacity = "1";
      item.style.pointerEvents = "auto";
    } else {
      item.style.opacity = "0.22";
      item.style.pointerEvents = "none";
    }
  });
  // Map markers
  document.querySelectorAll(".rj-site-marker").forEach(marker => {
    const layer = marker.dataset.layer;
    if (activeLayer === "all" || layer === activeLayer) {
      marker.style.opacity = "1";
      marker.style.pointerEvents = "auto";
    } else {
      marker.style.opacity = "0.2";
      marker.style.pointerEvents = "none";
    }
  });
}

/* ─── Timeline ──────────────────────────────────────────────────────────── */
function initTimeline() {
  const container = document.getElementById("rj-timeline-container");
  if (!container) return;
  container.innerHTML = "";

  TIMELINE.forEach((item, i) => {
    const isOdd = (i + 1) % 2 !== 0;
    const el = document.createElement("div");
    el.className = "rj-timeline-item";
    el.dataset.layer = item.layer;

    const dotEl = document.createElement("button");
    dotEl.type = "button";
    dotEl.className = "rj-timeline-dot";
    dotEl.style.background = item.color;
    dotEl.style.boxShadow = `0 0 0 3px ${item.color}40`;
    dotEl.title = item.title;

    const cardEl = document.createElement("div");
    cardEl.className = "rj-timeline-card";
    cardEl.innerHTML = `
      <p class="rj-timeline-era" style="color:"></p>
      <h3></h3>
      <p></p>
      <div class="rj-timeline-detail"></div>`
      ;

    function toggle() {
      const wasActive = activeTimelineId === item.id;
      document.querySelectorAll(".rj-timeline-card").forEach(c => c.classList.remove("active"));
      document.querySelectorAll(".rj-timeline-dot").forEach(d => d.classList.remove("active"));
      if (!wasActive) {
        activeTimelineId = item.id;
        cardEl.classList.add("active");
        dotEl.classList.add("active");
      } else {
        activeTimelineId = null;
      }
    }

    cardEl.addEventListener("click", toggle);
    dotEl.addEventListener("click", toggle);

    el.appendChild(dotEl);
    el.appendChild(cardEl);
    container.appendChild(el);
  });
}

/* ─── Sites Cards ───────────────────────────────────────────────────────── */
function initSites() {
  const container = document.getElementById("rj-sites-container");
  if (!container) return;
  container.innerHTML = "";

  SITES.forEach(site => {
    const card = document.createElement("article");
    card.className = "rj-site-card";
    card.dataset.layer = site.layer;
    card.id = `site-${site.id}`;

    const factsHTML = Object.entries(site.facts)
      .map(([k, v]) => <div class="rj-fact-row"><span class="rj-fact-label">:</span><span class="rj-fact-value"></span></div>)
      .join("");

    card.innerHTML = `
      <div class="rj-site-card-header">
        <div class="rj-site-card-icon"></div>
        <div class="rj-site-card-titles">
          <h3></h3>
          <span class="rj-site-tag "></span>
        </div>
      </div>
      <p class="rj-site-card-desc"></p>
      <div class="rj-site-card-facts"></div>`
      ;

    card.addEventListener("click", () => {
      // Highlight map marker if exists
      document.querySelectorAll(".rj-site-marker").forEach(m => m.classList.remove("active"));
      const marker = document.querySelector(
        `.rj-site-marker[data-site="${siteId}"]`
      );
      if (marker) marker.classList.add("active");
    });

    container.appendChild(card);
  });
}

/* ─── SVG Map ───────────────────────────────────────────────────────────── */
function initMap() {
  const svg = document.getElementById("rj-map-svg");
  if (!svg) return;

  svg.querySelectorAll(".rj-site-marker").forEach(marker => {
    const siteId = marker.dataset.site;
    const layer = marker.dataset.layer;

    marker.addEventListener("click", () => {
      document.querySelectorAll(".rj-site-marker").forEach(m => m.classList.remove("active"));
      marker.classList.add("active");
      // Scroll to card
      const card = document.getElementById(`site-${siteId}`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.style.borderColor = "var(--rj-saffron)";
        setTimeout(() => { card.style.borderColor = ""; }, 1800);
      }
    });
  });
}

/* ─── Theme Sync ────────────────────────────────────────────────────────── */
function syncTheme() {
  let theme = "dark";
  try { theme = JSON.parse(localStorage.getItem("iie_storage") || "{}").theme || "dark"; } catch (e) { }
  if (theme === "light") document.body.classList.add("light-theme");
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isDark = !document.body.classList.contains("light-theme");
      try {
        const stored = JSON.parse(localStorage.getItem("iie_storage") || "{}");
        stored.theme = isDark ? "dark" : "light";
        localStorage.setItem("iie_storage", JSON.stringify(stored));
      } catch (e) { }
      themeBtn.textContent = isDark ? "☀️" : "🌙";
    });
    const isDark = !document.body.classList.contains("light-theme");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
  }
}

/* ─── Init ──────────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  syncTheme();
  initLayerFilter();
  initTimeline();
  initSites();
  initMap();
});
