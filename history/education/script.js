import { educationEras, educationTabs, educationTimeline } from "./data.js";
import { TabNav } from "./components/TabNav.js";
import { EraCard, EraDetail } from "./components/EraCard.js";
import { TimelineItem } from "./components/TimelineItem.js";
import { ComparisonPanel } from "./components/ComparisonPanel.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("education-app");
  let activeTab = "cover";
  let selectedEra = null;

  function renderCover() {
    return `<div class="education-cover">
      <h2>From Gurukuls to NEP 2020</h2>
      <p>
        India's education story spans more than three thousand years — from
        oral learning in a guru's home, to the great residential universities
        of Nalanda and Takshashila, through colonial reform, and into today's
        network of IITs and universities under the National Education Policy
        2020.
      </p>
      <div class="cover-stats">
        <div class="cover-stat">
          <span class="cover-stat-value">${educationEras.length}</span>
          <span class="cover-stat-label">Eras covered</span>
        </div>
        <div class="cover-stat">
          <span class="cover-stat-value">c. 1500 BCE</span>
          <span class="cover-stat-label">Earliest era</span>
        </div>
        <div class="cover-stat">
          <span class="cover-stat-value">2020</span>
          <span class="cover-stat-label">Latest reform</span>
        </div>
      </div>
      <button class="cover-cta" id="explore-eras-btn">Explore the Eras <span class="arrow">→</span></button>
    </div>`;
  }

  function renderEras() {
    const cards = educationEras
      .map((era) => EraCard(era, selectedEra?.id === era.id))
      .join("");
    const detail = selectedEra
      ? EraDetail(selectedEra)
      : `<p class="era-detail-placeholder">Select an era above to read more.</p>`;

    return `<div class="eras-grid">${cards}</div>
      <div class="era-detail-wrap">${detail}</div>`;
  }

  function renderTimeline() {
    const items = educationTimeline
      .map((entry) => {
        const era = educationEras.find((e) => e.id === entry.eraId);
        return TimelineItem(entry, era);
      })
      .join("");

    return `<div class="education-timeline">${items}</div>
      ${ComparisonPanel(educationTimeline)}`;
  }

  function renderContent() {
    switch (activeTab) {
      case "cover":
        return renderCover();
      case "eras":
        return renderEras();
      case "timeline":
        return renderTimeline();
      default:
        return renderCover();
    }
  }

  function render() {
    app.innerHTML = `
      <div class="education-page">
        <div class="page-header">
          <h1>History of Indian Education</h1>
          <p>From the Gurukul system to NEP 2020 — how India has taught its children across the centuries</p>
        </div>
        ${TabNav(educationTabs, activeTab)}
        <div class="education-content" id="education-content">
          ${renderContent()}
        </div>
      </div>`;

    attachEventListeners();
  }

  function attachEventListeners() {
    document.querySelectorAll(".education-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeTab = btn.dataset.tab;
        render();
      });
    });

    const exploreBtn = document.getElementById("explore-eras-btn");
    if (exploreBtn) {
      exploreBtn.addEventListener("click", () => {
        activeTab = "eras";
        render();
      });
    }

    document.querySelectorAll(".era-card-btn, .era-card").forEach((el) => {
      el.addEventListener("click", (e) => {
        const id = el.dataset.id || e.currentTarget.dataset?.id;
        if (id) {
          selectedEra = educationEras.find((era) => era.id === id) || selectedEra;
          render();
        }
      });
    });

    document.querySelectorAll(".timeline-item").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.eraId;
        if (id) {
          selectedEra = educationEras.find((era) => era.id === id) || selectedEra;
          activeTab = "eras";
          render();
        }
      });
    });
  }

  render();
});