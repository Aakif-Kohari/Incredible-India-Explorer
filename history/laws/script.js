import { lawsData, lawsTabs, lawsTimeline } from "./data.js";
import { TabNav } from "./components/TabNav.js";
import { LawCard, LawDetail } from "./components/LawCard.js";
import { TimelineItem } from "./components/TimelineItem.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("laws-app");
  let activeTab = "cover";
  let selectedLaw = null;

  function renderCover() {
    return `<div class="laws-cover">
      <h2>From the Regulating Act to the Bharatiya Nyaya Sanhita</h2>
      <p>
        India's legal system has evolved over 250 years — from early British
        parliamentary oversight of the East India Company, through the
        Indian Penal Code and the Constitution, to today's GST regime and
        the newly enacted Bharatiya Nyaya Sanhita.
      </p>
      <div class="cover-stats">
        <div class="cover-stat">
          <span class="cover-stat-value">${lawsData.length}</span>
          <span class="cover-stat-label">Laws covered</span>
        </div>
        <div class="cover-stat">
          <span class="cover-stat-value">1773</span>
          <span class="cover-stat-label">Earliest act</span>
        </div>
        <div class="cover-stat">
          <span class="cover-stat-value">2023</span>
          <span class="cover-stat-label">Latest reform</span>
        </div>
      </div>
      <button class="cover-cta" id="explore-laws-btn">Explore the Laws <span class="arrow">→</span></button>
    </div>`;
  }

  function renderLaws() {
    const cards = lawsData
      .map((law) => LawCard(law, selectedLaw?.id === law.id))
      .join("");
    const detail = selectedLaw
      ? LawDetail(selectedLaw)
      : `<p class="law-detail-placeholder">Select a law above to read more.</p>`;

    return `<div class="laws-grid">${cards}</div>
      <div class="law-detail-wrap">${detail}</div>`;
  }

  function renderTimeline() {
    const items = lawsTimeline
      .map((entry) => {
        const law = lawsData.find((l) => l.id === entry.lawId);
        return TimelineItem(entry, law);
      })
      .join("");

    return `<div class="laws-timeline">${items}</div>`;
  }

  function renderContent() {
    switch (activeTab) {
      case "cover":
        return renderCover();
      case "laws":
        return renderLaws();
      case "timeline":
        return renderTimeline();
      default:
        return renderCover();
    }
  }

  function render() {
    app.innerHTML = `
      <div class="laws-page">
        <div class="page-header">
          <h1>History of Indian Laws</h1>
          <p>From the Regulating Act of 1773 to the Bharatiya Nyaya Sanhita — how India's legal system has evolved</p>
        </div>
        ${TabNav(lawsTabs, activeTab)}
        <div class="laws-content" id="laws-content">
          ${renderContent()}
        </div>
      </div>`;

    attachEventListeners();
  }

  function attachEventListeners() {
    document.querySelectorAll(".laws-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeTab = btn.dataset.tab;
        render();
      });
    });

    const exploreBtn = document.getElementById("explore-laws-btn");
    if (exploreBtn) {
      exploreBtn.addEventListener("click", () => {
        activeTab = "laws";
        render();
      });
    }

    document.querySelectorAll(".law-card-btn, .law-card").forEach((el) => {
      el.addEventListener("click", (e) => {
        const id = el.dataset.id || e.currentTarget.dataset?.id;
        if (id) {
          selectedLaw = lawsData.find((law) => law.id === id) || selectedLaw;
          render();
        }
      });
    });

    document.querySelectorAll(".timeline-item").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.lawId;
        if (id) {
          selectedLaw = lawsData.find((law) => law.id === id) || selectedLaw;
          activeTab = "laws";
          render();
        }
      });
    });
  }

  render();
});