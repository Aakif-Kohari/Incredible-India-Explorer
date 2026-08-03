import { memorials, memorialTabs } from "./data.js";
import { TabNav } from "./components/TabNav.js";
import { MemorialCard } from "./components/MemorialCard.js";
import { MemorialDetail } from "./components/MemorialDetail.js";
import { LocationMap } from "./components/LocationMap.js";
import { FactsPanel } from "./components/FactsPanel.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("memorials-app");
  let activeTab = "overview";
  let selectedMemorial = memorials[0];

  function renderOverview() {
    const cards = memorials.map((m) => MemorialCard(m, m.id === selectedMemorial.id)).join("");
    return `<div class="memorials-grid">${cards}</div>`;
  }

  function renderHistory() {
    return `<div class="memorials-history">${MemorialDetail(selectedMemorial)}</div>`;
  }

  function renderLocations() {
    return LocationMap(memorials);
  }

  function renderFacts() {
    const panels = memorials.map((m) => FactsPanel(m)).join("");
    return `<div class="facts-grid">${panels}</div>`;
  }

  function renderContent() {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "history":
        return renderHistory();
      case "locations":
        return renderLocations();
      case "facts":
        return renderFacts();
      default:
        return renderOverview();
    }
  }

  function render() {
    app.innerHTML = `
      <div class="memorials-page">
        <div class="page-header">
          <h1>Indian National Memorials</h1>
          <p>Explore the sacred memorials that preserve India's rich heritage of sacrifice, freedom, and national pride</p>
        </div>
        ${TabNav(memorialTabs, activeTab)}
        <div class="memorials-content" id="memorials-content">
          ${renderContent()}
        </div>
      </div>`;

    attachEventListeners();
  }

  function attachEventListeners() {
    document.querySelectorAll(".memorials-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeTab = btn.dataset.tab;
        render();
      });
    });

    document.querySelectorAll(".memorial-card-btn, .memorial-card").forEach((el) => {
      el.addEventListener("click", (e) => {
        const id = el.dataset.id || e.currentTarget.dataset?.id;
        if (id) {
          selectedMemorial = memorials.find((m) => m.id === id) || selectedMemorial;
          activeTab = "history";
          render();
        }
      });
    });

    document.querySelectorAll(".legend-item").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.id;
        if (id) {
          selectedMemorial = memorials.find((m) => m.id === id) || selectedMemorial;
          activeTab = "history";
          render();
        }
      });
    });
  }

  render();
});
