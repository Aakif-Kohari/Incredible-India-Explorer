export function FactsPanel(memorial) {
  const factsHtml = memorial.keyFacts
    .map(
      (fact) => `
    <li class="fact-item">
      <span class="fact-bullet" style="background: ${memorial.color}"></span>
      <span class="fact-text">${fact}</span>
    </li>`
    )
    .join("");

  return `<div class="facts-panel" data-id="${memorial.id}">
    <div class="facts-panel-header">
      <h3>${memorial.name}</h3>
      <span class="facts-badge" style="background: ${memorial.color}">${memorial.built}</span>
    </div>
    <ul class="facts-list">
      ${factsHtml}
    </ul>
    <div class="facts-meta">
      <div class="facts-meta-item">
        <span class="meta-label">City</span>
        <span class="meta-value">${memorial.city}</span>
      </div>
      <div class="facts-meta-item">
        <span class="meta-label">State</span>
        <span class="meta-value">${memorial.state}</span>
      </div>
      <div class="facts-meta-item">
        <span class="meta-label">Architect</span>
        <span class="meta-value">${memorial.architect}</span>
      </div>
      <div class="facts-meta-item">
        <span class="meta-label">Style</span>
        <span class="meta-value">${memorial.architecturalStyle}</span>
      </div>
    </div>
  </div>`;
}
