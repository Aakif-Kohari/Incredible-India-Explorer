/**
 * constitution-timeline.js
 * Evolution of the Indian Constitution - Animated Timeline Module
 *
 * Provides verified historical dataset, milestone filtering, scroll progress
 * calculation, IntersectionObserver animation triggers, and modal logic.
 */

export const CONSTITUTION_MILESTONES = [
  {
    id: "m1",
    date: "1946-12-09",
    displayDate: "December 9, 1946",
    title: "First Sitting of the Constituent Assembly",
    era: "foundational",
    eraLabel: "Foundational Era (1946–1950)",
    summary: "The Constituent Assembly met for the first time in the Constitution Hall (now Central Hall of Parliament) in New Delhi.",
    details: "Dr. Sachchidananda Sinha served as the temporary Chairman before Dr. Rajendra Prasad was unanimously elected President of the Assembly on December 11, 1946. The assembly comprised representatives elected by provincial assemblies to draft independent India's governing framework.",
    keyFigures: ["Dr. Rajendra Prasad", "Dr. Sachchidananda Sinha", "Jawaharlal Nehru"],
    category: "Assembly Formation",
    icon: "🏛️"
  },
  {
    id: "m2",
    date: "1947-08-29",
    displayDate: "August 29, 1947",
    title: "Appointment of the Drafting Committee",
    era: "foundational",
    eraLabel: "Foundational Era (1946–1950)",
    summary: "The Constituent Assembly appointed a seven-member Drafting Committee chaired by Dr. B.R. Ambedkar.",
    details: "Tasked with scrutinizing the draft constitution prepared by Constitutional Advisor Sir B.N. Rau, Dr. B.R. Ambedkar led the committee through extensive debates, clause-by-clause discussions, and public reviews over 2 years, 11 months, and 18 days.",
    keyFigures: ["Dr. B.R. Ambedkar", "Alladi Krishnaswamy Ayyar", "K.M. Munshi", "Sir B.N. Rau"],
    category: "Drafting Committee",
    icon: "📜"
  },
  {
    id: "m3",
    date: "1949-11-26",
    displayDate: "November 26, 1949",
    title: "Adoption of the Constitution (Constitution Day)",
    era: "foundational",
    eraLabel: "Foundational Era (1946–1950)",
    summary: "The Constituent Assembly formally adopted and gave to themselves the Constitution of India.",
    details: "Celebrated annually as Constitution Day (Samvidhan Divas), the Preamble declared India a Sovereign Democratic Republic. Members signed two handwritten copies (one in English and one in Hindi) illuminated by artists from Shantiniketan led by Nandalal Bose.",
    keyFigures: ["Constituent Assembly Members", "Nandalal Bose"],
    category: "Adoption",
    icon: "✍️"
  },
  {
    id: "m4",
    date: "1950-01-26",
    displayDate: "January 26, 1950",
    title: "Enactment & Republic Day",
    era: "foundational",
    eraLabel: "Foundational Era (1946–1950)",
    summary: "The Constitution of India came into full legal effect, marking India's transition to a Sovereign Democratic Republic.",
    details: "Chosen to commemorate the 1930 Declaration of Indian Independence (Purna Swaraj), January 26 became Republic Day. Dr. Rajendra Prasad took oath as India's first President, and the Supreme Court of India was established two days later.",
    keyFigures: ["Dr. Rajendra Prasad", "Government of India"],
    category: "Republic Commencement",
    icon: "🇮🇳"
  },
  {
    id: "m5",
    date: "1951-06-18",
    displayDate: "June 18, 1951",
    title: "1st Constitutional Amendment Act",
    era: "amendments",
    eraLabel: "Landmark Amendments Era",
    summary: "Introduced Article 31A/31B and the Ninth Schedule to protect agrarian land reform legislation.",
    details: "Enacted by the Provisional Parliament, the First Amendment inserted the Ninth Schedule to shield specific state land reform laws from judicial review, and added reasonable restrictions to freedom of speech under Article 19(2) regarding public order and friendly relations with foreign states.",
    keyFigures: ["Provisional Parliament"],
    category: "Land Reforms & Speech",
    icon: "🌱"
  },
  {
    id: "m6",
    date: "1976-12-18",
    displayDate: "December 18, 1976",
    title: "42nd Constitutional Amendment Act",
    era: "amendments",
    eraLabel: "Landmark Amendments Era",
    summary: "Comprehensive constitutional revision adding 'Socialist', 'Secular', and 'Integrity' to the Preamble.",
    details: "Often referred to as the 'Mini-Constitution', this amendment inserted Part IV-A (Article 51A) introducing Fundamental Duties for citizens, altered judicial review parameters, and expanded federal allocation guidelines.",
    keyFigures: ["Swaran Singh Committee", "Fifth Parliament"],
    category: "Preamble & Fundamental Duties",
    icon: "⚖️"
  },
  {
    id: "m7",
    date: "1978-04-30",
    displayDate: "April 30, 1978",
    title: "44th Constitutional Amendment Act",
    era: "amendments",
    eraLabel: "Landmark Amendments Era",
    summary: "Restored civil liberties provisions and modified Emergency procedure requirements.",
    details: "The 44th Amendment removed the Right to Property from the list of Fundamental Rights (making it a legal right under Article 300A), stipulated that Internal Emergency can only be declared on grounds of 'armed rebellion', and required written advice from the Union Cabinet.",
    keyFigures: ["Sixth Parliament"],
    category: "Civil Liberties & Property Right",
    icon: "🛡️"
  },
  {
    id: "m8",
    date: "1993-04-24",
    displayDate: "April 24, 1993",
    title: "73rd & 74th Amendments (Local Self-Government)",
    era: "amendments",
    eraLabel: "Landmark Amendments Era",
    summary: "Granted constitutional status to rural Panchayati Raj Institutions and urban Municipalities.",
    details: "Inserted Part IX (Panchayats) and Part IX-A (Municipalities) into the Constitution, creating a 3-tier local self-governance framework, mandating regular elections every 5 years, and establishing 33% reservation for women in local governance bodies.",
    keyFigures: ["P.V. Narasimha Rao Government", "L.M. Singhvi Committee"],
    category: "Panchayati Raj & Local Bodies",
    icon: "🏡"
  },
  {
    id: "m9",
    date: "2009-08-04",
    displayDate: "August 4, 2009",
    title: "86th Amendment Act (Right to Education)",
    era: "modern",
    eraLabel: "Modern Rights & Governance Era",
    summary: "Inserted Article 21A making free and compulsory education a Fundamental Right for children aged 6 to 14.",
    details: "Enacted alongside the Right of Children to Free and Compulsory Education (RTE) Act, this milestone made basic education a enforceable right, while adding Article 51A(k) assigning education duties to parents and guardians.",
    keyFigures: ["Parliament of India"],
    category: "Fundamental Right to Education",
    icon: "🎓"
  },
  {
    id: "m10",
    date: "2016-08-08",
    displayDate: "August 8, 2016",
    title: "101st Amendment Act (Goods and Services Tax)",
    era: "modern",
    eraLabel: "Modern Rights & Governance Era",
    summary: "Introduced Article 246A and the Goods and Services Tax (GST) council framework.",
    details: "Replaced a complex web of central and state indirect taxes with a unified national indirect tax system, empowering both Parliament and State Assemblies to legislate on GST under a collaborative GST Council.",
    keyFigures: ["GST Council", "Parliament & State Legislatures"],
    category: "Fiscal Federalism & GST",
    icon: "📊"
  },
  {
    id: "m11",
    date: "2024-01-01",
    displayDate: "Present Day",
    title: "Living Constitution & Basic Structure Doctrine",
    era: "modern",
    eraLabel: "Modern Rights & Governance Era",
    summary: "The world's longest written constitution continues to evolve while preserving its core democratic pillars.",
    details: "Through the doctrine of Basic Structure (established in Kesavananda Bharati v. State of Kerala, 1973), the Supreme Court ensures that essential features such as democracy, secularism, rule of law, and judicial independence remain unalterable, balancing stability with constitutional dynamism.",
    keyFigures: ["Judiciary", "Parliament", "Citizens of India"],
    category: "Constitutional Heritage Today",
    icon: "🌟"
  }
];

/**
 * Filters the milestones dataset by era category and search query.
 *
 * @param {Array<Object>} milestones - Milestones array
 * @param {string} era - Selected era ('all', 'foundational', 'amendments', 'modern')
 * @param {string} searchQuery - Search input term
 * @returns {Array<Object>} Filtered milestones
 */
export function filterMilestones(milestones = CONSTITUTION_MILESTONES, era = "all", searchQuery = "") {
  const query = (searchQuery || "").toLowerCase().trim();
  const targetEra = (era || "all").toLowerCase().trim();

  return milestones.filter(m => {
    const matchesEra = targetEra === "all" || m.era === targetEra;

    const matchesSearch = !query ||
      m.title.toLowerCase().includes(query) ||
      m.summary.toLowerCase().includes(query) ||
      m.displayDate.toLowerCase().includes(query) ||
      m.category.toLowerCase().includes(query) ||
      (m.keyFigures && m.keyFigures.some(f => f.toLowerCase().includes(query)));

    return matchesEra && matchesSearch;
  });
}

/**
 * Calculates continuous vertical scroll progress percentage.
 *
 * @param {number} scrollTop - Current window or container scrollTop
 * @param {number} scrollHeight - Total scroll height
 * @param {number} clientHeight - Visible client height
 * @returns {number} Progress percentage (0 to 100)
 */
export function calculateTimelineProgress(scrollTop = 0, scrollHeight = 1000, clientHeight = 600) {
  const maxScroll = scrollHeight - clientHeight;
  if (maxScroll <= 0) return 100;
  const fraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
  return Math.round(fraction * 100);
}

/**
 * Generates statistical summary of the milestones dataset.
 *
 * @param {Array<Object>} milestones
 * @returns {Object} Metadata summary
 */
export function getMilestoneStats(milestones = CONSTITUTION_MILESTONES) {
  const total = milestones.length;
  let foundationalCount = 0;
  let amendmentsCount = 0;
  let modernCount = 0;

  milestones.forEach(m => {
    if (m.era === "foundational") foundationalCount++;
    if (m.era === "amendments") amendmentsCount++;
    if (m.era === "modern") modernCount++;
  });

  return {
    total,
    foundationalCount,
    amendmentsCount,
    modernCount,
    startDate: total > 0 ? milestones[0].displayDate : "",
    endDate: total > 0 ? milestones[total - 1].displayDate : ""
  };
}

/* --- Interactive DOM Controller --- */

class ConstitutionTimelineApp {
  constructor() {
    this.currentEra = "all";
    this.searchQuery = "";
    this.observer = null;

    this.initElements();
    this.bindEvents();
    this.initIntersectionObserver();
    this.renderTimeline();
    this.updateScrollSpine();
  }

  initElements() {
    this.timelineContainer = document.getElementById("timeline-cards-container");
    this.spineFillEl = document.getElementById("spine-fill");
    this.searchQueryInput = document.getElementById("timeline-search");
    this.eraFilterTabs = document.querySelectorAll(".era-tab-btn");
    
    this.modalOverlay = document.getElementById("milestone-modal");
    this.modalTitle = document.getElementById("modal-title");
    this.modalDate = document.getElementById("modal-date");
    this.modalBody = document.getElementById("modal-body");
    this.modalFigures = document.getElementById("modal-figures");
    this.modalCloseBtn = document.getElementById("modal-close-btn");

    this.totalStatEl = document.getElementById("stat-total");
    this.foundationalStatEl = document.getElementById("stat-foundational");
    this.amendmentsStatEl = document.getElementById("stat-amendments");
    this.modernStatEl = document.getElementById("stat-modern");
  }

  bindEvents() {
    // Search input
    if (this.searchQueryInput) {
      this.searchQueryInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderTimeline();
      });
    }

    // Era tab filtering
    if (this.eraFilterTabs) {
      this.eraFilterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
          this.eraFilterTabs.forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          this.currentEra = tab.dataset.era;
          this.renderTimeline();
        });
      });
    }

    // Scroll listener for continuous animated spine line
    window.addEventListener("scroll", () => this.updateScrollSpine(), { passive: true });

    // Modal close handlers
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener("click", () => this.closeModal());
    }
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener("click", (e) => {
        if (e.target === this.modalOverlay) this.closeModal();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeModal();
    });

    // Theme toggle handler
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
      });
    }
  }

  initIntersectionObserver() {
    if (typeof IntersectionObserver === "undefined") return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.15
    });
  }

  updateScrollSpine() {
    if (!this.spineFillEl) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const pct = calculateTimelineProgress(scrollTop, scrollHeight, clientHeight);
    this.spineFillEl.style.height = `${pct}%`;
  }

  renderTimeline() {
    if (!this.timelineContainer) return;
    this.timelineContainer.innerHTML = "";

    const filtered = filterMilestones(CONSTITUTION_MILESTONES, this.currentEra, this.searchQuery);
    const stats = getMilestoneStats(CONSTITUTION_MILESTONES);

    if (this.totalStatEl) this.totalStatEl.textContent = stats.total;
    if (this.foundationalStatEl) this.foundationalStatEl.textContent = stats.foundationalCount;
    if (this.amendmentsStatEl) this.amendmentsStatEl.textContent = stats.amendmentsCount;
    if (this.modernStatEl) this.modernStatEl.textContent = stats.modernCount;

    if (filtered.length === 0) {
      this.timelineContainer.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <h3>No Constitutional Milestones Found</h3>
          <p>Try adjusting your search query or era filter tabs.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((milestone, index) => {
      const card = document.createElement("article");
      card.className = `timeline-card-wrapper ${index % 2 === 0 ? "left" : "right"}`;
      card.dataset.id = milestone.id;

      card.innerHTML = `
        <div class="timeline-node">
          <span class="node-icon">${milestone.icon}</span>
        </div>
        <div class="timeline-card">
          <div class="card-header">
            <span class="card-badge">${milestone.category}</span>
            <span class="card-date">${milestone.displayDate}</span>
          </div>
          <h3 class="card-title">${milestone.title}</h3>
          <p class="card-summary">${milestone.summary}</p>
          <div class="card-footer">
            <span class="key-figure-pill">👤 ${milestone.keyFigures[0]}</span>
            <button type="button" class="btn-read-more" data-milestone-id="${milestone.id}">
              Read Analysis ➔
            </button>
          </div>
        </div>
      `;

      const readBtn = card.querySelector(".btn-read-more");
      if (readBtn) {
        readBtn.addEventListener("click", () => this.openModal(milestone));
      }

      this.timelineContainer.appendChild(card);

      if (this.observer) {
        this.observer.observe(card);
      } else {
        // Fallback for environments without IntersectionObserver
        card.classList.add("visible");
      }
    });
  }

  openModal(milestone) {
    if (!this.modalOverlay) return;

    if (this.modalTitle) this.modalTitle.textContent = milestone.title;
    if (this.modalDate) this.modalDate.textContent = `${milestone.displayDate} • ${milestone.eraLabel}`;
    if (this.modalBody) this.modalBody.textContent = milestone.details;

    if (this.modalFigures) {
      this.modalFigures.innerHTML = milestone.keyFigures
        .map(fig => `<span class="figure-tag">${fig}</span>`)
        .join("");
    }

    this.modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    if (!this.modalOverlay) return;
    this.modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Auto-initialize on DOM load in browser
if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.ConstitutionTimeline = {
    CONSTITUTION_MILESTONES,
    filterMilestones,
    calculateTimelineProgress,
    getMilestoneStats,
    ConstitutionTimelineApp
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("timeline-cards-container")) {
      new ConstitutionTimelineApp();
    }
  });
}
