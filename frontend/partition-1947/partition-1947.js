/**
 * partition-1947.js
 * Scrollytelling: Partition of India, 1947 — A Factual Overview
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Respectful Editorial Disclaimer
export const editorialNote = {
  title: "Editorial Note & Historical Framing",
  content: "This presentation offers a factual, neutral, and respectful overview of the 1947 Partition of British India, focusing on political decisions, verified demographic scale, and nation-building aftermath. Content is compiled from peer-reviewed historical literature and official census archives. In accordance with strict educational guidelines, graphic depictions of violence are omitted to maintain an objective, dignified focus on human history and resilience."
};

// Verified Demographics & Migration Statistics (Sourced & Cited)
export const demographicStats = {
  totalDisplaced: "14 - 15 Million",
  totalDisplacedNumeric: 14500000,
  migratedToIndia: "7.2 Million",
  migratedToIndiaNumeric: 7200000,
  migratedToPakistan: "7.2 Million",
  migratedToPakistanNumeric: 7200000,
  rehabilitationCampsCount: "200+",
  largestCampCapacity: "300,000 (Kurukshetra Camp)",
  sources: [
    "Census of India 1951 (Vol. I, Part I-A Report)",
    "UNHCR Historical Reports on 20th Century Population Movements",
    "The Great Partition: The Making of India and Pakistan (Yasmin Khan, Yale University Press)",
    "India After Gandhi: The History of the World's Largest Democracy (Ramachandra Guha)"
  ]
};

// Radcliffe Line Boundary Regions
export const radcliffeRegions = [
  {
    id: "punjab-border",
    name: "Punjab Boundary Commission",
    chairman: "Sir Cyril Radcliffe",
    districtsDivided: ["Gurdaspur", "Amritsar", "Lahore", "Firozpur", "Jalandhar"],
    lengthKm: 553,
    description: "Divided the fertile agricultural plains of Punjab, bisecting river systems and canal networks."
  },
  {
    id: "bengal-border",
    name: "Bengal Boundary Commission",
    chairman: "Sir Cyril Radcliffe",
    districtsDivided: ["Nadia", "Jessore", "Dinajpur", "Malda", "Sylhet"],
    lengthKm: 4096,
    description: "Divided Bengal and Assam, separating jute agricultural belts in East Bengal from processing mills in Calcutta."
  }
];

// Verified Historical Timeline Events (7 Chronological Milestones)
export const partitionTimeline = [
  {
    id: "t-1946-05",
    date: "May 16, 1946",
    title: "Cabinet Mission Plan",
    phase: "Political Context",
    description: "The British Cabinet Mission proposed a three-tier federal structure with a central defense/foreign affairs authority and autonomous provincial groupings to preserve a unified India.",
    historicalSignificance: "Represented the last major constitutional attempt to avoid partition before negotiations broke down."
  },
  {
    id: "t-1947-06",
    date: "June 3, 1947",
    title: "Mountbatten Plan Announced",
    phase: "Decision to Partition",
    description: "Viceroy Lord Mountbatten publicly announced the plan for the partition of British India into two independent dominions—India and Pakistan—with power transferred by August 1947.",
    historicalSignificance: "Accelerated the timetable for British withdrawal from June 1948 to August 1947."
  },
  {
    id: "t-1947-07",
    date: "July 18, 1947",
    title: "Indian Independence Act Passed",
    phase: "Legislative Framework",
    description: "The British Parliament enacted the Indian Independence Act 1947, formally creating the sovereign Dominions of India and Pakistan and terminating suzerainty over Princely States.",
    historicalSignificance: "Provided the legal mandate for independence and the establishment of two separate Boundary Commissions."
  },
  {
    id: "t-1947-08-15",
    date: "August 14–15, 1947",
    title: "Transfer of Power & Independence",
    phase: "Independence",
    description: "Pakistan celebrated independence on August 14, followed by India at midnight on August 15. Prime Minister Jawaharlal Nehru delivered his iconic 'Tryst with Destiny' address.",
    historicalSignificance: "Brought an end to nearly two centuries of British colonial rule in South Asia."
  },
  {
    id: "t-1947-08-17",
    date: "August 17, 1947",
    title: "Publication of the Radcliffe Line",
    phase: "Border Award",
    description: "The official awards of the Punjab and Bengal Boundary Commissions were published, establishing the international borders between India and East/West Pakistan.",
    historicalSignificance: "Triggered massive, unanticipated cross-border migrations as millions found themselves on opposite sides of newly drawn lines."
  },
  {
    id: "t-1947-09",
    date: "1947–1948",
    title: "Mass Migration & Refugee Resettlement",
    phase: "Human Scale",
    description: "An estimated 14 to 15 million people crossed borders. The Ministry of Relief and Rehabilitation established massive transit camps at Kurukshetra, Purana Qila, and Ranaghat.",
    historicalSignificance: "One of the largest peace-time population movements recorded in 20th-century global history."
  },
  {
    id: "t-1950",
    date: "April 8, 1950",
    title: "Nehru-Liaquat Pact & Nation-Building",
    phase: "Aftermath & Recovery",
    description: "Prime Ministers Jawaharlal Nehru and Liaquat Ali Khan signed a bilateral agreement in New Delhi pledging minority rights protection, property claims processing, and peaceful co-existence.",
    historicalSignificance: "Formalized government commitments to refugee rehabilitation and secular democratic constitutional guarantees."
  }
];

/**
 * Get timeline event by ID.
 */
export function getTimelineEventById(id, list = partitionTimeline) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(e => e.id.toLowerCase() === target || e.date.toLowerCase() === target);
}

/**
 * Filter timeline events by search query.
 */
export function filterTimelineEvents(query = "", list = partitionTimeline) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  if (!q) return list;

  return list.filter(e => [
    e.title,
    e.date,
    e.phase,
    e.description,
    e.historicalSignificance
  ].some(field => field && field.toLowerCase().includes(q)));
}

/**
 * Verify content neutrality and absence of graphic/sensationalist language.
 */
export function verifyNeutralityAndNonGraphicContent(items = partitionTimeline) {
  const prohibitedTerms = ["blood bath", "slaughter", "carnage", "mutilated", "gory", "atrocity porn"];
  const violations = [];

  const textToScan = [
    editorialNote.content,
    ...items.map(i => `${i.title} ${i.description} ${i.historicalSignificance}`)
  ];

  textToScan.forEach((text, idx) => {
    prohibitedTerms.forEach(term => {
      if (text.toLowerCase().includes(term)) {
        violations.push(`Found restricted graphic term "${term}" at index ${idx}`);
      }
    });
  });

  return {
    isNeutral: violations.length === 0,
    violations
  };
}

/* ==========================================================================
   BROWSER DOM & SCROLLYTELLING ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.partitionTimelineData = partitionTimeline;
  window.partitionDemographicsData = demographicStats;
  window.partitionRadcliffeData = radcliffeRegions;
  window.partitionEditorialNote = editorialNote;
  window.getTimelineEventById = getTimelineEventById;
  window.filterTimelineEvents = filterTimelineEvents;
  window.verifyNeutralityAndNonGraphicContent = verifyNeutralityAndNonGraphicContent;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM References
    const timelineContainer = document.getElementById("timeline-cards-container");
    const searchInput = document.getElementById("partition-search");
    const mapBorderLine = document.getElementById("radcliffe-svg-line");

    // Animated Counter Elements
    const counterDisplaced = document.getElementById("counter-displaced");
    const counterIndia = document.getElementById("counter-india");
    const counterPakistan = document.getElementById("counter-pakistan");

    // Animated Counter Function
    function animateCounters() {
      const duration = 2000;
      const steps = 40;
      const stepTime = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        if (counterDisplaced) {
          const val = (demographicStats.totalDisplacedNumeric * progress / 1000000).toFixed(1);
          counterDisplaced.textContent = `${val} Million`;
        }
        if (counterIndia) {
          const val = (demographicStats.migratedToIndiaNumeric * progress / 1000000).toFixed(1);
          counterIndia.textContent = `${val} Million`;
        }
        if (counterPakistan) {
          const val = (demographicStats.migratedToPakistanNumeric * progress / 1000000).toFixed(1);
          counterPakistan.textContent = `${val} Million`;
        }

        if (step >= steps) {
          if (counterDisplaced) counterDisplaced.textContent = demographicStats.totalDisplaced;
          if (counterIndia) counterIndia.textContent = demographicStats.migratedToIndia;
          if (counterPakistan) counterPakistan.textContent = demographicStats.migratedToPakistan;
          clearInterval(timer);
        }
      }, stepTime);
    }

    // Render Timeline Events
    function renderTimeline() {
      if (!timelineContainer) return;
      timelineContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const filtered = filterTimelineEvents(query);

      if (filtered.length === 0) {
        timelineContainer.innerHTML = `
          <div class="empty-msg-card">
            <h3>No Timeline Events Found</h3>
            <p>Try adjusting your search query (e.g., Mountbatten, Radcliffe, Resettlement).</p>
          </div>
        `;
        return;
      }

      filtered.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "scrolly-card";
        card.dataset.index = index;

        card.innerHTML = `
          <div class="card-meta">
            <span class="phase-tag">${item.phase}</span>
            <span class="date-tag">📅 ${item.date}</span>
          </div>
          <h3>${item.title}</h3>
          <p class="event-desc">${item.description}</p>
          <div class="significance-box">
            <h4>💡 Historical Significance</h4>
            <p>${item.historicalSignificance}</p>
          </div>
        `;

        timelineContainer.appendChild(card);
      });
    }

    // Border Line Animation Trigger on Scroll
    function setupScrollObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (mapBorderLine) {
              mapBorderLine.style.strokeDashoffset = "0";
            }
          }
        });
      }, { threshold: 0.2 });

      document.querySelectorAll(".scrolly-card, .stat-counter-card, .radcliffe-map-box").forEach(el => {
        observer.observe(el);
      });
    }

    // Initializations
    renderTimeline();
    animateCounters();
    setupScrollObserver();

    searchInput?.addEventListener("input", () => {
      renderTimeline();
      setupScrollObserver();
    });
  });
}
