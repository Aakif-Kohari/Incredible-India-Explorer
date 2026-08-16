export function LawCard(law, isSelected = false) {
  return `<div class="law-card ${isSelected ? "selected" : ""}" data-id="${law.id}">
    <div class="law-card-image">
      <img src="${law.image}" alt="${law.name}" loading="lazy" />
      <div class="law-card-overlay" style="border-left-color: ${law.color}">
        <span class="law-year">${law.year}</span>
      </div>
    </div>
    <div class="law-card-body">
      <h3 class="law-card-name">${law.name}</h3>
      <p class="law-card-summary">${law.summary}</p>
      <button class="law-card-btn" data-id="${law.id}">
        Learn more <span class="arrow">→</span>
      </button>
    </div>
  </div>`;
}

export function LawDetail(law) {
  const facts = law.keyFacts.map((fact) => `<li>${fact}</li>`).join("");

  return `<div class="law-detail" style="border-top-color: ${law.color}">
    <div class="law-detail-header">
      <h2>${law.name}</h2>
      <span class="law-detail-year">${law.year}</span>
    </div>
    <p class="law-detail-summary">${law.summary}</p>
    <h4>Key Facts</h4>
    <ul class="law-detail-facts">${facts}</ul>
  </div>`;
}