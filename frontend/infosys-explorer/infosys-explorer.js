/**
 * infosys-explorer.js
 * Infosys: Explore India's Technology Success Story
 * Timeline, Founders, and Global Presence Archive
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Chronological timeline of Infosys's major milestones (fact-checked)
export const infosysTimeline = [
  {
    id: "founding-1981",
    year: 1981,
    title: "Infosys Is Founded",
    type: "Founding",
    description: "Incorporated on July 2, 1981 in Pune by seven engineers led by N.R. Narayana Murthy, with Rs 10,000 (about US$250) borrowed from Murthy's wife, Sudha Murthy.",
    source: "MatrixBCG; Asia Society"
  },
  {
    id: "hq-move-1983",
    year: 1983,
    title: "Headquarters Move to Bengaluru",
    type: "Corporate Evolution",
    description: "Infosys relocated its headquarters to Bengaluru, positioning the company in what would become India's technology hub.",
    source: "Bajaj Finserv — History of Infosys"
  },
  {
    id: "ipo-1993",
    year: 1993,
    title: "Indian IPO",
    type: "Corporate Evolution",
    description: "Infosys made its initial public offer in February 1993; shares listed on Indian stock exchanges on June 14, 1993, opening at Rs 145 versus the Rs 95 issue price. The undersubscribed offer was rescued by Morgan Stanley.",
    source: "Infosys Investor Relations; MatrixBCG"
  },
  {
    id: "crisis-1989",
    year: 1989,
    title: "Survives a Founding Crisis",
    type: "Corporate Evolution",
    description: "A joint-venture collapse nearly ended the company; Narayana Murthy convinced the other founders to stay the course, and Infosys came through stronger.",
    source: "Scribd — Infosys Founding Story & Growth"
  },
  {
    id: "gdm-1990s",
    year: 1995,
    title: "Global Delivery Model Matures",
    type: "Technology Services",
    description: "Through the mid-1990s Infosys refined its Global Delivery Model (GDM) — round-the-clock software development handed off between onsite client teams and offshore teams in India — which became the backbone of the Indian IT services industry.",
    source: "Infosys Management Profiles; MatrixBCG"
  },
  {
    id: "nasdaq-1999",
    year: 1999,
    title: "First Indian Company Listed on NASDAQ",
    type: "Global Presence",
    description: "In March 1999, Infosys issued American Depositary Shares at $34 each, becoming the first India-registered company listed on NASDAQ, and crossed $100 million in annual revenue the same year.",
    source: "Business Today; Infosys Investor Relations"
  },
  {
    id: "billion-2004",
    year: 2004,
    title: "$1 Billion Revenue Milestone",
    type: "Milestone",
    description: "Infosys crossed $1 billion in annual revenue for the year ended March 2004, with net profit of Rs 1,243 crore — the first Indian listed software company to cross Rs 1,000 crore in net profit.",
    source: "Business Standard — 'Infosys first Indian listed IT firm to net Rs 1000 cr'"
  },
  {
    id: "nyse-2012",
    year: 2012,
    title: "NYSE Listing",
    type: "Global Presence",
    description: "Infosys shares were listed on the New York Stock Exchange (NYSE) in December 2012, broadening its access to US capital markets.",
    source: "Infosys Investor Relations"
  },
  {
    id: "parekh-ceo-2018",
    year: 2018,
    title: "Salil Parekh Becomes CEO",
    type: "Corporate Evolution",
    description: "Salil Parekh, formerly of Capgemini, became CEO and Managing Director in January 2018, steering the company through a period of renewed growth and stability after a governance crisis.",
    source: "BrandHistories; ListOfCEO"
  },
  {
    id: "revenue-2025",
    year: 2025,
    title: "Nearly $20 Billion in Annual Revenue",
    type: "Milestone",
    description: "For FY2025, Infosys reported revenue of Rs 1,62,990 crore (about $19 billion) and net profit of Rs 26,713 crore, with annual revenue having grown from $10.9B to roughly $19.3B since Parekh became CEO in 2018.",
    source: "PeopleMatters; ListOfCEO"
  }
];

// Founders of Infosys (fact-checked)
export const infosysFounders = [
  {
    id: "narayana-murthy",
    name: "N. R. Narayana Murthy",
    role: "Founder & First CEO",
    icon: "💼",
    description: "Conceptualized the Global Delivery Model and led Infosys from its 1981 founding through its rise as a global IT services leader.",
    source: "Infosys Management Profiles"
  },
  {
    id: "nandan-nilekani",
    name: "Nandan Nilekani",
    role: "Co-founder; later CEO & Chairman",
    icon: "💼",
    description: "Co-founded Infosys in 1981 and later served as CEO, and again returned as Chairman during a governance transition. Also known for leading India's Aadhaar identity program.",
    source: "MatrixBCG — Brief History of Infosys"
  },
  {
    id: "gopalakrishnan",
    name: "S. (Kris) Gopalakrishnan",
    role: "Co-founder; later CEO",
    icon: "💼",
    description: "Co-founder who later served as Infosys CEO, contributing to the company's engineering and technology strategy.",
    source: "MatrixBCG — Brief History of Infosys"
  },
  {
    id: "shibulal",
    name: "S. D. Shibulal",
    role: "Co-founder; later CEO",
    icon: "💼",
    description: "Co-founder who later served as Infosys CEO, overseeing operations during a period of global expansion.",
    source: "MatrixBCG — Brief History of Infosys"
  },
  {
    id: "other-founders",
    name: "K. Dinesh, N. S. Raghavan & Ashok Arora",
    era: "1981",
    icon: "💼",
    role: "Co-founders",
    description: "Completed the founding team of seven engineers who left Patni Computer Systems in Pune to start Infosys with $250 in capital.",
    source: "MatrixBCG — Brief History of Infosys"
  }
];

// Global presence & corporate evolution facts
export const infosysGlobalPresence = [
  {
    id: "listings",
    title: "Stock Listings",
    detail: "Listed on Indian exchanges (BSE/NSE) since 1993, on NASDAQ since 1999 (first Indian company to do so), and on the NYSE since 2012.",
    source: "Infosys Investor Relations"
  },
  {
    id: "scale",
    title: "Global Scale",
    detail: "Operates in over 50 countries with a workforce that has grown past 300,000 employees, serving Global 2000 companies across industries.",
    source: "MatrixBCG; company disclosures"
  },
  {
    id: "revenue-scale",
    title: "Revenue Scale",
    detail: "Grew from $250 in founding capital in 1981 to roughly $19 billion in annual revenue by FY2025.",
    source: "PeopleMatters; ListOfCEO"
  },
  {
    id: "name-change",
    title: "Corporate Renaming",
    detail: "The company was originally incorporated as Infosys Consultants Pvt. Ltd. and later Infosys Technologies Limited, before being renamed Infosys Limited to reflect its broader technology and consulting portfolio.",
    source: "Company filings"
  }
];

/**
 * Get timeline entries sorted chronologically.
 */
export function getSortedTimeline(list = infosysTimeline) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => a.year - b.year);
}

/**
 * Filter timeline entries by type.
 */
export function filterTimelineByType(typeFilter = "all", list = infosysTimeline) {
  if (!Array.isArray(list)) return [];
  if (!typeFilter || typeFilter.toLowerCase() === "all") return getSortedTimeline(list);
  return getSortedTimeline(list).filter(
    item => item.type.toLowerCase() === typeFilter.toLowerCase()
  );
}

/**
 * Search timeline and founders by free-text query.
 */
export function searchInfosys(query = "") {
  const q = query.trim().toLowerCase();
  if (!q) {
    return { timeline: infosysTimeline, founders: infosysFounders };
  }
  const matches = (obj, fields) =>
    fields.some(f => obj[f] && obj[f].toString().toLowerCase().includes(q));

  return {
    timeline: infosysTimeline.filter(item =>
      matches(item, ["title", "type", "description", "year"])
    ),
    founders: infosysFounders.filter(item =>
      matches(item, ["name", "role", "description"])
    )
  };
}

/* ==========================================================================
   BROWSER DOM ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.infosysTimeline = infosysTimeline;
  window.infosysFounders = infosysFounders;
  window.infosysGlobalPresence = infosysGlobalPresence;
  window.getSortedTimeline = getSortedTimeline;
  window.filterTimelineByType = filterTimelineByType;
  window.searchInfosys = searchInfosys;

  document.addEventListener("DOMContentLoaded", () => {
    const timelineContainer = document.getElementById("infy-timeline-container");
    const foundersGrid = document.getElementById("infy-founders-grid");
    const globalGrid = document.getElementById("infy-global-grid");
    const searchInput = document.getElementById("infy-search");
    const typeBtns = document.querySelectorAll(".btn-infy-type-filter");
    const viewTabs = document.querySelectorAll(".btn-infy-view-tab");

    let currentType = "all";

    function renderTimeline() {
      if (!timelineContainer) return;
      timelineContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      let items = query ? searchInfosys(query).timeline : infosysTimeline;
      items = filterTimelineByType(currentType, items);

      if (items.length === 0) {
        timelineContainer.innerHTML = `<div class="infy-empty-msg"><h3>No results</h3><p>Try a different search term or filter.</p></div>`;
        return;
      }

      items.forEach(item => {
        const node = document.createElement("div");
        node.className = "infy-timeline-node";
        node.innerHTML = `
          <div class="infy-year-pill">📅 ${item.year}</div>
          <div class="infy-timeline-card">
            <span class="infy-type-tag infy-type-${item.type.replace(/\s+/g, "-").toLowerCase()}">${item.type}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p class="infy-source">Source: ${item.source}</p>
          </div>
        `;
        timelineContainer.appendChild(node);
      });
    }

    function renderFounders() {
      if (!foundersGrid) return;
      foundersGrid.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const items = query ? searchInfosys(query).founders : infosysFounders;

      if (items.length === 0) {
        foundersGrid.innerHTML = `<div class="infy-empty-msg"><h3>No founders found</h3></div>`;
        return;
      }

      items.forEach(f => {
        const card = document.createElement("article");
        card.className = "infy-founder-card";
        card.innerHTML = `
          <div class="infy-founder-header">
            <span class="infy-founder-icon">${f.icon}</span>
          </div>
          <h3>${f.name}</h3>
          <p class="infy-founder-role">${f.role}</p>
          <p class="infy-founder-desc">${f.description}</p>
          <p class="infy-source">Source: ${f.source}</p>
        `;
        foundersGrid.appendChild(card);
      });
    }

    function renderGlobal() {
      if (!globalGrid) return;
      globalGrid.innerHTML = "";

      infosysGlobalPresence.forEach(g => {
        const card = document.createElement("article");
        card.className = "infy-global-card";
        card.innerHTML = `
          <h3>${g.title}</h3>
          <p>${g.detail}</p>
          <p class="infy-source">Source: ${g.source}</p>
        `;
        globalGrid.appendChild(card);
      });
    }

    // View tab switching
    viewTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        viewTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.dataset.view;
        document.querySelectorAll(".infy-view-panel").forEach(p => p.classList.add("hidden"));
        document.getElementById(`infy-view-${target}`)?.classList.remove("hidden");
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

    // Search (applies to timeline + founders)
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        renderTimeline();
        renderFounders();
      });
    }

    // Initial render
    renderTimeline();
    renderFounders();
    renderGlobal();
  });
}