/**
 * davis-cup-explorer.js
 * India's Davis Cup Journey - Timeline, Players, and Finals Archive
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Chronological timeline of India's major Davis Cup milestones (fact-checked)
export const davisCupTimeline = [
  {
    id: "debut-1921",
    year: 1921,
    title: "India's Davis Cup Debut",
    type: "Milestone",
    description: "India competed in its first Davis Cup, entering the International Lawn Tennis Challenge as British India, decades before independence.",
    source: "ITF / Wikipedia — India Davis Cup team"
  },
  {
    id: "first-win-1938",
    year: 1938,
    title: "First Tie Win",
    type: "Milestone",
    description: "India won its first recorded Davis Cup tie, advancing past Austria in the Europe Zone second round.",
    source: "ITF Davis Cup archives"
  },
  {
    id: "independence-1947",
    year: 1947,
    title: "Post-Independence Team",
    type: "Milestone",
    description: "Following independence, the Davis Cup team transitioned to representing the sovereign Republic of India, with the All India Tennis Association overseeing the program.",
    source: "Grokipedia — India Davis Cup team"
  },
  {
    id: "first-interzone-1956",
    year: 1956,
    title: "First Inter-Zone Final",
    type: "Milestone",
    description: "Under captain Naresh Kumar, India reached its first Inter-Zone final, losing to the United States after a decade of building depth in the Eastern Zone.",
    source: "Grokipedia — India Davis Cup team"
  },
  {
    id: "krishnan-laver-1959",
    year: 1959,
    title: "Krishnan Defeats Laver",
    type: "Historic Tie",
    description: "India reached the Inter-Zone final against Australia. A young Ramanathan Krishnan defeated future Grand Slam champion Rod Laver in singles, though India lost the tie.",
    source: "Grokipedia — India Davis Cup team"
  },
  {
    id: "final-1966",
    year: 1966,
    title: "First Davis Cup Final",
    type: "Final",
    description: "India reached its first Davis Cup final (then the Challenge Round), led by Ramanathan Krishnan and Jaideep Mukerjea, after defeating Brazil and West Germany. India lost the final to Australia.",
    source: "Wikipedia — India Davis Cup team"
  },
  {
    id: "final-1974-forfeit",
    year: 1974,
    title: "The Forfeited Final",
    type: "Final",
    description: "India reached the final again after upsetting defending champion Australia in the quarterfinals (Jasjit Singh beat Bob Giltinan; Vijay Amritraj's team excelled). India then forfeited the final against apartheid-era South Africa on the Indian government's orders — the only Davis Cup final in history never played.",
    source: "The Federal — '1974 Davis Cup final: When India forfeited the tie'"
  },
  {
    id: "final-1987",
    year: 1987,
    title: "Third Davis Cup Final",
    type: "Final",
    description: "Led by Vijay and Anand Amritraj plus Ramesh Krishnan, India upset Australia in the semifinal to reach a third final — but lost 5-0 to Sweden (Mats Wilander, Joakim Nystrom) in Gothenburg.",
    source: "Wikipedia — 1987 Davis Cup; Tennis Majors"
  },
  {
    id: "paes-bhupathi-2004",
    year: 2004,
    title: "Paes-Bhupathi Doubles Pairing",
    type: "Historic Tie",
    description: "Leander Paes and Mahesh Bhupathi paired up in Davis Cup doubles for India, going on to become the nation's most successful doubles team (25-2 win/loss record together).",
    source: "iloveindia.com — India in Davis Cup"
  },
  {
    id: "world-group-2011",
    year: 2011,
    title: "Last World Group Appearance",
    type: "Milestone",
    description: "India's most recent appearance in the elite 16-nation World Group ended in a 4-1 defeat to Serbia; India has not qualified for the World Group since.",
    source: "Wikipedia — India Davis Cup team"
  }
];

// Famous Indian Davis Cup players (fact-checked career records)
export const davisCupPlayers = [
  {
    id: "ramanathan-krishnan",
    name: "Ramanathan Krishnan",
    era: "1953–1975",
    icon: "🎾",
    record: "Most singles wins: 50–19",
    description: "India's most successful Davis Cup singles player, he led India to its first Davis Cup final in 1966 and famously defeated future champion Rod Laver in 1959.",
    source: "Wikipedia — India Davis Cup team"
  },
  {
    id: "leander-paes",
    name: "Leander Paes",
    era: "1990–2016",
    icon: "🏆",
    record: "Most total wins: 93–35 · Most doubles wins: 45–13 · Most ties played: 58 · Most years played: 30",
    description: "India's most decorated Davis Cup player by every major career metric — wins, ties played, and years of service to the team.",
    source: "Wikipedia — India Davis Cup team"
  },
  {
    id: "mahesh-bhupathi",
    name: "Mahesh Bhupathi",
    era: "1995–2011",
    icon: "🎾",
    record: "Best doubles team with Paes: 25–2",
    description: "Paired with Leander Paes to form India's most successful Davis Cup doubles partnership, and later served as India's Davis Cup captain.",
    source: "Wikipedia — India Davis Cup team"
  },
  {
    id: "vijay-amritraj",
    name: "Vijay Amritraj",
    era: "1970–1987",
    icon: "🎾",
    record: "Led India to the 1974 and 1987 finals",
    description: "The face of Indian tennis through the 1970s and 80s, Vijay Amritraj anchored India's Davis Cup team through two of its three final appearances.",
    source: "The Federal; Tennis Majors"
  },
  {
    id: "anand-amritraj",
    name: "Anand Amritraj",
    era: "1968–1987",
    icon: "🎾",
    record: "Doubles partner in the 1974 and 1987 finals",
    description: "Vijay's elder brother and long-time doubles partner, Anand played alongside him in India's Davis Cup campaigns of the 1970s and 80s.",
    source: "Tennis Majors"
  },
  {
    id: "ramesh-krishnan",
    name: "Ramesh Krishnan",
    era: "1979–1993",
    icon: "🎾",
    record: "India's top-ranked singles player in the 1987 run",
    description: "Son of Ramanathan Krishnan, he was India's only top-100-ranked singles player during the improbable 1987 run to the final.",
    source: "Tennis Majors"
  }
];

// The three Davis Cup finals India has reached (India has never won)
export const davisCupFinals = [
  {
    id: "final-1966",
    year: 1966,
    opponent: "Australia",
    result: "Lost",
    venue: "Challenge Round",
    keyPlayers: "Ramanathan Krishnan, Jaideep Mukerjea",
    summary: "India's first Davis Cup final. India defeated Brazil and West Germany en route before losing the Challenge Round to Australia.",
    source: "Wikipedia — India Davis Cup team"
  },
  {
    id: "final-1974",
    year: 1974,
    opponent: "South Africa",
    result: "Forfeited",
    venue: "Never played",
    keyPlayers: "Vijay Amritraj, Anand Amritraj, Jasjit Singh",
    summary: "India upset defending champion Australia in the quarterfinals to reach the final, then forfeited on government orders in protest of South African apartheid — the only Davis Cup final in history never played.",
    source: "The Federal — '1974 Davis Cup final'"
  },
  {
    id: "final-1987",
    year: 1987,
    opponent: "Sweden",
    result: "Lost 5–0",
    venue: "Gothenburg, Sweden (indoor clay)",
    keyPlayers: "Vijay Amritraj, Anand Amritraj, Ramesh Krishnan",
    summary: "With only one top-100 player (Ramesh Krishnan), India upset Australia in the semifinal for one of the tournament's most unlikely final runs, before being swept 5-0 by Mats Wilander's Sweden.",
    source: "Wikipedia — 1987 Davis Cup; Tennis Majors"
  }
];

/**
 * Get timeline entries sorted chronologically.
 */
export function getSortedTimeline(list = davisCupTimeline) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => a.year - b.year);
}

/**
 * Filter timeline entries by type ("all" | "Milestone" | "Historic Tie" | "Final").
 */
export function filterTimelineByType(typeFilter = "all", list = davisCupTimeline) {
  if (!Array.isArray(list)) return [];
  if (!typeFilter || typeFilter.toLowerCase() === "all") return getSortedTimeline(list);
  return getSortedTimeline(list).filter(
    item => item.type.toLowerCase() === typeFilter.toLowerCase()
  );
}

/**
 * Search timeline, players, or finals by free-text query.
 */
export function searchDavisCup(query = "") {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { timeline: davisCupTimeline, players: davisCupPlayers, finals: davisCupFinals };
  }
  const matches = (obj, fields) =>
    fields.some(f => obj[f] && obj[f].toString().toLowerCase().includes(q));

  return {
    timeline: davisCupTimeline.filter(item =>
      matches(item, ["title", "type", "description", "year"])
    ),
    players: davisCupPlayers.filter(item =>
      matches(item, ["name", "era", "record", "description"])
    ),
    finals: davisCupFinals.filter(item =>
      matches(item, ["opponent", "result", "keyPlayers", "summary", "year"])
    )
  };
}

/* ==========================================================================
   BROWSER DOM ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.davisCupTimeline = davisCupTimeline;
  window.davisCupPlayers = davisCupPlayers;
  window.davisCupFinals = davisCupFinals;
  window.getSortedTimeline = getSortedTimeline;
  window.filterTimelineByType = filterTimelineByType;
  window.searchDavisCup = searchDavisCup;

  document.addEventListener("DOMContentLoaded", () => {
    const timelineContainer = document.getElementById("dc-timeline-container");
    const playersGrid = document.getElementById("dc-players-grid");
    const finalsGrid = document.getElementById("dc-finals-grid");
    const searchInput = document.getElementById("dc-search");
    const typeBtns = document.querySelectorAll(".btn-dc-type-filter");
    const viewTabs = document.querySelectorAll(".btn-dc-view-tab");

    let currentType = "all";

    function renderTimeline() {
      if (!timelineContainer) return;
      timelineContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      let items = query ? searchDavisCup(query).timeline : davisCupTimeline;
      items = filterTimelineByType(currentType, items);

      if (items.length === 0) {
        timelineContainer.innerHTML = `<div class="dc-empty-msg"><h3>No results</h3><p>Try a different search term or filter.</p></div>`;
        return;
      }

      items.forEach(item => {
        const node = document.createElement("div");
        node.className = "dc-timeline-node";
        node.innerHTML = `
          <div class="dc-year-pill">📅 ${item.year}</div>
          <div class="dc-timeline-card">
            <span class="dc-type-tag dc-type-${item.type.replace(/\s+/g, "-").toLowerCase()}">${item.type}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p class="dc-source">Source: ${item.source}</p>
          </div>
        `;
        timelineContainer.appendChild(node);
      });
    }

    function renderPlayers() {
      if (!playersGrid) return;
      playersGrid.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const items = query ? searchDavisCup(query).players : davisCupPlayers;

      if (items.length === 0) {
        playersGrid.innerHTML = `<div class="dc-empty-msg"><h3>No players found</h3></div>`;
        return;
      }

      items.forEach(p => {
        const card = document.createElement("article");
        card.className = "dc-player-card";
        card.innerHTML = `
          <div class="dc-player-header">
            <span class="dc-player-icon">${p.icon}</span>
            <span class="dc-player-era">${p.era}</span>
          </div>
          <h3>${p.name}</h3>
          <p class="dc-player-record">${p.record}</p>
          <p class="dc-player-desc">${p.description}</p>
          <p class="dc-source">Source: ${p.source}</p>
        `;
        playersGrid.appendChild(card);
      });
    }

    function renderFinals() {
      if (!finalsGrid) return;
      finalsGrid.innerHTML = "";

      davisCupFinals.forEach(f => {
        const card = document.createElement("article");
        card.className = "dc-final-card";
        card.innerHTML = `
          <div class="dc-final-header">
            <span class="dc-final-year">${f.year}</span>
            <span class="dc-final-result dc-result-${f.result.split(" ")[0].toLowerCase()}">${f.result}</span>
          </div>
          <h3>India vs. ${f.opponent}</h3>
          <p class="dc-final-venue">${f.venue}</p>
          <p class="dc-final-players"><strong>Key players:</strong> ${f.keyPlayers}</p>
          <p class="dc-final-summary">${f.summary}</p>
          <p class="dc-source">Source: ${f.source}</p>
        `;
        finalsGrid.appendChild(card);
      });
    }

    // View tab switching
    viewTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        viewTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.dataset.view;
        document.querySelectorAll(".dc-view-panel").forEach(p => p.classList.add("hidden"));
        document.getElementById(`dc-view-${target}`)?.classList.remove("hidden");
      });
    });

    // Type filter (timeline only)
    typeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        typeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentType = btn.dataset.type || "all";
        renderTimeline();
      });
    });

    // Search (applies to timeline + players)
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        renderTimeline();
        renderPlayers();
      });
    }

    // Initial render
    renderTimeline();
    renderPlayers();
    renderFinals();
  });
}