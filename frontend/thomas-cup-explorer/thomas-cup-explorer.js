/**
 * thomas-cup-explorer.js
 * Thomas Cup: India's Badminton Journey - Timeline, Players, and Campaign Archive
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Chronological timeline of India's major Thomas Cup milestones (fact-checked)
export const thomasCupTimeline = [
  {
    id: "trophy-founded-1939",
    year: 1939,
    title: "The Thomas Cup Is Conceived",
    type: "Milestone",
    description: "Sir George Alan Thomas, founder-president of the International Badminton Federation, proposed a world men's team championship and commissioned the silver-gilt trophy — delayed a decade by World War II.",
    source: "BWF Thomas & Uber Cup History"
  },
  {
    id: "inaugural-1949",
    year: 1949,
    title: "Inaugural Thomas Cup",
    type: "Milestone",
    description: "The first Thomas Cup was held in England; Malaya (now Malaysia) defeated Denmark 8-1 in the final to become the first name on the trophy. India did not compete in this edition.",
    source: "Wikipedia — 1949 Thomas Cup"
  },
  {
    id: "india-debut-1952",
    year: 1952,
    title: "India's Thomas Cup Debut",
    type: "Milestone",
    description: "India made its Thomas Cup debut and reached the top four under the tournament's early format, where only finalists (the last four teams) earned medals — India's first bronze-equivalent finish.",
    source: "The Bridge — 'India's history at Thomas Cup'"
  },
  {
    id: "second-top4-1955",
    year: 1955,
    title: "Second Top-Four Finish",
    type: "Milestone",
    description: "India repeated its strong debut form, again reaching the top four before losing 3-6 to Denmark.",
    source: "The Bridge — 'India's history at Thomas Cup'"
  },
  {
    id: "padukone-1979",
    year: 1979,
    title: "Padukone-Led Campaign",
    type: "Historic Tie",
    description: "Led by a young Prakash Padukone, India again reached the top four — one of its best pre-2022 campaigns — before losing to Denmark. India would not match this run for over four decades.",
    source: "The Bridge; Wikipedia — 1979 Thomas Cup squads"
  },
  {
    id: "semifinal-2022",
    year: 2022,
    title: "Return to the Semifinals",
    type: "Historic Tie",
    description: "India reached the Thomas Cup semifinals for the first time in 43 years, beating Malaysia 3-2 in the quarterfinal before advancing.",
    source: "Sportskeeda — Thomas Cup 2022 preview"
  },
  {
    id: "final-champions-2022",
    year: 2022,
    title: "Maiden Title",
    type: "Final",
    description: "India beat Denmark 3-2 in the semifinal to reach its first-ever final, then stunned 14-time champions Indonesia 3-0 in Bangkok to win the Thomas Cup for the first time in the tournament's 73-year history.",
    source: "Olympics.com; Gulf News — Thomas Cup 2022"
  },
  {
    id: "title-defense-2024",
    year: 2024,
    title: "Title Defense Ends in Quarterfinals",
    type: "Milestone",
    description: "As defending champions in Chengdu, China, India reached the quarterfinals after group-stage wins over Thailand and England, but lost 1-3 to host nation China, ending their title defense.",
    source: "Khel Now; ESPN — Thomas & Uber Cup 2024"
  }
];

// Key Indian players across Thomas Cup history (fact-checked)
export const thomasCupPlayers = [
  {
    id: "prakash-padukone",
    name: "Prakash Padukone",
    era: "1970s–1991",
    icon: "🏸",
    role: "Singles legend",
    description: "Led India's standout 1979 Thomas Cup campaign to the top four. He went on to become India's first World No. 1 and the first Indian to win the All England Championships (1980).",
    source: "Britannica — Prakash Padukone"
  },
  {
    id: "kidambi-srikanth",
    name: "Kidambi Srikanth",
    era: "2013–present",
    icon: "🏸",
    role: "Singles, 2022 title-winning shot",
    description: "Sealed India's historic 2022 final win, defeating higher-ranked Jonatan Christie in straight games to complete the 3-0 sweep of Indonesia.",
    source: "Sportskeeda — Thomas Cup 2022"
  },
  {
    id: "lakshya-sen",
    name: "Lakshya Sen",
    era: "2018–present",
    icon: "🏸",
    role: "Singles, opened the 2022 final",
    description: "Then 20 years old, Sen opened India's 2022 final by beating world No. 4 Anthony Ginting after dropping the first game — setting the tone for India's title run.",
    source: "Sportsunfold — Thomas Cup 2022"
  },
  {
    id: "satwik-chirag",
    name: "Satwiksairaj Rankireddy & Chirag Shetty",
    era: "2016–present",
    icon: "🏸",
    role: "Doubles pair",
    description: "India's premier doubles pairing sealed the second point of the 2022 final over Indonesia's Ahsan/Sukamuljo, and remain central to India's Thomas Cup campaigns since.",
    source: "Gulf News — Thomas Cup 2022"
  },
  {
    id: "hs-prannoy",
    name: "H. S. Prannoy",
    era: "2010–present",
    icon: "🏸",
    role: "Singles, 2024 campaign",
    description: "India's senior singles player during the 2024 title defense, winning key group-stage and quarterfinal rubbers in Chengdu before India's run ended against China.",
    source: "Khel Now — Thomas & Uber Cup 2024"
  }
];

// India's notable Thomas Cup campaigns/results
export const thomasCupCampaigns = [
  {
    id: "campaign-1952",
    year: 1952,
    result: "Top 4 (bronze-equivalent)",
    summary: "India's Thomas Cup debut. Under the pre-1984 format, only the last four teams earned medals — India reached that stage in its first appearance.",
    source: "The Bridge — 'India's history at Thomas Cup'"
  },
  {
    id: "campaign-1955",
    year: 1955,
    result: "Top 4 (bronze-equivalent)",
    summary: "India again reached the top four before losing 3-6 to Denmark.",
    source: "The Bridge — 'India's history at Thomas Cup'"
  },
  {
    id: "campaign-1979",
    year: 1979,
    result: "Top 4 (bronze-equivalent)",
    summary: "Led by Prakash Padukone, India reached the top four again before losing to Denmark — a campaign India would not equal for 43 years.",
    source: "The Bridge; Wikipedia — 1979 Thomas Cup squads"
  },
  {
    id: "campaign-2022",
    year: 2022,
    result: "Champions 🏆",
    summary: "India's maiden Thomas Cup title. Group stage: beat Germany 5-0 and Canada 5-0, lost 2-3 to Chinese Taipei. Knockouts: beat Malaysia 3-2 (QF), Denmark 3-2 (SF), and Indonesia 3-0 in the final.",
    source: "Sportsunfold; Olympics.com — Thomas Cup 2022"
  },
  {
    id: "campaign-2024",
    year: 2024,
    result: "Quarterfinals",
    summary: "As defending champions, India beat Thailand 4-1 and England 5-0 in the group stage before losing 1-3 to host China in the quarterfinals.",
    source: "Khel Now; ESPN — Thomas & Uber Cup 2024"
  }
];

/**
 * Get timeline entries sorted chronologically.
 */
export function getSortedTimeline(list = thomasCupTimeline) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => a.year - b.year);
}

/**
 * Filter timeline entries by type ("all" | "Milestone" | "Historic Tie" | "Final").
 */
export function filterTimelineByType(typeFilter = "all", list = thomasCupTimeline) {
  if (!Array.isArray(list)) return [];
  if (!typeFilter || typeFilter.toLowerCase() === "all") return getSortedTimeline(list);
  return getSortedTimeline(list).filter(
    item => item.type.toLowerCase() === typeFilter.toLowerCase()
  );
}

/**
 * Search timeline, players, or campaigns by free-text query.
 */
export function searchThomasCup(query = "") {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { timeline: thomasCupTimeline, players: thomasCupPlayers, campaigns: thomasCupCampaigns };
  }
  const matches = (obj, fields) =>
    fields.some(f => obj[f] && obj[f].toString().toLowerCase().includes(q));

  return {
    timeline: thomasCupTimeline.filter(item =>
      matches(item, ["title", "type", "description", "year"])
    ),
    players: thomasCupPlayers.filter(item =>
      matches(item, ["name", "era", "role", "description"])
    ),
    campaigns: thomasCupCampaigns.filter(item =>
      matches(item, ["result", "summary", "year"])
    )
  };
}

/* ==========================================================================
   BROWSER DOM ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.thomasCupTimeline = thomasCupTimeline;
  window.thomasCupPlayers = thomasCupPlayers;
  window.thomasCupCampaigns = thomasCupCampaigns;
  window.getSortedTimeline = getSortedTimeline;
  window.filterTimelineByType = filterTimelineByType;
  window.searchThomasCup = searchThomasCup;

  document.addEventListener("DOMContentLoaded", () => {
    const timelineContainer = document.getElementById("tc-timeline-container");
    const playersGrid = document.getElementById("tc-players-grid");
    const campaignsGrid = document.getElementById("tc-campaigns-grid");
    const searchInput = document.getElementById("tc-search");
    const typeBtns = document.querySelectorAll(".btn-tc-type-filter");
    const viewTabs = document.querySelectorAll(".btn-tc-view-tab");

    let currentType = "all";

    function renderTimeline() {
      if (!timelineContainer) return;
      timelineContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      let items = query ? searchThomasCup(query).timeline : thomasCupTimeline;
      items = filterTimelineByType(currentType, items);

      if (items.length === 0) {
        timelineContainer.innerHTML = `<div class="tc-empty-msg"><h3>No results</h3><p>Try a different search term or filter.</p></div>`;
        return;
      }

      items.forEach(item => {
        const node = document.createElement("div");
        node.className = "tc-timeline-node";
        node.innerHTML = `
          <div class="tc-year-pill">📅 ${item.year}</div>
          <div class="tc-timeline-card">
            <span class="tc-type-tag tc-type-${item.type.replace(/\s+/g, "-").toLowerCase()}">${item.type}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p class="tc-source">Source: ${item.source}</p>
          </div>
        `;
        timelineContainer.appendChild(node);
      });
    }

    function renderPlayers() {
      if (!playersGrid) return;
      playersGrid.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const items = query ? searchThomasCup(query).players : thomasCupPlayers;

      if (items.length === 0) {
        playersGrid.innerHTML = `<div class="tc-empty-msg"><h3>No players found</h3></div>`;
        return;
      }

      items.forEach(p => {
        const card = document.createElement("article");
        card.className = "tc-player-card";
        card.innerHTML = `
          <div class="tc-player-header">
            <span class="tc-player-icon">${p.icon}</span>
            <span class="tc-player-era">${p.era}</span>
          </div>
          <h3>${p.name}</h3>
          <p class="tc-player-role">${p.role}</p>
          <p class="tc-player-desc">${p.description}</p>
          <p class="tc-source">Source: ${p.source}</p>
        `;
        playersGrid.appendChild(card);
      });
    }

    function renderCampaigns() {
      if (!campaignsGrid) return;
      campaignsGrid.innerHTML = "";

      thomasCupCampaigns.forEach(c => {
        const card = document.createElement("article");
        card.className = "tc-campaign-card";
        const resultClass = c.result.toLowerCase().includes("champion")
          ? "tc-result-champion"
          : c.result.toLowerCase().includes("quarterfinal")
          ? "tc-result-qf"
          : "tc-result-top4";
        card.innerHTML = `
          <div class="tc-campaign-header">
            <span class="tc-campaign-year">${c.year}</span>
            <span class="tc-campaign-result ${resultClass}">${c.result}</span>
          </div>
          <p class="tc-campaign-summary">${c.summary}</p>
          <p class="tc-source">Source: ${c.source}</p>
        `;
        campaignsGrid.appendChild(card);
      });
    }

    // View tab switching
    viewTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        viewTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.dataset.view;
        document.querySelectorAll(".tc-view-panel").forEach(p => p.classList.add("hidden"));
        document.getElementById(`tc-view-${target}`)?.classList.remove("hidden");
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
    renderCampaigns();
  });
}