export function MemorialCard(memorial, isSelected = false) {
  return `<div class="memorial-card ${isSelected ? "selected" : ""}" data-id="${memorial.id}">
    <div class="memorial-card-image">
      <img src="${memorial.image}" alt="${memorial.name}" loading="lazy" />
      <div class="memorial-card-overlay" style="border-left-color: ${memorial.color}">
        <span class="memorial-year">${memorial.built}</span>
      </div>
    </div>
    <div class="memorial-card-body">
      <h3 class="memorial-card-name">${memorial.name}</h3>
      <p class="memorial-card-location">${memorial.city}, ${memorial.state}</p>
      <p class="memorial-card-significance">${memorial.significance.substring(0, 120)}...</p>
      <button class="memorial-card-btn" data-id="${memorial.id}">
        Explore <span class="arrow">→</span>
      </button>
    </div>
  </div>`;
}
