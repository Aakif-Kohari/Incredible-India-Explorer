export function EraCard(era, isSelected = false) {
  return `<div class="era-card ${isSelected ? "selected" : ""}" data-id="${era.id}">
    <div class="era-card-image">
      <img src="${era.image}" alt="${era.name}" loading="lazy" />
      <div class="era-card-overlay" style="border-left-color: ${era.color}">
        <span class="era-period">${era.period}</span>
      </div>
    </div>
    <div class="era-card-body">
      <h3 class="era-card-name">${era.name}</h3>
      <p class="era-card-summary">${era.summary}</p>
      <button class="era-card-btn" data-id="${era.id}">
        Learn more <span class="arrow">→</span>
      </button>
    </div>
  </div>`;
}

export function EraDetail(era) {
  const facts = era.keyFacts.map((fact) => `<li>${fact}</li>`).join("");

  return `<div class="era-detail" style="border-top-color: ${era.color}">
    <div class="era-detail-header">
      <h2>${era.name}</h2>
      <span class="era-detail-period">${era.period}</span>
    </div>
    <p class="era-detail-summary">${era.summary}</p>
    <h4>Key Facts</h4>
    <ul class="era-detail-facts">${facts}</ul>
  </div>`;
}